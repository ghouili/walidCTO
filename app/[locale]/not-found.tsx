import { headers } from "next/headers";
import { SiteShell } from "@/components/SiteShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";

/** 404 inside a locale. The locale isn't passed to not-found, so infer it. */
export default async function NotFound() {
  const h = await headers();
  // Set by middleware.ts on every page request.
  const locale: Locale = h.get("x-wg-locale") === "fr" ? "fr" : "en";
  const t = getDictionary(locale).notFound;

  return (
    <SiteShell locale={locale} path="/">
      <section className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
        <Container className="max-w-[760px]">
          <span className="text-accent mb-4 inline-block font-mono text-sm">
            404
          </span>
          <h1 className="text-ink mb-4 text-[clamp(32px,4.5vw,48px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {t.title}
          </h1>
          <p className="text-dim mb-8 text-[17px] leading-[1.55]">{t.body}</p>
          <Button variant="primary" href={localePath(locale, "/")}>
            {t.home} →
          </Button>
        </Container>
      </section>
    </SiteShell>
  );
}
