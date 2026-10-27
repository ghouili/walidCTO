import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { getLandingPage, landingPages } from "@/lib/landing-pages";
import { ogLocale, type Locale } from "@/lib/i18n";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

/** Each LP exists in its own locale only (middleware routes /lp/<fr-slug> to fr). */
export function generateStaticParams() {
  return landingPages.map((p) => ({ locale: p.locale, slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const lp = getLandingPage(slug);
  if (!lp) return {};
  return {
    title: { absolute: lp.meta.title },
    description: lp.meta.description,
    alternates: { canonical: `/lp/${lp.slug}` },
    // Ads-only pages: keep them out of the index (also disallowed in robots).
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      url: `/lp/${lp.slug}`,
      title: lp.meta.title,
      description: lp.meta.description,
      locale: ogLocale[lp.locale],
    },
  };
}

export default async function LandingRoute({ params }: Params) {
  const { locale, slug } = await params;
  const lp = getLandingPage(slug);
  if (!lp || lp.locale !== locale) notFound();
  return <LandingPage lp={lp} />;
}
