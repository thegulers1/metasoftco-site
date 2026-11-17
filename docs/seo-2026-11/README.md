# 17 Kasım 2026 — toplu yayın hazırlığı

Kullanıcı tercihi: kiralama fiyatı/rakam/aralık eklenmeyecek. Tüm değişiklikler hazırlandıktan sonra birlikte yayınlanacak. Bu turda canlı veritabanına yazılmadı ve deploy yapılmadı. Önceki turda tekstil TR/EN içeriği güncellendi; yedeği `tmp/brand-positioning/` altında.

## Hazır değişiklikler

- Kodda: TR/EN sektörel bölüm başlıkları, menü, ana sayfanın yazılım bölümü, Hakkımızda, Organization uzmanlık alanları, llms.txt ve sunum dili etkinlik teknolojisi odağında düzenlendi.
- Kiralama ortak SSS: fiyat vermeden teklif için gereken tarih, mekân, süre, katılımcı ve tasarım bilgileri eklendi. Mevcut kurulum, personel ve baskı bilgileri korundu.
- Sitemap: değişen kod sayfalarının tarihleri güncellendi.
- Veritabanı için hazırlanan 5 kayıt `scripts/content/seo-2026-11/patches.json` içinde:
  1. Face swap blog TR/EN: etkinlik başlığı, kısa teknik anlatım, mevcut Akmerkez/TCMB/DeFacto örnekleri, operasyon ve teklif. Genel uygulama/deepfake karşılaştırmaları çıkarıldı. URL'ler korundu.
  2. Yazılım kategorisi TR/EN: etkinlik ve marka aktivasyonu odağında başlık, meta ve giriş; gerçek mobil/web hizmetleri korunuyor.
  3. Mirror Booth TR/EN: ürünü ve hizmet kapsamını doğrudan açıklayan tanım.
  4. Kalıcı mağaza sistemi: interaktif kiosk, dokunmatik terminal, donanım + yazılım birlikte teslim. Uzaktan yönetim paneli gibi doğrulanmamış özellik eklenmedi.
  5. İstanbul landing TR/EN: teklif için gereken bilgiler ve mevcut Akmerkez proje bağlantısı.

## Kontroller

- `pnpm build`: başarılı (Prisma generate, runtime DB doğrulaması, TypeScript ve Next üretim derlemesi).
- Değişen TS dosyaları için ESLint ve `git diff --check`: başarılı.
- İçerik paketi önizlemesi mevcut DB kayıtlarıyla uyuşuyor; canlı yazma yapılmadı.
- Yeni metinlerde sayısal kiralama fiyatı yok; SSS JSON alanları doğrulandı.
- Mevcut build uyarıları: Next middleware adlandırması ve eski Browserslist verisi. Derlemeyi engellemiyor.

## Yayın prosedürü (bu tur çalıştırılmadı)

1. İlgili kod diff'ini yayın kapsamına al. Çalışma ağacında önceden var olan AI Photo Kiosk satış sayfası/CSS ve görsel değişikliklerini bu işin değişiklikleriyle karıştırma.
2. Önizleme: `pnpm exec tsx scripts/seo-content-release-2026-11.ts`.
3. Birlikte yayın aşamasında: `pnpm exec tsx scripts/seo-content-release-2026-11.ts --apply` ve uygulama deploy'u. Script kontrol edilen alanlar arada değişmişse durur; yazmadan önce yedek alır; 5 kaydı transaction ile uygular. URL, yayın durumu ve kimlik alanlarını değiştirmez.
4. Geri alma: `pnpm exec tsx scripts/seo-content-release-2026-11.ts --rollback /absolute/path/to/backup.json`. Sonradan yapılan edit varsa üzerine yazmaz.
5. Blog sayfaları ISR (3600 saniye): deploy sonrası güncel başlık/HTML, FAQ schema, canonical ve TR/EN bağlantılarını doğrula.

## www teşhisi

Ham HTTP kanıtı: `canonical-audit.json`. İlk varsayılan aktarım denemesinde zaman aşımları görüldü; IPv4 + HTTP/1.1 tekrarında içerikler tamamlandı. İlk deneme `canonical-audit-initial.json` dosyasında saklı. Bu gözlem tek başına sunucu arızası veya bot engeli teşhisi değildir.

- Altı sayfa şablonunun www sürümü HTTP 200; canonical kendisine ve `https://www.metasoftco.com` alan adına gidiyor.
- Kontrol edilen HTTPS apex yanıtları 301 ile aynı www yoluna gidiyor. İngilizce blogun ikinci denemesi zaman aşımına uğradı; ilk denemede 301 doğrulandı.
- HTTP apex adresleri iki adım: `http://metasoftco.com/path → https://metasoftco.com/path → https://www.metasoftco.com/path`.
- Sorgu parametresi yönlendirmede korunuyor.
- Sitemap 245 URL içeriyor; hepsi HTTPS www. Kontrol edilen sayfalarda apex iç bağlantısı saptanmadı.
- `event.metasoftco.com/` hem HTML meta hem X-Robots-Tag üzerinde `noindex, nofollow` taşıyor. Tekrar noindex eklemek gerekmiyor.

Search Console, mevcut oturum üzerinden 17 Kasım 2026'da doğrudan incelendi:

| URL | Google sonucu | Son tarama | Google canonical |
|---|---|---|---|
| `https://metasoftco.com/` | Dizine eklenmedi: yönlendirmeli sayfa | 6 Kasım 2026 | `https://www.metasoftco.com/` |
| www'siz DeFacto proje sayfası | Dizine eklenmedi: yönlendirmeli sayfa | 30 Eylül 2026 | aynı projenin www sürümü |

| www’siz Reflex Game hizmet sayfası | Dizine eklenmedi: yönlendirmeli sayfa | 17 Kasım 2026 | aynı hizmetin www sürümü |

Bu üç örnek, rapordaki “iki sürüm de şu anda ayrı indeksli” yorumunu desteklemiyor. Eski Search Console performansında iki hostun görülmesi güncel indeks durumu değildir. Tarayıcı aracının tekrar eden uyarısının tam kök nedeni ancak uyarının adı, örnek URL'si ve tarama tarihiyle eşleştirilerek kesinleştirilebilir.

HTTP zincirini tek adıma indirmek ayrı bir temizliktir: Cloudflare/proxy katmanında apex host için yol ve sorguyu koruyan 301 doğrudan HTTPS www adresine uygulanmalı. Kodun mevcut HTTPS apex 301'i çalışıyor. Dış katmanda canlı değişiklik yapılmadı; yalnızca Next kuralını değiştirerek HTTP'deki ilk proxy yönlendirmesinin kalkacağı iddia edilmedi.

Google canonical kaynak: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

## Bu çalışmanın dışında kalanlar

Basın, dizin kayıtları ve LinkedIn paylaşımı dışarıya yayın gerektirir; yapılmadı. PDF katalog zaten sitedeki sunum akışı kapsamında ayrı bir içerik işi olarak değerlendirilebilir. Model hafızasında yer alma veya sıralama artışı garanti edilmez; yayın sonrası aynı sorularla tekrar ölçülmeli.
