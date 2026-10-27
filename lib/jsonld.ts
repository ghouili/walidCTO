/**
 * Site-wide JSON-LD entity graph (rendered once per page by the locale
 * layout) plus the per-page Service/Offer builder. Nodes cross-reference each
 * other by @id so search and answer engines resolve one Person, one business
 * and one website instead of loose duplicates.
 */

import type { Locale } from "@/lib/i18n";
import { htmlLang, localePath } from "@/lib/i18n";
import { prices, type PriceKind } from "@/lib/pricing";
import { getServicePages } from "@/lib/localized";
import { site } from "@/lib/site";

export const ids = {
  person: `${site.url}/#person`,
  service: `${site.url}/#service`,
  website: `${site.url}/#website`,
  innoviaburst: `${site.url}/#org-innoviaburst`,
};

/** Markets served: France, Germany, the Netherlands, Spain, Tunisia. */
export const areaServed = [
  { "@type": "Country", name: "France", identifier: "FR" },
  { "@type": "Country", name: "Germany", identifier: "DE" },
  { "@type": "Country", name: "Netherlands", identifier: "NL" },
  { "@type": "Country", name: "Spain", identifier: "ES" },
  { "@type": "Country", name: "Tunisia", identifier: "TN" },
];

const languages = [
  { "@type": "Language", name: "French", alternateName: "fr" },
  { "@type": "Language", name: "English", alternateName: "en" },
  { "@type": "Language", name: "Arabic", alternateName: "ar" },
];

const descriptions: Record<Locale, { person: string; business: string }> = {
  en: {
    person:
      "Fractional CTO and technical-audit consultant in Tunis, Tunisia, serving French, European and Tunisian startups with nearshore senior engineering, MVP builds and codebase audits.",
    business:
      "Fractional CTO retainers, two-week fixed-price technical audits and MVP builds for startups in France, Germany, the Netherlands, Spain and Tunisia, delivered from Tunis.",
  },
  fr: {
    person:
      "CTO à temps partagé et consultant en audit technique à Tunis, au service des startups françaises, européennes et tunisiennes : ingénierie senior en nearshore, développement de MVP et audit de code.",
    business:
      "CTO à temps partagé, audit technique de deux semaines à prix fixe et développement de MVP pour les startups en France, Allemagne, Pays-Bas, Espagne et Tunisie, depuis Tunis.",
  },
};

export function siteGraph(locale: Locale) {
  const d = descriptions[locale];
  const home = `${site.url}${localePath(locale, "/").replace(/\/$/, "")}`;

  const person = {
    "@type": "Person",
    "@id": ids.person,
    name: site.name,
    url: site.url,
    image: `${site.url}${site.portrait}`,
    jobTitle: site.jobTitle,
    description: d.person,
    email: site.email,
    worksFor: { "@id": ids.innoviaburst },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "IMSET — Honoris United Universities",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressCountry: site.location.countryCode,
    },
    knowsLanguage: languages,
    knowsAbout: [
      "Fractional CTO",
      "Technical due diligence",
      "Codebase audit",
      "Software architecture",
      "MVP development",
      "Nearshore software development",
      "GDPR compliance",
      "Factur-X e-invoicing",
      "Engineering leadership",
      "Next.js",
      "NestJS",
      "Node.js",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Flutter",
      "React Native",
    ],
    sameAs: [site.social.linkedin, site.social.github],
  };

  const innoviaburst = {
    "@type": "Organization",
    "@id": ids.innoviaburst,
    name: site.company.name,
    url: site.company.url,
    founder: { "@id": ids.person },
    address: person.address,
  };

  const business = {
    "@type": "ProfessionalService",
    "@id": ids.service,
    name: "Walid Ghouili — Fractional CTO & Technical Audits",
    description: d.business,
    url: home,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.logo}`,
    email: site.email,
    founder: { "@id": ids.person },
    employee: { "@id": ids.person },
    parentOrganization: { "@id": ids.innoviaburst },
    areaServed,
    address: person.address,
    knowsLanguage: languages,
    priceRange: "€€",
    sameAs: [site.social.linkedin, site.social.github],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "fr" ? "Prestations" : "Engagements",
      itemListElement: getServicePages(locale).map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@id": `${site.url}${localePath(locale, `/services/${s.slug}`)}#service`,
          "@type": "Service",
          name: s.serviceType,
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": ids.website,
    url: site.url,
    name: site.name,
    inLanguage: ["en", "fr"],
    publisher: { "@id": ids.person },
    about: { "@id": ids.service },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, innoviaburst, business, website],
  };
}

/** Service node for a /services/[slug] page, with an Offer when priced. */
export function serviceJsonLd({
  locale,
  url,
  serviceType,
  name,
  description,
  priceKind,
}: {
  locale: Locale;
  url: string;
  serviceType: string;
  name: string;
  description: string;
  priceKind?: PriceKind;
}) {
  const price = priceKind ? prices[priceKind] : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType,
    name,
    description,
    url,
    inLanguage: htmlLang[locale],
    provider: { "@id": ids.person },
    isPartOf: { "@id": ids.service },
    areaServed,
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            url: `${url}#pricing`,
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            seller: { "@id": ids.person },
            // Price only once lib/pricing.ts has a real figure.
            ...(price.amount !== null
              ? {
                  price: price.amount,
                  priceSpecification: {
                    "@type": price.perMonth
                      ? "UnitPriceSpecification"
                      : "PriceSpecification",
                    price: price.amount,
                    priceCurrency: "EUR",
                    valueAddedTaxIncluded: false,
                    ...(price.perMonth
                      ? { unitCode: "MON", minPrice: price.amount }
                      : {}),
                  },
                }
              : {}),
          },
        }
      : {}),
  };
}
