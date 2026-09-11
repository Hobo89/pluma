import type { CSSProperties } from "react";
import { useLanguage } from "../context/LanguageContext";
import { StudioFeature } from "./StudioFeature";

export function About() {
  const { t } = useLanguage();

  return (
    <>
      <section
        className="psl-hero"
        style={
          {
            "--psl-focal": "50% 15%",
            "--psl-focal-mobile": "50% 20%",
            minHeight: "clamp(420px, 72vh, 640px)",
          } as CSSProperties
        }
      >
        <img
          className="psl-hero__image"
          src="/assets/images/stephen.jpg"
          alt=""
          aria-hidden="true"
          loading="eager"
        />
        <div className="psl-hero__body psl-container">
          <p className="psl-eyebrow" style={{ color: "rgb(255 255 255 / 85%)" }}>
            {t("about.eyebrow")}
          </p>
          <h1 className="psl-display" style={{ color: "var(--psl-white)" }}>
            {t("about.title")}
          </h1>
          <p
            className="psl-copy"
            style={{ color: "rgb(255 255 255 / 90%)", maxWidth: "42ch" }}
          >
            {t("about.body")}
          </p>
        </div>
      </section>

      <div className="psl-container psl-page psl-about-stephen">
        <figure className="psl-about-stephen__portrait">
          <img
            src="/assets/images/stephen-portrait-smile.jpg"
            alt={t("about.stephenPhotoAlt")}
            width={480}
            height={640}
            loading="lazy"
          />
        </figure>
        <p className="psl-copy">{t("about.stephen")}</p>
      </div>

      <StudioFeature />
    </>
  );
}
