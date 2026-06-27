import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

/** Trigger situations — "when do you need a fractional CTO?" */
const triggers = [
  "You're pre-product and about to build — and don't want to build it wrong.",
  "You shipped something, and now it's breaking or slowing you down.",
  "There's no senior engineer in the room to make the hard calls.",
  "You're raising and need credible technical leadership.",
  "You're scaling faster than your stack and team can handle.",
];

/** Comparison table — qualitative only, no figures. */
const comparison = {
  head: ["", "Fractional CTO", "Full-time CTO", "Agency / dev shop"],
  rows: [
    [
      "Cost",
      "Monthly retainer, part-time",
      "Full salary + equity",
      "Per-project, often highest",
    ],
    ["Commitment", "1–2 days/week, 3-month min.", "Permanent", "Project-bound"],
    ["Embedded?", "Yes — in your team", "Yes", "No — external"],
    [
      "Accountability",
      "Owns technical decisions",
      "Owns everything",
      "Delivers scope, then leaves",
    ],
    [
      "Best for",
      "Pre/early product, need senior judgment now",
      "Funded, scaling, need a permanent leader",
      "A discrete, well-specified build",
    ],
  ],
};

// Speakable flags the definition sentence as the quotable answer for
// voice/AI surfaces (AEO).
const speakableJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${site.url}/#webpage`,
  url: site.url,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#fractional-cto-definition"],
  },
};

/** "What is a fractional CTO?" explainer + comparison table (`#what-is-a-fractional-cto`). */
export function FractionalCTOExplainer() {
  return (
    <section
      id="what-is-a-fractional-cto"
      className="py-[120px] max-[900px]:py-20"
    >
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          The basics
        </span>
        <h2 className="text-ink mb-6 max-w-[720px] text-[clamp(30px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          What is a fractional CTO?
        </h2>
        <p
          id="fractional-cto-definition"
          className="text-dim mb-14 max-w-[680px] text-[19px] leading-[1.55] tracking-[-0.01em] max-[900px]:text-[17px]"
        >
          A fractional CTO is a senior engineering leader who works part-time —
          typically 1–2 days a week — with a company that isn&apos;t ready for a
          full-time CTO. They own architecture, code review, technical hiring,
          and the roadmap, giving startups senior judgment without a full-time
          salary.
        </p>

        <h3 className="text-ink mb-5 text-[22px] font-semibold tracking-[-0.02em]">
          When do you need one?
        </h3>
        <ul className="mb-14 flex max-w-[720px] flex-col gap-3">
          {triggers.map((t) => (
            <li
              key={t}
              className="text-dim flex items-start gap-3 text-[16px] leading-[1.5] tracking-[-0.005em]"
            >
              <span
                className="text-accent mt-0.5 shrink-0 font-semibold"
                aria-hidden="true"
              >
                →
              </span>
              {t}
            </li>
          ))}
        </ul>

        <h3 className="text-ink mb-5 text-[22px] font-semibold tracking-[-0.02em]">
          Fractional CTO vs full-time CTO vs agency
        </h3>
        <div className="border-border overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px]">
            <thead>
              <tr className="border-border border-b">
                {comparison.head.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    className={`p-4 font-semibold tracking-[-0.01em] ${
                      i === 0
                        ? "text-faint font-mono text-[11px] tracking-[0.02em]"
                        : i === 1
                          ? "text-accent"
                          : "text-ink"
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr
                  key={row[0]}
                  className="border-border border-b last:border-0"
                >
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`p-4 align-top leading-[1.4] ${
                        i === 0
                          ? "text-ink font-medium"
                          : i === 1
                            ? "text-ink"
                            : "text-dim"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }}
      />
    </section>
  );
}
