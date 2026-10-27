import {
  ogAlt as alt,
  ogContentType as contentType,
  ogSize as size,
  renderOg,
} from "@/lib/og";
import { locales, type Locale } from "@/lib/i18n";

export { alt, contentType, size };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const titles: Record<Locale, { eyebrow: string; title: string }> = {
  en: {
    eyebrow: "Fractional CTO · Technical audits",
    title: "Build the right thing. Or fix the thing you shipped.",
  },
  fr: {
    eyebrow: "CTO à temps partagé · Audit technique",
    title: "Construire le bon produit. Ou réparer l'existant.",
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return renderOg({ locale, ...titles[locale] });
}
