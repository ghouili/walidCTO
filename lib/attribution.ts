/**
 * Ad attribution (client only). utm_* / gclid parameters in the current URL
 * are attached to form submissions and Calendly links. With analytics
 * consent, the first ones seen in a session are also kept in sessionStorage
 * so they survive in-site navigation.
 */

import { readConsent } from "@/lib/analytics";

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;
const KEYS = [...UTM_KEYS, "gclid"] as const;
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
  const persist = readConsent() === "granted";
  try {
    if (Object.keys(fromUrl).length > 0) {
      if (persist) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = persist ? sessionStorage.getItem(STORAGE_KEY) : null;
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return fromUrl;
  }
}
