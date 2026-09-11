# MetasoftCo Görsel SEO Denetimi

- URL: https://www.metasoftco.com/
- Tarih: 2026-09-11
- Görsel skor: **80/100**
- Viewport'lar: 1920×1080, 1366×768, 768×1024, 375×812
- API anahtarı: kullanılmadı

## Başarılı kontroller

- H1 masaüstünde ilk ekran içinde ve görünür.
- Birincil CTA ilk ekran içinde ve görünür.
- Hero görseli algılandı.
- Mobil viewport etiketi mevcut.
- 375 px mobil görünümde yatay kaydırma yok.
- Gövde yazı boyutu 16 px ve okunabilirlik tabanını karşılıyor.
- Dört viewport'un tamamında tam sayfa ekran görüntüsü başarıyla alındı.

## Sorunlar

1. **Çerez bandı mobilde WhatsApp CTA'sını örtüyor.** Sabit çerez bileşeni ile `WhatsApp ile iletişime geç` öğesi kesişiyor. Bu durum dönüşüm ve kullanılabilirlik riski yaratıyor.
2. **Dört görünür dokunma hedefi 44 px minimumunun altında.** Logo bağlantısı 36 px, Gizlilik Politikası bağlantısı 18 px, Reddet düğmesi 41,5 px ve Kabul Et düğmesi 39,5 px yüksekliğinde.
3. **H1 dikey overflow sinyali verdi.** Tasarımın satır/kırpma animasyonu nedeniyle kasıtlı olabilir; mobilde tüm metnin ekran okuyucu ve görsel kullanıcı için eksiksiz kaldığı regresyon testiyle doğrulanmalı.

## Öneriler

- Mobil çerez bandına WhatsApp düğmesini örtemeyecek alt boşluk/z-index yerleşimi verin veya CTA'yı banner yüksekliği kadar yukarı taşıyın.
- Çerez düğmelerini ve Gizlilik bağlantısını en az 44×44 px tıklanabilir kutuya genişletin; görünür metin küçük kalabilir fakat hit-area büyümeli.
- H1 kapsayıcısında sabit yükseklik/line-clamp kullanımını kontrol edin; animasyon sonrasında `scrollHeight <= clientHeight` olmasını test edin.
- Ekran görüntüsü regresyonunu mobil, tablet ve masaüstü için CI'a ekleyin.

## Ekran görüntüleri

- `screenshots/www_metasoftco_com_desktop.png` — 1920×7733
- `screenshots/www_metasoftco_com_laptop.png` — 1366×7295
- `screenshots/www_metasoftco_com_tablet.png` — 768×7781
- `screenshots/www_metasoftco_com_mobile.png` — 750×19754 (2× device scale)

## Sınırlamalar

- Otomatik overlap ve overflow bulguları geometrik sinyallerdir; animasyonlu/kasıtlı tasarım için manuel regresyon testi gerekir.
- Ekran görüntüleri çerez tercihi verilmemiş ilk ziyaret durumunu gösterir.
