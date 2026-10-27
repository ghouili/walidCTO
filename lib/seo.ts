/**
 * Page metadata builder. Next merges `openGraph` / `twitter` shallowly, so a
 * page that sets any of them must set all of them: this keeps canonical,
 * hreflang, OG locale, site name and Twitter card consistent everywhere.
 * Images come from the file-based opengraph-image routes (lib/og.tsx).
 */

import type { Metadata } from "next";
import { alternatesFor, localePath, ogLocale, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  absoluteTitle = true,
  alternatePaths,
  noindex = false,
  publishedTime,
}: {
  locale: Locale;
  /** Locale-neutral path, e.g. "/services/technical-audit". */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  /** Use `title` as-is instead of the "%s | Walid Ghouili" template. */
  absoluteTitle?: boolean;
  /** Per-locale paths when slugs differ (blog). */
  alternatePaths?: Record<Locale, string>;
  noindex?: boolean;
  publishedTime?: string;
}): Metadata {
  const url = localePath(locale, alternatePaths?.[locale] ?? path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, alternatePaths ?? path),
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === "fr" ? "en" : "fr"]],
      ...(type === "article" && publishedTime
        ? { publishedTime, authors: [site.url] }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
