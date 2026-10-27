import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/ContactForm";
import { getDictionary } from "@/lib/dictionaries";
import { site } from "@/lib/site";

/** Closing call-to-action with the contact form (`#contact`). */
export function CTA() {
  const t = getDictionary("en");

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-[140px] max-[900px]:py-20"
    >
      <div className="cta-gradient" aria-hidden="true" />

      <Container className="relative z-[1]">
        <div className="text-center">
          <h2 className="text-ink mb-6 text-[clamp(32px,6vw,72px)] leading-[1.05] font-semibold tracking-[-0.04em]">
            Let&apos;s see if I&apos;m the{" "}
            <span className="text-gradient">right person to call.</span>
          </h2>
          <p className="text-dim mx-auto mb-12 max-w-[560px] text-[19px] leading-[1.5] tracking-[-0.01em]">
            Tell me what you&apos;re building and where you&apos;re stuck. I
            reply within 48 hours, and if I&apos;m not the right fit, I&apos;ll
            usually know someone who is.
          </p>
        </div>

        <div className="mx-auto max-w-[720px]">
          <ContactForm
            locale="en"
            source="contact"
            labels={t.form}
            bookingUrl={site.bookingUrl}
            email={site.email}
            privacyHref="/privacy"
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-center">
            <span className="text-dim text-[15px]">Prefer to talk first?</span>
            <Button variant="secondary" href={site.bookingUrl}>
              Book a 30-min call
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
