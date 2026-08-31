import { useLanguage } from "../context/LanguageContext";

const VIDEO_SRC = "/videos/studio.mp4";

type StudioVideoProps = {
  showHeading?: boolean;
};

export function StudioVideo({ showHeading = true }: StudioVideoProps) {
  const { t } = useLanguage();

  return (
    <section aria-labelledby={showHeading ? "studio-heading" : undefined}>
      {showHeading && (
        <div className="psl-section-head psl-section-head--center">
          <p className="psl-eyebrow">{t("studio.eyebrow")}</p>
          <h2 id="studio-heading" className="psl-title">
            {t("studio.title")}
          </h2>
          <p className="psl-copy">{t("studio.description")}</p>
        </div>
      )}

      <div className="psl-media-panel">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-label={t("studio.videoLabel")}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
