# Full site and page inventory audit

Audit date: 14 August 2026. Inventory combines sitemap, internal links, source routes and locale alternates. The sitemap contained 95 URLs; 170 meaningful public routes were identified including the unsurfaced dedicated Istanbul route. Dynamic pages can return intermittent 500s under concurrency; `200*` below means “200 in normal sequential checks, but the route family is not reliable under load.”

## Field/code key

Each row records the requested fields in compressed form.

**Technical:** `I` indexable, `N` noindex, `C` self-canonical, `H3` tr/en/x-default, `H0` no hreflang. Canonicals/hreflang currently use the redirecting non-`www` host; therefore `C/H3` means structurally present but host-defective.  
**Depth/structure:** approximate rendered words include navigation/footer. `H2 n` is captured H2 count; rich-text H3 varies by record.  
**Template behavior:**

| Code | Internal links / CTA | Structured data | Image/alt | Shared UX/content issue |
|---|---|---|---|---|
| HOME | ~19 / Projects + “30 days” contact + AI/WhatsApp | global SoftwareApplication, Organization, LocalBusiness | ~60 images; 48 empty decorative/logo alts | no real activation above fold; mobile clipping; competing floating CTAs |
| HUB | 9–45 / generic Contact or AI CTA | global entities; some FAQ/Breadcrumb | typically 2–38; content alts generally present | proof and selection logic weak; multiple thin hubs |
| SVC | ~10–12 / Get a Quote + global CTAs | Service + Breadcrumb; optional FAQ/Video + global | 2–7; populated alt but often title-only | SEO title used as H1; narrow article layout; missing case/guest journey/operating facts |
| CASE | ~10 / generic AI/contact CTA | global; optional VideoObject; no consistent case graph/breadcrumb | 4–14, generally named | narrative not structured as challenge→idea→journey→result; mobile breadcrumb/title clipping |
| BLOG | ~9 / back-to-blog, no commercial contextual CTA | BlogPosting + Breadcrumb + global | usually 2 | weak service/case links; no visible editorial expertise module |
| INDUSTRY | ~9 / generic contact | FAQ + Breadcrumb + global | usually 2, weak real proof | formulaic 430–475 words; broad software intent dilutes experiential positioning |
| LEGAL | ~9 / none | inappropriate global entities | 2 logo/decorative | Turkish only; too brief for event image/AI/lead processing |

Priority: P0 critical, P1 high, P2 medium, P3 polish. Meta descriptions are present unless `missing` is stated; many are overlong and are flagged by group.

## Static and hub pages

