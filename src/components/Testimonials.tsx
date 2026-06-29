import { useLanguage } from "../context/LanguageContext";

const testimonials = [
  { id: "carla", image: "/testimonials/carla.jpg" },
  { id: "sara", image: "/testimonials/sara.jpg" },
  { id: "candice", image: "/testimonials/candice.jpg" },
  { id: "beatrice", image: "/testimonials/beatrice.jpg" },
] as const;

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-t border-border bg-surface py-20 md:py-24"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center md:mb-14">
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

        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map(({ id, image }) => (
            <li key={id}>
              <figure className="flex h-full flex-col">
                <div className="mb-4 overflow-hidden rounded-xl border border-border bg-bg">
                  <img
                    src={image}
                    alt={t(`testimonials.${id}.name`)}
                    width={600}
                    height={800}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </div>
                <blockquote className="mb-3 flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{t(`testimonials.${id}.quote`)}&rdquo;
                </blockquote>
                <figcaption className="text-sm font-medium text-text">
                  {t(`testimonials.${id}.name`)}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
