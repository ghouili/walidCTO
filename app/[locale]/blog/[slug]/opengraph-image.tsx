import {
  ogAlt as alt,
  ogContentType as contentType,
  ogSize as size,
  renderOg,
} from "@/lib/og";
import { locales, type Locale } from "@/lib/i18n";
import { blogTags, getArticle, getArticles } from "@/lib/blog";

export { alt, contentType, size };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getArticles(locale).map((a) => ({ locale, slug: a.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const a = getArticle(locale, slug);
  return renderOg({
    locale,
    eyebrow: a
      ? `Blog · ${a.tags.map((t) => blogTags[t][locale]).join(" · ")}`
      : "Blog",
    title: a?.title ?? "Walid Ghouili",
  });
}
