import { useLanguage } from "../context/LanguageContext";

export function SafetyControl() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="safety-heading"
      className="psl-container psl-section psl-safety psl-safety--note"
    >
      <h2 id="safety-heading" className="psl-sr-only">
        {t("safety.heading")}
      </h2>
      <p className="psl-copy psl-copy--lead">{t("safety.note")}</p>
    </section>
  );
}
