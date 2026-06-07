import type { ReactNode } from "react";

/** Centered 1200px max-width content wrapper (`.container` from the mockup). */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
