# Google Ads plan

Three search campaigns sending paid traffic to the no-nav landing pages under `/lp/*`. The ad copy mirrors the landing-page copy in `lib/landing-pages.ts`, so the message match is tight: if you change one, change the other.

Tracking setup (GTM, GA4, conversion import) is in [`ads-tracking.md`](ads-tracking.md). Do that first: don't spend a euro before `contact_submit` shows up as a conversion in Google Ads.

## Account-level settings

| Setting              | Value                                                                                                                                                                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Campaign type        | Search only. Untick Display Network and Search Partners at launch.                                                                                                                                                                                                                            |
| Auto-tagging         | On (adds `gclid`, required for GA4 import and offline conversions).                                                                                                                                                                                                                           |
| Final URL suffix     | `utm_source=google&utm_medium=cpc&utm_campaign={_campaign}&utm_term={keyword}&utm_content={creative}` with a custom parameter `{_campaign}` per campaign (values below). The site passes `utm_*` through to Calendly and into contact emails.                                                 |
| Bidding at launch    | Maximise clicks with a max CPC cap (`MAX_CPC_CAP` placeholder) for the first 2 to 3 weeks, then Maximise conversions once a campaign has about 15 to 30 `contact_submit` conversions in 30 days.                                                                                              |
| Ad schedule          | Mon to Fri, 08:00 to 20:00 Paris time at launch (B2B intent), widen later if the data says so.                                                                                                                                                                                                |
| Assets               | Sitelinks: Pricing (`/services/technical-audit#pricing`, FR `/fr/services/technical-audit#pricing`), FAQ (`/faq`, `/fr/faq`), Due-diligence checklist (`/checklist` or `/fr/checklist`), Case study Facturra (`/work/facturra`). Callouts: Fixed price · Under NDA · Reply in 48h · FR/EN/AR. |
| Shared negative list | Add every campaign's negatives below to one shared list per language, plus the competitor and job-board names you see in the search terms report. Review search terms weekly.                                                                                                                 |

## Budgets (placeholders)

| Campaign                 | Daily budget              | Custom `{_campaign}` value | Landing page              |
| ------------------------ | ------------------------- | -------------------------- | ------------------------- |
| FR · Audit technique     | `DAILY_BUDGET_FR_AUDIT` € | `fr-audit`                 | `/lp/audit-technique`     |
| FR · CTO à temps partagé | `DAILY_BUDGET_FR_CTO` €   | `fr-cto`                   | `/lp/cto-a-temps-partage` |
| EN · Fractional CTO EU   | `DAILY_BUDGET_EN_CTO` €   | `en-cto-eu`                | `/lp/fractional-cto`      |

Rule of thumb: a daily budget of at least 5 to 10 times your expected CPC per campaign, otherwise the campaign can't collect enough clicks to learn. Fill the placeholders once you see real CPCs in Keyword Planner.

## Campaign: FR · Audit technique

- Landing page: `https://walidghouili.com/lp/audit-technique`
- Locations: France (presence: "People in or regularly in your targeted locations")
- Language: Français
- Daily budget: `DAILY_BUDGET_FR_AUDIT`

### Keywords (one ad group)

| Keyword                             | Match type |
| ----------------------------------- | ---------- |
| `[audit technique startup]`         | exact      |
| `"audit technique startup"`         | phrase     |
| `[audit de code]`                   | exact      |
| `"audit de code source"`            | phrase     |
| `[due diligence technique]`         | exact      |
| `"due diligence technique startup"` | phrase     |
| `"audit technique application web"` | phrase     |
| `"audit application mobile"`        | phrase     |
| `[audit architecture logicielle]`   | exact      |
| `"audit dette technique"`           | phrase     |

### Negative keywords (phrase match)

`emploi`, `offre d'emploi`, `salaire`, `formation`, `stage`, `alternance`, `définition`, `c'est quoi`, `cours`, `gratuit`, `exemple`, `modèle`, `pdf`, `seo`, `référencement`, `comptable`, `financier`, `énergétique`, `iso 27001`

### RSA 1: Douleur : le code ralentit l'équipe

| #   | Headline (max 30)             | Chars |
| --- | ----------------------------- | ----- |
| 1   | Audit technique en 2 semaines | 29    |
| 2   | Votre code vous ralentit ?    | 26    |
| 3   | Sachez quoi corriger d'abord  | 28    |
| 4   | Audit de code pour startups   | 27    |
| 5   | Registre des risques priorisé | 29    |
| 6   | Prix fixe, périmètre fixe     | 25    |
| 7   | Rapport écrit + restitution   | 27    |
| 8   | Architecture, sécurité, RGPD  | 28    |
| 9   | Infra, tests et pratiques     | 25    |
| 10  | Avant une levée de fonds      | 24    |
| 11  | Code hérité d'une agence ?    | 26    |
| 12  | Réponse sous 48 h             | 17    |
| 13  | Travail sous NDA              | 16    |
| 14  | Par un CTO en activité        | 22    |
| 15  | Réservez votre audit          | 20    |

