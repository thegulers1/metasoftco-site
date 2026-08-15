# Technical SEO, performance, accessibility and codebase audit

## Method

Live HTTP/HTML crawl, sitemap and internal-link expansion, repeated status checks, controlled concurrency, source inspection, `pnpm build`, `pnpm lint`, rendered Chrome screenshots, and a mobile Lighthouse lab run. Audit timestamp: 14 August 2026, Europe/Istanbul.

## P0: production reliability

### Reproduced behavior

- Sequential requests to sampled dynamic pages returned 200.
- 30 requests at concurrency 15 to `/en/services/ai-event-solutions/ai-style`: **21×200, 9×500**.
- Same test to `/en/projects/nesquik-x-ai-photo-child`: **19×200, 11×500**.
- Concurrent site crawls returned different groups of 500 URLs on each pass. This indicates capacity-sensitive failure, not fixed bad routes.
- `pnpm build` compiled and exited successfully, but logged repeated Prisma `DriverAdapterError (EMAXCONNSESSION): max clients reached in session mode - max clients are limited to pool_size: 15` while generating pages.
- The build continued after data failures, meaning a deploy can succeed with empty listings or incomplete metadata.

### Code-level cause/risk

`src/lib/db.ts` uses `PrismaPg` with a `pg` Pool set to `max: 2`, while Next uses multiple workers and most public pages execute DB queries. The database endpoint reports session-mode limits. A global client helps within one process, not across serverless instances/build workers. `unstable_cache` calls log revalidation errors but allow the build to complete.

### Required response

1. Confirm the provider-recommended serverless/transaction-pool connection string and connection limits.
2. Use a serverless-safe pooler/adapter strategy; keep `DIRECT_URL` only for migrations.
3. Reduce build concurrency or precompute content once; do not let every route independently open session-mode connections.
4. Add bounded retry/backoff only for transient connection acquisition—not as a substitute for capacity.
5. Make CMS query failures fail builds or return controlled 503s; never return a 200 shell with missing metadata/content.
6. Pre-render/cache commercial pages and revalidate on CMS publish.
7. Run a small load test against homepage, hub, service, project, blog, sitemap, and contact routes before release.
8. Add uptime/error-rate monitoring segmented by route and locale.

Severity: P0. Owner: backend/DevOps. Business impact: direct lead loss, unreliable crawling, and paid-campaign waste.

## Crawlability and indexability

### Host and protocol

| Variant | Behavior | Finding |
|---|---|---|
| `http://metasoftco.com` | 308 | Correct direction, validate single-hop destination. |
| `http://www.metasoftco.com` | 308 | Correct direction, validate single-hop destination. |
| `https://metasoftco.com` | 308 → `https://www.metasoftco.com` | Live canonical host is `www`. |
| `https://www.metasoftco.com` | 200 | Final host. |
| trailing slash | 308 to no slash | Consistent. |

All generated sitemap, canonical, hreflang, Organization, Service, Article, OG and breadcrumb URLs use `https://metasoftco.com` without `www`. These URLs redirect. Pick the final `www` host everywhere or change infrastructure to make non-`www` final; do not keep the present split.

### Robots

`robots.txt` allows public pages and disallows `/editpanel`, `/api`, and `/login` for general and named AI crawlers. That is reasonable. Issues:

- Sitemap location uses the redirecting non-`www` host.
- Repeating the same disallow rules for individual AI bots adds maintenance without changing access.
- `Google-Extended` controls certain training/grounding uses, not ordinary Google Search crawling; comments should not imply otherwise.
- Sensitive/admin security must rely on authentication, not robots.

### Sitemap

Live sitemap: 95 URLs. Expanded inventory: 169 meaningful TR/EN routes.

Missing from sitemap:

- `/en/hakkimizda`
- all English service category and detail URLs
- all English project details
- the single available English blog detail
- English sector/industry details
- the dedicated `/hizmetler/istanbul-ai-photobooth` source route is not represented as such

Incorrectly present:

- `/isler` is in the sitemap while marked `noindex, follow`.
- `/sektorel-cozumler/test` is an indexable test page.
- sitemap entries use `new Date()` for static and programmatic pages, making every request claim every page changed now.
- all URLs use the redirecting host.

The sitemap should include canonical, 200, indexable URLs only. Build locale alternates from one validated parity record and add `<xhtml:link>` alternates if the implementation supports it. Use actual content `updatedAt`; use a stable deploy timestamp for genuinely static pages.

