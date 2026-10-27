/**
 * Long-form FAQ hub behind /faq and /fr/faq (FAQPage JSON-LD). Answers are
 * written answer-first: the first sentence stands on its own when quoted.
 */

import type { Locale } from "@/lib/i18n";

export type HubFaq = {
  q: string;
  a: string;
  /** Optional follow-up link rendered under the answer. */
  link?: { href: string; label: string };
};

export type HubGroup = { id: string; title: string; items: HubFaq[] };

export const faqHub: Record<Locale, HubGroup[]> = {
  en: [
    {
      id: "fractional-cto",
      title: "Fractional CTO",
      items: [
        {
          q: "What is a fractional CTO?",
          a: "A fractional CTO is a senior engineering leader who works with your startup part-time, usually 1 to 2 days a week, and takes real responsibility for the technical side of the company. That means architecture, code review, technical hiring, security and the roadmap, decided by someone who has shipped products to production before. You get the judgment of a CTO without the salary, equity and long search of a full-time hire. In my case the engagement is a monthly retainer with a 3-month minimum, and everything I produce, from repositories to decision records, belongs to you from day one.",
          link: {
            href: "/services/fractional-cto",
            label: "How the fractional CTO engagement works",
          },
        },
        {
          q: "What does a fractional CTO actually do in a week?",
          a: "A fractional CTO's week is split between decisions, reviews and people, packed into 1 to 2 days of focused time. In a typical week I review the pull requests that matter, unblock the engineers on architecture questions, update the roadmap with the founders and check that production is healthy. Some weeks lean towards hiring: writing the job spec, running technical interviews, onboarding the new engineer. Other weeks go into one specific risk, like a slow database or a security gap. Between those days I stay reachable on Slack for short questions, so the team doesn't wait a week for an answer.",
        },
        {
          q: "Fractional CTO vs full-time CTO vs freelancer vs agency: which do I need?",
          a: "A fractional CTO gives you senior technical leadership part-time, a full-time CTO gives you the same leadership as a permanent hire, a freelance developer gives you hands on the code, and an agency gives you a delivered project. The right choice depends on what's missing. If you lack direction, architecture and someone accountable for engineering, you need a CTO, fractional until full-time is justified. If the direction is clear and you lack capacity, a freelancer or an agency adds output. Most pre-seed and seed startups need direction first, because extra capacity pointed the wrong way just builds the wrong thing faster.",
        },
        {
          q: "When does a startup need a fractional CTO?",
          a: "A startup needs a fractional CTO when technical decisions are being made without anyone senior enough to make them well. The usual triggers are clear: you're about to build an MVP and don't want to build it wrong, the product you shipped keeps breaking, your two or three developers have no senior to review their work, investors ask technical questions you can't answer, or a freelancer or agency is about to hand over a codebase you can't judge. If none of those apply and the team ships reliably, you probably don't need one yet.",
          link: { href: "/#contact", label: "Tell me where you're stuck" },
        },
        {
          q: "How do I know if my fractional CTO is actually working?",
          a: "A fractional CTO is working when the team ships more predictably and the founders make fewer technical decisions blind. After the first month you should see concrete things: a written architecture and roadmap, code review on every change, a deployment process that doesn't depend on one person, and a short list of risks being fixed in order. After three months, releases should be calmer, hiring should be moving, and you should be able to explain your stack to an investor. If you can't point to decisions and documents your CTO produced, ask for them at the next checkpoint.",
        },
      ],
    },
    {
      id: "pricing",
      title: "Pricing and engagement",
      items: [
        {
          q: "How much does a fractional CTO cost in France?",
          a: "A fractional CTO in France is usually paid as a monthly retainer for 1 to 2 days a week, and typical freelance CTO day rates on Malt run roughly €700 to €1,500, which puts the market at about €3,000 to €10,000 a month. Treat that as a range, not a quote. I price ongoing leadership as a monthly retainer with a 3-month minimum, and one-off work like a technical audit or an MVP as a fixed fee for a fixed scope. My starting prices are in the pricing box on each service page, and you get the final figure in writing before any work starts.",
          link: {
            href: "/services/fractional-cto#pricing",
            label: "See fractional CTO pricing",
          },
        },
        {
          q: "Why charge a fixed fee for an audit or MVP instead of a day rate?",
          a: "A fixed fee for a fixed scope means you know exactly what you're buying, by when and for how much, before any work starts. Every technical audit and MVP build I run starts with a written scope listing what's included, what's excluded and what the deliverable looks like, and the price doesn't move once that scope is agreed. If something new comes up mid-project, we decide together whether it replaces something in scope or goes into a later phase, instead of the bill quietly growing. For a founder managing runway, a number that can't drift is worth more than an estimate that can.",
          link: {
            href: "/services/technical-audit#pricing",
            label: "See technical audit pricing",
          },
        },
        {
          q: "What's included in a fractional CTO retainer?",
          a: "A fractional CTO retainer includes the senior technical work a full-time CTO would do, scaled to the 1 to 2 days a week you book. With me that covers architecture decisions, code review and engineering standards, the technical roadmap, help hiring and onboarding engineers, security and GDPR oversight, and being the technical voice in investor conversations. It also includes short async answers on Slack or email between working days. Heavy build work, like writing a whole new module, is usually scoped separately so the retainer stays focused on leadership. Everything produced under the retainer belongs to you.",
        },
        {
          q: "How do I stop a fractional CTO engagement, and is there lock-in?",
          a: "A fractional CTO engagement with me stops at an agreed checkpoint, with no lock-in, once the 3-month minimum has run. We set the checkpoints in writing at the start, and at any of them you can pause, reduce the days or stop. Because you own the repositories, cloud accounts, domains and documentation from day one, stopping means a handover call, not a negotiation. The goal of the retainer is a team that can run without me, so ending it on schedule is a good outcome, not a failure.",
        },
        {
          q: "Is a fractional CTO cheaper than hiring a full-time CTO?",
          a: "A fractional CTO is cheaper than a full-time CTO for most early-stage startups, because you pay for 1 to 2 days a week instead of a full salary, employer charges, equity and a long recruitment. In my experience, an experienced CTO for a seed-stage startup in France often costs somewhere around €80,000 to €130,000 gross a year, and employer contributions add roughly 40 to 45 percent on top, before equity. A fractional retainer costs a fraction of that. The trade-off is availability: a full-time CTO is there every day. In my view, once you have around five engineers, a full-time hire starts to make sense.",
        },
      ],
    },
    {
      id: "audit",
      title: "Technical audits and due diligence",
      items: [
        {
          q: "What is a technical audit of a startup's codebase?",
          a: "A technical audit is a structured review of a startup's codebase, infrastructure and engineering practices that tells you what is risky, what is slowing you down and what to fix first. Mine runs for two weeks at a fixed scope and a fixed fee. I read the code and its history, check the infrastructure and deployment pipeline, look at security and GDPR, and talk to the people who built it. The result is a prioritised risk register you can act on, not a vague score. Founders usually ask for one before fundraising, before a rewrite, or after inheriting code from a team that left.",
          link: {
            href: "/services/technical-audit",
            label: "How the technical audit works",
          },
        },
        {
          q: "What's in a codebase audit report?",
          a: "A codebase audit report is a prioritised risk register covering architecture, security, GDPR and data protection, infrastructure, tests and team practices. Each finding states what I found, why it matters, how severe it is, how much effort the fix takes and the concrete fix I recommend. Findings are ranked by impact and effort, so the top of the list shows what to fix this month and the bottom shows what can wait. The report is written for two audiences: precise enough for your engineers to act on, and clear enough for a founder or investor to read. A walkthrough call goes through it with you.",
        },
        {
          q: "How long does a technical audit take and how are the two weeks spent?",
          a: "A technical audit with me takes two weeks: roughly one week of reading and testing, then one week of verifying findings and writing the report. The first days go into access, a kickoff call and reading the architecture, the code and the git history. Then I review the infrastructure, the deployment pipeline, security and data handling, and reproduce the problems that matter. During the second week I talk to the people who built the system, check my conclusions against what they know, rank every finding and write the fixes. The engagement closes with the report and a walkthrough call.",
        },
        {
          q: "What do investors check in technical due diligence before a seed round?",
          a: "Technical due diligence before a seed round checks whether the product can survive growth and whether the company really owns it. Reviewers look at six areas: architecture, security, GDPR and data handling, infrastructure and deployments, tests and code quality, and team and IP ownership. Typical red flags are secrets in the git history, backups nobody has ever restored, one person who holds everything in their head, and an agency that still owns the GitHub organisation. I wrote these up as a free 25-point checklist you can run with your lead engineer in an afternoon, before the data room opens.",
          link: {
            href: "/checklist",
            label: "Get the free due-diligence checklist",
          },
        },
        {
          q: "Does my team need to stop work during a code audit?",
          a: "A code audit doesn't require your team to stop working, and it shouldn't, because I want to see how the team ships normally. What I need is read access to the repositories, the infrastructure and the tools you use, plus a few hours of your engineers' time spread over the two weeks: a kickoff, one or two interviews and quick answers to questions. I don't push code or change production during the audit. Everything I access is covered by an NDA, and access is removed when the engagement ends. For most teams the cost is a few hours of interviews, not a lost sprint.",
        },
      ],
    },
    {
      id: "nearshore",
      title: "Nearshore, GDPR and working together",
      items: [
        {
          q: "Why do European startups use nearshore development in Tunisia?",
          a: "Nearshore development in Tunisia means working with engineers based in Tunisia, two to three hours' flight from most of Western Europe and on almost the same clock. European startups use it for three reasons: senior engineers cost less than in Paris, Berlin or Amsterdam, working hours overlap fully with the EU, and French is widely used in tech alongside English and Arabic. The difference with far offshore is that you work as one team, with live calls and same-day code review, instead of handing off specs overnight. I've shipped 20+ products from Tunis for clients in France, Tunisia and the UK.",
          link: {
            href: "/work/facturra",
            label: "Read the Facturra case study",
          },
        },
        {
          q: "What time zone is Tunisia in compared to Paris?",
          a: "Tunisia is on UTC+1 all year and does not use daylight saving time, so Tunis has the same clock as Paris in winter and is one hour behind Paris in summer. From late March to late October, when France switches to CEST (UTC+2), 10:00 in Paris is 09:00 in Tunis. The rest of the year the clocks match exactly. The same applies to Berlin, Amsterdam and Madrid. In practice a normal working day in Tunis covers a normal working day in Paris all year, with at most one hour of offset to plan meetings around.",
        },
        {
          q: "Is it GDPR compliant to outsource development to Tunisia?",
          a: "Outsourcing development to Tunisia can be GDPR compliant, but it needs the right contracts and setup because Tunisia has no EU adequacy decision. When an engineer in Tunisia can access personal data of EU users, even just by logging into a server hosted in Europe, that counts as a transfer outside the EU. The standard way to cover it is a data processing agreement plus the European Commission's standard contractual clauses, with a transfer impact assessment. On top of the paperwork I keep data hosted in the EU, give engineers least-privilege access, and work on anonymised or test data whenever production data isn't needed.",
          link: {
            href: "/checklist",
            label: "Check your GDPR basics with the checklist",
          },
        },
        {
          q: "Can I work with a developer in Tunisia in French or English?",
          a: "Working with a developer in Tunisia in French or English is normal, and with me you can choose French, English or Arabic for meetings, code reviews and documentation. French is widely used in Tunisian business and tech, and engineers work daily in English, since code, tooling and technical documentation are in English anyway. I teach computer science and run workshops in both French and English, and I write specs, tickets and handover documents in whichever language your team uses. Mixed teams work too: a French founder, an English-speaking investor and Arabic-speaking users can each get material in their own language.",
        },
        {
          q: "Do I own the code if I outsource development, and will you sign an NDA?",
          a: "You own the code, the infrastructure and the documentation from day one when you work with me, and I'm happy to sign an NDA before you share anything confidential. Put that ownership in writing as an IP assignment in the contract, because investors check it during due diligence. In practice the repositories live in your GitHub or GitLab organisation, the cloud, domain and app store accounts are in your company's name, and I work on them with access you control. When the engagement ends, you remove my access and nothing needs to be transferred. Most of my recent client work is covered by NDAs.",
          link: { href: "/#contact", label: "Ask for an NDA before we talk" },
        },
      ],
    },
    {
      id: "mvp",
      title: "MVP builds and AI",
      items: [
        {
          q: "Can you really build an MVP in 4 weeks, and what fits in that time?",
          a: "An MVP in 4 weeks is realistic when the scope is one core user journey, written down and agreed before the first line of code. In about four weeks of fixed-scope work that usually covers sign-up and login, the main data model, the workflow that proves your idea, an admin view, emails or basic payments, and a production deployment with CI/CD. What doesn't fit: several user roles with separate apps, native apps on both stores, complex legacy integrations, offline mode and heavy reporting. Those need more weeks, and I'll say so in the written scope instead of discovering it in week three.",
          link: {
            href: "/services/mvp-development",
            label: "How the 4-week MVP build works",
          },
        },
        {
          q: "What tech stack should I use for my MVP?",
          a: "The best stack for an MVP is a mainstream one that your future hires already know and that won't need a rewrite at the first sign of traction. For most web products I build with Next.js and React on the front, Node.js with NestJS or Express, or Python with Django or FastAPI on the back, on PostgreSQL or MongoDB depending on the data. For mobile I use Flutter or React Native, so one codebase covers Android and iOS. Deployments run through GitHub Actions to a VPS, or to OVHcloud when EU hosting matters. I avoid exotic frameworks: being able to hire for the stack matters more than saving a week.",
        },
        {
          q: "Can AI build my MVP, or do I still need a senior developer?",
          a: "AI coding tools can write a large share of an MVP's code, but a senior developer is still needed to decide what to build, how to structure it and whether the generated code is safe to ship. I use agentic coding daily, and on Sabboura it helped take the product from first commit to production in under two months by running milestones in parallel. What AI doesn't do reliably is architecture, data modelling, security, permission checks and noticing when a plausible answer is wrong. Unreviewed AI code tends to work in the demo and fail on real users, which is exactly what a senior review catches.",
          link: {
            href: "/work/sabboura",
            label: "Read the Sabboura case study",
          },
        },
        {
          q: "What happens after my MVP launches?",
          a: "After an MVP launches, you own everything and choose how it grows: in-house, with a fractional CTO, or with another team. The repositories, infrastructure and documentation are in your name from day one, so there is nothing to hand back. The first weeks after launch are usually about fixing what real users reveal, watching errors and costs, and deciding what goes into version two based on actual usage, not guesses. You can keep me on a fractional CTO retainer for that phase, 1 to 2 days a week, or hire your first engineer and get a clean handover from me.",
          link: {
            href: "/services/fractional-cto",
            label: "Grow it with a fractional CTO",
          },
        },
        {
          q: "How do I migrate my app off Bubble, no-code or Firebase?",
          a: "Migrating an app off Bubble, another no-code tool or Firebase works best as a planned rebuild of the core, done in stages, while the old version keeps running. I start by mapping what the current app actually does, including the hidden logic in workflows, rules and plugins, then I export the data and check its quality. Next I rebuild on a standard stack such as Next.js and PostgreSQL, migrate users and data with a script you can run more than once, and switch over when the new version matches. Founders usually migrate when costs, performance limits or investor questions about lock-in start to hurt.",
        },
      ],
    },
  ],
  fr: [
    {
      id: "fractional-cto",
      title: "CTO à temps partagé",
      items: [
        {
          q: "Qu'est-ce qu'un CTO à temps partagé ?",
          a: "Un CTO à temps partagé est un responsable technique senior qui travaille pour votre startup à temps partiel, en général 1 à 2 jours par semaine, et qui porte réellement la responsabilité technique de l'entreprise. Concrètement : l'architecture, la revue de code, le recrutement technique, la sécurité et la roadmap, décidés par quelqu'un qui a déjà mis des produits en production. Vous avez le jugement d'un CTO sans le salaire, l'equity et les mois de recrutement d'un CTO à plein temps. Chez moi, c'est un forfait mensuel avec un engagement minimum de 3 mois, et tout ce que je produis vous appartient dès le premier jour.",
          link: {
            href: "/fr/services/fractional-cto",
            label: "Comment fonctionne la mission de CTO à temps partagé",
          },
        },
        {
          q: "Que fait un CTO externalisé en une semaine ?",
          a: "Un CTO externalisé partage sa semaine entre décisions, revues et accompagnement de l'équipe, le tout concentré sur 1 à 2 jours de travail. Une semaine type, je relis les pull requests importantes, je débloque les développeurs sur les questions d'architecture, je mets à jour la roadmap avec les fondateurs et je vérifie que la production se porte bien. Certaines semaines sont consacrées au recrutement : fiche de poste, entretiens techniques, intégration du nouveau développeur. D'autres partent sur un risque précis, comme une base de données lente ou une faille de sécurité. Entre ces jours, je reste joignable sur Slack pour les questions courtes, pour que l'équipe n'attende pas une semaine.",
        },
        {
          q: "CTO à temps partagé, CTO salarié, développeur freelance ou agence : que choisir ?",
          a: "Un CTO à temps partagé apporte une direction technique senior à temps partiel, un CTO salarié apporte la même direction en poste permanent, un développeur freelance apporte des bras sur le code, et une agence livre un projet. Le bon choix dépend de ce qui vous manque. S'il vous manque une direction et quelqu'un de responsable de la technique, il vous faut un CTO, à temps partagé tant qu'un plein temps ne se justifie pas. Si la direction est claire et qu'il vous manque de la capacité, un freelance ou une agence ajoute de la production. La plupart des startups en seed ont d'abord besoin de direction : sans elle, plus de capacité construit juste le mauvais produit plus vite.",
        },
        {
          q: "À quel moment une startup a-t-elle besoin d'un CTO freelance ?",
          a: "Une startup a besoin d'un CTO freelance quand des décisions techniques se prennent sans personne d'assez senior pour bien les prendre. Les déclencheurs sont assez nets : vous allez lancer un MVP et ne voulez pas le construire de travers, le produit en ligne casse régulièrement, vos deux ou trois développeurs n'ont aucun senior pour relire leur travail, les investisseurs posent des questions techniques auxquelles vous ne savez pas répondre, ou un prestataire s'apprête à vous remettre un code que vous ne savez pas évaluer. Si rien de tout cela ne vous parle et que l'équipe livre de façon fiable, vous n'en avez probablement pas encore besoin.",
          link: { href: "/fr#contact", label: "Me dire où vous bloquez" },
        },
        {
          q: "Comment savoir si mon CTO à temps partagé fait du bon travail ?",
          a: "Un CTO à temps partagé fait du bon travail quand l'équipe livre de façon plus prévisible et que les fondateurs prennent moins de décisions techniques à l'aveugle. Au bout d'un mois, vous devez voir des choses concrètes : une architecture et une roadmap écrites, une revue de code sur chaque changement, un déploiement qui ne dépend plus d'une seule personne et une courte liste de risques traités dans l'ordre. Au bout de trois mois, les mises en production doivent être plus calmes, le recrutement doit avancer, et vous devez pouvoir expliquer votre stack à un investisseur. Si vous ne pouvez citer aucune décision ni aucun document produit par votre CTO, demandez-les au prochain point d'étape.",
        },
      ],
    },
    {
      id: "pricing",
      title: "Tarifs et engagement",
      items: [
        {
          q: "Combien coûte un CTO à temps partagé ?",
          a: "Un CTO à temps partagé se paie en général au forfait mensuel pour 1 à 2 jours par semaine, et les TJM courants des CTO freelance sur Malt se situent à peu près entre 700 et 1 500 €, soit un marché d'environ 3 000 à 10 000 € par mois. C'est une fourchette, pas un devis. Je facture la direction technique au forfait mensuel avec un engagement minimum de 3 mois, et les missions ponctuelles, comme un audit technique ou un MVP, au prix fixe pour un périmètre fixe. Mes prix de départ figurent dans l'encadré tarifs de chaque page de service, et vous recevez le chiffre final par écrit avant le début du travail.",
          link: {
            href: "/fr/services/fractional-cto#pricing",
            label: "Voir les tarifs du CTO à temps partagé",
          },
        },
        {
          q: "Pourquoi un prix fixe pour un audit ou un MVP plutôt qu'un TJM ?",
          a: "Un prix fixe pour un périmètre fixe vous permet de savoir exactement ce que vous achetez, pour quand et pour combien, avant que le travail commence. Chaque audit technique et chaque MVP démarre par un périmètre écrit : ce qui est inclus, ce qui ne l'est pas et à quoi ressemble le livrable. Une fois ce périmètre validé, le prix ne bouge plus. Si un nouveau besoin apparaît en cours de route, on décide ensemble s'il remplace quelque chose du périmètre ou s'il part dans une phase suivante, au lieu de laisser la facture gonfler en silence. Quand on gère sa trésorerie au mois près, un chiffre qui ne peut pas dériver vaut plus qu'une estimation qui peut.",
          link: {
            href: "/fr/services/technical-audit#pricing",
            label: "Voir les tarifs de l'audit technique",
          },
        },
        {
          q: "Qu'est-ce qui est inclus dans le forfait d'un CTO à temps partagé ?",
          a: "Le forfait d'un CTO à temps partagé couvre le travail technique senior que ferait un CTO à plein temps, ramené aux 1 à 2 jours par semaine réservés. Avec moi, cela comprend les décisions d'architecture, la revue de code et les standards d'ingénierie, la roadmap technique, l'aide au recrutement et à l'intégration des développeurs, le suivi de la sécurité et du RGPD, et le rôle d'interlocuteur technique face aux investisseurs. Le forfait inclut aussi des réponses courtes sur Slack ou par email entre les jours de travail. Les gros chantiers de développement, comme un nouveau module complet, sont en général chiffrés à part. Tout ce qui est produit vous appartient.",
        },
        {
          q: "Comment arrêter une mission de CTO externalisé, et y a-t-il un engagement ?",
          a: "Une mission de CTO externalisé avec moi s'arrête à un point d'étape convenu, sans dépendance, une fois passé l'engagement minimum de 3 mois. Les points d'étape sont fixés par écrit dès le départ, et à chacun d'eux vous pouvez mettre en pause, réduire le nombre de jours ou arrêter. Comme vous êtes propriétaire des dépôts, des comptes cloud, des domaines et de la documentation dès le premier jour, arrêter signifie un appel de passation, pas une négociation. L'objectif du forfait est une équipe capable d'avancer sans moi : y mettre fin au moment prévu est une réussite, pas un échec.",
        },
        {
          q: "Un CTO à temps partagé coûte-t-il moins cher qu'un CTO salarié ?",
          a: "Un CTO à temps partagé coûte moins cher qu'un CTO salarié pour la plupart des jeunes startups, parce que vous payez 1 à 2 jours par semaine au lieu d'un salaire complet, des charges, de l'equity et un long recrutement. D'après ce que je vois, un CTO expérimenté en seed coûte souvent 80 000 à 130 000 € brut par an en France, et les charges patronales ajoutent à peu près 40 à 45 %, hors equity. Un forfait à temps partagé en coûte une fraction. La contrepartie, c'est la disponibilité : un CTO salarié est là tous les jours. À mon avis, à partir de cinq développeurs environ, une embauche à plein temps commence à se justifier.",
        },
      ],
    },
    {
      id: "audit",
      title: "Audit technique et due diligence",
      items: [
        {
          q: "Qu'est-ce qu'un audit technique de startup ?",
          a: "Un audit technique de startup est une revue structurée du code, de l'infrastructure et des pratiques d'ingénierie qui vous dit ce qui est risqué, ce qui vous ralentit et ce qu'il faut corriger en premier. Le mien dure deux semaines, avec un périmètre fixe et un prix fixe. Je lis le code et son historique, je vérifie l'infrastructure et le pipeline de déploiement, j'examine la sécurité et le RGPD, et je parle avec les personnes qui ont construit le produit. Le résultat est un registre de risques priorisé sur lequel vous pouvez agir, pas une note vague. On le demande souvent avant une levée, avant une réécriture ou après avoir hérité du code d'une équipe partie.",
          link: {
            href: "/fr/services/technical-audit",
            label: "Comment se déroule l'audit technique",
          },
        },
        {
          q: "Que contient le rapport d'un audit de code ?",
          a: "Le rapport d'un audit de code est un registre de risques priorisé qui couvre l'architecture, la sécurité, le RGPD et la protection des données, l'infrastructure, les tests et les pratiques de l'équipe. Chaque constat indique ce que j'ai trouvé, pourquoi c'est important, sa gravité, l'effort nécessaire pour le corriger et la correction concrète que je recommande. Les constats sont classés par impact et par effort : le haut de la liste montre ce qu'il faut corriger ce mois-ci, le bas ce qui peut attendre. Le rapport est écrit pour deux publics, assez précis pour vos développeurs et assez clair pour un fondateur ou un investisseur. Un appel de restitution permet de le parcourir ensemble.",
        },
        {
          q: "Combien de temps dure un audit technique, et comment se passent les deux semaines ?",
          a: "Un audit technique avec moi dure deux semaines : environ une semaine de lecture et de tests, puis une semaine de vérification des constats et de rédaction du rapport. Les premiers jours servent aux accès, à un appel de lancement et à la lecture de l'architecture, du code et de l'historique git. Ensuite, je passe en revue l'infrastructure, le pipeline de déploiement, la sécurité et le traitement des données, et je reproduis les problèmes qui comptent. La deuxième semaine, je parle avec les personnes qui ont construit le système, je confronte mes conclusions à ce qu'elles savent, je classe chaque constat et je rédige les corrections. L'audit se termine par le rapport et un appel de restitution.",
        },
        {
          q: "Que vérifient les investisseurs lors d'une due diligence technique avant une levée seed ?",
          a: "Une due diligence technique avant une levée seed vérifie que le produit peut encaisser la croissance et que la société en est vraiment propriétaire. Les relecteurs regardent six domaines : architecture, sécurité, RGPD et données, infrastructure et déploiements, tests et qualité du code, équipe et propriété intellectuelle. Les signaux d'alerte classiques : des secrets dans l'historique git, des sauvegardes jamais restaurées, une seule personne qui a tout en tête, une agence encore propriétaire de l'organisation GitHub. J'ai rassemblé ces points dans une checklist gratuite de 25 points, à passer en revue avec votre lead dev en un après-midi, avant l'ouverture de la data room.",
          link: {
            href: "/fr/checklist",
            label: "Télécharger la checklist due diligence technique",
          },
        },
        {
          q: "Faut-il arrêter le travail de l'équipe pendant un audit de code ?",
          a: "Un audit de code n'oblige pas votre équipe à s'arrêter, et c'est même préférable, car je veux voir comment elle livre d'habitude. J'ai besoin d'un accès en lecture aux dépôts, à l'infrastructure et à vos outils, et de quelques heures du temps de vos développeurs réparties sur les deux semaines : un appel de lancement, un ou deux entretiens et des réponses rapides à mes questions. Je ne pousse pas de code et je ne touche pas à la production pendant l'audit. Tout ce à quoi j'accède est couvert par un NDA, et les accès sont retirés à la fin de la mission. Pour la plupart des équipes, le coût se résume à quelques heures d'entretiens, pas à un sprint perdu.",
        },
      ],
    },
    {
      id: "nearshore",
      title: "Nearshore, RGPD et collaboration",
      items: [
        {
          q: "Pourquoi choisir le développement nearshore en Tunisie ?",
          a: "Le développement nearshore en Tunisie consiste à travailler avec des ingénieurs basés en Tunisie, à deux ou trois heures d'avion de la plupart des villes d'Europe de l'Ouest et quasiment à la même heure. Les startups européennes le choisissent pour trois raisons : des ingénieurs seniors moins chers qu'à Paris, Berlin ou Amsterdam, des horaires qui recoupent entièrement ceux de l'UE, et un français très présent dans la tech, à côté de l'anglais et de l'arabe. La différence avec l'offshore lointain : vous travaillez comme une seule équipe, avec des appels en direct et des revues de code le jour même. J'ai livré plus de 20 produits depuis Tunis, pour des clients en France, en Tunisie et au Royaume-Uni.",
          link: {
            href: "/fr/work/facturra",
            label: "Lire l'étude de cas Facturra",
          },
        },
        {
          q: "Quel est le décalage horaire entre la Tunisie et Paris ?",
          a: "La Tunisie est à UTC+1 toute l'année et n'applique pas l'heure d'été, donc Tunis a la même heure que Paris en hiver et une heure de moins que Paris en été. De fin mars à fin octobre, quand la France passe à l'heure d'été (UTC+2), 10 h à Paris correspondent à 9 h à Tunis. Le reste de l'année, les horloges sont identiques. Il en va de même pour Berlin, Amsterdam et Madrid. En pratique, une journée de travail à Tunis couvre une journée de travail à Paris toute l'année, avec au plus une heure de décalage à prendre en compte pour caler les réunions.",
        },
        {
          q: "Est-ce conforme au RGPD de sous-traiter son développement en Tunisie ?",
          a: "Sous-traiter son développement en Tunisie peut être conforme au RGPD, à condition de bien cadrer les contrats et les accès, car la Tunisie ne bénéficie d'aucune décision d'adéquation de l'UE. Dès qu'un développeur en Tunisie peut accéder à des données personnelles d'utilisateurs européens, même en se connectant à un serveur hébergé en Europe, il s'agit d'un transfert hors UE. La solution classique : un contrat de sous-traitance (DPA) et les clauses contractuelles types de la Commission européenne, avec une analyse d'impact du transfert. En plus des papiers, je garde les données hébergées dans l'UE, je donne des accès au strict nécessaire, et je travaille sur des données anonymisées ou de test dès que la production n'est pas indispensable.",
          link: {
            href: "/fr/checklist",
            label: "Vérifier vos bases RGPD avec la checklist",
          },
        },
        {
          q: "Peut-on travailler en français avec un développeur en Tunisie ?",
          a: "Travailler en français avec un développeur en Tunisie est tout à fait courant, et avec moi vous choisissez le français, l'anglais ou l'arabe pour les réunions, les revues de code et la documentation. Le français est très présent dans les affaires et la tech en Tunisie, et les ingénieurs travaillent tous les jours en anglais, puisque le code, les outils et la documentation technique le sont déjà. J'enseigne l'informatique et j'anime des formations en français comme en anglais, et je rédige les specs, les tickets et les documents de passation dans la langue de votre équipe. Les équipes mixtes fonctionnent aussi : fondateur français, investisseur anglophone et utilisateurs arabophones ont chacun des documents dans leur langue.",
        },
        {
          q: "Suis-je propriétaire du code si je sous-traite mon développement, et signez-vous un NDA ?",
          a: "Vous êtes propriétaire du code, de l'infrastructure et de la documentation dès le premier jour quand vous travaillez avec moi, et je signe volontiers un NDA avant que vous partagiez quoi que ce soit de confidentiel. Faites inscrire cette propriété dans le contrat sous forme de cession de droits, car les investisseurs la vérifient en due diligence. En pratique, les dépôts sont dans votre organisation GitHub ou GitLab, les comptes cloud, domaines et stores sont au nom de votre société, et j'y travaille avec des accès que vous contrôlez. À la fin de la mission, vous retirez mes accès et rien n'est à transférer. La plupart de mes missions récentes sont couvertes par un NDA.",
          link: {
            href: "/fr#contact",
            label: "Demander un NDA avant d'en parler",
          },
        },
      ],
    },
    {
      id: "mvp",
      title: "MVP et IA",
      items: [
        {
          q: "Peut-on vraiment créer un MVP en 4 semaines, et qu'est-ce qui tient dans ce délai ?",
          a: "Un MVP en 4 semaines est réaliste quand le périmètre se limite à un parcours utilisateur principal, écrit et validé avant la première ligne de code. En quatre semaines environ à périmètre fixe, cela couvre l'inscription et la connexion, le modèle de données principal, le parcours qui prouve votre idée, une vue d'administration, les emails ou un paiement simple, et une mise en production avec CI/CD. Ce qui ne tient pas : plusieurs rôles avec des applications séparées, des applications natives sur les deux stores, des intégrations lourdes avec l'existant, le mode hors ligne et le reporting avancé. Cela demande plus de semaines, et je l'écris dans le périmètre plutôt que de le découvrir en semaine trois.",
          link: {
            href: "/fr/services/mvp-development",
            label: "Comment se déroule un MVP en 4 semaines",
          },
        },
        {
          q: "Quelle stack technique choisir pour son MVP ?",
          a: "La meilleure stack pour un MVP est une stack courante, que vos futurs recrutés connaissent déjà et qui ne demandera pas de réécriture aux premiers signes de traction. Pour la plupart des produits web, je travaille avec Next.js et React côté front, Node.js avec NestJS ou Express, ou Python avec Django ou FastAPI côté back, sur PostgreSQL ou MongoDB selon les données. Pour le mobile, j'utilise Flutter ou React Native, pour qu'une seule base de code couvre Android et iOS. Les déploiements passent par GitHub Actions vers un VPS, ou vers OVHcloud quand l'hébergement dans l'UE compte. J'évite les frameworks exotiques : pouvoir recruter sur la stack compte plus que gagner une semaine.",
        },
        {
          q: "L'IA peut-elle coder mon MVP, ou ai-je encore besoin d'un développeur senior ?",
          a: "Les outils de code assisté par IA peuvent écrire une grande partie du code d'un MVP, mais un développeur senior reste nécessaire pour décider quoi construire, comment le structurer et si le code généré peut partir en production. J'utilise le développement agentique tous les jours, et sur Sabboura il a permis de passer du premier commit à la production en moins de deux mois, en menant plusieurs jalons en parallèle. Ce que l'IA ne fait pas de façon fiable : l'architecture, la modélisation des données, la sécurité, les contrôles de droits, et repérer quand une réponse plausible est fausse. Du code IA non relu marche en démo et casse face aux vrais utilisateurs, et c'est exactement ce qu'une revue senior attrape.",
          link: {
            href: "/fr/work/sabboura",
            label: "Lire l'étude de cas Sabboura",
          },
        },
        {
          q: "Que se passe-t-il après le lancement de mon MVP ?",
          a: "Après le lancement d'un MVP, vous êtes propriétaire de tout et vous choisissez comment le faire grandir : en interne, avec un CTO à temps partagé ou avec une autre équipe. Les dépôts, l'infrastructure et la documentation sont à votre nom dès le premier jour, donc il n'y a rien à récupérer. Les premières semaines après le lancement servent surtout à corriger ce que révèlent les vrais utilisateurs, à surveiller les erreurs et les coûts, et à décider ce qui entre dans la version deux à partir de l'usage réel. Vous pouvez me garder en CTO à temps partagé pour cette phase, 1 à 2 jours par semaine, ou recruter votre premier développeur avec une passation propre.",
          link: {
            href: "/fr/services/fractional-cto",
            label: "Faire grandir le produit avec un CTO à temps partagé",
          },
        },
        {
          q: "Comment migrer son application de Bubble, d'un outil no-code ou de Firebase ?",
          a: "Migrer une application depuis Bubble, un autre outil no-code ou Firebase fonctionne mieux sous forme de reconstruction planifiée du cœur, par étapes, pendant que l'ancienne version continue de tourner. Je commence par cartographier ce que fait réellement l'application, y compris la logique cachée dans les workflows, les règles et les plugins, puis j'exporte les données et je vérifie leur qualité. Ensuite, je reconstruis sur une stack standard comme Next.js et PostgreSQL, je migre les utilisateurs et les données avec un script qu'on peut relancer plusieurs fois, et on bascule quand la nouvelle version est au niveau. Les fondateurs migrent en général quand les coûts, les limites de performance ou les questions d'investisseurs sur la dépendance commencent à peser.",
        },
      ],
    },
  ],
};
