import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { site } from "@/lib/site";
import { servicePages, getServicePage } from "@/lib/service-pages";
import { getCaseStudy, type WorkEntry } from "@/lib/work";

type Params = { params: Promise<{ slug: string }> };

const AREA_SERVED = ["Tunisia", "European Union", "France", "MENA"];

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) return {};
  const url = `${site.url}/services/${s.slug}`;
  return {
    title: s.seoTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      type: "website",
      url,
      title: s.seoTitle,
      description: s.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: s.seoTitle,
      description: s.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) notFound();

  const url = `${site.url}/services/${s.slug}`;
  const related = s.relatedCaseStudies
    .map((cs) => getCaseStudy(cs))
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
    <>
      <Nav />
      <main id="main-content">
        <article className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
          <Container className="max-w-[820px]">
            <Breadcrumb
              items={[
                { name: "Home", href: "/" },
                { name: "Services", href: "/#services" },
                { name: s.serviceType, href: `/services/${s.slug}` },
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
                What you get
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

            {s.faqs.length > 0 && (
              <section className="my-12">
                <h2 className="text-ink mb-5 text-[22px] font-semibold tracking-[-0.02em]">
                  {s.serviceType} — questions
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
                  Related work
                </h2>
                <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                  {related.map((cs) => (
                    <Link
                      key={cs.slug}
                      href={`/work/${cs.slug}`}
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
                Let&apos;s talk about your {s.serviceType.toLowerCase()}.
              </h2>
              <p className="text-dim mb-7 text-[16px] leading-[1.55]">
                A 30-minute intro call, a written scope, and a concrete number —
                no surprises. I reply within 48 hours.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" href="/#contact">
                  Start a project conversation →
                </Button>
                <Button variant="secondary" href={site.bookingUrl}>
                  Book a 30-min call
                </Button>
              </div>
            </section>
          </Container>
        </article>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
