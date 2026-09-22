import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations, type HeroLanguage } from "../pluma-hero/hero.js";
import { BookingAction } from "./BookingAction";

const ASSET_BASE = "/pluma-hero/assets/";

const LINKS = {
  home: "/",
  about: "/about",
  prices: "/pricing",
  vouchers: "/member-card",
} as const;

function asset(file: string) {
  return `${ASSET_BASE}${file}`;
}

/** Same fixed bottom bar as the homepage hero, for every other route. */
export function SiteNav() {
  const { language, setLanguage } = useLanguage();
  const labels = translations[language as HeroLanguage] ?? translations.en;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const drawerId = useId();

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus({ preventScroll: true });

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("pointerdown", onPointer, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      ref={rootRef}
      className="ph-nav ph-nav--site"
      data-ph-nav
      data-open={open ? "true" : "false"}
      style={
        {
          "--ph-feather": `url("${asset("feather.svg")}")`,
        } as CSSProperties
      }
    >
      <div className="ph-drawer" id={drawerId} hidden={!open}>
        <Link
          className="ph-drawer-logo"
          to={LINKS.home}
          aria-label={labels.home}
        >
          <img
            src={asset("feather-nav.svg")}
            width="1253"
            height="132"
            alt=""
            aria-hidden="true"
          />
        </Link>
        <nav aria-label={labels.navigation}>
          <Link ref={firstLinkRef} to={LINKS.about}>
            {labels.about}
          </Link>
          <Link to={LINKS.prices}>{labels.prices}</Link>
          <Link to={LINKS.vouchers}>{labels.vouchers}</Link>
        </nav>
      </div>

      <div className="ph-bar">
        <Link className="ph-nav-logo" to={LINKS.home} aria-label={labels.home}>
          <img
            src={asset("logo-ink.svg")}
            width="1272"
            height="485"
            alt="Pluma"
          />
        </Link>
        <nav className="ph-desktop-links" aria-label={labels.navigation}>
          <Link to={LINKS.about}>{labels.about}</Link>
          <Link to={LINKS.prices}>{labels.prices}</Link>
          <Link to={LINKS.vouchers}>{labels.vouchers}</Link>
        </nav>
        <div
          className="ph-languages"
          role="group"
          aria-label={labels.language}
        >
          {(["en", "es"] as const).map((code) => (
            <button
              key={code}
              type="button"
              lang={code}
              aria-label={code === "en" ? "English" : "Español"}
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
            >
              {code}
            </button>
          ))}
        </div>
        <BookingAction label={labels.book} placement="header" className="ph-book" />
        <button
          ref={menuRef}
          className="ph-menu"
          type="button"
          aria-label={labels.menu}
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen((value) => !value)}
        >
          <img
            src={asset("menu-01.svg")}
            width="24"
            height="24"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  );
}
