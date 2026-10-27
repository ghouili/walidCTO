import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ContactForm";
import { PriceAnchor } from "@/components/PriceAnchor";
import { Testimonials } from "@/components/Testimonials";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import type { LandingPage as LP } from "@/lib/landing-pages";
import { site } from "@/lib/site";

const eyebrowClass =
  "text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]";
const h2Class =
  "text-ink mb-10 max-w-[720px] text-[clamp(28px,4vw,44px)] leading-[1.08] font-semibold tracking-[-0.035em]";

/**
 * Paid-traffic landing page: no site nav, one offer, one CTA (to #form)
 * repeated three times. See lib/landing-pages.ts.
 */
export function LandingPage({ lp }: { lp: LP }) {
  const t = getDictionary(lp.locale);

  const cta = (
    <Button variant="primary" href="#form" className="px-[26px] py-[15px]">
      {lp.cta} →
    </Button>
  );

  return (
    <>
      <header className="border-border/60 border-b">
        <Container className="flex items-center justify-between py-[14px]">
          <span className="text-ink text-base font-semibold tracking-[-0.02em]">
            {site.name}
          </span>
          <span className="text-faint font-mono text-[11px] tracking-[0.02em] max-[600px]:hidden">
            {lp.eyebrow}
          </span>
        </Container>
      </header>

      <main id="main-content">
        {/* Pain headline + CTA #1 */}
        <section className="relative overflow-hidden pt-24 pb-20 max-[900px]:pt-16 max-[900px]:pb-14">
          <div className="cta-gradient" aria-hidden="true" />
          <Container className="relative z-[1] max-w-[880px] text-center">
            <span className="text-faint mb-5 inline-block font-mono text-[12px] tracking-[0.14em] uppercase">
              {lp.eyebrow}
            </span>
            <h1 className="text-ink mx-auto mb-6 max-w-[20ch] text-[clamp(34px,6vw,64px)] leading-[1.04] font-semibold tracking-[-0.04em]">
              {lp.headline}
            </h1>
            <p className="text-dim mx-auto mb-9 max-w-[60ch] text-[clamp(17px,1.6vw,19px)] leading-[1.55] tracking-[-0.01em]">
              {lp.sub}
            </p>
            {cta}
            <p className="text-dim mt-6 font-mono text-[12px] tracking-[0.03em]">
              {t.lp.trust}
            </p>
          </Container>
        </section>

        {/* Pains */}
        <section className="py-16 max-[900px]:py-12">
          <Container className="max-w-[880px]">
            <h2 className="text-ink mb-6 text-[22px] font-semibold tracking-[-0.02em]">
              {lp.painsTitle}
            </h2>
            <ul className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
              {lp.pains.map((p) => (
                <li
                  key={p}
                  className="bg-section text-ink rounded-[18px] p-6 text-[16px] leading-[1.45] tracking-[-0.01em]"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* What you get */}
        <section className="py-20 max-[900px]:py-14">
          <Container>
            <h2 className={h2Class}>{lp.getTitle}</h2>
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
              {lp.get.map((g, i) => (
                <div
                  key={g.title}
                  className="border-border rounded-[20px] border p-7 max-[600px]:p-6"
                >
                  <div className="text-accent mb-3 font-mono text-xs font-medium tracking-[0.02em]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-ink mb-2 text-[18px] font-semibold tracking-[-0.02em]">
                    {g.title}
                  </h3>
                  <p className="text-dim text-[14.5px] leading-[1.55] tracking-[-0.005em]">
                    {g.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Proof + CTA #2 */}
        <section className="py-20 max-[900px]:py-14">
          <Container>
            <span className={eyebrowClass}>{t.lp.proofEyebrow}</span>
            <h2 className={h2Class}>{t.lp.proofTitle}</h2>
            <div className="mb-12 grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
              {lp.proof.map((p) => (
                <div
                  key={p.client}
                  className="bg-section flex flex-col rounded-[20px] p-8 max-[900px]:p-6"
                >
                  <span className="text-faint mb-3 font-mono text-[11px] tracking-[0.02em]">
                    {p.sector}
                  </span>
                  <h3 className="text-ink mb-3 text-xl font-semibold tracking-[-0.02em]">
                    {p.client}
                  </h3>
                  <p className="text-dim text-[14.5px] leading-[1.55] tracking-[-0.005em]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center">{cta}</div>
          </Container>
        </section>

        <Testimonials labels={t.testimonials} />

        {/* Price */}
        <section className="py-8">
          <Container className="max-w-[720px]">
            <PriceAnchor
              kind={lp.kind}
              locale={lp.locale}
              labels={t.pricing}
              ctaHref="#form"
            />
          </Container>
        </section>

        {/* FAQ + CTA #3 */}
        <section className="py-20 max-[900px]:py-14">
          <Container className="max-w-[820px]">
            <h2 className={h2Class}>{t.lp.faqTitle}</h2>
            <div className="border-border mb-12 border-t">
              {lp.faq.map((f) => (
                <details
                  key={f.q}
                  className="group border-border border-b py-5"
                >
                  <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      className="text-faint text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-dim mt-3 text-[15px] leading-[1.6] tracking-[-0.005em]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
            <div className="text-center">
              <p className="text-ink mx-auto mb-6 max-w-[28ch] text-[clamp(22px,3vw,30px)] leading-[1.2] font-semibold tracking-[-0.03em]">
                {lp.closingTitle}
              </p>
              {cta}
            </div>
          </Container>
        </section>

        {/* Form */}
        <section
          id="form"
          className="scroll-mt-6 pt-10 pb-[120px] max-[900px]:pb-20"
        >
          <Container className="max-w-[760px]">
            <span className={eyebrowClass}>{t.lp.formEyebrow}</span>
            <h2 className="text-ink mb-3 text-[clamp(28px,4vw,40px)] leading-[1.08] font-semibold tracking-[-0.035em]">
              {lp.formTitle}
            </h2>
            <p className="text-dim mb-8 text-[17px] leading-[1.55]">
              {lp.formBody}
            </p>
            <ContactForm
              locale={lp.locale}
              source={`lp:${lp.slug}`}
              labels={t.form}
              bookingUrl={site.bookingUrl}
              email={site.email}
              privacyHref={localePath(lp.locale, "/privacy")}
            />
          </Container>
        </section>
      </main>

      <footer className="border-border border-t py-8">
        <Container className="text-faint flex flex-wrap items-center justify-between gap-4 text-[13px]">
          <span>
            © 2026 {site.name} · {site.location.city}
          </span>
          <Link
            href={localePath(lp.locale, "/privacy")}
            className="hover:text-ink no-underline transition-colors"
          >
            {t.lp.privacy}
          </Link>
        </Container>
      </footer>
    </>
  );
}
