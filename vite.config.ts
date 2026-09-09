import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { translations } from "./src/i18n/translations";

const ORIGIN = "https://pluma.life";
const SOCIAL_IMAGE = "/assets/images/hero-poster.jpg";

/** Documented default language for the static HTML that crawlers receive. */
const DEFAULT_LANGUAGE = "en";

/**
 * Canonical, indexable pages. Must match the routes in `src/App.tsx`.
 *
 * `meta` is the key under `meta.pages` in the translations.
 *
 * Excluded on purpose: the 404 route, and anything that would later hold a
 * checkout, an order or a personal pass link.
 */
const ROUTES = [
  { path: "/", meta: "home", priority: "1.0" },
  { path: "/about", meta: "about", priority: "0.8" },
  { path: "/pricing", meta: "pricing", priority: "0.9" },
  { path: "/book", meta: "book", priority: "0.9" },
  { path: "/member-card", meta: "bonos", priority: "0.7" },
  { path: "/aviso-legal", meta: "notice", priority: "0.2" },
  { path: "/privacidad", meta: "privacy", priority: "0.2" },
  { path: "/cookies", meta: "cookies", priority: "0.2" },
  { path: "/condiciones-reserva", meta: "terms", priority: "0.3" },
  { path: "/condiciones-bonos", meta: "bonoTerms", priority: "0.3" },
] as const;

type PageMeta = { title: string; description: string };

function metaFor(key: string): PageMeta {
  const pages = translations[DEFAULT_LANGUAGE].meta.pages as Record<
    string,
    PageMeta
  >;
  return pages[key];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Rewrites the built shell for one route: real title, description, canonical
 * URL and social preview in the HTML that is actually served.
 *
 * The body is still rendered by React on the client. What this fixes is the
 * response status and the head: GitHub Pages returns 200 for a path that
 * exists as a file, and 404.html with a genuine 404 for anything else.
 */
function htmlForRoute(
  shell: string,
  route: (typeof ROUTES)[number] | null,
): string {
  if (!route) {
    // 404 shell: same app, but never indexable.
    return shell
      .replace(
        /<title>[\s\S]*?<\/title>/,
        `<title>${escapeHtml(metaFor("notFound").title)}</title>`,
      )
      .replace(
        /<meta\s+name="description"[\s\S]*?\/>/,
        `<meta name="description" content="${escapeHtml(metaFor("notFound").description)}" />\n    <meta name="robots" content="noindex, follow" />`,
      );
  }

  const { title, description } = metaFor(route.meta);
  const fullTitle = route.meta === "home" ? `pluma — ${title}` : title;
  const canonical = `${ORIGIN}${route.path}`;

  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="pluma" />`,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ORIGIN}${SOCIAL_IMAGE}" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join("\n    ");

  return shell
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(fullTitle)}</title>\n    ${head}`,
    )
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`,
    );
}

function sitemapXml(): string {
  const today = new Date().toISOString().slice(0, 10);
  const entries = ROUTES.map(
    ({ path, priority }) =>
      `  <url>\n    <loc>${ORIGIN}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function siteFiles(): Plugin {
  return {
    name: "pluma-site-files",
    closeBundle() {
      const dist = resolve(__dirname, "dist");
      const shell = readFileSync(resolve(dist, "index.html"), "utf8");

      for (const route of ROUTES) {
        const html = htmlForRoute(shell, route);

        if (route.path === "/") {
          writeFileSync(resolve(dist, "index.html"), html, "utf8");
          continue;
        }

        // `/about/index.html` is served for `/about` with a 200 status.
        const dir = resolve(dist, route.path.slice(1));
        mkdirSync(dir, { recursive: true });
        writeFileSync(resolve(dir, "index.html"), html, "utf8");
      }

      writeFileSync(
        resolve(dist, "404.html"),
        htmlForRoute(shell, null),
        "utf8",
      );
      writeFileSync(resolve(dist, "sitemap.xml"), sitemapXml(), "utf8");
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteFiles()],
  base: "/",
});
