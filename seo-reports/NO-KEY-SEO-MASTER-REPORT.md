# MetasoftCo Anahtarsız SEO Ana Raporu

**Site:** https://www.metasoftco.com  
**Analiz tarihi:** 11 Eylül 2026  
**Kapsam:** API anahtarı gerektirmeyen canlı tarama, teknik SEO, performans, içerik, şema, görsel, hreflang, GEO, yerel SEO, SXO, programatik SEO ve değişim izleme başlangıç kaydı.

## Yönetici özeti

MetasoftCo'nun canlı sitesi taranabilir ve indekslenebilir durumda. Sitemap'teki **167 URL'nin tamamı HTTP 200**, self-canonical ve indexlenebilir; ana sayfa mobil Lighthouse skoru **93**, masaüstü skoru **86**. Kritik bir site-geneli indeksleme engeli bulunmadı.

İlk otomatik denetimin 61/100 puanı, sitemap canonical eşleşmeleri ve performans ölçümleriyle ilgili yanlış pozitifler içeriyordu. Uzman doğrulamalarından sonra kullanılacak **kanıta dayalı çalışma puanı 74/100** olarak normalize edilmiştir. Bu, GSC/GA4/CrUX veya ücretli backlink ve SERP verisi içermeyen bir başlangıç puanıdır.

| Alan | Düzeltilmiş puan | Durum |
|---|---:|---|
| Teknik SEO | 90 | Sağlam; kritik indeksleme engeli yok |
| Performans | 90 | Laboratuvar ölçümü iyi; LCP iyileştirilebilir |
| Şema | 84 | Genel olarak geçerli; birkaç boş alan ve tip eksikliği var |
| Programatik SEO | 86 | Orta ölçekli ve kontrollü; 6 ince içerik örneği var |
| On-page SEO | 67 | Başlık/meta ve karar destek içeriği geliştirilmeli |
| İçerik / E-E-A-T | 67 | Kaynak, kişi yazarlığı ve EN içerik eşitliği zayıf |
| Görseller | 58 | Büyük PNG'ler, boş alt metinler ve format fırsatları var |
| GEO / AI görünürlüğü | 55 | Bot erişimi açık; alıntılanabilir cevap blokları zayıf |
| Yerel SEO | 41 | NAP/kuruluş bilgisi tutarsızlığı ve yerel kanıt eksikleri var |

## Öncelikli işler

### P0 — Doğruluk ve güven

1. İki bozuk blog bağlantısını düzelt:
   - `blog/2026-etkinlik-trendleri-interaktif-teknolojiler` içindeki `http://127.0.0.1:3000/...`
   - `blog/stable-diffusion-etkinlik-yuz-donusumu-teknik-analiz` içindeki `https://www.google.com/search?q=/iletisim`
2. Kuruluş bilgisini tekilleştir: LinkedIn'deki **Sarıyer / 2016** ile sitedeki şema bilgisindeki **Avcılar / 2020** çelişkisini çöz.
3. Boş şema alanlarını düzelt:
   - Quiz sayfasında `Service.description` ve `Service.image`
   - AI Sketch to Badge sayfasında `Service.image`
4. Sitemap'e eksik `/hizmetler/istanbul-ai-photobooth` hedefini ekle; eski iç bağlantıyı yönlenen URL yerine nihai URL'ye çevir.
5. İngilizce ticari satış bağlantısını doğrudan `/en/products/ai-photobooth-commercial-sales` hedefine güncelle.

### P1 — Hız ve mobil dönüşüm

1. `/phase2/about-production-stage-v2.png` (**2.05 MB**) ve `/phase2/contact-producers-v2.png` (**1.21 MB**) dosyalarını AVIF/WebP'ye dönüştür ve responsive boyutlar üret.
2. 200 KB üzerindeki 53 görseli, özellikle 500 KB üzerindeki 6 görseli optimize et.
3. Mobil LCP'yi 3.07 saniyeden 2.5 saniyenin altına indir; masaüstü LCP 2.55 saniye ile eşikte.
4. Yaklaşık 309 KiB kullanılmayan JavaScript'i ve GTM/gtag/Yandex üçüncü taraf yükünü azalt.
5. Mobilde çerez bandının WhatsApp CTA'sını örtmesini engelle; 44 px altındaki dört dokunma hedefini büyüt.

### P1 — İçerik, E-E-A-T ve AI alıntılanabilirliği

1. Dokuz blog yazısına gerçek dış kaynaklar, named author `Person` şeması, yazar profili ve güncelleme tarihi ekle.
2. İngilizce Stable Diffusion yazısını Türkçe sürümle içerik derinliği açısından eşitle: mevcut örnek yaklaşık **164 kelimeye karşı 579 kelime**.
3. Ana hizmet sayfalarına kısa, bağımsız **doğrudan cevap blokları**, soru biçimli başlıklar ve ölçülebilir kurulum/kapasite bilgileri ekle.
4. Ticari sayfalarda fiyatı etkileyen faktörler, kurulum süresi, kapasite, teslimatlar, örnek kullanım senaryoları ve müşteri kanıtları ekle.
5. `llms.txt` içindeki temel URL'leri düz metin yerine Markdown bağlantısı yap.

### P2 — Mimari, şema ve yerel görünürlük

