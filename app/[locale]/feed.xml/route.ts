import { getArticles } from "@/lib/blog";
import { getDictionary } from "@/lib/dictionaries";
import { htmlLang, localePath, locales, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/** RSS 2.0 feed of the blog: /feed.xml (English) and /fr/feed.xml. */

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const locale: Locale = (await params).locale === "fr" ? "fr" : "en";
  const t = getDictionary(locale).blog;
  const self = `${site.url}${locale === "fr" ? "/fr" : ""}/feed.xml`;
  const items = getArticles(locale)
    .map((a) => {
      const url = `${site.url}${a.path}`;
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.date}T08:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(a.description)}</description>
${a.tags.map((tag) => `      <category>${esc(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${site.name} · ${t.eyebrow}`)}</title>
    <link>${site.url}${localePath(locale, "/blog")}</link>
    <description>${esc(t.metaDescription)}</description>
    <language>${htmlLang[locale]}</language>
    <atom:link href="${self}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
