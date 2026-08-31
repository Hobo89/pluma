import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Logo } from "./Logo";

const VIDEO_SRC = "/videos/hero.mp4";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      className="psl-hero"
      style={
        {
          "--psl-focal": "50% 40%",
          "--psl-focal-mobile": "60% 45%",
        } as CSSProperties
      }
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="psl-hero__image"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      <div className="psl-hero__body psl-hero__body--center psl-container">
        <p className="psl-eyebrow psl-hero__eyebrow">
          {t("hero.eyebrow")}
        </p>
        <h1 className="psl-hero__logo">
          <Logo variant="fullWhite" className="psl-hero__logo-image" />
        </h1>
        <p
          className="psl-copy"
          style={{ color: "rgb(255 255 255 / 90%)", maxWidth: "42ch" }}
        >
          {t("hero.tagline")}
        </p>
        <div className="psl-actions">
          <Link to="/about" className="psl-button psl-button--ghost">
            {t("hero.learnMore")}
          </Link>
        </div>
      </div>

    </section>
  );
}
