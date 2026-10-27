/**
 * Analytics plumbing (client only). Events go to window.dataLayer, which
 * Google Tag Manager reads once the visitor has accepted analytics. Before
 * that (or if they decline) pushes stay in memory and are never sent.
 * Event names and parameters are documented in docs/ads-tracking.md.
 */

export type AnalyticsEvent =
  | "book_call_click"
  | "contact_submit"
  | "checklist_download"
  | "lp_view"
  | "scroll_75"
  | "outbound_click";

type DataLayerWindow = Window & {
  dataLayer?: unknown[];
};

export function track(
  event: AnalyticsEvent,
  params: Record<string, string | number | undefined> = {},
) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...params });
}

/**
 * Google's gtag(): it must push the Arguments object itself, not an array,
 * or Google tags won't read it as a command.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
}

export const CONSENT_KEY = "wg-consent";
export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

/** Store the choice and tell Google tags (Consent Mode v2). */
export function writeConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode: the choice lasts for this page view */
  }
  const state = value === "granted" ? "granted" : "denied";
  gtag("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  });
  if (value === "denied") {
    // Withdrawal: drop Google's first-party cookies if any were set.
    for (const c of document.cookie.split(";")) {
      const name = c.split("=")[0].trim();
      if (/^(_ga|_gid|_gcl|_gac)/.test(name)) {
        const host = location.hostname;
        const parent = host.split(".").slice(-2).join(".");
        for (const domain of ["", `; domain=${host}`, `; domain=.${parent}`]) {
          document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
        }
      }
    }
  }
}

/**
 * Inline <head> script: Consent Mode v2 defaults (everything denied) before
 * any Google tag can run, then the stored choice if there is one.
 */
export const consentDefaultsScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);
try{if(localStorage.getItem('${CONSENT_KEY}')==='granted'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}`;
