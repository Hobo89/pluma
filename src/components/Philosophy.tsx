import { CopyBlocks } from "./CopyBlocks";
import { useLanguage } from "../context/LanguageContext";

export function Philosophy({
  headingLevel = "h1",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const { t } = useLanguage();
  const Heading = headingLevel;

  return (
    <header
      aria-labelledby="philosophy-heading"
      className="psl-philosophy"
    >
      <Heading
        id="philosophy-heading"
        className={headingLevel === "h1" ? "psl-page-title" : "psl-title"}
      >
        {t("philosophy.heading")}
      </Heading>
      <div className="psl-philosophy__support">
        <CopyBlocks text={t("philosophy.body")} />
      </div>
    </header>
  );
}
