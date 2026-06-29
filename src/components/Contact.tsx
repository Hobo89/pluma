import { useLanguage } from "../context/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section>
      <h2 className="mb-3 text-2xl font-normal">{t("contact.title")}</h2>
      <p className="max-w-2xl font-normal text-muted">{t("contact.body")}</p>
    </section>
  );
}
