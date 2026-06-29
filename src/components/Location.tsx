import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

export function Location() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="location-heading"
      className="border-b border-border bg-surface py-10 md:py-12"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-center">
        <p className="text-sm font-normal tracking-widest text-accent uppercase">
          {t("location.eyebrow")}
        </p>
        <h2
          id="location-heading"
          className="text-2xl font-normal tracking-tight md:text-3xl"
        >
          {t("location.walk")}
        </h2>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-xl text-base leading-relaxed text-muted no-underline transition-colors hover:text-accent"
        >
          {site.address}
        </a>
      </div>
    </section>
  );
}
