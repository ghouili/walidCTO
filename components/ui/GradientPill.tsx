import type { ReactNode } from "react";

/**
 * The "Available for Q3 2026" hero pill — `.hero-pill` from the mockup,
 * with the gradient dot. Pass formatted content as children.
 */
export function GradientPill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-border text-dim inline-flex items-center gap-2 rounded-full border bg-white/70 py-1.5 pr-[14px] pl-2 text-[13px] font-medium tracking-[-0.01em] backdrop-blur-[8px] ${className}`.trim()}
    >
      <span
        className="from-accent to-accent-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white"
        aria-hidden="true"
      >
        ✦
      </span>
      {children}
    </div>
  );
}
