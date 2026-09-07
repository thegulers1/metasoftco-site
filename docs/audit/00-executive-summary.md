# MetasoftCo website audit — executive summary

Audit date: 14 August 2026  
Scope: live site, repository, Turkish and English routes, technical SEO, international SEO, rendered UX at desktop/mobile, lab performance, accessibility, CRO, content, positioning, search intent, competitors, and implementation architecture. No production code was changed.

## Overall assessment

MetasoftCo has stronger raw capability and better project assets than its website currently converts into market confidence. The dark creative-technology art direction, recognizable clients, in-house software language, and breadth from AI photo to games and physical installations create a credible foundation. The site does not read as a simple photobooth rental catalogue.

The largest constraint is reliability and information architecture, not taste. The site is dynamically dependent on PostgreSQL for nearly every route, and a controlled concurrency check reproduced production 500 responses: 9/30 requests failed on one English service and 11/30 failed on one English project. The local production build also logged repeated `EMAXCONNSESSION` errors while still exiting successfully. That is a P0 lead-loss and crawlability risk.

International readiness is the second constraint. The sitemap lists 95 non-`www` URLs even though the canonical host is forced to `www`; it omits almost the entire English detail layer. English pages sometimes inherit Turkish metadata/copy, eleven routes produced intermittent 500s during concurrent crawls, two linked English paths consistently resolve to 404, and a literal `/null` service link is published. English legal pages do not exist, and the English footer links back to Turkish legal content.

The business opportunity is to position MetasoftCo as an **AI-powered experiential technology studio**: a creative and engineering partner that conceives, builds, produces, and operates measurable branded experiences. “AI event activation agency” should be the commercial SEO descriptor, not the full brand identity.

## Scores

| Area | Score | Why |
|---|---:|---|
| Brand positioning | 66 | Distinctive technical language and breadth, but no crisp category definition or buyer/outcome promise. |
| Visual design | 72 | Coherent dark system, strong typography and case imagery; over-relies on aurora gradients and text-first first views. |
| UX | 58 | Clear hubs and familiar patterns, but weak contextual journeys, dense detail pages, two overlapping floating CTAs, and no proof-led page flow. |
| Mobile UX | 43 | Rendered 320/375/390/430 checks show clipped strips, headings, breadcrumbs, CTA text, and metric rows; floating CTA obscures content. |
| Conversion | 48 | Contact form, WhatsApp, quote selector, and AI assistant exist, but CTA hierarchy is fragmented and service/case CTAs lack event context. |
| Technical SEO | 38 | Crawlable foundations and metadata helpers exist, but host/canonical mismatch, incomplete sitemap, concurrent 500s, orphan hubs, and misleading schema are material. |
| On-page SEO | 49 | Important hubs have intent, but 52 sampled titles exceed 60 characters, 55 descriptions exceed 160, H1s often repeat full SEO titles, and many pages target “rental” mechanically. |
| Content SEO | 42 | Eight Turkish posts and one English post; little topical depth, few contextual commercial links, weak case-result evidence, and broad unrelated software-sector pages. |
| International SEO | 29 | Reciprocal hreflang exists on many pairs, but English detail URLs are absent from the sitemap, translations fall back to Turkish, slugs are inconsistent, and linked English 404/500 paths exist. |
| Performance | 58 | Mobile lab score 74, but 11.8s LCP, 1.81 MiB/83 requests, duplicated tag delivery, 347 KiB potential unused JS, image waste, and database failures under modest concurrency. |
| Accessibility | 71 | Lighthouse lab score 96 and generally semantic structure; footer contrast fails, motion lacks reduced-motion handling, focus treatment is inconsistent, and floating controls interfere at mobile sizes. |
| Case-study quality | 45 | Real brands and strong media are valuable; pages seldom frame challenge, idea, guest journey, production detail, and verified outcomes in a scannable case format. |
| Trust / credibility | 52 | Client names, address, contact channels, and event/brand claims help; evidence for metrics, rating schema, security, data handling, redundancy, and international operations is missing. |
| Global readiness | 38 | English shell exists, but content parity, operational proof, native copy, legal/data documentation, reliability, and locale architecture need work. |

## Top 10 problems

1. **P0 — request/DB instability:** concurrent live checks produce 500s; `next build` logs `max clients reached in session mode` but returns success.
2. **P0 — invalid English links:** `/en/services/photobooth-and-photo-activations/null` and two English sector links are emitted and 404.
3. **P0 — canonical-host conflict:** sitemap, canonicals, hreflang, schema and OG URLs use non-`www`, while the live host 308-redirects to `www`.
4. **P1 — incomplete sitemap:** 95 listed URLs versus a discovered inventory of 170 meaningful public routes; almost all English detail routes are absent.
5. **P1 — unstable/missing metadata:** concurrent crawls produced pages with no title, description, canonical, or hreflang; empty metadata is returned when DB reads fail.
6. **P1 — English is not native/parity-complete:** Turkish words remain in English titles, untranslated descriptions are used as fallback, English About retains `/hakkimizda`, and no English legal policy exists.
7. **P1 — mobile overflow:** persistent clipping at 320–430px and content obstruction by the floating AI CTA; this affects conversion pages, not only decoration.
8. **P1 — proof gap:** the homepage first viewport has no showreel, real activation, or client proof; service pages explain technology before proving outcomes and production reliability.
9. **P1 — case-study underperformance:** client projects are treated as galleries/descriptions, not sales evidence; verified outputs, guest journey, deployment facts, and results are rarely structured.
10. **P1 — unsupported/misapplied schema:** a 5.0/120 `AggregateRating` and `SoftwareApplication` are emitted globally; schema logo URLs return 404.

## Top 10 opportunities

