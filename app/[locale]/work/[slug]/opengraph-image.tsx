import {
  ogAlt as alt,
  ogContentType as contentType,
  ogSize as size,
  renderOg,
} from "@/lib/og";
import { locales, type Locale } from "@/lib/i18n";
import { getCaseStudies, getCaseStudy } from "@/lib/localized";

export { alt, contentType, size };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCaseStudies(locale).map((w) => ({ locale, slug: w.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const w = getCaseStudy(locale, slug);
  return renderOg({
    locale,
    eyebrow: w
      ? `${locale === "fr" ? "Étude de cas" : "Case study"} · ${w.client}`
      : "Work",
    title: w?.outcome ?? "Walid Ghouili",
  });
}
