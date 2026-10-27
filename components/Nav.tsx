import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { htmlLang, localePath, type Locale } from "@/lib/i18n";

const linkClass =
  "text-sm font-medium tracking-[-0.01em] text-dim no-underline transition-colors duration-150 hover:text-ink";

/** Fixed, blurred top navigation (`nav` from the mockup). */
export function Nav({
  locale,
  switchHref,
}: {
  locale: Locale;
  /** The same page in the other language. */
  switchHref: string;
}) {
  const t = getDictionary(locale).nav;
  const other: Locale = locale === "fr" ? "en" : "fr";
  const home = (hash: string) => localePath(locale, `/${hash}`);

  return (
    <nav className="border-border/60 fixed inset-x-0 top-0 z-50 border-b bg-white/[0.72] backdrop-blur-[24px] backdrop-saturate-[1.8]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-[14px]">
        <Link
          href={localePath(locale, "/")}
          className="text-ink text-base font-semibold tracking-[-0.02em] no-underline"
        >
          Walid Ghouili
        </Link>
        <div className="flex items-center gap-8 max-[900px]:gap-4">
          <Link
            href={home("#services")}
            className={`${linkClass} max-[900px]:hidden`}
          >
            {t.services}
          </Link>
          <Link
            href={home("#work")}
            className={`${linkClass} max-[900px]:hidden`}
          >
            {t.work}
          </Link>
          <Link
            href={home("#faq")}
            className={`${linkClass} max-[900px]:hidden`}
          >
            {t.faq}
          </Link>
          <Link
            href={home("#about")}
            className={`${linkClass} max-[900px]:hidden`}
          >
            {t.about}
          </Link>
          <a
            href={switchHref}
            hrefLang={htmlLang[other]}
            lang={htmlLang[other]}
            aria-label={t.switchToFull}
            className={`${linkClass} font-mono text-[12px] tracking-[0.04em]`}
          >
            {t.switchTo}
          </a>
          <Link
            href={home("#contact")}
            className="bg-ink hover:bg-accent rounded-full px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-white no-underline transition-all duration-150 hover:-translate-y-px"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </nav>
  );
}
