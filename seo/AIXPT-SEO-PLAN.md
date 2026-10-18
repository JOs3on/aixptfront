# AIXPT — SEO diagnosis & OpenSEO credit plan

Domain: `https://aixpt.ca` · Language: French (Québec) · Stack: Vite + React (SPA) on Vercel
Goal: businesses of all types contact AIXPT to deploy AI — primary products: **voice AI agent** and **website chatbot agent**.

---

## Part A — Why searching "aixpt" returns the /contact page

Confirmed by fetching the live site: **every URL returns byte-identical HTML.**

`https://aixpt.ca/` and `https://aixpt.ca/contact` both serve the same `<head>`:

```html
<title>AIXPT - L'automatisation IA au Québec</title>
```

The per-page titles/descriptions only exist in React (via `react-helmet-async`) and appear **after JavaScript runs**. Root causes, in order of impact:

1. **SPA with no prerendering/SSR.** All routes ship the same static `<head>`. Googlebot can render JS, but Bing (first pass), social scrapers, and most AI/LLM crawlers see one identical title for every page. Google then has to guess the "best" page for `aixpt` — and it guessed `/contact`.
2. **The homepage `<h1>` does not contain the brand.** The homepage headline is `L'IA qui travaille pendant que vous dormez.` (`CinematicHero.tsx`). `/contact` has "AIXPT" in its title, description, keywords **and** a services section. For a pure brand query, `/contact` looks more "on-brand" than the homepage. This is the single most likely trigger of what you saw.
3. **Two conflicting business entities in structured data.**
   - `index.html` ships a `LocalBusiness` JSON-LD on **every** page: `aixpt.ca`, +1-418-800-5085, support@aixpt.ca, Québec.
   - `App.tsx` (homepage only) injects a second `Organization` JSON-LD with **wrong data**: `url: https://aixpt.com`, phone `+1-555-123-4567`, email `info@aixpt.com`, city Montréal.
   Conflicting NAP/domain signals dilute the brand entity and the Google "site name" feature (which is why the SERP renders an odd `Aixpt` + `aixpt.ca › contact` combination).
4. **No canonical tags anywhere.** With duplicate HTML per route, Google's canonicalization is unstable. Each page should self-reference its canonical.
5. **`og:url` is `https://aixpt.ca/` on every route.** All share/social signals point to the homepage.
6. **PWA service worker precaches HTML** (`vite-plugin-pwa`, `globPatterns` includes `html`). A crawler can be served a stale cached `<head>` — a real risk of Google indexing an old title.
7. **Soft 404s.** `vercel.json` rewrites `/(.*)` → `/index.html` with HTTP 200, so unknown URLs return the homepage with a 200 status.
8. **Static vs rendered title mismatch.** Static title = `AIXPT - L'automatisation IA au Québec`; homepage Helmet title = `AIXPT - L'IA qui travaille pendant que vous dormez.` Google may index either.

---

## Part B — Fix plan for the brand/SERP issue

Priority order. Items 1–3 are quick wins; 4 is the structural fix.

1. **Fix the fake/conflicting structured data (highest ROI, ~15 min).**
   - In `src/App.tsx`, correct `aixpt.com` → `aixpt.ca`, phone → `+1-418-800-5085`, email → `support@aixpt.ca`, and make the address match `index.html` / `llms.txt` (choose **one** city: Québec).
   - Consolidate to a **single JSON-LD graph** (one `@graph` with `Organization` + `WebSite` + `LocalBusiness`) instead of two competing blocks. Add `WebSite` with `"name": "AIXPT"` and `alternateName` to feed the Google site-name feature. Add `logo` and `sameAs` (LinkedIn, etc.).

2. **Put the brand in the homepage `<h1>` and align the static title.**
   - Headline suggestion: `AIXPT — L'IA qui travaille pendant que vous dormez.` (or an `AIXPT` kicker directly above the h1).
   - Make `index.html`'s static title equal to the final homepage title so static and rendered versions agree.

