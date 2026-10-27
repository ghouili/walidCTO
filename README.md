# Walid Ghouili — Personal Brand Site

Production-ready personal brand site for **Walid Ghouili**, Fractional CTO &
Engineering Consultant. Built as a faithful, engineered replica of the design
mockup (`walid-ghouili-stripe.html`).

## Stack

- **Next.js 15** (App Router) + **React 19**, TypeScript (strict mode)
- **Tailwind CSS v4** (CSS-first — design tokens live in [`app/globals.css`](app/globals.css))
- **next/font/google** — Geist + Geist Mono, `display: swap`
- ESLint (flat config) + Prettier (with `prettier-plugin-tailwindcss`)
- 100% Server Components — no client-side JS shipped
- Vercel-deployable out of the box

## Local setup

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm format       # Prettier --write
pnpm format:check # Prettier --check
```

> Uses **pnpm**. `npm` / `yarn` work too — swap the command prefix.

## Environment variables

| Variable               | Required | Description                                                                                            |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | No\*     | Absolute production URL, no trailing slash. Drives canonical URL, OG/Twitter images, sitemap, JSON-LD. |

\*Falls back to `https://walid.ghouili.com` (see [`lib/site.ts`](lib/site.ts))
if unset. Copy `.env.example` → `.env.local` to override locally.

```bash
cp .env.example .env.local
```

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel: **New Project** → import the repo. The framework preset
   (**Next.js**) is auto-detected — no build config needed.
3. Add the environment variable **`NEXT_PUBLIC_SITE_URL`** (e.g.
   `https://walid.ghouili.com`) under **Settings → Environment Variables**.
4. Deploy. `robots.txt`, `sitemap.xml`, and the favicon are generated
   automatically by the App Router.

## Where to edit content

All copy is externalized into typed data files — no JSX edits required:

| Content                             | File                                 |
| ----------------------------------- | ------------------------------------ |
| Site name, URL, email, social links | [`lib/site.ts`](lib/site.ts)         |
| Services (bento cards)              | [`lib/services.ts`](lib/services.ts) |
| Stats + industries strip            | [`lib/services.ts`](lib/services.ts) |
| Selected work entries (NDA toggle)  | [`lib/work.ts`](lib/work.ts)         |
| Credentials (About section)         | [`lib/work.ts`](lib/work.ts)         |
| Design tokens (colors, fonts, etc.) | [`app/globals.css`](app/globals.css) |

To add a work entry, append to the `work` array in `lib/work.ts`. Set
`nda: false` to show a client name unblurred (the badge is hidden automatically).

### Placeholder links to replace

`lib/site.ts` ships with placeholders you should update with real URLs:

- `social.github` — your GitHub profile
- `bookingUrl` — your scheduling link (Cal.com / Calendly), used by the
  "Book a call" / "Book a 30-min call" buttons

## ⚠️ Add a dedicated OG card later

The portrait `public/walidGH.png` is **1024×983** (near-square). It is used as
the Open Graph / Twitter image as a stopgap, so social previews will be
**center-cropped**. For best link-preview rendering, create a dedicated
**1200×630** OG card and point `openGraph.images` / `twitter.images` in
[`app/layout.tsx`](app/layout.tsx) at it (e.g. `public/og.png`).

## Project structure

```
app/
  layout.tsx        Root layout — fonts, SEO metadata, JSON-LD, skip link
  page.tsx          Home page composition
  globals.css       Tailwind v4 + design tokens + decorative CSS/animations
  robots.ts         robots.txt
  sitemap.ts        sitemap.xml
  icon.svg          Favicon (gradient sparkle mark)
components/
  Nav, Hero, IndustriesStrip, Services, Stats, Work, About, CTA, Footer
  ui/               Button, NDABadge, GradientPill, Container
lib/
  site.ts           Site config (URL, social, email)
  services.ts       Services, stats, industries
  work.ts           Work entries + credentials
```

## Notes on the build

- `create-next-app` now ships **Next.js 16** by default; this project is
  intentionally pinned to **Next.js 15** (latest 15.x) per spec.
- Tailwind **v4** is CSS-first, so there is no `tailwind.config.ts` — design
  tokens are defined with `@theme` in `app/globals.css` (functionally the same
  central token source, no magic hex in components).

## Accessibility & performance

- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Skip-to-content link, visible focus rings, keyboard-accessible controls
- `prefers-reduced-motion` disables the floating gradient animations
- Raster image served via `next/image`; fonts preloaded via `next/font`
- All decorative gradients are CSS — no layout-shifting JS
