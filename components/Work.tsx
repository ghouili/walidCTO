import { Container } from "@/components/ui/Container";
import { NDABadge } from "@/components/ui/NDABadge";
import { work, type WorkEntry } from "@/lib/work";

const cardBase =
  "group bg-section flex flex-col rounded-[20px] border border-transparent p-8 transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-border hover:bg-white hover:shadow-card max-[900px]:p-6";

function CardBody({ entry }: { entry: WorkEntry }) {
  return (
    <>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="text-faint font-mono text-[11px] tracking-[0.02em]">
          {entry.sector}
        </span>
        {entry.nda && <NDABadge />}
      </div>

      <h3
        className={`text-ink mb-4 text-xl font-semibold tracking-[-0.02em] ${
          entry.nda ? "pointer-events-none blur-[5px] select-none" : ""
        }`}
      >
        {entry.client}
      </h3>

      <p className="text-ink mb-2.5 text-[17px] leading-[1.35] font-semibold tracking-[-0.02em]">
        {entry.outcome}
      </p>
      <p className="text-dim text-[14.5px] leading-[1.55] tracking-[-0.005em]">
        {entry.caption}
      </p>

      <div className="mt-auto pt-6">
        {entry.url ? (
          <span className="text-accent inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[-0.01em]">
            Visit site
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </span>
        ) : entry.nda ? (
          <span className="text-faint font-mono text-[11px] tracking-[0.02em]">
            Confidential — under NDA
          </span>
        ) : null}
      </div>
    </>
  );
}

/** Selected work — outcome-led cards; named clients link out, NDA work blurred (`#work`). */
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
          Real products, real outcomes — a selection of recent builds across
          SaaS, local services, internal tooling, and B2B.
        </p>

        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          {work.map((entry) =>
            entry.url ? (
              <a
                key={entry.slug}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardBase} no-underline`}
              >
                <CardBody entry={entry} />
              </a>
            ) : (
              <article key={entry.slug} className={cardBase}>
                <CardBody entry={entry} />
              </article>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
