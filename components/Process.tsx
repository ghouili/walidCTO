import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getProcessSteps } from "@/lib/localized";

/** "How we'd work together" — the engagement process (`#process`). */
export function Process({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).process;
  const processSteps = getProcessSteps(locale);
  return (
    <section id="process" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          {t.eyebrow}
        </span>
        <h2 className="text-ink mb-5 max-w-[720px] text-[clamp(30px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          {t.title}
        </h2>
        <p className="text-dim mb-16 max-w-[600px] text-[19px] leading-[1.5] tracking-[-0.01em]">
          {t.sub}
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
