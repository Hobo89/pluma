import type { PricingDuration } from "../config/pricing";

type OpenBooking = (duration?: PricingDuration) => void;

/**
 * Imperative helper for non-React callers. Prefer `useBookingModal()` in
 * components. Kept so older call sites can be redirected without Cal's modal.
 */
let openBookingImpl: OpenBooking | null = null;

export function registerBookingOpener(open: OpenBooking | null) {
  openBookingImpl = open;
}

export function openCalBookingModal(duration?: PricingDuration): boolean {
  if (!openBookingImpl) return false;
  openBookingImpl(duration);
  return true;
}
