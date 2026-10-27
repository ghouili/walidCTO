import type { ReactNode } from "react";

/**
 * Centered 1200px max-width content wrapper (`.container` from the mockup).
 * A `max-w-*` in `className` replaces the default width instead of competing
 * with it (Tailwind emits both rules, and the 1200px one won).
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const width = /(^|\s)max-w-/.test(className) ? "" : "max-w-[1200px]";
  return (
    <div className={`mx-auto w-full ${width} px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
