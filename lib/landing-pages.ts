/**
 * Paid-traffic landing pages under /lp/[slug]. One offer per page, no site
 * navigation, one CTA (to #form) repeated three times. All /lp/* pages are
 * noindex and excluded from the sitemap: they exist for Google Ads, not for
 * organic search. Copy should mirror the ad text in docs/google-ads-plan.md.
 *
 * Structure: pain headline → what you get → proof → price → FAQ → form.
 */

import type { Locale } from "@/lib/i18n";
import type { PriceKind } from "@/lib/pricing";

export type LandingPage = {
  slug: string;
  locale: Locale;
  /** The same offer in the other language, for the hreflang-free switcher. */
  alternate: string;
  kind: PriceKind;
  meta: { title: string; description: string };
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
  painsTitle: string;
  pains: string[];
  getTitle: string;
  get: { title: string; body: string }[];
  proof: { client: string; sector: string; body: string }[];
  faq: { q: string; a: string }[];
  closingTitle: string;
  formTitle: string;
  formBody: string;
};

export const landingPages: LandingPage[] = [
  {
    slug: "technical-audit",
    locale: "en",
    alternate: "audit-technique",
    kind: "audit",
    meta: {
      title: "Technical audit for startups, 2 weeks, fixed price",
      description:
        "A two-week, fixed-price technical audit of your codebase, infrastructure and team. You get a ranked risk register with the fixes in order, in writing.",
    },
    eyebrow: "Technical audit · 2 weeks · fixed price",
    headline:
      "Your codebase is slowing you down. Find out exactly why in two weeks.",
    sub: "I read your code, infrastructure and history, talk to the people who built it, and hand you a ranked list of what to fix first. Fixed scope, fixed price, written report, no lock-in.",
    cta: "Book your audit",
    painsTitle: "Sound familiar?",
    pains: [
      "Every feature takes twice as long as it did a year ago.",
      "A previous team or agency left and you don't trust what they built.",
      "You're raising and an investor is about to look under the hood.",
      "You're weighing a rewrite and need to know what's worth keeping.",
    ],
    getTitle: "What you get at the end of the two weeks",
    get: [
      {
        title: "A prioritised risk register",
        body: "Every finding ranked by impact and effort, with a concrete fix. The five things to do first, in order, and why.",
      },
      {
        title: "Architecture and code quality",
        body: "How the system is really structured, where it will break under growth, and which parts are fine to keep.",
      },
      {
        title: "Security",
        body: "Secrets, authentication, permissions, dependencies with known vulnerabilities, and the web security basics.",
      },
      {
        title: "GDPR and data protection",
        body: "Where personal data lives, which vendors receive it, and the gaps to close before a customer or investor asks.",
      },
      {
        title: "Infrastructure and deployment",
        body: "Hosting, CI/CD, backups, monitoring and cloud costs. What happens on the day something goes down.",
      },
      {
        title: "Tests and team practices",
        body: "Coverage on the paths that make money, code review, and the habits that decide whether the fixes stick.",
      },
    ],
    proof: [
      {
        client: "Facturra",
        sector: "FinTech · France",
        body: "Compliance-grade Factur-X e-invoicing SaaS for the French 2026 mandate. Native EN 16931 engine, FranceConnect Pro onboarding, hosted in France.",
      },
      {
        client: "Sabboura",
        sector: "AI EdTech · Web + Flutter",
        body: "Real-time voice AI tutor with a cost model built in. From first commit to production in under two months, with CI/CD on every push.",
      },
      {
        client: "Guid'Up",
        sector: "Travel · Web + Flutter",
        body: "Took over after an abandoned previous build. App, back-office and site rebuilt from one monorepo, every account in the client's name.",
      },
    ],
    faq: [
      {
        q: "What do you need from us?",
        a: "Read access to the repositories, the cloud console and the CI, plus two or three hours of your team's time across the two weeks for interviews. I work under NDA and my access is removed at the end.",
      },
      {
        q: "Does my team have to stop working during the audit?",
        a: "No. I read and run the code alongside them. The only time I need is the interviews and a few questions in your team chat.",
      },
      {
        q: "What if the codebase turns out to be in good shape?",
        a: "Then you get that in writing, which is worth a lot before a fundraise or an acquisition. The report still ranks the improvements worth making, the list is just shorter.",
      },
      {
        q: "Can you fix what you find?",
        a: "Yes, if you want me to. The report is written so any team can execute it, and the audit can roll into a build or a fractional-CTO retainer. There's no obligation.",
      },
      {
        q: "Which stacks do you audit?",
        a: "JavaScript and TypeScript (Next.js, React, Node, NestJS), Python (Django, FastAPI), PostgreSQL and MongoDB, Flutter and React Native, plus the infrastructure around them. If your stack is outside that, I'll tell you on the first call.",
      },
    ],
    closingTitle:
      "Two weeks from now, you could know exactly what to fix first.",
    formTitle: "Tell me about your codebase",
    formBody:
      "Two minutes. I reply within 48 hours with next steps, or tell you honestly if an audit isn't what you need.",
  },
  {
    slug: "audit-technique",
    locale: "fr",
    alternate: "technical-audit",
    kind: "audit",
    meta: {
      title: "Audit technique de startup en 2 semaines, prix fixe",
      description:
        "Audit technique de votre code, de votre infra et de votre équipe en deux semaines, à prix fixe. Un registre des risques priorisé, corrections dans l'ordre.",
    },
    eyebrow: "Audit technique · 2 semaines · prix fixe",
    headline:
      "Votre code vous ralentit. Sachez exactement pourquoi en deux semaines.",
    sub: "Je lis votre code, votre infrastructure et votre historique, j'échange avec ceux qui l'ont construit, et je vous remets la liste priorisée de ce qu'il faut corriger en premier. Périmètre fixe, prix fixe, rapport écrit, sans engagement.",
    cta: "Réserver mon audit",
    painsTitle: "Ça vous parle ?",
    pains: [
      "Chaque fonctionnalité prend deux fois plus de temps qu'il y a un an.",
      "Une ancienne équipe ou une agence est partie, et vous n'avez pas confiance dans ce qu'elle a laissé.",
      "Vous levez des fonds et un investisseur va regarder sous le capot.",
      "Vous envisagez une refonte et voulez savoir ce qui mérite d'être gardé.",
    ],
    getTitle: "Ce que vous avez entre les mains au bout de deux semaines",
    get: [
      {
        title: "Un registre des risques priorisé",
        body: "Chaque constat classé par impact et par effort, avec une correction concrète. Les cinq chantiers à lancer en premier, dans l'ordre, et pourquoi.",
      },
      {
        title: "Architecture et qualité du code",
        body: "Comment le système est vraiment structuré, où il cassera avec la croissance, et ce qui peut être gardé tel quel.",
      },
      {
        title: "Sécurité",
        body: "Secrets, authentification, droits d'accès, dépendances vulnérables et les bases de la sécurité web.",
      },
      {
        title: "RGPD et protection des données",
        body: "Où se trouvent les données personnelles, quels prestataires les reçoivent, et les écarts à combler avant qu'un client ou un investisseur ne pose la question.",
      },
      {
        title: "Infrastructure et déploiement",
        body: "Hébergement, CI/CD, sauvegardes, supervision et coûts cloud. Ce qui se passe le jour où quelque chose tombe.",
      },
      {
        title: "Tests et pratiques d'équipe",
        body: "La couverture des parcours qui rapportent, la revue de code, et les habitudes qui décident si les corrections tiennent dans le temps.",
      },
    ],
    proof: [
      {
        client: "Facturra",
        sector: "FinTech · France",
        body: "SaaS de facturation électronique Factur-X conforme à la réforme 2026. Moteur EN 16931 natif, onboarding FranceConnect Pro, hébergé en France.",
      },
      {
        client: "Sabboura",
        sector: "EdTech IA · Web + Flutter",
        body: "Tuteur IA vocal en temps réel, avec un modèle de coûts pensé dès le départ. Du premier commit à la production en moins de deux mois, CI/CD à chaque push.",
      },
      {
        client: "Guid'Up",
        sector: "Tourisme · Web + Flutter",
        body: "Reprise après un premier développement abandonné. Application, back-office et site reconstruits depuis un seul monorepo, chaque compte au nom du client.",
      },
    ],
    faq: [
      {
        q: "De quoi avez-vous besoin de notre côté ?",
        a: "Un accès en lecture aux dépôts, à la console cloud et à la CI, plus deux ou trois heures du temps de votre équipe sur les deux semaines pour les entretiens. Je travaille sous NDA et mes accès sont retirés à la fin.",
      },
      {
        q: "Mon équipe doit-elle s'arrêter pendant l'audit ?",
        a: "Non. Je lis et je lance le code en parallèle de leur travail. Je n'ai besoin que des entretiens et de quelques questions sur votre messagerie d'équipe.",
      },
      {
        q: "Et si le code est en bon état ?",
        a: "Alors vous l'avez par écrit, ce qui vaut beaucoup avant une levée ou une acquisition. Le rapport classe quand même les améliorations utiles, la liste est simplement plus courte.",
      },
      {
        q: "Pouvez-vous corriger ce que vous trouvez ?",
        a: "Oui, si vous le souhaitez. Le rapport est rédigé pour que n'importe quelle équipe puisse l'exécuter, et l'audit peut se prolonger en développement ou en mission de CTO à temps partagé. Sans aucune obligation.",
      },
      {
        q: "Quelles technologies auditez-vous ?",
        a: "JavaScript et TypeScript (Next.js, React, Node, NestJS), Python (Django, FastAPI), PostgreSQL et MongoDB, Flutter et React Native, ainsi que l'infrastructure autour. Si votre stack sort de ce cadre, je vous le dis dès le premier appel.",
      },
    ],
    closingTitle:
      "Dans deux semaines, vous pourriez savoir exactement quoi corriger en premier.",
    formTitle: "Parlez-moi de votre code",
    formBody:
      "Deux minutes. Je vous réponds sous 48 heures avec la suite, ou je vous dis franchement si un audit n'est pas ce qu'il vous faut.",
  },
  {
    slug: "fractional-cto",
    locale: "en",
    alternate: "cto-a-temps-partage",
    kind: "cto",
    meta: {
      title: "Fractional CTO for startups, 1 to 2 days a week",
      description:
        "A fractional CTO 1 to 2 days a week: architecture, code review, hiring and a roadmap you can defend to investors. Monthly retainer, EU hours.",
    },
    eyebrow: "Fractional CTO · 1 to 2 days a week",
    headline: "You need a CTO's judgment now. Not a CTO's salary.",
    sub: "I join your team one or two days a week as the senior technical lead: architecture, code review, hiring, and a roadmap you can defend to investors. Monthly retainer, three-month minimum, everything documented and owned by you.",
    cta: "Book a CTO call",
    painsTitle: "Sound familiar?",
    pains: [
      "You're about to build and don't want to build it wrong.",
      "There's no senior engineer in the room to make the hard calls.",
      "Your freelancers or agency ship features, but nobody owns the architecture.",
      "Investors keep asking who your technical lead is.",
    ],
    getTitle: "What a fractional CTO does for you",
    get: [
      {
        title: "Architecture and roadmap",
        body: "The technical decisions and a roadmap you can defend to investors, with the trade-offs written down.",
      },
      {
        title: "Code review and standards",
        body: "Reviews on the code that ships and the engineering habits that raise the whole team, freelancers included.",
      },
      {
        title: "Hiring",
        body: "Defining the roles, running technical interviews and onboarding your first senior engineers.",
      },
      {
        title: "Investor readiness",
        body: "A credible technical lead in the room and a codebase prepared for technical due diligence.",
      },
      {
        title: "EU working hours",
        body: "Based in Tunis, UTC+1. Same clock as Paris in winter, one hour behind in summer. Meetings in French or English.",
      },
      {
        title: "No lock-in",
        body: "Repositories, documents and decisions are yours from day one. Your team gets stronger, not dependent on me.",
      },
    ],
    proof: [
      {
        client: "Sabboura",
        sector: "AI EdTech · Web + Flutter",
        body: "Product and engineering lead on a real-time voice AI tutor: curriculum-faithful lessons, a usage model that keeps AI costs predictable, web and Flutter app in production.",
      },
      {
        client: "Facturra",
        sector: "FinTech · France",
        body: "Architecture for the French 2026 e-invoicing mandate, positioned as a compatible solution connected to an approved platform so customers never get locked in.",
      },
      {
        client: "Guid'Up",
        sector: "Travel · Web + Flutter",
        body: "App, back-office, API and site delivered from one monorepo with CI/CD, and every store and cloud account set up in the client's name.",
      },
    ],
    faq: [
      {
        q: "What does a typical week look like?",
        a: "Usually one fixed day with the team for architecture, planning, reviews and unblocking, then async availability the rest of the week for pull requests, hiring calls and investor questions. We agree the rhythm in the scope.",
      },
      {
        q: "How is this different from hiring a freelance senior developer?",
        a: "A freelance developer builds what you've specified. A fractional CTO decides what should be built, how, and by whom, and is accountable for those calls. I still write code when it's the fastest way to unblock the team.",
      },
      {
        q: "Do you work with non-technical founders?",
        a: "Yes, it's one of the most common setups. I translate technical choices into cost, risk and time, so you can decide without reading the code.",
      },
      {
        q: "Can you help us hire a full-time CTO later?",
        a: "Yes, and that's often the plan. I can define the role, run the technical interviews and hand over, so the person you hire inherits a documented system instead of a mystery.",
      },
      {
        q: "How do we stop if it isn't working?",
        a: "The minimum is three months, then you can pause or end at the checkpoints we agree in the scope. You own every repository, document and decision throughout, so stopping costs you nothing but notice.",
      },
    ],
    closingTitle: "Get the senior technical voice your team doesn't have yet.",
    formTitle: "Tell me where you are",
    formBody:
      "Two minutes. I reply within 48 hours, and if a fractional CTO isn't the right fit, I'll tell you what is.",
  },
  {
    slug: "cto-a-temps-partage",
    locale: "fr",
    alternate: "fractional-cto",
    kind: "cto",
    meta: {
      title: "CTO à temps partagé pour startups, 1 à 2 jours/semaine",
      description:
        "Un CTO à temps partagé 1 à 2 jours par semaine : architecture, revue de code, recrutement et feuille de route défendable devant vos investisseurs.",
    },
    eyebrow: "CTO à temps partagé · 1 à 2 jours par semaine",
    headline: "Il vous faut le jugement d'un CTO maintenant. Pas son salaire.",
    sub: "Je rejoins votre équipe un ou deux jours par semaine comme responsable technique senior : architecture, revue de code, recrutement et une feuille de route que vous pouvez défendre devant vos investisseurs. Forfait mensuel, trois mois minimum, tout est documenté et vous appartient.",
    cta: "Réserver un appel CTO",
    painsTitle: "Ça vous parle ?",
    pains: [
      "Vous allez lancer le développement et ne voulez pas partir dans la mauvaise direction.",
      "Personne de senior dans l'équipe pour trancher les décisions difficiles.",
      "Vos freelances ou votre agence livrent des fonctionnalités, mais personne ne porte l'architecture.",
      "Les investisseurs vous demandent sans cesse qui est votre responsable technique.",
    ],
    getTitle: "Ce que fait un CTO externalisé pour vous",
    get: [
      {
        title: "Architecture et feuille de route",
        body: "Les décisions techniques et une feuille de route défendable devant vos investisseurs, avec les arbitrages écrits noir sur blanc.",
      },
      {
        title: "Revue de code et standards",
        body: "La relecture du code qui part en production et des habitudes d'ingénierie qui font progresser toute l'équipe, freelances compris.",
      },
      {
        title: "Recrutement",
        body: "Définition des postes, entretiens techniques et intégration de vos premiers développeurs seniors.",
      },
      {
        title: "Prêt pour les investisseurs",
        body: "Un responsable technique crédible face aux fonds, et un code préparé pour la due diligence technique.",
      },
      {
        title: "Heures de bureau européennes",
        body: "Basé à Tunis, UTC+1. Même heure qu'à Paris en hiver, une heure de moins en été. Réunions en français ou en anglais.",
      },
      {
        title: "Aucune dépendance",
        body: "Dépôts, documents et décisions vous appartiennent dès le premier jour. Votre équipe gagne en autonomie, elle ne dépend pas de moi.",
      },
    ],
    proof: [
      {
        client: "Sabboura",
        sector: "EdTech IA · Web + Flutter",
        body: "Direction produit et technique d'un tuteur IA vocal en temps réel : des leçons fidèles au programme, un modèle d'usage qui garde les coûts d'IA prévisibles, une app web et Flutter en production.",
      },
      {
        client: "Facturra",
        sector: "FinTech · France",
        body: "Architecture pensée pour la réforme de la facturation électronique 2026, en solution compatible connectée à une Plateforme Agréée, pour que les clients ne soient jamais captifs.",
      },
      {
        client: "Guid'Up",
        sector: "Tourisme · Web + Flutter",
        body: "Application, back-office, API et site livrés depuis un seul monorepo avec CI/CD, et chaque compte store et cloud créé au nom du client.",
      },
    ],
    faq: [
      {
        q: "À quoi ressemble une semaine type ?",
        a: "En général, une journée fixe avec l'équipe pour l'architecture, la planification, les revues et le déblocage, puis une disponibilité asynchrone le reste de la semaine pour les pull requests, les entretiens de recrutement et les questions des investisseurs. Le rythme est fixé dans le périmètre.",
      },
      {
        q: "Quelle différence avec un CTO freelance ou un développeur senior freelance ?",
        a: "Un développeur freelance construit ce que vous avez spécifié. Un CTO à temps partagé décide de ce qu'il faut construire, comment et par qui, et il répond de ces choix. J'écris encore du code quand c'est le moyen le plus rapide de débloquer l'équipe.",
      },
      {
        q: "Travaillez-vous avec des fondateurs non techniques ?",
        a: "Oui, c'est même l'un des cas les plus fréquents. Je traduis les choix techniques en coûts, en risques et en délais, pour que vous puissiez décider sans lire le code.",
      },
      {
        q: "Pouvez-vous nous aider à recruter un CTO à temps plein plus tard ?",
        a: "Oui, c'est souvent le plan. Je peux définir le poste, mener les entretiens techniques et assurer la passation, pour que la personne recrutée hérite d'un système documenté plutôt que d'une boîte noire.",
      },
      {
        q: "Comment arrêter si ça ne fonctionne pas ?",
        a: "Le minimum est de trois mois, ensuite vous pouvez mettre en pause ou arrêter aux points d'étape fixés dans le périmètre. Dépôts, documents et décisions vous appartiennent du début à la fin, arrêter ne vous coûte qu'un préavis.",
      },
    ],
    closingTitle:
      "Offrez à votre équipe la voix technique senior qui lui manque.",
    formTitle: "Dites-moi où vous en êtes",
    formBody:
      "Deux minutes. Je vous réponds sous 48 heures, et si un CTO à temps partagé n'est pas la bonne solution, je vous dis laquelle l'est.",
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((p) => p.slug === slug);
}
