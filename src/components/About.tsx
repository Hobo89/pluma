import { useLanguage } from "../context/LanguageContext";
import { StudioVideo } from "./StudioVideo";

export function About() {
  const { t } = useLanguage();

  return (
    <>
      <section className="relative flex min-h-[72vh] items-end overflow-hidden md:min-h-[78vh]">
        <img
          src="/assets/images/stephen.jpg"
          alt=""
          aria-hidden="true"
          width={1024}
          height={576}
          className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
        />
        <div className="about-hero-fade absolute inset-0" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-12 pt-32 md:pb-16">
          <p className="mb-2 text-sm font-normal tracking-widest text-accent uppercase">
            {t("about.eyebrow")}
          </p>
          <h1 className="about-hero-text mb-5 text-4xl font-normal tracking-tight md:text-5xl">
            {t("about.title")}
          </h1>
          <p className="about-hero-text max-w-2xl font-normal leading-relaxed">
            {t("about.body")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-14 px-6 py-12 md:space-y-16 md:py-16">
        <p className="max-w-2xl font-normal leading-relaxed text-muted">
          {t("about.stephen")}
        </p>
        <StudioVideo showHeading={false} />
      </div>
    </>
  );
}
