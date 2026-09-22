import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
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
 * Mounts hero markup once into an empty host, then drives EN/ES through
 * setLanguage. React must not rewrite the hero DOM on language updates —
 * dangerouslySetInnerHTML would reset data-phase to "preparing" and blank
 * the composition after the intro has already finished.
 */
export default function PlumaHero({ options = {}, navigationRef }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<HeroController | null>(null);
  const mountedMarkup = useRef<string | null>(null);
  const callback = useRef(options.onLanguageChange);
  callback.current = options.onLanguageChange;
  const initialLanguage = useRef<HeroLanguage>(options.language ?? "en");

  const optionsKey = JSON.stringify({
    ...options,
    onLanguageChange: undefined,
    language: undefined,
  });
  const config = useMemo(
    () =>
      JSON.parse(optionsKey) as Omit<HeroOptions, "onLanguageChange" | "language">,
    [optionsKey],
  );

  useLayoutEffect(() => {
    const el = host.current;
    if (!el) return;

    const markup = heroMarkup({
      ...config,
      language: initialLanguage.current,
    });

    if (mountedMarkup.current !== markup) {
      mountedMarkup.current = markup;
      el.innerHTML = markup;
    }

    const root = el.querySelector<HTMLElement>(".ph-hero");
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

  return <div ref={host} className="ph-hero-host" />;
}
