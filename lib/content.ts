/**
 * Process steps and FAQ content.
 * Edit copy here without touching JSX. The FAQ also feeds FAQPage JSON-LD.
 */

export type ProcessStep = { num: string; title: string; desc: string };

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Intro call",
    desc: "A 30-minute call to understand where you are and where you're stuck. No pitch — if I'm not the right fit, I'll point you to someone who is.",
  },
  {
    num: "02",
    title: "Fixed scope & price",
    desc: "Within a few days you get a written scope, timeline, and price. You know exactly what you're buying before any work starts.",
  },
  {
    num: "03",
    title: "Short, visible cycles",
    desc: "We work in weekly increments. You see real progress every week and own every commit, decision, and document as it lands.",
  },
  {
    num: "04",
    title: "Clean handover",
    desc: "Repos, infrastructure, and docs are yours from day one. Engagements pause or end at agreed checkpoints — no lock-in, no dependency on me.",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is a fractional CTO?",
    a: "A fractional CTO is a senior engineering leader who works part-time — typically 1–2 days a week — with a company that isn't ready for a full-time CTO. They own architecture, code review, technical hiring, and the roadmap, giving startups senior judgment without a full-time salary.",
  },
  {
    q: "How much does a fractional CTO cost?",
    a: "Builds and technical audits are quoted as fixed-scope projects; the fractional-CTO role is a monthly retainer. The figure depends on scope and days per week, so you get a concrete number on the intro call — no guesswork up front and no surprises later.",
  },
  {
    q: "Fractional CTO vs full-time CTO vs agency — which do I need?",
    a: "A fractional CTO is embedded and part-time, for pre- and early-product teams that need senior judgment now. A full-time CTO is a permanent hire for funded teams scaling fast. An agency delivers a discrete, well-specified build and then leaves. Most early startups need the first.",
  },
  {
    q: "When do you need a fractional CTO?",
    a: "When you're about to build and don't want to build it wrong; when you've shipped something that's breaking; when there's no senior engineer in the room; when you're raising and need technical credibility; or when you're scaling faster than your stack and team can handle.",
  },
  {
    q: "What is a technical audit, and what's in the report?",
    a: "A technical audit is a two-week, fixed-scope deep-read of your codebase, infrastructure, and team practices. The deliverable is a prioritised risk register — architecture, security, GDPR, infra, and test gaps — each finding ranked by impact and effort with a concrete recommended fix.",
  },
  {
    q: "Is it GDPR-safe to nearshore development to Tunisia?",
    a: "Yes. I design with GDPR in mind from the start, can host on EU-resident infrastructure when data residency matters, and work under NDA. Tunis (UTC+1) gives full overlap with EU hours, so nearshoring adds capacity without the compliance or time-zone gaps of far-offshore teams.",
  },
  {
    q: "How do engagements start — and stop?",
    a: "Every engagement opens with a short call and a written, fixed scope. Work happens in weekly cycles, and you can pause or end at any agreed checkpoint. You own all code, infrastructure, and documentation throughout, so there's never any lock-in.",
  },
  {
    q: "Where are you based, and which time zones do you cover?",
    a: "Tunis, Tunisia (UTC+1) — full overlap with European working hours and a natural bridge to the wider MENA region, so you get same-day collaboration without the gaps that come with far-offshore teams.",
  },
  {
    q: "Which languages do you work in?",
    a: "French, English, and Arabic — meetings, code reviews, and documentation in whichever suits your team.",
  },
  {
    q: "How do you handle confidentiality and IP?",
    a: "I'm happy to work under NDA, and everything I produce — code, infrastructure, and docs — belongs to you. Most of my recent client work is covered by NDAs, which is why some client names are blurred on this site.",
  },
];
