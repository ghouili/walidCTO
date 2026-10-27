/**
 * Blog content layer. Articles are MDX files with YAML frontmatter in
 * content/blog/<locale>/<slug>.mdx (rendered with next-mdx-remote). The same
 * article in another language shares a `translationKey`, which drives
 * hreflang and the language switch since slugs are translated.
 *
 * Read at build time only (every blog route is statically generated), and by
 * scripts/generate-llms.ts. Frontmatter is validated here so a malformed
 * article fails the build instead of shipping half-rendered.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { localePath, locales, type Locale } from "@/lib/i18n";

export type ArticleMeta = {
  locale: Locale;
  slug: string;
  /** Public path, e.g. "/blog/x" or "/fr/blog/y". */
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  updated?: string;
  translationKey: string;
  tags: string[];
  relatedService: string;
  relatedCaseStudy: string;
  tldr: string[];
  wordCount: number;
  readingMinutes: number;
};

export type Article = ArticleMeta & { body: string };

/** Tag slugs and their labels. Add a tag here before using it in an article. */
export const blogTags: Record<string, Record<Locale, string>> = {
  "fractional-cto": { en: "Fractional CTO", fr: "CTO à temps partagé" },
  pricing: { en: "Pricing", fr: "Tarifs" },
  "technical-audit": { en: "Technical audit", fr: "Audit technique" },
  "due-diligence": { en: "Due diligence", fr: "Due diligence" },
  nearshore: { en: "Nearshore", fr: "Nearshore" },
  gdpr: { en: "GDPR", fr: "RGPD" },
  mvp: { en: "MVP", fr: "MVP" },
  ai: { en: "AI", fr: "IA" },
  "e-invoicing": { en: "E-invoicing", fr: "Facturation électronique" },
  startups: { en: "Startups", fr: "Startups" },
};

const ROOT = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 220;

function str(data: Record<string, unknown>, key: string, file: string) {
  const v = data[key];
  if (typeof v !== "string" || !v.trim()) {
    throw new Error(`[blog] ${file}: frontmatter "${key}" is missing`);
  }
  return v;
}

function load(locale: Locale): Article[] {
  const dir = path.join(ROOT, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
      const unknown = tags.filter((t) => !blogTags[t]);
      if (unknown.length) {
        throw new Error(`[blog] ${file}: unknown tag(s) ${unknown.join(", ")}`);
      }
      const tldr = Array.isArray(data.tldr) ? data.tldr.map(String) : [];
      if (tldr.length !== 3) {
        throw new Error(`[blog] ${file}: tldr needs exactly 3 bullets`);
      }
      const words = content.split(/\s+/).filter((w) => /\p{L}/u.test(w));
      return {
        locale,
        slug,
        path: localePath(locale, `/blog/${slug}`),
        title: str(data, "title", file),
        seoTitle: str(data, "seoTitle", file),
        description: str(data, "description", file),
        date: str(data, "date", file),
        updated: typeof data.updated === "string" ? data.updated : undefined,
        translationKey: str(data, "translationKey", file),
        tags,
        relatedService: str(data, "relatedService", file),
        relatedCaseStudy: str(data, "relatedCaseStudy", file),
        tldr,
        wordCount: words.length,
        readingMinutes: Math.max(
          1,
          Math.round(words.length / WORDS_PER_MINUTE),
        ),
        body: content,
      };
    })
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title),
    );
}

const cache = new Map<Locale, Article[]>();
function all(locale: Locale): Article[] {
  if (!cache.has(locale)) cache.set(locale, load(locale));
  return cache.get(locale)!;
}

function strip(article: Article): ArticleMeta {
  const meta: Partial<Article> = { ...article };
  delete meta.body;
  return meta as ArticleMeta;
}

export function getArticles(locale: Locale): ArticleMeta[] {
  return all(locale).map(strip);
}

export function getArticle(locale: Locale, slug: string): Article | undefined {
  return all(locale).find((a) => a.slug === slug);
}

export function getArticlesByTag(locale: Locale, tag: string): ArticleMeta[] {
  return getArticles(locale).filter((a) => a.tags.includes(tag));
}

/** Tags actually used in a locale, in blogTags order. */
export function getUsedTags(locale: Locale): string[] {
  const used = new Set(getArticles(locale).flatMap((a) => a.tags));
  return Object.keys(blogTags).filter((t) => used.has(t));
}

/** The same article in every locale it exists in. */
export function getTranslations(
  translationKey: string,
): Partial<Record<Locale, ArticleMeta>> {
  return Object.fromEntries(
    locales
      .map((l) => [
        l,
        getArticles(l).find((a) => a.translationKey === translationKey),
      ])
      .filter(([, a]) => a),
  );
}
