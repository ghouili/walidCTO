import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { htmlLang, isLocale, locales, ogLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(isLocale(locale) ? locale : "en");
  return {
    metadataBase: new URL(site.url),
    title: {
      default: t.meta.title,
      template: site.titleTemplate,
    },
    description: t.meta.description,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    icons: {
      icon: "/logo_walid.png",
      shortcut: "/logo_walid.png",
      apple: "/logo_walid.png",
    },
    openGraph: {
      type: "website",
      locale: ogLocale[isLocale(locale) ? locale : "en"],
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      images: [
        {
          // TODO: replace with a dedicated 1200×630 OG card (portrait is 1024×983).
          url: site.portrait,
          width: 1024,
          height: 983,
          alt: site.portraitAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [site.portrait],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    // Add your search-console tokens here once you have them:
    // verification: {
    //   google: "GOOGLE_SITE_VERIFICATION_TOKEN",
    //   other: { "msvalidate.01": "BING_SITE_VERIFICATION_TOKEN" },
    // },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  description:
    "Fractional CTO and technical-audit consultant in Tunis, Tunisia, serving European and Tunisian startups with nearshore senior engineering, MVP builds, and codebase audits.",
  image: `${site.url}${site.portrait}`,
  jobTitle: site.jobTitle,
  url: site.url,
  email: site.email,
  worksFor: {
    "@type": "Organization",
    name: site.company.name,
    url: site.company.url,
  },
  alumniOf: {
    "@type": "Organization",
    name: "IMSET — Honoris United Universities",
  },
  founder: [
    {
      "@type": "Organization",
      name: "InnoviaBurst",
      url: "https://innoviaburst.com",
    },
    {
      "@type": "Organization",
      name: "Simplify for Kids",
      url: "https://simplify-kids.tn/",
    },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  sameAs: [
    site.social.linkedin,
    site.social.github,
    site.company.url,
    "https://simplify-kids.tn/",
  ],
  knowsAbout: [
    "Next.js",
    "NestJS",
    "Django",
    "FastAPI",
    "PostgreSQL",
    "Technical Architecture",
    "SaaS Development",
    "Engineering Leadership",
    "GDPR Compliance",
    "Code Auditing",
    "Engineering Mentorship",
  ],
  knowsLanguage: site.languages,
};

// ProfessionalService node (an Organization subtype) — carries the brand logo
// Google reads for Search / the knowledge panel, plus areaServed, languages, a
// price band, and the four engagements. Cross-linked to the Person via @id
// (#service ↔ #person) so the entity graph resolves without Person/Org name
// conflation.
const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: "Walid Ghouili — Fractional CTO & Technical Audits",
  url: site.url,
  logo: `${site.url}${site.logo}`,
  image: `${site.url}${site.logo}`,
  provider: { "@id": `${site.url}/#person` },
  areaServed: ["Tunisia", "European Union", "France", "MENA"],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  knowsLanguage: site.languages,
  priceRange: "€€",
  email: site.email,
  sameAs: [site.social.linkedin, site.social.github, site.company.url],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagements",
    itemListElement: [
      {
        "@type": "Service",
        serviceType: "MVP Development",
        description: "Idea to shippable MVP in ~4 weeks, fixed scope.",
      },
      {
        "@type": "Service",
        serviceType: "Fractional CTO",
        description:
          "1–2 days/week senior technical leadership; 3-month minimum.",
      },
      {
        "@type": "Service",
        serviceType: "Technical Audit",
        description:
          "Two-week deep-read of codebase, infrastructure, and team practices.",
      },
      {
        "@type": "Service",
        serviceType: "Engineering Training",
        description: "Modern web-stack workshops in French and English.",
      },
    ],
  },
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={htmlLang[locale]}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />
      </body>
    </html>
  );
}
