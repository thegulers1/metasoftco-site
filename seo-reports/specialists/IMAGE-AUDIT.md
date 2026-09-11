# MetasoftCo Image SEO & Performance Audit

**Image score:** 58/100  
**Analyzed:** 2026-09-11  
**Scope:** 1,315 `<img>` occurrences across 167 pages; 195 unique image URLs

Network sizes were measured with a modern browser image `Accept` header so Cloudinary `f_auto` delivery is represented more accurately.

## Audit summary

| Metric | Status | Count |
|---|---|---:|
| Unique images | — | 195 |
| Missing `alt` attribute | ✅ | 0 |
| Empty alt | ⚠️ | 52 unique / 657 occurrences |
| Empty-alt service imagery | ❌ | 37 unique assets |
| No explicit dimensions/aspect ratio in `<img>` | ⚠️ | 182 unique / 885 occurrences |
| Responsive `srcset` + `sizes` | ✅/⚠️ | 64 unique / 488 occurrences |
| Native lazy loading | ✅ | 140 unique / 771 occurrences |
| `decoding="async"` | ✅ | 65 unique / 822 occurrences |
| LCP priority | ✅ | 80 pages use exactly one `fetchpriority="high"` image; no page uses more than one |
| Network checks | ✅ | 194/195 successful; one third-party logo rejects HEAD with 405 |
| Known byte size | — | 192 unique |
| Over 200 KB | ❌ | 53 unique |
| Over 500 KB | ❌ | 6 unique |

## Delivery format

With modern image negotiation, responses were: 161 WebP, 18 JPEG, 7 PNG, 7 SVG, and 1 GIF; the remaining third-party Turkcell logo returned 405 to HEAD. Cloudinary is doing substantial useful work, but large 1920-pixel variants remain expensive.

## Largest optimization targets

| Image | Current size | Delivered format | Main use | Directional savings |
|---|---:|---|---|---:|
| `/phase2/about-production-stage-v2.png` | 2,054 KB | PNG | About + contact, TR/EN | ~1,027 KB at conservative 50% |
| `/phase2/contact-producers-v2.png` | 1,214 KB | PNG | Contact, TR/EN | ~607 KB at conservative 50% |
| Cloudinary `projects/njbi5xxs3phbnvbds62t.jpg` | 594 KB | WebP | Project index/detail | ~178 KB at 30% |
| Cloudinary `services/rjsctqskewoiqgguyzmx.png` | 561 KB | WebP | Service index and 20+ pages | ~168 KB at 30% |
| Cloudinary `projects/yycheohnol7p2jxppdvs.png` | 561 KB | WebP | Project index/detail | ~168 KB at 30% |
| Cloudinary `services/mcwyfadiwamunojcz1dp.jpg` | 545 KB | WebP | Service index and 20+ pages | ~164 KB at 30% |

Savings are directional estimates; visual QA and real rendered dimensions are required before re-encoding.

## Priority issues

### High — Two unoptimized first-party PNGs

The 2.0 MB About image and 1.2 MB Contact image bypass Cloudinary. Generate AVIF/WebP variants, preserve a fallback, and serve sizes matched to the actual layout.

### High — Oversized CDN variants

Fifty-three of 192 measurable unique images exceed 200 KB, including four Cloudinary-delivered WebP assets above 500 KB. Revisit requested width, crop, quality, and DPR rather than relying on format conversion alone.

### Medium — Alt-text opportunity

All images have an `alt` attribute, but 52 unique sources use `alt=""`. Twelve are brand logos and one is a tracking pixel, where decorative handling may be intentional. Thirty-seven are service images and one is project imagery; these should receive concise descriptive alt text when they communicate visible service/project content. If truly decorative or redundant inside a labeled link, keep empty alt and make that intent explicit.

### Medium — CLS verification

One hundred eighty-two unique images lack intrinsic width/height or inline aspect-ratio on the `<img>` itself. Many are Next.js `fill` images and may be stabilized by CSS containers, so this is a markup warning rather than proof of CLS. Verify the rendered containers in Lighthouse/Chrome and add explicit aspect-ratio where space is not reserved.

## Recommended sequence

1. Convert and resize the two first-party PNGs; this is the clearest immediate byte win.
2. Cap Cloudinary widths to rendered needs and test `q_auto:eco`/quality settings on the 53 oversized assets.
3. Add contextual alt text to the 37 unique service images that convey content.
4. Preserve the current one-high-priority-image-per-page pattern and never lazy-load that LCP candidate.
5. Verify CSS aspect-ratio reservation for every `fill` image with browser-based CLS testing.

## Limitations

- Byte sizes are HEAD response `Content-Length` values, not full waterfall transfer measurements.
- JavaScript/CSS background images and video posters outside `<img>` were not inventoried.
- Image SERP rankings were skipped because this run intentionally used no API keys.

