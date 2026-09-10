import type { Language } from "../i18n/translations";
import type { BonoDesignId } from "../config/bonos";
import type { PricingDuration } from "../config/pricing";

/**
 * Minimal measurement layer.
 *
 * No analytics provider is wired up. `track` collects events into a bounded
 * in-memory buffer and, in development, logs them, so the call sites can be
 * reviewed before any collection actually happens. Attaching a provider is a
 * separate decision that depends on the cookie/consent outcome.
 *
 * The property types below are the whole permitted vocabulary. Names, email
 * addresses, phone numbers, booking notes, health information, booking tokens
 * and full URLs must never be passed through here.
 */

export type AnalyticsEvent =
  | {
      name: "booking_cta_clicked";
      placement:
        | "hero"
        | "header"
        | "durations"
        | "studio"
        | "sticky"
        | "footer_cta"
        | "footer_nav"
        | "pricing"
        | "bono_return";
      language: Language;
      duration?: PricingDuration;
    }
  | { name: "booking_widget_loaded"; language: Language; duration?: PricingDuration }
  | {
      name: "booking_widget_failed";
      reason: "timeout" | "embed_error" | "not_configured";
    }
  | {
      name: "booking_confirmed";
      duration?: PricingDuration;
      language?: Language;
    }
  | { name: "bono_checkout_started"; packageId: string; design: BonoDesignId }
  | { name: "bono_purchase_confirmed"; packageId: string; design: BonoDesignId };

const BUFFER_LIMIT = 50;
const buffer: AnalyticsEvent[] = [];

export function track(event: AnalyticsEvent): void {
  buffer.push(event);
  if (buffer.length > BUFFER_LIMIT) buffer.shift();

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event.name, event);
  }
}

/** Exposed for the manual QA checks in the implementation report. */
export function recordedEvents(): readonly AnalyticsEvent[] {
  return buffer;
}
