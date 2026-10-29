# Ads tracking: GTM, GA4 and Google Ads conversions

How measurement works on walidghouili.com, and the exact steps to turn the
site's events into Google Ads conversions. The campaigns themselves are in
[`google-ads-plan.md`](google-ads-plan.md).

## How the site behaves

- **Nothing loads without consent.** When `NEXT_PUBLIC_GTM_ID` is set, an
  inline `<head>` script sets Google Consent Mode v2 defaults to `denied`
  for `ad_storage`, `ad_user_data`, `ad_personalization` and
  `analytics_storage`. Google Tag Manager is only injected after the visitor
  clicks **Accept** in the banner ("basic" Consent Mode: no cookieless pings
  before consent). The choice is stored in `localStorage` (`wg-consent`) and
  can be changed from **Cookie settings / Gérer les cookies** in the footer.
  Declining after accepting deletes the `_ga*` / `_gcl*` cookies.
- **Without `NEXT_PUBLIC_GTM_ID`** there is no banner and no Google script at
  all. Events still go into `window.dataLayer`, harmlessly.
- **Attribution.** `utm_*` and `gclid` from the landing URL are attached to
  every form submission (you'll see them at the bottom of the lead email)
  and `utm_*` are appended to Calendly links on click. With consent they're
  also kept in `sessionStorage` for the rest of the visit.
- **Page views.** The site is a Next.js app: moving between pages doesn't
  reload the page. GA4's enhanced measurement option "Page changes based on
  browser history events" (on by default) records those page views.

## Events pushed to the dataLayer

Source: `lib/analytics.ts`, `components/analytics/Analytics.tsx`,
`components/ContactForm.tsx`, `components/LandingPage.tsx`.

| Event                | When                                                                           | Parameters                                                            |
| -------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `contact_submit`     | Contact form sent successfully (home `#contact` or any `/lp/*`)                | `form_source` (`contact` or `lp:<slug>`), `locale`, `budget`, `stuck` |
| `checklist_download` | Checklist email gate submitted successfully                                    | `form_source` (`checklist`), `locale`                                 |
| `book_call_click`    | Click on any Calendly link                                                     | `link_url`, `page_path`                                               |
| `lp_view`            | A landing page renders                                                         | `lp_name` (slug), `lp_locale`, `lp_offer` (`audit` / `cto`)           |
| `scroll_75`          | 75% of a page scrolled, once per page view                                     | `page_path`                                                           |
| `outbound_click`     | Click on a link to another domain (client live sites, app stores, LinkedIn...) | `link_url`, `link_domain`, `page_path`                                |

`budget` values: `lt-5k`, `5k-15k`, `15k-40k`, `40k-plus`, `unsure`.
`stuck` values: `about-to-build`, `shipped-breaking`, `no-senior`, `raising`.

## 1. Create the GTM container and GA4 property

1. In Google Tag Manager, create a **Web** container for
   `walidghouili.com`. Copy its ID (`GTM-XXXXXXX`).
2. In Google Analytics, create a GA4 property and a web data stream for
   `https://walidghouili.com`. Copy the measurement ID (`G-XXXXXXXXXX`).
   In the stream's enhanced measurement settings, keep "Page changes based
   on browser history events" on.
3. Add `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` to the production env (see
   README, the value is baked in at build time, so redeploy after setting
   it).

## 2. Configure the container

In GTM:

1. **Admin → Container settings → Enable consent overview.**
2. **Variables → New → Data Layer Variable** for each of: `form_source`,
   `locale`, `budget`, `stuck`, `lp_name`, `lp_locale`, `lp_offer`,
   `link_url`, `link_domain`, `page_path`.
3. **Tags → New → Google tag** with your `G-` ID. Trigger: \*Initialization
   - All Pages\*. Consent settings: built-in checks are enough
     (`analytics_storage`).
4. **Tags → New → Conversion Linker.** Trigger: _All Pages_.
5. **Triggers → New → Custom Event**, one per event name above
   (`contact_submit`, `checklist_download`, `book_call_click`, `lp_view`,
   `scroll_75`, `outbound_click`).
6. **Tags → New → Google Analytics: GA4 Event**, one per trigger, event name
   identical to the trigger, with the parameters from the table above mapped
   to their Data Layer Variables.
7. **Preview** (Tag Assistant), accept the banner on the site, submit a test
   form, check every tag fires once. Then **Submit / Publish**.

## 3. Mark conversions in GA4

1. **Admin → Events**: once `contact_submit` and `checklist_download` have
   arrived at least once, toggle both as **Key events**.
2. **Admin → Custom definitions → Create custom dimension** (event scope)
   for `form_source`, `budget`, `stuck`, `lp_name`. This lets you report
   leads by landing page and by budget.

## 4. Import into Google Ads

1. **Google Ads → Tools → Data manager → Google Analytics (GA4) → Link**
   to the GA4 property. In GA4, **Admin → Google Ads links** should then
   show it, with auto-tagging enabled.
2. **Google Ads → Goals → Conversions → Summary → + New conversion action
   → Import → Google Analytics 4 properties → Web**. Select:
   - `contact_submit`: category _Submit lead form_, **Primary**, value
     `VALUE_LEAD` (placeholder, a rough value of a qualified lead), count
     _One_.
   - `checklist_download`: category _Download_, **Secondary** at launch,
     count _One_.
   - optionally `book_call_click`: category _Book appointment_,
     **Secondary**.
3. Make sure each campaign uses account-default goals (or a custom goal
   containing only _Submit lead form_), so bidding optimises on real leads.

Alternative: instead of importing from GA4, create a **Google Ads
Conversion Tracking** tag in GTM fired by the `contact_submit` trigger
(conversion ID and label from the conversion action). It reports faster and
does not depend on GA4's attribution. Keep only one of the two as Primary
to avoid double counting.

## 5. Test before spending

1. Open `https://walidghouili.com/lp/technical-audit?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=test123`.
2. The cookie banner shows. Before clicking it, DevTools → Network: no
   request to `googletagmanager.com`.
3. Click **Accept**: `gtm.js?id=GTM-...` loads.
4. Submit the form with a real address. You get the lead email with
   `utm_source: google ... gclid: test123` at the bottom.
5. GA4 → **Admin → DebugView** (with Tag Assistant connected) shows
   `lp_view` then `contact_submit`.
6. Click "Book a 30-min call" on the success screen: the Calendly URL
   carries `utm_source=google&utm_medium=cpc&utm_campaign=test`.
7. Within 24 to 48 hours the imported conversion shows activity in Google
   Ads (Goals → Conversions).

## Notes

- **Legal**: the privacy page (`/privacy`, `/fr/privacy`) describes the GA4
  and Google Ads cookies, the consent banner and withdrawal. Update it if
  you add other tags to the container (Meta, LinkedIn Insight...), and add
  their consent requirement in GTM.
- **Enhanced conversions** (hashed email) would need an explicit mention in
  the privacy page. Not enabled.
- **Offline conversions**: the `gclid` in each lead email lets you upload
  signed deals later (Goals → Conversions → Uploads) to optimise on revenue
  instead of form fills.
