import { CopyBlocks } from "./CopyBlocks";
import { HashLink } from "./HashLink";
import { Philosophy } from "./Philosophy";
import { useLanguage } from "../context/LanguageContext";
import { useAmbientVideo } from "../lib/useAmbientVideo";

const sections = [
  {
    id: "how",
    image: "/assets/images/stephen-portrait-smile.jpg",
    imageAltKey: "about.stephenPhotoAlt",
    placeholder: false,
  },
  {
    id: "origin",
    image: "/assets/images/origin-mother.jpg",
    imageAltKey: "about.origin.photoAlt",
    placeholder: false,
  },
  {
    id: "why",
    image: null,
    video: "/videos/pluma-feather-loop.mp4",
    videoPoster: "/assets/images/pluma-feather-poster.jpg",
    imageAltKey: "about.why.photoAlt",
    placeholder: false,
    imageClass: "psl-about-block__feather",
  },
] as const;

export function About() {
  const { t } = useLanguage();
  const featherVideoRef = useAmbientVideo();

  return (
    <>
      <div className="psl-container psl-page psl-about-page">
        <Philosophy />
        {sections.map((section, index) => (
          <article
            key={section.id}
            className={`psl-about-block${index % 2 === 1 ? " psl-about-block--reverse" : ""}`}
          >
            <figure className="psl-about-block__media">
              {section.placeholder ? (
                <div className="psl-about-placeholder" aria-hidden="true">
                  <span className="psl-about-placeholder__mark" />
                  <span className="psl-about-placeholder__label">
                    {t(section.imageAltKey)}
                  </span>
                </div>
              ) : "video" in section && section.video ? (
                <video
                  ref={featherVideoRef}
                  className={
                    "imageClass" in section ? section.imageClass : undefined
                  }
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={section.videoPoster}
                  width={1920}
                  height={1080}
                  aria-label={t(section.imageAltKey)}
                >
                  <source src={section.video} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={section.image ?? undefined}
                  alt={t(section.imageAltKey)}
                  className={
                    "imageClass" in section ? section.imageClass : undefined
                  }
                  width={section.id === "how" ? 768 : 1024}
                  height={section.id === "how" ? 1024 : 575}
                  loading="lazy"
                />
              )}
              {section.placeholder ? (
                <figcaption className="psl-sr-only">
                  {t(section.imageAltKey)}
                </figcaption>
              ) : null}
            </figure>
            <div className="psl-about-block__body">
              <h2 className="psl-title">{t(`about.${section.id}.heading`)}</h2>
              <CopyBlocks text={t(`about.${section.id}.body`)} />
            </div>
          </article>
        ))}

        <p className="psl-about-studio-link">
          <HashLink to="/#studio" className="psl-button psl-button--ghost">
            {t("about.studioCta")}
          </HashLink>
        </p>
      </div>
    </>
  );
}
