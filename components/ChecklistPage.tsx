import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/ContactForm";
import { checklists } from "@/lib/checklist";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * /checklist lead magnet: the 25 point titles are on the page (indexable),
 * the "good answer / red flag" detail is in the PDF behind the email gate.
 */
export function ChecklistPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = checklists[locale];
  let n = 0;

  return (
    <article className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
      <Container className="max-w-[1000px]">
        <Breadcrumb
          items={[
            {
              name: locale === "fr" ? "Accueil" : "Home",
              href: localePath(locale, "/"),
            },
            { name: c.title, href: localePath(locale, "/checklist") },
          ]}
        />

        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          {t.checklistPage.eyebrow}
        </span>
        <h1 className="text-ink mb-4 max-w-[22ch] text-[clamp(30px,5vw,52px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          {c.title}: {c.subtitle.charAt(0).toLowerCase() + c.subtitle.slice(1)}
        </h1>
        <p className="text-dim mb-12 max-w-[680px] text-[19px] leading-[1.55] tracking-[-0.01em] max-[900px]:text-[17px]">
          {c.intro}
        </p>

        <div className="grid grid-cols-[1fr_1.1fr] items-start gap-12 max-[900px]:grid-cols-1">
          <section>
            <h2 className="text-ink mb-6 text-[22px] font-semibold tracking-[-0.02em]">
              {t.checklistPage.insideTitle}
            </h2>
            <div className="flex flex-col gap-8">
              {c.sections.map((s) => (
                <div key={s.id}>
                  <h3 className="text-faint mb-3 font-mono text-[11px] tracking-[0.06em] uppercase">
                    {s.title}
                  </h3>
                  <ol className="flex flex-col gap-2">
                    {s.items.map((item) => {
                      n += 1;
                      return (
                        <li
                          key={item.title}
                          className="text-ink flex items-start gap-3 text-[15px] leading-[1.45] tracking-[-0.005em]"
                        >
                          <span className="text-accent w-6 shrink-0 font-mono text-[12px] leading-[1.9]">
                            {String(n).padStart(2, "0")}
                          </span>
                          {item.title}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              ))}
            </div>
          </section>

          <section className="sticky top-28 max-[900px]:static" id="get">
            <h2 className="text-ink mb-2 text-[22px] font-semibold tracking-[-0.02em]">
              {t.checklistPage.formTitle}
            </h2>
            <p className="text-dim mb-6 text-[15px] leading-[1.55]">
              {t.checklistPage.formBody}
            </p>
            <ContactForm
              locale={locale}
              source="checklist"
              variant="checklist"
              labels={t.form}
              checklistLabels={t.checklistForm}
              bookingUrl={site.bookingUrl}
              email={site.email}
              privacyHref={localePath(locale, "/privacy")}
            />
          </section>
        </div>

        <section className="border-border mt-20 border-t pt-10">
          <h2 className="text-ink mb-3 text-[24px] font-semibold tracking-[-0.03em]">
            {t.checklistPage.auditCtaTitle}
          </h2>
          <p className="text-dim mb-7 max-w-[620px] text-[16px] leading-[1.55]">
            {t.checklistPage.auditCtaBody}
          </p>
          <Button
            variant="secondary"
            href={localePath(locale, "/services/technical-audit")}
          >
            {t.checklistPage.auditCta} →
          </Button>
        </section>
      </Container>
    </article>
  );
}
