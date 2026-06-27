import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { site } from "@/lib/site";
import { caseStudies, getCaseStudy } from "@/lib/work";
import { getServicePage } from "@/lib/service-pages";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const w = getCaseStudy(slug);
  if (!w?.caseStudy) return {};
  const url = `${site.url}/work/${w.slug}`;
  return {
    title: w.caseStudy.seoTitle,
    description: w.caseStudy.metaDescription,
    alternates: { canonical: `/work/${w.slug}` },
    openGraph: {
      type: "article",
      url,
      title: w.caseStudy.seoTitle,
      description: w.caseStudy.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: w.caseStudy.seoTitle,
      description: w.caseStudy.metaDescription,
    },
  };
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
  const { slug } = await params;
  const w = getCaseStudy(slug);
  if (!w?.caseStudy) notFound();

  const c = w.caseStudy;
  const url = `${site.url}/work/${w.slug}`;
  const service = getServicePage(c.relatedService);

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
    ...(w.url ? { sameAs: [w.url] } : {}),
  };

  return (
    <>
      <Nav />
      <main id="main-content">
        <article className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
          <Container className="max-w-[820px]">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Work", href: "/#work" },
                { name: w.client, href: `/work/${w.slug}` },
              ]}
            />

            <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
              {w.sector}
            </span>
            <h1 className="text-ink mb-6 text-[clamp(28px,5vw,48px)] leading-[1.08] font-semibold tracking-[-0.035em]">
              {c.h1}
            </h1>

            {w.url && (
              <a
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent mb-10 inline-flex items-center gap-1.5 text-[14px] font-medium tracking-[-0.01em] no-underline"
              >
                Visit the live site
                <span aria-hidden="true">↗</span>
              </a>
            )}

            <section className="mb-10">
              <h2 className="text-ink mb-3 text-[22px] font-semibold tracking-[-0.02em]">
                Context
              </h2>
              <p className="text-dim text-[16px] leading-[1.7] tracking-[-0.005em]">
                {c.intro}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-ink mb-3 text-[22px] font-semibold tracking-[-0.02em]">
                The challenge
              </h2>
              <p className="text-dim text-[16px] leading-[1.7] tracking-[-0.005em]">
                {c.challenge}
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-ink mb-4 text-[22px] font-semibold tracking-[-0.02em]">
                Approach
              </h2>
              <Bullets items={c.approach} />
            </section>

            <section className="bg-section my-10 rounded-3xl p-9 max-[900px]:rounded-[18px] max-[900px]:p-6">
              <h2 className="text-ink mb-4 text-[20px] font-semibold tracking-[-0.02em]">
                What we built
              </h2>
              <Bullets items={c.built} />
            </section>

            <section className="mb-10">
              <h2 className="text-ink mb-4 text-[22px] font-semibold tracking-[-0.02em]">
                Outcome
              </h2>
              <Bullets items={c.outcome} />
            </section>

            <section className="mb-12">
              <h2 className="text-ink mb-4 text-[16px] font-semibold tracking-[-0.01em]">
                Stack
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
                Building something similar?
              </h2>
              <p className="text-dim mb-7 text-[16px] leading-[1.55]">
                Start a project conversation — a 30-minute intro call, a written
                scope, and a concrete number. I reply within 48 hours.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" href="/#contact">
                  Start a project conversation →
                </Button>
                {service && (
                  <Button
                    variant="secondary"
                    href={`/services/${service.slug}`}
                  >
                    {service.serviceType} →
                  </Button>
                )}
              </div>
            </section>
          </Container>
        </article>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
    </>
  );
}
