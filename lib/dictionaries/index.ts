import type { Locale } from "@/lib/i18n";
import { en, type Dictionary } from "@/lib/dictionaries/en";
import { fr } from "@/lib/dictionaries/fr";

export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
