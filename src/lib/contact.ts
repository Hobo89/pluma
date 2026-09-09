import { site } from "../config/site";

/**
 * Builds a `mailto:` link. Subject and body are already URL-encoded in the
 * translation strings so line breaks survive across mail clients.
 */
export function mailto(subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${body}`);
  return `mailto:${site.email}?${params.join("&")}`;
}
