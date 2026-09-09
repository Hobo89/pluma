import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { site } from "../config/site";
import { useLanguage } from "../context/LanguageContext";

type PageMetaProps = {
  /** Key under `meta.pages`, e.g. `home`. */
  page: string;
  /** Set on pages that must not be indexed. */
  noindex?: boolean;
};

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function removeMeta(attribute: "name" | "property", key: string) {
  document.head
    .querySelector(`meta[${attribute}="${key}"]`)
    ?.remove();
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * Sets the per-page title, description, canonical URL and social preview.
 *
 * No `hreflang` is emitted. Both languages are served from the same URL, so a
 * reciprocal pair would point two language variants at one address, which is
 * worse than declaring nothing. Introducing `/en/` and `/es/` paths is the
 * prerequisite; see the implementation report.
 */
export function PageMeta({ page, noindex = false }: PageMetaProps) {
  const { pathname } = useLocation();
  const { t, language } = useLanguage();

  const title = t(`meta.pages.${page}.title`);
  const description = t(`meta.pages.${page}.description`);

  useEffect(() => {
    const fullTitle =
      page === "home" ? `${site.businessName} — ${title}` : `${title}`;
    const canonical = `${site.origin}${pathname === "/" ? "/" : pathname.replace(/\/$/, "")}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertCanonical(canonical);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", site.businessName);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", `${site.origin}${site.socialImage}`);
    upsertMeta("property", "og:locale", language === "es" ? "es_ES" : "en_GB");
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", `${site.origin}${site.socialImage}`);

    if (noindex) {
      upsertMeta("name", "robots", "noindex, follow");
    } else {
      removeMeta("name", "robots");
    }
  }, [description, language, noindex, page, pathname, title]);

  return null;
}
