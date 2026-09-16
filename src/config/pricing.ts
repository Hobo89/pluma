/**
 * Single price catalogue.
 *
 * Every website price, saving, duration label and voucher total derives from
 * this file. Amounts are integer cents so no arithmetic in page code can
 * introduce a rounding difference between a total and its per-session figure.
 *
 * Displayed amounts are tax-inclusive consumer prices. Nothing may add tax
 * on top of them at a later step.
 *
 * Source: docs/handoff/2026-09-15/reference/DECISIONS.md
 */

export type PricingDuration = 60 | 90 | 120;
export type VoucherDuration = 60 | 90;
export type VoucherSessions = 5 | 10;

/** How a duration can currently be booked. */
export type BookingRoute =
  /** A calendar event exists (subject to owner verification of the mapping). */
  | "calendar"
  /** No matching event confirmed; the only honest route is an email inquiry. */
  | "inquiry";

export type SessionRate = {
  minutes: PricingDuration;
  /** Gross consumer price in cents. */
  cents: number;
  /** Owner recommends this duration. Not a sales-volume claim. */
  recommended: boolean;
  bookingRoute: BookingRoute;
};

export const sessionRates: readonly SessionRate[] = [
  { minutes: 60, cents: 4500, recommended: false, bookingRoute: "calendar" },
  { minutes: 90, cents: 6500, recommended: true, bookingRoute: "calendar" },
  { minutes: 120, cents: 8500, recommended: false, bookingRoute: "calendar" },
] as const;

export const recommendedDuration: PricingDuration = 90;

export const pricingPolicy = {
  /** Voucher cards apply to 60 and 90 minute sessions only. */
  voucherCardDurations: [60, 90] as const satisfies readonly PricingDuration[],
  /** First session must take place within this many days of issue. */
  firstSessionDeadlineDays: 30,
} as const;

export function rateFor(minutes: PricingDuration): SessionRate {
  const rate = sessionRates.find((entry) => entry.minutes === minutes);
  if (!rate) throw new Error(`No session rate for ${minutes} minutes`);
  return rate;
}

export function isPricingDuration(value: unknown): value is PricingDuration {
  return (
    typeof value === "number" &&
    sessionRates.some((rate) => rate.minutes === value)
  );
}

/** Parses a `?duration=` query value, returning null for anything unknown. */
export function parseDuration(value: string | null): PricingDuration | null {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return isPricingDuration(parsed) ? parsed : null;
}

// --- Vouchers --------------------------------------------------------------

export type VoucherRate = {
  minutes: VoucherDuration;
  /** Gross total for the whole card, in cents. */
  totalCents: number;
  /** Exact per-session amount, in cents. */
  perSessionCents: number;
  /** Difference against buying the same sessions individually, in cents. */
  savingCents: number;
};

export type VoucherCard = {
  sessions: VoucherSessions;
  discountPercent: 10 | 15;
  /** Validity length from the first session. */
  validityMonths: 3 | 6;
  rates: readonly VoucherRate[];
};

const VOUCHER_TERMS: readonly {
  sessions: VoucherSessions;
  discountPercent: 10 | 15;
  validityMonths: 3 | 6;
}[] = [
  { sessions: 5, discountPercent: 10, validityMonths: 3 },
  { sessions: 10, discountPercent: 15, validityMonths: 6 },
];

function buildVoucherRate(
  minutes: VoucherDuration,
  sessions: VoucherSessions,
  discountPercent: number,
): VoucherRate {
  const undiscounted = rateFor(minutes).cents * sessions;
  const totalCents = (undiscounted * (100 - discountPercent)) / 100;

  if (!Number.isInteger(totalCents)) {
    throw new Error(
      `Voucher total for ${sessions}×${minutes} is not a whole number of cents`,
    );
  }

  const perSessionCents = totalCents / sessions;
  if (!Number.isInteger(perSessionCents)) {
    throw new Error(
      `Per-session amount for ${sessions}×${minutes} is not a whole number of cents`,
    );
  }

  return {
    minutes,
    totalCents,
    perSessionCents,
    savingCents: undiscounted - totalCents,
  };
}

export const voucherCards: readonly VoucherCard[] = VOUCHER_TERMS.map(
  (term) => ({
    ...term,
    rates: pricingPolicy.voucherCardDurations.map((minutes) =>
      buildVoucherRate(minutes, term.sessions, term.discountPercent),
    ),
  }),
);

export function voucherRateFor(
  sessions: VoucherSessions,
  minutes: VoucherDuration,
): VoucherRate {
  const card = voucherCards.find((entry) => entry.sessions === sessions);
  const rate = card?.rates.find((entry) => entry.minutes === minutes);
  if (!rate) throw new Error(`No voucher rate for ${sessions}×${minutes}`);
  return rate;
}

export function voucherCardFor(sessions: VoucherSessions): VoucherCard {
  const card = voucherCards.find((entry) => entry.sessions === sessions);
  if (!card) throw new Error(`No voucher card for ${sessions} sessions`);
  return card;
}
