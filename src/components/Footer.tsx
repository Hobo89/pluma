import { Link } from "react-router-dom";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

const legalLinks = [
  { to: "/aviso-legal", key: "legal.notice" },
  { to: "/privacidad", key: "legal.privacy" },
  { to: "/cookies", key: "legal.cookies" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-3 md:gap-8">
        <div>
          <p className="font-hero mb-3 text-lg font-normal text-text">pluma</p>
          <p className="text-sm leading-relaxed text-muted">{t("footer.tagline")}</p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-text uppercase">
            {t("footer.contactTitle")}
          </h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-muted no-underline transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </li>
            {site.phone && (
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-muted no-underline transition-colors hover:text-accent"
                >
                  {site.phone}
                </a>
              </li>
            )}
            <li>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted no-underline transition-colors hover:text-accent"
              >
                {site.address}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-text uppercase">
            {t("footer.legalTitle")}
          </h2>
          <dl className="mb-4 space-y-1 text-sm text-muted">
            <div>
              <dt className="sr-only">{t("footer.owner")}</dt>
              <dd>
                {t("footer.owner")}: {site.ownerName}
              </dd>
            </div>
            <div>
              <dt className="sr-only">{t("footer.nif")}</dt>
              <dd>
                {t("footer.nif")}: {site.nif}
              </dd>
            </div>
          </dl>
          <ul className="space-y-2 text-sm">
            {legalLinks.map(({ to, key }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-muted no-underline transition-colors hover:text-accent"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4">
        <p className="mx-auto max-w-5xl text-center text-xs text-muted">
          &copy; {year} {site.businessName}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
