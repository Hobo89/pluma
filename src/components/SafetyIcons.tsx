/**
 * 24×24 monoline marks for the first three safety cards. Stroke 1.5, rounded
 * joins, `currentColor` so they stay legible in dark mode. Original drawings
 * in the same family as the bono step icons.
 */

type IconProps = { className?: string };

const base = {
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

export function AgreeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21a9 9 0 1 0-8.05-4.73L3 21.25l4.4-1.02A9 9 0 0 0 12 21Z" />
    </svg>
  );
}

export function ChangeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8.25 13.6V5.2a1.35 1.35 0 0 1 2.7 0V12" />
      <path d="M10.95 12V3.35a1.35 1.35 0 0 1 2.7 0V12" />
      <path d="M13.65 12.2V5.2a1.35 1.35 0 1 1 2.7 0V13.2" />
      <path d="M7.2 13.7V10.7A1.7 1.7 0 0 0 4.2 10.2v5.3A5.4 5.4 0 0 0 9.6 21.15h1.7A5.85 5.85 0 0 0 19.05 15.4V8.15a1.35 1.35 0 0 0-2.7 0V13.5" />
    </svg>
  );
}

export function PainIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M16.45 9.2C13.6 7.2 12.5 5.75 12.5 4.3a2.05 2.05 0 0 1 3.95-1.1 2.05 2.05 0 0 1 3.95 1.1c0 1.45-1.1 2.9-3.95 4.9Z" />
      <path d="M3.9 12.5a1.75 1.75 0 0 1 3.5 0v5.45a1.75 1.75 0 1 1-3.5 0Z" />
      <path d="M6.85 13.8C9.6 12.55 13.4 12.6 15.55 14.55C16.7 15.6 16.6 17.15 15.35 17.9" />
      <path d="M15.35 17.9C17.5 16.7 20.35 15.25 21.25 16.7C22.2 18.2 20.7 20.15 17.85 20.7C15.4 21.2 11.2 21.05 6.85 20.55" />
    </svg>
  );
}
