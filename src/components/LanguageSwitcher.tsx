import { useLanguage } from "../context/LanguageContext";
import type { Language } from "../i18n/translations";

type LanguageSwitcherProps = Record<string, never>;

export function LanguageSwitcher(_props: LanguageSwitcherProps = {}) {
  const { language, setLanguage, t } = useLanguage();

  const options: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className="psl-lang"
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
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
