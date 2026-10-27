import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NDABadge } from "@/components/ui/NDABadge";
import type { WorkEntry } from "@/lib/work";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { localePath } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { getWork } from "@/lib/localized";

const cardBase =
  "group bg-section flex flex-col rounded-[20px] border border-transparent p-8 transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-border hover:bg-white hover:shadow-card max-[900px]:p-6 max-[400px]:p-5";

function CardBody({ entry, t }: { entry: WorkEntry; t: Dictionary["work"] }) {
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
        {/* NDA names never reach the HTML: the blur is cosmetic only. */}
        {entry.nda ? t.ndaClient : entry.client}
      </h3>

      <p className="text-ink mb-2.5 text-[17px] leading-[1.35] font-semibold tracking-[-0.02em]">
        {entry.outcome}
      </p>
      <p className="text-dim text-[14.5px] leading-[1.55] tracking-[-0.005em]">
        {entry.caption}
      </p>

      <div className="mt-auto pt-6">
        {entry.caseStudy ? (
          <span className="text-accent inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[-0.01em]">
            {t.readCaseStudy}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        ) : entry.nda ? (
          <span className="text-faint font-mono text-[11px] tracking-[0.02em]">
            {t.ndaNote}
          </span>
        ) : null}
      </div>
    </>
  );
}

/** Selected work — outcome-led cards linking to case studies; NDA work blurred (`#work`). */
export function Work({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).work;
  return (
    <section id="work" className="py-[120px] max-[900px]:py-20">
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

        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          {getWork(locale).map((entry) =>
            entry.caseStudy ? (
              <Link
                key={entry.slug}
                href={localePath(locale, `/work/${entry.slug}`)}
                className={`${cardBase} no-underline`}
              >
                <CardBody entry={entry} t={t} />
              </Link>
            ) : (
              <article key={entry.slug} className={cardBase}>
                <CardBody entry={entry} t={t} />
              </article>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
