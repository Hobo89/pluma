import type { TestimonialRecord } from "../content/testimonials";
import type { Language } from "../i18n/translations";

export type QuoteToken = {
  text: string;
  word: boolean;
};

export function quoteTokens(value: string): QuoteToken[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [
      ...new Intl.Segmenter(undefined, { granularity: "word" }).segment(value),
    ].map((part) => ({
      text: part.segment,
      word: part.isWordLike === true,
    }));
  }

  return value
    .split(/(\s+)/)
    .filter(Boolean)
    .map((text) => ({
      text,
      word: /\S/.test(text),
    }));
}

/** How long the whole quote spends changing, capped so long reviews stay brisk. */
export function quoteRevealMs(wordCount: number): number {
  if (wordCount <= 8) return 860;
  return Math.min(1680, 860 + (wordCount - 8) * 22);
}

/** Stagger incoming words across the reveal, leaving time for each word to settle. */
export function wordDelayMs(
  index: number,
  count: number,
  revealMs: number,
): number {
  if (count <= 1 || index <= 0) return 0;
  const span = Math.max(0, revealMs - 640);
  return Math.round((index / (count - 1)) * span);
}

/**
 * Reader-language text for a hover or tap reveal.
 * Null when the quote is already in that language, or no version exists.
 */
export function quoteTranslation(
  record: Pick<TestimonialRecord, "locale" | "translations">,
  language: Language,
): string | null {
  if (record.locale === language) return null;
  const text = record.translations?.[language]?.trim();
  return text ? text : null;
}