| #   | Description (max 90)                                                                      | Chars |
| --- | ----------------------------------------------------------------------------------------- | ----- |
| 1   | Je lis votre code, votre infra et votre historique. Vous saurez quoi corriger en premier. | 89    |
| 2   | Deux semaines, prix fixe, rapport écrit et restitution. Sans engagement pour la suite.    | 86    |
| 3   | Architecture, sécurité, RGPD, infra, tests : chaque risque classé par impact et effort.   | 87    |
| 4   | Basé à Tunis, mêmes horaires que Paris. Français, anglais, arabe. Réponse sous 48 h.      | 84    |

### RSA 2: Due diligence : préparer une levée

| #   | Headline (max 30)            | Chars |
| --- | ---------------------------- | ----- |
| 1   | Due diligence technique      | 23    |
| 2   | Préparez votre levée seed    | 25    |
| 3   | Ce que vérifient les VC      | 23    |
| 4   | Audit avant la data room     | 24    |
| 5   | 25 points vérifiés           | 18    |
| 6   | Audit technique startup      | 23    |
| 7   | Rapport prêt pour les fonds  | 27    |
| 8   | Corrigez avant qu'on demande | 28    |
| 9   | Sécurité et RGPD vérifiés    | 25    |
| 10  | Prix fixe, 2 semaines        | 21    |
| 11  | CTO à temps partagé          | 19    |
| 12  | 20+ produits livrés          | 19    |
| 13  | Sous NDA, accès retirés      | 23    |
| 14  | Restitution avec l'équipe    | 25    |
| 15  | Parlons de votre levée       | 22    |

| #   | Description (max 90)                                                                   | Chars |
| --- | -------------------------------------------------------------------------------------- | ----- |
| 1   | Les points que les investisseurs vérifient, audités avant l'ouverture de la data room. | 86    |
| 2   | Un registre des risques écrit, priorisé, avec les corrections dans l'ordre. Prix fixe. | 86    |
| 3   | Architecture, sécurité, RGPD, sauvegardes, tests, propriété du code : tout est passé.  | 85    |
| 4   | Deux semaines, sous NDA, sans arrêter votre équipe. Réservez un appel de 30 minutes.   | 84    |

### RSA 3: Reprise : code hérité, refonte envisagée

| #   | Headline (max 30)              | Chars |
| --- | ------------------------------ | ----- |
| 1   | Refonte ou pas ? Auditez       | 24    |
| 2   | Audit de code indépendant      | 25    |
| 3   | Code hérité d'un prestataire   | 28    |
| 4   | Que garder, que refaire ?      | 25    |
| 5   | Audit technique à prix fixe    | 27    |
| 6   | Résultat en 2 semaines         | 22    |
| 7   | Next.js, Node, Python, Flutter | 30    |
| 8   | Constats classés par effort    | 27    |
| 9   | Plan de remédiation clair      | 25    |
| 10  | Exécutable par votre équipe    | 27    |
| 11  | Sans dépendance au prestataire | 30    |
| 12  | Audit de code startup          | 21    |
| 13  | Un regard senior extérieur     | 26    |
| 14  | Réponse sous 48 h              | 17    |
| 15  | Demandez votre audit           | 20    |

| #   | Description (max 90)                                                                    | Chars |
| --- | --------------------------------------------------------------------------------------- | ----- |
| 1   | Avant une refonte, sachez ce qui marche. Un audit de deux semaines évite de tout jeter. | 87    |
| 2   | Je reprends l'historique, je lance le code et j'interroge l'équipe. Constats priorisés. | 87    |
| 3   | Stacks JS/TS, Python, PostgreSQL, MongoDB, Flutter et React Native, plus l'infra.       | 81    |
| 4   | Le rapport sert à n'importe quelle équipe, la mienne ou la vôtre. Sans engagement.      | 82    |

Pin headline 1 to position 1 in each RSA only if Ad Strength stays at least "Good". Once `PRICE_AUDIT` / `PRICE_CTO_FROM` are filled in `lib/pricing.ts`, add a price headline (for example "Audit à PRICE_AUDIT € HT" or "From PRICE_CTO_FROM €/month") to each RSA: a visible price filters out the wrong clicks.

