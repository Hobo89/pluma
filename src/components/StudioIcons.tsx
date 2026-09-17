/**
 * 24×24 studio highlight icons. Monoline marks, stroke 1.5, rounded joins,
 * matching SafetyIcons and BonoIcons. `currentColor` keeps them readable in
 * dark mode.
 */

type IconProps = { className?: string };

const stroked = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function OldTownIcon({ className }: IconProps) {
  return (
    <svg {...stroked} className={className}>
      <path d="M12 21s6.4-5.4 6.4-10.2A6.4 6.4 0 0 0 5.6 10.8C5.6 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.15" />
    </svg>
  );
}

export function NoWaitIcon({ className }: IconProps) {
  return (
    <svg {...stroked} className={className}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.5v5l3.25 1.85" />
    </svg>
  );
}

export function MasseurIcon({ className }: IconProps) {
  return (
    <svg {...stroked} className={className}>
      <circle cx="12" cy="8.4" r="5.15" />
      <path d="m8.35 14.15-1.2 6.1 4.85-2.2 4.85 2.2-1.2-6.1" />
      <path d="m12 5.7 1.05 2.1 2.3.34-1.66 1.62.39 2.28L12 10.9l-2.08 1.14.39-2.28-1.66-1.62 2.3-.34Z" />
    </svg>
  );
}

export function HeatedTableIcon({ className }: IconProps) {
  return (
    <svg {...stroked} className={className}>
      <path d="M4.25 11.15h15.5v2.7H4.25z" />
      <path d="M6.6 13.85V19M17.4 13.85V19" />
      <path d="M8.1 8.35c.7-.7.7-1.55 0-2.25M12 8.35c.7-.7.7-1.55 0-2.25M15.9 8.35c.7-.7.7-1.55 0-2.25" />
    </svg>
  );
}

export function PrivateRoomIcon({ className }: IconProps) {
  return (
    <svg {...stroked} className={className}>
      <rect x="6" y="3.4" width="12" height="17.2" rx="1.2" />
      <path d="M14.15 12.2h1.7" />
    </svg>
  );
}
