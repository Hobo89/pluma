import { useEffect, type CSSProperties } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  type TestimonialFlag,
  type TestimonialRecord,
  type TestimonialSocial,
} from "../content/testimonials";
import {
  quoteAttributionGapRem,
  quoteFontSizePx,
  quoteLineHeight,
} from "../lib/quoteSize";
import { holdTestimonialCard } from "../lib/testimonialWallScroll";
import { portraitCrop } from "../lib/portraitCrop";
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

export type TestimonialCardVariant = "card" | "strip" | "hero";

/** Client cards name the person. Organiser cards name the event and studio. */
export type TestimonialAttribution = "client" | "organizer";

type TestimonialCardProps = TestimonialRecord & {
  variant?: TestimonialCardVariant;
  attribution?: TestimonialAttribution;
  /** Words between the name and the organisation, for an organiser card. */
  roleLabel?: string;
};

export function TestimonialCard({
  name,
  quote,
  locale,
  translations,
  image,
  imageSize,
  face,
  flags,
  countriesKey,
  objectPosition,
  quoteFontSize,
  focalPoint,
  business,
  socials,
  variant = "card",
  attribution = "client",
  roleLabel,
}: TestimonialCardProps) {
  const { t, language } = useLanguage();
  const translation = quoteTranslation({ locale, translations }, language);
  const { rootRef, lit, pulsing, holdGeneration, handlers } =
    useTestimonialReveal(translation != null);
  const translating = lit && translation != null;

  useEffect(() => {
    const card = rootRef.current;
    if (!card) return;
    const viewport = card.closest(".psl-testimonial-wall__viewport");
    const strip =
      viewport instanceof HTMLElement &&
      (viewport.classList.contains("psl-testimonial-wall__viewport--horizontal") ||
        viewport.classList.contains("psl-testimonial-wall__viewport--static"));
    if (!lit && !(pulsing && strip)) return;
    return holdTestimonialCard(card);
  }, [lit, pulsing, holdGeneration, rootRef]);
  const countriesLabel = countriesKey
    ? t(`testimonials.countries.${countriesKey}`)
    : undefined;
  const sizePx = quoteFontSizePx(quote, quoteFontSize);
  const focal = focalCss(focalPoint, objectPosition);
  const portrait = portraitCrop(imageSize, face);
  const isStrip = variant === "strip";
  const isHero = variant === "hero";
  const isOrganizer = attribution === "organizer";

  const location =
    countriesLabel || flags.length > 0 ? (
      <span className="psl-testimonial-card__from">
        {flags.length > 0 ? (
          <span aria-hidden={countriesLabel ? true : undefined}>
            <FlagMarks flags={flags} />
          </span>
        ) : null}
        {countriesLabel ? (
          <span className="psl-testimonial-card__origin">{countriesLabel}</span>
        ) : null}
      </span>
    ) : null;

  const credit = isOrganizer ? (
    <>
      <p className="psl-testimonial-card__role">
        <span className="psl-testimonial-card__name">{name}</span>
        {roleLabel ? (
          <>
            {" "}
            <span className="psl-testimonial-card__role-label">{roleLabel}</span>
          </>
        ) : null}
        {business ? (
          <>
            {" "}
            <span className="psl-testimonial-card__business">{business}</span>
          </>
        ) : null}
      </p>
      {location}
      <SocialLinks socials={socials} />
    </>
  ) : (
    <>
      <span className="psl-testimonial-card__name">{name}</span>
      {business ? (
        <span className="psl-testimonial-card__business">{business}</span>
      ) : null}
      {location}
      <SocialLinks socials={socials} />
    </>
  );

  return (
    <article
      ref={rootRef}
      {...handlers}
      className={[
        "psl-testimonial-card",
        isStrip ? "psl-testimonial-card--strip" : "",
        isHero ? "psl-testimonial-card--hero" : "",
        isOrganizer ? "psl-testimonial-card--organizer" : "",
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
          "--testimonial-stacked-focal-point": portrait.objectPosition,
          "--testimonial-portrait-ratio": String(portrait.aspectRatio),
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
              <div className="psl-testimonial-card__person">{credit}</div>
            ) : (
              credit
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}

function SocialLinks({ socials }: { socials?: readonly TestimonialSocial[] }) {
  if (!socials || socials.length === 0) return null;

  return (
    <ul className="psl-testimonial-card__socials">
      {socials.map((social) => (
        <li key={social.href}>
          <a href={social.href} target="_blank" rel="noopener noreferrer">
            <SocialIcon href={social.href} />
            <span>{social.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function SocialIcon({ href }: { href: string }) {
  let host = "";
  try {
    host = new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }

  if (host !== "instagram.com") return null;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
