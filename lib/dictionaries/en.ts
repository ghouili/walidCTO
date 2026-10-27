/**
 * English UI strings. lib/dictionaries/fr.ts must match this shape exactly
 * (it is typed against `Dictionary`). Long-form page content lives in the
 * lib/*.ts data files, not here.
 */

export const en = {
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
