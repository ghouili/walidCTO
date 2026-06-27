import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { name: string; href: string };

/**
 * Breadcrumb trail + matching `BreadcrumbList` JSON-LD. The last item is the
 * current page (not linked). `href` values are site-root-relative.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="text-faint flex flex-wrap items-center gap-2 font-mono text-[12px] tracking-[0.02em]">
          {items.map((c, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-dim" aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="hover:text-ink transition-colors duration-150"
                  >
                    {c.name}
                  </Link>
                )}
                {!isLast && <span aria-hidden="true">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
