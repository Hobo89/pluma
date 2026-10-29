import { useEffect, type CSSProperties } from "react";
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
import { holdTestimonialCard } from "../lib/testimonialWallScroll";
import { quoteTranslation } from "../lib/testimonialTranslation";
import { useTestimonialReveal } from "../lib/useTestimonialReveal";
import { BlurUpImage } from "./BlurUpImage";
import { TestimonialQuote } from "./TestimonialQuote";

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
  locale,
  translations,
  image,
  flags,
  countriesKey,
  objectPosition,
  quoteFontSize,
  focalPoint,
  stackedFocalPoint,
  variant = "card",
}: TestimonialCardProps) {
  const { t, language } = useLanguage();
  const translation = quoteTranslation({ locale, translations }, language);
  const { rootRef, lit, pulsing, handlers } = useTestimonialReveal(
    translation != null,
  );
  const translating = lit && translation != null;

  useEffect(() => {
    const card = rootRef.current;
    if (!lit || !card) return;
    return holdTestimonialCard(card);
  }, [lit, rootRef]);
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
      ref={rootRef}
      {...handlers}
      className={[
        "psl-testimonial-card",
        isStrip ? "psl-testimonial-card--strip" : "",
        lit ? "is-lit" : "",
        pulsing ? "is-pulse" : "",
        translating ? "is-translating" : "",
      ]
        .filter(Boolean)
        .join(" ")}
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
      <span className="psl-testimonial-card__shine" aria-hidden="true" />
      <div className="psl-testimonial-card__inner">
        {isStrip ? null : (
          <div className="psl-testimonial-card__portrait">
            {image ? (
              <BlurUpImage
                src={image}
                alt=""
                width={141}
                height={205}
                fill
              />
            ) : null}
          </div>
        )}

        <div className="psl-testimonial-card__copy">
          <span className="psl-testimonial-card__mark" aria-hidden="true">
            &ldquo;
          </span>
          <TestimonialQuote
            quote={quote}
            translation={translation}
            translating={translating}
            lang={translating ? language : locale}
          />
          <footer className="psl-testimonial-card__footer">
            {isStrip && image ? (
              <BlurUpImage
                src={image}
                alt=""
                width={56}
                height={56}
                fill
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
