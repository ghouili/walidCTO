import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

/** Closing call-to-action with decorative corner gradients (`#contact`). */
export function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden py-[140px] text-center max-[900px]:py-20"
    >
      <div className="cta-gradient" aria-hidden="true" />

      <Container className="relative z-[1]">
        <h2 className="text-ink mb-6 text-[clamp(32px,6vw,72px)] leading-[1.05] font-semibold tracking-[-0.04em]">
          Let&apos;s see if I&apos;m the{" "}
          <span className="text-gradient">right person to call.</span>
        </h2>
        <p className="text-dim mx-auto mb-10 max-w-[560px] text-[19px] leading-[1.5] tracking-[-0.01em]">
          Drop a short message about what you&apos;re building and where
          you&apos;re stuck. I reply within 48 hours — and if I&apos;m not the
          right fit, I&apos;ll usually know someone who is.
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-[400px]:flex-col">
          <Button
            variant="primary"
            href={`mailto:${site.email}`}
            className="[overflow-wrap:anywhere] max-[400px]:w-full max-[400px]:justify-center"
          >
            {site.email} →
          </Button>
          <Button
            variant="secondary"
            href={site.bookingUrl}
            className="max-[400px]:w-full max-[400px]:justify-center"
          >
            Book a 30-min call
          </Button>
        </div>
      </Container>
    </section>
  );
}
