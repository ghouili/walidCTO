import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Element styles for article bodies (MDX). Matches the type scale of the
 * service and case-study pages. Internal links go through next/link,
 * external ones open in a new tab.
 */

function A({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const cls =
    "text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      {...rest}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  a: A,
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-ink mt-14 mb-4 scroll-mt-28 text-[26px] leading-[1.2] font-semibold tracking-[-0.025em] max-[900px]:text-[22px]"
      {...p}
    />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="text-ink mt-9 mb-3 text-[19px] leading-[1.3] font-semibold tracking-[-0.02em]"
      {...p}
    />
  ),
  p: (p: ComponentPropsWithoutRef<"p">) => (
    <p
      className="text-dim mb-5 text-[17px] leading-[1.7] tracking-[-0.005em]"
      {...p}
    />
  ),
  ul: ({ className = "", ...p }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      // Task lists ("- [ ]") get tick boxes instead of bullets.
      className={`text-dim marker:text-faint mb-6 flex list-disc flex-col gap-2 pl-6 text-[17px] leading-[1.6] [&:has(>li>[data-task-box])]:list-none [&:has(>li>[data-task-box])]:pl-1 ${className}`}
      {...p}
    />
  ),
  ol: (p: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="text-dim marker:text-accent mb-6 flex list-decimal flex-col gap-2 pl-6 text-[17px] leading-[1.6] marker:font-mono marker:text-[14px]"
      {...p}
    />
  ),
  li: (p: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...p} />,
  // GFM task-list boxes ("- [ ]") are print-style tick boxes, not form
  // controls: draw them, and keep them out of the accessibility tree.
  input: (p: ComponentPropsWithoutRef<"input">) =>
    p.type === "checkbox" ? (
      <span
        aria-hidden="true"
        data-task-box=""
        className="border-border-strong mr-2.5 inline-block h-3.5 w-3.5 translate-y-0.5 rounded-[4px] border bg-white"
      />
    ) : (
      <input {...p} />
    ),
  strong: (p: ComponentPropsWithoutRef<"strong">) => (
    <strong className="text-ink font-semibold" {...p} />
  ),
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-accent text-ink [&>p]:text-ink my-8 border-l-2 pl-5"
      {...p}
    />
  ),
  code: (p: ComponentPropsWithoutRef<"code">) => (
    <code
      className="bg-section text-ink rounded-md px-1.5 py-0.5 font-mono text-[0.88em]"
      {...p}
    />
  ),
  hr: () => <hr className="border-border my-12" />,
  table: (p: ComponentPropsWithoutRef<"table">) => (
    <div className="border-border my-8 overflow-x-auto rounded-2xl border">
      <table
        className="w-full min-w-[560px] border-collapse text-left text-[14.5px]"
        {...p}
      />
    </div>
  ),
  th: (p: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-border text-ink border-b p-3.5 align-bottom font-semibold tracking-[-0.01em]"
      {...p}
    />
  ),
  td: (p: ComponentPropsWithoutRef<"td">) => (
    <td
      className="border-border text-dim border-b p-3.5 align-top leading-[1.45] [tr:last-child_&]:border-0"
      {...p}
    />
  ),
};
