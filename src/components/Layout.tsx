import { useLayoutEffect, useRef, type RefObject } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CalModalBootstrap } from "./CalModalBootstrap";
import { Footer } from "./Footer";
import { SiteNav } from "./SiteNav";
import { useLanguage } from "../context/LanguageContext";

export type LayoutOutletContext = {
  navRef: RefObject<HTMLElement | null>;
};

declare global {
  interface Window {
    __pslLastScrollRoute?: string;
  }
}

function withInstantScroll(action: () => void) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  action();
  html.style.scrollBehavior = previous;
}

export function Layout() {
  const { pathname, hash } = useLocation();
  const { t } = useLanguage();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const key = `${pathname}${hash}`;
    // Survive HMR remounts of this layout: only jump when the route itself
    // changed. Resetting scroll on every remount pinned the page at the hero
    // and hid the mobile booking bar.
    if (window.__pslLastScrollRoute === key) return;
    window.__pslLastScrollRoute = key;

    const id = hash.startsWith("#") ? decodeURIComponent(hash.slice(1)) : "";
    const target = id ? document.getElementById(id) : null;
    withInstantScroll(() => {
      if (target) {
        target.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    });
  }, [pathname, hash]);

  return (
    <div className="psl psl--bottom-nav">
      <a href="#main" className="psl-skip">
        {t("nav.skipToContent")}
      </a>
      {/* Portal first in the React tree so the nav ref exists before the hero
          mounts and so nothing inside `.psl` can trap its stacking context. */}
      <SiteNav ref={navRef} heroLinked={isHome} />
      <main id="main" tabIndex={-1}>
        <Outlet context={{ navRef } satisfies LayoutOutletContext} />
      </main>
      <Footer />
      <CalModalBootstrap />
    </div>
  );
}
