import { Container } from "@/components/ui/Container";
import { NDABadge } from "@/components/ui/NDABadge";
import { work } from "@/lib/work";

/** Selected work list with NDA-blurred client names (`#work`). */
export function Work() {
  return (
    <section id="work" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          Selected work
        </span>
        <h2 className="text-ink mb-5 max-w-[720px] text-[clamp(36px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          A few things I&apos;ve shipped.
        </h2>
        <p className="text-dim mb-16 max-w-[600px] text-[19px] leading-[1.5] tracking-[-0.01em]">
          Not everything — just the ones I can talk about. Full case studies on
          request under NDA.
        </p>

        <div className="border-border border-t">
          {work.map((entry, i) => (
            <article
              key={`${entry.client}-${i}`}
              className="work-row group border-border grid cursor-pointer grid-cols-[80px_280px_1fr_180px_24px] items-center gap-8 border-b py-7 transition-all duration-200 max-[900px]:grid-cols-1 max-[900px]:gap-2 max-[900px]:py-5"
            >
              <div className="text-faint font-mono text-xs font-medium tracking-[0.02em] max-[900px]:hidden">
                {entry.year}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`text-ink text-lg font-semibold tracking-[-0.02em] ${
                    entry.nda
                      ? "pointer-events-none blur-[5px] select-none"
                      : ""
                  }`}
                >
                  {entry.client}
                </span>
                {entry.nda && <NDABadge />}
              </div>

              <div className="text-dim text-sm leading-[1.5] tracking-[-0.005em]">
                {entry.desc}
              </div>

              <div className="bg-section text-dim w-fit rounded-full px-3 py-[5px] text-xs font-medium tracking-[-0.005em] max-[900px]:hidden">
                {entry.tag}
              </div>

              <div
                className="text-faint group-hover:text-accent text-[18px] transition-all duration-200 group-hover:translate-x-1 max-[900px]:hidden"
                aria-hidden="true"
              >
                →
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
