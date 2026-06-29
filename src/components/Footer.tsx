import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mx-auto max-w-3xl border-t border-border px-6 py-8 text-sm text-muted">
      <p>
        &copy; {year} {t("footer.copyright")}
      </p>
    </footer>
  );
}
