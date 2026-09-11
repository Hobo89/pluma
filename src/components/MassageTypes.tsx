import type { ComponentType } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  MassageIllustrationDeepTissue,
  MassageIllustrationPregnancy,
  MassageIllustrationRelaxing,
  MassageIllustrationSports,
} from "./illustrations/MassageIllustrations";

const typeIds = [
  "pregnancy",
  "relaxingLymphatic",
  "deepTissue",
  "sports",
] as const;

/** One traced line illustration per massage type. */
const typeIllustrations: Record<
  (typeof typeIds)[number],
  ComponentType<{ className?: string }>
> = {
  pregnancy: MassageIllustrationPregnancy,
  relaxingLymphatic: MassageIllustrationRelaxing,
  deepTissue: MassageIllustrationDeepTissue,
  sports: MassageIllustrationSports,
};

export function MassageTypes() {
  const { t } = useLanguage();

  return (
    <section
      className="psl-container psl-section psl-types"
      aria-labelledby="massage-types-heading"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="massage-types-heading" className="psl-title">
          {t("types.title")}
        </h2>
        <p className="psl-copy">{t("types.description")}</p>
      </div>

      <div className="psl-product-grid psl-product-grid--types">
        {typeIds.map((id) => {
          const Illustration = typeIllustrations[id];

          return (
            <article key={id} className="psl-product">
              {/* The drawing is decorative; the heading below names the type. */}
              <div className="psl-product__image psl-product__image--illustration psl-product__image--drawing">
                <Illustration />
              </div>
              <div className="psl-product__meta">
                <h3 className="psl-product__name">{t(`types.${id}`)}</h3>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