| URL | Lang/type | HTTP/index/canonical/hreflang | Title / H1 / structure & depth | Intent / keyword | Template | Page-specific problems | P |
|---|---|---|---|---|---|---|---|
| `/` | TR home | 200* I C H3 | `MetasoftCo | Yapay Zeka Etkinlik & İnteraktif Aktivasyon Ajansı — İstanbul`; H1 `Markanı etkinliğin kahramanı yap.`; H2 3; ~620w | category/commercial; yapay zeka etkinlik, etkinlik teknolojileri | HOME | title/description long; H1 not categorical; claims need evidence | P1 |
| `/en` | EN home | 200* I C H3 | `Metasoftco: Interactive Event Tech & Software Solutions`; H1 `Make your brand the hero of the event.`; H2 3; ~700w | category/commercial; experiential/event technology | HOME | capitalization, broad software positioning, no native category/proof above fold | P1 |
| `/hizmetler` | TR services hub | 200* I C H3 | `İnteraktif Etkinlik Hizmetleri...`; H1 `Etkinliğinizi dönüştürecek interaktif deneyimler.`; H2 1; ~1,560w | service selection; interaktif etkinlik hizmetleri | HUB | 36-choice overload; title/description long; category hubs bypassed | P1 |
| `/en/services` | EN services hub | 200* I C H3 | `Interactive Event Services & Digital Activations`; H1 `Experiences that transform your event.`; H2 1; ~1,760w | commercial services | HUB | emits `/null`; Turkish category words; too many equal products | P0 |
| `/projeler` | TR work hub | 200* I C H3 | `Projeler | Yapay Zeka & İnteraktif Aktivasyon Referansları`; H1 `100+ marka, 1.000+ etkinlik.`; H2 1; ~560w | proof/cases | HUB | claim-led H1; cards lack result/idea; title long | P1 |
| `/en/projects` | EN work hub | 200* I C H3 | `Projects | MetasoftCo`; H1 `100+ brands, 1,000+ events.`; H2 1; ~600w | proof/cases | HUB | generic title; claim-led; details omitted from sitemap | P1 |
| `/blog` | TR blog hub | 200* I C H3 | `Blog`; H1 `Düşüncelerimiz, haberler ve rehberler.`; H2 8; ~380w | informational/thought leadership | HUB | generic title; isolated from services; card images missing/placeholder | P2 |
| `/en/blog` | EN blog hub | 200* I C H3 | `Blog | MetasoftCo`; H1 `Our thoughts, news and guides.`; H2 8; ~400w | informational | HUB | only one English article; cards can fall back to Turkish | P1 |
| `/hakkimizda` | TR About | 200* I C H3 | `Hakkımızda | MetasoftCo — İstanbul Dijital Deneyim...`; H1 `Teknolojiyi sahneye çıkaran ekip.`; H2 1; ~280w | entity/trust | HUB | too little team/process/operational proof; long title | P1 |
| `/en/hakkimizda` | EN About | 200* I C H3 | `About Us | MetasoftCo`; H1 `The team that brings technology to the stage.`; H2 1; ~350w | entity/trust | HUB | untranslated URL; no team/global delivery/data proof; absent sitemap | P1 |
| `/iletisim` | TR contact | 200* I C H3 | `İletişim`; H1 `Hadi konuşalım.`; H2 0; ~150w | lead/contact | HUB | generic form; no brief context/privacy expectation; mobile widget obstruction | P1 |
| `/en/contact` | EN contact | 200* I C H3 | `Contact | MetasoftCo`; H1 `Let's talk.`; H2 0; ~150w | lead/contact | HUB | no native legal/privacy path; insufficient scoping fields | P1 |
| `/isler` | TR duplicate work | 200 N C H0 | `İşler | MetasoftCo`; H1 `İşler`; H2 0; ~105w | duplicate/navigational | HUB | noindex but in sitemap; redundant with Projects | P1 |
| `/gizlilik` | TR legal | 200 I C H0 | `Gizlilik Politikası`; H1 same; H2 4; ~175w | legal/privacy | LEGAL | no EN; insufficient AI image/event lead detail | P1 |
| `/kullanim-kosullari` | TR legal | 200 I C H0 | `Kullanım Koşulları`; H1 same; H2 3; ~160w | legal | LEGAL | no EN; lint error; international contracting gaps | P2 |

## Service category inventory

