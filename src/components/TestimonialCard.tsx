import type { CSSProperties } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  type TestimonialFlag,
  type TestimonialRecord,
} from "../content/testimonials";
import {
  quoteAttributionGapRem,
  quoteFontSizePx,
  quoteLineHeight,
} from "../lib/quoteSize";

export function FlagMarks({
  flags,
  label,
}: {
  flags: readonly TestimonialFlag[];
  label?: string;
}) {
  if (flags.length === 0) return null;

  return (
    <span className="testimonial-flags" role="img" aria-label={label}>
      {flags.map((flag) =>
        flag.type === "emoji" ? (
          <span key={flag.glyph}>{flag.glyph}</span>
        ) : (
          <img
            key={flag.src}
            src={flag.src}
            alt=""
            className="psl-quote__flag-image"
          />
        ),
      )}
    </span>
  );
}

function focalCss(point?: { x: number; y: number }, fallback?: string) {
  if (point) return `${point.x}% ${point.y}%`;
  return fallback ?? "50% 35%";
}

type TestimonialCardProps = TestimonialRecord & {
  variant?: "card" | "strip";
};

export function TestimonialCard({
  name,
  quote,
  image,
  flags,
  countriesKey,
  objectPosition,
  quoteFontSize,
  focalPoint,
  stackedFocalPoint,
  variant = "card",
}: TestimonialCardProps) {
  const { t } = useLanguage();
  const countriesLabel = countriesKey
    ? t(`testimonials.countries.${countriesKey}`)
    : undefined;
  const sizePx = quoteFontSizePx(quote, quoteFontSize);
  const focal = focalCss(focalPoint, objectPosition);
  const stackedFocal = focalCss(stackedFocalPoint, focal);
  const isStrip = variant === "strip";

  const attribution = (
    <>
      <span className="psl-testimonial-card__name">{name}</span>
      {countriesLabel ? (
        <span className="psl-testimonial-card__from">
          {flags.length > 0 ? (
            <span aria-hidden="true">
              <FlagMarks flags={flags} />
            </span>
          ) : null}
          <span className="psl-testimonial-card__origin">{countriesLabel}</span>
        </span>
      ) : null}
    </>
  );

  return (
    <article
      className={
        isStrip
          ? "psl-testimonial-card psl-testimonial-card--strip"
          : "psl-testimonial-card"
      }
      style={
        {
          "--testimonial-quote-size": `${sizePx / 16}rem`,
          "--testimonial-quote-lh": String(quoteLineHeight(sizePx)),
          "--testimonial-attr-gap": `${quoteAttributionGapRem(sizePx)}rem`,
          "--testimonial-focal-point": focal,
          "--testimonial-stacked-focal-point": stackedFocal,
        } as CSSProperties
      }
    >
      <div className="psl-testimonial-card__inner">
        {isStrip ? null : (
          <div className="psl-testimonial-card__portrait">
            {image ? (
              <img
                src={image}
                alt=""
                width={141}
                height={205}
                loading="lazy"
              />
            ) : null}
          </div>
        )}

        <div className="psl-testimonial-card__copy">
          <span className="psl-testimonial-card__mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="psl-testimonial-card__quote">{quote}</blockquote>
          <footer className="psl-testimonial-card__footer">
            {isStrip && image ? (
              <img
                src={image}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                className="psl-testimonial-card__avatar"
              />
            ) : null}
            {isStrip ? (
              <div className="psl-testimonial-card__person">{attribution}</div>
            ) : (
              attribution
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}
