import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { localePath, locales } from "@/lib/i18n";
import { getCaseStudies, getServicePages } from "@/lib/localized";
import { getArticles, getTranslations } from "@/lib/blog";

type Entry = MetadataRoute.Sitemap[number];

/**
 * One entry per page per locale, each listing every language version
 * (hreflang). Landing pages (/lp/*) are Ads-only and deliberately absent.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const page = (
    path: string,
    changeFrequency: Entry["changeFrequency"],
    priority: number,
  ): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(
            locales.map((l) => [l, `${site.url}${localePath(l, path)}`]),
          ),
          "x-default": `${site.url}${localePath("en", path)}`,
        },
      },
    }));

  return [
    ...page("/", "monthly", 1),
    ...getServicePages("en").flatMap((s) =>
      page(`/services/${s.slug}`, "monthly", 0.8),
    ),
    ...page("/checklist", "monthly", 0.7),
    ...getCaseStudies("en").flatMap((w) =>
      page(`/work/${w.slug}`, "yearly", 0.6),
    ),
    ...page("/faq", "monthly", 0.7),
    ...page("/blog", "weekly", 0.7),
    ...locales.flatMap((locale) =>
      getArticles(locale).map((a) => {
        const tr = getTranslations(a.translationKey);
        return {
          url: `${site.url}${a.path}`,
          lastModified: new Date(`${a.updated ?? a.date}T12:00:00Z`),
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: {
            languages: {
              ...Object.fromEntries(
                locales
                  .filter((l) => tr[l])
                  .map((l) => [l, `${site.url}${tr[l]!.path}`]),
              ),
              ...(tr.en ? { "x-default": `${site.url}${tr.en.path}` } : {}),
            },
          },
        };
      }),
    ),
    ...page("/privacy", "yearly", 0.3),
  ];
}
