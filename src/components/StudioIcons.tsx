/**
 * 24×24 studio highlight icons. They replace the 24px PNG raster set so the
 * marks stay sharp on retina. Shapes match the existing pin, clock, award,
 * table and door marks. `currentColor` keeps them readable in dark mode.
 */

type IconProps = { className?: string };

const filled = {
  viewBox: "0 0 24 24",
  width: 24,
  height: 24,
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
};

const stroked = {
  ...filled,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function OldTownIcon({ className }: IconProps) {
  return (
    <svg {...filled} className={className}>
      <path
        fillRule="evenodd"
        d="M12 2.4c-3.37 0-6.1 2.66-6.1 5.94 0 4.48 5.08 11.3 5.88 12.35a.35.35 0 0 0 .44 0c.8-1.05 5.88-7.87 5.88-12.35 0-3.28-2.73-5.94-6.1-5.94Zm0 8.16a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z"
      />
    </svg>
  );
}

export function NoWaitIcon({ className }: IconProps) {
  return (
    <svg {...stroked} className={className}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.4v5.1l3.4 2" />
    </svg>
  );
}

export function MasseurIcon({ className }: IconProps) {
  return (
    <svg {...filled} className={className}>
      <path d="M9.15 13.55 7.2 21.1a.4.4 0 0 0 .6.42L12 18.7l4.2 2.82a.4.4 0 0 0 .6-.42l-1.95-7.55" />
      <path
        fillRule="evenodd"
        d="M12 2.6a6.15 6.15 0 1 0 0 12.3 6.15 6.15 0 0 0 0-12.3Zm0 2.15 1.05 2.12 2.34.34-1.7 1.65.4 2.33L12 9.95l-2.09 1.24.4-2.33-1.7-1.65 2.34-.34L12 4.75Z"
      />
    </svg>
  );
}

export function HeatedTableIcon({ className }: IconProps) {
  return (
    <svg {...filled} className={className}>
      <path d="M4.2 10.2h15.6c.7 0 1.2.55 1.2 1.2v2.15H3V11.4c0-.65.5-1.2 1.2-1.2Z" />
      <path d="M6.15 13.55h2.2V19H6.15zM15.65 13.55h2.2V19h-2.2z" />
    </svg>
  );
}

export function PrivateRoomIcon({ className }: IconProps) {
  return (
    <svg {...filled} className={className}>
      <path
        fillRule="evenodd"
        d="M5.4 2.6h13.2v18.8H5.4V2.6Zm2.15 2.05h8.9v14.7h-8.9V4.65Z"
      />
      <circle cx="14.35" cy="12.2" r="1.05" />
    </svg>
  );
}
