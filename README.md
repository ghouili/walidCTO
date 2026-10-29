# walidghouili.com

Personal site and lead engine for **Walid Ghouili**, fractional CTO, technical
audits and MVP builds, in English (default) and French (`/fr`).

## Stack

- **Next.js 15** (App Router) + **React 19**, TypeScript strict
- **Tailwind CSS v4**, design tokens in [`app/globals.css`](app/globals.css)
- `next/font` (Geist, Geist Mono), `next/og` for Open Graph images
- MDX blog with `next-mdx-remote` + `gray-matter` + `remark-gfm`
- Contact emails through the Resend HTTP API (no SDK)
- GTM / GA4 via `@next/third-parties`, behind a consent banner
- Deployed on a VPS: GitHub Actions → `deploy.sh` → PM2 behind nginx

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill what you need
npm run dev                  # http://localhost:3000
```

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Generates files (see below), then `next dev`       |
| `npm run build`     | Generates files, then `next build`                 |
| `npm start`         | Serves the production build                        |
| `npm run generate`  | Checklist PDFs + `llms.txt` / `llms-full.txt` only |
| `npm run lint`      | ESLint                                             |
| `npm run typecheck` | `tsc --noEmit`                                     |
| `npm run format`    | Prettier                                           |

Before every commit: `npm run typecheck && npm run lint && npm run build`.

## Environment variables

| Variable               | Needed in prod | What it does                                                                                                                                                                                                                                 |
| ---------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended    | Absolute URL, no trailing slash. Canonicals, hreflang, sitemap, OG, JSON-LD, llms.txt. Falls back to `https://walidghouili.com` ([`lib/site.ts`](lib/site.ts)).                                                                             |
| `RESEND_API_KEY`       | **Yes**        | Resend API key for the contact and checklist forms. Without it the API answers 503 in production (and logs the message instead of sending in dev).                                                                                           |
| `CONTACT_TO`           | No             | Where leads are sent. Defaults to the email in `lib/site.ts`.                                                                                                                                                                                |
| `CONTACT_FROM`         | Recommended    | Sender on a domain verified in Resend, e.g. `Walid Ghouili <site@walidghouili.com>`. Without it Resend's test sender is used, which only delivers to the Resend account owner. When set, checklist requesters also receive the PDF link by email. |
| `NEXT_PUBLIC_GTM_ID`   | For Ads        | `GTM-XXXXXXX`. Enables the consent banner and loads GTM after consent. Unset = no banner, no Google script. Baked in at build time: rebuild after changing it.                                                                               |

In production these live in `.env.production` on the server, written by
`deploy.sh` from the `PRODUCTION_ENV_B64` secret (base64 of the file) when
that secret is set.

## Generated files

`npm run generate` (run automatically by `predev` and `prebuild`) writes, from
the `lib/*` content files:

- `public/downloads/technical-due-diligence-checklist.pdf` and
  `checklist-due-diligence-technique.pdf`, from
  [`lib/checklist.ts`](lib/checklist.ts) ([`scripts/generate-checklist-pdf.ts`](scripts/generate-checklist-pdf.ts))
- `public/llms.txt` and `public/llms-full.txt`, from the services, case
  studies, FAQs, checklist and blog ([`scripts/generate-llms.ts`](scripts/generate-llms.ts))

All four are gitignored. The llms script also prints a `[launch]` warning
listing any price or testimonial placeholder still unfilled.

## Routing and languages

- Every page lives under [`app/[locale]`](app/%5Blocale%5D). English is served
  unprefixed (`/work/facturra`), French under `/fr` (`/fr/work/facturra`).
  [`middleware.ts`](middleware.ts) rewrites unprefixed URLs to the `en`
  locale internally and redirects any visible `/en/...` URL.
- Services and case studies share their slug across languages. Blog
  articles have translated slugs, paired by `translationKey`.
- English data lives in `lib/<name>.ts`, French in `lib/<name>.fr.ts` (same
  shape), read through [`lib/localized.ts`](lib/localized.ts). UI strings are
  in [`lib/dictionaries/en.ts`](lib/dictionaries/en.ts) and `fr.ts` (the
  French file is type-checked against the English one).
- Metadata for every page goes through `pageMetadata()` in
  [`lib/seo.ts`](lib/seo.ts) (canonical, hreflang, OG locale). Titles max 60
  characters, descriptions 140 to 155.

## Landing pages (`/lp/*`)

Paid-traffic pages with no site navigation, one offer, and one CTA (to the
form) repeated three times: pain headline → what you get → proof → price → FAQ
→ form. They are `noindex`, disallowed in `robots.txt` and absent from the
sitemap.

- Copy: [`lib/landing-pages.ts`](lib/landing-pages.ts). Template:
  [`components/LandingPage.tsx`](components/LandingPage.tsx).
- Current pages: `/lp/technical-audit` (EN), `/lp/audit-technique` (FR),
  `/lp/fractional-cto` (EN), `/lp/cto-a-temps-partage` (FR).