| TR URL ↔ EN URL | Type/status | Title/H1/depth | Intent/primary keyword | Template | Issues | P |
|---|---|---|---|---|---|---|
| `/hizmetler/video` ↔ `/en/services/video` | HUB; 200* I C H3 | `Video Hizmetleri/Video Services`; H1 `Video/Video Activities`; ~175w | video booth/activation | HUB | thin; English “Activities”; EN metadata sometimes absent under load | P1 |
| `/hizmetler/sektorel-yazilim-cozumleri` ↔ `/en/services/industry-specific-software-solutions` | HUB; 200* I C H3 | `Sektörel/Industry-Specific Software`; H1 similar; ~150w | custom/industry software | HUB | competes with industry hub; no proof; ambiguous business line | P2 |
| `/hizmetler/yapay-zeka-etkinlik-cozumleri` ↔ `/en/services/ai-event-solutions` | HUB; 200* I C H3 | TR strong AI title/H1; EN H1 `Artificial intelligence`; ~700w TR | AI event activation | HUB+FAQ | both hubs had zero discovered inlinks; EN title/metadata intermittently absent | P1 |
| `/hizmetler/photobooth-ve-fotograf-aktivasyonlari` ↔ `/en/services/photobooth-and-photo-activations` | HUB; 200* I C H3 | photo/photobooth; EN H1 `Photography Activities`; ~650–800w | branded photo activation | HUB | English unnatural; choice overload; one null child | P0/P1 |
| `/hizmetler/interaktif-etkinlik-aktiviteleri` ↔ `/en/services/interactive-event-activities` | HUB; 200* I C H3 | interactive games/gamification; EN H1 `Interactive`; ~650w | interactive games | HUB | EN vague/metadata intermittent; bypassed category; mixed unrelated formats | P1 |
| `/hizmetler/interaktif-kurulumlar` ↔ `/en/services/interactive-installations` | HUB; 200* I C H3 | `Interactive Installations`; H2 1; ~137w | custom installations | HUB | both zero inlinks; default description; no projects/media evidence | P1 |
| `/hizmetler/vr-ar-deneyimleri` ↔ `/en/services/vr-ar-experiences` | HUB; 200* I C H3 | `VR & AR Experiences`; ~160w | VR/AR event experience | HUB | thin/default description; EN metadata intermittent; weak proof | P2 |
| `/hizmetler/hologram-immersive-deneyimler` ↔ `/en/services/hologram-immersive-experiences` | HUB; 200* I C H3 | `Hologram & Immersive Experiences`; ~143w | immersive/hologram | HUB | default copy, no child/case, intermittent EN metadata | P2 |
| `/hizmetler/noro-veri-deneyimleri` ↔ `/en/services/neuro-data-experiences` | HUB; 200* I C H3 | `Neuro & Data Experiences`; ~143w | neuro/data activation | HUB | unproved/ethical risk; default copy; intermittent EN metadata | P1 |

## Service detail inventory — AI

All rows use SVC behavior: ~300–500w, usually H2 4–6, 10–12 internal links, Get a Quote, Service/Breadcrumb schema plus optional Video; title-based alts are present. The shared defects are full SEO-title H1, weak guest journey/proof and untranslated FAQ/spec handling.

| TR URL ↔ EN URL | HTTP | Title/H1 (concise record) | Intent/keyword | Specific issues | P |
|---|---:|---|---|---|---|
| `.../ai-fashion-mirror-akilli-ayna` ↔ same EN slug | 200* | AI Fashion Mirror / smart fashion mirror rental | virtual try-on event, AI fashion activation | EN slug Turkish; EN description duplicates Turkish; title long | P1 |
| `.../ai-photo-child` ↔ same | 200* | AI PHOTO CHILD | child/family AI photo | child privacy/parental consent/moderation absent; generic name | P1 |
| `.../ai-bookmark` ↔ same | 200* | AI bookmark creation | AI branded takeaway | awkward EN title; weak commercial cluster; prove production capacity | P2 |
| `.../ai-draw-portre-cizim` ↔ `/en/.../ai-draw` | 200* | AI Draw real-time portrait | AI portrait activation | TR title long; EN title retains Yapay Zeka in sampled output | P1 |
| `.../ai-photobooth-kirala` ↔ `/en/.../ai-photobooth` | 200* | AI Photo Activation / AI Photo Booth | AI photo booth for events | strongest page; descriptions >190; needs data/throughput/case and native H1 | P1 |
| `.../ai-greenbox` ↔ same | 200* / load 500 observed | AI GREENBOX | AI green screen photo | short generic description; reliability failure reproduced in family | P1 |
| `.../ai-star-meetup` ↔ same | 200* | AI STAR MEETUP | celebrity/character photo concept | EN description duplicates TR; rights/brand safety not addressed | P2 |
| `.../ai-star-talk` ↔ same | 200* | AI STAR TALK | AI video/conversation concept | EN description duplicates TR; explain actual interaction and permissions | P2 |
| `.../ai-football-card` ↔ same | 200* | AI Football Card | personalized sports card | long TR title; EN description duplicated; proof via Akmerkez case | P1 |
| `.../ai-style` ↔ same | 200* / 9 of 30 failed under load | AI STYLE | AI style transformation | intermittent 500 reproduced; only one inlink; define distinction vs AI Photo | P0 |

