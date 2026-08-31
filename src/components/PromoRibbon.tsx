import { useLanguage } from "../context/LanguageContext";

export function PromoRibbon() {
  const { t } = useLanguage();
  const message = t("ribbon.message");

  return (
    <div className="psl-ribbon">
      <p className="psl-sr-only">{message}</p>
      <div className="psl-ribbon__track" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i}>{message} ·</span>
        ))}
      </div>
    </div>
  );
}
