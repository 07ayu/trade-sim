import { useSlotNumber } from "./useCountUp";

export function SlotNumber({
  target,
  magnitude = "thousands",
  scrambleDuration = 1500,
  easeDuration = 600,
  loopEvery = 4000,
  interval = 80,
  delay = 0,
  prefix = "",
  suffix = "",
}) {
  const { value, ref } = useSlotNumber({
    target,
    magnitude,
    scrambleDuration,
    easeDuration,
    loopEvery,
    interval,
    delay,
  });

  return (
    <span ref={ref} className="tabular-nums">
      {value === null ? "" : `${prefix}${value.toLocaleString()}${suffix}`}
    </span>
  );
}
