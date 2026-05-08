import { Easing, interpolate, spring } from "remotion";

export const softEase = (frame: number, input: number[], output: number[]) =>
  interpolate(frame, input, output, {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const warmEase = (frame: number, input: number[], output: number[]) =>
  interpolate(frame, input, output, {
    easing: Easing.bezier(0.65, 0, 0.35, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

export const settle = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 18,
      mass: 0.72,
      stiffness: 138,
    },
    durationInFrames: 34,
  });

export const sceneOpacity = (frame: number, duration: number, isLast = false) => {
  const intro = softEase(frame, [0, 18], [0, 1]);
  const outro = isLast ? 1 : warmEase(frame, [duration - 18, duration - 5], [1, 0]);
  return intro * outro;
};

export const sceneForegroundOpacity = (frame: number, duration: number, isLast = false) => {
  const intro = softEase(frame, [10, 26], [0, 1]);
  const outro = isLast ? 1 : warmEase(frame, [duration - 30, duration - 12], [1, 0]);
  return intro * outro;
};

export const breathe = (frame: number, amount: number, speed: number, phase = 0) =>
  Math.sin(frame / speed + phase) * amount;
