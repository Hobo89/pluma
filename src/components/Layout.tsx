import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLanguage } from "../context/LanguageContext";

export function Layout() {
  const { pathname } = useLocation();
  const { t } = useLanguage();
  const isHome = pathname === "/";
  const isAbout = pathname === "/about";

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
    </div>
  );
}
