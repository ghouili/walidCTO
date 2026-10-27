import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { faqHub } from "@/lib/faq-hub";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale).faqPage;
  return pageMetadata({
    locale,
    path: "/faq",
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

/**
 * Long-form answer hub (/faq): every answer is open on the page (no
 * accordion) so the whole text is visible to crawlers and readers, and the
 * FAQPage JSON-LD mirrors exactly what is shown.
 */
export default async function FaqHubPage({ params }: Params) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const t = d.faqPage;
  const groups = faqHub[locale];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: groups.flatMap((g) =>
      g.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    ),
  };

  return (
    <SiteShell locale={locale} path="/faq">
      <section className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
        <Container className="max-w-[1000px]">
          <Breadcrumb
            items={[
              { name: d.nav.home, href: localePath(locale, "/") },
              { name: t.eyebrow, href: localePath(locale, "/faq") },
            ]}
          />
          <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
            {t.eyebrow}
          </span>
          <h1 className="text-ink mb-5 max-w-[760px] text-[clamp(30px,5vw,52px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {t.title}
          </h1>
          <p className="text-dim mb-10 max-w-[640px] text-[19px] leading-[1.5] tracking-[-0.01em]">
            {t.sub}
          </p>

          <nav aria-label={t.eyebrow} className="mb-16 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="border-border text-dim hover:border-ink hover:text-ink rounded-full border px-3.5 py-1.5 text-[13px] no-underline transition-colors"
              >
                {g.title}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-20">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-28">
                <h2 className="text-ink border-border mb-8 border-b pb-4 text-[26px] font-semibold tracking-[-0.025em]">
                  {g.title}
                </h2>
                <div className="flex flex-col gap-10">
                  {g.items.map((f) => (
                    <div key={f.q} className="max-w-[760px]">
                      <h3 className="text-ink mb-3 text-[19px] leading-[1.35] font-semibold tracking-[-0.02em]">
                        {f.q}
                      </h3>
                      <p className="text-dim text-[16px] leading-[1.7] tracking-[-0.005em]">
                        {f.a}
                      </p>
                      {f.link && (
                        <Link
                          href={f.link.href}
                          className="text-accent mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium tracking-[-0.01em] no-underline"
                        >
                          {f.link.label} →
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="border-border mt-20 border-t pt-10">
            <h2 className="text-ink mb-3 text-[24px] font-semibold tracking-[-0.03em]">
              {t.ctaTitle}
            </h2>
            <p className="text-dim mb-7 text-[16px] leading-[1.55]">
              {t.ctaBody}
            </p>
            <Button variant="primary" href={localePath(locale, "/#contact")}>
              {t.cta}
            </Button>
          </section>
        </Container>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </SiteShell>
  );
}
