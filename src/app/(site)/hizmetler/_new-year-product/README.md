# Yılbaşı ürün koleksiyonu — kış vitrini

Yedi `/hizmetler/yilbasi-*` ürün rotası bu sunucu bileşenini kullanır. Ana kampanya sayfası ayrı kalır. Ürün bilgileri, metadata ve SSS `src/lib/new-year-products.ts` dosyasından gelir.

## Tasarım

Karlı üç boyutlu yılbaşı sahnesi, büyük kırmızı tipografi, ürün fotoğrafını taşıyan cam küre, ürüne özel başlık ve not kartı. Aşağıda hediye kartları, fotoğraf/akış, teknik bilgiler, SSS ve numaralı yılbaşı takvimi biçimindeki ilgili deneyimler vardır. Menü ve footer renkleri CSS Module içindeki `.ms:has(.page)` kurallarıyla yalnız bu koleksiyonda değişir.

`WinterScene.tsx` küçük bir istemci bileşenidir: deterministik konumlu kar taneleri ve animasyonu başlat/durdur düğmesi. `prefers-reduced-motion: reduce` bütün animasyonları kapatır ve kar kontrolünü gizler. Sayfa içeriği, başlıklar, şemalar ve bağlantılar sunucuda oluşturulur.

## Görseller

Beş ürün mevcut kampanya görsellerini kullanır. Mirror Booth ve GIF Kart için ürün referanslarından yılbaşı konsept görselleri üretildi; görseller örnek konsept olarak etiketlenir. Ürün WebP kaynakları `public/images/yilbasi/`, 480/800/tam boy sürümleri `public/images/yilbasi/v/` altındadır. `scripts/make-campaign-variants.mjs` bunları yeniden oluşturabilir. Yeni ürün kaynakları 1200 px olduğundan loader WIDE listesine eklenmeleri gerekmez.

Sahne için ayrıca `winter-stage.webp`, mobil için ayrı kompozisyonlu `winter-stage-mobile.webp` ve alfa kanallı `christmas-bow.webp` üretildi. `<picture>` yalnız uygun ekran kaynağını seçer. Masaüstü sahne yaklaşık 148 KB, mobil sahne 48 KB, kurdele 72 KB.

Teklif bağlantıları mevcut iletişim formuna hem `durum` hem `urun` parametresini taşır. URL, canonical, metadata, Service/FAQ/Breadcrumb şemaları korunur. Service görseli güncel yılbaşı ürün görselinin mutlak URL'sidir.

## Yerel doğrulama

TypeScript ve hedefli ESLint; 7 rotada HTTP 200, bütün görsellerin yüklenmesi, masaüstü/mobil taşma, SSS açma, kar durdurma ve azaltılmış hareket tercihi kontrol edilir. 320, 390, 768, 1024 ve 1440 px genişlikler tarayıcıda taranır. Son ekran görüntüleri `output/yilbasi-alt-sayfalar/v2-*`, sonuçlar `qa-v2.json` altında. Canlı dağıtım yapılmadı.
