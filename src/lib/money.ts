import type { Language } from "../i18n/translations";

/**
 * All catalogue amounts are integer cents. Formatting is the only place that
 * turns them into a decimal amount, so no rounding happens in page code.
 */

const LOCALES: Record<Language, string> = {
  en: "en-IE",
  es: "es-ES",
};

/**
 * Renders a cent amount as a consumer price: `€65` / `€292.50` in English,
 * `65 €` / `292,50 €` in Spanish. Whole euro amounts drop the decimals; any
 * amount with cents keeps both digits.
 */
export function formatPrice(cents: number, language: Language): string {
  const hasCents = cents % 100 !== 0;

  return new Intl.NumberFormat(LOCALES[language], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/** Duration label, e.g. `90 min` / `90 min`. */
export function formatMinutes(minutes: number, language: Language): string {
  return `${new Intl.NumberFormat(LOCALES[language]).format(minutes)} min`;
}

/** Percentage label used for voucher discounts. */
export function formatPercent(percent: number, language: Language): string {
  return new Intl.NumberFormat(LOCALES[language], {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(percent / 100);
}
