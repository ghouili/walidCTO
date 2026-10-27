import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { PriceAnchor } from "@/components/PriceAnchor";
import { getDictionary } from "@/lib/dictionaries";
import type { PriceKind } from "@/lib/pricing";
import { site } from "@/lib/site";
import type { WorkEntry } from "@/lib/work";
import { localePath, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getCaseStudy, getServicePage, getServicePages } from "@/lib/localized";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

const AREA_SERVED = ["Tunisia", "European Union", "France", "MENA"];

/** Service pages that carry a published price anchor (`#pricing`). */
const PRICED: Record<string, PriceKind> = {
  "technical-audit": "audit",
  "fractional-cto": "cto",
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getServicePages(locale).map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getServicePage(locale, slug);
  if (!s) return {};
  const path = `/services/${s.slug}`;
  return pageMetadata({
    locale,
    path,
    title: s.seoTitle,
    description: s.metaDescription,
  });
}

export default async function ServicePage({ params }: Params) {
  const { locale, slug } = await params;
  const s = getServicePage(locale, slug);
  if (!s) notFound();
  const t = getDictionary(locale);
  const path = `/services/${s.slug}`;

  const url = `${site.url}${localePath(locale, path)}`;
  const related = s.relatedCaseStudies
    .map((cs) => getCaseStudy(locale, cs))
    .filter((cs): cs is WorkEntry => cs !== undefined);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    serviceType: s.serviceType,
    name: s.h1,
    description: s.metaDescription,
    url,
    provider: { "@id": `${site.url}/#person` },
    areaServed: AREA_SERVED,
    isPartOf: { "@id": `${site.url}/#service` },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SiteShell locale={locale} path={path}>
      <article className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
        <Container className="max-w-[820px]">
          <Breadcrumb
            items={[
              { name: t.nav.home, href: localePath(locale, "/") },
              {
                name: t.nav.services,
                href: localePath(locale, "/#services"),
              },
              { name: s.serviceType, href: localePath(locale, path) },
            ]}
          />

          <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
            {s.eyebrow}
          </span>
          <h1 className="text-ink mb-6 text-[clamp(30px,5vw,52px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {s.h1}
          </h1>
          <p className="text-dim mb-12 text-[19px] leading-[1.55] tracking-[-0.01em] max-[900px]:text-[17px]">
            {s.lede}
          </p>

          {s.sections.map((sec) => (
            <section key={sec.heading} className="mb-10">
              <h2 className="text-ink mb-3 text-[22px] font-semibold tracking-[-0.02em]">
                {sec.heading}
              </h2>
              <p className="text-dim text-[16px] leading-[1.7] tracking-[-0.005em]">
                {sec.body}
              </p>
            </section>
          ))}

          <section className="bg-section my-12 rounded-3xl p-9 max-[900px]:rounded-[18px] max-[900px]:p-6">
            <h2 className="text-ink mb-5 text-[20px] font-semibold tracking-[-0.02em]">
              {t.servicePage.whatYouGet}
            </h2>
            <ul className="flex flex-col gap-3">
              {s.whatYouGet.map((item) => (
                <li
                  key={item}
                  className="text-dim flex items-start gap-3 text-[15px] leading-[1.5] tracking-[-0.005em]"
                >
                  <span
                    className="text-accent mt-0.5 shrink-0 font-semibold"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {PRICED[s.slug] && (
            <PriceAnchor
              kind={PRICED[s.slug]}
              locale={locale}
              labels={t.pricing}
              ctaHref={localePath(locale, "/#contact")}
            />
          )}

          {s.faqs.length > 0 && (
            <section className="my-12">
              <h2 className="text-ink mb-5 text-[22px] font-semibold tracking-[-0.02em]">
                {t.servicePage.questions.replace("{service}", s.serviceType)}
              </h2>
              <div className="border-border border-t">
                {s.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border-border border-b py-5"
                  >
                    <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <span
                        className="text-faint text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="text-dim mt-3 text-[15px] leading-[1.6] tracking-[-0.005em]">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="my-12">
              <h2 className="text-ink mb-5 text-[22px] font-semibold tracking-[-0.02em]">
                {t.servicePage.relatedWork}
              </h2>
              <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                {related.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={localePath(locale, `/work/${cs.slug}`)}
                    className="group bg-section hover:border-border flex flex-col rounded-[18px] border border-transparent p-6 no-underline transition-all duration-200 hover:bg-white"
                  >
                    <span className="text-faint mb-2 font-mono text-[11px] tracking-[0.02em]">
                      {cs.sector}
                    </span>
                    <span className="text-ink text-[16px] leading-[1.35] font-semibold tracking-[-0.02em]">
                      {cs.client}
                    </span>
                    <span className="text-dim mt-2 text-[13.5px] leading-[1.5]">
                      {cs.outcome}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="border-border mt-14 border-t pt-10">
            <h2 className="text-ink mb-3 text-[24px] font-semibold tracking-[-0.03em]">
              {t.servicePage.talkTitle}
            </h2>
            <p className="text-dim mb-7 text-[16px] leading-[1.55]">
              {t.servicePage.talkBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" href={localePath(locale, "/#contact")}>
                {t.servicePage.start}
              </Button>
              <Button variant="secondary" href={site.bookingUrl}>
                {t.servicePage.book}
              </Button>
            </div>
          </section>
        </Container>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </SiteShell>
  );
}
