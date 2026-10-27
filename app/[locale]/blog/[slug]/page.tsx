import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { SiteShell } from "@/components/SiteShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { mdxComponents } from "@/components/blog/mdxComponents";
import { blogTags, getArticle, getArticles, getTranslations } from "@/lib/blog";
import { getDictionary } from "@/lib/dictionaries";
import { htmlLang, localePath, locales, type Locale } from "@/lib/i18n";
import { ids } from "@/lib/jsonld";
import { getCaseStudy } from "@/lib/localized";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getArticles(locale).map((a) => ({ locale, slug: a.slug })),
  );
}

/** Per-locale paths of this article ("/blog/<slug>", unprefixed). */
function alternatePaths(translationKey: string, locale: Locale, slug: string) {
  const tr = getTranslations(translationKey);
  const path = (l: Locale) =>
    tr[l] ? `/blog/${tr[l]!.slug}` : l === locale ? `/blog/${slug}` : "/blog";
  return { en: path("en"), fr: path("fr") };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = getArticle(locale, slug);
  if (!a) return {};
  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    alternatePaths: alternatePaths(a.translationKey, locale, slug),
    title: a.seoTitle,
    description: a.description,
    type: "article",
    publishedTime: a.date,
  });
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00Z`));
}

export default async function ArticlePage({ params }: Params) {
  const { locale, slug } = await params;
  const a = getArticle(locale, slug);
  if (!a) notFound();
  const d = getDictionary(locale);
  const t = d.blog;
  const other: Locale = locale === "fr" ? "en" : "fr";
  const alt = alternatePaths(a.translationKey, locale, slug);
  const url = `${site.url}${a.path}`;
  const caseStudy = getCaseStudy(locale, a.relatedCaseStudy);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: a.title,
    description: a.description,
    abstract: a.tldr.join(" "),
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    inLanguage: htmlLang[locale],
    url,
    mainEntityOfPage: url,
    image: `${url.replace(/\/$/, "")}/opengraph-image`,
    keywords: a.tags.map((tag) => blogTags[tag][locale]).join(", "),
    wordCount: a.wordCount,
    author: { "@id": ids.person },
    publisher: { "@id": ids.person },
    isPartOf: { "@id": ids.website },
    ...(caseStudy
      ? {
          mentions: {
            "@id": `${site.url}${localePath(locale, `/work/${caseStudy.slug}`)}#work`,
          },
        }
      : {}),
  };

  return (
    <SiteShell
      locale={locale}
      path={`/blog/${slug}`}
      switchHref={localePath(other, alt[other])}
    >
      <article className="pt-40 pb-[120px] max-[900px]:pt-32 max-[900px]:pb-20">
        <Container className="max-w-[760px]">
          <Breadcrumb
            items={[
              { name: d.nav.home, href: localePath(locale, "/") },
              { name: t.eyebrow, href: localePath(locale, "/blog") },
              { name: a.title, href: a.path },
            ]}
          />

          <div className="text-faint mb-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] tracking-[0.02em]">
            {a.tags.map((tag) => (
              <Link
                key={tag}
                href={localePath(locale, `/blog/tag/${tag}`)}
                className="text-accent no-underline"
              >
                {blogTags[tag][locale]}
              </Link>
            ))}
          </div>
          <h1 className="text-ink mb-5 text-[clamp(30px,5vw,48px)] leading-[1.08] font-semibold tracking-[-0.035em]">
            {a.title}
          </h1>
          <p className="text-faint mb-10 font-mono text-[12px] tracking-[0.02em]">
            {t.published}{" "}
            <time dateTime={a.date}>{formatDate(a.date, locale)}</time>
            {a.updated && (
              <>
                {" "}
                · {t.updated}{" "}
                <time dateTime={a.updated}>
                  {formatDate(a.updated, locale)}
                </time>
              </>
            )}{" "}
            · {t.minRead.replace("{n}", String(a.readingMinutes))}
          </p>

          {/* TL;DR first: the three sentences answer engines quote. */}
          <aside
            aria-label={t.tldr}
            className="bg-section mb-12 rounded-3xl p-8 max-[900px]:rounded-[18px] max-[900px]:p-6"
          >
            <h2 className="text-accent mb-4 font-mono text-[12px] font-medium tracking-[0.08em] uppercase">
              {t.tldr}
            </h2>
            <ul className="flex flex-col gap-3">
              {a.tldr.map((item) => (
                <li
                  key={item}
                  className="text-ink flex items-start gap-3 text-[16px] leading-[1.5] tracking-[-0.005em]"
                >
                  <span
                    className="text-accent mt-0.5 shrink-0 font-semibold"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <MDXRemote
              source={a.body}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {/* Author card */}
          <section className="border-border mt-16 flex items-start gap-5 border-t pt-10">
            <div className="about-photo-fallback relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image
                src={site.portrait}
                alt={site.portraitAlt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-ink text-[16px] font-semibold tracking-[-0.01em]">
                {site.name}
              </p>
              <p className="text-faint mb-2 font-mono text-[12px]">
                {t.authorRole}
              </p>
              <p className="text-dim text-[15px] leading-[1.55]">
                {t.authorBio}
              </p>
            </div>
          </section>

          {/* Related case study */}
          {caseStudy && (
            <section className="mt-12">
              <h2 className="text-faint mb-3 font-mono text-[12px] tracking-[0.06em] uppercase">
                {t.relatedCaseStudy}
              </h2>
              <Link
                href={localePath(locale, `/work/${caseStudy.slug}`)}
                className="group bg-section hover:border-border flex flex-col rounded-[18px] border border-transparent p-6 no-underline transition-all duration-200 hover:bg-white"
              >
                <span className="text-faint mb-2 font-mono text-[11px] tracking-[0.02em]">
                  {caseStudy.sector}
                </span>
                <span className="text-ink text-[17px] leading-[1.35] font-semibold tracking-[-0.02em]">
                  {caseStudy.client}: {caseStudy.outcome}
                </span>
                <span className="text-accent mt-3 text-[13px] font-medium">
                  {t.readCaseStudy}
                </span>
              </Link>
            </section>
          )}

          {/* Book a call */}
          <section className="border-border mt-12 border-t pt-10">
            <h2 className="text-ink mb-3 text-[24px] font-semibold tracking-[-0.03em]">
              {t.bookTitle}
            </h2>
            <p className="text-dim mb-7 text-[16px] leading-[1.55]">
              {t.bookBody}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" href={site.bookingUrl}>
                {t.bookCta} →
              </Button>
              <Button
                variant="secondary"
                href={localePath(locale, "/#contact")}
              >
                {t.contactCta}
              </Button>
            </div>
          </section>
        </Container>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </SiteShell>
  );
}
