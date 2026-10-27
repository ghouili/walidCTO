import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { Container } from "@/components/ui/Container";
import { InlineLinks } from "@/components/ui/InlineLinks";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale).meta;
  return pageMetadata({
    locale,
    path: "/privacy",
    title: t.privacyTitle,
    description: t.privacyDescription,
    absoluteTitle: false,
  });
}

export default async function PrivacyPage({ params }: Params) {
  const { locale } = await params;
  const t = getDictionary(locale).privacy;

  return (
    <SiteShell locale={locale} path="/privacy">
      <section className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
        <Container className="max-w-[760px]">
          <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
            {t.eyebrow}
          </span>
          <h1 className="text-ink mb-4 text-[clamp(32px,4.5vw,48px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {t.title}
          </h1>
          <p className="text-faint mb-12 font-mono text-xs tracking-[0.02em]">
            {t.updatedLabel} {t.updated}
          </p>

          <div className="flex flex-col gap-8">
            {t.blocks.map((block) => (
              <div key={block.title}>
                <h2 className="text-ink mb-2 text-[19px] font-semibold tracking-[-0.02em]">
                  {block.title}
                </h2>
                <p className="text-dim text-[16px] leading-[1.65] tracking-[-0.005em] break-words">
                  <InlineLinks
                    text={block.body.replaceAll("{email}", site.email)}
                  />
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
