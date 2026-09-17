import type { PricingDuration } from "./pricing";

/**
 * Cal.com booking links.
 *
 * Default booking page: https://cal.com/pluma-massage-studio
 *
 * Dedicated events:
 * - 60  https://cal.com/pluma-massage-studio/60m-massage
 * - 90  https://cal.com/pluma-massage-studio/90-massage
 * - 120 https://cal.com/pluma-massage-studio/120m-massage
 *
 * `VITE_CALCOM_LINK` and `VITE_CALCOM_LINK_60` / `_90` / `_120` can override
 * those paths. The mapping is explicit and owner-supplied on purpose. The
 * installed embed (`@calcom/embed-react` 1.5.3) types its config as an open
 * record of query parameters, so almost anything can be passed, but only a
 * value the owner has actually verified against a real event is safe to send.
 */

/** Event slug used by the embed (`username` or `username/event`). */
export const DEFAULT_CAL_LINK = "pluma-massage-studio";

const DEFAULT_DURATION_LINKS: Record<PricingDuration, string> = {
  60: "pluma-massage-studio/60m-massage",
  90: "pluma-massage-studio/90-massage",
  120: "pluma-massage-studio/120m-massage",
};

/** Accept a slug or a full cal.com URL; the embed wants the path only. */
function calSlug(value: string | undefined): string {
  if (!value) return "";
  return value
    .trim()
    .replace(/^https?:\/\/(?:www\.)?cal\.com\//i, "")
    .replace(/^\/+|\/+$/g, "");
}

export const calLink =
  calSlug(import.meta.env.VITE_CALCOM_LINK) || DEFAULT_CAL_LINK;

const perDuration: Record<PricingDuration, string> = {
  60:
    calSlug(import.meta.env.VITE_CALCOM_LINK_60) || DEFAULT_DURATION_LINKS[60],
  90:
    calSlug(import.meta.env.VITE_CALCOM_LINK_90) || DEFAULT_DURATION_LINKS[90],
  120:
    calSlug(import.meta.env.VITE_CALCOM_LINK_120) ||
    DEFAULT_DURATION_LINKS[120],
};

/**
 * Set only when the owner confirms the default event is a multi-duration event
 * that accepts the `duration` query parameter. Until then no duration is sent,
 * because a rejected parameter would silently show the wrong length.
 */
export const calSupportsDurationParam =
  import.meta.env.VITE_CALCOM_MULTI_DURATION === "true";

export type CalTarget = {
  link: string;
  /** Extra query parameters that the owner has verified for this event. */
  params: Record<string, string>;
  /** True when the link is specific to the requested duration. */
  durationMatched: boolean;
};

export function calTargetFor(duration?: PricingDuration): CalTarget | null {
  const specific = duration ? perDuration[duration] : undefined;

  if (specific) {
    return { link: specific, params: {}, durationMatched: true };
  }

  if (!calLink) return null;

  const params: Record<string, string> = {};
  let durationMatched = false;

  if (duration && calSupportsDurationParam) {
    params.duration = String(duration);
    durationMatched = true;
  }

  return { link: calLink, params, durationMatched };
}

export const calConfigured =
  calLink.length > 0 || Object.values(perDuration).some(Boolean);

/** Isolated namespace for the floating popup button (separate from the inline embed). */
export const calFloatingNamespace = "secret";

/** Public URL for the "open the calendar directly" fallback. */
export function calDirectUrl(target: CalTarget): string {
  const query = new URLSearchParams(target.params).toString();
  return `https://cal.com/${target.link}${query ? `?${query}` : ""}`;
}
