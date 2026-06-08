/**
 * Selected work entries rendered in the Work section.
 * Client names are blurred under NDA (`nda: true`) — see <Work />.
 * Add, remove, or reorder entries here without touching JSX.
 */

export type WorkEntry = {
  year: string;
  client: string;
  /** When true, the client name is visually blurred and an NDA badge is shown. */
  nda: boolean;
  desc: string;
  tag: string;
};

export const work: WorkEntry[] = [
  {
    year: "2025",
    client: "ZEFAC Technologies SAS",
    nda: true,
    desc: "B2B SaaS platform for e-invoicing in the French market. Factur-X compliant, multi-tenant architecture, designed for PDP/PA accreditation.",
    tag: "SaaS · Product lead",
  },
  {
    year: "2025",
    client: "Carlton Hotels Group SA",
    nda: true,
    desc: "Custom CRM platform with reservation management, guest profiles, and operations dashboard for a flagship luxury hotel.",
    tag: "CRM · Full build",
  },
  {
    year: "2025",
    client: "Confidential FinTech Client",
    nda: true,
    desc: "Cross-platform mobile app (iOS & Android) built with Flutter. Full CI/CD pipeline via Codemagic, TestFlight distribution, App Store deployment.",
    tag: "Mobile · Full stack",
  },
  {
    year: "2024",
    client: "Agence Foncière de l'Habitat",
    nda: true,
    desc: "Full digital architecture review and public portal rebuild for a major government agency. Accessibility-first, multilingual, GDPR-compliant.",
    tag: "Public sector · Architecture",
  },
  {
    year: "2024",
    client: "Simplify Learning Inc.",
    nda: true,
    desc: "Story-based AI learning platform for children. Bilingual content generation (FR/AR), MENA market focus, full-stack React + Python.",
    tag: "EdTech · AI",
  },
  {
    year: "2024",
    client: "Mosaïque Ingénierie SARL",
    nda: true,
    desc: "Internal CMS with client portal, project tracking, document management, and role-based access for an engineering consultancy.",
    tag: "Internal tooling · CMS",
  },
  {
    year: "2023",
    client: "ZORRO Environmental Services",
    nda: true,
    desc: "Marketing site and lead-generation funnel for a B2B environmental services company. Conversion tracking via GTM/GA4, multilingual SEO.",
    tag: "Marketing site · Lead gen",
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
    period: "2025",
    role: "Partnership Trainer",
    org: "Smart Tunisian Technoparks — تونس للأقطاب التكنولوجية",
  },
  {
    period: "Focus",
    role: "Software Architecture",
    org: "End-to-end product delivery",
  },
];
