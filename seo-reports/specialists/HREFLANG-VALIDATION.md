# Hreflang & International SEO Validation

Analyzed: 2026-09-11  
Scope: Live sitemap (167 URLs), automated 12-page hreflang sample, and detailed parity inspection of homepage, services, and projects pairs. No API key was used.

## Hreflang Score: 70/100

## Summary

- Sitemap URLs: **167** (94 non-`/en` URLs, 73 `/en` URLs).
- Language variants detected: **Turkish (`tr`) and English (`en`)**.
- Hreflang codes detected: `tr`, `en`, `x-default`; all codes are valid.
- 12 pages sampled automatically; 10 exposed hreflang, 2 did not.
- Canonical mismatches: **0**.
- Protocol mismatches: **0**.
- Sitemap-based hreflang: **not present**; implementation is HTML-head based.
- Detailed bidirectional check passed for homepage, services, and projects pairs.

## Validation Results

| Set | TR self-ref | EN self-ref | Return tags | x-default | Canonical alignment | Status |
|---|---|---|---|---|---|---|
| `/` ↔ `/en` | Pass | Pass | Pass | Pass → TR | Pass | Valid |
| `/hizmetler` ↔ `/en/services` | Pass | Pass | Pass | Pass → TR | Pass | Valid |
| `/projeler` ↔ `/en/projects` | Pass | Pass | Pass | Pass → TR | Pass | Valid |
| `/iletisim` ↔ `/en/contact` | Pass in sampled TR | Sampled by analyzer | Analyzer found no canonical issue | Pass | Pass | Appears valid |
| `/hakkimizda` ↔ `/en/hakkimizda` | Pass in sampled TR | Sampled by analyzer | Analyzer found no canonical issue | Pass | Pass | Appears valid |
| `/gizlilik` | Missing | No EN route found in sitemap | N/A | Missing | Pass | TR-only legal page |
| `/kullanim-kosullari` | Missing | No EN route found in sitemap | N/A | Missing | Pass | TR-only legal page |

The automated tool reports “2 sampled pages missing self-reference.” The more precise interpretation is that both pages have **no hreflang set at all** and no English counterpart in the sitemap. This does not invalidate other hreflang clusters, but it leaves English users without localized privacy/terms content.

## Content Parity Sample

| Pair | Words TR / EN | H2 TR / EN | Images TR / EN | Schema | Parity finding |
|---|---:|---:|---:|---|---|
| Homepage | 402 / 326 | 5 / 5 | 57 / 55 | Organization / Organization | Good structure; small media mismatch |
| Services | 360 / 343 | 40 / 37 | 41 / 38 | Organization+FAQ / same | EN omits or relocates three listed offerings; reconcile inventory |
| Projects | 179 / 155 | 18 / 16 | 20 / 18 | Organization / Organization | EN list lacks two TR projects in the rendered index: TCMB and Rollic |

### Parity Score: 74/100

- Page existence and SEO pairings are generally strong for core routes.
- Visible list coverage is not fully equivalent on Services and Projects.
- The sitemap has 21 more non-English-prefixed URLs than English URLs; many may be deliberate, but a complete route-equivalence map is needed before claiming full parity.
- All sampled paired pages use localized title/H1 text and matching schema types.
- Sitemap `lastmod` values for the inspected pairs are aligned, so no freshness lag was detected in this sample.

## Cultural and Locale Adaptation

### Turkish: 82/100

- Local phone uses a correct +90 international format.
- Address order and Turkish CTA language are appropriate.
- KVKK terminology and Turkish legal pages are present.
- Improve trust with visible business hours, registration/company details, and substantiated claims.

### English: 72/100

- English navigation, titles, and CTAs are localized rather than mechanically copied.
- Some English phrasing remains awkward or inconsistent (`Rental`, Turkish slugs/names, “hakkimizda” path), and services/projects are not fully equivalent.
- There are no localized English privacy and terms pages in the sitemap.
- Use a declared target such as `en` if content is globally neutral; use a region code only when copy, currency, legal terms, and contact expectations are region-specific.

No currency/date-format conflicts were found in the inspected marketing pages. The site mostly avoids prices and date strings, so locale-format validation has limited coverage.

## Priority Actions

1. Add English Privacy and Terms pages, then create complete `tr`/`en`/`x-default` clusters for both legal routes.
2. Generate a full 167-URL equivalence map and resolve the 94-versus-73 route count gap.
3. Restore parity for the missing Services and Projects items, especially TCMB and Rollic in the English project index.
4. Make every cluster a complete mesh: self-reference, reciprocal return tags, and one x-default on every variant.
5. Add automated hreflang tests that compare canonical URL, trailing slash policy, status 200, and bidirectional tags before deployment.
6. Consider sitemap hreflang only if maintaining HTML tag sets at this scale becomes error-prone; do not maintain conflicting implementations.

## Ready-to-Use Legal-Page Pattern

```html
<!-- Turkish privacy page -->
<link rel="alternate" hreflang="tr" href="https://www.metasoftco.com/gizlilik" />
<link rel="alternate" hreflang="en" href="https://www.metasoftco.com/en/privacy" />
<link rel="alternate" hreflang="x-default" href="https://www.metasoftco.com/gizlilik" />
```

Publish the English counterpart first, and place the same complete set on both variants.

## Limitations

The automated validator sampled 12 URLs rather than fetching all 167. The parity audit deeply compared three high-value pairs. A complete production gate should crawl every sitemap URL and verify every declared alternate returns HTTP 200 and links back.

