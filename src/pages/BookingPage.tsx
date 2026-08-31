import { CalEmbed } from "../components/CalEmbed";
import { PageContainer } from "../components/PageContainer";
import { useLanguage } from "../context/LanguageContext";

export function BookingPage() {
  const { t } = useLanguage();

  return (
    <PageContainer wide>
      <p className="psl-eyebrow">{t("booking.eyebrow")}</p>
      <h1 className="psl-title">{t("booking.title")}</h1>
      <p className="psl-copy" style={{ marginBlock: "var(--psl-space-6)" }}>
        {t("booking.description")}
      </p>
      <div className="psl-booking-embed">
        <CalEmbed />
      </div>
    </PageContainer>
  );
}
