/**
 * English UI strings. lib/dictionaries/fr.ts must match this shape exactly
 * (it is typed against `Dictionary`). Long-form page content lives in the
 * lib/*.ts data files, not here.
 */

export const en = {
  meta: {
    title:
      "Walid Ghouili — Fractional CTO, Tech Audits & Engineering Leadership",
    description:
      "Fractional CTO & technical audits for European and Tunisian startups. Nearshore senior engineering from Tunis — MVP builds, codebase audits, GDPR-aware.",
    privacyTitle: "Privacy",
    privacyDescription:
      "How walid.ghouili.com handles your data: no tracking cookies, and the only personal data processed is what you send through a form, by email or via Calendly.",
    checklistTitle: "Technical due diligence checklist (free PDF)",
    checklistDescription:
      "Technical due diligence checklist: the 25 things investors check before a seed round, from architecture and security to GDPR, infra and tests. Free PDF.",
  },
  nav: {
    home: "Home",
    services: "Services",
    work: "Work",
    faq: "FAQ",
    about: "About",
    cta: "Book a call →",
    /** Label of the link to the other language. */
    switchTo: "FR",
    switchToFull: "Version française",
  },
  footer: {
    privacy: "Privacy",
    country: "Tunisia",
  },
  hero: {
    pill: "Available Q4 2026 · 2 spots open",
    eyebrow: "Fractional CTO · Technical Audits · Tunis",
    /** Headline words, animated one by one. `g` = gradient fill. */
    line1: [
      { t: "Build" },
      { t: "the" },
      { t: "right thing", g: true, after: "." },
    ],
    line2: [
      { t: "Or" },
      { t: "fix", g: true },
      { t: "the" },
      { t: "thing" },
      { t: "you" },
      { t: "shipped." },
    ],
    h1MaxWidth: "16ch",
    selectorLabel: "What do you need?",
    build: {
      tab: "I need to build something",
      sub: "For founders about to build. I turn your idea into a shippable MVP — architected to scale, not rebuilt in a year.",
      proof: "Idea to shippable MVP in ~4 weeks",
      cta: "Book a build call",
      motif: "build",
    },
    audit: {
      tab: "I already shipped — it's broken",
      sub: "For teams already shipped. A deep read of your code, infra and team — with a clear plan to unblock velocity.",
      proof: "2-week deep-read of code, infra & team",
      cta: "Book an audit call",
      motif: "audit",
    },
    secondaryCta: "Free due-diligence checklist",
    trust: ["20+ products shipped", "Replies in 48h", "FR · EN · AR"],
  },
  industries: { title: "Industries I've shipped in" },
  services: {
    eyebrow: "What I do",
    title: "Four ways to work together.",
    sub: "Pick the engagement that matches where you are. Most clients start with one and grow into another.",
    statsTitle: "By the numbers",
  },
  process: {
    eyebrow: "How it works",
    title: "How we'd work together.",
    sub: "Same shape whether it's a build, an audit, or a fractional-CTO retainer — fixed scope up front, visible progress, and everything yours at the end.",
  },
  work: {
    eyebrow: "Selected work",
    title: "A few things I've shipped.",
    sub: "Real products in production — SaaS, AI EdTech, marketplaces and mobile apps on Flutter and React Native, plus local-services and B2B sites.",
    readCaseStudy: "Read case study",
    ndaNote: "Confidential — under NDA",
    ndaClient: "Confidential client",
  },
  about: {
    eyebrow: "About",
    title: "The senior technical hire you can't yet afford full-time.",
    intro:
      "I'm Walid Ghouili — a fractional CTO and technical-audit consultant in Tunis, providing nearshore senior engineering to early-stage European and Tunisian startups in French, English, and Arabic. I founded InnoviaBurst to do that nearshore product work, and I'm the founder of",
    products: [
      {
        name: "Simplify for Kids",
        url: "https://simplify-kids.com/",
        desc: "a story-based AI learning platform",
      },
      {
        name: "Sabboura",
        url: "https://sabboura.tn/",
        desc: "an AI tutor for Tunisian bac students",
      },
      {
        name: "Tnajem",
        url: "https://tnajem.com/",
        desc: "a tutoring marketplace",
      },
    ],
    and: "and",
    teach:
      "I also teach computer science at IMSET (part of Honoris United Universities).",
    p2: "I split my week between writing production code, reviewing other people's, and explaining all of it to engineering students. That mix is the whole pitch — I'm a working engineer, not a slide-deck consultant.",
  },
  explainer: {
    eyebrow: "The basics",
    title: "What is a fractional CTO?",
    definition:
      "A fractional CTO is a senior engineering leader who works part-time — typically 1–2 days a week — with a company that isn't ready for a full-time CTO. They own architecture, code review, technical hiring, and the roadmap, giving startups senior judgment without a full-time salary.",
    whenTitle: "When do you need one?",
    triggers: [
      "You're pre-product and about to build — and don't want to build it wrong.",
      "You shipped something, and now it's breaking or slowing you down.",
      "There's no senior engineer in the room to make the hard calls.",
      "You're raising and need credible technical leadership.",
      "You're scaling faster than your stack and team can handle.",
    ],
    vsTitle: "Fractional CTO vs full-time CTO vs agency",
    head: ["", "Fractional CTO", "Full-time CTO", "Agency / dev shop"],
    rows: [
      [
        "Cost",
        "Monthly retainer, part-time",
        "Full salary + equity",
        "Per-project, often highest",
      ],
      [
        "Commitment",
        "1–2 days/week, 3-month min.",
        "Permanent",
        "Project-bound",
      ],
      ["Embedded?", "Yes — in your team", "Yes", "No — external"],
      [
        "Accountability",
        "Owns technical decisions",
        "Owns everything",
        "Delivers scope, then leaves",
      ],
      [
        "Best for",
        "Pre/early product, need senior judgment now",
        "Funded, scaling, need a permanent leader",
        "A discrete, well-specified build",
      ],
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions you're probably asking.",
  },
  cta: {
    titleA: "Let's see if I'm the",
    titleB: "right person to call.",
    sub: "Tell me what you're building and where you're stuck. I reply within 48 hours, and if I'm not the right fit, I'll usually know someone who is.",
    preferTalk: "Prefer to talk first?",
    book: "Book a 30-min call",
  },
  servicePage: {
    whatYouGet: "What you get",
    /** "{service}" is replaced with the service name. */
    questions: "{service} — questions",
    relatedWork: "Related work",
    talkTitle: "Let's talk about what you need.",
    talkBody:
      "A 30-minute intro call, a written scope, and a concrete number — no surprises. I reply within 48 hours.",
    start: "Start a project conversation →",
    book: "Book a 30-min call",
  },
  workPage: {
    visitLive: "Visit the live site",
    getItOn: "Get it on",
    context: "Context",
    challenge: "The challenge",
    approach: "Approach",
    built: "What we built",
    outcome: "Outcome",
    stack: "Stack",
    similarTitle: "Building something similar?",
    similarBody:
      "Start a project conversation — a 30-minute intro call, a written scope, and a concrete number. I reply within 48 hours.",
    start: "Start a project conversation →",
    raising: "Raising soon?",
    checklistLink: "Get the free 25-point technical due-diligence checklist →",
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy",
    updatedLabel: "Last updated:",
    updated: "October 2026",
    /** Bodies support [text](url) links and {email}. */
    blocks: [
      {
        title: "The short version",
        body: "This is a personal portfolio site. It sets no advertising or analytics cookies and does not track you. The only personal data I process is what you deliberately send me, through a form, by email or when you book a call.",
      },
      {
        title: "What this site collects",
        body: "Nothing automatically. There are no analytics scripts, no tracking pixels, and no first-party cookies. Browsing the site leaves no profile of you with me. Your browser may remember that you dismissed the checklist banner (local storage, never sent to me).",
      },
      {
        title: "Contact and checklist forms",
        body: "When you submit the contact form or the checklist form, what you typed (name, email, company, project details) and the campaign parameters in the page address, if any, are sent to me as an email through [Resend](https://resend.com/legal/privacy-policy), an email delivery service. The site itself stores nothing. Resend keeps delivery logs under its own policy. I use the details only to reply to you or send the checklist you asked for.",
      },
      {
        title: "When you email me",
        body: "If you email [{email}](mailto:{email}), I receive whatever you put in that message: your name, address, and anything you describe about your project. I use it only to reply and, if we work together, to deliver the engagement. I don't sell it or share it with anyone.",
      },
      {
        title: "Booking a call (Calendly)",
        body: 'The "Book a call" buttons open [Calendly](https://calendly.com/), a third-party scheduling service. When you open it, Calendly processes the details you enter (name, email, time slot) and may set its own cookies under [its own privacy policy](https://calendly.com/privacy). I only receive the booking details you submit.',
      },
      {
        title: "Hosting",
        body: "The site runs on a private server that keeps standard web server logs (such as IP address and request time) for security and operations, for a limited time. Your IP address is also used, in memory only, to rate-limit the forms against spam. EU-resident hosting is available for client projects on request.",
      },
      {
        title: "Your rights",
        body: "Under the GDPR you can ask to access, correct, or delete any personal data I hold about you, or object to its use. Email [{email}](mailto:{email}) and I'll handle it promptly.",
      },
      {
        title: "Changes",
        body: "If this site starts collecting anything new, I'll update this page and the date above before doing so.",
      },
    ],
  },
  notFound: {
    title: "Page not found",
    body: "That page doesn't exist, or it moved.",
    home: "Back to the home page",
  },
  form: {
    name: "Your name",
    email: "Work email",
    company: "Company website",
    companyPlaceholder: "yourcompany.com",
    building: "What are you building?",
    buildingPlaceholder:
      "A sentence or two is enough: the product, who it's for, where it is today.",
    budget: "Budget range",
    budgetPlaceholder: "Pick a range",
    budgetOptions: {
      "lt-5k": "Under €5k",
      "5k-15k": "€5k to €15k",
      "15k-40k": "€15k to €40k",
      "40k-plus": "Over €40k",
      unsure: "Not sure yet",
    },
    stuck: "Where are you stuck?",
    stuckPlaceholder: "Pick the closest",
    stuckOptions: {
      "about-to-build": "About to build",
      "shipped-breaking": "Shipped, and it's breaking",
      "no-senior": "No senior engineer on the team",
      raising: "Raising, need technical credibility",
    },
    optional: "optional",
    submit: "Send it over",
    sending: "Sending…",
    privacy:
      "I only use this to reply to you. No newsletter, no sharing. See the privacy page.",
    successTitle: "Got it. I'll reply within 48 hours.",
    successBody:
      "If you'd rather not wait, grab a 30-minute slot now and we'll talk it through.",
    successCta: "Book a 30-min call",
    errorInvalid: "Please check the highlighted fields.",
    errorRateLimited:
      "Too many messages from this connection. Try again in a few minutes.",
    errorGeneric: "That didn't go through. You can email me directly at",
    errorEmail: "Enter a valid email address.",
    errorRequired: "This field is required.",
  },
  checklistForm: {
    name: "First name",
    email: "Email",
    submit: "Get the checklist",
    sending: "Sending…",
    privacy:
      "I'll email you the PDF link and nothing else unless you write back.",
    successTitle: "Here's your checklist.",
    successBody:
      "The download should start on its own. If it doesn't, use the button below.",
    download: "Download the PDF",
    bookCta: "Want me to run it with you? Book a call",
  },
  testimonials: {
    eyebrow: "Clients",
    title: "What founders say.",
  },
  pricing: {
    eyebrow: "Pricing",
    from: "From",
    perMonth: "/ month",
    fixed: "fixed fee",
    exVat: "excl. VAT",
    fallback: "Fixed fee, confirmed in writing after the intro call",
    auditIncludes: [
      "Two weeks, fixed scope",
      "Written risk register, ranked by impact and effort",
      "Ordered remediation plan any team can execute",
      "Walkthrough call with you and your team",
      "Work under NDA on request",
    ],
    ctoIncludes: [
      "1 to 2 days a week, embedded in your team",
      "Architecture, code review, hiring and roadmap",
      "3-month minimum, pause or stop at agreed checkpoints",
      "Senior contact in EU working hours",
      "Everything documented and owned by you",
    ],
    cta: "Book a call",
  },
  nudge: {
    text: "Raising soon? Get the 25-point technical due-diligence checklist.",
    cta: "Get the free checklist",
    dismiss: "Dismiss",
  },
  lp: {
    trust: "Replies within 48h · Works under NDA · FR · EN · AR",
    proofEyebrow: "Proof",
    proofTitle: "Built by someone who ships production code.",
    faqTitle: "Questions before you book.",
    formEyebrow: "Next step",
    privacy: "Privacy",
  },
  checklistPage: {
    eyebrow: "Free checklist",
    formTitle: "Get the PDF",
    formBody:
      "25 points, each with what a good answer looks like and the red flag reviewers look for. Print it and go through it with your lead engineer.",
    insideTitle: "What's inside",
    auditCtaTitle: "Rather have someone run it for you?",
    auditCtaBody:
      "A two-week technical audit turns this checklist into a ranked list of findings with the fixes in order.",
    auditCta: "See the technical audit",
  },
} as const;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