## Campaign: FR · CTO à temps partagé

- Landing page: `https://walidghouili.com/lp/cto-a-temps-partage`
- Locations: France (presence: "People in or regularly in your targeted locations")
- Language: Français
- Daily budget: `DAILY_BUDGET_FR_CTO`

### Keywords (one ad group)

| Keyword                           | Match type |
| --------------------------------- | ---------- |
| `[cto à temps partagé]`           | exact      |
| `"cto temps partagé"`             | phrase     |
| `[cto freelance]`                 | exact      |
| `"cto freelance startup"`         | phrase     |
| `[cto externalisé]`               | exact      |
| `"cto externalisé startup"`       | phrase     |
| `[cto part time]`                 | exact      |
| `"cto à la demande"`              | phrase     |
| `"directeur technique freelance"` | phrase     |
| `"cto as a service"`              | phrase     |

### Negative keywords (phrase match)

`emploi`, `offre`, `poste`, `salaire`, `rémunération`, `formation`, `stage`, `alternance`, `définition`, `c'est quoi`, `fiche de poste`, `devenir`, `cv`, `tjm`, `mission freelance`, `portage`, `école`

### RSA 1: Jugement de CTO sans le salaire

| #   | Headline (max 30)           | Chars |
| --- | --------------------------- | ----- |
| 1   | CTO à temps partagé         | 19    |
| 2   | Un CTO, pas son salaire     | 23    |
| 3   | 1 à 2 jours par semaine     | 23    |
| 4   | CTO externalisé startup     | 23    |
| 5   | Architecture et code review | 27    |
| 6   | Recrutement technique       | 21    |
| 7   | Feuille de route défendable | 27    |
| 8   | Forfait mensuel             | 15    |
| 9   | Prêt pour vos investisseurs | 27    |
| 10  | Heures de bureau de Paris   | 25    |
| 11  | Tout reste à vous           | 17    |
| 12  | 20+ produits livrés         | 19    |
| 13  | Réponse sous 48 h           | 17    |
| 14  | CTO freelance senior        | 20    |
| 15  | Réservez un appel CTO       | 21    |

| #   | Description (max 90)                                                                   | Chars |
| --- | -------------------------------------------------------------------------------------- | ----- |
| 1   | Architecture, revue de code, recrutement et feuille de route, 1 à 2 jours par semaine. | 86    |
| 2   | Forfait mensuel, 3 mois minimum. Documents, dépôts et décisions vous appartiennent.    | 83    |
| 3   | Un CTO en activité qui écrit encore du code. Français, anglais, arabe. Sous NDA.       | 80    |
| 4   | Basé à Tunis, même heure que Paris en hiver. Premier appel de 30 minutes offert.       | 80    |

### RSA 2: Fondateur non technique

| #   | Headline (max 30)            | Chars |
| --- | ---------------------------- | ----- |
| 1   | Fondateur non technique ?    | 25    |
| 2   | Un CTO pour trancher         | 20    |
| 3   | CTO à temps partagé          | 19    |
| 4   | Qui porte l'architecture ?   | 26    |
| 5   | Encadrez vos freelances      | 23    |
| 6   | Choix techniques expliqués   | 26    |
| 7   | Coûts, risques et délais     | 24    |
| 8   | Sans jargon, sans dépendance | 28    |
| 9   | Revue du code de l'agence    | 25    |
| 10  | MVP bien construit           | 18    |
| 11  | CTO externalisé              | 15    |
| 12  | 1 à 2 jours par semaine      | 23    |
| 13  | Forfait mensuel              | 15    |
| 14  | Réponse sous 48 h            | 17    |
| 15  | Parlons de votre produit     | 24    |

| #   | Description (max 90)                                                                    | Chars |
| --- | --------------------------------------------------------------------------------------- | ----- |
| 1   | Je traduis la technique en coûts, risques et délais pour que vous décidiez sereinement. | 87    |
| 2   | Vos freelances ou votre agence livrent ? Je porte l'architecture et relis ce qui part.  | 86    |
| 3   | Une feuille de route que vous pouvez défendre face aux investisseurs. Forfait mensuel.  | 86    |
| 4   | Tout est documenté et vous appartient. Vous pouvez arrêter aux points d'étape prévus.   | 85    |

### RSA 3: Levée de fonds et crédibilité technique

