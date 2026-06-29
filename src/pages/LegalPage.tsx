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
      <p className="mb-2 text-sm font-normal tracking-widest text-accent uppercase">
        {t("footer.legalTitle")}
      </p>
      <h1 className="mb-6 text-3xl font-normal tracking-tight md:text-4xl">
        {t(`${prefix}.title`)}
      </h1>
      <div className="space-y-4 text-sm leading-relaxed text-muted">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph.replace("{email}", site.email)}</p>
        ))}
      </div>
    </PageContainer>
  );
}
