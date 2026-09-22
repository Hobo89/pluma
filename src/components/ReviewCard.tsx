import { useLanguage } from "../context/LanguageContext";
import {
  type AreaId,
  type TestimonialFlag,
  type TestimonialRecord,
} from "../content/testimonials";

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

export function AreaBadges({ areas }: { areas: readonly AreaId[] }) {
  const { t } = useLanguage();

  if (areas.length === 0) return null;

  return (
    <ul className="psl-quote__areas">
      {areas.map((area) => (
        <li key={area}>{t(`testimonials.areas.${area}`)}</li>
      ))}
    </ul>
  );
}

export function ReviewCard({
  name,
  quote,
  image,
  flags,
  areas,
  countriesKey,
  objectPosition = "center top",
}: TestimonialRecord) {
  const { t } = useLanguage();
  const countriesLabel = countriesKey
    ? t(`testimonials.countries.${countriesKey}`)
    : undefined;

  return (
    <article className="psl-review-card">
      <blockquote className="psl-review-card__quote">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer className="psl-review-card__meta">
        <img
          src={image}
          alt=""
          width={64}
          height={64}
          loading="lazy"
          className="testimonial-avatar"
          style={{ objectPosition }}
        />
        <div>
          <p className="psl-review-card__name">
            {flags.length > 0 ? (
              <>
                {name} {t("testimonials.from")}{" "}
                <FlagMarks flags={flags} label={countriesLabel} />
              </>
            ) : (
              name
            )}
          </p>
          <AreaBadges areas={areas} />
        </div>
      </footer>
    </article>
  );
}
