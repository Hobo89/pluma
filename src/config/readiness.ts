/**
 * Release states.
 *
 * Each flag gates a capability that depends on a real-world fact being
 * confirmed (registration, a configured payment provider, a tested wallet
 * refresh). A flag is not a decorative switch: turning one on asserts that the
 * dependency listed in its `blockedBy` entry has actually been satisfied and
 * recorded in OWNER-INPUTS.md.
 *
 * Defaults are all `false`. Staging can override individual flags through
 * `VITE_READY_*` env vars so the complete experience can be built and reviewed
 * without any of it reaching the public site.
 */

export type ReadinessFlag =
  | "businessReady"
  | "bookingReady"
  | "bonoSalesReady"
  | "appleWalletReady"
  | "googleWalletReady"
  | "balanceUpdatesReady";

function envFlag(name: string): boolean {
  const raw = import.meta.env[name as keyof ImportMetaEnv];
  return raw === "true" || raw === "1";
}

/** Opt-out flag: on unless the env var explicitly disables it. */
function envFlagOn(name: string): boolean {
  const raw = import.meta.env[name as keyof ImportMetaEnv];
  return !(raw === "false" || raw === "0");
}

export const readiness: Record<ReadinessFlag, boolean> = {
  /** Owner confirmed registration, permitted operation and mandatory disclosures. */
  businessReady: envFlag("VITE_READY_BUSINESS"),
  /**
   * Booking is live. The Cal.com calendar is the real booking route, so this
   * defaults to on and can be turned off with `VITE_READY_BOOKING=false` if the
   * calendar ever needs to be taken down.
   */
  bookingReady: envFlagOn("VITE_READY_BOOKING"),
  /** Payment provider configured, terms approved, paid-order issuance and delivery verified. */
  bonoSalesReady: envFlag("VITE_READY_BONO_SALES"),
  /** Apple Wallet pass generation and installation verified on a real device. */
  appleWalletReady: envFlag("VITE_READY_APPLE_WALLET"),
  /** Google Wallet pass generation and installation verified on a real device. */
  googleWalletReady: envFlag("VITE_READY_GOOGLE_WALLET"),
  /** Remaining-session updates measured end to end, including refresh latency. */
  balanceUpdatesReady: envFlag("VITE_READY_BALANCE_UPDATES"),
};

/**
 * What each flag is waiting on. Surfaced in the owner checklist and in the
 * staging-only readiness banner so an unset flag is always explainable.
 */
export const readinessBlockers: Record<ReadinessFlag, string> = {
  businessReady:
    "Autónomo registration, premises activity permission and complete legal disclosures.",
  bookingReady:
    "Live. Remaining follow-ups are the per-duration event mapping and the final approved price.",
  bonoSalesReady:
    "Payment provider selected and live, approved sales terms, verified paid-order issuance and email delivery.",
  appleWalletReady: "Apple Wallet pass issuance tested on a real device.",
  googleWalletReady: "Google Wallet pass issuance tested on a real device.",
  balanceUpdatesReady:
    "Measured pass-refresh behaviour, including offline and delayed-update cases.",
};

/** Any public state that takes money or confirms an appointment. */
export const transactionalReady =
  readiness.businessReady && readiness.bookingReady;

/** Wallet delivery can only be promised if at least one wallet is proven. */
export const anyWalletReady =
  readiness.appleWalletReady || readiness.googleWalletReady;
