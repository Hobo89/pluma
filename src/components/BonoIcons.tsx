/**
 * 24×24 monoline icons for the bono steps, drawn to match the supplied review
 * set (stroke 1.5, rounded joins, stroke only). They use `currentColor` rather
 * than the fixed ink value so they stay legible in dark mode.
 *
 * These are original drawings that are stylistically compatible with Iconoir;
 * they are not official Iconoir assets. If the licensed Iconoir set is added to
 * the project, prefer its matching icons.
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

export function BuyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 8h14l1 12H4L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function EmailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6" y="2" width="12" height="20" rx="2" />
      <path d="M10 5h4m-4 7 2 2 4-4M11 19h2" />
    </svg>
  );
}

export function BalanceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M5 7h14M5 12h8M5 17h5m5-1 2 2 4-5" />
    </svg>
  );
}
