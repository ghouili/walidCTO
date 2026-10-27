import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { site } from "@/lib/site";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { getCaseStudies, getCaseStudy, getServicePage } from "@/lib/localized";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCaseStudies(locale).map((w) => ({ locale, slug: w.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const w = getCaseStudy(locale, slug);
  if (!w?.caseStudy) return {};
  const path = `/work/${w.slug}`;
  return pageMetadata({
    locale,
    path,
    title: w.caseStudy.seoTitle,
    description: w.caseStudy.metaDescription,
    type: "article",
  });
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item}
          className="text-dim flex items-start gap-3 text-[16px] leading-[1.55] tracking-[-0.005em]"
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
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { locale, slug } = await params;
  const w = getCaseStudy(locale, slug);
  if (!w?.caseStudy) notFound();
  const t = getDictionary(locale);

  const c = w.caseStudy;
  const path = `/work/${w.slug}`;
  const url = `${site.url}${localePath(locale, path)}`;
  const service = getServicePage(locale, c.relatedService);

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: c.h1,
    headline: c.h1,
    description: c.metaDescription,
    url,
    about: w.sector,
    author: { "@id": `${site.url}/#person` },
    creator: { "@id": `${site.url}/#person` },
    ...(w.url || w.stores
      ? {
          sameAs: [w.url, ...(w.stores?.map((s) => s.url) ?? [])].filter(
            Boolean,
          ),
        }
      : {}),
  };

  return (
    <SiteShell locale={locale} path={path}>
      <article className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
        <Container className="max-w-[820px]">
          <Breadcrumb
            items={[
              { name: t.nav.home, href: localePath(locale, "/") },
              { name: t.nav.work, href: localePath(locale, "/#work") },
              { name: w.client, href: localePath(locale, path) },
            ]}
          />

          <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
            {w.sector}
          </span>
          <h1 className="text-ink mb-6 text-[clamp(28px,5vw,48px)] leading-[1.08] font-semibold tracking-[-0.035em]">
            {c.h1}
          </h1>

          {(w.url || w.stores) && (
            <div className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2">
              {w.url && (
                <a
                  href={w.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent inline-flex items-center gap-1.5 text-[14px] font-medium tracking-[-0.01em] no-underline"
                >
                  {t.workPage.visitLive}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {w.stores?.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent inline-flex items-center gap-1.5 text-[14px] font-medium tracking-[-0.01em] no-underline"
                >
                  {t.workPage.getItOn} {s.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          )}

          <section className="mb-10">
            <h2 className="text-ink mb-3 text-[22px] font-semibold tracking-[-0.02em]">
              {t.workPage.context}
            </h2>
            <p className="text-dim text-[16px] leading-[1.7] tracking-[-0.005em]">
              {c.intro}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-ink mb-3 text-[22px] font-semibold tracking-[-0.02em]">
              {t.workPage.challenge}
            </h2>
            <p className="text-dim text-[16px] leading-[1.7] tracking-[-0.005em]">
              {c.challenge}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-ink mb-4 text-[22px] font-semibold tracking-[-0.02em]">
              {t.workPage.approach}
            </h2>
            <Bullets items={c.approach} />
          </section>

          <section className="bg-section my-10 rounded-3xl p-9 max-[900px]:rounded-[18px] max-[900px]:p-6">
            <h2 className="text-ink mb-4 text-[20px] font-semibold tracking-[-0.02em]">
              {t.workPage.built}
            </h2>
            <Bullets items={c.built} />
          </section>

          <section className="mb-10">
            <h2 className="text-ink mb-4 text-[22px] font-semibold tracking-[-0.02em]">
              {t.workPage.outcome}
            </h2>
            <Bullets items={c.outcome} />
          </section>

          <section className="mb-12">
            <h2 className="text-ink mb-4 text-[16px] font-semibold tracking-[-0.01em]">
              {t.workPage.stack}
            </h2>
            <div className="flex flex-wrap gap-2">
              {c.stack.map((tech) => (
                <span
                  key={tech}
                  className="bg-section text-dim rounded-full px-3 py-[5px] font-mono text-[12px] tracking-[0.01em]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className="border-border mt-14 border-t pt-10">
            <h2 className="text-ink mb-3 text-[24px] font-semibold tracking-[-0.03em]">
              {t.workPage.similarTitle}
            </h2>
            <p className="text-dim mb-7 text-[16px] leading-[1.55]">
              {t.workPage.similarBody}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" href={localePath(locale, "/#contact")}>
                {t.workPage.start}
              </Button>
              {service && (
                <Button
                  variant="secondary"
                  href={localePath(locale, `/services/${service.slug}`)}
                >
                  {service.serviceType} →
                </Button>
              )}
            </div>
            <p className="text-dim mt-8 text-[14.5px] leading-[1.55]">
              {t.workPage.raising}{" "}
              <Link
                href={localePath(locale, "/checklist")}
                className="text-accent font-medium no-underline"
              >
                {t.workPage.checklistLink}
              </Link>
            </p>
          </section>
        </Container>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
    </SiteShell>
  );
}
