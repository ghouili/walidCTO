/**
 * Selected work entries rendered in the Work section.
 *
 * Named clients link out to their live site (`url`); confidential / internal
 * builds are shown with the client name blurred and an NDA badge (`nda: true`)
 * and carry no link. Draft entries and any unverifiable metrics from the source
 * brief are intentionally omitted. Add, remove, or reorder entries here without
 * touching JSX.
 */

export type WorkEntry = {
  /** Stable id — used for React keys (and future case-study routes). */
  slug: string;
  /** Brand name. Blurred in the UI when `nda` is set. */
  client: string;
  /** Sector · market line, shown as the card eyebrow. */
  sector: string;
  /** Bold, outcome-led hook — the line that earns the click. */
  outcome: string;
  /** One-sentence supporting caption. */
  caption: string;
  /** Live site — when present the card links out in a new tab. */
  url?: string;
  /** Hide the client name (blurred) and show an NDA badge. Omit `url`. */
  nda?: boolean;
};

export const work: WorkEntry[] = [
  {
    slug: "facturra",
    client: "Facturra",
    sector: "FinTech / RegTech SaaS · France",
    outcome:
      "We turned France's 2026 e-invoicing mandate into a 5-minute onboarding.",
    caption:
      "A compliance-grade Factur-X platform that gets freelancers and small firms issuing legally valid e-invoices before their coffee goes cold.",
    url: "https://facturra.com/",
  },
  {
    slug: "internal-erp",
    client: "Helios Industrial Group",
    sector: "Internal ERP · Manufacturing",
    outcome:
      "One operations cockpit that retired six spreadsheets and three logins.",
    caption:
      "Custom ERP — inventory, production scheduling, procurement, and role-based dashboards for a mid-size industrial group. Client confidential under NDA.",
    nda: true,
  },
  {
    slug: "debarras-aurea",
    client: "Débarras Aurea",
    sector: "Local Services · Île-de-France",
    outcome:
      "A two-minute quote funnel for a Paris clearance business spanning 8 departments.",
    caption:
      "Fast, SEO-built site plus paid-acquisition funnel that converts local searches into booked interventions.",
    url: "https://debarras-aurea.fr/",
  },
  {
    slug: "internal-lms",
    client: "Lumen Training Institute",
    sector: "LMS / EdTech · MENA",
    outcome:
      "A white-label LMS that onboards a new cohort in minutes, not weeks.",
    caption:
      "Multi-tenant learning platform with SCORM content, progress tracking, and auto-issued certificates for an accredited training provider. Client confidential under NDA.",
    nda: true,
  },
  {
    slug: "zorro-services",
    client: "Zorro Services",
    sector: "Environmental Services · Tunisia",
    outcome:
      "A credibility-first corporate presence for an ANGED-certified environmental firm.",
    caption:
      "Multi-page site that positions a Tunisian B2B services company for institutional and municipal clients.",
    url: "https://zorro-services.vercel.app/",
  },
  {
    slug: "fresh-tenancy",
    client: "Fresh Tenancy",
    sector: "Home Services · United Kingdom",
    outcome: "A booking site engineered around 5-star social proof.",
    caption:
      "End-of-tenancy cleaning service whose homepage converts on trust before it sells on price.",
    url: "https://freshtenancy.com/",
  },
];

/** Credentials rendered in the About section. */
export type Credential = { period: string; role: string; org: string };

export const credentials: Credential[] = [
  { period: "2022 — Now", role: "Founder & CTO", org: "InnoviaBurst, Tunis" },
  {
    period: "2023 — Now",
    role: "Teacher",
    org: "IMSET (Honoris United)",
  },
  {
    period: "2025 - Now",
    role: "Training Partner",
    org: "Smart Tunisian Technoparks — تونس للأقطاب التكنولوجية",
  },
  {
    period: "Focus",
    role: "Software Architecture",
    org: "End-to-end product delivery",
  },
];
