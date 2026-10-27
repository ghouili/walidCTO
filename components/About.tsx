import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { getCredentials } from "@/lib/localized";

/** About section with portrait and credentials (`#about`). */
export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).about;
  const credentials = getCredentials(locale);
  return (
    <section id="about" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          {t.eyebrow}
        </span>
        <h2 className="text-ink mb-5 max-w-[720px] text-[clamp(30px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          {t.title}
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
                {t.intro}{" "}
                {t.products.map((p, i) => (
                  <span key={p.name}>
                    {i === t.products.length - 1 && `${t.and} `}
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors"
                    >
                      {p.name}
                    </a>
                    , {p.desc}
                    {i === t.products.length - 1 ? ". " : ", "}
                  </span>
                ))}
                {t.teach}
              </p>
              <p className="text-dim mb-[18px] text-[17px] leading-[1.6] tracking-[-0.005em]">
                {t.p2}
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