| #   | Headline (max 30)          | Chars |
| --- | -------------------------- | ----- |
| 1   | Les VC veulent un CTO ?    | 23    |
| 2   | CTO à temps partagé        | 19    |
| 3   | Crédibilité technique      | 21    |
| 4   | Prêt pour la due diligence | 26    |
| 5   | Feuille de route crédible  | 25    |
| 6   | Recrutez vos premiers devs | 26    |
| 7   | Entretiens techniques      | 21    |
| 8   | Puis passation au CTO      | 21    |
| 9   | CTO freelance pour startup | 26    |
| 10  | 1 à 2 jours par semaine    | 23    |
| 11  | Heures de bureau de Paris  | 25    |
| 12  | Sous NDA                   | 8     |
| 13  | 20+ produits en production | 26    |
| 14  | Réponse sous 48 h          | 17    |
| 15  | Réservez un appel          | 17    |

| #   | Description (max 90)                                                                     | Chars |
| --- | ---------------------------------------------------------------------------------------- | ----- |
| 1   | Un responsable technique crédible face aux fonds, et un code prêt pour la due diligence. | 88    |
| 2   | Je définis le poste, mène les entretiens et prépare la passation à votre futur CTO.      | 83    |
| 3   | Architecture, revue de code, recrutement : 1 à 2 jours par semaine, forfait mensuel.     | 84    |
| 4   | Basé à Tunis, réunions en français ou en anglais. Je réponds sous 48 heures.             | 76    |

Pin headline 1 to position 1 in each RSA only if Ad Strength stays at least "Good". Once `PRICE_AUDIT` / `PRICE_CTO_FROM` are filled in `lib/pricing.ts`, add a price headline (for example "Audit à PRICE_AUDIT € HT" or "From PRICE_CTO_FROM €/month") to each RSA: a visible price filters out the wrong clicks.

## Campaign: EN · Fractional CTO EU

- Landing page: `https://walidghouili.com/lp/fractional-cto`
- Locations: Germany, Netherlands, Spain (add Belgium, Ireland, Nordics once it converts) (presence: "People in or regularly in your targeted locations")
- Language: English
- Daily budget: `DAILY_BUDGET_EN_CTO`

### Keywords (one ad group)

| Keyword                         | Match type |
| ------------------------------- | ---------- |
| `[fractional cto]`              | exact      |
| `"fractional cto"`              | phrase     |
| `"fractional cto for startups"` | phrase     |
| `[fractional cto services]`     | exact      |
| `"part time cto"`               | phrase     |
| `"outsourced cto"`              | phrase     |
| `"cto as a service"`            | phrase     |
| `"virtual cto"`                 | phrase     |
| `"fractional cto germany"`      | phrase     |
| `"fractional cto netherlands"`  | phrase     |

### Negative keywords (phrase match)

`jobs`, `job`, `salary`, `hiring`, `career`, `careers`, `vacancy`, `course`, `training`, `certification`, `definition`, `what is`, `meaning`, `how to become`, `become a`, `resume`, `intern`, `india`, `usa`, `upwork`

### RSA 1: CTO judgment without the salary

| #   | Headline (max 30)            | Chars |
| --- | ---------------------------- | ----- |
| 1   | Fractional CTO for Startups  | 27    |
| 2   | CTO Judgment, Not the Salary | 28    |
| 3   | 1 to 2 Days a Week           | 18    |
| 4   | Architecture & Code Review   | 26    |
| 5   | Hiring Your First Engineers  | 27    |
| 6   | A Roadmap Investors Trust    | 25    |
| 7   | Monthly Retainer             | 16    |
| 8   | Works EU Business Hours      | 23    |
| 9   | You Own Everything           | 18    |
| 10  | 20+ Products Shipped         | 20    |
| 11  | Replies Within 48 Hours      | 23    |
| 12  | Senior, Hands-On CTO         | 20    |
| 13  | French, English, Arabic      | 23    |
| 14  | Nearshore from Tunis         | 20    |
| 15  | Book a CTO Call              | 15    |

| #   | Description (max 90)                                                                 | Chars |
| --- | ------------------------------------------------------------------------------------ | ----- |
| 1   | Architecture, code review, hiring and a roadmap you can defend, 1 to 2 days a week.  | 83    |
| 2   | Monthly retainer, 3-month minimum. Repos, docs and decisions are yours from day one. | 84    |
| 3   | A working engineer who still ships code. Based in Tunis, on EU working hours.        | 77    |
| 4   | Reply within 48 hours. If a fractional CTO isn't the right fit, I'll say what is.    | 81    |

### RSA 2: No senior in the room

