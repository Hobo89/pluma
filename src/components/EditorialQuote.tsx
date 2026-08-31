import { useLanguage } from "../context/LanguageContext";

const collageImages = [
  "/testimonials/sara.jpg",
  "/testimonials/candice.jpg",
  "/testimonials/beatrice.jpg",
];

export function EditorialQuote() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="quote-heading"
      className="psl-container psl-section"
    >
      <h2 id="quote-heading" className="psl-sr-only">
        {t("quote.title")}
      </h2>
      <figure className="psl-quote">
        <span className="psl-quote__mark" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote>{t("quote.text")}</blockquote>
        <figcaption>{t("quote.attribution")}</figcaption>
      </figure>

      <div className="psl-collage" aria-label={t("quote.collageLabel")}>
        {collageImages.map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            sizes="(max-width: 767px) 30vw, 22vw"
          />
        ))}
      </div>
    </section>
  );
}
