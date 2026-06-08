import { Container } from "@/components/ui/Container";
import { processSteps } from "@/lib/content";

/** "How we'd work together" — the engagement process (`#process`). */
export function Process() {
  return (
    <section id="process" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          How it works
        </span>
        <h2 className="text-ink mb-5 max-w-[720px] text-[clamp(36px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          How we&apos;d work together.
        </h2>
        <p className="text-dim mb-16 max-w-[600px] text-[19px] leading-[1.5] tracking-[-0.01em]">
          Same shape whether it&apos;s a build, an audit, or a fractional-CTO
          retainer — fixed scope up front, visible progress, and everything
          yours at the end.
        </p>

        <ol className="grid grid-cols-4 gap-8 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          {processSteps.map((step) => (
            <li
              key={step.num}
              className="border-border flex flex-col gap-3 border-t pt-6"
            >
              <span className="text-accent font-mono text-xs font-medium tracking-[0.02em]">
                {step.num}
              </span>
              <h3 className="text-ink text-[19px] font-semibold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-dim text-[14px] leading-[1.55] tracking-[-0.005em]">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
