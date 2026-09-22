import { useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { openCalBookingModal } from "../lib/openCalBookingModal";
import { track } from "../lib/analytics";
import PlumaHero from "../pluma-hero/PlumaHero";
import type { HeroLanguage, HeroOptions } from "../pluma-hero/hero.js";

const ASSET_BASE = "/pluma-hero/assets/";

const LINKS = {
  home: "/",
  about: "/about",
  prices: "/pricing",
  vouchers: "/member-card",
  // Kept as a real /book fallback for no-JS markup; click is intercepted below.
  booking: "/book",
} as const;

export function Hero() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();

  const options = useMemo<Omit<HeroOptions, "navigationElement">>(
    () => ({
      assetBase: ASSET_BASE,
      language: language as HeroLanguage,
      links: { ...LINKS },
      onLanguageChange: (next) => setLanguage(next),
    }),
    [language, setLanguage],
  );

  useEffect(() => {
    const books = document.querySelectorAll<HTMLAnchorElement>(".ph-hero .ph-book");
    if (!books.length) return;

    const onClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      event.preventDefault();
      track({
        name: "booking_cta_clicked",
        placement: "header",
        language,
      });
      void openCalBookingModal(undefined, theme).then((opened) => {
        if (!opened) {
          window.location.assign(target.href || "/book");
        }
      });
    };

    books.forEach((el) => el.addEventListener("click", onClick));
    return () => books.forEach((el) => el.removeEventListener("click", onClick));
  }, [language, theme, options]);

  return <PlumaHero options={options} />;
}
