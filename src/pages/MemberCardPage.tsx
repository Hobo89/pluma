import { PageContainer } from "../components/PageContainer";
import { useLanguage } from "../context/LanguageContext";

export function MemberCardPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <p className="psl-eyebrow">{t("memberCard.eyebrow")}</p>
      <h1 className="psl-title">{t("memberCard.title")}</h1>
      <p className="psl-copy" style={{ marginBlock: "var(--psl-space-6)" }}>
        {t("memberCard.description")}
      </p>
    </PageContainer>
  );
}
