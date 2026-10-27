/**
 * Locale-aware accessors for the content data files. English data lives in
 * lib/<name>.ts, French in lib/<name>.fr.ts with the same shape and slugs.
 */

import type { Locale } from "@/lib/i18n";
import { faqs, processSteps } from "@/lib/content";
import { faqsFr, processStepsFr } from "@/lib/content.fr";
import { industries, services, stats } from "@/lib/services";
import { industriesFr, servicesFr, statsFr } from "@/lib/services.fr";
import { servicePages } from "@/lib/service-pages";
import { servicePagesFr } from "@/lib/service-pages.fr";
import { credentials, work, type WorkEntry } from "@/lib/work";
import { credentialsFr, workFr } from "@/lib/work.fr";

const pick = <T>(locale: Locale, en: T, fr: T): T =>
  locale === "fr" ? fr : en;

export const getServices = (l: Locale) => pick(l, services, servicesFr);
export const getStats = (l: Locale) => pick(l, stats, statsFr);
export const getIndustries = (l: Locale) => pick(l, industries, industriesFr);
export const getProcessSteps = (l: Locale) =>
  pick(l, processSteps, processStepsFr);
export const getFaqs = (l: Locale) => pick(l, faqs, faqsFr);
export const getServicePages = (l: Locale) =>
  pick(l, servicePages, servicePagesFr);
export const getWork = (l: Locale) => pick(l, work, workFr);
export const getCredentials = (l: Locale) =>
  pick(l, credentials, credentialsFr);

export function getServicePage(l: Locale, slug: string) {
  return getServicePages(l).find((s) => s.slug === slug);
}

/** Non-NDA entries with a /work/[slug] case-study page. */
export function getCaseStudies(l: Locale): WorkEntry[] {
  return getWork(l).filter((w) => Boolean(w.caseStudy));
}

export function getCaseStudy(l: Locale, slug: string) {
  return getCaseStudies(l).find((w) => w.slug === slug);
}