## Service detail inventory — photo/video

| TR URL ↔ EN URL | HTTP | Title/H1 | Intent/keyword | Specific issues | P |
|---|---:|---|---|---|---|
| `/hizmetler/video/360-video-booth` ↔ `/en/services/video/360-video-booth` | 200* | 360 Video Booth rental | 360 video booth rental | generic; needs event setup/output/case | P2 |
| `/hizmetler/video/gif-video-booth` ↔ `/en/services/video/gif-video-booth` | 200* | GIF & Video Booth | video booth event | clarify differentiation/AI video; needs proof | P2 |
| `.../choose-your-background` ↔ `/en/.../null` | TR 200*, EN 404 | Choose Your Background | background photo activation | P0 null slug/link; TR no hreflang; 393-char description | P0 |
| `.../strip-photo` ↔ same EN slug | 200* | Strip Photo | strip photo booth | EN description duplicates Turkish; use Ray-Ban case | P1 |
| `.../cabin-photo` ↔ same | 200* | Cabin Photo | enclosed photo booth | EN description duplicates Turkish; link BUD case | P2 |
| `.../glow-box-photo` ↔ same | 200* | Glow Box Photo | glow box photo | needs physical footprint/output differentiation and AME case | P2 |
| `.../mirror-booth` ↔ same | 200* | Mirror Booth | mirror booth rental | commodity intent; show brand customization/proof | P2 |
| `.../collage-capture-photo` ↔ same | 200* | Collage Capture | collage photo activation | long title; render instability observed in concurrent pass | P2 |
| `.../magazine-cover` ↔ same | 200* | Magazine Cover Experience | magazine cover booth | 100+ char titles; keyword-stuffed visible H1 | P1 |
| `.../aura-photobooth-kiralama` ↔ `/en/.../aura-photobooth-rental` | 200* | Aura Photobooth | aura photo activation | 80+ char TR title; EN description has Turkish remnants; explain method carefully | P1 |
| `.../momento-ball` ↔ same | 200* | Momento Ball | branded physical photo object | distinctive; needs fabrication/throughput and DeFacto case | P1 |
| `.../photobooth-kirala` ↔ `/en/.../photobooth-rental` | 200* | Photobooth | photobooth rental | potential overlap with AI Photo/local pages; needs authoritative scope | P1 |
| `.../ar-photo` ↔ same | 200* | AR Photo | augmented reality photo | EN title retained Fotoğraf; prove actual AR and project | P2 |

## Service detail inventory — interactive/VR

