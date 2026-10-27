import {
  ogAlt as alt,
  ogContentType as contentType,
  ogSize as size,
  renderOg,
} from "@/lib/og";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export { alt, contentType, size };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getDictionary(locale).privacy;
  return renderOg({ locale, eyebrow: t.eyebrow, title: t.title });
}
