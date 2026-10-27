import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getIndustries } from "@/lib/localized";

/** "Industries I've shipped in" strip under the hero (`.logos`). */
export function IndustriesStrip({ locale }: { locale: Locale }) {
  const industries = getIndustries(locale);
  return (
    <section className="relative z-[2] pt-16 pb-[100px]">
      <Container>
        <div className="text-faint mb-8 text-center text-[13px] font-medium tracking-[-0.005em]">
          {getDictionary(locale).industries.title}
        </div>
        <div className="mx-auto grid max-w-[900px] grid-cols-5 items-center gap-8 max-[900px]:grid-cols-2 max-[900px]:gap-6">
          {industries.map((industry) => (
            <div
              key={industry}
              className="text-dim text-center text-[17px] font-semibold tracking-[-0.02em] opacity-60 transition-opacity duration-200 hover:opacity-100"
            >
              {industry}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
