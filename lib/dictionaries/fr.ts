/** French UI strings. Same shape as lib/dictionaries/en.ts. */

import type { Dictionary } from "@/lib/dictionaries/en";

export const fr: Dictionary = {
  meta: {
    title: "CTO à temps partagé et audit technique | Walid Ghouili",
    description:
      "CTO à temps partagé et audit technique pour startups françaises et européennes. Développement nearshore depuis Tunis, MVP en 4 semaines, RGPD intégré.",
    privacyTitle: "Confidentialité",
    privacyDescription:
      "Comment walid.ghouili.com traite vos données : aucun cookie de suivi, seules les données envoyées via un formulaire, par email ou via Calendly sont traitées.",
    checklistTitle: "Checklist due diligence technique (PDF gratuit)",
    checklistDescription:
      "Checklist due diligence technique : les 25 points que les investisseurs vérifient avant une levée seed, de l'architecture au RGPD. PDF gratuit.",
  },
  nav: {
    home: "Accueil",
    services: "Services",
    work: "Réalisations",
    faq: "FAQ",
    about: "À propos",
    cta: "Réserver un appel →",
    switchTo: "EN",
    switchToFull: "English version",
  },
  footer: {
    privacy: "Confidentialité",
    country: "Tunisie",
  },
  hero: {
    pill: "Disponible T4 2026 · 2 places",
    eyebrow: "CTO à temps partagé · Audit technique · Tunis",
    line1: [
      { t: "Construire" },
      { t: "le" },
      { t: "bon produit", g: true, after: "." },
    ],
    line2: [{ t: "Ou" }, { t: "réparer", g: true }, { t: "l'existant." }],
    h1MaxWidth: "17ch",
    selectorLabel: "De quoi avez-vous besoin ?",
    build: {
      tab: "Je dois construire",
      sub: "Pour les fondateurs qui s'apprêtent à construire. Je transforme votre idée en MVP livrable, pensé pour tenir la croissance, pas pour être réécrit dans un an.",
      proof: "De l'idée au MVP en 4 semaines environ",
      cta: "Réserver un appel projet",
      motif: "build",
    },
    audit: {
      tab: "C'est en ligne, et ça casse",
      sub: "Pour les équipes déjà en production. Une lecture approfondie de votre code, de votre infra et de votre équipe, avec un plan clair pour retrouver de la vélocité.",
      proof: "2 semaines d'audit du code, de l'infra et de l'équipe",
      cta: "Réserver un appel audit",
      motif: "audit",
    },
    secondaryCta: "Checklist due diligence gratuite",
    trust: ["20+ produits livrés", "Réponse sous 48 h", "FR · EN · AR"],
  },
  industries: { title: "Les secteurs où j'ai livré" },
  services: {
    eyebrow: "Ce que je fais",
    title: "Quatre façons de travailler ensemble.",
    sub: "Choisissez la formule qui correspond à votre situation. La plupart des clients commencent par l'une et passent ensuite à une autre.",
    statsTitle: "En chiffres",
  },
  process: {
    eyebrow: "Méthode",
    title: "Comment nous travaillerions ensemble.",
    sub: "Le même cadre pour un développement, un audit ou une mission de CTO à temps partagé : un périmètre fixé dès le départ, des progrès visibles, et tout vous appartient à la fin.",
  },
  work: {
    eyebrow: "Réalisations",
    title: "Quelques produits que j'ai livrés.",
    sub: "De vrais produits en production : SaaS, EdTech IA, marketplaces et applications mobiles Flutter et React Native, ainsi que des sites pour des services locaux et du B2B.",
    readCaseStudy: "Lire l'étude de cas",
    ndaNote: "Confidentiel, sous NDA",
    ndaClient: "Client confidentiel",
  },
  about: {
    eyebrow: "À propos",
    title:
      "Le profil technique senior que vous ne pouvez pas encore recruter à plein temps.",
    intro:
      "Je suis Walid Ghouili, CTO à temps partagé et consultant en audit technique à Tunis. J'apporte une ingénierie senior en nearshore aux startups européennes et tunisiennes en phase d'amorçage, en français, en anglais et en arabe. J'ai fondé InnoviaBurst pour ce travail produit en nearshore, et je suis le fondateur de",
    products: [
      {
        name: "Simplify for Kids",
        url: "https://simplify-kids.com/",
        desc: "une plateforme d'apprentissage par les histoires, propulsée par l'IA",
      },
      {
        name: "Sabboura",
        url: "https://sabboura.tn/",
        desc: "un tuteur IA pour les bacheliers tunisiens",
      },
      {
        name: "Tnajem",
        url: "https://tnajem.com/",
        desc: "une marketplace de cours particuliers",
      },
    ],
    and: "et",
    teach:
      "J'enseigne aussi l'informatique à l'IMSET (Honoris United Universities).",
    p2: "Je partage ma semaine entre écrire du code de production, relire celui des autres et expliquer tout cela à des étudiants en informatique. Ce mélange, c'est tout l'argument : je suis un ingénieur en activité, pas un consultant à slides.",
  },
  explainer: {
    eyebrow: "Les bases",
    title: "Qu'est-ce qu'un CTO à temps partagé ?",
    definition:
      "Un CTO à temps partagé est un responsable technique senior qui travaille à temps partiel, en général 1 à 2 jours par semaine, pour une entreprise qui n'est pas encore prête à recruter un CTO à plein temps. Il porte l'architecture, la revue de code, le recrutement technique et la feuille de route, et apporte à la startup un jugement senior sans le salaire d'un temps plein.",
    whenTitle: "Quand en avez-vous besoin ?",
    triggers: [
      "Vous êtes avant le produit et allez lancer le développement, sans vouloir partir dans la mauvaise direction.",
      "Vous avez livré quelque chose, et maintenant ça casse ou ça vous ralentit.",
      "Personne de senior dans l'équipe pour trancher les décisions difficiles.",
      "Vous levez des fonds et avez besoin d'un responsable technique crédible.",
      "Vous grandissez plus vite que votre stack et votre équipe ne peuvent suivre.",
    ],
    vsTitle: "CTO à temps partagé vs CTO à plein temps vs agence",
    head: ["", "CTO à temps partagé", "CTO à plein temps", "Agence / ESN"],
    rows: [
      [
        "Coût",
        "Forfait mensuel, temps partiel",
        "Salaire complet + BSPCE",
        "Au projet, souvent le plus élevé",
      ],
      [
        "Engagement",
        "1 à 2 jours/semaine, 3 mois min.",
        "Permanent",
        "Limité au projet",
      ],
      ["Intégré ?", "Oui, dans votre équipe", "Oui", "Non, externe"],
      [
        "Responsabilité",
        "Porte les décisions techniques",
        "Porte tout",
        "Livre le périmètre, puis s'en va",
      ],
      [
        "Idéal pour",
        "Avant ou juste après le lancement, besoin d'un jugement senior maintenant",
        "Startup financée en croissance, besoin d'un leader permanent",
        "Un développement ponctuel et bien spécifié",
      ],
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions que vous vous posez sans doute.",
  },
  cta: {
    titleA: "Voyons si je suis",
    titleB: "la bonne personne.",
    sub: "Dites-moi ce que vous construisez et où vous bloquez. Je réponds sous 48 heures, et si je ne suis pas la bonne personne, je connais souvent quelqu'un qui l'est.",
    preferTalk: "Vous préférez en parler d'abord ?",
    book: "Réserver un appel de 30 min",
  },
  servicePage: {
    whatYouGet: "Ce que vous obtenez",
    questions: "{service} : vos questions",
    relatedWork: "Réalisations liées",
    talkTitle: "Parlons de votre projet.",
    talkBody:
      "Un appel de 30 minutes, un périmètre écrit et un chiffre concret, sans surprise. Je réponds sous 48 heures.",
    start: "Démarrer la conversation →",
    book: "Réserver un appel de 30 min",
  },
  workPage: {
    visitLive: "Voir le site en ligne",
    getItOn: "Disponible sur",
    context: "Contexte",
    challenge: "Le défi",
    approach: "Approche",
    built: "Ce que nous avons construit",
    outcome: "Résultat",
    stack: "Stack",
    similarTitle: "Vous construisez quelque chose de similaire ?",
    similarBody:
      "Démarrons la conversation : un appel de 30 minutes, un périmètre écrit et un chiffre concret. Je réponds sous 48 heures.",
    start: "Démarrer la conversation →",
    raising: "Bientôt une levée ?",
    checklistLink:
      "Récupérez la checklist due diligence technique en 25 points →",
  },
  privacy: {
    eyebrow: "Mentions",
    title: "Confidentialité",
    updatedLabel: "Dernière mise à jour :",
    updated: "octobre 2026",
    blocks: [
      {
        title: "En bref",
        body: "Ce site est un portfolio personnel. Il ne dépose aucun cookie publicitaire ou de mesure d'audience et ne vous suit pas. Les seules données personnelles que je traite sont celles que vous m'envoyez volontairement, via un formulaire, par email ou en réservant un appel.",
      },
      {
        title: "Ce que le site collecte",
        body: "Rien d'automatique. Aucun script d'analytics, aucun pixel de suivi, aucun cookie propriétaire. Naviguer sur le site ne crée aucun profil de vous chez moi. Votre navigateur peut retenir que vous avez fermé le bandeau de la checklist (stockage local, jamais transmis).",
      },
      {
        title: "Formulaires de contact et de checklist",
        body: "Quand vous envoyez le formulaire de contact ou de checklist, ce que vous avez saisi (nom, email, entreprise, détails du projet) et les paramètres de campagne présents dans l'adresse de la page, le cas échéant, me sont transmis par email via [Resend](https://resend.com/legal/privacy-policy), un service d'envoi d'emails. Le site lui-même ne stocke rien. Resend conserve des journaux d'envoi selon sa propre politique. J'utilise ces informations uniquement pour vous répondre ou vous envoyer la checklist demandée.",
      },
      {
        title: "Quand vous m'écrivez",
        body: "Si vous écrivez à [{email}](mailto:{email}), je reçois ce que contient votre message : votre nom, votre adresse et ce que vous décrivez de votre projet. Je l'utilise uniquement pour vous répondre et, si nous travaillons ensemble, pour réaliser la mission. Je ne le vends ni ne le partage avec personne.",
      },
      {
        title: "Réserver un appel (Calendly)",
        body: "Les boutons « Réserver un appel » ouvrent [Calendly](https://calendly.com/), un service de prise de rendez-vous tiers. Calendly traite alors les informations que vous saisissez (nom, email, créneau) et peut déposer ses propres cookies selon [sa politique de confidentialité](https://calendly.com/privacy). Je ne reçois que les détails de réservation que vous envoyez.",
      },
      {
        title: "Hébergement",
        body: "Le site tourne sur un serveur privé qui conserve des journaux serveur classiques (adresse IP, heure de la requête) pour la sécurité et l'exploitation, pendant une durée limitée. Votre adresse IP sert aussi, en mémoire uniquement, à limiter le spam sur les formulaires. Un hébergement dans l'UE est possible pour les projets clients sur demande.",
      },
      {
        title: "Vos droits",
        body: "Le RGPD vous permet de demander l'accès, la rectification ou la suppression des données personnelles que je détiens sur vous, ou de vous opposer à leur utilisation. Écrivez à [{email}](mailto:{email}) et je m'en occupe rapidement.",
      },
      {
        title: "Modifications",
        body: "Si ce site se met à collecter quoi que ce soit de nouveau, je mettrai cette page et la date ci-dessus à jour avant de le faire.",
      },
    ],
  },
  notFound: {
    title: "Page introuvable",
    body: "Cette page n'existe pas, ou elle a changé d'adresse.",
    home: "Retour à l'accueil",
  },
  form: {
    name: "Votre nom",
    email: "Email professionnel",
    company: "Site de l'entreprise",
    companyPlaceholder: "votreentreprise.fr",
    building: "Que construisez-vous ?",
    buildingPlaceholder:
      "Une ou deux phrases suffisent : le produit, pour qui, où vous en êtes aujourd'hui.",
    budget: "Budget",
    budgetPlaceholder: "Choisissez une fourchette",
    budgetOptions: {
      "lt-5k": "Moins de 5 000 €",
      "5k-15k": "5 000 à 15 000 €",
      "15k-40k": "15 000 à 40 000 €",
      "40k-plus": "Plus de 40 000 €",
      unsure: "Je ne sais pas encore",
    },
    stuck: "Où bloquez-vous ?",
    stuckPlaceholder: "Choisissez le plus proche",
    stuckOptions: {
      "about-to-build": "Je m'apprête à construire",
      "shipped-breaking": "C'est en ligne, et ça casse",
      "no-senior": "Pas de développeur senior dans l'équipe",
      raising: "Je lève des fonds, il me faut de la crédibilité technique",
    },
    optional: "facultatif",
    submit: "Envoyer",
    sending: "Envoi…",
    privacy:
      "Je m'en sers uniquement pour vous répondre. Pas de newsletter, aucun partage. Voir la page confidentialité.",
    successTitle: "Bien reçu. Je vous réponds sous 48 heures.",
    successBody:
      "Si vous préférez ne pas attendre, réservez tout de suite un créneau de 30 minutes.",
    successCta: "Réserver un appel de 30 min",
    errorInvalid: "Vérifiez les champs signalés.",
    errorRateLimited:
      "Trop de messages depuis cette connexion. Réessayez dans quelques minutes.",
    errorGeneric: "L'envoi a échoué. Vous pouvez m'écrire directement à",
    errorEmail: "Saisissez une adresse email valide.",
    errorRequired: "Ce champ est obligatoire.",
  },
  checklistForm: {
    name: "Prénom",
    email: "Email",
    submit: "Recevoir la checklist",
    sending: "Envoi…",
    privacy:
      "Je vous envoie le lien du PDF, rien d'autre sauf si vous me répondez.",
    successTitle: "Voici votre checklist.",
    successBody:
      "Le téléchargement démarre tout seul. Sinon, utilisez le bouton ci-dessous.",
    download: "Télécharger le PDF",
    bookCta: "Envie de la passer en revue ensemble ? Réservez un appel",
  },
  testimonials: {
    eyebrow: "Clients",
    title: "Ce qu'en disent les fondateurs.",
  },
  pricing: {
    eyebrow: "Tarif",
    from: "À partir de",
    perMonth: "/ mois",
    fixed: "prix fixe",
    exVat: "HT",
    fallback: "Prix fixe, confirmé par écrit après le premier appel",
    auditIncludes: [
      "Deux semaines, périmètre fixe",
      "Registre des risques écrit, classé par impact et effort",
      "Plan de remédiation ordonné, exécutable par n'importe quelle équipe",
      "Restitution avec vous et votre équipe",
      "Sous NDA sur demande",
    ],
    ctoIncludes: [
      "1 à 2 jours par semaine, intégré à votre équipe",
      "Architecture, revue de code, recrutement et feuille de route",
      "3 mois minimum, pause ou arrêt aux points d'étape convenus",
      "Un interlocuteur senior aux heures de bureau européennes",
      "Tout est documenté et vous appartient",
    ],
    cta: "Réserver un appel",
  },
  nudge: {
    text: "Bientôt une levée ? Récupérez la checklist due diligence technique en 25 points.",
    cta: "Checklist gratuite",
    dismiss: "Fermer",
  },
  lp: {
    trust: "Réponse sous 48 h · Sous NDA · FR · EN · AR",
    proofEyebrow: "Références",
    proofTitle: "Par quelqu'un qui met du code en production.",
    faqTitle: "Vos questions avant de réserver.",
    formEyebrow: "Prochaine étape",
    privacy: "Confidentialité",
  },
  checklistPage: {
    eyebrow: "Checklist gratuite",
    formTitle: "Recevoir le PDF",
    formBody:
      "25 points, chacun avec ce qu'est une bonne réponse et le signal d'alerte que cherchent les relecteurs. Imprimez-la et passez-la en revue avec votre lead dev.",
    insideTitle: "Au programme",
    auditCtaTitle: "Vous préférez la confier à quelqu'un ?",
    auditCtaBody:
      "Un audit technique de deux semaines transforme cette checklist en liste priorisée de constats, avec les corrections dans l'ordre.",
    auditCta: "Voir l'audit technique",
  },
};
