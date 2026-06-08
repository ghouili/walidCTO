import { Container } from "@/components/ui/Container";
import { faqs } from "@/lib/content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** Frequently asked questions with FAQPage JSON-LD (`#faq`). */
export function FAQ() {
  return (
    <section id="faq" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          FAQ
        </span>
        <h2 className="text-ink mb-12 max-w-[720px] text-[clamp(36px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          Questions you&apos;re probably asking.
        </h2>

        <div className="border-border max-w-[820px] border-t">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-border border-b py-5">
              <summary className="text-ink flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span
                  className="text-faint text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="text-dim mt-3 max-w-[700px] text-[15px] leading-[1.6] tracking-[-0.005em]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
