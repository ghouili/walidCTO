/**
 * Locale plumbing. English is the default and lives at the root ("/work/x"),
 * French lives under "/fr" ("/fr/work/x"). Slugs are shared across locales so
 * every page has a 1:1 alternate (blog articles are the exception, see
 * lib/blog.ts). middleware.ts rewrites unprefixed paths to the `[locale]`
 * segment internally.
 */

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Public path for a locale. `path` is root-relative ("/", "/services/x",
 * "/#contact"). English stays unprefixed, French gets "/fr".
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  if (path === "/") return "/fr";
  if (path.startsWith("/#")) return `/fr${path.slice(1)}`;
  return `/fr${path}`;
}

/** Open Graph locale codes. */
export const ogLocale: Record<Locale, string> = { en: "en_US", fr: "fr_FR" };

/** BCP 47 tags for <html lang>, hreflang and JSON-LD `inLanguage`. */
export const htmlLang: Record<Locale, string> = { en: "en", fr: "fr" };

/**
 * `alternates` block for page metadata: canonical for the current locale plus
 * hreflang links for every locale and x-default (English). Pass a per-locale
 * path map when slugs differ between locales.
 */
export function alternatesFor(
  locale: Locale,
  path: string | Record<Locale, string>,
) {
  const paths: Record<Locale, string> =
    typeof path === "string" ? { en: path, fr: path } : path;
  return {
    canonical: localePath(locale, paths[locale]),
    languages: {
      en: localePath("en", paths.en),
      fr: localePath("fr", paths.fr),
      "x-default": localePath("en", paths.en),
    },
  };
}
