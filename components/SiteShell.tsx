import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { localePath, type Locale } from "@/lib/i18n";

/**
 * Nav + main + Footer for every regular page (landing pages use their own
 * chrome). `path` is the locale-neutral path ("/services/x"), used to build
 * the language switch link. Pass `switchHref` when the other language's
 * URL differs (blog articles with translated slugs).
 */
export function SiteShell({
  locale,
  path,
  switchHref,
  children,
}: {
  locale: Locale;
  path: string;
  switchHref?: string;
  children: ReactNode;
}) {
  const href = switchHref ?? localePath(locale === "fr" ? "en" : "fr", path);
  return (
    <>
      <Nav locale={locale} switchHref={href} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} switchHref={href} />
    </>
  );
}
