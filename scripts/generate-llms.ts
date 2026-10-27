/**
 * Generates public/llms.txt (short index, llmstxt.org format) and
 * public/llms-full.txt (the full text answer engines can quote) from the
 * lib/* content files. Runs in `prebuild` and `predev`; outputs are
 * gitignored. Also warns about launch placeholders still left in the code.
 */

import { writeFileSync } from "node:fs";
import path from "node:path";
import { checklists } from "@/lib/checklist";
import { localePath } from "@/lib/i18n";
import {
  getCaseStudies,
  getFaqs,
  getServicePages,
  getServices,
} from "@/lib/localized";
import { formatEuros, prices } from "@/lib/pricing";
import { site } from "@/lib/site";
import { testimonials, visibleTestimonials } from "@/lib/testimonials";

const abs = (p: string) => `${site.url}${p === "/" ? "" : p}`;

const priceLine = (kind: "audit" | "cto") => {
  const p = prices[kind];
  if (p.amount === null)
    return "fixed price, confirmed in writing after the intro call";
  const amount = formatEuros(p.amount, "en");
  return p.perMonth
    ? `from ${amount} per month, excl. VAT`
    : `${amount} fixed fee, excl. VAT`;
};

const servicePrice: Record<string, string> = {
  "technical-audit": priceLine("audit"),
  "fractional-cto": priceLine("cto"),
  "mvp-development": "fixed scope and fixed price, quoted per project",
  workshops: "quoted per format and group size",
};

const firstSentence = (text: string) =>
  text.match(/^.*?[.?!](?=\s|$)/)?.[0] ?? text;

const summary = `${site.name} is a fractional CTO and technical-audit consultant based in Tunis, Tunisia (UTC+1 all year: same time as Paris in winter, one hour behind in summer). He serves startups in France, Germany, the Netherlands, Spain and Tunisia with fractional-CTO retainers, two-week fixed-price technical audits, MVP builds in about four weeks, and engineering workshops. He works in French, English and Arabic, under NDA, and clients own all code, infrastructure and documentation from day one. Founder & CTO of ${site.company.name}. Teaches computer science at IMSET (Honoris United Universities).`;

function short(): string {
  const services = getServicePages("en");
  const cases = getCaseStudies("en");
  const lines = [
    `# ${site.name}: Fractional CTO, Technical Audits & MVP Builds`,
    "",
    `> ${summary}`,
    "",
    "## Services",
    ...services.map(
      (s) =>
        `- [${s.serviceType}](${abs(`/services/${s.slug}`)}): ${firstSentence(s.lede)} Price: ${servicePrice[s.slug]}. French: ${abs(localePath("fr", `/services/${s.slug}`))}`,
    ),
    "",
    "## Facts",
    "- Based in: Tunis, Tunisia. Serves: France, Germany, Netherlands, Spain, Tunisia (remote, EU working hours).",
    "- Languages: French, English, Arabic.",
    "- Stack: Next.js, React, Node.js / NestJS, Django / FastAPI, PostgreSQL, MongoDB, Flutter, React Native.",
    "- 20+ products shipped to production. Replies to enquiries within 48 hours.",
    "- GDPR-aware by default, EU-resident hosting available.",
    "",
    "## Case studies",
    ...cases.map(
      (w) =>
        `- [${w.client}](${abs(`/work/${w.slug}`)}): ${w.sector}. ${w.outcome}`,
    ),
    "",
    "## Resources",
    `- [Technical due diligence checklist](${abs("/checklist")}): the 25 things investors check before a seed round (free PDF).`,
    "",
    "## Contact",
    `- [Contact form](${abs("/#contact")})`,
    `- [Book a 30-min call](${site.bookingUrl})`,
    `- Email: ${site.email}`,
    `- [LinkedIn](${site.social.linkedin}) · [GitHub](${site.social.github})`,
    "",
    "## Optional",
    `- [Full text for LLMs](${abs("/llms-full.txt")})`,
    `- [Version française](${abs("/fr")})`,
    "",
  ];
  return lines.join("\n");
}

function full(): string {
  const out: string[] = [
    `# ${site.name}: full site content`,
    "",
    `> ${summary}`,
    "",
    `Source: ${site.url} (English) and ${abs("/fr")} (French). Generated from the site's content files at build time.`,
    "",
    "## Engagements at a glance",
    ...getServices("en").map((s) => `- ${s.title} ${s.desc} (${s.detail})`),
    "",
  ];

  for (const s of getServicePages("en")) {
    out.push(
      `## ${s.h1}`,
      "",
      `URL: ${abs(`/services/${s.slug}`)}`,
      `Price: ${servicePrice[s.slug]}`,
      "",
      s.lede,
      "",
    );
    for (const sec of s.sections)
      out.push(`### ${sec.heading}`, "", sec.body, "");
    out.push("### What you get", "", ...s.whatYouGet.map((x) => `- ${x}`), "");
    for (const f of s.faqs) out.push(`### ${f.q}`, "", f.a, "");
  }

  out.push("## Case studies", "");
  for (const w of getCaseStudies("en")) {
    const c = w.caseStudy!;
    out.push(
      `### ${w.client}: ${w.outcome}`,
      "",
      `URL: ${abs(`/work/${w.slug}`)}${w.url ? ` · Live: ${w.url}` : ""}`,
      `Sector: ${w.sector}`,
      "",
      c.intro,
      "",
      `Challenge: ${c.challenge}`,
      "",
      "Approach:",
      ...c.approach.map((x) => `- ${x}`),
      "",
      "Built:",
      ...c.built.map((x) => `- ${x}`),
      "",
      "Outcome:",
      ...c.outcome.map((x) => `- ${x}`),
      "",
      `Stack: ${c.stack.join(", ")}`,
      "",
    );
  }

  out.push("## Frequently asked questions", "");
  for (const f of getFaqs("en")) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");

  const c = checklists.en;
  out.push(
    `## ${c.title}: ${c.subtitle}`,
    "",
    `URL: ${abs("/checklist")}`,
    "",
    c.intro,
    "",
  );
  let n = 0;
  for (const s of c.sections) {
    out.push(`### ${s.title}`, "");
    for (const i of s.items) {
      n += 1;
      out.push(
        `${n}. ${i.title}. ${c.checkLabel}: ${i.check} ${c.redFlagLabel}: ${i.redFlag}`,
      );
    }
    out.push("");
  }
  out.push(c.outro, "");

  out.push(
    "## Contact",
    "",
    `Contact form: ${abs("/#contact")}`,
    `Book a call: ${site.bookingUrl}`,
    `Email: ${site.email}`,
    `LinkedIn: ${site.social.linkedin}`,
    "",
  );
  return out.join("\n");
}

function warnPlaceholders() {
  const todo: string[] = [];
  if (prices.audit.amount === null) todo.push("PRICE_AUDIT (lib/pricing.ts)");
  if (prices.cto.amount === null) todo.push("PRICE_CTO_FROM (lib/pricing.ts)");
  const missing = testimonials.length - visibleTestimonials.length;
  if (missing > 0)
    todo.push(`${missing} testimonial placeholder(s) (lib/testimonials.ts)`);
  if (todo.length) {
    console.warn(`[launch] placeholders still to fill: ${todo.join(", ")}`);
  }
}

const pub = path.join(process.cwd(), "public");
writeFileSync(path.join(pub, "llms.txt"), short());
writeFileSync(path.join(pub, "llms-full.txt"), full());
console.log("[llms] public/llms.txt, public/llms-full.txt");
warnPlaceholders();
