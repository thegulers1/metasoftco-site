# Yerel SEO ve sunum erişimi düzenlemeleri

Canlı dağıtım veya canlı veritabanı yazımı yapılmadı. Alt alan adı, DNS, proxy ve sunucu yapılandırmaları değişmedi. Testler mevcut veritabanına yalnız okuma yapar.

- `/urunler`: `/sunum` için görünür seçim/PDF bağlantısı eklendi. `/sunum`, yazdırma sayfası, PDF API ve sunum veri/istemci kodu değişmedi.
- `/hizmetler/photobooth-kiralama-fiyatlari`: rakamsız teklif rehberi; kapsam, karşılaştırma, SSS ve mevcut iletişim formuna ürün parametresi. Fiyat tablosu, fiyat aralığı veya para tutarı yok. Sitemap/llms, ürünler ve gerçek photobooth kiralama sayfasından bağlantılar eklendi.
- İki orphan sayfa adı kullanıcı tarafından verilmedi. Kaynak taramasında katalog bağlantısı olmayan `/hizmetler/kurumsal-etkinlik-teknolojisi` ve `/hizmetler/fuar-aktivasyonlari` aday kabul edildi. Bu sayfalar sitemap'te zaten vardı; kayıtlar çoğaltılmadı, güncelleme tarihleri yenilendi, `/hizmetler` içine bağlamsal kartlar eklendi. Kullanıcı farklı URL verirse kapsam yeniden eşleştirilmeli.
- Greenbox TR SEO başlığı kaynak kodda `AI Greenbox Kiralama | Yapay Zekâ Fotoğraf Aktivasyonu` olarak sabitlendi. Mevcut DB değeri de zaten bu başlıktı; canlı kayıt değiştirilmedi.
- Mağaza içi kalıcı photobooth: uzaktan içerik ve kampanya güncellemesi, erişim ve destek kapsamını projede netleştiren görünür bölüm eklendi. Donanım özellikleri veya sürekli destek garantisi uydurulmadı.
- Kurumsal/fuar/kalıcı kurulum ve şehir TR/EN hizmet açılışlarına Service JSON-LD eklendi. Mevcut editör şeması Service içeriyorsa ek üretilmez; object, array, @graph ve @type dizisi desteklenir. Standart hizmet detaylarında mevcut Service şeması korundu.

## Doğrulama

`pnpm build`, `pnpm typecheck`, `pnpm validate:runtime`, hedefli ESLint ve `git diff --check` çalıştırıldı. `ROUTE_CHECK_BASE_URL=http://localhost:3001 pnpm test:routes` ile 258 sitemap URL'sinin HTTP 200 ve canonical adresleri doğrulandı.

`scripts/check-local-seo-release.ts` uygulama çalışırken; ürünlerden sunum bağlantısını, fiyat rehberini, iki aday sayfanın katalog/sitemap bağlantılarını, ilgili sayfalarda tekil Service şemasını, Greenbox başlığını, uzaktan yönetim bölümünü kontrol eder. Geçersiz PDF seçimi HTTP 400, mevcut AI Photo hizmetinin seçili PDF çıktısı HTTP 200/application-pdf ve `%PDF-` imzası ile doğrulandı. Test talep formu göndermez. PDF örneği `output/seo-release-local/selected-services.pdf`.

Tarayıcıda fiyat sayfası 390 ve 1440 px genişlikte taşma olmadan açıldı, ürünlerden sunuma tıklanarak gidildi. Mevcut Next middleware/edge-runtime ve Browserslist güncellik uyarıları bu çalışmadan bağımsızdır.
