# Phase 1 — Technical remediation

Implementation date: 14 August 2026
Scope: P0/P1 reliability, crawl/index integrity, locale routing, redirects and documented mobile breakage. This phase deliberately does not redesign pages or rewrite marketing copy.

## Definition of the indexable set

The audit inventory (about 170 routes) is a discovery inventory, not a sitemap contract. The current indexable set is **147 URLs**:

- public Turkish static pages, service categories/details, projects and articles;
- English static pages and only database records that have a complete native English slug, title, description, body and metadata;
- current static industry pages while their strategic consolidation remains a Phase 2 decision.

It excludes `/isler`, test content, the duplicate sector-local Istanbul page, absent-English records, and every `null`/unpublished record. The sitemap obtains its dynamic entries from the same publication-gate functions used by English pages and listings; it does not assume that every discovered or translated-looking route is indexable.

## P0-01 — Prisma `EMAXCONNSESSION` under concurrency

**Audit finding**
Thirty requests at concurrency 15 produced 9–11 production 500s on English service/project pages, and the production build logged `EMAXCONNSESSION` while succeeding.

**Root cause**
`DATABASE_URL` pointed at the Supabase pooler session port (`5432`). Next’s build/server workers multiplied client pools. The global Prisma instance only constrains one Node process, not all workers.

**Files changed**
`src/lib/db.ts`, `scripts/validate-runtime.ts`, `scripts/test-db-concurrency.ts`, `package.json`.

**Fix implemented**
Runtime connections to the Supabase pooler are normalized from session port `5432` to transaction-pool port `6543`; `DIRECT_URL` is untouched for direct administrative/migration use. The `pg` adapter pool is bounded to five connections per process (`DATABASE_POOL_MAX` can lower it). A release-time probe checks all public content models, and a repeatable 30/15 database concurrency test was added.

**How it was tested**
`pnpm validate:runtime`; `pnpm test:db-concurrency`; production build; and two HTTP tests of 30 requests at concurrency 15.

**Before/after behavior**
Before: the two audited route families intermittently returned 500. After: `/en/services/ai-event-solutions/ai-style` and `/en/projects/nesquik-x-ai-photo-child` each returned **30/30 HTTP 200** at concurrency 15. No `EMAXCONNSESSION` appeared during a nine-worker production build.

**Remaining risk**
The deployment environment must retain the Supabase transaction-pool endpoint/capacity. This source-level normalization covers the audited host/port combination, but provider pool limits, database credentials and production monitoring remain an operational responsibility.

## P0-02 — Build/CI could pass after database failures

**Audit finding**
The old build skipped TypeScript errors and continued after database/prerender failures.

**Root cause**
`typescript.ignoreBuildErrors` was enabled and no independent runtime database gate preceded `next build`.

**Files changed**
`next.config.ts`, `package.json`, `scripts/validate-runtime.ts`.

**Fix implemented**
TypeScript errors are no longer ignored. `pnpm build` now runs Prisma generation, database runtime validation, `tsc --noEmit`, and then `next build`; any error exits non-zero.

**How it was tested**
`pnpm build` completed successfully with all gates enabled.

**Before/after behavior**
Before: a database error could yield a green build. After: the build cannot reach Next compilation if its database validation or type check fails.

**Remaining risk**
The check validates connectivity and public content models, not an external production deployment. Deployment should run the same script with production environment variables and route smoke checks.

## P0-03 / P1-02 — Broken English links and locale publication

**Audit finding**
The English service listing emitted a literal `/null`; English listings and detail pages fell back to Turkish fields; alternates were emitted merely because a slug existed.

**Root cause**
Locale availability was inferred from nullable slug fields instead of a complete published locale record. Listing components then constructed URLs from nullable values.

**Files changed**
`src/lib/publication.ts`, English service/project/blog/sector pages and hubs, `ServicesListClient.tsx`, `ProjectsListClient.tsx`, Turkish dynamic metadata pages, `LanguageProvider.tsx`.

**Fix implemented**
One publication gate now requires native English slug, title, description, body and metadata. Incomplete English details return 404/noindex instead of serving Turkish fallback content; English hubs expose only complete records; Turkish pages emit a reciprocal English alternate only when that same gate passes. Static locale pairs use an explicit map rather than pathname guessing.

