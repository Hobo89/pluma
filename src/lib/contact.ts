import { site } from "../config/site";

/**
 * Builds a `mailto:` link. Subject and body are already URL-encoded in the
 * translation strings so line breaks survive across mail clients.
 */
export function mailto(
  subject: string,
  body?: string,
  to: string = site.email,
): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${body}`);
  return `mailto:${to}?${params.join("&")}`;
}
