# MetasoftCo Schema Detection & Validation Report

**Schema score:** 84/100  
**Analyzed:** 2026-09-11  
**Scope:** 167 sitemap URLs, server-rendered HTML

## Detection results

| Schema type | Pages/blocks | Status | Notes |
|---|---:|---|---|
| Organization | 167 | ✅ | Valid JSON-LD on every audited page |
| BreadcrumbList | 117 | ✅ | Positions, labels, and absolute item URLs passed automated checks |
| Service | 76 | ⚠️ | Two empty `image` values; one also has an empty `description` |
| FAQPage | 30 | ℹ️ | Structurally valid, but Google FAQ rich results are restricted to authoritative government/health sites |
| VideoObject | 22 | ✅ | Required name, description, thumbnail, upload date, and playback URL checks passed |
| BlogPosting | 9 | ✅ | Required headline, image, dates, author, and publisher checks passed |

- All JSON-LD blocks parsed successfully.
- No deprecated schema types were detected.
- No Microdata or RDFa implementation was detected; JSON-LD is correctly used as the primary format.

## Validation issues

### High

1. `https://www.metasoftco.com/hizmetler/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi`
   - `Service.description` is an empty string.
   - `Service.image` is an empty string.
2. `https://www.metasoftco.com/hizmetler/yapay-zeka-etkinlik-cozumleri/yapay-zeka-rozet-atolyesi-ai-sketch-to-badge`
   - `Service.image` is an empty string.

Empty values should be omitted until truthful values exist; they should not be emitted as `""`.

### Medium / informational

- FAQPage appears on 30 commercial pages. Keep it only for cross-platform/AI parsing value; do not expect Google FAQ rich results.
- No `WebSite`, `WebPage`, `ContactPage`, `Person`, or `ProfilePage` types were detected. The biggest opportunity is author/entity markup, followed by homepage WebSite/WebPage markup.
- Organization is repeated on all pages without a stable `@id`. Use a single canonical entity ID such as `https://www.metasoftco.com/#organization` and reference it from page-level schemas.
- Blog authors are organizations, not named experts. This is valid syntax but a weaker E-E-A-T entity model.
- The Stable Diffusion case-study description says “400+” while the headline says “500”; align visible copy and structured data with the verified number.

## Generated replacement/additive graph

`generated-schema.json` contains a syntax-validated homepage `@graph` for Organization, WebSite, and WebPage. It uses only values observed on the live site and introduces stable `@id` references. Integrate it by replacing the current standalone homepage Organization block rather than adding a duplicate Organization entity.

## Recommended sequence

1. Remove empty Service fields and provide verified descriptions/images.
2. Normalize Organization, WebSite, WebPage, publisher, provider, and author references through stable `@id` values.
3. Add named Person/ProfilePage entities only after bios and credentials are visible on the site.
4. Add ContactPage schema to `/iletisim` and `/en/contact`.
5. Revalidate deployed markup with Schema.org Validator and Google Rich Results Test.

## Limitations

- This is syntax and rule validation against server-rendered markup; Google's live Rich Results Test was not automated.
- Truthfulness of performance, accuracy, client, and service claims requires owner verification.

