import type { PricingDuration } from "./pricing";

/**
 * Cal.com booking links.
 *
 * `VITE_CALCOM_LINK` is the default event. A per-duration link can be supplied
 * with `VITE_CALCOM_LINK_30` / `_60` / `_90` / `_120` when the owner creates a
 * separate event for each length.
 *
 * The mapping is explicit and owner-supplied on purpose. The installed embed
 * (`@calcom/embed-react` 1.5.3) types its config as an open record of query
 * parameters, so almost anything can be passed, but only a value the owner has
 * actually verified against a real event is safe to send. Nothing here guesses
 * a slug, a locale parameter or a duration option.
 */

export const calLink = import.meta.env.VITE_CALCOM_LINK ?? "";

const perDuration: Partial<Record<PricingDuration, string>> = {
  30: import.meta.env.VITE_CALCOM_LINK_30,
  60: import.meta.env.VITE_CALCOM_LINK_60,
  90: import.meta.env.VITE_CALCOM_LINK_90,
  120: import.meta.env.VITE_CALCOM_LINK_120,
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
