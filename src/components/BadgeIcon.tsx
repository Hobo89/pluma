type BadgeTier = "nestling" | "fledgling" | "wingmate";

type BadgeIconProps = {
  tier: BadgeTier;
  className?: string;
};

export function BadgeIcon({ tier, className = "testimonial-badge-icon" }: BadgeIconProps) {
  const shared = {
    className,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (tier === "nestling") {
    return (
      <svg {...shared}>
        <path d="M2.75 10.75c1.65 1.35 4.85 1.35 6.5 0" />
        <path d="M3.5 10.75c1.35.85 3.65.85 5 0" />
        <circle cx="8" cy="7.75" r="1.1" />
        <path d="M8 8.85v1" />
        <path d="M9 7.55l.75-.6" />
      </svg>
    );
  }

  if (tier === "fledgling") {
    return (
      <svg {...shared}>
        <circle cx="8" cy="4.85" r="1.1" />
        <path d="M8 5.95v2.35" />
        <path d="M4.75 7.35 8 6.35l3.25 1" />
        <path d="M6.75 10.65 8 12.35l1.25-1.7" />
        <path d="M9.05 4.65l.85-.75" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <path d="M5.25 13.25c0-3.35 1.05-5.85 2.75-8" />
      <path d="M10.75 13.25c0-3.35-1.05-5.85-2.75-8" />
      <path d="M8 5.25c-.55 1.55-.85 3.2-.85 4.85" />
      <path d="M6.35 9.1c.55.35 1.05.55 1.65.55s1.1-.2 1.65-.55" />
    </svg>
  );
}
