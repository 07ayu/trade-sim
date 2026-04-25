import { useEffect, useRef, useState } from "react";

export function useSlotNumber({
    target,
    magnitude = "thousands",
    scrambleDuration = 1500,
    easeDuration = 600,
    loopEvery = 4000,
    interval = 80,
    delay = 0,
}) {
    const [value, setValue] = useState(null);
    const ref = useRef(null);

    const getRandom = () => {
        if (magnitude === "hundreds-thousands")
            return Math.floor(Math.random() * 900000) + 100000;
        if (magnitude === "thousands")
            return Math.floor(Math.random() * 9000) + 1000;
        if (magnitude === "hundreds")
            return Math.floor(Math.random() * 900) + 100;
        const swing = target * 0.3;
        return Math.floor(target - swing + Math.random() * swing * 2);
    };

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        let scrambleInterval = null;
        let loopInterval = null;
        let rafRef = null;
        let phaseTimeout = null;
        let delayTimeout = null;
        let stopped = false;

        const runCycle = () => {
            stopped = false;

            // Phase 1 — scramble
            scrambleInterval = setInterval(() => {
                setValue(getRandom());
            }, interval);

            // Phase 2 — ease to target
            phaseTimeout = setTimeout(() => {
                clearInterval(scrambleInterval);

                const startValue = getRandom(); // last random we were at
                const start = performance.now();

                const tick = (now) => {
                    if (stopped) return;

                    const progress = Math.min((now - start) / easeDuration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);

                    // interpolate from startValue → target
                    const current = Math.floor(startValue + (target - startValue) * eased);
                    setValue(current);

                    if (progress < 1) {
                        rafRef = requestAnimationFrame(tick);
                    } else {
                        setValue(target); // hard snap
                    }
                };

                rafRef = requestAnimationFrame(tick);
            }, scrambleDuration);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();

                delayTimeout = setTimeout(() => {
                    runCycle();
                    loopInterval = setInterval(runCycle, loopEvery);
                }, delay);
            },
            { threshold: 0.1 }
        );

        observer.observe(node);

        return () => {
            stopped = true;
            observer.disconnect();
            clearInterval(scrambleInterval);
            clearInterval(loopInterval);
            clearTimeout(phaseTimeout);
            clearTimeout(delayTimeout);
            cancelAnimationFrame(rafRef);
        };
    }, [target, magnitude, scrambleDuration, easeDuration, loopEvery, interval, delay]);

    return { value, ref };
}