### Index/noindex

- `/isler` correctly carries `noindex, follow` but should be removed from the sitemap and, if redundant with `/projeler`, redirected or retired.
- `/sektorel-cozumler/test` is 200/indexable with title `test`, no H1 and no hreflang. Unpublish/noindex immediately.
- English `null` and missing alternate pages must not be linked or included in structured data.
- A soft fallback to homepage metadata on 404 pages was observed. The custom 404 should have a specific title and `noindex`.

### Redirects

The redirect file contains useful legacy mappings, but several patterns send unrelated deleted content to `/`, including WordPress probes, generic dated slugs, `undefined`, `star-map`, `hashtag-photo`, and old products. That can create soft-404 signals and poor recovery.

Recommendations:

- Map only pages with a close replacement; otherwise return 410/404.
- Remove duplicate slash variants because the platform already normalizes trailing slashes.
- Preserve query strings only where needed for attribution.
- Add automated tests for each redirect destination and prevent chains.
- Do not redirect bot attack paths to the homepage; return 404/410.

## International SEO

### What works

- `/en` is server-addressable, not only client-side language switching.
- Many paired pages publish `tr`, `en`, and `x-default` alternates.
- Root `<html lang>` is derived from the route via middleware.
- English metadata fields and English slugs exist in the data model.

### Defects

1. Hreflang and canonicals point to redirecting non-`www` URLs.
2. English detail routes are absent from the sitemap.
3. At least 37 sampled 200 pages lacked hreflang, primarily unpaired projects/blog posts, legal pages, and weak sector pages.
4. English service metadata falls back in this order: English → Turkish metadata → English content → Turkish content → Turkish site default. This publishes Turkish into English snippets.
5. English service titles visibly include `Yapay Zeka`, `İnteraktif`, or `Fotoğraf`; English service descriptions are duplicated Turkish text on several pairs.
6. English About uses `/en/hakkimizda`; rename only with a 301 migration to `/en/about` if the cleaner URL is worth the change.
7. English legal pages do not exist. English footer links to `/kullanim-kosullari` and `/gizlilik`.
8. English industry pages use unnatural phrases such as “Sectoral software solutions.”
9. English project slug contains spelling errors: `akbank-odu-bogazici-universty-x-photobooth-activity`.
10. `x-default` is always Turkish. For global lead generation, consider `/en` or a neutral locale selector as x-default; this is a strategy choice, not a mechanical rule.
11. Language switching relies partly on client `useEffect` registration of alternates and prefetched routes; server parity should be authoritative.
12. English category/detail components reuse Turkish paths in breadcrumb/back links in several places (`/`, `/hizmetler`).

### Required publishing gate

An English page should be indexable only when all of the following exist and validate: English slug, native title, native meta description, native H1, native summary/body, English media alt/caption, valid reciprocal Turkish pair, valid internal links, and page-specific CTA. Otherwise keep it out of sitemap and return noindex or no alternate—not Turkish fallback content.

## Canonicals, titles, descriptions and headings

Concurrent crawl totals varied due to production failures. On the most complete 169-URL pass:

- 52 titles were longer than 60 characters.
- 55 meta descriptions were longer than 160 characters.
- four descriptions were under 70 characters.
- one article rendered two H1s.
- one test page had no H1.
- multiple project pages intermittently returned 200 HTML without page metadata when DB reads failed.
- title duplicates occurred across untranslated TR/EN cases and two competing English software hubs.
- the site-level default description was reused across at least ten unrelated pages.

Character counts are diagnostics, not hard ranking rules. Rewrite for intent and readable SERP display, not arbitrary stuffing. The main pattern to stop is putting the full title tag inside H1, e.g. `... | MetasoftCo` visible on the page.

## Internal linking

Discovered zero-inlink hubs:

- `/hizmetler/yapay-zeka-etkinlik-cozumleri`
- `/hizmetler/interaktif-kurulumlar`
- `/en/services/ai-event-solutions`
- `/en/services/interactive-event-activities`
- `/en/services/interactive-installations`

Dozens of service/category/project pages had only one discovered internal inlink. Articles generally expose only navigation/footer links, not contextual service links. Add:

- blog → primary service and relevant case
- project → service, solution/use case, next relevant case
- service → two proofs, related service, solution/use case
- solution → services and cases
- hubs → every supported child with descriptive anchors

