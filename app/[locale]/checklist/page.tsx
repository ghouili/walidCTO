import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ChecklistPage } from "@/components/ChecklistPage";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDictionary(locale).meta;
  return pageMetadata({
    locale,
    path: "/checklist",
    title: t.checklistTitle,
    description: t.checklistDescription,
  });
}

export default async function Checklist({ params }: Params) {
  const { locale } = await params;
  return (
    <SiteShell locale={locale} path="/checklist">
      <ChecklistPage locale={locale} />
    </SiteShell>
  );
}
