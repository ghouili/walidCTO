# Launch checklist

Everything between this repo and a live, measured walid.ghouili.com, in
order. Tick as you go.

## 1. Fill the placeholders

- [ ] **Prices** in [`lib/pricing.ts`](../lib/pricing.ts):
      `PRICE_AUDIT` (fixed audit fee, EUR excl. VAT) and `PRICE_CTO_FROM`
      (fractional-CTO monthly starting price). Numbers, e.g. `4900`. Until
      then the pricing boxes say "confirmed in writing after the intro call"
      and the Offer JSON-LD has no price.
- [ ] **Testimonials** in [`lib/testimonials.ts`](../lib/testimonials.ts): one
      per client, with a quote they approved in writing, their name,
      role/company and LinkedIn URL. Ask:
  - [ ] Facturra
  - [ ] Débarras Aurea
  - [ ] Fresh Tenancy
  - [ ] Zorro Services
  - [ ] Guid'Up
- [ ] **GitHub URL** in [`lib/site.ts`](../lib/site.ts) (`social.github` is
      marked TODO as a placeholder). It's in the footer and in the JSON-LD
      `sameAs`.
- [ ] **Google Ads placeholders** in
      [`docs/google-ads-plan.md`](google-ads-plan.md): `DAILY_BUDGET_FR_AUDIT`,
      `DAILY_BUDGET_FR_CTO`, `DAILY_BUDGET_EN_CTO`, `MAX_CPC_CAP`,
      `VALUE_LEAD`.

`npm run build` prints a `[launch]` line listing the price and testimonial
placeholders still open.

## 2. Review before it goes public

- [ ] Read the 8 articles (`content/blog/`) and the FAQ hub
      (`lib/faq-hub.ts`) in both languages. Market figures are ranges
      (fractional CTO €3,000 to €10,000 a month, CTO day rates €700 to
      €1,500, Paris seed CTO €80k to €130k gross + 40 to 45% charges,
      senior freelance dev €450 to €750 a day): make sure you're happy to
      stand behind them.
- [ ] FAQ hub statements written from your engagement model that aren't
      elsewhere on the site: short questions answered on Slack/email between
      retainer days, heavy build work quoted separately from the retainer,
      the audit needing "a few hours" of the team with read-only access.
      Confirm or edit.
- [ ] Factur-X article (`factur-x-2026-e-invoicing-mandate`, FR
      `facture-electronique-2026-factur-x`): dates and obligations are as
      known on 27 Oct 2026, check against impots.gouv.fr. The Facturra case
      study says "FranceConnect Pro": the professional login is now usually
      called ProConnect, adjust if Facturra uses that name.
- [ ] `lib/work.ts` NDA entries are named "Helios Industrial Group" and
      "Lumen Training Institute". These names are no longer rendered
      anywhere, but they're in the repository. If they're real client names,
      replace them with neutral labels.
- [ ] Sabboura's usage unit: "chalk" in English, translated « craie » in
      French. Change it if the app calls it something else.
