import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { HashLink } from "./HashLink";
import { rateFor, recommendedDuration } from "../config/pricing";
import { readiness } from "../config/readiness";
import { useLanguage } from "../context/LanguageContext";
import { formatPrice } from "../lib/money";
import { BookingAction } from "./BookingAction";

const VIDEO_SRC = "/videos/hero.mp4";
const POSTER_FALLBACK = "/assets/images/hero-poster.jpg";

type Connection = { saveData?: boolean };

/**
 * Decides whether the 13 MB decorative video may load at all.
 *
 * The poster is always the rendered image, so it is the LCP element and the
 * headline is readable before any media arrives. The video is an enhancement
 * for wide screens on a connection that has not asked us to hold back.
 */
function useDecorativeVideo(): boolean {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const wideEnough = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData =
      (navigator as Navigator & { connection?: Connection }).connection
        ?.saveData === true;

    const update = () => {
      setAllowed(wideEnough.matches && !reducedMotion.matches && !saveData);
    };

    update();
    wideEnough.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      wideEnough.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  return allowed;
}

export function Hero() {
  const { t, language } = useLanguage();
  const playVideo = useDecorativeVideo();
  const featured = rateFor(recommendedDuration);

  return (
    <section
      className="psl-hero"
      style={
        {
          "--psl-focal": "50% 40%",
          "--psl-focal-mobile": "60% 45%",
          "--psl-hero-exposure": -2,
          "--psl-hero-whites": -2,
        } as CSSProperties
      }
    >
      <picture>
        <source
          type="image/webp"
          srcSet="/assets/images/hero-poster-780.webp 780w, /assets/images/hero-poster-1280.webp 1280w, /assets/images/hero-poster-1920.webp 1920w"
          sizes="100vw"
        />
        <img
          className="psl-hero__image"
          src={POSTER_FALLBACK}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {playVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={POSTER_FALLBACK}
          className="psl-hero__image psl-hero__video"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : null}

      <div className="psl-hero__body psl-hero__body--center psl-container">
        <p className="psl-eyebrow psl-hero__eyebrow">{t("hero.eyebrow")}</p>
        <h1 className="psl-hero__title">{t("hero.title")}</h1>
        <p className="psl-hero__supporting">{t("hero.supporting")}</p>
        <p className="psl-hero__offer">
          {t("hero.offer", {
            price: formatPrice(featured.cents, language),
          })}
        </p>
        {!readiness.bookingReady ? (
          <p className="psl-hero__notice">{t("prelaunch.bookingNotice")}</p>
        ) : null}
        <div className="psl-actions psl-hero__actions" data-hero-actions>
          <BookingAction
            label={t("hero.primaryCta")}
            duration={recommendedDuration}
            placement="hero"
          />
          <HashLink to="/#durations" className="psl-textlink psl-textlink--onDark">
            {t("hero.secondaryCta")}
          </HashLink>
        </div>
      </div>
    </section>
  );
}
