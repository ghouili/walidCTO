import {
  ogAlt as alt,
  ogContentType as contentType,
  ogSize as size,
  renderOg,
} from "@/lib/og";
import { locales, type Locale } from "@/lib/i18n";
import { checklists } from "@/lib/checklist";

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
  const c = checklists[locale];
  return renderOg({ locale, eyebrow: c.title, title: c.subtitle });
}
