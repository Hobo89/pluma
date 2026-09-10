import { useLanguage } from "../context/LanguageContext";

const faqIds = ["booking", "length", "location", "visit", "cancel"] as const;

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="faq-heading"
      className="psl-faq psl-container psl-section"
    >
      <h2 id="faq-heading" className="psl-title">
        {t("faq.title")}
      </h2>
      <div>
        {faqIds.map((id) => (
          <details key={id}>
            <summary>
              {t(`faq.${id}.question`)}
              <span className="psl-faq__icon" aria-hidden="true" />
            </summary>
            <p>{t(`faq.${id}.answer`)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
