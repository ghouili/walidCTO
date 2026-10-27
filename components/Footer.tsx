import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChecklistNudge } from "@/components/ChecklistNudge";
import { getDictionary } from "@/lib/dictionaries";
import { htmlLang, localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

const linkClass =
  "text-faint inline-block py-1 no-underline transition-colors duration-150 hover:text-ink";

/** Site footer with copyright, language switch and social links. */
export function Footer({
  locale,
  switchHref,
}: {
  locale: Locale;
  switchHref: string;
}) {
  const t = getDictionary(locale);
  const other: Locale = locale === "fr" ? "en" : "fr";

  return (
    <footer className="border-border border-t py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="text-faint text-[13px] tracking-[-0.005em]">
            © 2026 {site.name} · {site.location.city}, {t.footer.country}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] tracking-[-0.005em]">
            <a
              href={switchHref}
              hrefLang={htmlLang[other]}
              lang={htmlLang[other]}
              className={linkClass}
            >
              {t.nav.switchToFull}
            </a>
            <Link href={localePath(locale, "/privacy")} className={linkClass}>
              {t.footer.privacy}
            </Link>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub
            </a>
            <a
              href={site.company.url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {site.company.name} ↗
            </a>
          </div>
        </div>
      </Container>
      <ChecklistNudge
        labels={t.nudge}
        href={localePath(locale, "/checklist")}
      />
    </footer>
  );
}
