import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

// Speakable flags the definition sentence as the quotable answer for
// voice/AI surfaces (AEO).
/** "What is a fractional CTO?" explainer + comparison table (`#what-is-a-fractional-cto`). */
export function FractionalCTOExplainer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).explainer;
  const url = `${site.url}${localePath(locale, "/").replace(/\/$/, "")}`;
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#fractional-cto-definition"],
    },
  };

  return (
    <section
      id="what-is-a-fractional-cto"
      className="py-[120px] max-[900px]:py-20"
    >
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          {t.eyebrow}
        </span>
        <h2 className="text-ink mb-6 max-w-[720px] text-[clamp(30px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          {t.title}
        </h2>
        <p
          id="fractional-cto-definition"
          className="text-dim mb-14 max-w-[680px] text-[19px] leading-[1.55] tracking-[-0.01em] max-[900px]:text-[17px]"
        >
          {t.definition}
        </p>

        <h3 className="text-ink mb-5 text-[22px] font-semibold tracking-[-0.02em]">
          {t.whenTitle}
        </h3>
        <ul className="mb-14 flex max-w-[720px] flex-col gap-3">
          {t.triggers.map((trigger) => (
            <li
              key={trigger}
              className="text-dim flex items-start gap-3 text-[16px] leading-[1.5] tracking-[-0.005em]"
            >
              <span
                className="text-accent mt-0.5 shrink-0 font-semibold"
                aria-hidden="true"
              >
                →
              </span>
              {trigger}
            </li>
          ))}
        </ul>

        <h3 className="text-ink mb-5 text-[22px] font-semibold tracking-[-0.02em]">
          {t.vsTitle}
        </h3>
        <div className="border-border overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[640px] border-collapse text-left text-[14.5px]">
            <thead>
              <tr className="border-border border-b">
                {t.head.map((h, i) => (
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
              {t.rows.map((row) => (
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
