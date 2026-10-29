import type { CSSProperties } from "react";
import { quoteFontSizePx, quoteLineHeight } from "../lib/quoteSize";
import {
  quoteRevealMs,
  quoteTokens,
  wordDelayMs,
  type QuoteToken,
} from "../lib/testimonialTranslation";

function QuoteWords({
  tokens,
  revealMs,
}: {
  tokens: readonly QuoteToken[];
  revealMs: number;
}) {
  const wordCount = tokens.reduce(
    (count, token) => count + (token.word ? 1 : 0),
    0,
  );
  let wordIndex = 0;
  let delay = 0;

  return tokens.map((token, index) => {
    if (/^\s+$/.test(token.text)) {
      return <span key={index}>{token.text}</span>;
    }

    if (token.word) {
      delay = wordDelayMs(wordIndex, wordCount, revealMs);
      wordIndex += 1;
    }

    return (
      <span
        key={index}
        className="psl-testimonial-card__word"
        style={{ "--word-delay": `${delay}ms` } as CSSProperties}
      >
        {token.text}
      </span>
    );
  });
}

export function TestimonialQuote({
  quote,
  translation,
  translating,
  lang,
}: {
  quote: string;
  translation: string | null;
  translating: boolean;
  lang: string;
}) {
  if (!translating || !translation) {
    return (
      <blockquote className="psl-testimonial-card__quote" lang={lang}>
        {quote}
      </blockquote>
    );
  }

  const tokens = quoteTokens(translation);
  const wordCount = tokens.reduce(
    (count, token) => count + (token.word ? 1 : 0),
    0,
  );
  const revealMs = quoteRevealMs(wordCount);
  const sizePx = quoteFontSizePx(translation);

  return (
    <blockquote
      className="psl-testimonial-card__quote"
      lang={lang}
      style={{ "--quote-reveal": `${revealMs}ms` } as CSSProperties}
    >
      <span className="psl-testimonial-card__quote-stack">
        <span
          className="psl-testimonial-card__quote-layer psl-testimonial-card__quote-layer--out"
          aria-hidden="true"
        >
          {quote}
        </span>
        <span
          className="psl-testimonial-card__quote-layer psl-testimonial-card__quote-layer--in"
          style={
            {
              fontSize: `${sizePx / 16}rem`,
              lineHeight: String(quoteLineHeight(sizePx)),
            } as CSSProperties
          }
        >
          <QuoteWords tokens={tokens} revealMs={revealMs} />
        </span>
      </span>
    </blockquote>
  );
}
