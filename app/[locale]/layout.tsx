import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { htmlLang, isLocale, localePath, locales, ogLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { siteGraph } from "@/lib/jsonld";
import { consentDefaultsScript } from "@/lib/analytics";
import { Analytics } from "@/components/analytics/Analytics";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  // "optional": no late swap, so no re-wrap shift (CLS) and no late LCP.
  display: "optional",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  // "optional": no late swap, so no re-wrap shift (CLS) and no late LCP.
  display: "optional",
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
    // Small derivatives of logo_walid.png (500px, 109 KB), which used to be
    // fetched at high priority on every page view.
    icons: {
      icon: { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      shortcut: "/icon-48.png",
      apple: { url: "/apple-icon-180.png", sizes: "180x180" },
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

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html
      lang={htmlLang[locale]}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      {gtmId && (
        <head>
          {/* Consent Mode v2 defaults: must run before any Google tag. */}
          <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
        </head>
      )}
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          {locale === "fr" ? "Aller au contenu" : "Skip to content"}
        </a>
        {children}
        <Analytics
          gtmId={gtmId}
          labels={getDictionary(locale).consent}
          privacyHref={localePath(locale, "/privacy")}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteGraph(locale)),
          }}
        />
      </body>
    </html>
  );
}
