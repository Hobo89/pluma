import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { ReviewCard } from "../components/ReviewCard";
import { testimonials } from "../content/testimonials";
import { useLanguage } from "../context/LanguageContext";

export function ReviewsPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <PageMeta page="reviews" />
      <h1 className="psl-title">{t("reviews.title")}</h1>
      <p className="psl-copy" style={{ marginBlock: "var(--psl-space-6)" }}>
        {t("reviews.description")}
      </p>
      <div className="psl-reviews-grid">
        {testimonials.map((item) => (
          <ReviewCard key={item.id} {...item} />
        ))}
      </div>
    </PageContainer>
  );
}
