import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const overlay = pathname === "/" || pathname === "/about";

  const navLinks = [
    { to: "/about", label: t("nav.about") },
    { to: "/book", label: t("nav.book") },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    overlay
      ? `text-[0.95rem] no-underline transition-colors ${
          isActive
            ? "font-semibold text-white"
            : "font-medium text-white/60 hover:text-white/90"
        }`
      : `text-[0.95rem] no-underline transition-colors ${
          isActive
            ? "font-semibold text-accent"
            : "font-medium text-muted hover:text-text"
        }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 text-lg no-underline transition-colors ${
      isActive
        ? "bg-accent/10 font-semibold text-accent"
        : "font-normal text-text hover:bg-surface"
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

  const mobileBookClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-3 text-lg font-semibold no-underline transition-colors ${
      isActive
        ? "bg-accent text-white"
        : "bg-accent/10 text-accent hover:bg-accent hover:text-white"
    }`;

  return (
    <header
      className={
        overlay
          ? "hero-nav-shadow absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-black/80 via-black/45 to-transparent"
          : "relative z-50 border-b border-border bg-bg"
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

        <nav
          aria-label={t("nav.main")}
          className="hidden items-center gap-3 md:flex"
        >
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

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher overlay={overlay} />
          <ThemeToggle overlay={overlay} />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            className={
              overlay
                ? "rounded-lg p-2 text-white transition-colors hover:bg-white/15"
                : "rounded-lg p-2 text-text transition-colors hover:bg-surface"
            }
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav
        id="mobile-nav"
        aria-label={t("nav.main")}
        className={`fixed inset-y-0 right-0 z-[60] flex w-[min(100%,20rem)] flex-col border-l border-border bg-bg px-6 py-6 shadow-xl transition-transform duration-200 md:hidden ${
          menuOpen
            ? "translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-hero text-lg font-normal text-text">pluma</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label={t("nav.closeMenu")}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-surface hover:text-text"
          >
            <MenuIcon open />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={() => setMenuOpen(false)}
              className={link.to === "/book" ? mobileBookClass : mobileLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
