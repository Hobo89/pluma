import { useLanguage } from "../context/LanguageContext";

const items = ["personalisation", "changing", "control", "access"] as const;

/**
 * What actually happens on a first visit.
 *
 * Only practices that are known to be true are described here. Access details
 * that have not been verified are shown as open questions rather than as
 * reassurances.
 */
export function FirstVisit() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="first-visit-heading"
      className="psl-container psl-section--roomy"
    >
      <div className="psl-section-head psl-section-head--stack">
        <h2 id="first-visit-heading" className="psl-title">
          {t("firstVisit.title")}
        </h2>
        <p className="psl-copy">{t("firstVisit.description")}</p>
      </div>

      <ul className="psl-firstvisit">
        {items.map((id) => (
          <li key={id} className="psl-firstvisit__item">
            <h3 className="psl-firstvisit__title">
              {t(`firstVisit.${id}.title`)}
            </h3>
            <p className="psl-firstvisit__body">{t(`firstVisit.${id}.body`)}</p>
          </li>
        ))}
      </ul>

      <p className="psl-copy psl-copy--small psl-firstvisit__note">
        {t("firstVisit.accessNote")}
      </p>
    </section>
  );
}
