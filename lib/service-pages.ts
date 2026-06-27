/**
 * Long-form content for the dedicated /services/[slug] pages (SEO Phase 3).
 * Each entry powers one rankable URL with its own title, meta, H1, answer-first
 * lede, body sections, a service-specific FAQ (→ FAQPage JSON-LD), and links to
 * related case studies. Edit copy here without touching the route component.
 *
 * Pricing is kept qualitative by request — no exact figures are published.
 */

export type ServiceSection = { heading: string; body: string };
export type ServiceFaq = { q: string; a: string };

export type ServicePage = {
  /** URL segment — /services/[slug]. */
  slug: string;
  /** Matches the OfferCatalog `serviceType` in the ProfessionalService schema. */
  serviceType: string;
  /** Small mono eyebrow on the page. */
  eyebrow: string;
  /** <title> — keyword-targeted, < 60 chars where possible. */
  seoTitle: string;
  /** Meta description — ~150 chars, answer-first. */
  metaDescription: string;
  /** Single keyword-targeted H1. */
  h1: string;
  /** Answer-first definition lede (the quotable sentence for AEO/GEO). */
  lede: string;
  /** Body sections. */
  sections: ServiceSection[];
  /** "What you get" checklist. */
  whatYouGet: string[];
  /** Service-specific FAQ → rendered + FAQPage JSON-LD. */
  faqs: ServiceFaq[];
  /** Case-study slugs to cross-link. */
  relatedCaseStudies: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "fractional-cto",
    serviceType: "Fractional CTO",
    eyebrow: "Fractional CTO",
    seoTitle: "Fractional CTO for Startups — Tunis & Europe | Walid Ghouili",
    metaDescription:
      "Hire a fractional CTO 1–2 days a week for architecture, code review, hiring and roadmap. Nearshore senior engineering for European & Tunisian startups.",
    h1: "Fractional CTO for early-stage startups",
    lede: "A fractional CTO is a senior engineering leader who works part-time — typically 1–2 days a week — with a company that isn't ready for a full-time CTO. They own architecture, code review, technical hiring, and the roadmap, giving startups senior judgment without a full-time salary.",
    sections: [
      {
        heading: "What a fractional CTO actually does",
        body: "I act as the senior technical voice your team doesn't have yet: I set the architecture, review the code that ships, sit in on hiring, and keep the roadmap honest about what's realistic. The point isn't to write every line — it's to make sure the lines your team writes add up to a product that scales instead of one you have to rebuild in a year. You get the calls a full-time CTO would make, on the days you actually need them.",
      },
      {
        heading: "Who it's for",
        body: "Founders who are technical enough to be dangerous but need a sounding board; non-technical founders who need someone accountable for engineering; and teams of two or three engineers with no senior in the room. It's also the right fit when you're raising and investors want to see a credible technical lead, or when you're scaling faster than your stack and processes can handle.",
      },
      {
        heading: "How the engagement works",
        body: "Retainers run on a monthly basis with a three-month minimum, so there's time to actually move the needle. We start with a short call and a written scope, work in visible weekly cycles, and you own every decision, document, and commit as it lands. No lock-in — the engagement pauses or ends at agreed checkpoints, and your team is stronger for it, not dependent on me.",
      },
    ],
    whatYouGet: [
      "Architecture decisions and technical roadmap you can defend to investors",
      "Code review and engineering standards that raise the whole team",
      "Hands-on help hiring and onboarding senior engineers",
      "A senior technical contact in EU working hours (UTC+1)",
      "Everything documented and owned by you — no lock-in",
    ],
    faqs: [
      {
        q: "What is a fractional CTO?",
        a: "A fractional CTO is a senior engineering leader who works part-time — usually 1–2 days a week — with a company that isn't ready for a full-time CTO. They own architecture, code review, hiring, and the technical roadmap, giving startups senior judgment without a full-time salary.",
      },
      {
        q: "Fractional CTO vs full-time CTO vs agency — which do I need?",
        a: "A fractional CTO is an embedded, part-time monthly retainer for pre- and early-product teams that need senior judgment now. A full-time CTO is a permanent salaried hire for funded teams scaling fast. An agency delivers a discrete, well-specified build and then leaves. Most early startups need the first.",
      },
      {
        q: "When do you need a fractional CTO?",
        a: "When you're about to build and don't want to build it wrong; when you've shipped something that's breaking; when there's no senior engineer in the room; when you're raising and need technical credibility; or when you're scaling faster than your stack and team can handle.",
      },
      {
        q: "How much does a fractional CTO cost?",
        a: "The fractional-CTO role is a monthly retainer; builds and audits are quoted as fixed-scope projects. Pricing depends on days per week and scope, so you get a concrete number on the intro call rather than a guessed figure here — no surprises later.",
      },
    ],
    relatedCaseStudies: ["facturra", "zorro-services"],
  },
  {
    slug: "technical-audit",
    serviceType: "Technical Audit",
    eyebrow: "Technical Audit",
    seoTitle: "Technical / Codebase Audit for Startups | Walid Ghouili",
    metaDescription:
      "A two-week, fixed-scope deep-read of your codebase, infrastructure and team practices — with a prioritised list of risks and fixes you can act on.",
    h1: "Technical audit for your codebase and infrastructure",
    lede: "A technical audit is a two-week, fixed-scope deep-read of your codebase, infrastructure, and team practices that produces a prioritised list of risks and fixes — so you know exactly what's slowing you down and what to do about it.",
    sections: [
      {
        heading: "What's in the report",
        body: "You get a written, prioritised assessment, not a vague verdict: architecture and code quality, security and data-protection gaps, infrastructure and deployment risks, test coverage, and the team practices behind them. Every finding is ranked by impact and effort, with a concrete recommendation — the difference between 'your code has issues' and 'here are the five things to fix first, in order, and why.'",
      },
      {
        heading: "When to get one",
        body: "Before you acquire or invest in a product and need technical due diligence; when velocity has quietly collapsed and nobody can say why; before a rewrite, so you don't throw away what works; or when a previous team left and you've inherited a codebase you don't trust. An audit is the cheapest way to find out what you're actually dealing with.",
      },
      {
        heading: "How it runs",
        body: "Two weeks, fixed fee, fixed scope. I read the code, the infra, and the history, talk to the people who built it, and reproduce the problems that matter. You get the report and a walkthrough call — and if you want the fixes implemented, the audit rolls naturally into a build or fractional-CTO engagement.",
      },
    ],
    whatYouGet: [
      "A prioritised, written risk register — ranked by impact and effort",
      "Architecture, security, infrastructure, and test-coverage review",
      "GDPR / data-protection gap check",
      "A walkthrough call to talk through the findings",
      "A clear, ordered remediation plan you can hand to any team",
    ],
    faqs: [
      {
        q: "What is a technical audit and what's in the report?",
        a: "A technical audit is a two-week, fixed-scope review of your codebase, infrastructure, and team practices. The report is a prioritised risk register — architecture, security, GDPR, infra, and test gaps — each finding ranked by impact and effort with a concrete recommended fix.",
      },
      {
        q: "How long does an audit take and what does it cost?",
        a: "Two weeks for a fixed fee and fixed scope. You get the report plus a walkthrough call. If you want the findings implemented, the audit rolls into a build or a fractional-CTO retainer — you get the exact fee on the intro call.",
      },
      {
        q: "Can the audit cover GDPR and EU data residency?",
        a: "Yes. Data-protection and GDPR gaps are part of every audit, and recommendations include EU-resident hosting and architecture changes where data residency matters.",
      },
    ],
    relatedCaseStudies: ["facturra", "fresh-tenancy"],
  },
  {
    slug: "mvp-development",
    serviceType: "MVP Development",
    eyebrow: "MVP Build",
    seoTitle:
      "MVP Development — Idea to Production in ~4 Weeks | Walid Ghouili",
    metaDescription:
      "Idea to a shippable MVP in about four weeks of fixed-scope work — a production web app architected to scale, not rebuilt in a year. Nearshore from Tunis.",
    h1: "MVP development — idea to a shippable product",
    lede: "An MVP build takes your idea from Figma to a production web app in about four weeks of fixed-scope work — architected to scale, not rebuilt in a year. You get a real, deployable product, not a prototype you have to throw away.",
    sections: [
      {
        heading: "Built properly from the start",
        body: "Most MVPs cut the corners you can't see — the ones that turn into a rewrite the moment you get traction. I build on a stack that won't paint you into a corner six months in: a clean architecture, real auth and data modelling, CI/CD, and the boring foundations that let you add features later instead of fighting the ones you already have. Fast to ship, but built like it's meant to last.",
      },
      {
        heading: "Fixed scope, four-week sprints",
        body: "We agree exactly what the MVP includes before any work starts — a written scope, a timeline, and a price. Then we work in weekly increments so you see real progress every week, with something deployable at the end of each. Web apps, SaaS platforms, internal tools — solo or leading a small team, depending on the size of the build.",
      },
      {
        heading: "What happens after launch",
        body: "You own the repos, the infrastructure, and the docs from day one. From there you can take it in-house, keep me on a fractional-CTO retainer to grow it, or hand it to your own team with a clean handover. No lock-in, no dependency — the MVP is yours to run.",
      },
    ],
    whatYouGet: [
      "A deployed, production-grade web app — not a throwaway prototype",
      "Modern stack (Next.js, NestJS, Django/FastAPI, PostgreSQL)",
      "CI/CD, auth, and the foundations to scale",
      "Fixed scope, fixed price, weekly visible progress",
      "Full ownership of code, infra, and docs — no lock-in",
    ],
    faqs: [
      {
        q: "How long does it take to build an MVP?",
        a: "About four weeks of fixed-scope work for a focused MVP — from idea or Figma to a deployed, production web app. Larger builds run longer; we agree the exact scope and timeline in writing before any work starts.",
      },
      {
        q: "Will the MVP need to be rebuilt when we scale?",
        a: "That's the thing it's designed to avoid. I build on a stack and architecture that scale — real data modelling, auth, and CI/CD from the start — so you add features later instead of rewriting foundations.",
      },
      {
        q: "Who owns the code?",
        a: "You do, from day one — repositories, infrastructure, and documentation. You can take it in-house, keep me on a retainer to grow it, or hand it to your own team. No lock-in.",
      },
    ],
    relatedCaseStudies: ["facturra", "debarras-aurea"],
  },
  {
    slug: "workshops",
    serviceType: "Engineering Training",
    eyebrow: "Workshops & Training",
    seoTitle: "Engineering Workshops & Training (FR/EN) | Walid Ghouili",
    metaDescription:
      "Hands-on workshops in modern web stacks for engineering teams — Next.js, NestJS, testing, architecture — delivered on-site or remote, in French or English.",
    h1: "Engineering workshops & training for your team",
    lede: "Workshops are hands-on training in modern web stacks for your engineering team, delivered on-site or remotely in French or English — practical sessions that level up the people who'll be maintaining your product long after I've gone.",
    sections: [
      {
        heading: "What we cover",
        body: "Modern web architecture and the stacks I build on every day: Next.js and the React ecosystem, Node/NestJS and Python (Django, FastAPI) back ends, PostgreSQL, testing and CI/CD, and the engineering practices — code review, branching, deployment — that separate a team that ships from one that firefights. Sessions are built around your actual codebase and questions, not generic slides.",
      },
      {
        heading: "Who it's for",
        body: "In-house engineering teams that want to adopt a modern stack with confidence, junior developers who need a senior to learn from, and organisations training the next cohort. I teach computer science at IMSET (Honoris United Universities) and partner with Smart Tunisian Technoparks, so this is the day job, not a side gig.",
      },
      {
        heading: "Format",
        body: "On-site across Tunisia and the EU, or fully remote. Half-day to multi-day formats, in French or English, scoped to your team's level and goals. You get the materials and the recordings, so the workshop keeps paying off after the session ends.",
      },
    ],
    whatYouGet: [
      "Hands-on sessions built around your real codebase",
      "Modern web stack: Next.js, NestJS, Django/FastAPI, PostgreSQL, CI/CD",
      "Delivered in French or English, on-site or remote",
      "Materials and recordings your team keeps",
      "A working engineer and CS teacher, not a slide-deck trainer",
    ],
    faqs: [
      {
        q: "What do the engineering workshops cover?",
        a: "Modern web stacks and practices: Next.js and React, Node/NestJS and Python back ends, PostgreSQL, testing, CI/CD, and engineering workflow. Sessions are built around your own codebase and questions rather than generic material.",
      },
      {
        q: "Are workshops delivered in French or English?",
        a: "Both. Workshops, materials, and Q&A run in French or English, whichever suits your team — delivered on-site across Tunisia and the EU, or fully remote.",
      },
    ],
    relatedCaseStudies: [],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}
