type IconProps = {
  className?: string;
};

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2,
};

export const WarningIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 10 58 54H6L32 10Z" {...strokeProps} />
    <path d="M32 25v13" {...strokeProps} />
    <path d="M32 47h.1" {...strokeProps} />
  </svg>
);

export const ClockIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="23" {...strokeProps} />
    <path d="M32 17v16l12 7" {...strokeProps} />
  </svg>
);

export const LayersIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 9 56 22 32 35 8 22 32 9Z" {...strokeProps} />
    <path d="m12 32 20 11 20-11" {...strokeProps} />
    <path d="m12 43 20 11 20-11" {...strokeProps} />
  </svg>
);

export const StarIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 7v50M7 32h50M14 14l36 36M50 14 14 50" {...strokeProps} />
    <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.22" />
  </svg>
);

export const TargetIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="20" {...strokeProps} />
    <circle cx="32" cy="32" r="6" {...strokeProps} />
    <path d="M32 6v12M32 46v12M6 32h12M46 32h12" {...strokeProps} />
  </svg>
);

export const LockIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <rect x="14" y="28" width="36" height="26" rx="7" {...strokeProps} />
    <path d="M22 28v-7c0-6.5 4.2-11 10-11s10 4.5 10 11v7" {...strokeProps} />
    <path d="M32 38v7" {...strokeProps} />
  </svg>
);

export const ShieldIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 7 53 16v15c0 14-8.6 23.4-21 27C19.6 54.4 11 45 11 31V16L32 7Z" {...strokeProps} />
    <path d="m22 32 7 7 15-17" {...strokeProps} />
  </svg>
);

export const PeopleIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="24" cy="24" r="9" {...strokeProps} />
    <circle cx="43" cy="26" r="7" {...strokeProps} />
    <path d="M10 53c2.5-10 9.2-15 14-15s11.5 5 14 15" {...strokeProps} />
    <path d="M36 43c3.6.6 7.7 3.6 10 10" {...strokeProps} />
  </svg>
);

export const DocIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M18 8h20l12 12v36H18V8Z" {...strokeProps} />
    <path d="M38 8v13h12" {...strokeProps} />
    <path d="M25 33h20M25 43h14" {...strokeProps} />
  </svg>
);

export const ArrowIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M12 32h38" {...strokeProps} />
    <path d="M38 18 52 32 38 46" {...strokeProps} />
  </svg>
);
