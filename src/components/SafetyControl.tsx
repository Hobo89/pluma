import { CopyBlocks } from "./CopyBlocks";
import { useLanguage } from "../context/LanguageContext";

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
        <CopyBlocks text={t("safety.body")} />
      </div>
    </section>
  );
}
