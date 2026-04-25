import { useEffect, useRef, useState } from "react";

export function useAnimatedBars({
    finalBars = [35, 55, 45, 70, 60, 85, 100],
    scrambleDuration = 1500,
    easeDuration = 600,
    loopEvery = 4000,
    interval = 100,
    delay = 0,
}) {
    const [bars, setBars] = useState(finalBars);
    const ref = useRef(null);

    const getRandom = () =>
        finalBars.map(() => Math.floor(Math.random() * 70) + 20);

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

            // Phase 1 — scramble bars randomly
            scrambleInterval = setInterval(() => {
                setBars(getRandom());
            }, interval);

            // Phase 2 — ease each bar to its final value
            phaseTimeout = setTimeout(() => {
                clearInterval(scrambleInterval);

                const snapshot = getRandom(); // where we are when scramble stops
                const start = performance.now();

                const tick = (now) => {
                    if (stopped) return;

                    const progress = Math.min((now - start) / easeDuration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);

                    setBars(
                        finalBars.map((final, i) =>
                            Math.floor(snapshot[i] + (final - snapshot[i]) * eased)
                        )
                    );

                    if (progress < 1) {
                        rafRef = requestAnimationFrame(tick);
                    } else {
                        setBars(finalBars); // hard snap
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
    }, []);

    return { bars, ref };
}