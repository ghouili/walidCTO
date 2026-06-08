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
  price: string;
  detail: string;
  /** "feature" = large (half-width, double-height); "standard" = small. */
  size: "feature" | "standard";
  /** Render the decorative gradient blobs (used on the lead feature card). */
  visual?: boolean;
};

export const services: Service[] = [
  {
    num: "01",
    label: "BUILD",
    title: "Ship the MVP, properly.",
    desc: "I lead small teams — or work solo — to take your idea from Figma to production. Web apps, SaaS platforms, internal tools. Built on a stack that won't paint you into a corner six months in.",
    price: "From €8K",
    detail: "4-WEEK SPRINTS · FIXED SCOPE",
    size: "feature",
    visual: true,
  },
  {
    num: "02",
    label: "LEAD",
    title: "Fractional CTO.",
    desc: "1–2 days a week as the senior in the room — architecture, reviews, hiring. The senior technical voice your team doesn't have yet.",
    price: "From €2.5K/mo",
    detail: "3-MONTH MIN.",
    size: "feature",
  },
  {
    num: "03",
    label: "AUDIT",
    title: "Find what's broken.",
    desc: "Two-week deep-read of your codebase, infra, and team practices.",
    price: "From €4K",
    detail: "2 WEEKS",
    size: "standard",
  },
  {
    num: "04",
    label: "TEACH",
    title: "Workshops & training.",
    desc: "Modern web stacks for engineering teams. In French & English.",
    price: "Custom",
    detail: "ON-SITE / REMOTE",
    size: "standard",
  },
];

/** Headline figures rendered in the dark stats card. */
export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: "6+", label: "Years shipping production code" },
  { value: "20+", label: "Projects delivered" },
  { value: "3", label: "Languages — FR / EN / AR" },
  { value: "100%", label: "EU-resident hosting available" },
];

/** Industries strip under the hero. */
export const industries: string[] = [
  "B2B SaaS",
  "Hospitality",
  "Public Sector",
  "EdTech & AI",
  "FinTech",
];
