import { Fragment } from "react";

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * Renders a plain string containing `[text](url)` markdown links, for
 * dictionary copy that needs an inline link or two. External links open in a
 * new tab.
 */
export function InlineLinks({
  text,
  className = "text-ink hover:text-accent underline decoration-1 underline-offset-2 transition-colors",
}: {
  text: string;
  className?: string;
}) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK_RE)) {
    const [whole, label, href] = m;
    parts.push(text.slice(last, m.index));
    const external = href.startsWith("http");
    parts.push(
      <a
        key={m.index}
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </a>,
    );
    last = (m.index ?? 0) + whole.length;
  }
  parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
