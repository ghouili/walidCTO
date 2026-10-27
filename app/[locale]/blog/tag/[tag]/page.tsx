import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { blogTags, getArticlesByTag, getUsedTags } from "@/lib/blog";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, locales, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale; tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getUsedTags(locale).map((tag) => ({ locale, tag })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, tag } = await params;
  const label = blogTags[tag]?.[locale];
  if (!label) return {};
  const t = getDictionary(locale).blog;
  return pageMetadata({
    locale,
    path: `/blog/tag/${tag}`,
    title: t.tagTitle.replace("{tag}", label),
    description: t.tagDescription.replace("{tag}", label),
    absoluteTitle: false,
    // Thin listing pages: crawlable for links, kept out of the index.
    noindex: true,
  });
}

export default async function TagPage({ params }: Params) {
  const { locale, tag } = await params;
  const label = blogTags[tag]?.[locale];
  const articles = getArticlesByTag(locale, tag);
  if (!label || articles.length === 0) notFound();
  const d = getDictionary(locale);
  const t = d.blog;
  const title = t.tagTitle.replace("{tag}", label);

  return (
    <SiteShell locale={locale} path={`/blog/tag/${tag}`}>
      <section className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { name: d.nav.home, href: localePath(locale, "/") },
              { name: t.eyebrow, href: localePath(locale, "/blog") },
              { name: label, href: localePath(locale, `/blog/tag/${tag}`) },
            ]}
          />
          <h1 className="text-ink mb-12 max-w-[720px] text-[clamp(30px,4.5vw,48px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {title}
          </h1>
          <div className="grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} t={t} />
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
