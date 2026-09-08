type HighlightId =
  | "oldTown"
  | "heatedTable"
  | "noWait"
  | "privateRoom"
  | "certified";

const highlightIcons: Record<HighlightId, string> = {
  oldTown: "/assets/images/icon-old-town.png",
  noWait: "/assets/images/icon-no-wait-time.png",
  certified: "/assets/images/icon-certified-masseuse.png",
  heatedTable: "/assets/images/icon-heated-massage-table.png",
  privateRoom: "/assets/images/icon-private-room.png",
};

function HighlightIcon({ id }: { id: HighlightId }) {
  return <img src={highlightIcons[id]} alt="" aria-hidden="true" />;
}

export const studioHighlightIds = [
  "oldTown",
  "heatedTable",
  "noWait",
  "privateRoom",
  "certified",
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
