# MetasoftCo Phase 2 — Implemented Design System

Date: 14 August 2026

Scope: three English prototype routes only

## Principles

1. Proof before claims.
2. Creative direction and engineering should feel inseparable.
3. Project media carries colour; the interface stays restrained.
4. A buyer should understand category, output and next step without decoding slogans.
5. Every component must work in a live B2B decision journey, not only in a moodboard.

## Scope and Isolation

The system is activated by the `.phase2` page wrapper and by the exact route set in `src/lib/phase2.ts`. The existing Navbar, Footer, Chat and WhatsApp components switch behavior only on:

- `/en`
- `/en/services/ai-event-solutions/ai-photobooth`
- `/en/projects/tavuk-dunyasi-x-ai-photo`

All other public pages remain on the pre-existing design system.

## Typography

Existing local project font variables are reused; no new font family or paid font was added.

| Role | Font | Desktop | Mobile | Line height | Weight / tracking |
|---|---|---:|---:|---:|---|
| Display / H1 | Space Grotesk | `clamp(48px, 7vw, 104px)` | `clamp(44px, 13vw, 66px)` | 0.94 | 560, -0.045em |
| Homepage signal H1 | Space Grotesk | 112–180px with controlled horizontal scale | 40–82px without horizontal scale | 0.9–0.94 | 450/620, uppercase, tight tracking |
| Service H1 | Space Grotesk | `clamp(50px, 6vw, 88px)` | inherited mobile H1 | 0.94 | 560, -0.045em |
| H2 | Space Grotesk | `clamp(38px, 5vw, 68px)` | `clamp(36px, 10vw, 52px)` | 1.0 | 520, -0.045em |
| H3 | Space Grotesk | `clamp(22px, 2vw, 30px)` | fluid | 1.08 | 540, -0.045em |
| Body large | Manrope | 18–22px | 17–18px | 1.6–1.75 | regular |
| Body | Manrope | 16px | 16px | 1.75 | regular |
| Small/meta | Manrope | 12–14px | 12–14px | 1.45–1.7 | medium |
| Label/eyebrow | JetBrains Mono | 11px | 11px | 1.5 | 650, 0.15em |
| Button | Manrope | 14px | 14px | normal | 700 |

Headings use balanced wrapping where supported. Body text uses comfortable measures, normally 650–820px depending on purpose.

## Color

| Token | Value | Role |
|---|---|---|
| `--p2-bg` | `#07090b` | Primary background |
| `--p2-surface` | `#0e1216` | Elevated/alternating section |
| `--p2-surface-2` | `#151a1f` | Media placeholder/reserved background |
| `--p2-text` | `#f4f7f8` | Primary text |
| `--p2-muted` | `rgba(244,247,248,.64)` | Secondary text |
| `--p2-line` | `rgba(244,247,248,.14)` | Borders and dividers |
| `--p2-accent` | `#61d9e7` | CTA, labels, focus and selected detail |
| Primary CTA text | `#071013` | Accessible dark text on cyan |
| Focus | 3px `--p2-accent` | Visible keyboard indication |

Project media supplies most chromatic contrast. The homepage alone uses a restrained cyan → violet → coral spectrum on the outline headline, portal edge and ambient light fields. These accents are route- and component-scoped rather than general-purpose surface tokens. Error/success components were not required by the implemented prototype and are therefore not specified as implemented tokens.

## Spacing

The system uses a small set of repeated ranges rather than a universal numeric scale:

- Desktop section block spacing: `clamp(88px, 10vw, 152px)`.
- Final CTA spacing: `clamp(92px, 11vw, 168px)`.
- Mobile section block spacing: 78px.
- Section heading to primary content: `clamp(48px, 6vw, 76px)`.
- Primary grid gaps: 24px for cards; 48–112px for split editorial layouts.
- Button/action gap: 12px.
- Line-based list row padding: 18–26px.

## Containers and Grid

- Content max width: 1280px.
- Desktop edge padding: 20px each side through `width: min(100% - 40px, 1280px)`.
- Mobile edge padding: 16px each side through `width: min(100% - 32px, 1280px)`.
- Desktop: the homepage uses one layered signal stage; detail pages use custom 2-column hero/split grids; process/scope use 4-column grids.
- Tablet (≤1000px): the signal stage tightens and moves its buyer copy below the headline field; detail heroes stack; process/journey become two columns.
- Mobile (≤700px): all primary content becomes one column; facts remain one or two columns depending on scan value.
- Media can span the 1280px content width but does not use uncontrolled viewport-width overflow.

## Buttons and Links

### Primary

- Cyan background, dark text.
- Minimum 50px height in content; 44px in navigation.
- Text and a Lucide arrow icon.
- Hover: lighter cyan and a 2px upward translation.

### Secondary

- Transparent/dark background, visible low-contrast border.
- Hover increases surface and border contrast.

### Text action

- No filled container.
- Bottom border and directional arrow.
- Used for lower-emphasis proof/navigation actions.

### Mobile

- Full width.
- Content is justified between label and icon.
- Minimum touch target remains at least 44px.

### Focus

Buttons, links and FAQ summaries use a 3px cyan focus ring with 4px offset.

## Navigation