**How it was tested**
The local data inspection found 27 complete English services, 11 projects and one article. The broken `/en/services/photobooth-and-photo-activations/null` path is now 404/noindex. A 147-URL sitemap crawl found no invalid sitemap URL or non-`www` canonical.

**Before/after behavior**
Before: a card could link to `/null`, and English pages could carry Turkish metadata/body. After: incomplete records are neither linked nor indexed; complete pairs provide reciprocal alternates.

**Remaining risk**
Native English legal pages and many incomplete English service/project records still need editorial/legal publication. They are intentionally not presented as indexable English content in this phase.

## P0-04 / P1-01 — Canonical host, sitemap and hreflang

**Audit finding**
Sitemap, canonical, hreflang, schema and social URLs used `https://metasoftco.com`, which redirects to `https://www.metasoftco.com`; sitemap had 95 entries and volatile `new Date()` timestamps.

**Root cause**
Generated URL sources independently read an environment fallback/non-`www` base URL. Sitemap had separate route logic and treated every route as equally indexable.

**Files changed**
`src/lib/site.ts`, `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, metadata route files, `src/lib/publication.ts`.

**Fix implemented**
`https://www.metasoftco.com` is the single site URL. Canonicals, root metadata, schema, OG URLs, robots and sitemap now read it. Sitemap uses content `updatedAt` or one stable audit/deploy baseline for static pages, excludes non-indexable routes, and contains the 147 URL set above. Hreflang is emitted only for complete reciprocal locale pairs.

**How it was tested**
All 147 sitemap URLs were fetched from the production build at five-way concurrency: all returned 200 with final-host canonicals, and all declared hreflang targets used the final host. `/sitemap.xml` contains no `/isler`, `/test` or `/null` URL.

**Before/after behavior**
Before: 95 redirecting sitemap URLs and host-defective canonical/hreflang declarations. After: 147 final-host canonical URLs, with deliberate exclusions rather than blind inclusion of the whole discovery inventory.

**Remaining risk**
The static software-sector family remains indexable pending its Phase 2 business decision; it is not being represented as a fully proven experiential cluster by this technical fix.

## P0-03 / P1 — Redirects, test content and soft 404s

**Audit finding**
`/isler` was noindex but present in sitemap; `/sektorel-cozumler/test` was public/indexable; duplicate local AI-photo pages and broad catch-all redirects sent unrelated failures to the home page. The custom 404 redirected visitors to the home page.

**Root cause**
The redirect map mixed genuine migrations with bot/error catch-alls, and the dynamic sector route had no publication exclusion.

**Files changed**
`next.config.ts`, `src/app/(site)/sektorel-cozumler/[slug]/page.tsx`, `src/app/not-found.tsx`, `src/app/sitemap.ts`.

**Fix implemented**
`/isler` now 308/301-migrates to `/projeler`. The duplicate Turkish local sector route redirects to the dedicated service URL; the English duplicate redirects to the closest working English AI Photo page. Test content returns an actual 404/noindex. Broad dated/bot/undefined/homepage catch-alls and unrelated `/star-map`/`/hashtag-photo` homepage redirects were removed. The custom 404 no longer client-redirects.

**How it was tested**
Route checks verified `/isler` and the duplicate local path redirect once to their intended targets; `/sektorel-cozumler/test` and `/en/.../null` are 404/noindex. An eight-hub internal-link crawl checked 120 internal links: no broken or forbidden (`null`/`test`) link was found.

**Before/after behavior**
Before: users/crawlers could receive home-page redirects for unrelated missing URLs. After: only close replacements redirect; invalid/test routes are explicitly non-indexable errors.

**Remaining risk**
Historical redirect mappings should still be reconciled with Search Console/backlink data before any future URL consolidation.

## P1-04 — Global structured data and broken assets

**Audit finding**
Every page emitted an unsupported `SoftwareApplication` with an unverified aggregate rating; schema logos and service OG fallback referenced 404 assets.

**Root cause**
Site-wide schema was used as a marketing vehicle and retained obsolete asset paths.

