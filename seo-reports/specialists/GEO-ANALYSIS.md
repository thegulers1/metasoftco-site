# GEO Analysis: www.metasoftco.com

Analyzed: 2026-09-11  
Scope: Live homepage, robots.txt, llms.txt, server-rendered HTML, and public web-search signals. No paid API or API key was used.

## GEO Readiness Score: 55/100

| Dimension | Score | Evidence |
|---|---:|---|
| Passage citability | 8/25 | 1 candidate block, 0 optimal 134-167 word blocks, 0 answer-first blocks, 0 data-rich blocks in homepage HTML |
| Structural readability | 13/20 | 16 headings and 2 lists, but no question-form headings and no tables |
| Multi-modal content | 12/15 | 57 images; project and service imagery is strong, but the homepage did not expose a video or interactive explainer as a crawlable content unit |
| Authority and brand signals | 10/20 | 100+ brand claim, project examples, Organization + founder data, LinkedIn/YouTube/Instagram links; no visible author/update attribution or primary-source citations |
| Technical accessibility | 12/20 | HTTP 200, substantial server-rendered HTML, AI crawlers allowed, substantive llms.txt; no detectable RSL policy and llms.txt has no Markdown-formatted links |

## Platform Readiness

| Platform | Score | Status |
|---|---:|---|
| Google AI Overviews | 59/100 | Traditional technical access is good; extractable question/answer passages and cited evidence are weak |
| ChatGPT Search | 65/100 | OpenAI crawlers are allowed and brand entity links exist; independent brand mentions remain thin |
| Perplexity | 59/100 | Crawler allowed; authority citations and third-party discussion signals are limited |

## AI Crawler Access

| Crawler | Status | Evidence |
|---|---|---|
| GPTBot | Allowed | Explicit `Allow: /` |
| OAI-SearchBot | Allowed by wildcard | No explicit block |
| ChatGPT-User | Allowed by wildcard | No explicit block |
| ClaudeBot | Allowed | Explicit `Allow: /` |
| Claude-SearchBot / Claude-User | Allowed by wildcard | No explicit block |
| PerplexityBot | Allowed | Explicit `Allow: /` |
| Google-Extended | Allowed | Explicit `Allow: /` |
| CCBot / anthropic-ai / Bytespider | Allowed by wildcard | No explicit block; decide separately whether training use is intended |
| cohere-ai | Allowed | Explicit `Allow: /` |

Only `/editpanel`, `/api`, `/login`, and legacy WordPress paths are disallowed. The public content surface remains crawlable.

## llms.txt and Licensing

- `/llms.txt`: HTTP 200, 9 major sections, 36 fact-like items, detailed service, technology, FAQ, contact, and English-summary content.
- Strong point: it exposes concrete operational facts such as 5-15 second processing and 40-60 people/hour.
- Gap: the parser detected **0 Markdown links**. The “Önemli Sayfalar” URLs are plain text, not `[label](URL)` entries expected by the llms.txt convention.
- Gap: no RSL 1.0 or other machine-readable AI licensing marker was detected in robots.txt, llms.txt, or homepage HTML.
- Integrity risk: claims including `%99 yüz doğruluğu`, `100+ proje`, and throughput figures should link to corroborating project data, methodology, or a dated source.

## Brand Mention Signals

| Surface | Status | Evidence / limitation |
|---|---|---|
| LinkedIn | Confirmed | Public company page indexed; 378 followers and recent updates were visible in web search |
| YouTube | First-party linked, externally unverified | Homepage and Organization `sameAs` link to `youtube.com/@MetasoftCo`; search did not return an independently readable channel result |
| Instagram | First-party linked, login-limited | Homepage link is present; public content was not independently readable in this crawl |
| Wikipedia / Wikidata | Not found in sampled search | No brand entity result surfaced |
| Reddit | Not found in sampled search | No independent MetasoftCo discussion surfaced |

Important consistency issue: the indexed LinkedIn page reports **Sarıyer, 2016**, while the website Organization data reports **Avcılar, 2020**. Align the current address/founding story across entity profiles.

## Passage-Level Citability

The homepage has no self-contained 134-167 word answer block. The best raw material is the AI Photo service paragraph, but it is embedded as promotional copy and lacks a question heading, attributed evidence, and a compact factual conclusion.

Recommended homepage block:

> **Yapay zekâ etkinlik aktivasyonu nedir?** Yapay zekâ etkinlik aktivasyonu, katılımcının fotoğrafını, hareketini veya verdiği yanıtı gerçek zamanlı olarak markaya özel bir dijital deneyime dönüştüren uygulamadır. MetasoftCo; AI Photobooth, AI Greenbox, artırılmış gerçeklik ve interaktif oyun sistemlerini etkinlik öncesi tasarım, sahada kurulum ve operasyon desteğiyle birlikte sunar. Katılımcılar üretilen içeriği QR kod, e-posta veya baskı yoluyla alabilir. Sistemler açık rıza akışı ve etkinlik sonrası veri silme seçenekleriyle KVKK süreçlerine göre yapılandırılır. Proje kapsamı; etkinlik türü, katılımcı sayısı, mekan, marka kimliği ve istenen çıktı formatına göre belirlenir. İstanbul merkezli ekip Ankara, İzmir, Bursa ve Türkiye genelinde kurulum sağlayabilir. Büyük etkinliklerde kapasite, birden fazla istasyon kullanılarak artırılır. Böylece marka; yalnızca izlenen bir sahne kurmak yerine ölçülebilir, paylaşılabilir ve katılımcının doğrudan dahil olduğu bir deneyim üretir.

Before publishing, validate every quantitative or compliance claim and link it to supporting evidence.

## Server-Side Rendering

- The first HTTP response contained the full title, H1/H2/H3 hierarchy, 402 words, internal links, NAP, project/service copy, and Organization JSON-LD.
- This confirms that core homepage content is available without executing JavaScript.
- Default and Googlebot fetches both returned HTTP 200 and the same 96,768-byte response size; no crawler-specific content divergence was observed.

## Schema Recommendations

1. Keep `Organization`, add a stable `@id`, and reconcile founding date/address with LinkedIn.
2. Add `WebSite` and homepage `Service`/`OfferCatalog` relationships for the main experience categories.
3. On articles, use `Article` or `BlogPosting` with `author`, `datePublished`, `dateModified`, and reviewed-by credentials where applicable.
4. Add `VideoObject` for real demos and `ImageObject` where original project photography is central.
5. Do not add FAQ schema merely for display; retain visible Q&A content and use schema only where it is eligible and accurate.

## Top 5 Highest-Impact Changes

1. Put a verified 134-167 word direct-answer block under a question-form H2 on the homepage and each core service page.
2. Convert llms.txt key-page entries to Markdown links and attach evidence URLs to all quantitative claims.
3. Add visible author/reviewer and updated-date signals to guides, case studies, and technical claims.
4. Reconcile the Sarıyer/2016 versus Avcılar/2020 entity conflict across LinkedIn and website schema.
5. Earn independent mentions and demonstrations on industry publications, YouTube, Reddit/community discussions, and association/member pages.

## Sources and Limitations

- Live evidence: `https://www.metasoftco.com/`, `/robots.txt`, `/llms.txt`.
- Public search evidence: [Metasoft Company on LinkedIn](https://tr.linkedin.com/company/metasoftco).
- No DataForSEO, Ahrefs, LLM mention API, or authenticated social-platform data was used; platform scores are readiness scores, not measured citation share.

