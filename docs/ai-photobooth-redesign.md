# AI Photobooth TR redesign — 5 November 2026

## Scope and data contract

Only `/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala` selects `AiPhotoboothDetail`. English, other rental services and sale pages still use the existing template. Shared `ServiceDetailClient`, `ms.css`, `splitHtmlSections`, the Prisma schema and metadata generator are unchanged.

The route retains the existing publication checks, redirect behavior, one-hour revalidation, cached service lookup, admin edit URL and published sale counterpart. The new server-rendered view receives the existing service/category/gallery/related services, plus exactly the two approved published projects. Project images and links come from Prisma; unpublished or image-less projects are omitted. No stock images, generated replacement assets or additional project references are used.

`dataCapture` controls the optional CRM block and its FAQs. `outputType` controls delivery wording; physical printing is described as an option with scope agreed in the quote. The view does not use the shared scope list that currently says “750 prints included”. The quote links retain `rentalProductName(service.title, "tr")` and `?urun=`. The existing video and gallery components retain their interactions. New quote links use the existing analytics component with distinct hero/brand/closing locations.

The route retains BreadcrumbList, VideoObject (when applicable) and FAQPage. The specialized view emits the same Service schema once; global Organization/WebSite schemas stay in the root layout. Metadata, canonical, hreflang, OG and Twitter generation have not changed. The visible H1 is `AI Photobooth Kiralama`, with no metadata-based aria-label override.

## Legacy HTML diagnosis and rendering decision

The publicly rendered RSC service payload was read on 5 November 2026. The defect is present in `Service.content`, rather than being introduced solely by the shared parser. Its structure, with nonbreaking spaces decoded, is:

```html
<h3><strong>Hassas Yüz Algılama ve AI Face-Swap</strong></h3>
<h3>AI Face Swap (yapay zekâ ile yüz değiştirme) teknolojisi sayesinde
  [the entire explanatory paragraph]
  <strong>QR Kod ile Anında Teslimat ve Termal Baskı</strong>
</h3>
<p>İşlenen fotoğraflar ...</p>
```

The first heading has no body. The second heading incorrectly contains both the explanation and the next heading. Splitting every h2/h3 into cards preserves that source mistake and turns a paragraph into a very large title.

The dedicated page uses explicit React headings and paragraphs with reviewed Turkish editorial text. It neither injects this legacy HTML nor guesses heading boundaries with another regex. Metadata/FAQ/media/specs remain database-backed. **Main editorial section copy is maintained in `AiPhotoboothDetail.tsx`; changing the legacy `content` field in the admin does not automatically update these curated sections.** This is intentional and confined to this TR service.

The source FAQ also contained a no-queues capacity promise and a process answer implying printing was unconditional. Two exact existing questions receive reviewed presentation answers in `aiPhotoboothFaq`; both visible FAQ and schema receive the same list. All other questions/answers, including internal links and the optional module, retain their existing composition.

## Content work remaining (not applied to production)

No migration or database update is required to use the redesigned view. For content hygiene, an authorized editor should separately review and correct the TR `content` HTML: convert the Face Swap explanation into a paragraph and give the QR section its own heading. Also remove the legacy “Kusursuz” heading, no-queues wording and any unconditional print inclusion, after checking the intended text. The two FAQ presentation corrections can later be reconciled with approved source answers. Do not run a bulk replacement or change English content as part of this redesign.

The photos policy is rendered as requested: automatically deleted after the event if not requested by the client brand; retained for at most 90 days and shared through the agreed process when requested before the event. This is descriptive copy, with no legal compliance guarantee.

An interactive participant preview/retry/theme-selection flow could not be verified. The page therefore explains the final image and pre-event theme/sample review, without promising additional participant controls.

## Validation

- `node --import tsx scripts/check-ai-photobooth.ts`: route matching excludes EN/other categories/sale slugs, approved reference slugs, eight output/capture FAQ combinations, invalid JSON/spec handling and reviewed answers.
- Browser QA used the actual new component in a temporary local route with public service/project snapshots because the configured local PostgreSQL server (`127.0.0.1:15432`) was unavailable. The temporary route and JSON fixture were removed after QA. This verifies rendering and interactions, not the unavailable live Prisma integration.
- 320, 390, 768 and 1440 px: document width matched viewport width; no horizontal overflow observed.
- 390 × 844: hero quote starts around y=385 px; real image starts around y=501 px. Both are visible in the first viewport. No fixed bottom CTA was added. The mobile media caption link is hidden to avoid overlap with floating controls; the video remains available below.
- One H1; all 16 FAQ questions **and answers** matched FAQPage output, including link text normalization.
- Case anchor, YouTube click-to-load iframe, gallery open/next/close and native FAQ toggling checked.
- Following the hero quote selected `AI Photo & AI Photobooth` in the existing contact form. No form was submitted.
- Screenshots: `output/ai-photobooth-qa/desktop.jpg`, `desktop-cases.jpg`, `mobile.jpg`. These show the local fixture preview, not a production deployment. Full-page capture was not retained because viewport-gated gallery reveals do not reliably appear in a single full-page screenshot.
- Full `pnpm build` reached runtime validation and failed because local PostgreSQL was unavailable. No deployment was attempted.
- `pnpm exec next build --webpack --experimental-build-mode compile`: passed, including page-data collection and build traces. Compile mode does not replace runtime DB validation or a complete deployment build.
- Final `pnpm typecheck`, changed-file ESLint, `git diff --check`, and the dedicated behavior checks passed. Repository-wide lint has existing unrelated failures.
