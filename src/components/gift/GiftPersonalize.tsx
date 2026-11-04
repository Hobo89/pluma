import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  TALLY_FORM_PUBLISHED,
  defaultGiftDesign,
  giftCardDesigns,
  giftCardImage,
  giftDesignById,
  tallyEmbedSrc,
  tallyPublicSrc,
  type GiftDesignId,
} from "../../config/giftCards";
import { useLanguage } from "../../context/LanguageContext";

type TallyWindow = Window & {
  Tally?: { loadEmbeds: () => void };
};

const TALLY_LOADER = "https://tally.so/widgets/embed.js";

function loadTallyEmbeds() {
  const tally = (window as TallyWindow).Tally;
  if (tally) {
    tally.loadEmbeds();
    return;
  }
  document
    .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
    .forEach((frame) => {
      if (frame.dataset.tallySrc) frame.src = frame.dataset.tallySrc;
    });
}

export function GiftPersonalize() {
  const { t, language } = useLanguage();
  const groupName = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<GiftDesignId>(defaultGiftDesign);
  const [loadedDesign, setLoadedDesign] = useState<GiftDesignId | null>(null);
  const [formStatus, setFormStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const locked = loadedDesign !== null;
  const preview = giftDesignById(locked ? loadedDesign : selected);
  const previewImage = giftCardImage(preview.file);

  useEffect(() => {
    if (!loadedDesign) return;
    let cancelled = false;
    setFormStatus("loading");

    const run = () => {
      if (cancelled) return;
      loadTallyEmbeds();
      setFormStatus("ready");
    };

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TALLY_LOADER}"]`,
    );
    if (existing) {
      if (existing.dataset.loaded === "true") run();
      else existing.addEventListener("load", run, { once: true });
      return () => {
        cancelled = true;
      };
    }

    const script = document.createElement("script");
    script.src = TALLY_LOADER;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      run();
    };
    script.onerror = () => {
      if (!cancelled) setFormStatus("error");
    };
    document.body.appendChild(script);
    return () => {
      cancelled = true;
    };
  }, [loadedDesign]);

  const continueWithDesign = () => {
    if (!TALLY_FORM_PUBLISHED || locked) return;
    setLoadedDesign(selected);
  };

  useEffect(() => {
    if (!loadedDesign) return;
    const section = sectionRef.current;
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
    const frame = section.querySelector("iframe");
    if (!frame) return;
    if (!frame.getAttribute("height")) frame.setAttribute("height", "200");
    frame.focus({ preventScroll: true });
  }, [loadedDesign]);

  return (
    <section
      ref={sectionRef}
      id="personalize"
      className="psl-gift-personalize"
      aria-labelledby="gift-personalize-heading"
      tabIndex={-1}
    >
      <h2 id="gift-personalize-heading" className="psl-title">
        {t("gift.personalizeTitle")}
      </h2>
      <p className="psl-copy psl-gift-personalize__caption">
        {t("gift.designCaption")}
      </p>
      <p className="psl-copy psl-copy--small psl-gift-steps">{t("gift.formSteps")}</p>

      <div className="psl-gift-split">
        <div className="psl-gift-chooser">
          <figure className="psl-gift-preview">
            <img
              src={previewImage.src}
              width={previewImage.width}
              height={previewImage.height}
              alt={t("gift.cardAlt", { design: preview.label })}
            />
          </figure>

          <fieldset className="psl-gift-designs" disabled={locked}>
            <legend className="psl-sr-only">{t("gift.designLegend")}</legend>
            <div className="psl-gift-designs__grid" role="presentation">
              {giftCardDesigns.map((design) => {
                const image = giftCardImage(design.file);
                const checked = preview.designId === design.designId;
                return (
                  <label
                    key={design.designId}
                    className={`psl-gift-design${checked ? " is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name={groupName}
                      value={design.designId}
                      checked={selected === design.designId}
                      onChange={() => {
                        if (!locked) setSelected(design.designId);
                      }}
                    />
                    <img
                      src={image.src}
                      width={image.width}
                      height={image.height}
                      alt=""
                    />
                    <span>{design.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {locked ? (
            <p className="psl-copy psl-copy--small">{t("gift.designLocked")}</p>
          ) : (
            <button
              type="button"
              className="psl-button"
              onClick={continueWithDesign}
            >
              {t("gift.continueDesign")}
            </button>
          )}
        </div>

        <div className="psl-gift-form">
          {!TALLY_FORM_PUBLISHED ? (
            <div className="psl-gift-unpublished">
              <h3>{t("gift.unpublishedTitle")}</h3>
              <p className="psl-copy">{t("gift.unpublishedBody")}</p>
              {language === "es" ? (
                <p className="psl-copy psl-copy--small">{t("gift.formLanguage")}</p>
              ) : null}
            </div>
          ) : loadedDesign ? (
            <>
              {language === "es" ? (
                <p className="psl-copy psl-copy--small">{t("gift.formLanguage")}</p>
              ) : null}
              {formStatus === "loading" ? (
                <p className="psl-copy">{t("gift.formLoading")}</p>
              ) : null}
              {formStatus === "error" ? (
                <p className="psl-copy">
                  {t("gift.formError")}{" "}
                  <a
                    className="psl-textlink"
                    href={tallyPublicSrc(loadedDesign)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("gift.formOpen")}
                  </a>
                </p>
              ) : null}
              <iframe
                data-tally-src={tallyEmbedSrc(loadedDesign)}
                title={t("gift.formFrameTitle")}
                width="100%"
                loading="lazy"
              />
            </>
          ) : (
            <p className="psl-copy">{t("gift.formWaiting")}</p>
          )}

          <p className="psl-copy">{t("gift.payment")}</p>
          <p className="psl-copy psl-copy--small">
            {t("bonos.termsAgree")}{" "}
            <Link to="/condiciones-bonos" className="psl-textlink">
              {t("bonos.termsLink")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
