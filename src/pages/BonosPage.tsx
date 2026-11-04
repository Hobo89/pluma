import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { GiftBenefits } from "../components/gift/GiftBenefits";
import { GiftPersonalize } from "../components/gift/GiftPersonalize";
import { GiftProcess } from "../components/gift/GiftProcess";
import {
  giftCardImage,
  giftDesignById,
  type GiftDesignId,
} from "../config/giftCards";
import { useLanguage } from "../context/LanguageContext";

const FAQ = ["receive", "validity", "where"] as const;

const HERO_CARDS: { id: GiftDesignId; place: "left" | "front" | "right" }[] = [
  { id: "Sand", place: "left" },
  { id: "Forest", place: "front" },
  { id: "Aqua", place: "right" },
];

function scrollToPersonalize() {
  const target = document.getElementById("personalize");
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
  target.focus({ preventScroll: true });
}

export function BonosPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <PageMeta page="bonos" />
      <div className="psl-gift">
        <section className="psl-gift-hero" aria-labelledby="gift-hero-heading">
          <h1 id="gift-hero-heading" className="psl-page-title">
            {t("gift.heroTitle")}
          </h1>
          <p className="psl-copy psl-gift-hero__support">
            {t("gift.heroLine1")}
            <br />
            {t("gift.heroLine2")}
          </p>
          <div className="psl-gift-hero__stack">
            {HERO_CARDS.map((card) => {
              const design = giftDesignById(card.id);
              const image = giftCardImage(design.file);
              return (
                <img
                  key={card.id}
                  className={`psl-gift-hero__card psl-gift-hero__card--${card.place}`}
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={
                    card.place === "front"
                      ? t("gift.cardAlt", { design: design.label })
                      : ""
                  }
                />
              );
            })}
          </div>
          <button type="button" className="psl-button" onClick={scrollToPersonalize}>
            {t("gift.heroCta")}
          </button>
          <p className="psl-copy psl-copy--small">{t("gift.heroOffer")}</p>
        </section>

        <GiftBenefits />
        <GiftPersonalize />
        <GiftProcess />

        <section className="psl-faq psl-gift-faq" aria-labelledby="gift-faq-heading">
          <h2 id="gift-faq-heading" className="psl-title">
            {t("gift.faqTitle")}
          </h2>
          <div>
            {FAQ.map((id) => (
              <details key={id}>
                <summary>
                  {t(`gift.faq.${id}.question`)}
                  <span className="psl-faq__icon" aria-hidden="true" />
                </summary>
                <p>{t(`gift.faq.${id}.answer`)}</p>
              </details>
            ))}
          </div>
          <p className="psl-copy psl-gift-contact">
            {t("gift.contactLead")}{" "}
            <a className="psl-textlink" href="mailto:stephen@pluma.life">{t("gift.contactLink")}</a>.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
