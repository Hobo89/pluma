import { useLanguage } from "../context/LanguageContext";

const COPIES = 8;

function RibbonGroup({ message }: { message: string }) {
  return (
    <div className="psl-ribbon__group">
      {Array.from({ length: COPIES }, (_, i) => (
        <span key={i}>{message} ·</span>
      ))}
    </div>
  );
}

export function PromoRibbon() {
  const { t } = useLanguage();
  const message = t("ribbon.message");

  return (
    <div className="psl-ribbon">
      <p className="psl-sr-only">{message}</p>
      <div className="psl-ribbon__track" aria-hidden="true">
        <RibbonGroup message={message} />
        <RibbonGroup message={message} />
      </div>
    </div>
  );
}
