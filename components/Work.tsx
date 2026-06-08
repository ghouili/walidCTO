"use client";

import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NDABadge } from "@/components/ui/NDABadge";
import { work } from "@/lib/work";

/** Selected work list with NDA-blurred client names (`#work`). */
export function Work() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const openModal = (e: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <section id="work" className="py-[120px] max-[900px]:py-20">
      <Container>
        <span className="text-accent mb-4 inline-block text-sm font-medium tracking-[-0.01em]">
          Selected work
        </span>
        <h2 className="text-ink mb-5 max-w-[720px] text-[clamp(36px,4.5vw,56px)] leading-[1.05] font-semibold tracking-[-0.035em]">
          A few things I&apos;ve shipped.
        </h2>
        <p className="text-dim mb-16 max-w-[600px] text-[19px] leading-[1.5] tracking-[-0.01em]">
          Not everything — just the ones I can talk about. Full case studies on
          request under NDA.
        </p>

        <div className="border-border border-t">
          {work.map((entry, i) => (
            <button
              type="button"
              key={`${entry.client}-${i}`}
              onClick={openModal}
              aria-haspopup="dialog"
              className="work-row group border-border grid w-full cursor-pointer grid-cols-[80px_280px_1fr_180px_24px] items-center gap-8 border-b py-7 text-left transition-all duration-200 max-[900px]:grid-cols-1 max-[900px]:gap-2 max-[900px]:py-5"
            >
              <div className="text-faint font-mono text-xs font-medium tracking-[0.02em]">
                {entry.year}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`text-ink text-lg font-semibold tracking-[-0.02em] ${
                    entry.nda
                      ? "pointer-events-none blur-[5px] select-none"
                      : ""
                  }`}
                >
                  {entry.client}
                </span>
                {entry.nda && <NDABadge />}
              </div>

              <div className="text-dim text-sm leading-[1.5] tracking-[-0.005em]">
                {entry.desc}
              </div>

              <div className="bg-section text-dim w-fit rounded-full px-3 py-[5px] text-xs font-medium tracking-[-0.005em]">
                {entry.tag}
              </div>

              <div
                className="text-faint group-hover:text-accent text-[18px] transition-all duration-200 group-hover:translate-x-1 max-[900px]:hidden"
                aria-hidden="true"
              >
                →
              </div>
            </button>
          ))}
        </div>
      </Container>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div
            className="bg-ink/40 absolute inset-0 backdrop-blur-sm"
            aria-hidden="true"
            onClick={close}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-modal-title"
            aria-describedby="work-modal-desc"
            className="border-border shadow-card relative w-full max-w-[420px] animate-[fade-up_0.25s_ease-out_both] rounded-3xl border bg-white p-10 text-center"
          >
            <span
              className="from-accent to-accent-2 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-lg text-white"
              aria-hidden="true"
            >
              ✦
            </span>
            <h3
              id="work-modal-title"
              className="text-ink mb-3 text-[26px] font-semibold tracking-[-0.03em]"
            >
              Coming soon
            </h3>
            <p
              id="work-modal-desc"
              className="text-dim mb-8 text-[15px] leading-[1.55] tracking-[-0.005em]"
            >
              Detailed case studies are on the way. In the meantime, full
              write-ups are available on request under NDA.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primary" href="#contact" onClick={close}>
                Get in touch →
              </Button>
              <button
                type="button"
                ref={closeRef}
                onClick={close}
                className="border-border text-ink hover:border-ink inline-flex cursor-pointer items-center gap-1.5 rounded-full border bg-white/70 px-[22px] py-3 text-sm font-medium tracking-[-0.01em] transition-all duration-150 hover:bg-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
