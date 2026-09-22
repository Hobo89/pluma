import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import PlumaHero from "../pluma-hero/PlumaHero";
import type { HeroLanguage, HeroOptions } from "../pluma-hero/hero.js";

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

  const options = useMemo<Omit<HeroOptions, "navigationElement">>(
    () => ({
      assetBase: ASSET_BASE,
      language: language as HeroLanguage,
      links: { ...LINKS },
      onLanguageChange: (next) => setLanguage(next),
    }),
    [language, setLanguage],
  );

  return <PlumaHero options={options} />;
}