**Files changed**
`src/app/layout.tsx`, `src/lib/site.ts`, dynamic service/blog metadata pages.

**Fix implemented**
Removed global `SoftwareApplication`, aggregate rating and global `LocalBusiness` emission. The remaining Organization logo and BlogPosting publisher logo use the existing `/blackLogo.png`; service OG fallback uses the working dynamic `/og` route.

**How it was tested**
Production HTML checks confirmed final-host declarations; the build completed after schema changes.

**Before/after behavior**
Before: unsupported rating/application markup and 404 asset URLs. After: only the global Organization graph remains, with a valid local logo path.

**Remaining risk**
Page-specific Service/FAQ/Video markup still needs a separate evidence and visible-content review before Phase 2 expansion.

## P1-05 / P1-06 — Mobile clipping and floating controls

**Audit finding**
At 320–768px, global horizontal overflow hiding masked clipped text, breadcrumbs and CTAs. Fixed AI/WhatsApp controls competed for the same lower-right area.

**Root cause**
`overflow-x:hidden !important` hid rather than resolved overflows; long hero/breadcrumb content did not reflow; fixed controls had desktop-only offsets.

**Files changed**
`src/app/globals.css`, `HeroSection.tsx`, `ServiceDetailClient.tsx`, `src/app/(site)/layout.tsx`, `FloatingBadge.tsx`, `WhatsAppButton.tsx`.

**Fix implemented**
Removed the global overflow mask. Long headings/paragraphs now wrap, breadcrumbs wrap, hero CTAs stack at mobile widths, and metrics use a two-column mobile grid. Fixed controls use safe-area-aware insets; quote action text collapses to its count icon on mobile and content has bottom clearance.

**How it was tested**
Browser viewport checks at 320/375/390/430/768 found no horizontal overflow on home. The priority service, project, contact and English AI Photo pages also passed at 320/390/430/768. A rendered 320px service capture shows the breadcrumb and title reflowing within the viewport.

**Before/after behavior**
Before: content was cut off behind a global mask. After: the tested flows have no horizontal scroll and the persistent WhatsApp control stays within the safe area.

**Remaining risk**
This is a critical-layout fix, not a full component/mobile redesign. Broader 200% zoom, landscape and assistive-technology testing remain P2 accessibility work.

## Lint and maintainability triage

**Audit finding**
Lint included unrelated generated handoff files and also contained actual source issues.

**Root cause**
The lint scope included design-export runtime files; public source had unsafe `any` and React state/effect issues.

**Files changed**
`eslint.config.mjs`, `LanguageProvider.tsx`, `ToastProvider.tsx`, `ServiceDetailClient.tsx`, plus the sector form null guard.

**Fix implemented**
Excluded the non-runtime design handoff/output artifacts. Replaced client-side locale state synchronization with URL-derived language plus a ref-backed alternate registry, fixed the toast callback declaration order, typed the service detail contract and corrected the sector image-upload null handling.

**How it was tested**
`pnpm typecheck` passes. `pnpm lint` was rerun.

**Before/after behavior**
Before: lint reported 120 problems (60 errors). After: it reports 99 problems (51 errors). The removed scope was reference-only; the remaining failures are real source baseline work, primarily admin/editor components, older UI demos and React hook patterns.

**Remaining risk**
Lint is still non-green and is not part of `pnpm build`; the build is nevertheless type-checked and database-gated. A dedicated P2 lint baseline is still required before making lint a hard CI gate.

## Validation summary

| Check | Result |
|---|---|
| Production build | Pass — includes Prisma generate, DB validation and typecheck |
| Typecheck | Pass |
| Database concurrency script | Pass — 30/30 at concurrency 15 |
| Audited HTTP route concurrency | Pass — two routes, 30/30 HTTP 200 each at concurrency 15 |
| Sitemap validation | Pass — 147 URLs, no test/null/noindex duplicates |
| Canonical/hreflang validation | Pass — 147/147 200, final `www` canonical host |
| Internal-link hub check | Pass — 120 links, zero 4xx, zero null/test links |
| Mobile viewport check | Pass — no horizontal overflow at 320/375/390/430/768 on tested priority flows |
| Lint | Fails — 51 errors / 48 warnings remain; documented above |