3. **Add self-referencing canonical + per-route OG URLs.**
   - One `<link rel="canonical" href="https://aixpt.ca/...">` per route, unique `og:url`, `og:locale` (`fr_CA`), and a Twitter card. These must be in the **static** HTML (see #4).

4. **Prerender the site (the structural fix).** Render each route to its own static HTML at build time so title/description/canonical/JSON-LD are correct without JS.
   - Lowest-effort, fits current stack: **`vite-plugin-prerender`** or **`vite-react-ssg`** (post-build HTML per route). Alternative: a hosted prerender (Prerender.io) behind Vercel. Bigger option: migrate to Astro/Next (not recommended just for this).
   - Once prerendered, every crawler — Google, Bing, and LLM/AI crawlers — sees the correct per-page head.

5. **Stop the PWA from shadowing crawlers.** Either remove `vite-plugin-pwa` for this marketing site, or at minimum drop `html` from `globPatterns` and disable the navigation fallback pre-cache, so a browser/crawler never gets a stale `<head>`.

6. **Handle 404s properly.** Prerender real routes and serve a real 404 (or a `404.html`) instead of rewriting unknown paths to the homepage with 200.

7. **In Google Search Console:** verify the domain, submit `sitemap.xml`, run URL Inspection on the homepage and "Request indexing", and watch the site-name/brand result.

---

## Part C — Do you need an audit? Yes.

Yes — and it is nearly free. The **crawl** (`run_site_audit` + `get_audit_issues` / `get_audit_pages`) does **not** consume credits. It will independently confirm the items above (JS-only rendering, missing canonicals, duplicate titles, structured-data issues, broken links, 404s) and catch anything I missed. Run it first, before any paid keyword call.

---

## Part D — OpenSEO credit plan (run in this order)

> **Blocker first:** the OpenSEO MCP is **currently unauthenticated** in this environment. The logs show:
> `401 ... "MCP server https://app.openseo.so/mcp requires a login before it can register a client"`.
> Tool calls will fail until you re-login (`opencode auth login` / the TUI MCP login for `openseo`). Step 0 below verifies it.

| # | Step | Tools | Credits | Why |
|---|------|-------|---------|-----|
| 0 | Re-auth + confirm credits | `whoami` | Free | Unblocks everything; confirms balance |
| 1 | Resolve project + write context | `list_projects`, `create_project` (if needed), `get_project_context`, `update_project_context`, `addCompetitors`, `addKeyPages` | Free | Makes every later skill smarter; persists across sessions |
| 2 | Connect Search Console | `get_search_console_performance` | Free | Best first-party signal (what already gets impressions) |
| 3 | Technical audit | `run_site_audit` → `get_audit_status` → `get_audit_issues`, `get_audit_pages` | Free (crawl reads) | Confirms Part B; produces the audit report |
| 4 | Size demand for the priority list | `get_keyword_metrics` (one batch) | Some | Validate ≠ guess the keywords in Part E |
| 5 | Find demand gaps | `research_keywords` (1–3 seeds: "agent vocal IA", "chatbot IA", "automatisation IA entreprise") | Some | Discover unbranded/vertical opportunities |
| 6 | Check who actually ranks | `get_serp_results` (5–8 priority queries, depth 20) | Some | The live evidence behind page-type decisions |
| 7 | Orientation | `get_ranked_keywords` (domain, organic), `get_domain_overview`, `get_backlinks_overview` | Some | What you already rank for; authority gaps |
| 8 | Save + cluster | `save_keywords` (with tags), then `keyword-clustering` | Free after metrics | Map clusters → existing/new pages |
| 9 | Local + AI visibility | `local-seo` (Google Business Profile), `ai-visibility-audit` | Some | High-value: Québec local intent + being cited by AI assistants |
| 10 | Competitive view | `competitive-landscape` or `competitor-analysis` (2–3 rivals) | Some | Positioning + content gaps |

**Credit discipline:** do steps 1–3 first (free) — they may already change what you'd buy in step 4. Then buy **one** `get_keyword_metrics` batch and **one** `research_keywords` call, and only then targeted `get_serp_results`. Don't re-run domain-level `get_ranked_keywords` repeatedly; each result carries its own last-updated date.

**Two workflows most aligned with your goal** ("businesses of all types contact us"):
- **`local-seo`** — most of your buyers search locally; the Google Business Profile drives calls.
- **`ai-visibility-audit`** — your goal is that AI assistants recommend AIXPT. You already ship `llms.txt`; this audit measures whether ChatGPT/Gemini/AI answers actually mention or cite you, and what third-party pages to get onto.

---

## Part E — Priority keywords (hypotheses to validate in step 4)

These are **not** volume claims — run `get_keyword_metrics` to size them before committing content. Language: French (Québec). Keep one primary term per page to avoid cannibalization.

**Tier 1 — Product / money intent (map to the two product pages)**
- Voice agent → `/assistant-vocal`: `agent vocal IA`, `assistant vocal IA`, `réceptionniste IA`, `répondeur IA`, `standard téléphonique IA`, `IA qui répond au téléphone`, `appels manqués entreprise`
- Chatbot → `/agents-conversationnels`: `chatbot IA site web`, `agent conversationnel`, `chatbot entreprise`, `support client IA 24/7`, `chatbot IA Québec`
- General → `/services`: `agence automatisation IA`, `automatisation IA entreprise`

**Tier 2 — Service + local intent (map to home/`/services`, strong for GBP)**
- `automatisation IA Québec`, `automatisation IA Montréal`, `agence IA Québec`, `agence automatisation Québec`, `intégration IA entreprise Montréal`, `chatbot Québec`, `agent vocal Québec`

**Tier 3 — Vertical / use-case pages (likely the biggest untapped ROI)**
- Build dedicated landing pages per industry — e.g. `réceptionniste IA pour concessionnaires automobiles`, `chatbot IA pour cliniques`, `IA pour l'immobilier`, `IA pour restaurants`. You already show auto-dealer integrations (CDK, Dealertrack, PBS) — a dealer-focused page is an obvious first vertical.
- Integration-intent pages: `intégration IA CRM`, `IA avec Salesforce`, `IA avec HubSpot`, `IA avec Outlook` (you have the logos).

**Tier 4 — Brand defense**
- `aixpt`, `aixpt avis`, `aixpt.ca` — the homepage must win these (Part B fixes this).

**Bilingual opportunity (Canada-wide, English)**
- `AI voice agent Canada`, `AI receptionist`, `AI chatbot for business Quebec`, `AI automation agency Quebec`.

---

## Part F — Suggested next actions

1. Re-authenticate the OpenSEO MCP (unblocks Part D).
2. Run Part D steps 1–3 (free) to get the real audit.
3. Implement Part B items 1–3 now; schedule item 4 (prerendering) as a scoped change.
4. Validate Part E demand, then build 2–3 vertical pages.

---

## Addendum — Confirmed by the Oct 16 OpenSEO crawl (16 pages, JS-rendered)

Crawl-confirmed problems beyond Part A:

- **Canonical-host mismatch.** `https://aixpt.ca/` **308-redirects to `https://www.aixpt.ca/`**, but `sitemap.xml` *and* the static `index.html` canonical/og:url use the **non-www** host. Every sitemap URL redirects, and the 8 URLs that return 200 are marked "not in sitemap".
- **One shared meta description.** All 8 pages report the *homepage* description. Cause: the static `<meta name="description">` in `index.html` stays in the DOM ahead of React Helmet's per-page tag, so the homepage text wins everywhere.
- **Crawl verdict:** `duplicate-meta-description` ×8, `thin-content` on `/services` (132 words) and `/contact` (124 words), `heading-order-skip` ×2, and a too-long title on `/services` (82 chars).

### Why /contact outranks the homepage for "aixpt"
The homepage declares the brand weakly: its `<h1>` never says "AIXPT", while `/contact` carries "AIXPT" in its title, description and keywords — and the homepage's own JSON-LD points at the wrong domain (`aixpt.com`) with a fake phone. With no canonical and a redirecting sitemap, Google has no strong single "brand" page, so it promoted `/contact`.

### Fix, in order
1. Pick **one** canonical host (`https://www.aixpt.ca`, since the server already redirects there) and use it in sitemap, canonicals, `og:url`, JSON-LD and internal links.
2. Put **"AIXPT" in the homepage `<h1>`**.
3. Replace the conflicting JSON-LD with one `@graph` (`Organization` + `WebSite` + `LocalBusiness`) using real NAP.
4. **Prerender** routes so each page ships its own static title/description/canonical — this alone fixes the shared-description problem.
5. Add self-referencing canonicals; expand thin `/services` and `/contact`; trim the `/services` title to ≤60 chars.
6. In GSC: submit the **www** sitemap and Request Indexing for the homepage.

## Step 3 — Credit plan (DO NOT run yet; balance 382)

Free first: change the project language **en → fr** in OpenSEO project Settings (no MCP tool can; alternatively I pass `languageCode:"fr"` on each call).

Then, in order, checking `creditsRemaining` after each call and stopping if it drops below ~100:

1. `get_ranked_keywords` — target `aixpt.ca`, scope `subdomains`, `languageCode:"fr"`, limit 50. Baseline of what already ranks.
2. `get_keyword_metrics` — one batch of the ~28 priority keywords (Canada `2840`, `fr`). Core demand sizing.
3. `get_serp_results` — one bulk call, 6–8 priority queries, depth 20. Who actually ranks.
4. `save_keywords` (free) with returned metrics → then cluster.
5. Only if balance allows: `research_keywords` (2–3 seeds, `resultLimit` 50, **no** clickstream — doubles cost, **no** `locationName` — adds ~116 credits/seed), and `find_serp_competitors`.

Defer until the next top-up: `get_domain_keyword_suggestions`, AI-visibility, local SEO.

---

## Implementation log — what shipped (Oct 18)

Status of the fix plan (code is committed to the working tree; **not** pushed — the user deploys).

### Phase 1 — Host, head & structured data (done)
- Canonical host fixed to **`https://www.aixpt.ca`** everywhere (sitemap, canonicals, `og:url`).
- Removed the static `<meta name="description">` override from `index.html` (root cause of the ×8 shared description).
- Consolidated conflicting JSON-LD into one `@graph` (`Organization` + `WebSite` + `LocalBusiness`) with real NAP; removed the wrong-domain (`aixpt.com`) block.
- Added brand **"AIXPT"** to the homepage `<h1>`.
- `robots.txt` sitemap URL → `www`.

### Phase 2 — Prerendering (done)
- Added build-time prerender: `scripts/prerender.mjs` (runs after `vite build`).
- **Single source of truth** for metadata: `src/seo/routes.json` (read by both the React pages via `src/seo/meta.ts` and by the prerender script).
- Each route now ships **static** `<title>`, meta description, canonical and per-route Open Graph tags. Body still hydrates client-side.
- `sitemap.xml` is now **generated** from `routes.json` (deleted the hand-written `public/sitemap.xml`) so it can never drift.
- `vercel.json`: `redirects` (legacy `/analyste-automatique-360` → `/services`) + SPA `rewrites` (filesystem-aware, so prerendered files are served). No deprecated `routes`/`handle`.
- New `public/llms.txt` for AI-crawler visibility (GEO).
- Result: 10 prerendered routes (`/`, `/services`, `/assistant-vocal`, `/agents-conversationnels`, `/emails-automatises`, `/creation-sites-web`, `/apropos`, `/contact`, + 2 new verticals).

### Phase 3 — On-page keyword fixes (done)
- Homepage title → "AIXPT — Automatisation IA au Québec | Réceptionniste et chatbot IA".
- `/assistant-vocal`: title/h1 now target **réceptionniste IA** + **agent vocal IA**.
- `/agents-conversationnels`: title/h1 now target **chatbot IA** (site web) + agent conversationnel.
- All money-page titles ≤ ~60 chars, unique descriptions.
- `/contact` was already substantial (hero + coordinates + services + form) — not thin.

### Phase 4 — Vertical pages (done, first two)
- `/receptionniste-ia-concessionnaires-automobiles` — `src/components/pages/ReceptionnisteIAConcessionnaires.tsx`.
- `/chatbot-ia-clinique` — `src/components/pages/ChatbotIAClinique.tsx`.
- Both: keyword-rich h1, FAQ section, `Service` + `FAQPage` JSON-LD, CTA.
- Internal links added: Footer "Services" list, `/services` "Solutions par secteur" section, and contextual cross-links from `/assistant-vocal` and `/agents-conversationnels`.
- Both added to `routes.json` → automatically in the sitemap and prerendered.

### Remaining (needs the user)
1. **Deploy** (git push) — then in GSC submit `https://www.aixpt.ca/sitemap.xml` and Request Indexing for the homepage.
2. **Google Business Profile** for "AIXPT Québec" (maps/local pack) — Phase 5.
3. More vertical pages (`/receptionniste-ia-...`) + problem-intent content — Phase 5.
4. Paid OpenSEO steps (AI-visibility audit, rank tracker) — after indexing, to avoid burning credits (balance 175).
5. Optional hardening: code-split the 770 kB JS chunk; PWA `navigateFallback` currently serves the cached shell (harmless for SEO since crawlers don't run the SW).

