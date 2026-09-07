type HighlightId = "oldTown" | "heatedTable" | "noWait" | "privateRoom";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function HighlightIcon({ id }: { id: HighlightId }) {
  if (id === "oldTown") {
    return (
      <svg {...iconProps}>
        <path d="M3.75 20.25V10.5L9 6.75l5.25 3.75v9.75" />
        <path d="M14.25 20.25v-8.25L18 9.5l3.75 2.5v8.25" />
        <path d="M7.5 20.25v-4.5h3v4.5" />
        <path d="M7.25 12.25h.5M16.75 13.5h.5" />
      </svg>
    );
  }

  if (id === "heatedTable") {
    return (
      <svg {...iconProps}>
        <path d="M4.5 14.25h15" />
        <path d="M6.75 14.25v5M17.25 14.25v5" />
        <path d="M6.5 14.25 8 11.75h8l1.5 2.5" />
        <path d="M8.5 7.5c.7-1 1.8-1 2.5 0M13 7.5c.7-1 1.8-1 2.5 0" />
        <path d="M10.25 9.75c.45-.7 1.05-.7 1.5 0" />
      </svg>
    );
  }

  if (id === "noWait") {
    return (
      <svg {...iconProps}>
        <path d="M5.75 20.25V5.75h8.5v14.5" />
        <path d="M14.25 9.5 19 12.25l-4.75 2.75" />
        <path d="M10.5 12.75h.5" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M6.5 20.25V8h11v12.25" />
      <path d="M9.25 8V5.75h5.5V8" />
      <path d="M12 11.25v1.5" />
      <path d="M10.25 12.75h3.5" />
      <path d="M10.75 14.5v3M12 14.5v4M13.25 14.5v3" />
    </svg>
  );
}

export const studioHighlightIds = [
  "oldTown",
  "heatedTable",
  "noWait",
  "privateRoom",
] as const satisfies readonly HighlightId[];

type FeatureHighlightsProps = {
  ids: readonly HighlightId[];
  label: (id: HighlightId) => string;
};

export function FeatureHighlights({ ids, label }: FeatureHighlightsProps) {
  return (
    <ul className="psl-feature-list">
      {ids.map((id) => (
        <li key={id}>
          <span className="psl-feature-list__icon">
            <HighlightIcon id={id} />
          </span>
          <span className="psl-feature-list__text">{label(id)}</span>
        </li>
      ))}
    </ul>
  );
}