| #   | Headline (max 30)             | Chars |
| --- | ----------------------------- | ----- |
| 1   | No Senior Engineer Yet?       | 23    |
| 2   | Fractional CTO                | 14    |
| 3   | Someone to Make the Calls     | 25    |
| 4   | Who Owns the Architecture?    | 26    |
| 5   | Lead Your Freelancers         | 21    |
| 6   | Review Your Agency's Code     | 25    |
| 7   | Build It Right the First Time | 29    |
| 8   | Part-Time CTO, Real Results   | 27    |
| 9   | Outsourced CTO for Startups   | 27    |
| 10  | Monthly Retainer              | 16    |
| 11  | EU Hours, Fast Replies        | 22    |
| 12  | Under NDA                     | 9     |
| 13  | No Lock-In                    | 10    |
| 14  | Replies Within 48 Hours       | 23    |
| 15  | Talk to a CTO This Week       | 23    |

| #   | Description (max 90)                                                                    | Chars |
| --- | --------------------------------------------------------------------------------------- | ----- |
| 1   | Your freelancers or agency ship features. I own the architecture and review what ships. | 87    |
| 2   | Non-technical founder? I turn technical choices into cost, risk and time you can weigh. | 87    |
| 3   | 1 to 2 days a week, embedded in your team. Everything documented and owned by you.      | 82    |
| 4   | Next.js, Node, Python, PostgreSQL, Flutter. Nearshore senior engineering from Tunis.    | 84    |

### RSA 3: Raising: technical credibility

| #   | Headline (max 30)            | Chars |
| --- | ---------------------------- | ----- |
| 1   | Investors Asking for a CTO?  | 27    |
| 2   | Fractional CTO               | 14    |
| 3   | Technical Credibility Now    | 25    |
| 4   | Ready for Due Diligence      | 23    |
| 5   | A Roadmap Investors Trust    | 25    |
| 6   | Hire Your First Engineers    | 25    |
| 7   | Then Hand Over to a Full CTO | 28    |
| 8   | Part-Time CTO for Startups   | 26    |
| 9   | 1 to 2 Days a Week           | 18    |
| 10  | EU Working Hours             | 16    |
| 11  | 20+ Products in Production   | 26    |
| 12  | Under NDA                    | 9     |
| 13  | Monthly Retainer             | 16    |
| 14  | Replies Within 48 Hours      | 23    |
| 15  | Book a 30-Min Call           | 18    |

| #   | Description (max 90)                                                                    | Chars |
| --- | --------------------------------------------------------------------------------------- | ----- |
| 1   | A credible technical lead in the room and a codebase ready for technical due diligence. | 87    |
| 2   | I define the CTO role, run interviews and hand over a documented system, not a mystery. | 87    |
| 3   | Architecture, code review, hiring and roadmap. Monthly retainer, 3-month minimum.       | 81    |
| 4   | Based in Tunis, on European business hours. English or French. Reply within 48 hours.   | 85    |

Pin headline 1 to position 1 in each RSA only if Ad Strength stays at least "Good". Once `PRICE_AUDIT` / `PRICE_CTO_FROM` are filled in `lib/pricing.ts`, add a price headline (for example "Audit à PRICE_AUDIT € HT" or "From PRICE_CTO_FROM €/month") to each RSA: a visible price filters out the wrong clicks.

## Conversion mapping

| Site event (dataLayer)        | GA4       | Google Ads conversion action            | Goal             | Optimisation                                                                                               |
| ----------------------------- | --------- | --------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `contact_submit`              | Key event | Imported from GA4: "Lead form (site)"   | Submit lead form | **Primary**. Value `VALUE_LEAD` (placeholder).                                                             |
| `checklist_download`          | Key event | Imported from GA4: "Checklist download" | Download         | Secondary at launch (observe). Promote to primary with a low value if leads are too sparse to optimise on. |
| `book_call_click`             | Event     | Optional import: "Calendly click"       | Book appointment | Secondary (observe only). It's a click, not a booking.                                                     |
| `lp_view`                     | Event     | Not imported                            |                  | Use in GA4 to compare LP conversion rates.                                                                 |
| `scroll_75`, `outbound_click` | Events    | Not imported                            |                  | Engagement diagnostics only.                                                                               |

To count actual Calendly bookings as conversions, connect Calendly's GA4 integration (paid Calendly plans) or add bookings back as offline conversions using the `gclid` that arrives in the contact email.

## Launch checklist for the ads

1. Tracking verified end to end (see `ads-tracking.md`, "Test before spending").
2. `PRICE_AUDIT` and `PRICE_CTO_FROM` filled, or at least a decision to run without a visible price.
3. At least one real testimonial live (`lib/testimonials.ts`): the LPs show the block automatically once one is filled.
4. Budgets and CPC cap filled.
5. Week 1: check the search terms report every two days and add negatives. Week 3: switch bidding if the conversion count allows.
