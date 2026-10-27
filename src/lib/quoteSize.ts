export const QUOTE_SIZE_MIN_PX = 15;
export const QUOTE_SIZE_MAX_PX = 25;

function graphemeCount(value: string): number {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [
      ...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(
        value,
      ),
    ].length;
  }

  return [...value].length;
}

export function quoteCharacterCount(quote: string): number {
  return graphemeCount(quote.replace(/\s+/g, " ").trim());
}

export function quoteFontSizePx(quote: string, override?: number): number {
  if (
    typeof override === "number" &&
    override >= QUOTE_SIZE_MIN_PX &&
    override <= QUOTE_SIZE_MAX_PX
  ) {
    return override;
  }

  const count = quoteCharacterCount(quote);
  if (count <= 70) return 25;
  if (count <= 140) return 22;
  if (count <= 240) return 19;
  if (count <= 360) return 17;
  return 15;
}

export function quoteLineHeight(sizePx: number): number {
  return sizePx >= 22 ? 1.24 : 1.28;
}

export function quoteAttributionGapRem(sizePx: number): number {
  return sizePx >= 22 ? 0.5 : 0.75;
}
