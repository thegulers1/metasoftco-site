# Devir Paketi: MetasoftCo Projeler Sayfası (Yeniden Tasarım)

## Genel Bakış
MetasoftCo'nun **Projeler / Referanslar** sayfasının yeniden tasarımı. Ana sayfayla aynı "Plazma" dilinde (koyu tema + aurora hareketi): Hero başlık → Kategori filtresi → Proje grid → İletişim CTA → Footer. Filtre **çalışır durumda** (Tümü / Yapay Zeka / Photobooth / İnteraktif Etkinlik).

## Tasarım Dosyaları Hakkında
Buradaki dosyalar **HTML ile yapılmış tasarım referanslarıdır** — amaçlanan görünümü/davranışı gösteren prototip, doğrudan prodüksiyon kodu değil. Görev: bu tasarımı **mevcut kod tabanının ortamında** (MetasoftCo zaten Next.js kullanıyor) projenin yerleşik bileşen/stil kalıplarıyla yeniden inşa etmek. HTML'i olduğu gibi taşıma; tasarımı kendi stack'inde yeniden kur.

> `MetasoftCo Projeler.dc.html` özel bir streaming runtime (`support.js`) ile çalışır. Veri + filtre mantığı `<script data-dc-script>` içindeki `class Component`'tedir; düzen ise `<x-dc>` şablonudur. Tarayıcıda açıp referans olarak incele.

## Fidelity: Hi-fi (pixel-perfect)
Renkler, tipografi, boşluklar ve etkileşimler nihaidir. Token'lar kesindir.

---

## Tasarım Token'ları
Ana sayfa paketiyle **birebir aynı sistem**. Özet:

### Renkler
| Rol | Değer |
|---|---|
| Sayfa arka planı | `#0a0a0f` |
| CTA panel arka planı | `#0d0d16` |
| Kart yüzeyi | `linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))` |
| Görsel placeholder dokusu | `repeating-linear-gradient(135deg,#14141d,#14141d 11px,#1a1a25 11px,#1a1a25 22px)` |
| Metin birincil / ikincil / silik | `#fff` / `rgba(255,255,255,.55–.72)` / `rgba(255,255,255,.32–.5)` |
| Kenarlık | `rgba(255,255,255,.08–.1)` (hover `.32`) |
| **Vurgu (--acc) varsayılan** | `#22d3ee` (alternatifler: `#c6f032`, `#e879f9`, `#a78bfa`) |
| Kart başına vurgu rengi | proje verisindeki `c1` (mor/cyan/mor/turuncu/yeşil/magenta/sarı/pembe) — metrik satırı ve kart parıltısında kullanılır |

### Tipografi
- **Space Grotesk** (600/700) — başlık & display, `letter-spacing -0.01..-0.02em`
- **Manrope** (400–700) — gövde/UI/buton
- **JetBrains Mono** (500) — eyebrow, kategori çipi, metrik, teknik metin (UPPERCASE, `letter-spacing .04–.14em`)

| Öğe | Stil |
|---|---|
| Hero H1 | Space Grotesk 700, `76px / 0.98`, `-0.02em` (2. satır shimmer gradient) |
| Hero alt metin | Manrope 400, `19px / 1.55`, `rgba(255,255,255,.64)` |
| Kart başlığı | Space Grotesk 600, `19px / 1.2` |
| Kart açıklaması | Manrope 400, `13.5px / 1.55`, `rgba(255,255,255,.55)` |
| Kart metrik satırı | JetBrains Mono 500, `12px`, kartın `c1` renginde |
| Kategori çipi (görsel üstü) | JetBrains Mono 500, `11px`, `.04em`, koyu cam pill `rgba(10,10,15,.62)` + `backdrop-filter:blur(4px)` |
| Filtre çipi | Manrope 600, `13px`, pill `100px` |
| CTA başlığı | Space Grotesk 700, `52px / 1.05` |

