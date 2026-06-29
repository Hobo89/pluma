import { useLanguage } from "../context/LanguageContext";
import type { Language } from "../i18n/translations";

type LanguageSwitcherProps = {
  overlay?: boolean;
};

export function LanguageSwitcher({ overlay = false }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();

  const options: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={
        overlay
          ? "flex overflow-hidden rounded-lg border border-white/40 bg-black/35 backdrop-blur-sm"
          : "flex overflow-hidden rounded-lg border border-border bg-surface"
      }
    >
      {options.map(({ code, label }) => {
        const active = language === code;

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={active}
            aria-label={t(`language.${code}`)}
            className={
              overlay
                ? `px-2.5 py-1.5 text-xs font-normal transition-colors ${
                    active
                      ? "bg-white text-accent"
                      : "text-white hover:bg-white/15"
                  }`
                : `px-2.5 py-1.5 text-xs font-normal transition-colors ${
                    active
                      ? "bg-accent text-white"
                      : "text-muted hover:text-text"
                  }`
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
