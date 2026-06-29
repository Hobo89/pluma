import { BadgeIcon } from "./BadgeIcon";
import { useLanguage } from "../context/LanguageContext";

type BadgeTier = "nestling" | "fledgling" | "wingmate";

type Testimonial = {
  id: string;
  image: string;
  flags: string[];
  badge: BadgeTier;
  objectPosition?: string;
};

const testimonials: Testimonial[] = [
  { id: "carla", image: "/testimonials/carla.jpg", flags: ["🇪🇸"], badge: "nestling" },
  { id: "sara", image: "/testimonials/sara.jpg", flags: ["🇲🇦"], badge: "fledgling" },
  { id: "candice", image: "/testimonials/candice.jpg", flags: ["🇺🇸", "🇮🇳"], badge: "wingmate" },
  { id: "beatrice", image: "/testimonials/beatrice.jpg", flags: ["🇧🇪"], badge: "nestling" },
  { id: "jesus", image: "/testimonials/jesus.jpg", flags: ["🇪🇸"], badge: "nestling", objectPosition: "center 12%" },
  { id: "juanma", image: "/testimonials/juanma.jpg", flags: ["🇪🇸"], badge: "fledgling", objectPosition: "center 18%" },
  { id: "sarah", image: "/testimonials/sarah.jpg", flags: ["🇬🇧"], badge: "wingmate", objectPosition: "center 20%" },
];

function TestimonialCard({
  id,
  image,
  flags,
  badge,
  objectPosition = "center top",
}: Testimonial) {
  const { t } = useLanguage();

  return (
    <figure className="testimonial-card flex w-[17.5rem] shrink-0 flex-col sm:w-[18.5rem]">
      <div className="mb-4 overflow-hidden rounded-xl border border-border bg-bg">
        <img
          src={image}
          alt={t(`testimonials.${id}.name`)}
          width={600}
          height={800}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover"
          style={{ objectPosition }}
        />
      </div>
      <blockquote className="mb-3 flex-1 text-sm leading-relaxed text-muted">
        &ldquo;{t(`testimonials.${id}.quote`)}&rdquo;
      </blockquote>
      <figcaption className="space-y-2">
        <span className={`testimonial-badge testimonial-badge--${badge}`}>
          <BadgeIcon tier={badge} />
          {t(`badges.${badge}`)}
        </span>
        <div className="flex items-center gap-2 text-sm font-medium text-text">
          {flags.length > 0 && (
            <span
              className="text-[0.85rem] leading-none tracking-wide opacity-65"
              role="img"
              aria-label={t(`testimonials.${id}.countries`)}
            >
              {flags.join("\u2009")}
            </span>
          )}
          <span>{t(`testimonials.${id}.name`)}</span>
        </div>
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
      className="border-t border-border bg-surface py-20 md:py-24"
    >
      <div className="mx-auto mb-12 max-w-5xl px-6 text-center md:mb-14">
        <p className="mb-2 text-sm font-normal tracking-widest text-accent uppercase">
          {t("testimonials.eyebrow")}
        </p>
        <h2
          id="testimonials-heading"
          className="text-3xl font-normal tracking-tight md:text-4xl"
        >
          {t("testimonials.title")}
        </h2>
      </div>

      <div className="testimonials-marquee-mask overflow-hidden">
        <div className="testimonials-marquee flex w-max gap-6 px-6">
          {loop.map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