### Boşluk & Düzen
- Kapsayıcı `max-width:1240px; padding:0 48px`.
- Proje grid: `repeat(3,1fr)`, gap `20px`. Kart kapağı `210px`, `object-fit:cover`.
- Filtre barı üstte ince kenarlık (`rgba(255,255,255,.08)`), sağda `N PROJE` sayacı (mono).
- Köşe yarıçapı: kart `20px`, CTA panel `28px`, pill/çip `100px`.

### Hareket / Animasyon (ana sayfayla aynı)
- `drift`/`drift2`/`drift3` aurora blobları (hero + CTA), `17s`/`21s`/`24s ease-in-out infinite`, `blur 46–52px`.
- Hero'da imleç takipli beyaz glow (`--mx/--my`, `mix-blend-mode:screen`).
- Hero H1 2. satır shimmer gradient (`shimmer 6s linear infinite`).
- Kart hover: `translateY(-12px)` + kenarlık parlaması, `transition .4s cubic-bezier(.2,.8,.2,1)`.
- Canlı badge pulse (`2s infinite`).

**Mouse-glow JS** (hero `onMouseMove`):
```js
const rect = el.getBoundingClientRect();
const sx = rect.width / el.offsetWidth || 1;
const sy = rect.height / el.offsetHeight || 1;
el.style.setProperty('--mx', ((e.clientX - rect.left) / sx) + 'px');
el.style.setProperty('--my', ((e.clientY - rect.top) / sy) + 'px');
```

---

## Bölümler (yukarıdan aşağıya)

### 1. Navigasyon (Hero içinde)
Logo `METASOFT`+`CO` (CO accent) · linkler `Anasayfa · Projeler (aktif, beyaz) · Hizmetler · Hakkımızda · İletişim` · sağda `TR / EN` + beyaz `İletişime Geç` pill.

### 2. Hero başlık
- 3 aurora blobu + imleç glow + koyulaştıran dikey overlay (`linear-gradient(180deg, rgba(10,10,15,.1), rgba(10,10,15,.84))`).
- Badge: pulse nokta + mono `SEÇİLMİŞ REFERANSLAR · 2021 — 2026`.
- H1: `100+ marka,` / `1.000+ etkinlik.` (2. satır shimmer gradient).
- Alt metin: "Her proje farklı bir brief'ten, aynı hedefle çıktı: katılımcı etkinlik bittikten sonra da konuşsun..."

### 3. Filtre barı
Üstte ince kenarlık. Sol: 4 çip — **Tümü** (aktif: beyaz dolgu/koyu metin), Yapay Zeka, Photobooth, İnteraktif Etkinlik (pasif: `rgba(255,255,255,.04)` dolgu, `.14` kenarlık). Sağ: `N PROJE` mono sayaç. Çipe tıklayınca grid o kategoriye filtrelenir, sayaç güncellenir.

### 4. Proje grid (8 proje, `repeat(3,1fr)`)
Her kart: üstte **210px kapak görseli** (gerçekte `<img>`; referansta sürükle-bırak slot) + üstüne `c1` renginde hafif radial parıltı, sol-üstte **kategori çipi** (cam pill). Altta: başlık + accent ok (`→`) + açıklama + üst kenarlıklı **metrik satırı** (kartın `c1` renginde, mono). Hover'da kart yükselir.

