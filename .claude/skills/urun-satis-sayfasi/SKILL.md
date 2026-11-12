---
name: urun-satis-sayfasi
description: MetasoftCo'da bir ürünün satış sayfasını (/urunler/<slug>, /en/products/<slug_en>) kurar veya günceller — fiyatlı yapılandırıcı, dahil olanlar, eklentiler, teknik tablo, sahadan kanıt, süreç, ödeme/garanti, SSS. "satış sayfası", "ürün sayfası", "kiosk satışı", "fiyat ekle", "yeni ürün satalım" denildiğinde kullan.
---

# Ürün satış sayfası

Satış sayfaları tek bir veri dosyasından üretilir; tasarım yeniden icat edilmez.

## Dosyalar
- Ürün verisi: `src/lib/sale-products/<urun>.ts` → `src/lib/sale-products/index.ts` içindeki `SALE_PRODUCTS` listesine slug ile eklenir.
- Tip: `src/lib/sale-products/types.ts` (`SaleProduct`).
- Görünüm: `src/components/services/template/ProductSale.tsx` + `product-sale.module.css`. Ortak stiller `ai-photobooth.module.css`'ten gelir (`.primary`, `.eyebrow`, `.section`, `.quoteCard`, `.textLink`).
- Bağlantı: `src/app/(site)/urunler/[service]/page.tsx` ve `src/app/(site)/en/products/[service]/page.tsx` `saleProduct(slug)` ile veriyi bulur; `ServiceDetailClient` veri varsa `ProductSale` çizer ve DB'deki içerik/teknik/SSS bloklarını göstermez (çelişki çıkmasın diye). Ürün JSON-LD'si (`Product` + `AggregateOffer`) ve SSS JSON-LD'si veri dosyasından üretilir.

## Yeni ürün eklerken
1. Kullanıcıdan al: fiyatlar (para birimi, KDV), dahil olanlar, eklentiler ve fiyatları, teknik özellikler, görseller, ödeme koşulları, sahada kullanıldığı projeler.
2. Veri dosyasını kopyalayarak yaz; TR ve EN metni birlikte yaz (çeviriyi Claude yapar).
3. Görseller `public/images/<urun>/` altına webp.
4. Tarayıcıda TR, EN ve 375 px genişlikte kontrol et; toplam fiyatı birkaç kombinasyonla doğrula.

## İçerik kuralları
- **Uydurma yok.** Teslim süresi, destek saatleri, lisans süresi, ölçü, ağırlık gibi her rakam kullanıcıdan gelmeli. Bilinmeyen alanı boş bırak, tahmin yazma.
- Fiyatlar USD + KDV; faturalama fatura tarihindeki TCMB satış kuruyla TL. Ödeme: siparişte %50, teslimden sonra %50 (aksi söylenmedikçe).
- **Satışı abartma.** Satın alma sabit nokta/sürekli kullanım içindir; etkinlik için kiralama varsayılan öneridir. Her satış sayfasında kiralamaya dürüst bir yönlendirme bölümü olur. Aylık kiralama fiyatı public sayfada yazılmaz.
- Müşteriye özel tekliflerdeki müşteri adı ve senaryo public sayfaya taşınmaz.
- Rakip (ör. Activation King) kurgu referansıdır; görsel dil, metin ve sepet/kampanya öğeleri kopyalanmaz. Bizim farkımız anahtar teslim sistem: donanım + yazılım + marka arayüzü + kurulum + eğitim + destek.
- Başlangıç fiyatı çalışan en küçük yapılandırmadır (ürünün işlevi için zorunlu parça eklenti yapılmaz). Opsiyonel donanım eklentiye alınırsa `fullKit` + `fullKitLabel` ile "tam donanım" fiyatı da gösterilir; yapay zekâ ve müşteri elma-elma karşılaştırabilsin.
- Galeri renderları "temsili" diye işaretlenir.
- URL/slug değiştirilmez.
