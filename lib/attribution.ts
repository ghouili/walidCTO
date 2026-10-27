/**
 * Ad attribution (client only). The first utm_* / gclid parameters seen in a
 * session are kept in sessionStorage so they survive in-site navigation and
 * can be attached to form submissions and Calendly links.
 */

const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;
const STORAGE_KEY = "wg-attribution";

/** Read the current attribution, capturing it from the URL on first sight. */
export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const fromUrl: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of KEYS) {
    const v = params.get(key);
    if (v) fromUrl[key] = v.slice(0, 200);
  }
  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return fromUrl;
  }
}