**Projeler ve kategorileri:**
| # | Başlık | Kategori (görsel etiketi) | Filtre grubu | Açıklama | Metrik | c1 |
|---|---|---|---|---|---|---|
| 1 | DeFacto × Afra Saraçoğlu | YAPAY ZEKA | Yapay Zeka | LoRA fine-tune modelle Afra Saraçoğlu koleksiyonu saniyeler içinde üzerlerinde | Reklam ₺0 · organik erişim ∞ | `#7c3aed` |
| 2 | Adidas EVO SL × AI Try-On | YAPAY ZEKA | Yapay Zeka | Tek fotoğraf karesiyle tüm koleksiyon dijital olarak üzerlerinde | Virtual Try-On · canlı lansman | `#22d3ee` |
| 3 | Tavuk Dünyası × AI Photo | YAPAY ZEKA | Yapay Zeka | Yapay zeka destekli yüz değiştirme + fotoğraf deneyimi | AI Face Swap | `#a78bfa` |
| 4 | Pegasus × Dijital Hediye Çarkı | İNTERAKTİF ETKİNLİK | İnteraktif Etkinlik | Markaya özel UI/UX + ağırlıklı algoritma, kişiselleştirilmiş ödül | Sıfır kesinti · %94 tamamlama | `#fb923c` |
| 5 | Akbank ODTÜ & Boğaziçi | FOTOĞRAF AKTİVİTELERİ | Photobooth | İki kampüs, iki şehir, aynı gün; QR + baskı çıktı | Z kuşağında rekor etkileşim | `#4ade80` |
| 6 | DeFacto × Momento Ball | PHOTOBOOTH | Photobooth | Anı, şeffaf dairesel DeFacto hatırasına dönüşür | Fiziksel hatıra · mağaza & etkinlik | `#e879f9` |
| 7 | BUD × Cabin Photo | PHOTOBOOTH | Photobooth | Life Park'ta 2 gün, "Eğlence Kutusu" kabini | Yüksek kalite baskı + dijital anı | `#facc15` |
| 8 | Garanti BBVA Genç × Kulüpler | PHOTOBOOTH | Photobooth | Genç Kulüpler Buluşması, en hızlı hatıralar | Anlık hatıra · kampüs etkinliği | `#f472b6` |

> Filtre grupları: **Yapay Zeka** (1,2,3) · **Photobooth** (5,6,7,8) · **İnteraktif Etkinlik** (4). "Tümü" = 8 proje.
> Her kart kendi detay sayfasına linklenir: `/projeler/<slug>` (mevcut sitedeki slug'lar korunur).

### 5. İletişim CTA
Ortalanmış panel (`#0d0d16`, radius 28, içinde 2 aurora blob). Eyebrow `FİKİRDEN SAHNEYE EN HIZLI YOL` + başlık `Etkinliğiniz 30 gün içinde mi?` (52px) + açıklama + 2 buton: beyaz `Bugün Konuşalım →`, outline `WhatsApp`.

### 6. Footer
Ana sayfayla birebir aynı: sol logo + ajans açıklaması; sağ 3 kolon (SAYFALAR / İLETİŞİM / SOSYAL); altta teknolojiler mono satırı + telif + Şartlar/Gizlilik.

---

## Etkileşim & Durum
- **Filtre state'i**: `active` (varsayılan `'Tümü'`). Çipe tıklayınca `setState`, grid `group` alanına göre filtrelenir, sayaç yenilenir.
- `--mx/--my` imleç pozisyonu (sadece görsel).
- `accentColor` props (4 ön ayar) — tema vurgusu.
- Veri dizisi `projects` — gerçek uygulamada CMS/DB'den gelir; her projenin `slug`, `cover`, `cat`, `title`, `desc`, `metric` alanları olmalı.

## Varlıklar
- Kapak görselleri **placeholder** — gerçek proje fotoğraflarıyla `<img>` olarak değiştir.
- Fontlar Google Fonts: Space Grotesk, Manrope, JetBrains Mono.
- İkon yok (ok `→` Unicode); istersen kod tabanının ikon setini kullan.
- Responsive: masaüstü (≈1240px) için. Mobilde grid tek kolona, hero H1 `clamp(40px,9vw,76px)`, filtre barı yatay kaydırılabilir, nav hamburger.

## Dosyalar
- `MetasoftCo Projeler.dc.html` — tam tasarım referansı (düzen + filtre mantığı + veri).
- `image-slot.js` — referanstaki sürükle-bırak kapak placeholder'ı (sadece prototip; üretimde `<img>`/CMS).
- `support.js` — referans runtime (üretime taşınmaz).
- `MetasoftCo-Projeler-full.png` — tam sayfa görseli.

> Referansı görmek için `MetasoftCo Projeler.dc.html`'i tarayıcıda aç. Birebir aktarım için yukarıdaki token + bölüm + proje tablosunu kullan.
