# Hizmet mimarisi kontrolü — 23 Kasım 2026

Bu turdaki kod değişiklikleri yereldir. Canlı yayın, canlı içerik kaydı, DNS veya alt alan adı yapılandırması değiştirilmedi. İnceleme ve testler mevcut içeriği yalnızca okur.

## İstenen sırayla durum

1. **Hub bağlantıları:** `/hizmetler` ve `/en/services` içine yayımlanmış hizmet içeren beş kategoriye görünür HTML bağlantıları eklendi. Boş/taslak kategoriler bağlanmıyor. Mevcut katalog filtreleri korunuyor. Popüler kiralama hizmetlerine doğrudan bağlantılar da görünür hale getirildi.
2. **Uzaktan yönetim:** `/hizmetler/magaza-ici-kalici-photobooth` içinde önceki çalışmadan mevcut. Erişim, internet ve destek koşullarının projede belirlendiği metin korundu; yeni bir özellik veya hizmet garantisi eklenmedi.
3. **AI Greenbox başlığı:** `AI Greenbox Kiralama | Yapay Zekâ Fotoğraf Aktivasyonu` zaten uygulanmış; tekrar değiştirilmedi.
4. **Alt alan adları:** Mevcut yapıyı koruma önerisi. `event` ana sayfasında meta ve HTTP noindex var. `ota`, `api-event` ve `realtime` kök yanıtlarında HTTP noindex; `ai-image` giriş koruması (401); `exotic` servisinde 503 gözlendi. Bu kök/robots kontrolleri bütün alt yolların denetimi veya Google indeks durumu değildir. Ana siteye zarar gördüğü sonucu çıkarılmadı. `exotic` ayrı uygulama erişimi sorunu; kapatılmadı/taşınmadı. Ana sitenin robots dosyasını değiştirmek diğer hostlara kural uygulamaz.
5. **Schema:** Yayımlanmış 50 TR hizmet detayında tekil `Service`, satış ürününde `Product` zaten mevcut. Ortak şablon baştan yazılmadı. Kiralama sayfalarına sırf ürün adı geçtiği için satış şeması veya sahte fiyat eklenmedi. Alan adı, isim, açıklama, sağlayıcı ve satış teklifinin varlığı HTTP çıktıları üzerinden test edildi. Bu test resmi Rich Results doğrulaması değildir; Service için ürün zengin sonucu sözü verilmez.
6. **Giyilebilir teknoloji:** Kullanıcı henüz hizmet olmadığını belirtti; satış/kiralama sayfası açılmadı. Search Console, 24 Ekim–20 Kasım 2026 sorgu/sayfa satırlarında `giyilebilir teknoloji kiralama` için 41 gösterim ve sıfır tıklama gösteriyor: 37 mevcut kiralama/satın alma blogunda, 3 eski ürün kişiselleştirme URL'sinde, 1 hizmetler sayfasında. Bunlar site gösterimleridir, pazarın arama hacmi değildir; anonim sorgular raporda yer almayabilir. Bounded SERP örneğinde genel cihaz kiralama ve akıllı gözlük teklifleri görülüyor. Öneri: önce etkinlikte sunulabilecek somut deneyim, tedarik ve destek kapsamı belirlenmeli; yalnız bu kelime için var olmayan hizmet sunulmamalı. Ray-Ban × Strip Photo projesi akıllı gözlük kiralama kanıtı sayılmadı.
7. **PDF katalog:** Mevcut `/sunum` akışı korunuyor. `/urunler` erişimi zaten vardı; `/hizmetler` içine de PDF sunum bağlantısı eklendi. Seçmeli ve tam PDF indirildi; tam katalog 61 sayfa, yaklaşık 24,5 MB. Kapak ve örnek sayfalar görsel olarak kontrol edildi. Mevcut PDF kodu değiştirilmedi.
8. **Yazılım projeleri:** Become Hacker, ZekAI, MysticSip ve Enerjisa Quiz sayfalarına mevcut vaka içeriğine dayanan ihtiyaç/çözüm/çıktı çerçevesi eklendi. Yayımlanmış ilgili yazılım hizmetlerine bağlantılar veriliyor. CMS'de elle seçilen hizmet varsa o seçim öncelikli; taslak hizmetler gösterilmiyor. Üç mobil uygulamada yayıncı partner hesabı açıklaması korunuyor. Satış/gelir/kullanıcı artışı uydurulmadı. Yeni çerçeve TR sayfalarında; EN içerikler değiştirilmedi.
9. **Mirror Booth pilotu:** Mevcut URL, title, açıklama ve SSS korunuyor. Mevcut yayımlanmış bilgilerden 4 m², saatte 60–80 kişi ve pakette 750 baskı hızlı bilgileri eklendi (CMS teknik bilgisi varsa öncelikli). Klasik photobooth ve AI Fashion Mirror farkı, ilgili ürünler ve rakamsız teklif rehberine bağlantılar eklendi. Yeni kopya ürün URL'si açılmadı. Google URL Inspection 23 Kasım kontrolünde sayfa indeksli, canonical kendisi, tarama başarılı; bildirilen son tarama 9 Eylül 2026. Kullanıcının paylaştığı 131 gösterim/44. sıra, dönemi verilmediği için güncel başlangıç ölçümü sayılmadı. Yayın ve yeniden tarama sonrasında aynı URL/sorgu ve karşılaştırılabilir dönem izlenmeli; iyileşme sonucu henüz ölçülmedi.

Koddan değişen hizmet hub'ı, Mirror Booth ve dört TR proje için sitemap güncelleme tarihleri 23 Kasım'a yükseltildi. URL veya canonical değişmedi.

## Kontroller

- `pnpm build`: Prisma, runtime DB kontrolü, TypeScript ve üretim derlemesi başarılı.
- Hedefli ESLint ve `git diff --check`: başarılı.
- `ROUTE_CHECK_BASE_URL=http://localhost:3002 pnpm test:routes`: 258 sitemap URL'si HTTP 200 ve doğru canonical.
- `scripts/check-service-architecture.ts`: beş kategori, 50 Service, bir Product, mevcut başlık/metin/PDF bağlantısı, dört yazılım projesi ve Mirror Booth pilotu kontrol edildi.
- `scripts/check-local-seo-release.ts`: önceki SEO/sunum erişim kontrolleri, seçmeli PDF ve geçersiz seçime 400 başarılı.
- 390 ve 1440 px: hub, Mirror Booth ve yazılım proje sayfası yatay taşma olmadan açıldı.
- Geliştirme sunucusundaki bir ara koşuda karaoke URL'si 500 verdi; doğrudan tekrarında 200, üretim derlemesinde hem detaylı mimari testi hem 258 rota kontrolü geçti. Bu gözlem için doğrulanmamış kök neden yazılmadı.
- Mevcut Next middleware/edge ve eski Browserslist uyarıları devam ediyor; bu turun derlemesini engellemiyor.

## Referanslar

- [Service tanımı](https://schema.org/Service)
- [Google Product yapılandırılmış veri kapsamı](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Etkinlik için akıllı gözlük kiralama teklifi örneği](https://etkinlikbilgisayar.com/urunler/ray-ban-meta-gozluk-kiralama)
- [Genel akıllı gözlük kiralama örneği](https://www.castapos.com/marka/ray-ban)

SERP örnekleri kapsamlı pazar veya talep büyüklüğü araştırması değildir. Kimlik bilgileri ve erişim anahtarları bu nota eklenmedi.
