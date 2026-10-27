import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { IndustriesStrip } from "@/components/IndustriesStrip";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { FractionalCTOExplainer } from "@/components/FractionalCTOExplainer";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale).meta;
  return pageMetadata({
    locale,
    path: "/",
    title: t.title,
    description: t.description,
  });
}

export default async function Home({ params }: Params) {
  const { locale } = await params;
  const t = getDictionary(locale);

  return (
    <SiteShell locale={locale} path="/">
      <Hero copy={t.hero} checklistHref={localePath(locale, "/checklist")} />
      <IndustriesStrip locale={locale} />
      <Services locale={locale} />
      <Process locale={locale} />
      <Work locale={locale} />
      <Testimonials labels={t.testimonials} />
      <About locale={locale} />
      <FractionalCTOExplainer locale={locale} />
      <FAQ locale={locale} />
      <CTA locale={locale} />
    </SiteShell>
  );
}
