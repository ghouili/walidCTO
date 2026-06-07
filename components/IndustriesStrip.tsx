import { Container } from "@/components/ui/Container";
import { industries } from "@/lib/services";

/** "Industries I've shipped in" strip under the hero (`.logos`). */
export function IndustriesStrip() {
  return (
    <section className="relative z-[2] pt-16 pb-[100px]">
      <Container>
        <div className="text-faint mb-8 text-center text-[13px] font-medium tracking-[-0.005em]">
          Industries I&apos;ve shipped in
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
