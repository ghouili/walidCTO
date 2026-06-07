import Link from "next/link";

const linkClass =
  "text-sm font-medium tracking-[-0.01em] text-dim no-underline transition-colors duration-150 hover:text-ink";

/** Fixed, blurred top navigation (`nav` from the mockup). */
export function Nav() {
  return (
    <nav className="border-border/60 fixed inset-x-0 top-0 z-50 border-b bg-white/[0.72] backdrop-blur-[24px] backdrop-saturate-[1.8]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-[14px]">
        <Link
          href="#top"
          className="text-ink text-base font-semibold tracking-[-0.02em] no-underline"
        >
          Walid Ghouili
        </Link>
        <div className="flex items-center gap-8 max-[900px]:gap-4">
          <Link href="#services" className={`${linkClass} max-[900px]:hidden`}>
            Services
          </Link>
          <Link href="#work" className={`${linkClass} max-[900px]:hidden`}>
            Work
          </Link>
          <Link href="#about" className={`${linkClass} max-[900px]:hidden`}>
            About
          </Link>
          <Link
            href="#contact"
            className="bg-ink hover:bg-accent rounded-full px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-white no-underline transition-all duration-150 hover:-translate-y-px"
          >
            Book a call →
          </Link>
        </div>
      </div>
    </nav>
  );
}