- Fixed, near-opaque black header with 16px backdrop blur and 1px divider.
- 76px desktop height; 68px mobile height.
- Desktop order: brand, Work, Capabilities, About, Insights, Plan Your Activation.
- Mobile uses a 46px menu button and a simple vertical navigation panel.
- Escape closes the mobile panel; link selection closes the panel.
- Skip link appears on keyboard focus and targets `#main-content`.
- The CTA is intentionally singular; chat and WhatsApp floating actions are hidden on prototype routes.

## Cards and Lists

### Project card

- Image-led, square-corner/low-decoration presentation.
- First homepage project spans both columns on desktop.
- Metadata and title sit below the media rather than over it.
- Hover scale is limited to 1.025.

### Capability list

- Full-width line rows rather than repeated boxes.
- Four-column desktop anatomy: index, title, explanation, arrow.
- Collapses to a compact three-column/mobile layout.

### Process and journey

- Ordered semantic lists.
- Four columns desktop, two tablet, one mobile.
- Dividers establish sequence without ornamental cards.

### FAQ

- Native `details` and `summary` for keyboard and no-JS baseline behavior.
- Line-separated rows with a simple plus indicator.

## Media

### Landscape project photography

- Uses responsive `next/image` fill behavior inside a reserved aspect-ratio container.
- Object-fit is cover; crop is reviewed per placement.
- Used for homepage proof and case hero.

### Portrait event video

- Rendered by the existing reusable `VideoPlayer`.
- YouTube iframe now uses `loading="lazy"`.
- Maximum width is constrained for vertical media.
- Poster/fallback image is supplied when available.

### AI output

- Shown as real project imagery, never as a CSS mock or placeholder.
- Case gallery uses 4:5 output slots; mobile returns to a single vertical stack.

### Installation imagery

- Prioritised in hero or proof sections when it demonstrates physical delivery.

### Before/after

- Not implemented because an approved input/output pair was not available. This remains a proposed future component, not part of the current system.

### Carousels and device mockups

- Not implemented. Static grids are faster, easier to scan and better supported by the current asset set.

## Border Radius and Borders

- Core image and card containers are square by default.
- Existing `VideoPlayer` retains a 16px radius.
- Buttons are rectangular, not pill-shaped.
- 1px low-contrast borders define hierarchy.
- The system avoids layered floating-card decoration.

## CTA Pattern

- Global primary phrase: **Plan Your Activation**.
- Case-specific closing phrase: **Build a Similar Experience**.
- Hero contains primary + evidence-oriented secondary action.
- Mid-page CTA is used only where it follows proof.
- Every page ends with a full-width final CTA section.

## Footer

- Four-column desktop grid: positioning, explore, contact and social.
- Two columns on mobile with the positioning block spanning the width.
- Contains no unpublished English legal link placeholders.
- Uses factual Istanbul location and existing contact/social destinations.

## Motion

- Homepage-only spectrum breathing, portal-edge drift and a continuously moving capability band.
- Media hover scale and CTA translation elsewhere.
- Normal interaction duration: approximately 200–500ms; ambient homepage loops run over 5.5–24 seconds.
- No parallax, scroll-jacking, autonomous floating objects or entrance delay.
- `prefers-reduced-motion: reduce` shortens transitions/animations to effectively instant.

## Breakpoints

| Breakpoint | Behavior |
|---|---|
| Above 1000px | Full navigation; layered homepage signal stage; two-column detail heroes; four-column process/scope |
| 701–1000px | Mobile navigation; tightened signal stage; stacked detail heroes; two-column process/journey/scope |
| 700px and below | 16px edges; mobile signal stack; full-width CTAs; simplified grids |

Quality was explicitly checked at 320, 375, 390, 430, 768 and 1440px.

## Accessibility Rules

- Target WCAG 2.2 AA contrast for text and controls.
- One H1 per page and logical H2/H3 hierarchy.
- Semantic `header`, `nav`, `main`, `section`, `ol`, `dl`, `figure`, `details` and `footer` elements.
- Links navigate; buttons toggle UI.
- All meaningful images have contextual alt text.
- Decorative icons use `aria-hidden`.
- Navigation toggle exposes `aria-expanded` and `aria-controls`.
- Skip link and visible focus treatment are mandatory.
- Touch controls are at least 44px.
- Reduced-motion preferences are respected.
- Do not communicate results, state or meaning by colour alone.
- Video remains user-controlled; no forced autoplay was introduced for YouTube media.

## Performance Rules

- Keep page structure server-rendered.
- Limit client JS to route-aware chrome and existing video behavior.
- Use `next/image`, responsive sizes and reserved aspect ratios.
- Only above-the-fold hero images receive priority loading.
- Lazy-load YouTube embeds and below-fold images.
- Do not add animation libraries for effects already achievable with CSS.
- Avoid background video until an approved, compressed showreel and performance budget exist.
- Preserve the existing three-font subset used by the prototype; a future site-wide rollout should remove unused global font families from the root layout.

## Content and Component Governance

- A component enters the global system only after it is used and validated on a prototype page.
- New case fields must distinguish verified facts from editorial inference.
- Metrics require a source and approval.
- Service operational claims require product-owner confirmation.
- Prototype route isolation must be removed only as part of an approved, tested migration—not by expanding the path set casually.
