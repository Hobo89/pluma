import { useMemo, type RefObject } from "react";
import { useOutletContext } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import PlumaHero from "../pluma-hero/PlumaHero";
import type { HeroLanguage, HeroOptions } from "../pluma-hero/hero.js";
import type { LayoutOutletContext } from "./Layout";

const ASSET_BASE = "/pluma-hero/assets/";

const LINKS = {
  home: "/",
  about: "/about",
  prices: "/pricing",
  vouchers: "/member-card",
  booking: "/book",
} as const;

export function Hero() {
  const { language, setLanguage } = useLanguage();
  const { navRef } = useOutletContext<LayoutOutletContext>();

  const options = useMemo<Omit<HeroOptions, "navigationElement">>(
    () => ({
      assetBase: ASSET_BASE,
      language: language as HeroLanguage,
      links: { ...LINKS },
      // Site chrome owns the bottom bar (portaled above every page layer).
      renderNavigation: false,
      onLanguageChange: (next) => setLanguage(next),
    }),
    [language, setLanguage],
  );

  return (
    <PlumaHero
      options={options}
      navigationRef={navRef as RefObject<HTMLElement | null>}
    />
  );
}
