# Local SEO Analysis: www.metasoftco.com

Analyzed: 2026-09-11  
Scope: Homepage, contact/about pages, Organization schema, public web search, and visible citation links. No GBP, geo-grid, paid, or API-key data was used.

## Local SEO Score: 41/100

| Dimension | Weight | Score | Main evidence |
|---|---:|---:|---|
| GBP signals | 25 | 11 | Google Maps search link, photos, service/location wording; no place ID/embed, hours, review widget, or GBP post evidence |
| Reviews & reputation | 20 | 2 | No rating, review count, recent review, owner-response, testimonial, or aggregateRating evidence in sampled pages |
| Local on-page SEO | 20 | 15 | İstanbul in title, visible NAP, dedicated services, click-to-call, contact form, project cases; H1 lacks city/service phrase |
| NAP & citations | 15 | 5 | Page/schema NAP is internally consistent; LinkedIn conflicts with website; Tier-1 directory presence mostly unverified |
| Local schema | 10 | 3 | Organization + PostalAddress + ContactPoint exists; no LocalBusiness/ProfessionalService, geo, hours, priceRange, rating |
| Local authority | 10 | 5 | Strong named-client/project evidence and LinkedIn presence; no detectable chamber, BBB, local press, awards, or community links |

## Business and Vertical

- Business type: **Hybrid** — a physical İstanbul Teknokent address is shown while the business states it serves Turkey nationally.
- Industry: **event technology / experiential activation agency**. This is outside the skill's six specialized vertical templates, so a generic `ProfessionalService`/`LocalBusiness` path is appropriate.
- Primary location: Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No: 37/1, İç Kapı No: 28, Avcılar / İstanbul, 34320, TR.
- Phone: +90 534 233 40 51.

## GBP Checklist

| Signal | Status |
|---|---|
| Google Maps reference | Partial — generic search URL, no verified place ID detected |
| Primary category alignment | Not verifiable; likely categories should center on event technology/event management rather than generic software |
| Additional categories | Not verifiable |
| Business hours | Missing on sampled pages/schema |
| Photos/video | Strong first-party project imagery; YouTube linked |
| GBP posts | Not verifiable |
| Reviews widget/count | Missing |
| Website FAQ replacing old GBP Q&A | Present on service hub, absent from homepage |
| Click-to-call | Pass (`tel:+905342334051`) |

## Review Health

- Rating: not found.
- Review count: not found.
- Recent review/velocity: not assessable.
- Owner responses: not assessable.
- `aggregateRating`: not present.
- Testimonials: not visible in the homepage/contact/about sample.

This is a visibility gap, not proof that the business has no Google reviews.

## NAP Consistency

| Source | Name | Address | Phone | Status |
|---|---|---|---|---|
| Visible website | MetasoftCo | Avcılar / İstanbul Teknokent | +90 534 233 40 51 | Baseline |
| Organization JSON-LD | MetasoftCo | Same address + postal code 34320 | +90 534 233 4051 | Semantically consistent |
| Indexed LinkedIn company page | Metasoft Company | Sarıyer, Ayazağa / Veko Giz No:85 | Not surfaced | **Conflict** |

LinkedIn also reports founding year 2016 while website schema reports 2020. Update whichever source is stale and keep name, address, phone, founding date, and URL consistent.

## Citation Presence

| Platform | Status |
|---|---|
| Google Business Profile | Generic Maps search link only; listing not independently verified |
| LinkedIn | Confirmed, but entity facts conflict |
| YouTube | First-party linked; external indexing not independently confirmed |
| Instagram | First-party linked; login-limited |
| Facebook | Not detected |
| Yelp | Not verified; access/search inconclusive |
| Apple Business Connect | Not verified |
| Bing Places | Not verified |
| Foursquare / data aggregators | Not verified |

## Local Schema Status

Current schema is valid `Organization`, but it does not fully express the physical/service-area business. Recommended pattern:

```json
{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://www.metasoftco.com/#business",
  "name": "MetasoftCo",
  "url": "https://www.metasoftco.com/",
  "telephone": "+90 534 233 40 51",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No: 37/1, İç Kapı No: 28",
    "addressLocality": "Avcılar",
    "addressRegion": "İstanbul",
    "postalCode": "34320",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "VERIFY_TO_5_DECIMALS",
    "longitude": "VERIFY_TO_5_DECIMALS"
  },
  "areaServed": ["İstanbul", "Ankara", "İzmir", "Türkiye"],
  "openingHoursSpecification": [],
  "priceRange": "Teklif usulü"
}
```

Do not publish placeholder coordinates or hours; verify them against the current GBP/location first. Only add `aggregateRating` when the displayed reviews and policy eligibility support it.

## Location Page Quality

- No multi-location network was detected; the site presents one office with national service coverage.
- Dedicated service pages and sector pages are strong foundations.
- The contact H1 is conversion-focused but not locally descriptive; add a supporting H2 such as “Avcılar, İstanbul merkezli etkinlik teknolojileri ekibi”.
- A real map/embed or verified GBP directions link and visible office hours would strengthen the contact page.

## Top 10 Actions

1. **Critical:** Reconcile LinkedIn's Sarıyer/2016 data with the website's Avcılar/2020 data.
2. **High:** Confirm/claim GBP and replace the generic Maps search URL with the verified place/directions URL.
3. **High:** Publish current hours on the contact page and in schema.
4. **High:** Add verified `ProfessionalService`/`LocalBusiness` data with stable `@id`, geo coordinates, direct telephone, image, and `areaServed`.
5. **High:** Surface genuine Google rating/count and recent testimonials where policy permits; do not use review gating.
6. **High:** Claim or reconcile Bing Places and Apple Business Connect.
7. **Medium:** Add city/service support text to the homepage and contact-page heading hierarchy without keyword stuffing.
8. **Medium:** Build citations on Foursquare and relevant Turkish/event-industry directories using the exact same NAP.
9. **Medium:** Earn local authority mentions through İstanbul Teknokent, venues, clients, trade media, and event-industry associations.
10. **Medium:** Add visible, localized FAQ content covering service area, setup time, capacity, power/space, privacy, and quote process.

## Limitations

This run could not inspect GBP Insights, live local-pack positions, review velocity, geo-grid rankings, Domain Authority, or comprehensive citation/backlink coverage. Search-engine and platform robots/login restrictions also make “not verified” different from “absent.”

Public evidence: [Metasoft Company on LinkedIn](https://tr.linkedin.com/company/metasoftco).

