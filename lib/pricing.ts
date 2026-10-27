/**
 * Published price anchors for the audit and the fractional-CTO retainer.
 * Rendered in the #pricing box on /services/technical-audit,
 * /services/fractional-cto and the /lp/* landing pages, and in the Offer
 * JSON-LD on the service pages.
 *
 * While a value is `null` the UI shows a "confirmed in writing" fallback and
 * JSON-LD omits the price, so nothing half-finished goes live. The prebuild
 * script warns about every placeholder left.
 */

import type { Locale } from "@/lib/i18n";

/** TODO(PRICE_AUDIT): fixed audit fee in EUR, excl. VAT, as a number (e.g. 4900). */
export const PRICE_AUDIT: number | null = null;

/** TODO(PRICE_CTO_FROM): fractional-CTO starting price per month in EUR, excl. VAT (e.g. 3500). */
export const PRICE_CTO_FROM: number | null = null;

export type PriceKind = "audit" | "cto";

export const prices: Record<
  PriceKind,
  { amount: number | null; from: boolean; perMonth: boolean }
> = {
  audit: { amount: PRICE_AUDIT, from: false, perMonth: false },
  cto: { amount: PRICE_CTO_FROM, from: true, perMonth: true },
};

/** "€4,900" in English, "4 900 €" in French. */
export function formatEuros(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
