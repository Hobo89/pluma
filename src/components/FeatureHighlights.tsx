import type { ComponentType } from "react";
import {
  HeatedTableIcon,
  MasseurIcon,
  NoWaitIcon,
  OldTownIcon,
  PrivateRoomIcon,
} from "./StudioIcons";

type HighlightId =
  | "oldTown"
  | "heatedTable"
  | "noWait"
  | "privateRoom"
  | "masseur";

const highlightIcons: Record<HighlightId, ComponentType> = {
  oldTown: OldTownIcon,
  noWait: NoWaitIcon,
  masseur: MasseurIcon,
  heatedTable: HeatedTableIcon,
  privateRoom: PrivateRoomIcon,
};

function HighlightIcon({ id }: { id: HighlightId }) {
  const Icon = highlightIcons[id];
  return <Icon />;
}

export const studioHighlightIds = [
  "oldTown",
  "heatedTable",
  "noWait",
  "privateRoom",
  "masseur",
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
