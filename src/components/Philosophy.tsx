import { CopyBlocks } from "./CopyBlocks";
import { useLanguage } from "../context/LanguageContext";

export function Philosophy() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="philosophy-heading"
      className="psl-container psl-section psl-philosophy"
    >
      <h2 id="philosophy-heading" className="psl-display">
        {t("philosophy.heading")}
      </h2>
      <CopyBlocks text={t("philosophy.body")} />
    </section>
  );
}
