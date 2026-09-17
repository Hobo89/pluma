import type { CSSProperties } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAmbientVideo } from "../lib/useAmbientVideo";
import { BookingAction } from "./BookingAction";
import { HashLink } from "./HashLink";
import { PlumaHeroLogo } from "./PlumaHeroLogo";

const VIDEO_SRC = "/videos/hero.mp4";
const POSTER = "/assets/images/hero-poster.jpg";

export function Hero() {
  const { t } = useLanguage();
  const videoRef = useAmbientVideo();

  return (
    <section
      className="psl-hero psl-hero--video"
      style={
        {
          "--psl-focal": "50% 40%",
          "--psl-focal-mobile": "60% 45%",
          "--psl-hero-exposure": -3,
          "--psl-hero-whites": -2,
        } as CSSProperties
      }
    >
      {/* The poster is a still from the video's own first frame, so it shows
          the same scene while the file loads rather than an empty panel. */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={POSTER}
        className="psl-hero__image"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="psl-hero__body psl-hero__body--center psl-container">
        <p className="psl-hero__logo">
          <PlumaHeroLogo className="psl-hero__logo-image" />
        </p>
        <h1 className="psl-copy">{t("hero.headline")}</h1>
        <div className="psl-actions psl-hero__actions" data-hero-actions>
          <BookingAction
            label={t("hero.book")}
            placement="hero"
            className="psl-button"
          />
          <HashLink to="/#studio" className="psl-button psl-button--ghost">
            {t("hero.seeStudio")}
          </HashLink>
        </div>
      </div>
    </section>
  );
}
