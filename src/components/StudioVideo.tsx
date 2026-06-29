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
        <div className="mb-8 text-center md:mb-10">
          <p className="mb-2 text-sm font-normal tracking-widest text-accent uppercase">
            {t("studio.eyebrow")}
          </p>
          <h2
            id="studio-heading"
            className="text-3xl font-normal tracking-tight md:text-4xl"
          >
            {t("studio.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-normal text-muted">
            {t("studio.description")}
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border bg-bg shadow-sm">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="mx-auto aspect-[9/16] max-h-[70vh] w-full max-w-md object-cover"
          aria-label={t("studio.videoLabel")}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
