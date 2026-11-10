# Reklam açılış sayfaları: hız düzeltmesi (acil)

Tarih: 10 Kasım 2026. Google Ads kalite puanında "açılış sayfası deneyimi" ortalamanın altında. Reklam tıklanma oranı ortalamanın üstünde, reklam metni yeterli. Puanı aşağı çeken şey sayfa.

## Ölçüm (PageSpeed, mobil, 10 Kasım 18:46)

| Sayfa | Skor | Ana içerik (LCP) | Hız indeksi |
|---|---|---|---|
| /hizmetler/yilbasi-partisi-aktiviteleri | 82 | 4,1 sn | 5,4 sn |
| /hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala | 74 | 4,7 sn | 7,9 sn |

Hedef: LCP mobilde 2,5 sn altı.

## Sırayla yapılacaklar

1. **Font ön yüklemelerini azaltın.**
   - Şu an `src/app/layout.tsx` her sayfada 7 font dosyasını önceden yüklüyor (`preload`). Bu, ana görselle bant genişliği için yarışıyor.
   - Yalnızca ilk ekranda görünen başlık ve gövde fontunun latin-ext dosyalarını bırakın (Türkçe harfler latin-ext'te). Mono fontların preload'unu kaldırın.
   - `font-display: swap` olduğunu kontrol edin.
2. **Engelleyen istekleri azaltın.** PageSpeed tahmini 1,3 sn kazanç.
   - Hangi CSS ve script'in ilk boyamayı beklettiğini PageSpeed raporundan alın.
   - Kritik olmayan CSS'i erteleyin.
   - Google Ads etiketinin `async` kaldığından emin olun.
3. **Ana görsel (LCP) önce gelsin.**
   - Hero görselinde `priority` (Next Image) veya `fetchPriority="high"` kullanın.
   - Görsel mobil için uygun boyutta servis edilsin (Cloudinary `w_` ve `f_auto`).
4. **Kullanılmayan JavaScript'i azaltın** (yaklaşık 300 KB).
   - İlk ekranın altındaki ağır client bileşenlerini (galeri, form etkileşimleri, carousel) `next/dynamic` ile sonradan yükleyin.

## Kontrol

Yayından sonra iki sayfayı PageSpeed'de mobilde tekrar ölçün ve sonucu paylaşın. Kalite puanının güncellenmesi birkaç gün sürer.
