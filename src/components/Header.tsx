import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const onHome = pathname === "/";
  const overlay = onHome || pathname === "/about";

  const navLinks = [
    { to: "/about", label: t("nav.about") },
    { to: "/book", label: t("nav.book") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    overlay
      ? `text-[0.95rem] no-underline transition-colors ${
          isActive ? "font-semibold text-white" : "font-medium text-white/60 hover:text-white/90"
        }`
      : `text-[0.95rem] no-underline transition-colors ${
          isActive ? "font-semibold text-accent" : "font-medium text-muted hover:text-text"
        }`;

  const bookClass = ({ isActive }: { isActive: boolean }) =>
    overlay
      ? `rounded-lg px-3 py-1.5 text-[0.95rem] font-semibold no-underline shadow-md shadow-black/25 transition-colors ${
          isActive
            ? "bg-white text-accent"
            : "bg-white/85 text-accent hover:bg-white"
        }`
      : `rounded-lg px-3 py-1.5 text-[0.95rem] font-semibold no-underline transition-colors ${
          isActive
            ? "bg-accent-hover text-white"
            : "bg-accent text-white hover:bg-accent-hover"
        }`;

  return (
    <header
      className={
        overlay
          ? "hero-nav-shadow absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-black/80 via-black/45 to-transparent"
          : "border-b border-border"
      }
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <NavLink
          to="/"
          className={`font-hero text-xl font-normal no-underline ${
            overlay ? "text-white" : "text-text"
          }`}
        >
          pluma
        </NavLink>
        <nav aria-label={t("nav.main")} className="flex items-center gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={link.to === "/book" ? bookClass : linkClass}
            >
              {link.label}
            </NavLink>
          ))}
          <LanguageSwitcher overlay={overlay} />
          <ThemeToggle overlay={overlay} />
        </nav>
      </div>
    </header>
  );
}
