import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { formatEuros, prices, type PriceKind } from "@/lib/pricing";

/**
 * Published price box (`#pricing`) for the audit or the fractional-CTO
 * retainer. Falls back to a "confirmed in writing" line while the price in
 * lib/pricing.ts is still a placeholder.
 */
export function PriceAnchor({
  kind,
  locale,
  labels,
  ctaHref,
}: {
  kind: PriceKind;
  locale: Locale;
  labels: Dictionary["pricing"];
  ctaHref: string;
}) {
  const price = prices[kind];
  const includes = kind === "audit" ? labels.auditIncludes : labels.ctoIncludes;

  return (
    <section
      id="pricing"
      className="border-border my-12 scroll-mt-28 rounded-3xl border p-9 max-[900px]:rounded-[18px] max-[900px]:p-6"
    >
      <span className="text-accent mb-3 inline-block text-sm font-medium tracking-[-0.01em]">
        {labels.eyebrow}
      </span>
      {price.amount !== null ? (
        <p className="text-ink mb-6 flex flex-wrap items-baseline gap-x-2">
          {price.from && (
            <span className="text-dim text-[15px]">{labels.from}</span>
          )}
          <span className="text-[clamp(36px,5vw,48px)] leading-none font-semibold tracking-[-0.04em]">
            {formatEuros(price.amount, locale)}
          </span>
          <span className="text-dim text-[15px]">
            {price.perMonth ? labels.perMonth : labels.fixed} · {labels.exVat}
          </span>
        </p>
      ) : (
        <p className="text-ink mb-6 text-[22px] leading-[1.3] font-semibold tracking-[-0.02em]">
          {labels.fallback}
        </p>
      )}
      <ul className="mb-7 flex flex-col gap-2.5">
        {includes.map((item) => (
          <li
            key={item}
            className="text-dim flex items-start gap-3 text-[15px] leading-[1.5] tracking-[-0.005em]"
          >
            <span
              className="text-accent mt-0.5 shrink-0 font-semibold"
              aria-hidden="true"
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
      <Button variant="primary" href={ctaHref}>
        {labels.cta} →
      </Button>
    </section>
  );
}
