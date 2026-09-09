import type { ReactNode } from "react";

/**
 * A visibly labelled note for information that is not yet confirmed.
 *
 * Used instead of a bare `TODO`, an invented value, or quietly omitting
 * something a visitor would reasonably expect to find.
 */
export function PendingNote({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <p className="psl-pending">
      {label ? <span className="psl-pending__label">{label}</span> : null}
      <span>{children}</span>
    </p>
  );
}
