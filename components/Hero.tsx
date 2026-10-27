"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Dictionary } from "@/lib/dictionaries";

/**
 * Interactive two-path hero (faithful port of the Claude-designed mockup).
 *
 * Centerpiece is a self-selector — "I need to build something" vs.
 * "I already shipped — it's broken" — that morphs the sub-copy, proof line and
 * CTA so a visitor self-identifies and lands on the right ask. Cursor-reactive
 * gradient blobs + a magnetic CTA add life; all motion is disabled under
 * `prefers-reduced-motion` (JS short-circuits, CSS `!important` neutralizes the
 * keyframes — see the `.hero-*` block in globals.css).
 */

type Path = "build" | "audit";

export type HeroCopy = Dictionary["hero"];

/** Animated gradient text fill (used on key headline words). */
const gradText: CSSProperties = {
  backgroundImage: "linear-gradient(135deg,#5b5bd6,#3b82f6,#06b6d4,#5b5bd6)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

export function Hero({
  copy,
  checklistHref,
}: {
  copy: HeroCopy;
  checklistHref: string;
}) {
  const [path, setPath] = useState<Path>("build");
  const [displayPath, setDisplayPath] = useState<Path>("build");
  const [fading, setFading] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const blobA = useRef<HTMLDivElement>(null);
  const blobB = useRef<HTMLDivElement>(null);
  const blobC = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const reduced = useRef(false);
  const fadeT = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cursor-parallax on the gradient blobs (rAF lerp toward pointer).
  useEffect(() => {
    reduced.current =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    const hero = heroRef.current;
    if (!hero) return;

    let tx = 0,
      ty = 0,
      px = 0,
      py = 0,
      raf = 0;

    const move = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const leave = () => {
      tx = 0;
      ty = 0;
    };
    const set = (ref: React.RefObject<HTMLDivElement | null>, d: number) => {
      if (ref.current)
        ref.current.style.transform = `translate3d(${px * d}px, ${py * d}px, 0)`;
    };
    const loop = () => {
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;
      set(blobA, 42);
      set(blobB, -56);
      set(blobC, 30);
      raf = requestAnimationFrame(loop);
    };

    hero.addEventListener("mousemove", move);
    hero.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", move);
      hero.removeEventListener("mouseleave", leave);
    };
  }, []);

  useEffect(
    () => () => {
      if (fadeT.current) clearTimeout(fadeT.current);
    },
    [],
  );

  const select = (p: Path) => {
    if (p === path) return;
    if (reduced.current) {
      setPath(p);
      setDisplayPath(p);
      setFading(false);
      return;
    }
    setPath(p);
    setFading(true);
    if (fadeT.current) clearTimeout(fadeT.current);
    fadeT.current = setTimeout(() => {
      setDisplayPath(p);
      setFading(false);
    }, 170);
  };

  const ctaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced.current) return;
    const b = ctaRef.current;
    if (!b) return;
    const r = b.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    b.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35 - 2}px)`;
  };
  const ctaLeave = () => {
    const b = ctaRef.current;
    if (b) b.style.transform = "translate(0,0)";
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select("audit");
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select("build");
    }
  };

  const isBuild = path === "build";
  const c = copy[displayPath];

  // --- derived styles (ported from the mockup's renderVals) ---
  const btnBase: CSSProperties = {
    position: "relative",
    zIndex: 1,
    flex: 1,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "14px 8px",
    margin: 0,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontFamily: "var(--font-sans)",
    fontSize: "clamp(12px, 3.4vw, 13.5px)",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    lineHeight: 1.1,
    transition: "color .25s ease",
  };
  // Both states declare the *same* keys (only values change) so React never
  // removes a property mid-rerender — which, combined with a shorthand, warns
  // about styling bugs. `backgroundColor` (above) stays separate from the
  // `backgroundImage` gradient toggled here.
  const segBtnStyle = (active: boolean): CSSProperties => ({
    ...btnBase,
    fontWeight: active ? 600 : 500,
    backgroundImage: active
      ? "linear-gradient(135deg,#5b5bd6,#3b82f6,#06b6d4)"
      : "none",
    WebkitBackgroundClip: active ? "text" : "border-box",
    backgroundClip: active ? "text" : "border-box",
    WebkitTextFillColor: active ? "transparent" : "currentcolor",
    color: active ? "transparent" : "#525252",
  });

  const dot = (on: boolean): CSSProperties => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flex: "none",
    background: on ? "linear-gradient(135deg,#5b5bd6,#06b6d4)" : "transparent",
    border: on ? "none" : "1.5px solid #d4d4d4",
    transition: "all .25s ease",
  });

  const thumbStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "50%",
    zIndex: 0,
    borderRadius: "999px",
    background: "#ffffff",
    border: "1px solid #eaeaea",
    boxShadow: "0 2px 8px rgba(10,10,10,.07)",
    transform: `translateX(${isBuild ? "0%" : "100%"})`,
    transition: "transform .3s cubic-bezier(.4,0,.2,1)",
  };

  const fadeStyle: CSSProperties = {
    opacity: fading ? 0 : 1,
    transition: "opacity .16s ease",
  };

  return (
    <header
      id="top"
      ref={heroRef}
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px clamp(16px, 5vw, 24px)",
        background: "#ffffff",
        fontFamily: "var(--font-sans)",
        color: "#0a0a0a",
      }}
    >
      {/* gradient blob backdrop (parallax outer / float inner). Offsets are in
          svh, not %, so the hero growing when the web font swaps in (and the
          headline re-wraps) never moves them. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* fine grid texture */}
        <div
          style={{
            position: "absolute",
            inset: "-60px 0",
            opacity: 0.5,
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 42%, #000 0%, transparent 78%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 42%, #000 0%, transparent 78%)",
          }}
        >
          <div
            className="hero-grid-anim"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(#eaeaea 1px, transparent 1px), linear-gradient(90deg, #eaeaea 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>
        {/* breathing spotlight */}
        <div
          className="hero-spotlight"
          style={{
            position: "absolute",
            // Viewport-relative so the hero growing (e.g. after the web font
            // swaps in and the headline re-wraps) never moves it (CLS).
            top: "40svh",
            left: "50%",
            width: "760px",
            height: "520px",
            borderRadius: "50%",
            filter: "blur(60px)",
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(91,91,214,.12) 0%, rgba(6,182,212,.06) 45%, transparent 72%)",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div
          ref={blobA}
          style={{
            position: "absolute",
            top: "-8svh",
            left: "6%",
            width: "520px",
            height: "520px",
            willChange: "transform",
          }}
        >
          <div
            className="hero-flt"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              filter: "blur(64px)",
              opacity: 0.2,
              background:
                "radial-gradient(circle at 50% 50%, #5b5bd6 0%, rgba(91,91,214,0) 70%)",
              animation: "hero-float1 24s ease-in-out infinite",
            }}
          />
        </div>
        <div
          ref={blobB}
          style={{
            position: "absolute",
            top: "-4svh",
            right: "4%",
            width: "480px",
            height: "480px",
            willChange: "transform",
          }}
        >
          <div
            className="hero-flt"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              filter: "blur(64px)",
              opacity: 0.18,
              background:
                "radial-gradient(circle at 50% 50%, #06b6d4 0%, rgba(6,182,212,0) 70%)",
              animation: "hero-float2 28s ease-in-out infinite",
            }}
          />
        </div>
        <div
          ref={blobC}
          style={{
            position: "absolute",
            // = bottom: -14% of a 100svh hero, but independent of hero height.
            top: "calc(114svh - 560px)",
            left: "38%",
            width: "560px",
            height: "560px",
            willChange: "transform",
          }}
        >
          <div
            className="hero-flt"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              filter: "blur(72px)",
              opacity: 0.16,
              background:
                "radial-gradient(circle at 50% 50%, #3b82f6 0%, rgba(59,130,246,0) 70%)",
              animation: "hero-float3 22s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "880px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "28px",
        }}
      >
        {/* availability pill */}
        <div
          className="hero-fu"
          style={{
            animationDelay: "0s",
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            padding: "7px 15px 7px 13px",
            borderRadius: "999px",
            background: "#fafafa",
            border: "1px solid #eaeaea",
            fontFamily: "var(--font-mono)",
            fontSize: "12.5px",
            letterSpacing: ".01em",
            color: "#525252",
          }}
        >
          <span
            className="hero-pulseDot"
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#3b82f6,#06b6d4)",
              animation: "hero-pulseDot 2.4s ease-out infinite",
            }}
          />
          {copy.pill}
        </div>

        {/* eyebrow + headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            className="hero-fu"
            style={{
              animationDelay: ".1s",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            {copy.eyebrow}
          </div>
          <h1
            style={{
              margin: 0,
              fontWeight: 600,
              fontSize: "clamp(2rem, 8vw, 4.3rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              maxWidth: copy.h1MaxWidth,
            }}
          >
            {[copy.line1, copy.line2].map((line, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {line.map((w, wi) => {
                  const i = li === 0 ? wi : copy.line1.length + wi;
                  return (
                    <span key={wi}>
                      {wi > 0 && " "}
                      <span
                        className="hero-word"
                        style={{ animationDelay: `${0.08 + i * 0.04}s` }}
                      >
                        {"g" in w && w.g ? (
                          <span className="hero-gx" style={gradText}>
                            {w.t}
                          </span>
                        ) : (
                          w.t
                        )}
                        {"after" in w && w.after}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
        </div>

        {/* two-path self-selector */}
        <div
          className="hero-fu"
          role="tablist"
          aria-label={copy.selectorLabel}
          onKeyDown={onKey}
          style={{
            animationDelay: ".3s",
            position: "relative",
            display: "flex",
            width: "100%",
            maxWidth: "520px",
            padding: 0,
            borderRadius: "999px",
            background: "#f5f5f7",
            border: "1px solid #eaeaea",
          }}
        >
          <div style={thumbStyle} aria-hidden="true" />
          <button
            className="hero-seg-btn"
            role="tab"
            type="button"
            aria-selected={isBuild}
            onClick={() => select("build")}
            style={segBtnStyle(isBuild)}
          >
            <span style={dot(isBuild)} />
            <span>{copy.build.tab}</span>
          </button>
          <button
            className="hero-seg-btn"
            role="tab"
            type="button"
            aria-selected={!isBuild}
            onClick={() => select("audit")}
            style={segBtnStyle(!isBuild)}
          >
            <span style={dot(!isBuild)} />
            <span>{copy.audit.tab}</span>
          </button>
        </div>

        {/* morphing copy group */}
        <div className="hero-fu" style={{ animationDelay: ".34s" }}>
          <div style={fadeStyle}>
            <p
              style={{
                margin: "0 auto",
                maxWidth: "48ch",
                fontSize: "clamp(1.02rem, 1.6vw, 1.22rem)",
                lineHeight: 1.55,
                letterSpacing: "-0.01em",
                color: "#525252",
              }}
            >
              {c.sub}
            </p>
            <div
              style={{
                marginTop: "14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                fontFamily: "var(--font-mono)",
                fontSize: "12.5px",
                letterSpacing: ".01em",
                color: "#1a1a1a",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h13M13 6l6 6-6 6"
                  stroke="url(#ag)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="ag"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#5b5bd6" />
                    <stop offset=".5" stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              {c.proof}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div
          className="hero-fu"
          style={{
            animationDelay: ".42s",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            marginTop: "4px",
          }}
        >
          <a
            className="hero-cta"
            href="#contact"
            ref={ctaRef}
            onMouseMove={ctaMove}
            onMouseLeave={ctaLeave}
            style={{
              position: "relative",
              overflow: "hidden",
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "15px 26px",
              borderRadius: "999px",
              background: "#0a0a0a",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              border: "1px solid #0a0a0a",
              boxShadow: "0 1px 2px rgba(10,10,10,.12)",
              transition:
                "background .25s ease, box-shadow .25s ease, border-color .25s ease",
              willChange: "transform",
            }}
          >
            <span
              className="hero-shim"
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "40%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,.28), transparent)",
                pointerEvents: "none",
              }}
            />
            <span style={fadeStyle}>{c.cta}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            className="hero-lnk"
            href={checklistHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "15px 24px",
              borderRadius: "999px",
              background: "rgba(255,255,255,.7)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: "#1a1a1a",
              textDecoration: "none",
              fontSize: "15px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              border: "1px solid #eaeaea",
              transition: "border-color .2s ease, background .2s ease",
            }}
          >
            {copy.secondaryCta}
          </a>
        </div>

        {/* trust micro-row */}
        <div
          className="hero-fu"
          style={{
            animationDelay: ".5s",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: ".03em",
            color: "#525252",
          }}
        >
          {copy.trust.map((item, i) => (
            <span key={item} style={{ display: "contents" }}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "#d4d4d4",
                  }}
                />
              )}
              <span>{item}</span>
            </span>
          ))}
        </div>

        {/* quiet code → production motif (desktop) */}
        <div
          className="hero-motif hero-fu"
          aria-hidden="true"
          style={{
            animationDelay: ".58s",
            marginTop: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            opacity: 0.92,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 14px",
              borderRadius: "12px",
              background: "#fafafa",
              border: "1px solid #eaeaea",
              fontFamily: "var(--font-mono)",
              fontSize: "11.5px",
              color: "#525252",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#a1a1aa",
              }}
            />
            code
          </div>
          <svg
            className="hero-drawLine"
            width="84"
            height="24"
            viewBox="0 0 84 24"
            fill="none"
            style={{ overflow: "visible" }}
          >
            <path
              d="M2 12h80"
              stroke="url(#ag2)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1"
              pathLength={1}
              style={{ animation: "hero-draw 1.4s ease .7s both" }}
            />
            <path
              d="M74 7l8 5-8 5"
              stroke="url(#ag2)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient
                id="ag2"
                x1="0"
                y1="0"
                x2="84"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5b5bd6" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <div
            className="hero-gx"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 16px",
              borderRadius: "12px",
              backgroundImage:
                "linear-gradient(135deg,#5b5bd6,#3b82f6,#06b6d4,#5b5bd6)",
              color: "#ffffff",
              fontFamily: "var(--font-mono)",
              fontSize: "11.5px",
              boxShadow: "0 8px 24px -10px rgba(59,130,246,.6)",
              textTransform: "lowercase",
            }}
          >
            {isBuild ? copy.build.motif : copy.audit.motif}
          </div>
          <svg
            className="hero-drawLine"
            width="84"
            height="24"
            viewBox="0 0 84 24"
            fill="none"
            style={{ overflow: "visible" }}
          >
            <path
              d="M2 12h80"
              stroke="url(#ag3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1"
              pathLength={1}
              style={{ animation: "hero-draw 1.4s ease 1.1s both" }}
            />
            <path
              d="M74 7l8 5-8 5"
              stroke="url(#ag3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient
                id="ag3"
                x1="0"
                y1="0"
                x2="84"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 14px",
              borderRadius: "12px",
              background: "#fafafa",
              border: "1px solid #eaeaea",
              fontFamily: "var(--font-mono)",
              fontSize: "11.5px",
              color: "#525252",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#06b6d4",
              }}
            />
            production
          </div>
        </div>
      </div>
    </header>
  );
}
