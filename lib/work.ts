/**
 * Selected work entries rendered in the Work section.
 *
 * Named clients link out to their live site (`url`); confidential / internal
 * builds are shown with the client name blurred and an NDA badge (`nda: true`)
 * and carry no link. Draft entries and any unverifiable metrics from the source
 * brief are intentionally omitted. Add, remove, or reorder entries here without
 * touching JSX.
 */

/** Long-form case-study content for a /work/[slug] page (non-NDA projects). */
export type CaseStudy = {
  seoTitle: string;
  metaDescription: string;
  h1: string;
  /** Context / background paragraph. */
  intro: string;
  /** The core challenge. */
  challenge: string;
  /** Approach — what we did, as bullets. */
  approach: string[];
  /** What was built / delivered. */
  built: string[];
  /** Outcomes — kept qualitative; no unverifiable metrics. */
  outcome: string[];
  /** Tech-stack tags. */
  stack: string[];
  /** Related service slug, for cross-linking. */
  relatedService: string;
};

export type WorkEntry = {
  /** Stable id — used for React keys and the /work/[slug] route. */
  slug: string;
  /** Brand name. Blurred in the UI when `nda` is set. */
  client: string;
  /** Sector · market line, shown as the card eyebrow. */
  sector: string;
  /** Bold, outcome-led hook — the line that earns the click. */
  outcome: string;
  /** One-sentence supporting caption. */
  caption: string;
  /** Live site — surfaced on the case-study page. */
  url?: string;
  /** Mobile app store listings — surfaced on the case-study page. */
  stores?: { label: string; url: string }[];
  /** Hide the client name (blurred) and show an NDA badge. Omit `url`. */
  nda?: boolean;
  /** Present only for non-NDA projects with a dedicated case-study page. */
  caseStudy?: CaseStudy;
};

