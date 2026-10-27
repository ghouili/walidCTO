/**
 * French version of lib/service-pages.ts: long-form content for the
 * /fr/services/[slug] pages. Same slugs and related case studies as English.
 */

import type { ServicePage } from "./service-pages";

export const servicePagesFr: ServicePage[] = [
  {
    slug: "fractional-cto",
    serviceType: "CTO à temps partagé",
    eyebrow: "CTO à temps partagé",
    seoTitle: "CTO à temps partagé pour startups | Walid Ghouili",
    metaDescription:
      "CTO à temps partagé 1 à 2 jours par semaine : architecture, revue de code, recrutement et roadmap. Un CTO externalisé senior, en nearshore depuis Tunis.",
    h1: "CTO à temps partagé pour startups en phase d'amorçage",
    lede: "Un CTO à temps partagé est un responsable technique senior qui travaille à temps partiel, en général 1 à 2 jours par semaine, pour une entreprise qui n'est pas encore prête à recruter un CTO à plein temps. Il prend en charge l'architecture, la revue de code, le recrutement technique et la roadmap : la startup bénéficie d'un jugement senior sans payer un salaire à temps plein.",
    sections: [
      {
        heading: "Ce que fait vraiment un CTO à temps partagé",
        body: "Je deviens la voix technique senior qui manque encore à votre équipe. Je fixe l'architecture, je relis le code qui part en production, je participe aux recrutements et je garde la roadmap honnête sur ce qui est réaliste. Le but n'est pas d'écrire chaque ligne. C'est de m'assurer que les lignes écrites par votre équipe forment un produit qui passe à l'échelle, et pas un produit à reconstruire dans un an. Vous avez les arbitrages qu'un CTO à plein temps ferait, les jours où vous en avez vraiment besoin.",
      },
      {
        heading: "Pour qui ?",
        body: "Les fondateurs assez techniques pour être dangereux, qui ont besoin de quelqu'un pour challenger leurs choix. Les fondateurs non techniques qui ont besoin d'un responsable de l'ingénierie. Les équipes de deux ou trois développeurs sans senior. C'est aussi la bonne formule quand vous levez des fonds et que les investisseurs veulent voir un responsable technique crédible, ou quand vous grandissez plus vite que votre stack et vos process ne le permettent.",
      },
      {
        heading: "Comment se déroule la mission",
        body: "La mission est facturée au mois, avec un engagement minimum de trois mois pour avoir le temps de faire vraiment bouger les choses. On commence par un court appel et un périmètre écrit, on avance en cycles hebdomadaires visibles, et chaque décision, document ou commit vous appartient dès qu'il est livré. Pas de lock-in : la mission se met en pause ou s'arrête à des points d'étape convenus, et votre équipe en sort renforcée, pas dépendante de moi.",
      },
    ],
    whatYouGet: [
      "Des choix d'architecture et une roadmap technique que vous pouvez défendre devant des investisseurs",
      "Des revues de code et des standards d'ingénierie qui font progresser toute l'équipe",
      "Une aide concrète pour recruter et intégrer des développeurs seniors",
      "Un interlocuteur technique senior aux horaires européens (UTC+1)",
      "Tout est documenté et vous appartient, sans lock-in",
    ],
    faqs: [
      {
        q: "Qu'est-ce qu'un CTO à temps partagé ?",
        a: "Un CTO à temps partagé, ou CTO externalisé, est un responsable technique senior qui travaille à temps partiel, en général 1 à 2 jours par semaine, pour une entreprise qui n'est pas encore prête à recruter un CTO à plein temps. Il prend en charge l'architecture, la revue de code, le recrutement et la roadmap technique. La startup bénéficie d'un jugement senior sans payer un salaire à temps plein.",
      },
      {
        q: "CTO à temps partagé, CTO salarié ou agence : de quoi avez-vous besoin ?",
        a: "Le CTO à temps partagé est un forfait mensuel, intégré à l'équipe à temps partiel, pour les équipes qui n'ont pas encore de produit ou qui en sont au tout début et ont besoin d'un jugement senior maintenant. Le CTO salarié est un recrutement permanent pour les équipes financées qui grandissent vite. L'agence livre un projet précis et bien spécifié, puis s'en va. La plupart des startups en démarrage ont besoin de la première option.",
      },
      {
        q: "À quel moment faire appel à un CTO à temps partagé ?",
        a: "Quand vous êtes sur le point de construire et que vous ne voulez pas partir dans la mauvaise direction. Quand ce que vous avez livré commence à casser. Quand il n'y a aucun développeur senior dans l'équipe. Quand vous levez des fonds et avez besoin de crédibilité technique. Ou quand vous grandissez plus vite que votre stack et votre équipe ne peuvent suivre.",
      },
      {
        q: "Combien coûte un CTO à temps partagé ?",
        a: "La mission de CTO à temps partagé est facturée au mois, et le point de départ figure dans l'encadré Tarifs de cette page. Le montant final dépend du nombre de jours par semaine dont vous avez besoin, et il est fixé par écrit avant que le travail commence. Les développements et les audits sont des projets séparés, au forfait.",
      },
    ],
    relatedCaseStudies: ["sabboura", "facturra", "simplify-kids"],
  },
  {
    slug: "technical-audit",
    serviceType: "Audit technique",
    eyebrow: "Audit technique",
    seoTitle: "Audit technique de startup et audit de code | Walid Ghouili",
    metaDescription:
      "Audit technique de startup en deux semaines, périmètre fixe : code, infra et pratiques d'équipe, avec une liste priorisée de risques et de correctifs.",
    h1: "Audit technique de votre code et de votre infrastructure",
    lede: "Un audit technique, c'est deux semaines d'analyse approfondie de votre code, de votre infrastructure et des pratiques de votre équipe, sur un périmètre fixe. Il produit une liste priorisée de risques et de correctifs : vous savez exactement ce qui vous ralentit et quoi faire.",
    sections: [
      {
        heading: "Ce que contient le rapport",
        body: "Vous recevez une évaluation écrite et priorisée, pas un verdict flou : architecture et qualité du code, failles de sécurité et de protection des données, risques d'infrastructure et de déploiement, couverture de tests, et les pratiques d'équipe qui expliquent tout cela. Chaque constat est classé par impact et par effort, avec une recommandation concrète. C'est la différence entre « votre code a des problèmes » et « voici les cinq choses à corriger en premier, dans cet ordre, et pourquoi ».",
      },
      {
        heading: "Quand en faire un",
        body: "Avant de racheter un produit ou d'y investir, quand vous avez besoin d'une due diligence technique. Quand la vélocité s'est effondrée sans bruit et que personne ne sait dire pourquoi. Avant une refonte, pour ne pas jeter ce qui fonctionne. Ou quand l'équipe précédente est partie et que vous avez hérité d'un code auquel vous ne faites pas confiance. Un audit est le moyen le moins cher de savoir à quoi vous avez vraiment affaire.",
      },
      {
        heading: "Comment ça se passe",
        body: "Deux semaines, prix forfaitaire, périmètre fixe. Je lis le code, l'infra et l'historique, je parle avec les personnes qui ont construit le produit et je reproduis les problèmes qui comptent. Vous recevez le rapport et on en parle lors d'un appel de restitution. Si vous voulez que les correctifs soient mis en œuvre, l'audit débouche naturellement sur un développement ou une mission de CTO à temps partagé.",
      },
    ],
    whatYouGet: [
      "Un registre des risques écrit et priorisé, classé par impact et par effort",
      "Une revue de l'architecture, de la sécurité, de l'infrastructure et de la couverture de tests",
      "Un contrôle des écarts RGPD et protection des données",
      "Un appel de restitution pour passer les constats en revue",
      "Un plan de correction clair et ordonné, que vous pouvez confier à n'importe quelle équipe",
    ],
    faqs: [
      {
        q: "Qu'est-ce qu'un audit technique et que contient le rapport ?",
        a: "Un audit technique est une revue de deux semaines, sur un périmètre fixe, de votre code, de votre infrastructure et des pratiques de votre équipe. Le rapport est un registre des risques priorisé (architecture, sécurité, RGPD, infra, tests) où chaque constat est classé par impact et par effort, avec une correction concrète recommandée.",
      },
      {
        q: "Combien de temps dure un audit, et combien coûte-t-il ?",
        a: "Deux semaines, périmètre fixe, prix forfaitaire. Le prix figure dans l'encadré Tarifs de cette page et il ne bouge plus une fois le périmètre validé. Vous recevez le rapport et un appel de restitution. Si vous voulez mettre en œuvre les recommandations, l'audit peut se prolonger en développement ou en mission de CTO à temps partagé.",
      },
      {
        q: "L'audit peut-il couvrir le RGPD et l'hébergement des données dans l'UE ?",
        a: "Oui. Les écarts en matière de protection des données et de RGPD font partie de chaque audit. Quand la localisation des données compte, les recommandations incluent un hébergement dans l'UE et les changements d'architecture nécessaires.",
      },
    ],
    relatedCaseStudies: ["facturra", "tnajem", "fresh-tenancy"],
  },
  {
    slug: "mvp-development",
    serviceType: "Développement de MVP",
    eyebrow: "Création de MVP",
    seoTitle: "Développement de MVP en 4 semaines environ | Walid Ghouili",
    metaDescription:
      "Développement de MVP en 4 semaines environ, périmètre fixe : une application web en production, pensée pour passer à l'échelle. En nearshore depuis Tunis.",
    h1: "Développement de MVP : de l'idée à un produit en production",
    lede: "Je fais passer votre idée de la maquette Figma à une application web en production en quatre semaines environ, sur un périmètre fixe. L'architecture est pensée pour passer à l'échelle, pas pour être reconstruite dans un an. Vous obtenez un vrai produit déployable, pas un prototype à jeter.",
    sections: [
      {
        heading: "Bien construit dès le départ",
        body: "La plupart des MVP rognent sur ce qui ne se voit pas, et ce sont justement ces raccourcis qui imposent une refonte dès que la traction arrive. Je construis sur une stack qui ne vous coincera pas au bout de six mois : une architecture propre, une vraie authentification, une vraie modélisation des données, de la CI/CD, et ces fondations peu glamour qui vous permettent d'ajouter des fonctionnalités plus tard au lieu de vous battre avec celles qui existent déjà. Livré vite, mais construit pour durer.",
      },
      {
        heading: "Périmètre fixe, sprints de quatre semaines",
        body: "On fixe exactement le contenu du MVP avant de commencer : un périmètre écrit, un calendrier et un prix. Ensuite on avance par incréments hebdomadaires. Vous voyez des progrès concrets chaque semaine, avec une version déployable à la fin de chacune. Applications web, plateformes SaaS, outils internes : je travaille seul ou à la tête d'une petite équipe, selon la taille du projet.",
      },
      {
        heading: "Après le lancement",
        body: "Les dépôts, l'infrastructure et la documentation sont à vous dès le premier jour. Ensuite, vous pouvez internaliser le produit, me garder en CTO à temps partagé pour le faire grandir, ou le confier à votre propre équipe avec une passation propre. Pas de lock-in, aucune dépendance : le MVP est à vous.",
      },
    ],
    whatYouGet: [
      "Une application web déployée, de niveau production, pas un prototype jetable",
      "Une stack moderne (Next.js, NestJS, Django/FastAPI, PostgreSQL)",
      "CI/CD, authentification et les fondations pour passer à l'échelle",
      "Périmètre fixe, prix fixe, progrès visibles chaque semaine",
      "Propriété complète du code, de l'infra et de la documentation, sans lock-in",
    ],
    faqs: [
      {
        q: "Combien de temps faut-il pour développer un MVP ?",
        a: "Environ quatre semaines de travail sur un périmètre fixe pour un MVP ciblé, de l'idée ou de la maquette Figma jusqu'à une application web déployée en production. Les projets plus importants prennent plus de temps. On fixe le périmètre exact et le calendrier par écrit avant de commencer.",
      },
      {
        q: "Faudra-t-il reconstruire le MVP quand on passera à l'échelle ?",
        a: "C'est précisément ce qu'il est conçu pour éviter. Je construis sur une stack et une architecture qui tiennent la croissance (vraie modélisation des données, authentification et CI/CD dès le départ), pour que vous ajoutiez des fonctionnalités plus tard au lieu de refaire les fondations.",
      },
      {
        q: "À qui appartient le code ?",
        a: "À vous, dès le premier jour : dépôts, infrastructure et documentation. Vous pouvez internaliser le produit, me garder sous contrat mensuel pour le faire évoluer, ou le confier à votre propre équipe. Pas de lock-in.",
      },
    ],
    relatedCaseStudies: ["sabboura", "guidup", "styly"],
  },
  {
    slug: "workshops",
    serviceType: "Formation des équipes techniques",
    eyebrow: "Ateliers et formations",
    seoTitle: "Ateliers et formations pour équipes tech | Walid Ghouili",
    metaDescription:
      "Ateliers pratiques sur les stacks web modernes pour équipes tech : Next.js, NestJS, tests, architecture. Sur site ou à distance, en français ou en anglais.",
    h1: "Ateliers et formations pour votre équipe technique",
    lede: "Mes ateliers sont des formations pratiques aux stacks web modernes pour votre équipe technique, sur site ou à distance, en français ou en anglais. Des sessions concrètes qui font progresser les personnes qui maintiendront votre produit bien après mon départ.",
    sections: [
      {
        heading: "Au programme",
        body: "L'architecture web moderne et les stacks que j'utilise au quotidien : Next.js et l'écosystème React, les back-ends Node/NestJS et Python (Django, FastAPI), PostgreSQL, les tests et la CI/CD, et les pratiques d'ingénierie (revue de code, gestion des branches, déploiement) qui distinguent une équipe qui livre d'une équipe qui passe son temps à éteindre des incendies. Les sessions partent de votre vrai code et de vos questions, pas de slides génériques.",
      },
      {
        heading: "Pour qui ?",
        body: "Les équipes techniques internes qui veulent adopter une stack moderne en confiance, les développeurs juniors qui ont besoin d'un senior auprès de qui apprendre, et les organisations qui forment leur prochaine promotion. J'enseigne l'informatique à l'IMSET (Honoris United Universities) et je suis partenaire formation de Smart Tunisian Technoparks : c'est mon métier au quotidien, pas une activité annexe.",
      },
      {
        heading: "Format",
        body: "Sur site en Tunisie et dans l'UE, ou entièrement à distance. Des formats d'une demi-journée à plusieurs jours, en français ou en anglais, adaptés au niveau et aux objectifs de votre équipe. Vous gardez les supports et les enregistrements, et l'atelier continue de servir bien après la session.",
      },
    ],
    whatYouGet: [
      "Des sessions pratiques construites autour de votre vrai code",
      "Stack web moderne : Next.js, NestJS, Django/FastAPI, PostgreSQL, CI/CD",
      "En français ou en anglais, sur site ou à distance",
      "Des supports et des enregistrements que votre équipe conserve",
      "Un ingénieur en activité et enseignant en informatique, pas un formateur à slides",
    ],
    faqs: [
      {
        q: "Que couvrent les ateliers ?",
        a: "Les stacks et pratiques web modernes : Next.js et React, back-ends Node/NestJS et Python, PostgreSQL, tests, CI/CD et workflow d'ingénierie. Les sessions sont construites autour de votre propre code et de vos questions plutôt que d'un contenu générique.",
      },
      {
        q: "Les ateliers sont-ils en français ou en anglais ?",
        a: "Les deux. Ateliers, supports et questions-réponses se font en français ou en anglais, selon ce qui convient à votre équipe, sur site en Tunisie et dans l'UE, ou entièrement à distance.",
      },
    ],
    relatedCaseStudies: [],
  },
];
