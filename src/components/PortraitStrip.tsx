import { useLanguage } from "../context/LanguageContext";

const portraits = [
  "/testimonials/jesus.jpg",
  "/testimonials/juanma.jpg",
  "/testimonials/sarah.jpg",
  "/testimonials/carla.jpg",
  "/testimonials/sara.jpg",
  "/testimonials/candice.jpg",
];

export function PortraitStrip() {
  const { t } = useLanguage();

  return (
    <div className="psl-section">
      <div
        className="psl-gallery"
        role="region"
        aria-label={t("gallery.label")}
        tabIndex={0}
      >
        {portraits.map((src, index) => (
          <img
            key={`${src}-${index}`}
            src={src}
            alt=""
            loading="lazy"
            sizes="(max-width: 767px) 160px, 17vw"
          />
        ))}
      </div>
    </div>
  );
}
