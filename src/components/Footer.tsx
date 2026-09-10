import { Link, NavLink } from "react-router-dom";
import { recommendedDuration } from "../config/pricing";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";
import { BookingAction } from "./BookingAction";
import { Logo } from "./Logo";

const legalLinks = [
  { to: "/aviso-legal", key: "legal.notice" },
  { to: "/privacidad", key: "legal.privacy" },
  { to: "/cookies", key: "legal.cookies" },
  { to: "/condiciones-reserva", key: "legal.terms" },
  { to: "/condiciones-bonos", key: "legal.bonoTerms" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="psl-footer psl-container psl-container--wide">
      <div className="psl-footer__top">
        <div className="psl-stack">
          <NavLink to="/" className="psl-footer__brand" aria-label="pluma home">
            <Logo className="psl-footer__brand-logo" height={36} />
          </NavLink>
          <h2>{t("footer.contactTitle")}</h2>
          <p className="psl-copy" style={{ color: "rgb(255 255 255 / 75%)" }}>
            {t("footer.tagline")}
          </p>
          <ul className="psl-stack" style={{ gap: "var(--psl-space-2)" }}>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
              </li>
            )}
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                {t("footer.address")}
              </a>
            </li>
          </ul>
        </div>

        <nav className="psl-footer__links" aria-label={t("footer.legalTitle")}>
          <Link to="/about">{t("nav.about")}</Link>
          <Link to="/pricing">{t("nav.pricing")}</Link>
          <Link to="/member-card">{t("nav.bonos")}</Link>
          <BookingAction
            label={t("nav.book")}
            duration={recommendedDuration}
            placement="footer_nav"
            className="psl-footer__book"
          />
          {legalLinks.map(({ to, key }) => (
            <Link key={to} to={to}>
              {t(key)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="psl-footer__utility">
        <span>
          &copy; {year} {site.businessName}. {t("footer.rights")}
        </span>
        <span>
          {t("footer.owner")}: {site.ownerName}
        </span>
      </div>

      <div className="psl-footer__wordmark" aria-hidden="true">
        pluma
      </div>
    </footer>
  );
}
