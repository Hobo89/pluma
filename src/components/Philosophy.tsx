import { CopyBlocks } from "./CopyBlocks";
import { useLanguage } from "../context/LanguageContext";

export function Philosophy() {
  const { t } = useLanguage();

  return (
    <header
      aria-labelledby="philosophy-heading"
      className="psl-philosophy"
    >
      <h1 id="philosophy-heading" className="psl-display">
        {t("philosophy.heading")}
      </h1>
      <div className="psl-philosophy__support">
        <CopyBlocks text={t("philosophy.body")} />
      </div>
    </header>
  );
}
