import {
  ogAlt as alt,
  ogContentType as contentType,
  ogSize as size,
  renderOg,
} from "@/lib/og";
import { locales, type Locale } from "@/lib/i18n";
import { getServicePage, getServicePages } from "@/lib/localized";

export { alt, contentType, size };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getServicePages(locale).map((s) => ({ locale, slug: s.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const s = getServicePage(locale, slug);
  return renderOg({
    locale,
    eyebrow: s?.eyebrow ?? "Services",
    title: s?.h1 ?? "Walid Ghouili",
  });
}
