import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

// Pre-encoded forward → reverse → loop (seamless ping-pong)
const VIDEO_SRC = "/videos/hero.mp4";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="hero-scrim absolute inset-0" aria-hidden="true" />

      <div className="hero-front relative z-10 mx-auto w-full max-w-3xl px-6 py-28 text-center sm:py-32">
        <p className="hero-text font-hero mb-3 text-sm font-normal tracking-[0.2em] uppercase">
          {t("hero.eyebrow")}
        </p>
        <h1 className="hero-text font-hero mb-4 text-5xl leading-[1.05] font-normal tracking-tight sm:text-6xl md:text-7xl">
          pluma
        </h1>
        <p className="hero-text mx-auto mb-10 max-w-xl text-base leading-relaxed font-normal sm:text-lg">
          {t("hero.tagline")}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/book"
            className="inline-block rounded-xl bg-accent px-6 py-3.5 text-base font-normal text-white no-underline shadow-lg shadow-black/30 transition-colors hover:bg-accent-hover"
          >
            {t("hero.book")}
          </Link>
          <Link
            to="/about"
            className="inline-block rounded-xl border-2 border-white/80 bg-white px-6 py-3.5 text-base font-normal text-black no-underline shadow-lg shadow-black/30 transition-colors hover:bg-white/90"
          >
            {t("hero.learnMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