- [ ] Optional design call: the `--color-faint` grey (#a1a1aa) used for
      breadcrumbs, mono labels and the footer is below WCAG AA contrast on
      white (2.6:1). Lighthouse accessibility is still 96 to 97, but
      `#71717a` would pass (4.8:1) with a slightly darker look.

## 3. Email (Resend)

- [ ] Create a Resend account, add and verify the sending domain
      (`ghouili.com`): add the SPF, DKIM (and ideally DMARC) DNS records it
      shows.
- [ ] Create an API key with "sending access" only.

## 4. Production environment

- [ ] Write the production env file:

  ```bash
  NEXT_PUBLIC_SITE_URL=https://walid.ghouili.com
  RESEND_API_KEY=re_...
  CONTACT_TO=walid.ghouili@innoviaburst.com
  CONTACT_FROM=Walid Ghouili <site@ghouili.com>
  NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX   # once the container exists, see §9
  ```

- [ ] `base64 -w0 .env.production` and paste it as the `PRODUCTION_ENV_B64`
      secret in GitHub → Settings → Environments → `deploy`. (Or edit
      `.env.production` on the server directly.)

## 5. DNS

- [ ] `walid.ghouili.com`: A (and AAAA if the VPS has IPv6) → VPS IP.
- [ ] Keep `walid.innoviaburst.com` pointing at the same VPS: nginx answers it
      with a path-preserving 301 to the new host.
- [ ] Cloudflare (if used): DNS-only (grey cloud) while running certbot.
      If you turn the proxy on afterwards:
  - Bots → **disable "Managed robots.txt"**, otherwise Cloudflare replaces
    the site's robots.txt and its AI-crawler rules.
  - Check that Cloudflare's AI-crawler blocking is off, or GPTBot,
    ClaudeBot and PerplexityBot never reach the site.
  - SSL mode **Full (strict)**.

## 6. Server: nginx and certificates

```bash
cd /var/www/walid-ghouili-site && git pull   # or let the deploy do it
sudo cp deploy/nginx/walid.ghouili.com.conf /etc/nginx/sites-available/walid.ghouili.com
sudo ln -sf /etc/nginx/sites-available/walid.ghouili.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/walid.innoviaburst.com
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d walid.ghouili.com -d walid.innoviaburst.com
sudo nginx -t && sudo systemctl reload nginx
```

- [ ] `curl -I http://walid.innoviaburst.com/work/facturra` → 301 to
      `https://walid.ghouili.com/work/facturra`.
- [ ] `curl -I https://walid.ghouili.com/` shows `Strict-Transport-Security`
      once (not twice).
- [ ] `sudo certbot renew --dry-run` passes.

## 7. Deploy

```bash
git push origin production
```

The GitHub Action runs `deploy.sh` on the server (`npm ci`, `npm run build`,
`pm2 reload`). Then smoke test:

```bash
for p in / /fr /services/technical-audit /fr/services/fractional-cto /work/facturra \
         /blog /fr/blog /faq /fr/faq /checklist /fr/checklist \
         /lp/technical-audit /lp/audit-technique /lp/fractional-cto /lp/cto-a-temps-partage \
         /robots.txt /sitemap.xml /llms.txt /llms-full.txt /feed.xml /fr/feed.xml \
         /downloads/technical-due-diligence-checklist.pdf; do
  printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' https://walid.ghouili.com$p)" "$p"
done
```

- [ ] All 200.
- [ ] Send yourself a real enquiry from `/lp/technical-audit?utm_source=test`
      and a checklist request: both emails arrive, with the UTM lines.

## 8. Search engines

**Google Search Console**

- [ ] Add a property for the new site (Domain property `ghouili.com` via DNS
      TXT, or URL-prefix `https://walid.ghouili.com/`).
- [ ] Keep (or add) the old property `https://walid.innoviaburst.com/`.
- [ ] In the **old** property: Settings → **Change of address** → new site.
      If the tool refuses the subdomain move, nothing breaks: the 301s
      carry the move on their own, it just takes longer.
- [ ] Submit both sitemaps: `https://walid.ghouili.com/sitemap.xml` in the
      new property (one file, both languages with hreflang), and
      `https://walid.innoviaburst.com/sitemap.xml` in the old one so Google
      recrawls the old URLs and sees the redirects.
- [ ] URL Inspection → Request indexing for `/`, `/fr`, the 4 service pages
      in both languages, `/faq`, `/fr/faq`, `/blog`, `/fr/blog`.
- [ ] After a week: Pages report shows the `/lp/*` pages as "Excluded by
      noindex" (expected) and no 404s.

**Bing Webmaster Tools** (also feeds ChatGPT search and Copilot)

- [ ] Import the site from Search Console, or add `https://walid.ghouili.com`
      and verify. Submit the sitemap.

## 9. Measurement and Ads

- [ ] Create the GTM container and GA4 property, configure tags, key events
      and the Google Ads import: [`ads-tracking.md`](ads-tracking.md).
- [ ] Put `NEXT_PUBLIC_GTM_ID` in the production env and redeploy.
- [ ] Run the "Test before spending" steps in `ads-tracking.md`.
- [ ] Build the campaigns from [`google-ads-plan.md`](google-ads-plan.md).

## 10. Profiles and links

- [ ] **Google Business Profile**: create it for Tunis (category e.g.
      "Software company", secondary "Computer consultant"), website
      `https://walid.ghouili.com`, hours in CET. Google only allows a
      service area within about 2 hours' drive of the business address, so
      France can't be listed as the service area: describe "France, Germany,
      Netherlands, Spain, remote" in the business description instead.
- [ ] **LinkedIn**: profile contact info website → `https://walid.ghouili.com`;
      Featured section → the checklist (`/checklist` or `/fr/checklist`);
      InnoviaBurst company page link if it points to the old host.
- [ ] Calendly profile, GitHub profile, email signature: new URL.
- [ ] Ask the clients whose case studies are live (Facturra, Sabboura,
      Simplify for Kids, Guid'Up, Styly, Tnajem, Débarras Aurea, Zorro
      Services, Fresh Tenancy) whether they'd link to their case study from
      their own site's credits or footer.
