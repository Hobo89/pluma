import { TestimonialBrushBorder } from "./TestimonialBrushBorder";
import { useLanguage } from "../context/LanguageContext";
import {
  testimonials,
  type AreaId,
  type TestimonialFlag,
  type TestimonialRecord,
} from "../content/testimonials";

function FlagMarks({
  flags,
  label,
}: {
  flags: readonly TestimonialFlag[];
  label?: string;
}) {
  if (flags.length === 0) return null;

  return (
    <span
      className="testimonial-flags"
      role="img"
      aria-label={label}
    >
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

function AreaBadges({ areas }: { areas: readonly AreaId[] }) {
  const { t } = useLanguage();

  return (
    <ul className="psl-quote__areas">
      {areas.map((area) => (
        <li key={area}>{t(`testimonials.areas.${area}`)}</li>
      ))}
    </ul>
  );
}

function TestimonialCard({
  name,
  quote,
  image,
  flags,
  areas,
  countriesKey,
  objectPosition = "center top",
  stroke,
}: TestimonialRecord & { stroke: number }) {
  const { t } = useLanguage();
  const countriesLabel = countriesKey
    ? t(`testimonials.countries.${countriesKey}`)
    : undefined;

  return (
    <figure className="testimonial-card flex w-[18.5rem] shrink-0 flex-col sm:w-[19.5rem]">
      <TestimonialBrushBorder variant={stroke} />
      <blockquote className="testimonial-quote relative z-[1] flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="testimonial-meta relative z-[1]">
        <img
          src={image}
          alt={name}
          width={64}
          height={64}
          loading="lazy"
          className="testimonial-avatar"
          style={{ objectPosition }}
        />
        <div className="testimonial-name-row">
          <span className="testimonial-name">{name}</span>
          {flags.length > 0 ? (
            <>
              <span>{t("testimonials.from")}</span>
              <FlagMarks flags={flags} label={countriesLabel} />
            </>
          ) : null}
        </div>
      </figcaption>
      <AreaBadges areas={areas} />
    </figure>
  );
}

export function Testimonials() {
  const { t } = useLanguage();
  const loop = [...testimonials, ...testimonials];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="psl-container psl-section"
    >
      <div className="psl-section-head psl-section-head--center">
        <h2 id="testimonials-heading" className="psl-title">
          {t("testimonials.title")}
        </h2>
      </div>

      <div className="psl-testimonials-marquee testimonials-marquee-mask overflow-hidden">
        <div className="testimonials-marquee flex w-max gap-5">
          {loop.map((item, index) => (
            <TestimonialCard
              key={`${item.id}-${index}`}
              {...item}
              stroke={index % 7}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
