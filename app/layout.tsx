import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: site.titleTemplate,
  },
  description: site.description,
  keywords: [
    "fractional CTO",
    "technical audit",
    "engineering consultant",
    "Tunisia",
    "Next.js",
    "SaaS",
    "Europe",
    "GDPR",
    "MENA",
    "technical leadership",
    "CTO Tunis",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo_walid.png",
    shortcut: "/logo_walid.png",
    apple: "/logo_walid.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
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
    title: site.title,
    description: site.description,
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  image: `${site.url}${site.portrait}`,
  jobTitle: site.jobTitle,
  url: site.url,
  worksFor: {
    "@type": "Organization",
    name: site.company.name,
    url: site.company.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location.city,
    addressCountry: site.location.countryCode,
  },
  sameAs: [site.social.linkedin],
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

// Organization node — this is what Google reads for the brand logo shown in
// Search results / the knowledge panel. Uses the solid-background logo.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}${site.logo}`,
  image: `${site.url}${site.logo}`,
  sameAs: [site.social.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