| TR URL ↔ EN URL | HTTP | Title/H1 | Intent/keyword | Specific issues | P |
|---|---:|---|---|---|---|
| `.../dijital-hediye-carki-aktivasyonu` ↔ same EN slug | 200* | Digital Gift Wheel | digital prize wheel/event gamification | untranslated EN slug/title remnants; Pegasus is flagship proof | P1 |
| `.../cizim-robotu-kiralama` ↔ `/en/.../drawing-robot` | 200* | Drawing Robot | drawing robot rental | long title; define throughput/physical setup | P2 |
| `.../reflex-game-hiz-ve-rekabet-oyunu` ↔ `/en/.../interactive-reflex-game-for-events` | 200* | Reflex Game | reflex game event | extremely long EN title; overlap with Reflex Wall | P1 |
| `.../ai-graffiti-wall` ↔ same | 200* | AI Graffiti Wall | interactive graffiti wall | only one inlink; needs real installation proof | P2 |
| `.../charge-bike` ↔ same | 200* | Charge Bike | energy/sustainability game | explain measurement, safety and use case | P2 |
| `.../catch-collect-game` ↔ same | 200* | Catch & Collect | interactive event game | English title retained İnteraktif; generic copy | P2 |
| `.../interactive-puzzle` ↔ same | 200* | Interactive Puzzle | branded puzzle game | overlong description; needs objective/case | P2 |
| `.../geri-donusum-oyunu-recycle-win` ↔ same | 200* | Recycle & Win | sustainability gamification | EN Turkish slug/title; validate impact claims | P2 |
| `.../interaktif-hafiza-oyunu-kiralama` ↔ same | 200* | Memory Game | event memory game | 500+ char meta descriptions; Turkish EN slug; title/H1 duplication | P1 |
| `.../star-map` ↔ same | 200* | Star Map | event personalization | redirect config also sends `/star-map` home; clarify product/intent | P2 |
| `.../karaoke` ↔ same | 200* | Karaoke | event karaoke rental | weak fit with premium tech category unless custom/proven | P3/consolidate |
| `.../reflex-wall` ↔ same | 200* / load 500 observed | Reflex Wall | reflex wall rental | overlaps Reflex Game; concurrency 500 observed | P1 |
| `/hizmetler/vr-ar-deneyimleri/vr-beat-saber-kiralama` ↔ `/en/services/vr-ar-experiences/vr-beat-saber-rental` | 200* / load 500 observed | VR Beat Saber | VR rental event | third-party/IP naming risk; thin category and reliability | P1 |

## Project/case-study inventory

All CASE pages are normally 200/indexable with ~270–505 rendered words, H2 2–6 and 4–14 images. English details are not in sitemap. Several requests return empty metadata or 500 under load; the reliability issue applies to the whole family.

| TR URL ↔ EN URL | Title/H1 | Intent/proof role | Metadata/hreflang/content issue | P |
|---|---|---|---|---|
| `/projeler/bud-x-cabin-photo` ↔ `/en/projects/bud-x-cabin-photo` | BUD × Cabin Photo | cabin/photo proof | very long descriptions; TR/EN titles duplicated; missing structured challenge/results | P2 |
| `/projeler/garanti-bbva-genc-x-kulupler-bulusmasi` ↔ `/en/projects/garanti-bbva-genc-x-clubs-meeting` | Garanti BBVA Genç × Clubs | institutional/multi-community proof | metadata intermittently missing; needs exact activation/results | P2 |
| `/projeler/pegasus-hava-yollari-x-dijital-hediye-carki-aktivasyonu` ↔ `/en/projects/pegasus-airlines-digital-gift-wheel-activation` | Pegasus × Digital Gift Wheel | gamification flagship | overlong description; EN detail sitemap omission; collect verified engagement facts | P1 |
| `/projeler/ray-ban-x-strip-photo` ↔ `/en/projects/ray-ban-x-strip-photo` | Ray-Ban × Strip Photo | premium photo proof | metadata intermittently absent; thin challenge/result | P1 |
| `/projeler/corny-x-photobooth` ↔ same EN slug | Corny × Photobooth | standard photo proof | duplicate TR/EN title; English fallback risk; lacks differentiation | P2 |
| `/projeler/adidas-evo-sl-x-ai-try-on-photo` ↔ same EN slug | Adidas EVO SL × AI Try-On | fashion/product-launch flagship | 300+ char EN meta; metadata sometimes absent; needs verified tech/result | P1 |
| `/projeler/rollic-summer-party-x-seri-t-foto` | TR only | corporate-event strip photo | no EN pair/hreflang; metadata instability; collect objective/facts | P2 |
| `/projeler/tavuk-dunyasi-x-ai-photo` ↔ same EN slug | Tavuk Dünyası × AI Photo | AI photo flagship | metadata instability; needs idea/guest flow/results | P1 |
| `/projeler/defacto-x-momento-ball-photo` ↔ same EN slug | DeFacto × Momento Ball | physical output flagship | descriptions long; metadata instability; collect fabrication facts | P1 |
| `/projeler/bsh-x-ai-draw` ↔ same EN slug | BSH × AI Draw | AI Draw flagship | metadata instability; needs objective/throughput/results | P1 |
| `/projeler/defacto-x-afra-saracoglu-ai-fashion-experience` ↔ same EN slug | DeFacto × Afra AI Fashion | fashion/celebrity flagship | load 500 observed; metadata intermittent; rights/credit/results need clarity | P0/P1 |
| `/projeler/akbank-odtu-bogazici-x-fotograf-aktiviteleri` ↔ `/en/projects/akbank-odu-bogazici-universty-x-photobooth-activity` | Akbank universities × Photo | multi-location proof | English slug misspelled; metadata unstable; collect location/scale | P1 |
| `/projeler/akmerkez-x-ai-football-card` ↔ same EN slug | Akmerkez × AI Football Card | retail/sports proof | duplicate title/fallback risk; lacks result | P2 |
| `/projeler/ame28-x-glow-box` ↔ same EN slug | AME’28 × Glow Box | physical installation proof | metadata intermittent; client/event context unclear | P2 |
| `/projeler/allianz-x-ai-greenbox` ↔ same EN slug | Allianz × AI Greenbox | enterprise AI proof | metadata instability; add data/brand-safety/operating facts | P1 |
| `/projeler/nesquik-x-ai-photo-child` ↔ same EN slug | Nesquik × AI Photo Child | child/family AI proof | 11/30 EN requests failed in load test; consent/moderation facts essential | P0/P1 |

