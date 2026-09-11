# Action Plan

## Priority Queue

| Severity | Issue |
|----------|-------|
| Critical | Content: Author or expert attribution signals are limited or absent in the visible content. |
| Critical | Geo: Author/date attribution is weak in the visible content. |
| Critical | Geo: No strong 134-167 word self-contained answer block was detected. |
| Critical | Geo: Server-rendered content confirmation is weak without technical-cache support. |
| Critical | Geo: The page has limited question-based heading structure for AI extraction patterns. |
| Critical | Images: 1 image(s) exceed the 200KB warning threshold. |
| Critical | Images: 10 image(s) use weak or filename-like alt text. |
| Critical | Images: 11 below-the-fold sampled image(s) are not lazy loaded. |
| Critical | Images: 2 image(s) are missing width/height attributes. |
| Critical | Images: 6 sampled image(s) still use legacy raster formats. |

## Recommended Actions

- **Technical**: Prioritize the hero/LCP element, reduce render-blocking resources, and compress above-the-fold assets.
- **Technical**: Reduce main-thread JavaScript work and defer non-critical third-party scripts.
- **Technical**: Consider IndexNow if faster Bing/Yandex discovery matters to the publishing workflow.
- **Performance**: Prioritize the hero/LCP element, reduce render-blocking resources, and compress above-the-fold assets.
- **Performance**: Reduce main-thread JavaScript work and defer non-critical third-party scripts.
- **Performance**: Reserve space for images/components and avoid late-injected layout shifts.
- **Performance**: Provide `PAGESPEED_API_KEY` or re-run in an environment with PageSpeed API access for richer CWV evidence.
- **On Page**: Tighten the title tag so it stays in the 50-60 character band where possible.
- **On Page**: Shorten long title tags to 50-60 characters for optimal SERP display.
- **On Page**: Trim meta descriptions to 150-160 characters to avoid truncation.
- **Content**: Add explicit author, founder, reviewer, or expert attribution where it fits the page type.
- **Schema**: Add WebPage, WebSite markup aligned with the current page intent.
