/**
 * Shared contract between the contact / checklist forms and
 * app/api/contact/route.ts. Option values are locale-independent; labels live
 * in the dictionaries.
 */

export const budgetValues = [
  "lt-5k",
  "5k-15k",
  "15k-40k",
  "40k-plus",
  "unsure",
] as const;
export type Budget = (typeof budgetValues)[number];

export const stuckValues = [
  "about-to-build",
  "shipped-breaking",
  "no-senior",
  "raising",
] as const;
export type Stuck = (typeof stuckValues)[number];

/** "contact" (home), "checklist" (lead magnet) or "lp:<slug>" (landing page). */
export type ContactSource = "contact" | "checklist" | `lp:${string}`;

export type ContactPayload = {
  source: ContactSource;
  locale: string;
  name?: string;
  email: string;
  company?: string;
  building?: string;
  budget?: Budget;
  stuck?: Stuck;
  /** Page the form was submitted from. */
  page?: string;
  /** utm_* / gclid captured on landing. */
  attribution?: Record<string, string>;
  /** Honeypot: must stay empty. */
  hp?: string;
  /** Milliseconds between form render and submit. */
  elapsed?: number;
};

export type ContactResponse =
  | { ok: true; download?: string }
  | { ok: false; error: "invalid" | "rate_limited" | "unavailable" };