## Blog/article inventory

| TR URL ↔ EN URL | Status/title/H1/depth | Intent/keyword | Template | Issues | P |
|---|---|---|---|---|---|
| `/blog/stable-diffusion-etkinlik-yuz-donusumu-teknik-analiz` ↔ `/en/blog/stable-diffusion-event-face-transformation-technical-analysis` | 200*; long titles; TR two H1; ~600w | technical thought leadership / Stable Diffusion event | BLOG | “400” vs “500” inconsistency; second H1; no service/case CTA; EN absent sitemap | P1 |
| `/blog/metasoftco-nedir-interaktif-etkinlik-teknolojileri` | TR 200 I C H0; ~350w | brand/entity | BLOG | overlaps About/home; no EN; consolidate strongest facts | P2 |
| `/blog/yapay-zeka-yuz-degistirme-face-swap-nasil-calisir` | TR 200 I C H0; ~415w | informational face swap | BLOG | needs safety/consent/source/related case | P2 |
| `/blog/etkinliklerde-ai-photobooth-avantajlari` | TR 200 I C H0; ~390w | commercial support AI photobooth | BLOG | title/description long; generic benefits; link AI Photo/case | P1 |
| `/blog/etkinliklerde-interaktif-deneyim-alanlari` | TR 200 I C H0; ~650w | event activation ideas | BLOG | one H2 despite depth; add planning matrix/cases | P2 |
| `/blog/kurumsal-etkinliklerde-gamification` | TR 200 I C H0; ~400w | corporate gamification | BLOG | add objective/game matrix, evidence and service links | P2 |
| `/blog/marka-aktivasyonu-icin-dijital-deneyimler-2025` | TR 200 I C H0; ~400w | brand activation trends | BLOG | outdated year; refresh/redirect; case support | P2 |
| `/blog/2026-etkinlik-trendleri-interaktif-teknolojiler` | TR 200 I C H0; ~425w | trends/informational | BLOG | update annually only with evidence; 15 internal links but weak commercial path | P2 |

## Industry/software pages

All paired static INDUSTRY details are 200* indexable/self-canonical with reciprocal hreflang, ~430–475 rendered words, H2 6, FAQ/Breadcrumb schema, ~9 internal links and only two site/decorative images. Their shared problem is formulaic, low-evidence content and unclear fit with the core experiential business.

