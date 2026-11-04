import { useEffect, useRef } from "react";
import careSvg from "../../assets/pluma-benefits/benefit-care.svg?raw";
import headspaceSvg from "../../assets/pluma-benefits/benefit-headspace.svg?raw";
import unwindSvg from "../../assets/pluma-benefits/benefit-unwind.svg?raw";
import benefitsCss from "../../assets/pluma-benefits/pluma-benefits.css?raw";
import benefitsUrl from "../../assets/pluma-benefits/pluma-benefits.js?url";
import { useLanguage } from "../../context/LanguageContext";

const ILLUSTRATIONS = [
  { id: "rhythm", svg: headspaceSvg },
  { id: "unwind", svg: unwindSvg },
  { id: "care", svg: careSvg },
] as const;

type BenefitController = { destroy: () => void };

type BenefitsModule = {
  mountPlumaBenefits: (
    root?: ParentNode,
    options?: { threshold?: number },
  ) => BenefitController[];
};

/**
 * Inline originals, then the supplied runtime. State elsewhere on the page
 * must not remount this section: playback is one-shot per mounted SVG.
 */
export function GiftBenefits() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    let cancelled = false;
    let controllers: BenefitController[] = [];

    import(/* @vite-ignore */ benefitsUrl)
      .then((mod) => {
        if (cancelled) return;
        controllers = (mod as BenefitsModule).mountPlumaBenefits(root, {
          threshold: 0.9,
        });
      })
      .catch(() => {
        // The authored final frame stays in the markup.
      });

    return () => {
      cancelled = true;
      controllers.forEach((controller) => controller.destroy());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="psl-gift-benefits"
      aria-label={t("gift.benefitsLabel")}
    >
      <style>{benefitsCss}</style>
      {ILLUSTRATIONS.map((item) => (
        <article key={item.id} className="psl-gift-benefit">
          <div
            className="psl-gift-benefit__art"
            dangerouslySetInnerHTML={{ __html: item.svg }}
          />
          <h2 className="psl-gift-benefit__title">
            {t(`gift.benefits.${item.id}.title`)}
          </h2>
          <p className="psl-copy">{t(`gift.benefits.${item.id}.body`)}</p>
        </article>
      ))}
    </section>
  );
}
