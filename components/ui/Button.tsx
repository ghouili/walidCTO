import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-transparent px-[22px] py-3 text-sm font-medium tracking-[-0.01em] no-underline transition-all duration-150 ease-out";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:-translate-y-px hover:bg-accent hover:shadow-btn",
  secondary:
    "bg-white/70 text-ink border-border backdrop-blur-[8px] hover:border-ink hover:bg-white",
};

type ButtonProps = {
  variant?: Variant;
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

/**
 * Pill button matching `.btn-primary` / `.btn-secondary` from the mockup.
 * Renders as a Next.js Link for internal anchors and a plain <a> for
 * external / mailto links (auto-detected).
 */
export function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    const externalRest = rest as ComponentPropsWithoutRef<"a">;
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={classes}
        {...externalRest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
