import { Link } from "react-router-dom";
import { bonoStripCards } from "../config/bonos";
import { useLanguage } from "../context/LanguageContext";
import { useScrollFill } from "../lib/useScrollFill";
import { BrandMarkedHeading } from "./BrandMarkedHeading";

const inviteCards = [
  {
    ...bonoStripCards[0],
    from: "left",
  },
  {
    ...bonoStripCards[1],
    from: "right",
  },
  {
    ...bonoStripCards[2],
    from: "left",
  },
  {
    ...bonoStripCards[3],
    from: "right",
  },
] as const;

export function PricingVoucherInvite() {
  const { t } = useLanguage();
  const ref = useScrollFill<HTMLElement>({
    property: "--psl-scatter",
    start: 1.05,
    end: 0.42,
  });

  return (
    <section
      ref={ref}
      className="psl-pricing-section psl-pricing-invite"
      aria-labelledby="pricing-voucher-heading"
    >
      <div className="psl-pricing-invite__stage" aria-hidden="true">
        {inviteCards.map((card) => (
          <img
            key={card.id}
            src={card.png}
            alt=""
            width={card.width}
            height={card.height}
            decoding="async"
            draggable={false}
            className={`psl-pricing-invite__card psl-pricing-invite__card--${card.id} psl-pricing-invite__card--${card.from}`}
          />
        ))}
      </div>
      <div className="psl-pricing-invite__copy">
        <BrandMarkedHeading
          id="pricing-voucher-heading"
          className="psl-title psl-pricing-invite__title"
          text={t("pricing.inviteTitle")}
          word={t("pricing.inviteHighlight")}
        />
        <Link to="/member-card" className="psl-button">
          {t("pricing.inviteCta")}
        </Link>
      </div>
    </section>
  );
}
