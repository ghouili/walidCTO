/**
 * French version of lib/services.ts: services bento grid, headline stats and
 * industries strip for the /fr locale. Same slugs, sizes and visuals.
 */

import type { Service, Stat } from "./services";

export const servicesFr: Service[] = [
  {
    num: "01",
    slug: "mvp-development",
    label: "CONSTRUIRE",
    title: "Votre MVP, livré proprement.",
    desc: "Seul ou à la tête d'une petite équipe, je fais passer votre idée de la maquette Figma à la production. Applications web, plateformes SaaS, outils internes. Sur une stack qui ne vous coincera pas au bout de six mois.",
    detail: "SPRINTS DE 4 SEMAINES · PÉRIMÈTRE FIXE",
    size: "feature",
    visual: "orbit",
  },
  {
    num: "02",
    slug: "fractional-cto",
    label: "PILOTER",
    title: "CTO à temps partagé.",
    desc: "1 à 2 jours par semaine, je suis le senior dans la pièce : architecture, revues de code, recrutement. La voix technique expérimentée que votre équipe n'a pas encore.",
    detail: "3 MOIS MINIMUM",
    size: "feature",
    visual: "drift",
  },
  {
    num: "03",
    slug: "technical-audit",
    label: "AUDITER",
    title: "Trouver ce qui coince.",
    desc: "Deux semaines de lecture approfondie de votre code, de votre infra et des pratiques de l'équipe.",
    detail: "2 SEMAINES",
    size: "standard",
  },
  {
    num: "04",
    slug: "workshops",
    label: "FORMER",
    title: "Ateliers et formations.",
    desc: "Les stacks web modernes pour les équipes tech. En français et en anglais.",
    detail: "SUR SITE / À DISTANCE",
    size: "standard",
  },
];

export const statsFr: Stat[] = [
  { value: "4 sem.", label: "De l'idée à un MVP livrable" },
  { value: "20+", label: "Produits mis en production" },
  { value: "3", label: "Langues de travail : FR · EN · AR" },
  { value: "48 h", label: "Délai de réponse aux nouvelles demandes" },
];

export const industriesFr: string[] = [
  "SaaS B2B",
  "Hôtellerie",
  "Secteur public",
  "EdTech et IA",
  "FinTech",
];
