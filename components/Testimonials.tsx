import { Container } from "@/components/ui/Container";
import { visibleTestimonials } from "@/lib/testimonials";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * Client quotes (`#testimonials`). Renders nothing until at least one entry in
 * lib/testimonials.ts has every placeholder replaced.
 */
export function Testimonials({
  labels,
}: {
  labels: Dictionary["testimonials"];
}) {
  if (visibleTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          {labels.eyebrow}
        </span>
        <h2 className="text-ink mb-16 max-w-[720px] text-[clamp(30px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          {labels.title}
        </h2>

        <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
          {visibleTestimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-section flex flex-col rounded-[20px] p-8 max-[900px]:p-6"
            >
              <blockquote className="text-ink mb-6 text-[17px] leading-[1.5] tracking-[-0.01em]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex flex-col gap-0.5">
                <a
                  href={t.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-accent text-[14px] font-semibold tracking-[-0.01em] no-underline transition-colors"
                >
                  {t.name}
                </a>
                <span className="text-dim text-[13.5px]">{t.roleCompany}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
