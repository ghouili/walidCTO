/** French UI strings. Same shape as lib/dictionaries/en.ts. */

import type { Dictionary } from "@/lib/dictionaries/en";

export const fr: Dictionary = {
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
