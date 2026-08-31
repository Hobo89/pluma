import { PageContainer } from "../components/PageContainer";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

type LegalPageProps = {
  page: "notice" | "privacy" | "cookies";
};

export function LegalPage({ page }: LegalPageProps) {
  const { t } = useLanguage();
  const prefix = `legalPages.${page}`;

  const paragraphs = t(`${prefix}.body`).split("\n\n");

  return (
    <PageContainer>
      <p className="psl-eyebrow">{t("footer.legalTitle")}</p>
      <h1 className="psl-title">{t(`${prefix}.title`)}</h1>
      <div
        className="psl-copy"
        style={{
          marginTop: "var(--psl-space-6)",
          display: "grid",
          gap: "var(--psl-space-4)",
        }}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph.replace("{email}", site.email)}</p>
        ))}
      </div>
    </PageContainer>
  );
}
