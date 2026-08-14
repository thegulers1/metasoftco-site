# Design QA — Full Homepage Signal System

## Findings

- P0: none.
- P1: none.
- P2: none.
- The full homepage preserves the selected source's five dominant visual relationships: near-black editorial canvas, cyan/violet/coral outline typography, restrained atmospheric light fields, large real-work imagery, and mono-indexed signal details.
- Accepted constraint: the selected source visual contains only the hero. Below-fold QA therefore evaluates faithful continuation of its design language rather than claiming a literal 1:1 section-layout match.

## Source and implementation

- Source visual truth: `/Users/lawlieties/.codex/generated_images/01a001b8-dba2-7820-aa1c-ca035340c856/exec-9acd4e88-2840-452c-b5ae-a6e163a310ab.png`.
- Source pixels: 1487 × 1058 px.
- Implementation: `http://localhost:3300/en`.
- Browser: Codex in-app Browser.
- Desktop viewport override: 1440 × 1024 CSS px at 1× density; rendered client width 1425 px; captured section rasters are 1425 × 1013 px.
- Mobile viewport override: 390 × 844 CSS px at 1× density; rendered client width 375 px; captured section rasters are 375 × 812 px.
- State: English homepage, dark theme, each named section aligned below the fixed navigation.

## Comparison evidence

- Full design-language board: `docs/audit/screenshots/phase-2/comparison/home-overall-styleboard-reference-implementation.png`.
  - Order: source hero; Selected Work; Capabilities; How We Build; Why Interactive; final CTA.
- Focused outline and ambient-field comparison: `docs/audit/screenshots/phase-2/comparison/home-overall-focused-outline-reference-capabilities.png`.
  - Source hero is on the left; implemented Capabilities section is on the right.
- Responsive contact sheet: `docs/audit/screenshots/phase-2/comparison/home-overall-mobile-contact-sheet.png`.
- Restored logo-loop evidence:
  - Desktop: `docs/audit/screenshots/phase-2/after/home-logo-loop-desktop.png` (1265 × 712 px capture).
  - Mobile: `docs/audit/screenshots/phase-2/after/home-logo-loop-mobile.png` (375 × 812 px capture).
- Individual implementation evidence:
  - `docs/audit/screenshots/phase-2/after/home-overall-work-top-desktop.png`
  - `docs/audit/screenshots/phase-2/after/home-overall-work-grid-desktop.png`
  - `docs/audit/screenshots/phase-2/after/home-overall-capabilities-desktop.png`
  - `docs/audit/screenshots/phase-2/after/home-overall-process-desktop.png`
  - `docs/audit/screenshots/phase-2/after/home-overall-value-desktop.png`
  - `docs/audit/screenshots/phase-2/after/home-overall-final-desktop.png`

## Required fidelity surfaces

- Fonts and typography: Space Grotesk, Manrope and JetBrains Mono remain consistent with the accepted hero. Outline display words use the same cyan-to-violet-to-coral treatment, optical weight and tight tracking. Mobile wrapping remains intentional and readable.
- Spacing and layout rhythm: desktop alternates full-width editorial headers, asymmetric project imagery, indexed rows, staggered steps and a split value section. Mobile collapses to one column without cramped controls or broken hierarchy.
- Colors and tokens: the existing Phase 2 black, warm white, muted text and cyan CTA tokens remain unchanged. Spectrum accents are limited to outline text, atmospheric fields and selected borders.
- Image quality and asset fidelity: only existing real MetasoftCo project imagery is used. Crops remain sharp and contextual; no placeholders, generated substitutes, inline SVG artwork or CSS-drawn media were introduced.
- Copy and content: the approved section order, project labels, capability descriptions, process copy, value proposition and CTA destinations are preserved. Display lines were edited only where required to carry the selected visual language.
- Icons: ArrowUpRight and Sparkles come from the existing Lucide icon dependency, use consistent stroke weight, and remain decorative where appropriate.
- Accessibility: heading hierarchy remains one H1 followed by section H2s and project/capability H3s. Links remain semantic, icons are aria-hidden, focus styles are inherited, mobile controls meet the existing touch-target rules, and reduced motion is respected.

## Comparison history

1. Pass 1 compared the selected source, all five redesigned desktop sections, the focused Capabilities region and the five mobile section captures in combined evidence images.
2. Pass 1 found no actionable P0, P1 or P2 mismatch. No visual fixes were required after the comparison.
3. Responsive verification found no horizontal overflow at requested widths 320, 375, 390, 430, 768, 1024 and 1440 px.
4. Scoped follow-up restored the original continuously looping 12-brand strip in four repeated groups and removed the interim AI Photo / Custom Software capability ticker. Desktop and mobile captures confirm the loop sits directly between the hero and Selected Work.

## Interactions and engineering checks

- Mobile menu opened and exposed `aria-expanded="true"`.
- Mobile primary navigation CTA successfully navigated to `/en/contact`.
- All three project links, four capability links and both final CTA links were verified in the browser.
- Logo-loop check: 48 rendered logo images (12 brands × 4 repeated groups); `.p2-signal-ticker` absent; no horizontal overflow on mobile.
- Browser console errors: none.
- `pnpm exec tsc --noEmit`: passed.
- Scoped ESLint for `src/components/phase2/HomePrototype.tsx`: passed.
- `pnpm build`: passed.

final result: passed
