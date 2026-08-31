import { BadgeIcon } from "./BadgeIcon";
import { TestimonialBrushBorder } from "./TestimonialBrushBorder";
import { useLanguage } from "../context/LanguageContext";

type BadgeTier = "nestling" | "fledgling" | "wingmate";

type Testimonial = {
  id: string;
  image: string;
  flags: string[];
  badge: BadgeTier;
  stroke: number;
  objectPosition?: string;
};

const testimonials: Testimonial[] = [
  {
    id: "carla",
    image: "/testimonials/carla.jpg",
    flags: ["🇪🇸"],
    badge: "nestling",
    stroke: 0,
    objectPosition: "center top",
  },
  {
    id: "sara",
    image: "/testimonials/sara.jpg",
    flags: ["🇲🇦"],
    badge: "fledgling",
    stroke: 1,
    objectPosition: "center top",
  },
  {
    id: "candice",
    image: "/testimonials/candice.jpg",
    flags: ["🇺🇸", "🇮🇳"],
    badge: "wingmate",
    stroke: 2,
    objectPosition: "center top",
  },
  {
    id: "beatrice",
    image: "/testimonials/beatrice.jpg",
    flags: ["🇧🇪"],
    badge: "nestling",
    stroke: 3,
    objectPosition: "center top",
  },
  {
    id: "jesus",
    image: "/testimonials/jesus.jpg",
    flags: ["🇪🇸"],
    badge: "nestling",
    stroke: 4,
    objectPosition: "center 12%",
  },
  {
    id: "juanma",
    image: "/testimonials/juanma.jpg",
    flags: ["🇪🇸"],
    badge: "fledgling",
    stroke: 5,
    objectPosition: "center 18%",
  },
  {
    id: "sarah",
    image: "/testimonials/sarah.jpg",
    flags: ["🇬🇧"],
    badge: "wingmate",
    stroke: 6,
    objectPosition: "center 20%",
  },
];

function TestimonialCard({
  id,
  image,
  flags,
  badge,
  stroke,
  objectPosition = "center top",
}: Testimonial) {
  const { t } = useLanguage();

  return (
    <figure className="testimonial-card flex w-[18.5rem] shrink-0 flex-col sm:w-[19.5rem]">
      <TestimonialBrushBorder variant={stroke} />
      <blockquote className="testimonial-quote relative z-[1] flex-1">
        &ldquo;{t(`testimonials.${id}.quote`)}&rdquo;
      </blockquote>

      <figcaption className="testimonial-meta relative z-[1]">
        <img
          src={image}
          alt={t(`testimonials.${id}.name`)}
          width={64}
          height={64}
          loading="lazy"
          className="testimonial-avatar"
          style={{ objectPosition }}
        />
        <div className="testimonial-name-row">
          {flags.length > 0 && (
            <span
              className="testimonial-flags"
              role="img"
              aria-label={t(`testimonials.${id}.countries`)}
            >
              {flags.join("\u2009")}
            </span>
          )}
          <span className="testimonial-name">{t(`testimonials.${id}.name`)}</span>
        </div>
        <span className={`testimonial-badge testimonial-badge--${badge}`}>
          <BadgeIcon tier={badge} />
          {t(`badges.${badge}`)}
        </span>
      </figcaption>
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
        <p className="psl-eyebrow">{t("testimonials.eyebrow")}</p>
        <h2 id="testimonials-heading" className="psl-title">
          {t("testimonials.title")}
        </h2>
      </div>

      <div className="psl-testimonials-marquee testimonials-marquee-mask overflow-hidden">
        <div className="testimonials-marquee flex w-max gap-5">
          {loop.map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
