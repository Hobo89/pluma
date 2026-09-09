import { Link } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageMeta } from "../components/PageMeta";
import { useLanguage } from "../context/LanguageContext";

/**
 * Client-side 404.
 *
 * GitHub Pages serves `404.html` with a real 404 status for unknown paths, and
 * that file is a copy of the app shell, so this component is what the visitor
 * sees. It is marked `noindex` so a soft 404 cannot be indexed.
 */
export function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <PageMeta page="notFound" noindex />
      <h1 className="psl-title">{t("notFound.title")}</h1>
      <p className="psl-copy" style={{ marginBlock: "var(--psl-space-6)" }}>
        {t("notFound.body")}
      </p>
      <div className="psl-actions">
        <Link to="/" className="psl-button psl-button--dark">
          {t("notFound.home")}
        </Link>
        <Link to="/member-card" className="psl-button psl-button--ghost">
          {t("nav.bonos")}
        </Link>
      </div>
    </PageContainer>
  );
}
