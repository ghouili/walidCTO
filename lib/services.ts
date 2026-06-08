/**
 * Services rendered in the "Three ways to work together" bento grid.
 * `size: "large"` spans 4 cols / 2 rows; `size: "small"` spans 2 cols.
 * Edit copy/pricing here without touching JSX.
 */

export type Service = {
  num: string;
  label: string;
  title: string;
  desc: string;
  detail: string;
  /** "feature" = large (half-width, double-height); "standard" = small. */
  size: "feature" | "standard";
  /** Decorative gradient lights: "orbit" = circular motion, "drift" = floating. */
  visual?: "orbit" | "drift";
};

export const services: Service[] = [
  {
    num: "01",
    label: "BUILD",
    title: "Ship the MVP, properly.",
    desc: "I lead small teams — or work solo — to take your idea from Figma to production. Web apps, SaaS platforms, internal tools. Built on a stack that won't paint you into a corner six months in.",
    detail: "4-WEEK SPRINTS · FIXED SCOPE",
    size: "feature",
    visual: "orbit",
  },
  {
    num: "02",
    label: "LEAD",
    title: "Fractional CTO.",
    desc: "1–2 days a week as the senior in the room — architecture, reviews, hiring. The senior technical voice your team doesn't have yet.",
    detail: "3-MONTH MIN.",
    size: "feature",
    visual: "drift",
  },
  {
    num: "03",
    label: "AUDIT",
    title: "Find what's broken.",
    desc: "Two-week deep-read of your codebase, infra, and team practices.",
    detail: "2 WEEKS",
    size: "standard",
  },
  {
    num: "04",
    label: "TEACH",
    title: "Workshops & training.",
    desc: "Modern web stacks for engineering teams. In French & English.",
    detail: "ON-SITE / REMOTE",
    size: "standard",
  },
];

/**
 * Headline figures rendered in the dark stats card.
 * These are value/credibility framed — confirm each is accurate.
 * TODO: the strongest converters are real client outcomes (e.g. "€X saved
 * in an audit", "deploy time cut from 40min → 4min"). Swap one or two in
 * once you have numbers you can stand behind.
 */
export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "4 wks", label: "From idea to a shippable MVP" },
  { value: "20+", label: "Products shipped to production" },
  { value: "3", label: "Languages I deliver in — FR · EN · AR" },
  { value: "48h", label: "Reply time on new enquiries" },
];

/** Industries strip under the hero. */
export const industries: string[] = [
  "B2B SaaS",
  "Hospitality",
  "Public Sector",
  "EdTech & AI",
  "FinTech",
];
