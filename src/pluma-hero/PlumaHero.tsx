import { useEffect, useMemo, useRef, type RefObject } from "react";
import {
  heroMarkup,
  initPlumaHero,
  type HeroController,
  type HeroLanguage,
  type HeroOptions,
} from "./hero.js";

type Props = {
  options?: Omit<HeroOptions, "navigationElement">;
  navigationRef?: RefObject<HTMLElement | null>;
};

/**
 * Server-renders usable final markup, then mounts the package controller.
 * Language updates use setLanguage so EN/ES does not replay the intro.
 */
export default function PlumaHero({ options = {}, navigationRef }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<HeroController | null>(null);
  const callback = useRef(options.onLanguageChange);
  callback.current = options.onLanguageChange;
  const initialLanguage = useRef<HeroLanguage>(options.language ?? "en");

  const optionsKey = JSON.stringify({
    ...options,
    onLanguageChange: undefined,
    language: undefined,
  });
  const config = useMemo(
    () => JSON.parse(optionsKey) as Omit<HeroOptions, "onLanguageChange" | "language">,
    [optionsKey],
  );
  const html = useMemo(
    () =>
      heroMarkup({
        ...config,
        language: initialLanguage.current,
      }),
    [config],
  );

  useEffect(() => {
    const root = host.current?.querySelector<HTMLElement>(".ph-hero");
    if (!root) return;
    const controller = initPlumaHero(root, {
      ...config,
      language: initialLanguage.current,
      navigationElement: navigationRef?.current || undefined,
      onLanguageChange: (next) => callback.current?.(next),
    });
    controllerRef.current = controller;
    return () => {
      controller.destroy();
      controllerRef.current = null;
    };
  }, [config, navigationRef]);

  useEffect(() => {
    if (!options.language) return;
    controllerRef.current?.setLanguage(options.language, false);
  }, [options.language]);

  return <div ref={host} className="ph-hero-host" dangerouslySetInnerHTML={{ __html: html }} />;
}
