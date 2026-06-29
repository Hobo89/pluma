import { CalEmbed } from "../components/CalEmbed";
import { PageContainer } from "../components/PageContainer";
import { useLanguage } from "../context/LanguageContext";

export function BookingPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <p className="mb-2 text-sm font-normal tracking-widest text-accent uppercase">
        {t("booking.eyebrow")}
      </p>
      <h1 className="mb-3 text-4xl font-normal tracking-tight md:text-5xl">
        {t("booking.title")}
      </h1>
      <p className="mb-8 max-w-2xl font-normal text-muted">
        {t("booking.description")}
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <CalEmbed />
      </div>
    </PageContainer>
  );
}
