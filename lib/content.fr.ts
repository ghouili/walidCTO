/**
 * French version of lib/content.ts: process steps and FAQ for the /fr locale.
 * The FAQ also feeds the French FAQPage JSON-LD.
 */

import type { Faq, ProcessStep } from "./content";

export const processStepsFr: ProcessStep[] = [
  {
    num: "01",
    title: "Appel découverte",
    desc: "30 minutes pour comprendre où vous en êtes et ce qui vous bloque. Pas de discours commercial : si je ne suis pas la bonne personne, je vous oriente vers quelqu'un qui l'est.",
  },
  {
    num: "02",
    title: "Périmètre et prix fixes",
    desc: "Sous quelques jours, vous recevez par écrit le périmètre, le calendrier et le prix. Vous savez exactement ce que vous achetez avant que le travail commence.",
  },
  {
    num: "03",
    title: "Des cycles courts et visibles",
    desc: "On avance par incréments hebdomadaires. Vous voyez des progrès concrets chaque semaine, et chaque commit, décision ou document vous appartient dès qu'il est livré.",
  },
  {
    num: "04",
    title: "Une passation propre",
    desc: "Dépôts, infrastructure et documentation sont à vous dès le premier jour. La mission se met en pause ou s'arrête à des points d'étape convenus : pas de lock-in, aucune dépendance envers moi.",
  },
];

export const faqsFr: Faq[] = [
  {
    q: "Qu'est-ce qu'un CTO à temps partagé ?",
    a: "Un CTO à temps partagé (on parle aussi de CTO externalisé) est un responsable technique senior qui travaille à temps partiel, en général 1 à 2 jours par semaine, pour une entreprise qui n'est pas encore prête à recruter un CTO à plein temps. Il prend en charge l'architecture, la revue de code, le recrutement technique et la roadmap. La startup bénéficie d'un jugement senior sans payer un salaire à temps plein.",
  },
  {
    q: "Combien coûte un CTO à temps partagé ?",
    a: "La mission de CTO à temps partagé est facturée au mois et l'audit technique au forfait. Le point de départ de chacun figure dans l'encadré Tarifs de sa page. Le montant final dépend du périmètre et du nombre de jours par semaine, et vous l'avez par écrit avant que le travail commence.",
    link: {
      href: "/fr/services/fractional-cto#pricing",
      label: "Voir les tarifs du CTO à temps partagé",
    },
  },
  {
    q: "CTO à temps partagé, CTO salarié ou agence : de quoi avez-vous besoin ?",
    a: "Le CTO à temps partagé est intégré à l'équipe, à temps partiel, pour les équipes qui n'ont pas encore de produit ou qui en sont au tout début et ont besoin d'un jugement senior maintenant. Le CTO salarié est un recrutement permanent, pour les équipes financées qui grandissent vite. L'agence livre un projet précis et bien spécifié, puis s'en va. La plupart des startups en démarrage ont besoin de la première option.",
  },
  {
    q: "À quel moment faire appel à un CTO à temps partagé ?",
    a: "Quand vous êtes sur le point de construire et que vous ne voulez pas partir dans la mauvaise direction. Quand ce que vous avez livré commence à casser. Quand il n'y a aucun développeur senior dans l'équipe. Quand vous levez des fonds et avez besoin de crédibilité technique. Ou quand vous grandissez plus vite que votre stack et votre équipe ne peuvent suivre.",
  },
  {
    q: "Qu'est-ce qu'un audit technique, et que contient le rapport ?",
    a: "Un audit technique, c'est deux semaines d'analyse approfondie de votre code, de votre infrastructure et des pratiques de votre équipe, sur un périmètre fixe. Le livrable est un registre des risques priorisé (architecture, sécurité, RGPD, infra, tests) où chaque constat est classé par impact et par effort, avec une correction concrète recommandée.",
  },
  {
    q: "Que vérifient les investisseurs lors d'une due diligence technique ?",
    a: "Avant un tour de seed, les investisseurs vérifient que le produit tiendra la croissance : architecture, sécurité, conformité RGPD, infrastructure, couverture de tests et façon dont l'équipe livre. J'ai réuni les 25 points que je vois vérifiés le plus souvent dans une checklist gratuite, à passer sur votre propre code en un après-midi.",
    link: {
      href: "/fr/checklist",
      label: "Recevoir la checklist gratuite de due diligence",
    },
  },
  {
    q: "Le développement nearshore en Tunisie est-il compatible avec le RGPD ?",
    a: "Oui. Je conçois avec le RGPD en tête dès le départ, je peux héberger sur une infrastructure située dans l'UE quand la localisation des données compte, et je travaille sous NDA. Tunis est à UTC+1 toute l'année : même heure que Paris en hiver, une heure de moins en été. Nos journées de travail se recouvrent donc toute l'année, et le nearshore vous apporte de la capacité sans les risques de conformité ni le décalage horaire des équipes offshore lointaines.",
  },
  {
    q: "Comment démarre une mission, et comment s'arrête-t-elle ?",
    a: "Chaque mission commence par un court appel et un périmètre fixe, mis par écrit. Le travail avance en cycles hebdomadaires, et vous pouvez faire une pause ou arrêter à chaque point d'étape convenu. Le code, l'infrastructure et la documentation vous appartiennent du début à la fin, donc il n'y a jamais de lock-in.",
  },
  {
    q: "Où êtes-vous basé, et sur quels fuseaux horaires travaillez-vous ?",
    a: "À Tunis, en Tunisie (UTC+1 toute l'année, sans heure d'été). C'est la même heure qu'à Paris en hiver et une heure de moins en été, donc mes journées recouvrent celles des équipes européennes. Tunis fait aussi le lien naturel avec la région MENA. On collabore dans la journée, sans les trous qu'imposent les équipes offshore lointaines.",
  },
  {
    q: "Dans quelles langues travaillez-vous ?",
    a: "Français, anglais et arabe : réunions, revues de code et documentation dans la langue qui convient à votre équipe.",
  },
  {
    q: "Comment gérez-vous la confidentialité et la propriété intellectuelle ?",
    a: "Je travaille volontiers sous NDA, et tout ce que je produis (code, infrastructure, documentation) vous appartient. La plupart de mes missions récentes sont couvertes par des NDA, c'est pourquoi certains noms de clients sont floutés sur ce site.",
  },
];
