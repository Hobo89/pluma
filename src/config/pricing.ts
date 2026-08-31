export type PricingDuration = 30 | 60 | 90 | 120;

export type SessionRate = {
  minutes: PricingDuration;
  single: number;
};

export type VoucherCardRate = {
  minutes: 60 | 90;
  total: number;
  perSession: number;
};

export type VoucherCard = {
  sessions: 5 | 10;
  discountPercent: 10 | 15;
  rates: readonly VoucherCardRate[];
};

export const pricingPolicy = {
  voucherCardDurations: [60, 90] as const satisfies readonly PricingDuration[],
} as const;

export const sessionRates: readonly SessionRate[] = [
  { minutes: 30, single: 25 },
  { minutes: 60, single: 45 },
  { minutes: 90, single: 65 },
  { minutes: 120, single: 85 },
] as const;

export const voucherCards: readonly VoucherCard[] = [
  {
    sessions: 5,
    discountPercent: 10,
    rates: [
      { minutes: 60, total: 202.5, perSession: 40.5 },
      { minutes: 90, total: 292.5, perSession: 58.5 },
    ],
  },
  {
    sessions: 10,
    discountPercent: 15,
    rates: [
      { minutes: 60, total: 382.5, perSession: 38.25 },
      { minutes: 90, total: 552.5, perSession: 55.25 },
    ],
  },
] as const;

export function formatEuro(amount: number): string {
  const formatted = amount.toFixed(2).replace(/\.00$/, "");
  return `€${formatted}`;
}