Do not count language toggles, footer, or card-only navigation as adequate contextual linking.

## Structured data

### Current

Every page emits global `SoftwareApplication`, `Organization`, and `LocalBusiness`; many pages add Service, FAQPage, BreadcrumbList, BlogPosting, or VideoObject.

### Critical issues

- Global SoftwareApplication contains `AggregateRating` 5/5 from 120 ratings. No visible corresponding rating/review evidence was found. Remove unless the source and visible reviews meet policy.
- `SoftwareApplication` is not a faithful primary type for every agency, legal, article, and case page.
- Organization/Article publisher logo points to `/logo.png`, which returns 404.
- service fallback OG image `/og-image.jpg` also returns 404.
- LocalBusiness says `areaServed: Turkey`, while sales positioning implies international capability.
- Service offers state `InStock` with no product inventory context.
- claims such as 99% facial accuracy and platform details need substantiation.
- FAQ schema uses Turkish `faq` on English pages; `faq_en` is present in the model but not used by the shared client/schema flow.

### Recommended graph

- Global: one `Organization` with stable `@id`, one `WebSite`, valid logo, contact point, truthful area served and sameAs.
- Home/About: `WebPage` + Organization reference.
- Service: `Service` + `BreadcrumbList`; FAQ only when the same native-language FAQs are visible.
- Project: `WebPage`/`CreativeWork` only if defensible, BreadcrumbList, VideoObject where a visible video and valid dates exist.
- Blog: `BlogPosting` with real author/editorial policy and valid publisher logo.
- Contact: `ContactPage`; use LocalBusiness only if the physical customer-facing premise is accurately represented.

Validate syntax and entity truth before release. Schema is not a place to add unverified marketing claims.

## Social metadata

Strengths: OG/Twitter helpers exist; service/project images can be page-specific; a dynamic OG endpoint works.

Issues:

- URLs use the redirecting host.
- fallback `/og-image.jpg` is 404.
- some DB-driven pages lose OG metadata when query/metadata generation fails.
- dynamic OG can return generic text-heavy cards rather than a compelling activation image.
- project cards should use a consistent safe-area template with client, activation name, strong output/event image, and minimal brand mark.

Create share-preview QA for LinkedIn and WhatsApp for the top 20 commercial/case pages.

## Performance

### Measured mobile lab result — homepage, 390×844

| Metric | Result |
|---|---:|
| Lighthouse Performance | 74 |
| Accessibility | 96 |
| Best Practices | 77 |
| Lighthouse SEO | 100 |
| FCP | 1.4s |
| LCP | 11.8s |
| Speed Index | 2.8s |
| TBT | 60ms |
| CLS | 0 |
| Transfer | 1,810 KiB |
| Requests | 83 |
| Main-thread work | 2.4s |
| Potential unused JavaScript | 347 KiB |

This is lab data, not field CWV. Lighthouse identified the hero supporting paragraph as the LCP element with significant render delay; the 11.8s simulated LCP also reflects late interactivity under its mobile model.

### Largest/wasteful resources

- Google tag scripts appeared multiple times: ~165 KiB analytics gtag, two ~143 KiB Ads gtag requests, and ~125 KiB GTM.
- Cloudinary project/service images were among the largest content resources.
- `blackLogo.png` is ~30 KiB for a small wordmark.
- eight Google font families and many weights are declared globally, causing many font preloads.
- external brand assets from Wikimedia/CDNs had poor/no cache lifetimes; one Mercedes SVG transferred ~81 KiB.
- Lighthouse estimated 312 KiB image-delivery savings and 150 KiB cache-lifetime savings.

### Actions

1. Configure measurement in one place. If GTM loads GA/Ads, remove direct duplicates; verify tags in Tag Assistant.
2. Load Ahrefs/marketing tags after consent/interaction where legally and analytically appropriate.
3. Reduce global fonts to one display, one text, optional mono; subset weights.
4. Convert the logo to an optimized local SVG/AVIF/WebP as appropriate.
5. Store approved client logos locally/CDN with dimensions and long immutable caching.
6. Audit Cloudinary `sizes`; do not request `w_640` for smaller cards and ensure AVIF/WebP negotiation.
7. Lazy-load below-fold media, but prioritize the actual LCP/showreel poster.
8. Dynamically import AI chat, quote panel, galleries and noncritical motion.
9. Add `prefers-reduced-motion`; pause decorative animation for hidden tabs and low-power contexts.
10. Fix public HTML caching. The live root returned private/no-store behavior during tests despite a broad configured cache header, disabling bfcache.

