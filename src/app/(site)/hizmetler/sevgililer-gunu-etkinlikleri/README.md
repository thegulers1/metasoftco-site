# Sevgililer Günü etkinlikleri

Kalıcı URL: `/hizmetler/sevgililer-gunu-etkinlikleri`. İlk içerik 14 Şubat 2027 için hazırlandı; URL yıl içermez. İçerik `content.ts`, tasarım CSS Module, sayfa sunucuda oluşturulur. Veri tabanı okuması gerektirmez.

Altı deneyim, AVM/mağaza/marka için üç örnek kurgu, teknik hazırlık ve sekiz SSS içerir. Teklif düğmeleri mevcut iletişim formuna `durum` ve `urun` aktarır; etiket `occasionLabel` içinde tanımlıdır. Sayfa sitemap, hizmetler listesi, TR menü/footer ve `llms` içerik listesine eklendi. Canonical, OG/Twitter görseli ve Breadcrumb/Service/FAQ şemaları vardır. Gelecekteki uygulamalar için Event veya sahte referans/review oluşturulmaz.

## Görseller ve üretim briefleri

Yerleşik imagegen aracıyla üretildi. Görseller örnek konsept olarak etiketlidir. WebP kaynakları `public/images/sevgililer-gunu/avm-photo-{480,800,1200}.webp` ve `fotograf-hatirasi-{480,800,1200}.webp`. Sosyal kapak `paylasim.jpg`. Native srcset kullanılır çünkü ortak custom loader yerel dosyaları yeniden boyutlandırmıyor.

Hero prompt: ads-marketing; portrait 4:5 editorial photograph; modern shopping mall atrium, burgundy freestanding photo kiosk with small ring light and portrait screen, adult woman in cream and red and adult man in burgundy smiling together, sculptural cherry red heart backdrop and blush curtains, premium natural daylight and tactile materials; people and kiosk in central 80% safe area, no lettering, no logos, no watermark, no Christmas decorations.

Keepsake prompt: product-mockup; landscape 4:3 editorial still life; blush tabletop, two three-frame glossy photobooth strips of an adult couple and one instant print of two adult female friends, ivory margins with tiny red hearts, red satin ribbon, sculptural red heart, warm sunlight and soft shadows; whole prints inside central 80% safe area, no lettering, no watermark, no Christmas decorations.

## Kontrol

TypeScript ve hedefli ESLint; 320/390/768/1024/1440 px tarayıcı kontrolü. Görseller, canonical, title, JSON-LD, SSS açılması ve teklif URL parametreleri doğrulandı. Ekran görüntüleri ve QA: `output/sevgililer-gunu/`. İndekslenme ya da GEO görünürlüğü garantisi verilmez; Search Console gönderimi yapılmadıkça yapıldı denmez.