| TR URL ↔ EN URL | Title/H1 | Intent | Specific issue | P |
|---|---|---|---|---|
| `/sektorel-yazilim-cozumleri` ↔ `/en/industry-software-solutions` | industry software/digital transformation hub | broad B2B software | duplicate competing English service hub; thin ~170w | P1 strategy |
| `.../tekstil-sektoru-dijital-donusum` ↔ `/en/.../textile-fashion` | textile digital transformation | vertical software | title/description long; should focus on fashion/retail activation only if proven | P2 |
| `.../saglik-sektoru` ↔ `/en/.../healthcare` | healthcare event/software | vertical | regulated-industry credibility/security evidence absent | P2/noindex review |
| `.../gida-sektoru` ↔ `/en/.../food-beverage` | food brand activation/event tech | commercial activation | strongest fit if supported by Tavuk/Nesquik/Corny cases | P2 |
| `.../otomotiv-sektoru` ↔ `/en/.../automotive` | automotive interactive activation | vertical | no visible automotive case; formulaic | P2/noindex review |
| `.../perakende-sektoru` ↔ `/en/.../retail-ecommerce` | retail digital experience | solution | reframe around retail/in-store with DeFacto/Akmerkez proof | P1 opportunity |
| `.../finans-sektoru` ↔ `/en/.../finance-insurance` | finance corporate events/software | vertical | broad regulated software claim; use Akbank/Allianz cases or consolidate | P2 |
| `.../kurumsal-etkinlik` ↔ `/en/.../corporate-events` | corporate event technology | high commercial solution | keep/rebuild as use-case, remove generic software language | P1 |
| `.../teknoloji-sektoru` ↔ `/en/.../technology-saas` | tech-company activation/software | vertical | no visible proof; title long; distinguish corporate events | P2 |

## DB-driven sector/local pages

| TR URL ↔ EN URL | HTTP/index/metadata | Intent | Template | Issues | P |
|---|---|---|---|---|---|
| `/sektorel-cozumler` ↔ `/en/sector-solutions` | 200* I C H3 | industry solutions hub | HUB, ~180w | thin, vague “Sector Software Solutions”; should become buyer use-case hub | P1 |
| `/sektorel-cozumler/test` ↔ `/en/sector-solutions/test` | TR 200 I C H0; EN 404 | none | weak sector | public test, title `test`, no H1, sitemap entry/internal link | P0 |
| `/sektorel-cozumler/istanbul-ai-photobooth` ↔ `/en/sector-solutions/istanbul-ai-photobooth` | TR 200 I C H0; EN 404 | local AI photobooth | sector/local | duplicate local intent; broken alternate; location doorway risk | P0/P1 |
| `/hizmetler/istanbul-ai-photobooth` | TR 200*; not sitemap/internally surfaced | local AI photobooth | custom CityLanding | duplicate route implementation; choose one canonical local page or retire | P1 |

## Duplicate/thin/orphan summary

- Duplicate intent: two Istanbul AI Photo routes; two English industry-software hubs; `/isler` vs `/projeler`; AI Photo versus standard/local photobooth must be differentiated.
- Thin hubs: interactive installations, hologram, neuro/data, VR/AR, sector hubs and software service hub.
- Zero discovered inlinks: AI event hub TR/EN, interactive activities EN, interactive installations TR/EN.
- Many services/projects have only one discovered inlink from their listing.
- English detail pages are largely orphaned from XML discovery even when linked from hubs.
- No pagination issue was found; current inventories are rendered as single listings.
- No query-parameter duplication was found; UTM URLs self-canonicalize, subject to the host correction.

## Page-level action order

1. P0 reliability, null/test/broken links and final-host declarations.
2. Home, Services, Projects, Contact and top five cases.
3. AI Event, AI Photo, Fashion, Games and Photo/Video hubs.
4. Native English parity and legal/data content.
5. Consolidation/noindex decisions for thin formats and broad software/industry pages.
6. Blog updates and solution pages after commercial core is stable.

See `06-content-and-case-studies.md` for project/service content requirements and `03-keyword-strategy.md` for target intent and consolidation.
