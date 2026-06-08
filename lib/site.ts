/**
 * Global site configuration — name, URLs, and social links.
 * Edit social/booking links here; they are consumed across the whole site
 * (Nav, Footer, CTA, metadata, and JSON-LD).
 */

const fallbackUrl = "https://walid.innoviaburst.com";

export const site = {
  name: "Walid Ghouili",
  /** Used for the canonical URL, OG/Twitter absolute image URLs, sitemap, robots, JSON-LD. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? fallbackUrl).replace(/\/$/, ""),
  title: "Walid Ghouili — Fractional CTO, Tech Audits & Engineering Leadership",
  titleTemplate: "%s | Walid Ghouili",
  description:
    "Senior engineering on demand. I help early-stage European and Tunisian teams ship the right product — and audit the ones that already shipped the wrong one. Six years of production experience across SaaS, fintech, public sector and EdTech.",
  jobTitle: "Fractional CTO & Engineering Consultant",
  location: { city: "Tunis", country: "Tunisia", countryCode: "TN" },
  /** Primary portrait — also used for OG/Twitter image and JSON-LD. */
  portrait: "/walidGH.png",
  portraitAlt:
    "Walid Ghouili — Fractional CTO and Engineering Consultant based in Tunis, Tunisia",
  email: "walid.ghouili@innoviaburst.com",
  company: { name: "InnoviaBurst", url: "https://innoviaburst.com" },
  /** TODO: replace the GitHub placeholder with the real profile URL. */
  social: {
    linkedin: "https://www.linkedin.com/in/walid-ghouili-b485b01b5/",
    github: "https://github.com/walidghouili",
    company: "https://innoviaburst.com",
  },
  /** External scheduling link for "Book a call" / "Book a 30-min call". */
  bookingUrl: "https://calendly.com/walid-ghouili",
  languages: ["French", "English", "Arabic"],
} as const;

export type Site = typeof site;
