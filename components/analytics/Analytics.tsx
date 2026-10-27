"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import {
  readConsent,
  track,
  writeConsent,
  type Consent,
} from "@/lib/analytics";
import { getAttribution, UTM_KEYS } from "@/lib/attribution";
import type { Dictionary } from "@/lib/dictionaries";

/** Fired on window so other widgets (the checklist nudge) can make room. */
export const CONSENT_BANNER_EVENT = "wg:consent-banner";
/** Dispatch on window to reopen the banner (footer "Cookie settings"). */
export const CONSENT_OPEN_EVENT = "wg:consent-open";

declare global {
  interface Window {
    __wgConsentBannerOpen?: boolean;
  }
}

/**
 * Site-wide measurement, mounted once in the locale layout:
 * - GTM loads only after the visitor accepts (Consent Mode v2 defaults are
 *   set to denied by the inline <head> script before this runs).
 * - Delegated listeners: book_call_click (+ utm_* passed through to
 *   Calendly), outbound_click, and scroll_75 once per page.
 * Without NEXT_PUBLIC_GTM_ID there is no banner and nothing is loaded, but
 * the Calendly UTM passthrough still works.
 */
export function Analytics({
  gtmId,
  labels,
  privacyHref,
}: {
  gtmId?: string;
  labels: Dictionary["consent"];
  privacyHref: string;
}) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null | "loading">("loading");
  const scrolled = useRef(false);

  useEffect(() => {
    setConsent(readConsent());
    const reopen = () => setConsent(null);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  // Keep the landing page's utm_*/gclid for the rest of the visit.
  useEffect(() => {
    if (consent === "granted") getAttribution();
  }, [consent]);

  const bannerOpen = Boolean(gtmId) && consent === null;
  useEffect(() => {
    window.__wgConsentBannerOpen = bannerOpen;
    window.dispatchEvent(
      new CustomEvent(CONSENT_BANNER_EVENT, { detail: bannerOpen }),
    );
  }, [bannerOpen]);

  // Clicks: Calendly (attribution + book_call_click) and outbound links.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      let url: URL;
      try {
        url = new URL(a.href);
      } catch {
        return;
      }
      if (url.hostname.endsWith("calendly.com")) {
        const attribution = getAttribution();
        for (const key of UTM_KEYS) {
          if (attribution[key] && !url.searchParams.has(key)) {
            url.searchParams.set(key, attribution[key]);
          }
        }
        a.href = url.toString();
        track("book_call_click", {
          link_url: url.origin + url.pathname,
          page_path: window.location.pathname,
        });
      } else if (
        url.protocol.startsWith("http") &&
        url.hostname !== window.location.hostname
      ) {
        track("outbound_click", {
          link_url: url.toString(),
          link_domain: url.hostname,
          page_path: window.location.pathname,
        });
      }
    };
    // Capture phase so the href is rewritten before the browser follows it
    // (also covers middle-click via auxclick).
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  // scroll_75: once per page view.
  useEffect(() => {
    scrolled.current = false;
    const onScroll = () => {
      if (scrolled.current) return;
      const el = document.documentElement;
      if (window.scrollY + window.innerHeight >= el.scrollHeight * 0.75) {
        scrolled.current = true;
        track("scroll_75", { page_path: pathname });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const choose = (value: Consent) => {
    writeConsent(value);
    setConsent(value);
  };

  return (
    <>
      {gtmId && consent === "granted" && <GoogleTagManager gtmId={gtmId} />}
      {bannerOpen && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={labels.settings}
          className="border-border shadow-card fixed z-[60] flex flex-col gap-4 border bg-white p-5 max-[600px]:inset-x-0 max-[600px]:bottom-0 max-[600px]:rounded-t-2xl max-[600px]:border-x-0 max-[600px]:border-b-0 min-[601px]:bottom-6 min-[601px]:left-6 min-[601px]:max-w-[400px] min-[601px]:rounded-2xl"
        >
          <p className="text-dim text-[14px] leading-[1.5]">
            {labels.text}{" "}
            <Link
              href={privacyHref}
              className="text-ink hover:text-accent underline decoration-1 underline-offset-2"
            >
              {labels.more}
            </Link>
          </p>
          <div className="flex gap-2">
            {/* Equal weight on purpose: refusing must be as easy as accepting. */}
            <button
              type="button"
              onClick={() => choose("denied")}
              className="border-border text-ink hover:border-ink flex-1 cursor-pointer rounded-full border bg-white px-4 py-2.5 text-[14px] font-medium transition-colors"
            >
              {labels.decline}
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="bg-ink hover:bg-accent flex-1 cursor-pointer rounded-full px-4 py-2.5 text-[14px] font-medium text-white transition-colors"
            >
              {labels.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link that reopens the consent banner. */
export function ConsentSettingsButton({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
      className={`${className} cursor-pointer`}
    >
      {label}
    </button>
  );
}

/** Fires one event when mounted (e.g. lp_view on landing pages). */
export function TrackOnMount({
  event,
  params,
}: {
  event: "lp_view";
  params: Record<string, string>;
}) {
  useEffect(() => {
    track(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
