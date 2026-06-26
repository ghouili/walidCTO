import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import { credentials } from "@/lib/work";

/** About section with portrait and credentials (`#about`). */
export function About() {
  return (
    <section id="about" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          About
        </span>
        <h2 className="text-ink mb-5 max-w-[720px] text-[clamp(30px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          The senior technical hire you can&apos;t yet afford full-time.
        </h2>

        <div className="bg-section my-[60px] rounded-3xl p-20 max-[900px]:rounded-[18px] max-[900px]:px-6 max-[900px]:py-10">
          <div className="grid grid-cols-[280px_1fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-8">
            <div className="about-photo-fallback relative aspect-[1/1.2] overflow-hidden rounded-2xl max-[900px]:max-w-[200px]">
              <Image
                src={site.portrait}
                alt={site.portraitAlt}
                fill
                sizes="(max-width: 900px) 200px, 280px"
                priority={false}
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-dim mb-[18px] text-[17px] leading-[1.6] tracking-[-0.005em]">
                I&apos;m Walid Ghouili. I founded InnoviaBurst in Tunis to do
                nearshore product work for European startups, and I&apos;m the
                founder of{" "}
                <a
                  href="https://simplify-kids.tn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors"
                >
                  Simplify for Kids
                </a>
                , a story-based AI learning platform. I also teach computer
                science at IMSET (part of Honoris United Universities).
              </p>
              <p className="text-dim mb-[18px] text-[17px] leading-[1.6] tracking-[-0.005em]">
                I split my week between writing production code, reviewing other
                people&apos;s, and explaining all of it to engineering students.
                That mix is the whole pitch — I&apos;m a working engineer, not a
                slide-deck consultant.
              </p>

              <div className="border-border mt-9 grid grid-cols-2 gap-5 border-t pt-7 max-[900px]:grid-cols-1 max-[900px]:gap-4">
                {credentials.map((cred) => (
                  <div key={cred.role} className="flex flex-col gap-1">
                    <div className="text-faint font-mono text-[11px] tracking-[0.02em]">
                      {cred.period}
                    </div>
                    <div className="text-ink text-sm font-medium tracking-[-0.01em]">
                      {cred.role}
                    </div>
                    <div className="text-dim text-sm tracking-[-0.005em] [overflow-wrap:anywhere]">
                      {cred.org}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
