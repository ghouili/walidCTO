import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GradientPill } from "@/components/ui/GradientPill";

/** Hero with floating animated gradient blobs (`.hero` from the mockup). */
export function Hero() {
  return (
    <header
      id="top"
      className="relative overflow-hidden pt-40 pb-[120px] text-center max-[900px]:pt-[120px] max-[900px]:pb-20"
    >
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-gradient-3" aria-hidden="true" />

      <Container className="relative z-[2]">
        <GradientPill className="mb-8 animate-[fade-up_0.7s_0.1s_both]">
          Available for&nbsp;
          <strong className="text-ink font-semibold">Q3 2026</strong>
          &nbsp;· 2 spots open
        </GradientPill>

        <h1 className="text-ink mx-auto mb-7 max-w-[920px] animate-[fade-up_0.7s_0.2s_both] text-[clamp(44px,7vw,80px)] leading-[1.02] font-semibold tracking-[-0.04em]">
          Senior engineering, <span className="text-gradient">on demand.</span>
        </h1>

        <p className="text-dim mx-auto mb-10 max-w-[660px] animate-[fade-up_0.7s_0.35s_both] text-xl leading-[1.5] tracking-[-0.01em]">
          European-grade engineering from Tunis, at nearshore cost. I help
          early-stage teams across the EU and MENA ship the right product — and
          audit the ones that shipped the wrong one. GDPR-fluent, in French,
          English, or Arabic.
        </p>

        <div className="flex animate-[fade-up_0.7s_0.5s_both] flex-wrap justify-center gap-3">
          <Button variant="primary" href="#contact">
            Book a call →
          </Button>
          <Button variant="secondary" href="#work">
            See selected work
          </Button>
        </div>
      </Container>
    </header>
  );
}