- **To add one:** add an entry to `landingPages`. If it's French, also add
  its slug to `FR_LANDING_PAGES` in `middleware.ts` (French LPs keep their
  French slug at `/lp/<slug>` without the `/fr` prefix). Keep the ad copy in
  [`docs/google-ads-plan.md`](docs/google-ads-plan.md) in sync.
- Each LP fires `lp_view` with `lp_name` = slug, and its form submits with
  `form_source` = `lp:<slug>`.

## Prices and testimonials

- **Prices:** set `PRICE_AUDIT` (fixed audit fee) and `PRICE_CTO_FROM`
  (monthly starting price) in [`lib/pricing.ts`](lib/pricing.ts), as numbers
  in EUR excluding VAT. They show in the `#pricing` box on the audit and
  fractional-CTO service pages and on the LPs, and in the Offer JSON-LD.
  While `null`, the box says the price is confirmed in writing.
- **Testimonials:** replace the `{{QUOTE}}`, `{{NAME}}`, `{{ROLE_COMPANY}}`,
  `{{LINKEDIN_URL}}` placeholders in
  [`lib/testimonials.ts`](lib/testimonials.ts). An entry stays hidden while
  any field still contains `{{`; the section appears (home, between Work and
  About, and on every LP) as soon as one entry is complete. Only publish
  quotes the client approved in writing.

## Adding a blog article

1. Create `content/blog/en/<slug>.mdx` and, for the French version,
   `content/blog/fr/<slug-fr>.mdx` with the same `translationKey`.
2. Frontmatter (validated at build, the build fails on a missing field):

   ```yaml
   ---
   title: "Full title, rendered as the H1"
   seoTitle: "HTML title, 60 characters max"
   description: "Meta description, 140 to 155 characters, answer first."
   date: "2026-11-15"
   updated: "2026-12-01" # optional
   translationKey: "shared-key-for-both-languages"
   tags: ["fractional-cto", "pricing"] # must exist in blogTags (lib/blog.ts)
   relatedService: "fractional-cto" # service slug
   relatedCaseStudy: "sabboura" # case-study slug
   tldr: # exactly 3 bullets, each quotable on its own
     - "..."
     - "..."
     - "..."
   ---
   ```

3. Body: Markdown with GFM tables and task lists, `##` / `###` headings
   only (the title is the H1). Answer the question in the first two
   sentences and restate it verbatim in one `##`. Don't use raw `<`, `>`,
   `{`, `}` in prose (MDX). Link internally with root-relative URLs
   (`/services/technical-audit`, `/fr/checklist`).
4. Run `npm run build`: the article gets its page, OG image, RSS entry
   (`/feed.xml`, `/fr/feed.xml`), sitemap entry with hreflang, and its
   llms.txt line.

## Measurement

Consent Mode v2 in basic mode: defaults are `denied`, GTM loads only after
the visitor accepts. Events (`contact_submit`, `checklist_download`,
`book_call_click`, `lp_view`, `scroll_75`, `outbound_click`) go to the
`dataLayer`, and `utm_*` are passed through to Calendly. Setup and Google Ads
import: [`docs/ads-tracking.md`](docs/ads-tracking.md). Campaigns:
[`docs/google-ads-plan.md`](docs/google-ads-plan.md).

## Deploy

Pushing to the `production` branch runs
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which SSHes to
the VPS, syncs the repo and runs [`deploy.sh`](deploy.sh) (`npm ci`,
`npm run build`, `pm2 reload`). nginx config:
[`deploy/nginx/walidghouili.com.conf`](deploy/nginx/walidghouili.com.conf)
(security headers, caching, 301 from the old `walid.innoviaburst.com`). The
same security headers are also set in [`next.config.ts`](next.config.ts).

Launch steps (DNS, certificates, Search Console, placeholders):
[`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md).

## Where things live

```
app/
  [locale]/            every page, per locale (home, services, work, blog,
                       faq, checklist, privacy, lp) + opengraph-image routes
  api/contact/         contact + checklist form endpoint (Resend)
  robots.ts, sitemap.ts
components/            page sections, LandingPage, ContactForm, analytics/,
                       blog/, ui/
content/blog/{en,fr}/  articles (MDX)
lib/
  site.ts              name, URL, email, social, booking link
  i18n.ts              locales, localePath, hreflang helpers
  dictionaries/        UI strings (EN, FR)
  *.ts / *.fr.ts       content: services, service-pages, work, content (FAQ,
                       process), faq-hub, checklist, landing-pages
  pricing.ts           PRICE_AUDIT, PRICE_CTO_FROM
  testimonials.ts      client quotes (placeholders until filled)
  blog.ts              MDX loader, tags
  seo.ts, jsonld.ts    metadata builder, JSON-LD graph
  analytics.ts         dataLayer events, consent
scripts/               PDF and llms.txt generators
assets/fonts/          Geist TTFs for OG image rendering
docs/                  ads tracking, Google Ads plan, launch checklist
deploy/nginx/          nginx site config
```
