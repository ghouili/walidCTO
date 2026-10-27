import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { blogTags, getArticles, getUsedTags } from "@/lib/blog";
import { getDictionary } from "@/lib/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale).blog;
  const meta = pageMetadata({
    locale,
    path: "/blog",
    title: t.metaTitle,
    description: t.metaDescription,
  });
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: {
        "application/rss+xml": locale === "fr" ? "/fr/feed.xml" : "/feed.xml",
      },
    },
  };
}

export default async function BlogIndex({ params }: Params) {
  const { locale } = await params;
  const d = getDictionary(locale);
  const t = d.blog;
  const articles = getArticles(locale);

  return (
    <SiteShell locale={locale} path="/blog">
      <section className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
        <Container>
          <Breadcrumb
            items={[
              { name: d.nav.home, href: localePath(locale, "/") },
              { name: t.eyebrow, href: localePath(locale, "/blog") },
            ]}
          />
          <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
            {t.eyebrow}
          </span>
          <h1 className="text-ink mb-5 max-w-[720px] text-[clamp(32px,5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            {t.title}
          </h1>
          <p className="text-dim mb-10 max-w-[600px] text-[19px] leading-[1.5] tracking-[-0.01em]">
            {t.sub}
          </p>

          <nav aria-label="Tags" className="mb-12 flex flex-wrap gap-2">
            {getUsedTags(locale).map((tag) => (
              <Link
                key={tag}
                href={localePath(locale, `/blog/tag/${tag}`)}
                className="border-border text-dim hover:border-ink hover:text-ink rounded-full border px-3.5 py-1.5 text-[13px] no-underline transition-colors"
              >
                {blogTags[tag][locale]}
              </Link>
            ))}
            <a
              href={locale === "fr" ? "/fr/feed.xml" : "/feed.xml"}
              className="text-faint hover:text-ink px-2 py-1.5 font-mono text-[12px] no-underline transition-colors"
            >
              {t.rss}
            </a>
          </nav>

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
