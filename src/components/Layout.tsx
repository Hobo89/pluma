import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CalFloatingButton } from "./CalFloatingButton";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLanguage } from "../context/LanguageContext";

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
  const isAbout = pathname === "/about";

  useLayoutEffect(() => {
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
    <div className="psl">
      <a href="#main" className="psl-skip">
        {t("nav.skipToContent")}
      </a>
      <Header solid={!isHome && !isAbout} />
      {!isHome && !isAbout && (
        <div className="psl-header-offset" aria-hidden="true" />
      )}
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CalFloatingButton />
    </div>
  );
}