1. Stabilize DB access and render/cache commercial pages so campaign traffic and crawlers receive deterministic 200 responses.
2. Own the category “AI-powered experiential technology studio,” supported by “AI event activation agency” and “creative technology partner.”
3. Lead the homepage with a 10–20 second activation reel plus a precise outcome statement and verified brand proof.
4. Turn the strongest five projects into flagship cases: challenge → idea → guest journey → technology/production → verified results.
5. Consolidate the service taxonomy into five buyer-readable capability groups and retire/thin/noindex concepts that have no proof or demand.
6. Build native English commercial pages for AI photo booth, AI event activations, AI video, virtual try-on, interactive games, and experiential technology.
7. Convert service CTAs from generic “Get a Quote” to event-aware briefs: date, city/country, audience, objective, expected attendance, desired output, and data needs.
8. Build project↔service↔solution contextual links; five category hubs currently have zero discovered internal inlinks and many assets have only one.
9. Replace global generic schema with page-accurate Organization, WebSite, Service, BlogPosting, VideoObject, and Breadcrumb graphs using one canonical `@id` system.
10. Preserve visual richness while cutting waste: remove duplicate tag loads, reduce eight-font setup, size images correctly, localize brand assets, and defer nonessential client UI.

## Recommended positioning

| Layer | Recommendation | Reason |
|---|---|---|
| Primary category | **AI-powered experiential technology studio** | Broad enough for software, AI, hardware, content, and production; premium and international. |
| Secondary descriptor | **Interactive brand activations, built and operated end to end** | Makes production and reliability explicit. |
| SEO category | **AI event activation agency / experiential technology company** | Matches commercial discovery language without reducing the brand to booth rental. |
| Sales descriptor | **Creative technology partner for branded live experiences** | Speaks to agencies and brand teams buying custom work. |

Avoid leading globally with “digital experience agency,” “event software company,” or “photobooth rental.” They are either too vague, too narrow, or position the company at the wrong value layer.

## Can be improved this week

| # | Problem / URL | Exact recommendation | Expected impact | Effort / owner |
|---:|---|---|---|---|
| 1 | Concurrent 500s, all DB pages | Use transaction-mode pooling/serverless-safe DB connection, cap build workers, add error-aware caching, and make the deploy fail on DB prerender errors. Load-test before release. | Prevent lost visits/leads and deindexation. | 2–4 days, backend/DevOps |
| 2 | Canonical host, all URLs | Choose `https://www.metasoftco.com`; update `siteConfig`, environment base URL, sitemap, robots, schema, OG, and hreflang to the final host. | Removes redirecting canonicals and consolidates signals. | 0.5–1 day, engineer/SEO |
| 3 | `/en/.../null` and English sector 404s | Reject null slugs in CMS/API, filter unpublished/untranslated cards, and link only to valid alternates. | Stops user/crawler dead ends. | 0.5 day, engineer |
| 4 | `/sitemap.xml` | Include every canonical 200 indexable TR/EN page; exclude `/isler`, `/test`, null and non-parity URLs; use stable DB `updatedAt`, not request time. | Faster, cleaner discovery. | 1 day, engineer/SEO |
| 5 | Global schema | Remove unsupported rating and global SoftwareApplication; fix `/logo.png`; use page-specific graphs. | Reduces structured-data risk and broken entities. | 1 day, engineer/SEO |
| 6 | Mobile floating controls | Collapse AI CTA to icon/short label below 768px, coordinate it with WhatsApp, keep 16px edge inset, and reserve safe content space. | Immediate mobile readability/CRO gain. | 0.5 day, frontend/design |
| 7 | Mobile hero/detail overflow | Add `min-width:0`, safe wrapping, shorter mobile title variants, nowrap only where contained, and test 320/375/390/430/768. | Removes clipped value propositions and CTAs. | 1 day, frontend |
| 8 | Homepage first viewport | Add a lightweight poster/showreel or strongest activation still, then a visible verified client strip; keep current art direction. | Faster comprehension and trust. | 1–2 days, design/content/frontend |
| 9 | Missing/overlong metadata | Prioritize homepage, hubs, top five services, and top five cases; keep titles ~45–60 characters and descriptions ~140–160 where natural. | Better snippets and intent clarity. | 1–2 days, SEO/content |
| 10 | Contact/service CTA | Change generic CTA to “Plan Your Activation” / “Etkinliğini Planla” and prefill source service/project in the brief. | More qualified leads and attribution. | 1 day, CRO/frontend |

## Evidence and limitations

- Crawl: 170 meaningful public routes discovered from sitemap, navigation, page links, source routes, and English parity paths. The production sitemap contained 95 URLs.
- Repeated concurrent crawl results were variable because production pages failed under load. Permanent 404s and load-sensitive 500s are reported separately.
- Lighthouse: mobile lab run on the homepage at 390×844. No CrUX/GSC field data was available; lab values are not presented as field Core Web Vitals.
- Search intent: commercial relevance and SERP composition were researched; no search-volume or rank data is invented.
- Competitor observations use public live pages as of the audit date; competitor claims are not independently verified.
- Metrics such as “1,000+ events,” “100+ brands,” “30 days,” “99% accuracy,” and structured-data ratings must be backed by company records before being emphasized.

Detailed findings: [full site](01-full-site-audit.md), [technical SEO](02-technical-seo.md), [keywords](03-keyword-strategy.md), [competitors](04-competitor-benchmark.md), [design/UX](05-design-ux-audit.md), [content/cases](06-content-and-case-studies.md), [IA](07-information-architecture.md), [backlog](08-prioritized-backlog.md), [roadmap](09-30-60-90-roadmap.md), and [proposed copy](10-proposed-copy.md).
