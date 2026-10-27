import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ContactForm";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Closing call-to-action with the contact form (`#contact`). */
export function CTA({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-[140px] max-[900px]:py-20"
    >
      <div className="cta-gradient" aria-hidden="true" />

      <Container className="relative z-[1]">
        <div className="text-center">
          <h2 className="text-ink mb-6 text-[clamp(32px,6vw,72px)] leading-[1.05] font-semibold tracking-[-0.04em]">
            {t.cta.titleA} <span className="text-gradient">{t.cta.titleB}</span>
          </h2>
          <p className="text-dim mx-auto mb-12 max-w-[560px] text-[19px] leading-[1.5] tracking-[-0.01em]">
            {t.cta.sub}
          </p>
        </div>

        <div className="mx-auto max-w-[720px]">
          <ContactForm
            locale={locale}
            source="contact"
            labels={t.form}
            bookingUrl={site.bookingUrl}
            email={site.email}
            privacyHref={localePath(locale, "/privacy")}
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-center">
            <span className="text-dim text-[15px]">{t.cta.preferTalk}</span>
            <Button variant="secondary" href={site.bookingUrl}>
              {t.cta.book}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
