/**
 * French version of lib/work.ts: work entries, case studies and credentials
 * for the /fr locale. Same slugs, clients, links and NDA flags as English.
 */

import type { Credential, WorkEntry } from "./work";

export const workFr: WorkEntry[] = [
  {
    slug: "facturra",
    client: "Facturra",
    sector: "SaaS FinTech / RegTech · France",
    outcome:
      "Nous avons transformé la réforme de la facturation électronique 2026 en un onboarding de 5 minutes.",
    caption:
      "Une plateforme Factur-X au niveau des exigences de conformité, qui permet aux freelances et aux petites entreprises d'émettre des factures électroniques valides avant que leur café ait refroidi.",
    url: "https://facturra.com/",
    caseStudy: {
      seoTitle: "Facturra : facturation électronique Factur-X (cas client)",
      metaDescription:
        "Facture électronique 2026 : comment nous avons fait de la réforme un onboarding de 5 minutes, avec une plateforme Factur-X pour freelances et TPE.",
      h1: "Facturra : la réforme de la facturation électronique 2026, transformée en onboarding de 5 minutes",
      intro:
        "Depuis septembre 2026, toutes les entreprises françaises doivent pouvoir recevoir des factures électroniques structurées, et l'obligation d'émission s'échelonne jusqu'en 2027. Le marché a répondu avec une tuyauterie de Plateformes Agréées pensée pour les experts-comptables, pas pour les millions de freelances et de petites entreprises qui ont juste besoin d'envoyer une facture conforme.",
      challenge:
        "Construire un produit entièrement conforme aux exigences de la DGFiP et utilisable en quelques minutes par quelqu'un qui n'est pas comptable, sans enfermer les utilisateurs chez une seule Plateforme Agréée ni leur imposer une comptabilité et un CRM dont ils ne veulent pas.",
      approach: [
        "Positionnement de Facturra comme Solution Compatible (Opérateur de Dématérialisation) connectée à une Plateforme Agréée : les factures continuent de circuler même si une PA change ses conditions, sans lock-in.",
        "Un onboarding qui récupère l'identité de l'entreprise via FranceConnect Pro / SIRET, sans aucune saisie manuelle.",
        "Génération Factur-X native (PDF/A-3 avec XML conforme EN 16931 embarqué) et démo en direct sur la landing page, qui se remplit au fil de la saisie : les prospects voient la conformité fonctionner avant même de s'inscrire.",
        "Un copilote IA qui pré-remplit les factures et repère les erreurs de TVA avant l'envoi.",
      ],
      built: [
        "Application Next.js avec un moteur Factur-X natif",
        "Onboarding FranceConnect Pro / SIRET",
        "Imports depuis Sage, EBP, Pennylane, QuickBooks et CSV",
        "Suivi complet du cycle de vie des factures, API et webhooks",
        "Hébergement en France (OVHcloud), conforme au RGPD",
      ],
      outcome: [
        "Un onboarding qui se compte en minutes : la première facture conforme part dans la même session.",
        "La conformité se vit avant l'inscription, grâce à la démo en direct sur la landing page.",
        "Aucun enfermement chez une plateforme : un opérateur compatible qui survit aux changements de PA.",
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
    sector: "EdTech / IA · Tunisie · Web + mobile",
    outcome:
      "Un tuteur IA qui explique le programme du bac à voix haute, et qui dessine en parlant.",
    caption:
      "Tuteur vocal pour les maths et la physique du bac tunisien : leçons enregistrées vérifiées par des enseignants, explications IA en direct à la demande, interface en arabe d'abord avec bascule FR/EN. Plateforme web et application Flutter en production.",
    url: "https://sabboura.tn/",
    caseStudy: {
      seoTitle: "Sabboura : tuteur IA en temps réel pour le bac (cas client)",
      metaDescription:
        "Tuteur IA vocal pour le bac tunisien : comment nous avons conçu Sabboura, leçons vérifiées par des profs, explications en direct et app Flutter.",
      h1: "Sabboura : un tuteur IA qui enseigne le programme du bac à la voix",
      intro:
        "En Tunisie, les élèves qui préparent le bac paient des cours particuliers parce que la classe va trop vite et que le manuel ne répond pas aux questions. Sabboura, si : il explique un chapitre à voix haute, l'illustre au fur et à mesure et répond aux questions de l'élève dans la langue qu'il a choisie, arabe, français ou anglais.",
      challenge:
        "Livrer un tuteur vocal en temps réel qui reste fidèle au programme officiel, garde des coûts d'IA prévisibles avec des prix accessibles aux élèves, et fonctionne pour un lycéen de 17 ans sur son téléphone, pas seulement en démo.",
      approach: [
        "Un produit calqué sur le programme officiel : les leçons sont générées une seule fois à partir de sources vérifiées, relues par des enseignants, puis rejouées pour chaque élève. L'IA en direct n'est sollicitée que lorsqu'un élève pose une question.",
        "Une boucle vocale construite de bout en bout : speech-to-text, raisonnement par LLM, synthèse vocale neuronale avec visèmes de synchronisation labiale qui animent le tuteur, et des phrases d'attente préenregistrées pour que le premier mot arrive en moins d'une demi-seconde.",
        "Une unité d'usage fractionnaire (la « craie », chalk dans le produit) pour que les prix restent rentables sans que l'élève ne voie jamais de plafond strict.",
        "Du premier commit à la production en moins de deux mois, en menant les jalons en parallèle grâce au développement agentique, avec une CI/CD qui déploie en production à chaque push.",
      ],
      built: [
        "Plateforme web Next.js (MERN), interface en arabe d'abord, compatible RTL, avec choix de la langue à chaque session",
        "Application mobile Flutter en production, sur la même API",
        "Pipeline vocal : Deepgram STT, Claude, synthèse vocale neuronale Azure avec visèmes",
        "Workflow de relecture par les enseignants et contrôles qualité automatiques sur chaque leçon enregistrée",
        "Packs prépayés et quota gratuit quotidien synchronisés entre sessions anonymes et connectées",
        "Déploiements GitHub Actions sur un VPS derrière nginx et PM2",
      ],
      outcome: [
        "En production sur sabboura.tn, avec des leçons vérifiées par des enseignants accessibles à tout visiteur.",
        "Un modèle de coûts où une leçon enregistrée coûte quelques centimes et où l'IA en direct n'est utilisée qu'à la demande.",
        "Un produit qu'un fondateur non technique pouvait vendre sous forme de cartes prépayées dès le premier jour.",
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
    sector: "EdTech / IA · Tunisie · Web + mobile",
    outcome:
      "Transforme une vraie leçon d'école en histoire racontée, en quiz et en bilan pour les parents.",
    caption:
      "Apprentissage par l'histoire avec l'IA pour les 6-12 ans, en français, en arabe et en anglais, raconté par un narrateur animé. Plateforme Next.js et application Flutter en production, données des enfants conservées dans la région.",
    url: "https://beta.simplify-kids.com/",
    caseStudy: {
      seoTitle: "Simplify for Kids : apprendre par l'histoire avec l'IA",
      metaDescription:
        "Apprentissage par l'IA pour enfants : avec Simplify for Kids, le parent envoie une leçon, l'enfant reçoit une histoire et un quiz, le parent un bilan.",
      h1: "Simplify for Kids : une leçon d'école en entrée, une histoire que l'enfant retient en sortie",
      intro:
        "En Tunisie, les parents passent leurs soirées à réexpliquer des leçons qu'un enfant de 7 ans n'a pas écoutées en classe. Simplify prend la vraie leçon (une photo, un PDF, quelques lignes) et la transforme en histoire racontée par un narrateur animé, suivie d'un quiz qui montre au parent ce qui a été retenu.",
      challenge:
        "Construire un pipeline d'IA assez fiable pour des enfants, qui garde une qualité d'histoire constante dans trois langues et tourne à un prix qu'une famille acceptera de payer chaque mois, avec des données d'enfants traitées avec soin.",
      approach: [
        "Un pipeline leçon-vers-histoire avec une structure pédagogique fixe, pour que chaque histoire enseigne la leçon au lieu de dériver vers la fiction.",
        "Une interface enfant simple et franche, une interface parent apaisée : deux design systems, une seule base de code.",
        "Une tarification en points par histoire, pour pouvoir ajouter des défis gratuits et des revendeurs scolaires sans refondre la facturation.",
        "Une v2 reconstruite à partir du prototype v1, en gardant l'UX et en remplaçant l'architecture, lancée d'abord en bêta fermée.",
      ],
      built: [
        "Plateforme Next.js (MERN) pour les parents et les enfants, FR / AR / EN",
        "Application mobile Flutter en production",
        "Import des leçons, génération d'histoires avec Claude, narration neuronale et narrateur 2D animé",
        "Quiz avant/après et bilans automatiques pour les parents",
        "Abonnement à points avec des tarifs modifiables en base de données",
      ],
      outcome: [
        "Bêta fermée en ligne sur beta.simplify-kids.com, avec des familles en cours d'inscription.",
        "Un pipeline et un jeu de données conçus pour affiner plus tard un modèle dédié.",
        "Présenté au programme TICDCE comme produit EdTech autofinancé.",
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
    sector: "Voyage / Tourisme · Tunisie · Web + mobile",
    outcome:
      "Une app de guide de voyage sur six destinations, un back-office et un site vitrine, livrés comme un seul produit.",
    caption:
      "Guide culturel et écologique du nord de la Tunisie avec packs hors ligne, audioguides et réservations. Application Flutter en production, dashboard et site Next.js, un seul monorepo.",
    url: "https://guidup.tn/",
    caseStudy: {
      seoTitle: "Guid'Up : app de guide de voyage et back-office (cas client)",
      metaDescription:
        "App de guide de voyage Flutter avec packs hors ligne et audioguides, back-office et site Next.js : comment nous avons livré Guid'Up depuis un monorepo.",
      h1: "Guid'Up : une app de guide de voyage, un back-office et un site pour le nord de la Tunisie",
      intro:
        "Guid'Up fait découvrir six destinations peu visitées du nord de la Tunisie (Testour, Téboursouk, Thibar et d'autres) aux voyageurs qui cherchent culture et nature hors des circuits habituels. La fondatrice avait besoin d'une application mobile, d'un outil pour gérer les contenus et les réservations, et d'un site public, lancés ensemble.",
      challenge:
        "Remplacer un premier développement abandonné par un produit que la cliente pouvait gérer seule : contenus multi-destinations, usage hors ligne dans des zones mal couvertes, réservations sans paiement en ligne au lancement, et une qualité prête pour les stores avec un budget fixe.",
      approach: [
        "Le design board V2 comme unique source de vérité : l'app a été reconstruite autour, en conservant les animations que la cliente aimait dans la version précédente.",
        "Packs de destinations hors ligne, cartes OpenStreetMap et audioguides en synthèse vocale, remplaçables par une voix humaine, pour que l'app fonctionne sur le terrain.",
        "Comptes stores et infrastructure ouverts au nom de la cliente et exploités par InnoviaBurst : aucune dépendance envers un prestataire.",
        "App, dashboard, API et site livrés depuis un seul monorepo, avec une CI/CD qui déploie en production à chaque push.",
      ],
      built: [
        "Application mobile Flutter en production (connexion e-mail + Google, packs hors ligne, réservations)",
        "Dashboard d'administration Next.js pour les destinations, les points d'intérêt et les réservations",
        "Site vitrine Next.js au style carnet de voyage illustré",
        "API Node.js, dockerisée, déployée via GitHub Actions",
      ],
      outcome: [
        "App et site lancés ensemble sous guidup.tn.",
        "Une cliente propriétaire de tous ses comptes, qui publie du contenu sans développeur.",
        "Des contrôles qualité (analytics, animations, retours haptiques, vérifications avant publication) en place dès le premier jour.",
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
    sector: "Marketplace · Mobile first",
    outcome:
      "Une app marketplace qui relie les marques à leurs clients, disponible sur Google Play.",
    caption:
      "Marketplace mobile first où les marques touchent directement leurs clients. App React Native en production sur Google Play, soumission à l'App Store en cours, back-end MERN.",
    url: "https://styly.tn/",
    stores: [
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.stylistanetwork.styly&hl=en",
      },
    ],
    caseStudy: {
      seoTitle: "Styly : app marketplace React Native (cas client)",
      metaDescription:
        "App marketplace React Native qui relie les marques à leurs clients : comment nous avons lancé Styly sur Google Play, back-end MERN et App Store en cours.",
      h1: "Styly : une marketplace entre marques et clients, du premier build au Play Store",
      intro:
        "Styly permet aux marques de toucher directement leurs propres clients dans une marketplace mobile, au lieu de louer l'attention des réseaux sociaux. Le produit est mobile first et devait passer la revue des stores avec un compte développeur personnel, avec une disponibilité mondiale, UE comprise.",
      challenge:
        "Livrer une app marketplace multiplateforme qui satisfait les exigences de test fermé de Google Play et la revue d'Apple, adossée à une API capable de grandir avec le catalogue.",
      approach: [
        "Une seule base de code React Native pour Android et iOS, sur un back-end MERN.",
        "Le parcours de test fermé de la Play Console mené jusqu'à la production, avec la soumission App Store Connect préparée en parallèle.",
        "Une répartition des comptes et des releases où le propriétaire de la marque contrôle les stores et où nous gérons les mises en production.",
      ],
      built: [
        "Application mobile React Native, en production sur Google Play",
        "API Node.js / Express sur MongoDB",
        "Site web sur styly.tn",
        "Fiches stores, pipeline de release et gestion des revues",
      ],
      outcome: [
        "En ligne sur Google Play, sortie sur l'App Store en cours.",
        "Un processus de release que le propriétaire peut répéter sans développeur d'astreinte.",
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
    sector: "Marketplace EdTech · Tunisie",
    outcome:
      "Le Shopify des profs particuliers tunisiens : publier un cours en direct, partager un lien, remplir les places.",
    caption:
      "Marketplace biface où des tuteurs vérifiés donnent des cours en visio en direct et où les élèves réservent leur place, tous les échanges restant dans l'app. Plateforme Next.js sur un VPS hébergé en Tunisie.",
    url: "https://tnajem.com/",
    caseStudy: {
      seoTitle: "Tnajem : marketplace de cours particuliers (cas client)",
      metaDescription:
        "Marketplace de cours particuliers : comment nous avons construit Tnajem, où des tuteurs vérifiés publient des cours en visio et où les élèves réservent.",
      h1: "Tnajem : une marketplace de cours en direct pour tuteurs et élèves",
      intro:
        "En Tunisie, les cours particuliers passent par des groupes WhatsApp et se paient en liquide. Tnajem donne aux tuteurs une vitrine (publier un cours en direct, partager un lien) et offre aux élèves et aux parents un endroit sûr pour réserver et payer, sans contact direct entre les deux parties.",
      challenge:
        "Concevoir une marketplace biface où la confiance est intégrée : tuteurs vérifiés, zéro contact hors plateforme, une offre gratuite qui convertit, et un paiement adapté au marché tunisien.",
      approach: [
        "La règle du zéro contact appliquée dans le modèle de données et l'interface, pas seulement dans les CGU.",
        "Un modèle économique fondé sur une commission et des abonnements tuteurs par paliers, avec des promotions plafonnées pour garder une marketplace saine.",
        "Un lancement d'abord réservé aux adultes, avec des parcours parents pour les mineurs prévus dès le départ.",
        "Hébergement en Tunisie, avec une CI/CD qui déploie en production à chaque push.",
      ],
      built: [
        "Plateforme Next.js (MERN) bilingue français / derja tunisienne",
        "Connexion par code OTP envoyé par e-mail ou par mot de passe, profils de tuteurs partageables par lien",
        "Planification des cours en direct, réservation de places, suivi des tuteurs et abonnements mensuels",
        "Paliers d'offres pour les tuteurs et logique de commission, intégration de la passerelle de paiement préparée",
        "VPS hébergé en Tunisie avec déploiements GitHub Actions",
      ],
      outcome: [
        "En ligne sur tnajem.com, avec des tuteurs qui s'inscrivent avant le lancement public.",
        "Une marketplace dont les règles de confiance sont appliquées par le produit lui-même.",
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
    sector: "ERP interne · Industrie",
    outcome:
      "Un cockpit opérationnel unique qui a remplacé six tableurs et trois identifiants.",
    caption:
      "ERP sur mesure : stocks, planification de la production, achats et tableaux de bord par rôle pour un groupe industriel de taille moyenne. Client confidentiel sous NDA.",
    nda: true,
  },
  {
    slug: "debarras-aurea",
    client: "Débarras Aurea",
    sector: "Services locaux · Île-de-France",
    outcome:
      "Un tunnel de devis en deux minutes pour une entreprise de débarras parisienne qui couvre 8 départements.",
    caption:
      "Un site rapide, construit pour le SEO, et un tunnel d'acquisition payante qui transforme les recherches locales en interventions réservées.",
    url: "https://debarras-aurea.fr/",
    caseStudy: {
      seoTitle: "Débarras Aurea : tunnel de devis et acquisition payante",
      metaDescription:
        "Tunnel de devis en deux minutes et site SEO + acquisition payante : des recherches locales transformées en débarras réservés dans 8 départements d'IDF.",
      h1: "Débarras Aurea : un tunnel de devis en deux minutes sur 8 départements",
      intro:
        "Débarras Aurea est une entreprise de débarras de logements en région parisienne, qui intervient dans huit départements d'Île-de-France. Dans les services locaux, la demande passe par la recherche et l'intention d'achat est forte, à condition que le site se charge vite, se positionne localement et rende la demande de devis facile.",
      challenge:
        "Transformer des recherches locales à forte intention en interventions réservées, avec un site qui se positionne sur huit départements et un parcours de devis qu'un client stressé peut terminer en deux minutes.",
      approach: [
        "Un site rapide, optimisé pour le SEO, structuré autour de l'intention de recherche locale (à l'échelle du département).",
        "Un tunnel de devis en deux minutes qui collecte les informations nécessaires pour chiffrer et planifier.",
        "Le site couplé à un tunnel d'acquisition payante et au suivi des conversions : un dispositif « site + acquisition » de bout en bout.",
      ],
      built: [
        "Site vitrine Next.js rapide, structuré pour le SEO local",
        "Tunnel de devis en plusieurs étapes, bouclé en deux minutes",
        "Tunnel d'acquisition payante (Google Ads) avec suivi des conversions GTM / GA4",
      ],
      outcome: [
        "Des recherches locales converties en interventions réservées et qualifiées.",
        "Un tunnel cohérent, du clic sur l'annonce à la demande de devis puis à la réservation.",
        "Une couverture des huit départements d'Île-de-France.",
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
      "Un LMS en marque blanche qui intègre une nouvelle promotion en quelques minutes, pas en quelques semaines.",
    caption:
      "Plateforme de formation multi-tenant avec contenus SCORM, suivi de progression et certificats délivrés automatiquement, pour un organisme de formation accrédité. Client confidentiel sous NDA.",
    nda: true,
  },
  {
    slug: "zorro-services",
    client: "Zorro Services",
    sector: "Services environnementaux · Tunisie",
    outcome:
      "Une présence corporate qui mise d'abord sur la crédibilité, pour une entreprise environnementale certifiée ANGED.",
    caption:
      "Un site multipage qui positionne une entreprise tunisienne de services B2B auprès des clients institutionnels et municipaux.",
    url: "https://zorro-services.vercel.app/",
    caseStudy: {
      seoTitle: "Zorro Services : vitrine d'une entreprise certifiée ANGED",
      metaDescription:
        "Site corporate multipage pour une entreprise tunisienne de services environnementaux certifiée ANGED, pensé pour convaincre institutions et mairies.",
      h1: "Zorro Services : une présence qui mise sur la crédibilité, pour une entreprise B2B réglementée",
      intro:
        "Zorro Services est une entreprise tunisienne de services environnementaux certifiée ANGED, qui travaille pour des clients institutionnels et municipaux. En B2B réglementé, le rôle du site est d'asseoir la crédibilité de l'entreprise : ici, la réussite se mesure au positionnement et à la confiance, pas à un taux de conversion.",
      challenge:
        "Donner à une entreprise environnementale réglementée et certifiée une présence corporate crédible aux yeux des acheteurs publics et institutionnels.",
      approach: [
        "Un site corporate multipage structuré autour des services, des certifications et des références.",
        "La certification ANGED et la crédibilité institutionnelle mises en avant sur tout le site.",
        "Une marque positionnée pour les acheteurs B2B, institutionnels et municipaux.",
      ],
      built: [
        "Site corporate multipage",
        "Arborescence services, certifications et références",
        "Rapide, accessible, prêt pour le SEO",
      ],
      outcome: [
        "Une présence corporate crédible, pensée pour les clients institutionnels et municipaux.",
        "La certification et les signaux de confiance placés là où les acheteurs les cherchent.",
      ],
      stack: ["Next.js", "Corporate site", "SEO"],
      relatedService: "mvp-development",
    },
  },
  {
    slug: "fresh-tenancy",
    client: "Fresh Tenancy",
    sector: "Services à domicile · Royaume-Uni",
    outcome: "Un site de réservation construit autour des avis 5 étoiles.",
    caption:
      "Un service de ménage de fin de bail dont la page d'accueil convertit par la confiance avant de vendre par le prix.",
    url: "https://freshtenancy.com/",
    caseStudy: {
      seoTitle: "Fresh Tenancy : site de réservation axé sur la confiance",
      metaDescription:
        "Site de réservation de ménage de fin de bail construit autour des avis 5 étoiles : une page d'accueil qui convertit par la confiance avant le prix.",
      h1: "Fresh Tenancy : un site de réservation qui convertit par la confiance, pas par le prix",
      intro:
        "Fresh Tenancy est un service britannique de ménage de fin de bail, sur un marché encombré et très sensible au prix. Pour y gagner des réservations, le devis le plus bas ne suffit pas : il faut de la confiance, construite avec des avis 5 étoiles visibles au moment de la décision.",
      challenge:
        "Gagner des réservations sur un marché tiré par les prix en misant d'abord sur la crédibilité : une page d'accueil qui gagne la confiance avant de parler prix, et un parcours de réservation qui ne perd pas le client en route.",
      approach: [
        "Une page d'accueil construite autour des avis 5 étoiles et de la preuve sociale, placés là où les décisions se prennent.",
        "Un parcours de réservation épuré qui transforme la confiance en intervention confirmée.",
        "Un site rapide et orienté conversion du début à la fin.",
      ],
      built: [
        "Site vitrine et de réservation Next.js orienté conversion",
        "Page d'accueil portée par les avis et la preuve sociale",
        "Parcours de réservation simplifié",
      ],
      outcome: [
        "Une page d'accueil qui se bat sur la confiance avant le prix.",
        "La preuve sociale mise en avant au moment de la décision.",
        "Un parcours de réservation pensé pour convertir, pas seulement pour informer.",
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

export const credentialsFr: Credential[] = [
  {
    period: "2023 · aujourd'hui",
    role: "Fondateur et CTO",
    org: "InnoviaBurst, Tunis",
  },
  {
    period: "2023 · aujourd'hui",
    role: "Enseignant en informatique",
    org: "IMSET (Honoris United)",
  },
  {
    period: "2025 · aujourd'hui",
    role: "Partenaire formation",
    org: "Smart Tunisian Technoparks · تونس للأقطاب التكنولوجية",
  },
  {
    period: "Spécialité",
    role: "Architecture logicielle",
    org: "Conception et livraison de produits de bout en bout",
  },
];
