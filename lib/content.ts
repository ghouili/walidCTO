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
    q: "How do engagements start — and stop?",
    a: "Every engagement opens with a short call and a written, fixed scope. Work happens in weekly cycles, and you can pause or end at any agreed checkpoint. You own all code, infrastructure, and documentation throughout, so there's never any lock-in.",
  },
  {
    q: "Where are you based, and which time zones do you cover?",
    a: "Tunis, Tunisia (UTC+1). That's full overlap with European working hours and a natural bridge to the wider MENA region — so you get same-day collaboration without the gaps that come with far-offshore teams.",
  },
  {
    q: "Which languages do you work in?",
    a: "French, English, and Arabic — meetings, code reviews, and documentation in whichever suits your team.",
  },
  {
    q: "Remote or on-site?",
    a: "Primarily remote. For kickoffs, workshops, or training I travel on-site across Tunisia and the EU by arrangement.",
  },
  {
    q: "How do you handle confidentiality and IP?",
    a: "I'm happy to work under NDA. Everything I produce — code, infrastructure, and docs — belongs to you. Most of my recent client work is covered by NDAs, which is why client names are blurred on this site.",
  },
  {
    q: "Do you cover EU / GDPR requirements?",
    a: "Yes. I design with GDPR in mind from the start and can host on EU-resident infrastructure when data residency matters.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the engagement. Builds and audits are fixed-scope; the fractional-CTO retainer is monthly. You'll get a concrete number on the intro call — no surprises later.",
  },
];
