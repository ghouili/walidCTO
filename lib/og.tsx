import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

/**
 * Shared Open Graph card (1200×630) for the file-based opengraph-image
 * routes. Fonts are vendored in assets/fonts (Geist, OFL) so rendering never
 * depends on the network at build time.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${site.name}, fractional CTO in Tunis`;

const tagline: Record<Locale, string> = {
  en: "Fractional CTO · Tunis → EU",
  fr: "CTO à temps partagé · Tunis → UE",
};

const font = (file: string) =>
  readFile(path.join(process.cwd(), "assets", "fonts", file));

export async function renderOg({
  locale,
  eyebrow,
  title,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
}) {
  const [regular, semibold, mono] = await Promise.all([
    font("Geist-Regular.ttf"),
    font("Geist-SemiBold.ttf"),
    font("GeistMono-Regular.ttf"),
  ]);
  const size = title.length > 70 ? 54 : title.length > 45 ? 62 : 72;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#ffffff",
        backgroundImage:
          "radial-gradient(circle at 92% 8%, rgba(91,91,214,0.18), transparent 42%), radial-gradient(circle at 8% 100%, rgba(6,182,212,0.14), transparent 45%)",
        fontFamily: "Geist",
        color: "#0a0a0a",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: 999,
            backgroundImage: "linear-gradient(135deg,#5b5bd6,#06b6d4)",
          }}
        />
        <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>
          {site.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            fontFamily: "Geist Mono",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#5b5bd6",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: size,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "Geist Mono",
          fontSize: 22,
          color: "#525252",
          borderTop: "1px solid #eaeaea",
          paddingTop: 26,
        }}
      >
        <div>{tagline[locale]}</div>
        <div>{site.url.replace(/^https?:\/\//, "")}</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
