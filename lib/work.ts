/**
 * Selected work entries rendered in the Work section.
 *
 * Named clients link out to their live site (`url`); confidential / internal
 * builds are shown with the client name blurred and an NDA badge (`nda: true`)
 * and carry no link. Draft entries and any unverifiable metrics from the source
 * brief are intentionally omitted. Add, remove, or reorder entries here without
 * touching JSX.
 */

/** Long-form case-study content for a /work/[slug] page (non-NDA projects). */
export type CaseStudy = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** Context / background paragraph. */
  intro: string;
  /** The core challenge. */
  challenge: string;
  /** Approach — what we did, as bullets. */
  approach: string[];
  /** What was built / delivered. */
  built: string[];
  /** Outcomes — kept qualitative; no unverifiable metrics. */
  outcome: string[];
  /** Tech-stack tags. */
  stack: string[];
  /** Related service slug, for cross-linking. */
  relatedService: string;
};

export type WorkEntry = {
  /** Stable id — used for React keys and the /work/[slug] route. */
  slug: string;
  /** Brand name. Blurred in the UI when `nda` is set. */
  client: string;
  /** Sector · market line, shown as the card eyebrow. */
  sector: string;
  /** Bold, outcome-led hook — the line that earns the click. */
  outcome: string;
  /** One-sentence supporting caption. */
  caption: string;
  /** Live site — surfaced on the case-study page. */
  url?: string;
  /** Hide the client name (blurred) and show an NDA badge. Omit `url`. */
  nda?: boolean;
  /** Present only for non-NDA projects with a dedicated case-study page. */
  caseStudy?: CaseStudy;
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
    caseStudy: {
      seoTitle: "Facturra — Factur-X e-invoicing SaaS (case study)",
      metaDescription:
        "How we turned France's 2026 e-invoicing mandate into a 5-minute onboarding: a compliance-grade Factur-X platform for freelancers and small firms.",
      h1: "Facturra: France's 2026 e-invoicing mandate, turned into a 5-minute onboarding",
      intro:
        "From September 2026 every French business must be able to receive structured electronic invoices, with emission deadlines phased through 2027. The market answered with 'approved-platform' plumbing built for accountants — not for the millions of freelancers and small firms who just need to send a legal invoice.",
      challenge:
        "Build a product fully compliant with the DGFiP mandate and usable by a non-accountant in minutes — without locking users into a single approved platform or bundling accounting and CRM they don't want.",
      approach: [
        "Positioned Facturra as a Solution Compatible (Opérateur de Dématérialisation) connected to an approved Plateforme Agréée — invoices keep flowing even if a PA changes terms, with no lock-in.",
        "Designed onboarding that pulls company identity from FranceConnect Pro / SIRET, removing manual data entry.",
        "Built native Factur-X generation (PDF/A-3 with embedded EN 16931-compliant XML) and a live, type-as-you-go demo on the landing page so prospects feel the compliance before signing up.",
        "Added an AI copilot to pre-fill invoices and catch VAT errors before send.",
      ],
      built: [
        "Next.js application with a native Factur-X engine",
        "FranceConnect Pro / SIRET onboarding",
        "Imports from Sage, EBP, Pennylane, QuickBooks and CSV",
        "Full invoice lifecycle tracking, API and webhooks",
        "Hosted in France (OVHcloud), GDPR-compliant",
      ],
      outcome: [
        "Onboarding measured in minutes — a first compliant invoice ships in the same session.",
        "Compliance experienced before signup, via the live landing-page demo.",
        "No platform lock-in: a compatible operator that survives PA changes.",
      ],
      stack: [
        "Next.js",
        "Factur-X / EN 16931",
        "FranceConnect / SIRET",
        "PostgreSQL",
        "OVHcloud (FR)",
      ],
      relatedService: "mvp-development",
    },
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
    caseStudy: {
      seoTitle: "Débarras Aurea — quote funnel + paid acquisition (case study)",
      metaDescription:
        "A two-minute quote funnel and SEO + paid-acquisition site turning local searches into booked clearance interventions across 8 Île-de-France départements.",
      h1: "Débarras Aurea: a two-minute quote funnel across 8 départements",
      intro:
        "Débarras Aurea is a Paris-region house-clearance business operating across eight Île-de-France départements. Local-services demand is search-driven and high-intent — but only if the site loads fast, ranks locally, and makes requesting a quote effortless.",
      challenge:
        "Turn high-intent local searches into booked interventions with a site that ranks across eight départements and a quote flow a stressed customer can finish in two minutes.",
      approach: [
        "Built a fast, SEO-optimised site structured around local (département-level) search intent.",
        "Designed a two-minute quote funnel that captures the details needed to price and book.",
        "Paired the site with a paid-acquisition funnel and conversion tracking — an end-to-end 'site + acquisition' setup.",
      ],
      built: [
        "Fast Next.js marketing site with local-SEO structure",
        "Two-minute, multi-step quote funnel",
        "Paid-acquisition funnel (Google Ads) with GTM / GA4 conversion tracking",
      ],
      outcome: [
        "Local searches converted into booked, qualified interventions.",
        "One coherent funnel from ad click to quote request to booking.",
        "Coverage across all eight Île-de-France départements.",
      ],
      stack: ["Next.js", "Local SEO", "Google Ads", "GTM / GA4"],
      relatedService: "mvp-development",
    },
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
    caseStudy: {
      seoTitle:
        "Zorro Services — corporate presence for an ANGED-certified firm (case study)",
      metaDescription:
        "A credibility-first, multi-page corporate site positioning an ANGED-certified Tunisian environmental-services firm for institutional and municipal clients.",
      h1: "Zorro Services: a credibility-first presence for a regulated B2B firm",
      intro:
        "Zorro Services is an ANGED-certified environmental-services company in Tunisia selling to institutional and municipal clients. In regulated B2B, the website's job is corporate credibility — the win here is positioning and trust, not a conversion metric.",
      challenge:
        "Give a regulated, certified environmental firm a corporate presence that reads as credible to public-sector and institutional buyers.",
      approach: [
        "Built a multi-page corporate site structured around services, certifications, and references.",
        "Foregrounded the ANGED certification and institutional credibility throughout.",
        "Positioned the brand for B2B, institutional, and municipal procurement audiences.",
      ],
      built: [
        "Multi-page corporate website",
        "Services, certification, and reference architecture",
        "Fast, accessible, SEO-ready",
      ],
      outcome: [
        "A credible, corporate presence aimed at institutional and municipal clients.",
        "Certification and trust signals surfaced where buyers look for them.",
      ],
      stack: ["Next.js", "Corporate site", "SEO"],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "fresh-tenancy",
    client: "Fresh Tenancy",
    sector: "Home Services · United Kingdom",
    outcome: "A booking site engineered around 5-star social proof.",
    caption:
      "End-of-tenancy cleaning service whose homepage converts on trust before it sells on price.",
    url: "https://freshtenancy.com/",
    caseStudy: {
      seoTitle: "Fresh Tenancy — trust-led booking site (case study)",
      metaDescription:
        "An end-of-tenancy cleaning booking site engineered around 5-star social proof — a homepage that converts on trust before it competes on price.",
      h1: "Fresh Tenancy: a booking site that converts on trust, not price",
      intro:
        "Fresh Tenancy is a UK end-of-tenancy cleaning service in a crowded, price-sensitive market. The way to win bookings there isn't the lowest quote — it's trust, built from visible 5-star social proof at the moment of decision.",
      challenge:
        "Win bookings in a price-driven market by leading with credibility — a homepage that earns trust before it talks price, and a booking flow that doesn't lose the customer.",
      approach: [
        "Engineered the homepage around 5-star reviews and social proof, placed where decisions happen.",
        "Designed a clean booking flow that turns trust into a confirmed job.",
        "Kept the site fast and conversion-focused throughout.",
      ],
      built: [
        "Conversion-focused Next.js marketing + booking site",
        "Review / social-proof-led homepage",
        "Streamlined booking flow",
      ],
      outcome: [
        "A homepage that competes on trust before price.",
        "Social proof surfaced at the point of decision.",
        "A booking flow built to convert, not just inform.",
      ],
      stack: ["Next.js", "Booking flow", "Conversion / CRO"],
      relatedService: "mvp-development",
    },
  },
];

/** Non-NDA entries that have a dedicated /work/[slug] case-study page. */
export const caseStudies = work.filter((w) => Boolean(w.caseStudy));

export function getCaseStudy(slug: string): WorkEntry | undefined {
  return caseStudies.find((w) => w.slug === slug);
}

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
