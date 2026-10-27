import Link from "next/link";
import type { ArticleMeta } from "@/lib/blog";
import { blogTags } from "@/lib/blog";
import type { Dictionary } from "@/lib/dictionaries";

/** Article teaser for the blog index and tag pages. */
export function ArticleCard({
  article,
  t,
}: {
  article: ArticleMeta;
  t: Dictionary["blog"];
}) {
  return (
    <Link
      href={article.path}
      className="group bg-section hover:border-border hover:shadow-card flex flex-col rounded-[20px] border border-transparent p-8 no-underline transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-white max-[900px]:p-6"
    >
      <div className="text-faint mb-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.02em]">
        {article.tags.map((tag) => (
          <span key={tag}>{blogTags[tag][article.locale]}</span>
        ))}
        <span>
          · {t.minRead.replace("{n}", String(article.readingMinutes))}
        </span>
      </div>
      <h2 className="text-ink mb-3 text-[21px] leading-[1.25] font-semibold tracking-[-0.02em]">
        {article.title}
      </h2>
      <p className="text-dim mb-6 text-[14.5px] leading-[1.55] tracking-[-0.005em]">
        {article.description}
      </p>
      <span className="text-accent mt-auto inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[-0.01em]">
        {t.readMore}
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