## Accessibility — WCAG 2.2 AA review

Strengths: one main landmark, mostly semantic links/buttons, labelled primary controls, image alt on content cards, no measured CLS, and keyboard-capable native `details` FAQs.

Failures/risks:

- Lighthouse failed contrast for footer headings, tech line, copyright and legal links (`rgba(255,255,255,.32/.4)` on near-black).
- No `prefers-reduced-motion` implementation was found despite continuous aurora, shimmer, ticker, pulse, hover and drawer motion.
- global `overflow-x:hidden !important` masks overflow instead of making content reflow; keyboard/focus targets may be visually clipped.
- focus states are inconsistent; many controls rely on hover/color only.
- mobile drawers need focus trapping, focus return, and `aria-expanded`/`aria-controls`.
- AI chat modal needs dialog semantics, labelled region, focus management and live-message announcements.
- the decorative brand ticker uses empty `alt` plus `aria-label` on images inside an `aria-hidden` container; keep it purely decorative or provide one accessible client-proof statement.
- field error text is not visibly tied with `aria-describedby`; validation summary and inline errors are limited.
- persistent AI and WhatsApp buttons can cover content and reduce effective touch spacing.
- no skip link was found.

## Codebase architecture

| Area | Observation | Recommendation |
|---|---|---|
| Framework | Next.js 16.1.3 App Router, React 19, server/client mix | Keep; no rewrite justified. |
| Rendering | Nearly every public route is dynamic/DB-dependent; ISR declarations do not eliminate runtime DB risk | Introduce publish-time invalidation and resilient cached reads/static params for commercial pages. |
| CMS/data | PostgreSQL/Prisma; translated fields embedded per record; JSON strings for gallery/FAQ/specs | Use typed JSON columns or validated schemas; add translation-completeness constraints. |
| Locale | `/en` route tree plus client LanguageProvider | Keep URL locales; centralize a route-pair registry and remove client fallback guessing. |
| Metadata | Distributed static and dynamic metadata; helpers use one Turkish site config | Build typed locale-aware metadata factory with required-field validation. |
| Styling | Tailwind v4 plus 365-line global CSS, many inline style values and eight fonts | Create light tokens for type, spacing, radii, color and motion. |
| Images | Next/Image plus raw `<img>` and custom Cloudinary loader | Standardize Image wrapper, intrinsic dimensions, `sizes`, alt, and loading strategy. |
| Analytics | direct Ads gtag + GTM + Ahrefs | Consolidate, consent-gate, define conversion event schema. |
| Quality gates | TypeScript errors ignored; lint fails | Stop ignoring build errors after baseline cleanup; fail CI on public-site errors and broken links. |

`pnpm lint` result: **120 problems — 60 errors and 60 warnings**. These include unsafe `any`, React hooks/static component violations, deprecated design-handoff code included in lint scope, raw `<img>`, missing hook dependencies, and duplicated raw GTM patterns. The build explicitly skips type validation (`typescript.ignoreBuildErrors: true`).

The optimized build compiled but logged DB connection failures. A “green” build is therefore not a trustworthy release signal.

## Security/privacy/trust observations

- HTTPS/HSTS, X-Content-Type-Options, frame restrictions and referrer policy are present.
- `X-XSS-Protection` is obsolete; use a tested Content-Security-Policy instead.
- No CSP was observed.
- third-party analytics, advertising, Ahrefs, Google Maps and external logo domains load without an evident consent layer in the captured first view.
- privacy text should explicitly cover event participant images, AI processors, retention/deletion, international transfers, lead capture, sub-processors, model training use/non-use, and KVKK/GDPR roles.
- enterprise buyers need operational documentation: backup hardware, offline/fallback mode, staffing, incident escalation, moderation, uptime/SLA where applicable, and data deletion workflow.

## Technical priority sequence

1. P0 DB/reliability and release-gate correction.
2. P0 invalid links/null records and test content removal.
3. P0/P1 canonical host unification.
4. P1 sitemap and locale completeness.
5. P1 metadata fail-safe and native-English gate.
6. P1 global schema cleanup/broken asset repair.
7. P1 mobile overflow and persistent-control collision.
8. P1 duplicated analytics/fonts/images.
9. P2 internal linking, redirects, bfcache and CSP.
10. P2 lint/type baseline and ongoing automated QA.