1. `/sektorel-cozumler` ve `/en/sector-solutions` hub sayfalarını site içi bağlantı grafiğine dahil et.
2. `WebSite`, `WebPage`, `ContactPage`, uygun sayfalarda `Person/ProfilePage` ve yerel işletme türü ekle; Organization düğümüne kalıcı `@id` ver.
3. `/gizlilik` ve `/kullanim-kosullari` için EN eşleri oluştur veya hreflang kapsamını bilinçli olarak belgele.
4. Google Business Profile adres, hizmet bölgesi, telefon, çalışma saatleri ve kuruluş yılıyla site/LinkedIn bilgisini eşitle.
5. 37 hizmet görselindeki boş `alt` değerini, görsel gerçekten bilgi taşıyorsa açıklayıcı metinle doldur; dekoratif olanları boş bırak.

## 30/60/90 günlük uygulama sırası

### İlk 30 gün

- P0 bağlantı, sitemap, şema ve NAP hatalarını kapat.
- En ağır görselleri dönüştür; mobil çerez/WhatsApp çakışmasını düzelt.
- Ana hizmet sayfalarında LCP ve kullanılmayan JavaScript optimizasyonu yap.
- GSC ve GA4 bağlandığında mevcut anahtarsız başlangıç verisini gerçek sorgu ve dönüşüm verisiyle kalibre et.

### 31–60 gün

- Öncelikli hizmet sayfalarına karar destek bilgisi, SSS, vaka kanıtı ve doğrudan cevap blokları ekle.
- Bloglarda named author, kaynaklandırma ve kişi profillerini yayına al.
- Türkçe/İngilizce içerik ve hreflang eşlerini tamamla.
- İç bağlantı hub'larını güçlendir.

### 61–90 gün

- Arama niyetine göre sektör + çözüm kümeleri oluştur; ince sayfa şablonlarını genişletmeden yenilerini üretme.
- Özgün vaka çalışmaları, ölçüm sonuçları ve etkinlik teknolojisi karşılaştırmaları yayımla.
- DataForSEO veya eşdeğer canlı SERP/backlink verisiyle içerik boşluklarını ve off-page öncelikleri doğrula.
- İlk drift karşılaştırmasını çalıştır ve title, canonical, robots, H1, schema, OG ve HTML değişimlerini incele.

## Doğrulanmış teknik notlar

- `robots.txt`, AI tarayıcıları dahil GPTBot, ClaudeBot, PerplexityBot ve Google-Extended erişimini engellemiyor.
- 167 sitemap URL'sinin 167'si final 200, self-canonical ve indexlenebilir.
- Tüm 167 sayfada tek H1 bulundu.
- Mobil Lighthouse: 93; masaüstü: 86. CLS her ikisinde 0; TBT mobil 90 ms, masaüstü 0 ms.
- INP için alan verisi yok. İlk aracın gösterdiği 500 ms değeri gerçek INP olmadığı için değerlendirmeden çıkarıldı.
- Backlink sayısı ve sıralama gücü, API'siz Common Crawl verisiyle güvenilir biçimde puanlanamadı.
- Programatik tarama orta büyüklükte bir şablon ayak izi ve 300 görünür kelimenin altında 6 örnek sayfa buldu. Yeni şablon ölçeklemeden önce bu sayfalar zenginleştirilmeli.

## API anahtarı olmadan tamamlanan çıktılar

- [Tam otomatik denetim](./www-metasoftco-com-audit-20260911-141432/FULL-AUDIT-REPORT.md)
- [Teknik denetim](./specialists/technical/TECHNICAL-AUDIT-REPORT.md)
- [Performans denetimi](./specialists/performance/PERFORMANCE-AUDIT-REPORT.md)
- [Görsel/mobil denetim](./specialists/visual/VISUAL-AUDIT-REPORT.md)
- [İçerik denetimi](./specialists/CONTENT-REPORT.md)
- [Şema denetimi](./specialists/SCHEMA-REPORT.md)
- [Sitemap doğrulaması](./specialists/VALIDATION-REPORT.md)
- [Görsel optimizasyon denetimi](./specialists/IMAGE-AUDIT.md)
- [GEO analizi](./specialists/GEO-ANALYSIS.md)
- [Hreflang doğrulaması](./specialists/HREFLANG-VALIDATION.md)
- [Yerel SEO analizi](./specialists/LOCAL-SEO-ANALYSIS-www-metasoftco-com.md)
- [SXO analizi](./specialists/SXO-ANALYSIS.md)
- [Backlink veri yeterliliği analizi](./specialists/BACKLINK-ANALYSIS.md)
- [Programatik SEO analizi](./programmatic-www-metasoftco-com-20260911-201511/PROGRAMMATIC-REPORT.md)
- [Otomatik plan çıktıları](./plan-www-metasoftco-com-20260911-201511/SEO-STRATEGY.md) — sektör sınıflandırması ve SaaS kalıbı önerileri bu ana raporla düzeltilmiştir.

## İzleme başlangıç kaydı

SEO drift baseline başarıyla oluşturuldu: **baseline ID 1**. Ana sayfanın title, meta description, canonical, robots, H1/H2/H3, schema, Open Graph, HTTP durum ve HTML hash bilgileri kaydedildi. CWV bu kayda dahil edilmedi; çünkü alan verisi gerektirir. Yerel veritabanı: `~/.cache/codex-seo/drift/baselines.db`.

## Anahtarlı sonraki katman

Bu aşamada hiçbir API anahtarı kullanılmadı. GSC/GA4 ile sorgu, sayfa ve dönüşüm performansı; CrUX ile gerçek kullanıcı CWV; DataForSEO/Ahrefs/SE Ranking ile canlı SERP, rakip ve backlink; GBP/Maps verisiyle yerel görünürlük ayrıca doğrulanmalıdır.
