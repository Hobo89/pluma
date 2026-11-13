import { useLanguage } from "../context/LanguageContext";
import {
  type AreaId,
  type TestimonialRecord,
} from "../content/testimonials";
import { TestimonialCard, type TestimonialCardVariant } from "./TestimonialCard";

export { FlagMarks } from "./TestimonialCard";

export function AreaBadges({ areas }: { areas: readonly AreaId[] }) {
  const { t } = useLanguage();

  if (areas.length === 0) return null;

  return (
    <ul className="psl-quote__areas">
      {areas.map((area) => (
        <li key={area}>{t(`testimonials.areas.${area}`)}</li>
      ))}
    </ul>
  );
}

export function ReviewCard({
  variant,
  ...item
}: TestimonialRecord & { variant?: TestimonialCardVariant }) {
  return <TestimonialCard {...item} variant={variant} />;
}
