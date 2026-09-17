import type { ComponentType } from "react";
import { useLanguage } from "../context/LanguageContext";
import { PlumaHeroLogo } from "./PlumaHeroLogo";
import { AgreeIcon, ChangeIcon, PainIcon } from "./SafetyIcons";

const pointIds = ["agree", "change", "pain", "nervous"] as const;

const pointIcons: Partial<
  Record<(typeof pointIds)[number], ComponentType<{ className?: string }>>
> = {
  agree: AgreeIcon,
  change: ChangeIcon,
  pain: PainIcon,
};

export function SafetyControl() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="safety-heading"
      className="psl-container psl-section psl-safety"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="safety-heading" className="psl-title">
          {t("safety.heading")}
        </h2>
      </div>

      <ul className="psl-safety__grid">
        {pointIds.map((id) => {
          const Icon = pointIcons[id];

          return (
            <li
              key={id}
              className={`psl-safety__card${id === "nervous" ? " psl-safety__card--wide" : " psl-safety__card--point"}`}
            >
              {Icon ? (
                <span className="psl-safety__icon">
                  <Icon />
                </span>
              ) : null}
              <p className="psl-copy">{t(`safety.points.${id}`)}</p>
            </li>
          );
        })}
        <li className="psl-safety__logo">
          <PlumaHeroLogo playOnView markOnly className="psl-safety__logo-image" />
        </li>
      </ul>
    </section>
  );
}
