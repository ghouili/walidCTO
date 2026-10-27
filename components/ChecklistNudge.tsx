"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

const STORAGE_KEY = "wg-checklist-nudge";
const DESKTOP = "(min-width: 901px)";

/**
 * Checklist offer: a sticky bottom bar on mobile (after the first screen) and
 * a small banner on desktop once 60% of the page is scrolled. No modal.
 * Dismissal is remembered in localStorage.
 */
export function ChecklistNudge({
  labels,
  href,
}: {
  labels: Dictionary["nudge"];
  href: string;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(STORAGE_KEY) !== null);
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const desktop = window.matchMedia(DESKTOP);
    let raf = 0;
    const check = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const show = desktop.matches
        ? max > 0 && window.scrollY / max >= 0.6
        : window.scrollY > window.innerHeight;
      setVisible(show);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", check);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", check);
    };
  }, [dismissed]);

  if (dismissed || pathname.endsWith("/checklist")) return null;

  const dismiss = (value: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private mode: dismiss for this page view only */
    }
    setDismissed(true);
  };

  return (
    <aside
      aria-label={labels.cta}
      aria-hidden={!visible}
      className={`border-border min-[901px]:shadow-card fixed z-40 flex items-center gap-4 border bg-white/95 backdrop-blur-[16px] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none max-[900px]:inset-x-0 max-[900px]:bottom-0 max-[900px]:border-x-0 max-[900px]:border-b-0 max-[900px]:px-4 max-[900px]:py-3 min-[901px]:right-6 min-[901px]:bottom-6 min-[901px]:max-w-[420px] min-[901px]:rounded-2xl min-[901px]:p-5 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <p className="text-ink flex-1 text-[14px] leading-[1.4] tracking-[-0.01em] max-[900px]:text-[13px]">
        <span className="max-[900px]:hidden">{labels.text} </span>
        <Link
          href={href}
          tabIndex={visible ? 0 : -1}
          onClick={() => dismiss("clicked")}
          className="text-accent font-medium whitespace-nowrap no-underline"
        >
          {labels.cta} →
        </Link>
      </p>
      <button
        type="button"
        onClick={() => dismiss("dismissed")}
        tabIndex={visible ? 0 : -1}
        aria-label={labels.dismiss}
        className="text-faint hover:text-ink -m-2 shrink-0 cursor-pointer p-2 text-xl leading-none transition-colors"
      >
        ×
      </button>
    </aside>
  );
}
