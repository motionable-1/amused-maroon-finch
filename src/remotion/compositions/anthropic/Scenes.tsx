import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  ArrowIcon,
  ClockIcon,
  DocIcon,
  LayersIcon,
  LockIcon,
  PeopleIcon,
  ShieldIcon,
  StarIcon,
  TargetIcon,
  WarningIcon,
} from "./Icons";
import { TextAnimation } from "./TextAnimation";
import { breathe, sceneForegroundOpacity, sceneOpacity, settle, softEase, warmEase } from "./helpers";

type SceneProps = {
  duration: number;
};

type SceneShellProps = SceneProps & {
  background: React.ReactNode;
  children: React.ReactNode;
  className: string;
  isLast?: boolean;
};

const SceneShell = ({ background, children, className, duration, isLast = false }: SceneShellProps) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill className={`scene-shell ${className}`} style={{ opacity: sceneOpacity(frame, duration, isLast) }}>
      <div className="scene-background">{background}</div>
      <div className="scene-foreground" style={{ opacity: sceneForegroundOpacity(frame, duration, isLast) }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

const NoiseLayer = () => <div className="noise-layer" />;

const LineField = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
  const frame = useCurrentFrame();
  const drift = breathe(frame, 10, 58, 1.2);
  return (
    <svg
      className={`line-field line-field-${variant}`}
      viewBox="0 0 1920 1080"
      style={{ transform: `translate3d(${drift}px, ${drift * 0.35}px, 0) scale(1.01)` }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`lineGlow-${variant}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={variant === "dark" ? "#d9a273" : "#cc7248"} stopOpacity="0.32" />
          <stop offset="1" stopColor={variant === "dark" ? "#d9a273" : "#cc7248"} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="960" cy="540" r="388" fill="none" />
      <circle cx="960" cy="540" r="520" fill="none" strokeDasharray="4 18" />
      <path d="M960 0v1080M0 540h1920M466 46l988 988M1454 46 466 1034" />
      <circle cx="960" cy="540" r="310" fill={`url(#lineGlow-${variant})`} stroke="none" />
      {Array.from({ length: 24 }).map((_, index) => {
        const angle = (index / 24) * Math.PI * 2;
        const radius = index % 2 === 0 ? 388 : 520;
        const x = 960 + Math.cos(angle) * radius;
        const y = 540 + Math.sin(angle) * radius;
        return <circle key={index} cx={x} cy={y} r="4" stroke="none" />;
      })}
    </svg>
  );
};

const FeatureRow = ({
  delay,
  icon,
  label,
  top,
  variant = "dark",
}: {
  delay: number;
  icon: React.ReactNode;
  label: string;
  top: number;
  variant?: "dark" | "light";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = settle(frame, fps, delay);
  const x = interpolate(rise, [0, 1], [-32, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div className={`feature-row feature-row-${variant}`} style={{ top, transform: `translate3d(${x}px, 0, 0)` }}>
      <div className="feature-icon">{icon}</div>
      <TextAnimation className="feature-label" delay={delay + 3} sharp>
        {label}
      </TextAnimation>
    </div>
  );
};

export const OpeningScene = ({ duration }: SceneProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const halo = settle(frame, fps, 4);
  const pulse = breathe(frame, 0.015, 40);
  const floor = breathe(frame, 16, 64, 0.5);

  return (
    <SceneShell
      className="scene-opening"
      duration={duration}
      background={
        <>
          <div className="opening-radial" style={{ transform: `scale(${1 + pulse})` }} />
          <div className="opening-floor" style={{ transform: `translate3d(0, ${floor}px, 0)` }} />
          <LineField />
          <NoiseLayer />
        </>
      }
    >
      <div className="opening-axis" style={{ opacity: softEase(frame, [6, 28], [0, 0.42]) }} />
      <div
        className="hero-ring"
        style={{
          opacity: softEase(frame, [6, 32], [0, 1]),
          transform: `translate(-50%, -50%) scale(${0.86 + halo * 0.14 + pulse}) rotate(${breathe(frame, 2.6, 70)}deg)`,
        }}
      />
      <div className="hero-flare" style={{ transform: `translate(-50%, -50%) scale(${1 + breathe(frame, 0.12, 28)})` }} />
      <div className="corner-gauge gauge-left" style={{ transform: `translate3d(0, ${breathe(frame, 10, 34)}px, 0)` }} />
      <div className="corner-gauge gauge-right" style={{ transform: `translate3d(0, ${breathe(frame, 10, 37, 2)}px, 0)` }} />
      <div className="opening-copy">
        <TextAnimation className="wordmark" delay={14}>
          <span>ANTHROP</span>
          <span className="accent-slash">\</span>
          <span>C</span>
        </TextAnimation>
        <TextAnimation className="opening-tagline" delay={28}>
          <span>AI that works for </span>
          <span className="accent-text">people</span>
        </TextAnimation>
      </div>
    </SceneShell>
  );
};

export const ReasoningScene = ({ duration }: SceneProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = settle(frame, fps, 16);
  const cardY = interpolate(card, [0, 1], [64, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dotDrift = breathe(frame, 12, 44, 0.6);

  return (
    <SceneShell
      className="scene-reasoning"
      duration={duration}
      background={
        <>
          <div className="cream-wash" />
          <div className="peach-bloom" style={{ transform: `translate3d(${breathe(frame, 20, 58)}px, ${breathe(frame, 16, 46, 1)}px, 0)` }} />
          <div className="dot-field dot-field-right" style={{ transform: `translate3d(${dotDrift}px, ${dotDrift * -0.5}px, 0)` }} />
          <NoiseLayer />
        </>
      }
    >
      <div className="reasoning-copy">
        <TextAnimation className="cream-headline" delay={6}>
          Frontier AI,
        </TextAnimation>
        <TextAnimation className="cream-headline" delay={13}>
          <span>built for </span>
          <span className="accent-text">clarity.</span>
        </TextAnimation>
      </div>
      <FeatureRow delay={18} icon={<WarningIcon className="line-icon" />} label="Less ambiguity" top={590} variant="light" />
      <FeatureRow delay={23} icon={<ClockIcon className="line-icon" />} label="Faster decisions" top={705} variant="light" />
      <FeatureRow delay={28} icon={<LayersIcon className="line-icon" />} label="Clearer context" top={820} variant="light" />
      <div
        className="reasoning-card"
        style={{
          opacity: softEase(frame, [12, 30], [0, 1]),
          transform: Math.round(cardY) === 0 ? "none" : `translate3d(0, ${Math.round(cardY)}px, 0)`,
        }}
      >
        <div className="window-dots" />
        <div className="prompt-box">
          <TextAnimation className="prompt-text" delay={16} sharp>
            Explain this policy update
          </TextAnimation>
        </div>
        <div className="thinking-row">
          <div className="waveform" style={{ transform: `scaleY(${1 + breathe(frame, 0.16, 8)})` }} />
          <TextAnimation className="thinking-text" delay={20} sharp>
            Thinking...
          </TextAnimation>
        </div>
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="skeleton-bar"
            style={{
              top: 260 + item * 54,
              width: `${[100, 62, 76, 42][item]}%`,
              opacity: softEase(frame, [32 + item * 4, 48 + item * 4], [0.25, 1]),
              transform: `scaleX(${0.86 + softEase(frame, [30 + item * 4, 54 + item * 4], [0, 0.14])})`,
            }}
          />
        ))}
      </div>
    </SceneShell>
  );
};

const IsometricStack = ({ safety = false }: { safety?: boolean }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lift = settle(frame, fps, 18);
  const y = interpolate(lift, [0, 1], [86, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  if (safety) {
    return (
      <div className="iso-wrap safety-wrap" style={{ transform: `translate3d(0, ${y + breathe(frame, 6, 54)}px, 0)` }}>
        <div className="orbit orbit-one" style={{ transform: `translate(-50%, -50%) rotate(${frame * 0.24}deg)` }} />
        <div className="orbit orbit-two" style={{ transform: `translate(-50%, -50%) rotate(${-frame * 0.18}deg)` }} />
        <div className="iso-layer iso-layer-bottom" />
        <div className="iso-layer iso-layer-middle copper-layer" />
        <div className="iso-layer iso-layer-top" />
        <div className="shield-core" style={{ transform: `translate(-50%, -50%) scale(${1 + breathe(frame, 0.025, 30)})` }}>
          <ShieldIcon className="shield-large" />
        </div>
      </div>
    );
  }

  return (
    <div className="iso-wrap" style={{ transform: `translate3d(0, ${y + breathe(frame, 7, 50)}px, 0)` }}>
      <div className="perspective-lines" />
      <div className="iso-slab slab-bottom">
        <ShieldIcon className="slab-icon" />
        <TextAnimation className="slab-label" delay={28} sharp>
          Safety & Alignment
        </TextAnimation>
      </div>
      <div className="iso-slab slab-middle">
        <LayersIcon className="slab-icon" />
        <TextAnimation className="slab-label" delay={24} sharp>
          Context Engine
        </TextAnimation>
      </div>
      <div className="iso-slab slab-top">
        <StarIcon className="slab-icon" />
        <TextAnimation className="slab-label slab-label-bright" delay={20} sharp>
          Claude 3
        </TextAnimation>
      </div>
    </div>
  );
};

export const ProductScene = ({ duration }: SceneProps) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell
      className="scene-product"
      duration={duration}
      background={
        <>
          <div className="dark-bloom" style={{ transform: `translate3d(${breathe(frame, 18, 62)}px, ${breathe(frame, 15, 56)}px, 0)` }} />
          <LineField />
          <NoiseLayer />
        </>
      }
    >
      <div className="dark-copy">
        <TextAnimation className="dark-headline" delay={6}>
          <span>Models that </span>
          <span className="accent-text">reason.</span>
        </TextAnimation>
        <TextAnimation className="dark-headline" delay={14}>
          <span>Teams that </span>
          <span className="accent-text">build.</span>
        </TextAnimation>
      </div>
      <FeatureRow delay={18} icon={<StarIcon className="line-icon" />} label="Stronger reasoning" top={575} />
      <FeatureRow delay={23} icon={<TargetIcon className="line-icon" />} label="Deeper context" top={690} />
      <FeatureRow delay={28} icon={<LockIcon className="line-icon" />} label="Enterprise ready" top={805} />
      <IsometricStack />
    </SceneShell>
  );
};

export const SafetyScene = ({ duration }: SceneProps) => {
  const frame = useCurrentFrame();
  return (
    <SceneShell
      className="scene-safety"
      duration={duration}
      background={
        <>
          <div className="dark-bloom safety-bloom" style={{ transform: `translate3d(${breathe(frame, 14, 48)}px, ${breathe(frame, 12, 60)}px, 0)` }} />
          <LineField />
          <NoiseLayer />
        </>
      }
    >
      <div className="dark-copy">
        <TextAnimation className="dark-headline heavy" delay={7}>
          Reliable
        </TextAnimation>
        <TextAnimation className="dark-headline heavy" delay={15}>
          <span>by </span>
          <span className="gradient-text">design.</span>
        </TextAnimation>
      </div>
      <FeatureRow delay={18} icon={<ShieldIcon className="line-icon" />} label="Constitutional guardrails" top={575} />
      <FeatureRow delay={23} icon={<PeopleIcon className="line-icon" />} label="Human-centered defaults" top={690} />
      <FeatureRow delay={28} icon={<DocIcon className="line-icon" />} label="Auditable decisions" top={805} />
      <IsometricStack safety />
    </SceneShell>
  );
};

export const FinalScene = ({ duration }: SceneProps) => {
  const frame = useCurrentFrame();
  const portalPulse = 1 + breathe(frame, 0.018, 38);
  const ctaIn = softEase(frame, [42, 62], [0, 1]);
  const endGlow = warmEase(frame, [duration - 34, duration - 4], [0, 1]);

  return (
    <SceneShell
      className="scene-final"
      duration={duration}
      isLast
      background={
        <>
          <div className="cream-wash" />
          <div className="dot-field dot-field-left" style={{ transform: `translate3d(${breathe(frame, 9, 42)}px, ${breathe(frame, 10, 48)}px, 0)` }} />
          <div className="dot-field dot-field-bottom" style={{ transform: `translate3d(${breathe(frame, 12, 54)}px, ${breathe(frame, 8, 46)}px, 0)` }} />
          <div className="end-glow" style={{ opacity: endGlow }} />
          <NoiseLayer />
        </>
      }
    >
      <div className="final-copy">
        <TextAnimation className="final-eyebrow" delay={5}>
          Anthropic Launch
        </TextAnimation>
        <TextAnimation className="final-headline" delay={11}>
          The future,
        </TextAnimation>
        <TextAnimation className="final-headline" delay={19}>
          <span className="accent-text">together.</span>
        </TextAnimation>
        <TextAnimation className="final-body" delay={31}>
          AI that brings frontier reasoning into everyday work with clarity, care, and control.
        </TextAnimation>
        <div
          className="cta-pill"
          style={{
            opacity: ctaIn,
            transform: `translate3d(0, ${20 * (1 - ctaIn) + breathe(frame, 1.5, 36)}px, 0) scale(${0.94 + ctaIn * 0.06})`,
          }}
        >
          <TextAnimation className="cta-text" delay={46} display="inline-block">
            Explore Claude
          </TextAnimation>
          <ArrowIcon className="cta-arrow" />
        </div>
      </div>
      <div className="portal-wrap" style={{ transform: `translate3d(0, ${breathe(frame, 8, 52)}px, 0)` }}>
        <svg className="portal-orbits" viewBox="0 0 720 720" aria-hidden="true">
          <circle cx="360" cy="360" r="300" />
          <circle cx="360" cy="360" r="226" />
          <circle cx="360" cy="360" r="154" />
        </svg>
        <div className="orbital-dot dot-a" style={{ transform: `rotate(${frame * 0.22}deg) translateX(300px) rotate(${-frame * 0.22}deg)` }} />
        <div className="orbital-dot dot-b" style={{ transform: `rotate(${-frame * 0.3 + 80}deg) translateX(226px) rotate(${frame * 0.3 - 80}deg)` }} />
        <div className="portal-core" style={{ transform: `translate(-50%, -50%) scale(${portalPulse})` }}>
          <TextAnimation className="portal-mark" delay={28}>
            A\
          </TextAnimation>
        </div>
      </div>
    </SceneShell>
  );
};
