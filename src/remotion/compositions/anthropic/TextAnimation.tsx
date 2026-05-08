import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { breathe, settle, softEase } from "./helpers";

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
  sharp = false,
  style,
}: TextAnimationProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = settle(frame, fps, delay);
  const reveal = softEase(frame, [delay, delay + 12], [0, 1]);
  const microLift = sharp ? 0 : breathe(frame - delay, 0.18, 42, 0.3);
  const blur = interpolate(reveal, [0, 1], [3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isResting = sharp && reveal > 0.995 && Math.abs(1 - rise) < 0.01;

  return (
    <span
      className={className}
      style={{
        ...style,
        display,
        opacity: reveal,
        transform: isResting
          ? "none"
          : `translate3d(0, ${22 * (1 - rise) + microLift}px, 0) scale(${0.985 + rise * 0.015})`,
        filter: isResting ? "none" : `blur(${blur}px)`,
      }}
    >
      {children}
    </span>
  );
};
