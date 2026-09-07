import { useEffect, useState, type KeyboardEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  solid?: boolean;
};

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

export function Header({ solid = false }: HeaderProps) {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlay = !solid && (pathname === "/" || pathname === "/about");
  const solidNav = solid || !overlay || scrolled;

  const navLinks = [
    { to: "/about", label: t("nav.about") },
    { to: "/pricing", label: t("nav.pricing") },
    { to: "/member-card", label: t("nav.memberCard") },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!overlay) {
      setScrolled(false);
      return;
    }

    const onScroll = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setScrolled(scrollTop > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overlay]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDetailsElement>) => {
    if (event.key === "Escape") {
      event.currentTarget.open = false;
      event.currentTarget.querySelector("summary")?.focus();
    }
  };

  return (
    <div
      className={`psl-header-shell${solidNav ? " psl-header-shell--solid" : ""}`}
    >
      <header className={`psl-header${solidNav ? " psl-header--solid" : ""}`}>
        <NavLink to="/" className="psl-brand" aria-label="pluma home">
          <Logo className="psl-brand__logo" />
        </NavLink>

        <nav className="psl-nav" aria-label={t("nav.main")}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="psl-header__utils">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <NavLink to="/book" className="psl-button">
          {t("nav.book")}
        </NavLink>

        <details
          className="psl-mobile-menu"
          open={menuOpen}
          onToggle={(event) => {
            const next = event.currentTarget.open;
            if (next !== menuOpen) setMenuOpen(next);
          }}
          onKeyDown={handleMenuKeyDown}
        >
          <summary
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={(event) => {
              event.preventDefault();
              setMenuOpen((open) => !open);
            }}
          >
            <MenuIcon open={menuOpen} />
          </summary>
          <nav
            className="psl-mobile-menu__panel"
            aria-label={t("nav.main")}
            onClick={(event) => {
              if ((event.target as HTMLElement).closest("a")) {
                setMenuOpen(false);
              }
            }}
          >
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/book" className="psl-button">
              {t("nav.book")}
            </NavLink>
          </nav>
        </details>
      </header>
    </div>
  );
}
