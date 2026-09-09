import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type HashLinkProps = {
  /** Path plus fragment, e.g. `/#durations`. */
  to: string;
  className?: string;
  children: ReactNode;
};

/**
 * Link to a fragment on the same page.
 *
 * React Router does not scroll to fragments, and on the current page a plain
 * `Link` would re-render without moving. Scrolling is handled here so the
 * element also receives focus, which keyboard users need.
 */
export function HashLink({ to, className, children }: HashLinkProps) {
  const { pathname } = useLocation();
  const [path, hash] = to.split("#");
  const samePage = (path || "/") === pathname;

  return (
    <Link
      to={to}
      className={className}
      onClick={(event) => {
        if (!samePage || !hash) return;
        const target = document.getElementById(hash);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }}
    >
      {children}
    </Link>
  );
}
