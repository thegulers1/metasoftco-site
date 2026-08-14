# Design QA — Homepage Signal Portal

Result: passed

## Source and implementation

- Source image: `/Users/lawlieties/.codex/generated_images/01a001b8-dba2-7820-aa1c-ca035340c856/exec-9acd4e88-2840-452c-b5ae-a6e163a310ab.png`
- Source dimensions: 1487 × 1058 px; normalized to the 1425 × 1013 px implementation capture for comparison.
- Implementation: `http://localhost:3300/en`
- Implementation screenshot: `docs/audit/screenshots/phase-2/after/home-desktop.png`
- Mobile screenshot: `docs/audit/screenshots/phase-2/after/home-mobile.png`
- Browser: Codex in-app Browser.
- Desktop viewport override: 1440 × 1024 CSS px at 1× density; rendered client width 1425 px and captured raster 1425 × 1013 px. State is the homepage at scroll position 0.
- Mobile viewport override: 390 × 844 CSS px at 1× density; rendered client width 375 px and captured raster 375 × 812 px. State is the homepage at scroll position 0.

## Comparison evidence

- Full same-state comparison: `docs/audit/screenshots/phase-2/comparison/home-desktop-reference-implementation.png`
- Focused hero comparison: `docs/audit/screenshots/phase-2/comparison/home-desktop-reference-implementation-focus.png`
- The reference is on the left and the implementation is on the right in both comparison files.

## Final visual findings

- P0: none.
- P1: none.
- P2: none.
- The final implementation matches the selected composition's dominant relationships: fixed dark chrome, top eyebrow, full-width spectrum outline word, oversized three-line solid headline, centered faceted live-work portal, right-side buyer explanation and CTA pair, and bottom capability band.
- Accepted non-blocking differences: the implementation uses the existing MetasoftCo type system and live Ray-Ban source crop; the small decorative orbit from the concept was omitted because it did not add content or conversion value.

## QA history

1. First browser pass revealed that “EXPERIENCES” was too narrow and rendered as a filled gradient; the solid headline was also narrower than the selected composition.
2. The display treatment was widened, converted to a cyan/violet/coral outline, and the solid headline was horizontally tuned to match the reference proportions.
3. The first mobile pass inherited desktop horizontal scaling and wrapped the final “S” onto a separate line. Mobile now explicitly removes horizontal scaling and keeps the word on one line.
4. A stale local development server was found rewriting the build cache. It was stopped, the production bundle was rebuilt, and all evidence was recaptured from the verified production server.
5. Final full and focused side-by-side review found no remaining P0, P1 or P2 mismatch.

## Responsive and interaction checks

- No horizontal overflow at requested widths 320, 375, 390, 430, 768, 1024 and 1440 px.
- Mobile navigation opens, exposes `aria-expanded="true"`, and shows Work, Capabilities, About, Insights and the primary CTA.
- Mobile primary CTA was activated in the browser and navigated successfully to `/en/contact`.
- Hero CTA targets verified: primary `/en/contact`; secondary `/en/projects`.
- `prefers-reduced-motion` disables or shortens the ambient animations through the existing Phase 2 reduced-motion rule.

## Engineering checks

- `pnpm exec tsc --noEmit`: passed.
- Scoped ESLint for `src/components/phase2/HomePrototype.tsx`: passed.
- `pnpm build`: passed.
- Browser console errors on the final page: none.
- Expected local analytics warning: Ahrefs ignores localhost events; this does not affect the implementation.
