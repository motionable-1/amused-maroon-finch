import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { settle, softEase } from "./helpers";

type TextAnimationProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  display?: CSSProperties["display"];
  sharp?: boolean;
  style?: CSSProperties;
};

export const TextAnimation = ({
  children,
  className,
  delay = 0,
  display = "block",
  style,
}: TextAnimationProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = settle(frame, fps, delay);
  const reveal = softEase(frame, [delay, delay + 12], [0, 1]);
  const rawY = interpolate(rise, [0, 1], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const snappedY = Math.round(rawY);
  const isResting = reveal > 0.995 && Math.abs(snappedY) < 1;

  return (
    <span
      className={className}
      style={{
        ...style,
        display,
        opacity: reveal,
        transform: isResting ? "none" : `translate3d(0, ${snappedY}px, 0)`,
        willChange: isResting ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </span>
  );
};