export const work: WorkEntry[] = [
  {
    slug: "facturra",
    client: "Facturra",
    sector: "FinTech / RegTech SaaS · France",
    outcome:
      "We turned France's 2026 e-invoicing mandate into a 5-minute onboarding.",
    caption:
      "A compliance-grade Factur-X platform that gets freelancers and small firms issuing legally valid e-invoices before their coffee goes cold.",
    url: "https://facturra.com/",
    caseStudy: {
      seoTitle: "Facturra — Factur-X e-invoicing SaaS (case study)",
      metaDescription:
        "How we turned France's 2026 e-invoicing mandate into a 5-minute onboarding: a compliance-grade Factur-X platform for freelancers and small firms.",
      h1: "Facturra: France's 2026 e-invoicing mandate, turned into a 5-minute onboarding",
      intro:
        "From September 2026 every French business must be able to receive structured electronic invoices, with emission deadlines phased through 2027. The market answered with 'approved-platform' plumbing built for accountants — not for the millions of freelancers and small firms who just need to send a legal invoice.",
      challenge:
        "Build a product fully compliant with the DGFiP mandate and usable by a non-accountant in minutes — without locking users into a single approved platform or bundling accounting and CRM they don't want.",
      approach: [
        "Positioned Facturra as a Solution Compatible (Opérateur de Dématérialisation) connected to an approved Plateforme Agréée — invoices keep flowing even if a PA changes terms, with no lock-in.",
        "Designed onboarding that pulls company identity from FranceConnect Pro / SIRET, removing manual data entry.",
        "Built native Factur-X generation (PDF/A-3 with embedded EN 16931-compliant XML) and a live, type-as-you-go demo on the landing page so prospects feel the compliance before signing up.",
        "Added an AI copilot to pre-fill invoices and catch VAT errors before send.",
      ],
      built: [
        "Next.js application with a native Factur-X engine",
        "FranceConnect Pro / SIRET onboarding",
        "Imports from Sage, EBP, Pennylane, QuickBooks and CSV",
        "Full invoice lifecycle tracking, API and webhooks",
        "Hosted in France (OVHcloud), GDPR-compliant",
      ],
      outcome: [
        "Onboarding measured in minutes — a first compliant invoice ships in the same session.",
        "Compliance experienced before signup, via the live landing-page demo.",
        "No platform lock-in: a compatible operator that survives PA changes.",
      ],
      stack: [
        "MERN · Next.js",
        "Node.js / Express",
        "MongoDB",
        "Factur-X / EN 16931",
        "FranceConnect / SIRET",
        "OVHcloud (FR)",
      ],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "sabboura",
    client: "Sabboura",
    sector: "EdTech / AI · Tunisia · Web + Mobile",
    outcome:
      "An AI tutor that explains the bac curriculum out loud — and draws while it talks.",
    caption:
      "Voice-first tutor for Tunisian baccalauréat maths and physics: teacher-verified recorded lessons, live AI explanations on demand, Arabic-first UI with FR/EN switching. Web platform plus Flutter app in production.",
    url: "https://sabboura.tn/",
    caseStudy: {
      seoTitle: "Sabboura — real-time AI tutor for bac students (case study)",
      metaDescription:
        "How we built Sabboura: a voice-first AI tutor for Tunisian bac maths and physics with teacher-verified lessons, live explanations and a Flutter app, shipped in weeks.",
      h1: "Sabboura: an AI tutor that teaches the bac curriculum by voice",
      intro:
        "Tunisian bac students pay for private lessons because the classroom moves too fast and the textbook doesn't answer back. Sabboura is a tutor that does: it explains a chapter out loud, illustrates as it goes, and answers follow-up questions in the language the student asks in — Arabic, French or English.",
      challenge:
        "Ship a real-time voice tutor that stays faithful to the official curriculum, keeps AI costs predictable at student prices, and works for a 17-year-old on a phone — not just in a demo.",
      approach: [
        "Modelled the product around the official programme: lessons are generated once from verified sources, reviewed by teachers, then replayed to every student — live AI is only spent when a student asks a question.",
        "Built the voice loop end to end: speech-to-text, LLM reasoning, neural TTS with lip-sync visemes driving an animated tutor, with pre-recorded fillers so the first word lands in under half a second.",
        'Designed a fractional usage unit ("chalk") so pricing stays profitable without the student ever seeing a hard cap.',
        "Went from first commit to production in under two months by running milestones in parallel with agentic coding, with CI/CD on push to production.",
      ],
      built: [
        "Next.js web platform (MERN) with Arabic-first, RTL-aware UI and per-session language switching",
        "Flutter mobile app in production, sharing the same API",
        "Voice pipeline: Deepgram STT, Claude, Azure neural TTS with visemes",
        "Teacher review workflow and automatic quality gates on every recorded lesson",
        "Prepaid packs and daily free allowance synced between anonymous and logged-in sessions",
        "GitHub Actions deploys to a VPS behind nginx and PM2",
      ],
      outcome: [
        "Live in production at sabboura.tn with teacher-verified lessons open to any visitor.",
        "A cost model where recorded lessons cost cents and live AI is spent only on demand.",
        "A product a non-technical founder could sell as prepaid cards from day one.",
      ],
      stack: [
        "MERN · Next.js",
        "Node.js",
        "MongoDB",
        "Flutter",
        "Claude API",
        "Azure Speech / Deepgram",
        "GitHub Actions · PM2",
      ],
      relatedService: "fractional-cto",
    },
  },
  {
    slug: "simplify-kids",
    client: "Simplify for Kids",
    sector: "EdTech / AI · Tunisia · Web + Mobile",
    outcome:
      "Turns a child's real school lesson into a narrated story, a quiz and a parent report.",
    caption:
      "Story-based AI learning for 6–12 year-olds in French, Arabic and English, told by an animated narrator. Next.js platform plus Flutter app in production, children's data kept in-region.",
    url: "https://beta.simplify-kids.com/",
    caseStudy: {
      seoTitle:
        "Simplify for Kids — AI story-based learning platform (case study)",
      metaDescription:
        "How we built Simplify for Kids: a parent uploads a lesson, the child gets a narrated story, a before/after quiz and the parent a report — web and Flutter app in production.",
      h1: "Simplify for Kids: a school lesson in, a story the child remembers out",
      intro:
        "Parents in Tunisia spend evenings re-explaining lessons a 7-year-old tuned out of. Simplify takes the actual lesson — a photo, a PDF, a few lines — and turns it into a story told by an animated narrator, followed by a quiz that shows the parent what landed.",
      challenge:
        "Build an AI pipeline that is reliable enough for children, keeps story quality consistent across three languages, and runs at a price a family will pay monthly — with children's data handled carefully.",
      approach: [
        "Designed a lesson-to-story pipeline with a fixed pedagogical structure, so every story teaches the lesson rather than drifting into fiction.",
        "Kept the child-facing surface simple and bold, and the parent surface calm: two design systems, one codebase.",
        "Priced on points per story so free challenges and school resellers can be added without re-architecting billing.",
        "Rebuilt v2 from the v1 prototype with the UX kept and the architecture replaced, shipped as a closed beta first.",
      ],
      built: [
        "Next.js platform (MERN) for parents and children, FR / AR / EN",
        "Flutter mobile app in production",
        "Lesson ingestion, story generation with Claude, neural narration and an animated 2D narrator",
        "Before/after quizzes and automated parent reports",
        "Points-based subscription with database-editable pricing",
      ],
      outcome: [
        "Closed beta live at beta.simplify-kids.com with families onboarding.",
        "A pipeline and dataset designed to fine-tune a dedicated model later.",
        "Pitched to the TICDCE programme as a bootstrapped EdTech product.",
      ],
      stack: [
        "MERN · Next.js",
        "Node.js",
        "MongoDB",
        "Flutter",
        "Claude API",
        "Azure TTS",
      ],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "guidup",
    client: "Guid'Up Tunisia",
    sector: "Travel / Tourism · Tunisia · Web + Mobile",
    outcome:
      "A six-destination travel guide app, admin back-office and landing site, shipped as one product.",
    caption:
      "Cultural and ecological guide to northern Tunisia with offline packs, audio guides and bookings. Flutter app in production, Next.js dashboard and site, one monorepo.",
    url: "https://guidup.tn/",
    caseStudy: {
      seoTitle: "Guid'Up Tunisia — travel guide app + back-office (case study)",
      metaDescription:
        "How we delivered Guid'Up: a Flutter travel-guide app with offline packs and audio guides, a Next.js admin dashboard and landing site, from a single monorepo.",
      h1: "Guid'Up: a travel guide app, back-office and site for northern Tunisia",
      intro:
        "Guid'Up promotes six under-visited destinations in northern Tunisia — Testour, Téboursouk, Thibar and more — to travellers who want culture and nature off the usual circuit. The founder needed a mobile app, a way to manage content and bookings, and a public site, launched together.",
      challenge:
        "Replace an abandoned previous build with a product the client could run herself: multi-destination content, offline use in areas with poor coverage, bookings without online payment at launch, and store-ready quality on a fixed budget.",
      approach: [
        "Treated the V2 design board as the single source of truth and rebuilt the app around it, keeping the animations the client loved from the previous version.",
        "Shipped offline destination packs, OpenStreetMap maps and TTS audio guides with human override, so the app works in the field.",
        "Set up the client's own store and infrastructure accounts, with InnoviaBurst operating them — no vendor lock-in.",
        "Delivered app, dashboard, API and site from one monorepo with CI/CD on push to production.",
      ],
      built: [
        "Flutter mobile app in production (email + Google auth, offline packs, bookings)",
        "Next.js admin dashboard for destinations, points of interest and bookings",
        "Next.js landing site in an illustrated travel-notebook style",
        "Node.js API, Dockerised, deployed via GitHub Actions",
      ],
      outcome: [
        "App and site launched together under guidup.tn.",
        "A client who owns every account and can publish content without a developer.",
        "Quality gates (analytics, motion, haptics, publish checks) in place from day one.",
      ],
      stack: [
        "Flutter",
        "MERN · Next.js",
        "Node.js",
        "MongoDB",
        "Docker",
        "GitHub Actions",
      ],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "styly",
    client: "Styly",
    sector: "Marketplace · Mobile-first",
    outcome: "A brand-to-client marketplace app, live on Google Play.",
    caption:
      "Mobile-first marketplace where brands reach their clients directly. React Native app in production on Google Play, App Store submission in progress, MERN back-end.",
    url: "https://styly.tn/",
    stores: [
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.stylistanetwork.styly&hl=en",
      },
    ],
    caseStudy: {
      seoTitle:
        "Styly — React Native marketplace app on Google Play (case study)",
      metaDescription:
        "How we shipped Styly: a React Native marketplace app connecting brands with their clients, in production on Google Play with a MERN back-end and App Store release underway.",
      h1: "Styly: a brand-to-client marketplace, from first build to the Play Store",
      intro:
        "Styly lets brands reach their own clients directly in a mobile marketplace instead of renting attention from social networks. The product is mobile-first and had to clear the store review process on a personal developer account, with worldwide availability including the EU.",
      challenge:
        "Ship a cross-platform marketplace app that passes Google Play's closed-testing requirements and Apple review, backed by an API that can grow with the catalogue.",
      approach: [
        "Built one React Native codebase for Android and iOS on a MERN back-end.",
        "Ran the Play Console closed-testing track to production and prepared the App Store Connect submission in parallel.",
        "Structured the account and release ownership so the brand owner controls the stores while we manage releases.",
      ],
      built: [
        "React Native mobile app, in production on Google Play",
        "Node.js / Express API on MongoDB",
        "Web presence at styly.tn",
        "Store listings, release pipeline and review handling",
      ],
      outcome: [
        "Live on Google Play; App Store release in progress.",
        "A release process the owner can repeat without a developer on call.",
      ],
      stack: [
        "React Native",
        "Node.js / Express",
        "MongoDB",
        "Google Play · App Store",
      ],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "tnajem",
    client: "Tnajem",
    sector: "EdTech Marketplace · Tunisia",
    outcome:
      "Shopify for Tunisian tutors: publish a live class, share one link, fill the seats.",
    caption:
      "Two-sided marketplace where verified tutors run live video classes and students book seats, with all contact kept in-app. Next.js platform on a Tunisia-hosted VPS.",
    url: "https://tnajem.com/",
    caseStudy: {
      seoTitle: "Tnajem — tutoring marketplace platform (case study)",
      metaDescription:
        "How we built Tnajem: a Next.js marketplace where verified tutors publish live video classes and students book seats, with in-app-only contact and tiered tutor plans.",
      h1: "Tnajem: a live-class marketplace for tutors and students",
      intro:
        "Private tutoring in Tunisia runs on WhatsApp groups and cash. Tnajem gives tutors a storefront — publish a live class, share one link — and gives students and parents a safe place to book and pay, with no direct contact between the two sides.",
      challenge:
        "Design a two-sided marketplace with trust built in: verified tutors, zero off-platform contact, a free tier that converts, and payment processing that fits the Tunisian market.",
      approach: [
        "Enforced the zero-contact rule in the data model and UI, not just the terms of service.",
        "Modelled the business as commission plus tutor subscription tiers, with promotions capped so the marketplace stays healthy.",
        "Launched adult-only first, with parent flows for minors designed in from the start.",
        "Hosted in Tunisia with CI/CD on push to production.",
      ],
      built: [
        "Next.js platform (MERN) bilingual French / Tunisian Derija",
        "Email OTP and password auth, tutor profiles shareable by link",
        "Live class scheduling, seat booking, follows and monthly subscriptions",
        "Tutor plan tiers and commission logic, payment gateway integration prepared",
        "Tunisia-hosted VPS with GitHub Actions deploys",
      ],
      outcome: [
        "Live at tnajem.com with tutors onboarding ahead of public launch.",
        "A marketplace whose trust rules are enforced by the product itself.",
      ],
      stack: [
        "MERN · Next.js",
        "Node.js",
        "MongoDB",
        "Live video",
        "GitHub Actions",
      ],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "internal-erp",
    client: "Helios Industrial Group",
    sector: "Internal ERP · Manufacturing",
    outcome:
      "One operations cockpit that retired six spreadsheets and three logins.",
    caption:
      "Custom ERP — inventory, production scheduling, procurement, and role-based dashboards for a mid-size industrial group. Client confidential under NDA.",
    nda: true,
  },
  {
    slug: "debarras-aurea",
    client: "Débarras Aurea",
    sector: "Local Services · Île-de-France",
    outcome:
      "A two-minute quote funnel for a Paris clearance business spanning 8 departments.",
    caption:
      "Fast, SEO-built site plus paid-acquisition funnel that converts local searches into booked interventions.",
    url: "https://debarras-aurea.fr/",
    caseStudy: {
      seoTitle: "Débarras Aurea — quote funnel + paid acquisition (case study)",
      metaDescription:
        "A two-minute quote funnel and SEO + paid-acquisition site turning local searches into booked clearance interventions across 8 Île-de-France départements.",
      h1: "Débarras Aurea: a two-minute quote funnel across 8 départements",
      intro:
        "Débarras Aurea is a Paris-region house-clearance business operating across eight Île-de-France départements. Local-services demand is search-driven and high-intent — but only if the site loads fast, ranks locally, and makes requesting a quote effortless.",
      challenge:
        "Turn high-intent local searches into booked interventions with a site that ranks across eight départements and a quote flow a stressed customer can finish in two minutes.",
      approach: [
        "Built a fast, SEO-optimised site structured around local (département-level) search intent.",
        "Designed a two-minute quote funnel that captures the details needed to price and book.",
        "Paired the site with a paid-acquisition funnel and conversion tracking — an end-to-end 'site + acquisition' setup.",
      ],
      built: [
        "Fast Next.js marketing site with local-SEO structure",
        "Two-minute, multi-step quote funnel",
        "Paid-acquisition funnel (Google Ads) with GTM / GA4 conversion tracking",
      ],
      outcome: [
        "Local searches converted into booked, qualified interventions.",
        "One coherent funnel from ad click to quote request to booking.",
        "Coverage across all eight Île-de-France départements.",
      ],
      stack: [
        "MERN · Next.js",
        "Node.js",
        "MongoDB",
        "Local SEO",
        "Google Ads",
        "GTM / GA4",
      ],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "internal-lms",
    client: "Lumen Training Institute",
    sector: "LMS / EdTech · MENA",
    outcome:
      "A white-label LMS that onboards a new cohort in minutes, not weeks.",
    caption:
      "Multi-tenant learning platform with SCORM content, progress tracking, and auto-issued certificates for an accredited training provider. Client confidential under NDA.",
    nda: true,
  },
  {
    slug: "zorro-services",
    client: "Zorro Services",
    sector: "Environmental Services · Tunisia",
    outcome:
      "A credibility-first corporate presence for an ANGED-certified environmental firm.",
    caption:
      "Multi-page site that positions a Tunisian B2B services company for institutional and municipal clients.",
    url: "https://zorro-services.vercel.app/",
    caseStudy: {
      seoTitle:
        "Zorro Services — corporate presence for an ANGED-certified firm (case study)",
      metaDescription:
        "A credibility-first, multi-page corporate site positioning an ANGED-certified Tunisian environmental-services firm for institutional and municipal clients.",
      h1: "Zorro Services: a credibility-first presence for a regulated B2B firm",
      intro:
        "Zorro Services is an ANGED-certified environmental-services company in Tunisia selling to institutional and municipal clients. In regulated B2B, the website's job is corporate credibility — the win here is positioning and trust, not a conversion metric.",
      challenge:
        "Give a regulated, certified environmental firm a corporate presence that reads as credible to public-sector and institutional buyers.",
      approach: [
        "Built a multi-page corporate site structured around services, certifications, and references.",
        "Foregrounded the ANGED certification and institutional credibility throughout.",
        "Positioned the brand for B2B, institutional, and municipal procurement audiences.",
      ],
      built: [
        "Multi-page corporate website",
        "Services, certification, and reference architecture",
        "Fast, accessible, SEO-ready",
      ],
      outcome: [
        "A credible, corporate presence aimed at institutional and municipal clients.",
        "Certification and trust signals surfaced where buyers look for them.",
      ],
      stack: ["Next.js", "Corporate site", "SEO"],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "fresh-tenancy",
    client: "Fresh Tenancy",
    sector: "Home Services · United Kingdom",
    outcome: "A booking site engineered around 5-star social proof.",
    caption:
      "End-of-tenancy cleaning service whose homepage converts on trust before it sells on price.",
    url: "https://freshtenancy.com/",
    caseStudy: {
      seoTitle: "Fresh Tenancy — trust-led booking site (case study)",
      metaDescription:
        "An end-of-tenancy cleaning booking site engineered around 5-star social proof — a homepage that converts on trust before it competes on price.",
      h1: "Fresh Tenancy: a booking site that converts on trust, not price",
      intro:
        "Fresh Tenancy is a UK end-of-tenancy cleaning service in a crowded, price-sensitive market. The way to win bookings there isn't the lowest quote — it's trust, built from visible 5-star social proof at the moment of decision.",
      challenge:
        "Win bookings in a price-driven market by leading with credibility — a homepage that earns trust before it talks price, and a booking flow that doesn't lose the customer.",
      approach: [
        "Engineered the homepage around 5-star reviews and social proof, placed where decisions happen.",
        "Designed a clean booking flow that turns trust into a confirmed job.",
        "Kept the site fast and conversion-focused throughout.",
      ],
      built: [
        "Conversion-focused Next.js marketing + booking site",
        "Review / social-proof-led homepage",
        "Streamlined booking flow",
      ],
      outcome: [
        "A homepage that competes on trust before price.",
        "Social proof surfaced at the point of decision.",
        "A booking flow built to convert, not just inform.",
      ],
      stack: [
        "MERN · Next.js",
        "Node.js",
        "MongoDB",
        "Booking flow",
        "Conversion / CRO",
      ],
      relatedService: "mvp-development",
    },
  },
];

/** Non-NDA entries that have a dedicated /work/[slug] case-study page. */
export const caseStudies = work.filter((w) => Boolean(w.caseStudy));

export function getCaseStudy(slug: string): WorkEntry | undefined {
  return caseStudies.find((w) => w.slug === slug);
}

/** Credentials rendered in the About section. */
export type Credential = { period: string; role: string; org: string };

export const credentials: Credential[] = [
  { period: "2023 — Now", role: "Founder & CTO", org: "InnoviaBurst, Tunis" },
  {
    period: "2023 — Now",
    role: "Teacher",
    org: "IMSET (Honoris United)",
  },
  {
    period: "2025 - Now",
    role: "Training Partner",
    org: "Smart Tunisian Technoparks — تونس للأقطاب التكنولوجية",
  },
  {
    period: "Focus",
    role: "Software Architecture",
    org: "End-to-end product delivery",
  },
];
