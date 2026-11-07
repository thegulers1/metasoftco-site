# Momento Ball — 7 Kasım 2026 güncellemesi

## Kapsam ve kaynaklar

Mevcut `momento-ball` hizmeti (`cmkjohog500082orrvw62idw2`) güncellenir. Yeni hizmet, kategori veya URL oluşturulmaz. Diğer hizmetler ve DeFacto projesinin içeriği değiştirilmez.

Kaynaklar:
- https://www.metasoftco.com/hizmetler/photobooth-ve-fotograf-aktivasyonlari/momento-ball
- https://www.metasoftco.com/en/services/photobooth-and-photo-activations/momento-ball
- https://www.metasoftco.com/projeler/defacto-x-momento-ball-photo

İlk incelemede kapalı olan yerel DB tüneli, kullanıcının yayın talebi üzerine açıldı ve canlı kayıt yeniden okundu. Hizmet published=true/RENTAL; Project.serviceIds mevcut hizmeti içeriyor. TR/EN alanları ve kategori yayın koşulları tamam.

## Yapılan değişiklikler

- TR/EN başlık, açıklama, HTML içerik, metadata, özellikler ve ürüne özgü FAQ: yılbaşı ve şirket etkinliği arama niyeti.
- Fotoğraf çekimi → baskı → şeffaf küreye yerleştirme → teslim akışı. Logo/tarih tasarımı mevcut kaynaktan doğrulandı. Adet ve sunum kapsamı teklifte netleştirilir.
- Ölçü, kapasite, sabit fiyat, sıfır bekleme, kesin süre veya müşteri sonucu iddiası eklenmedi. Projedeki yaklaşık 200–300 adet, trafik ve bağlılık iddiaları yeni metne taşınmadı.
- Kullanıcı düzeltmesi: Momento Ball lead toplayamaz. `dataCapture=false`; Data-Capture/CRM bölümü, bağlantısı, görünür soruları ve FAQPage'deki veri toplama soruları kalkar. Teklif isteyen müşterinin iletişim formu korunur.
- outputType digital → print: fiziksel fotoğraf çıktısını doğru sınıflandırır.
- Temsili üretilmiş görseller hizmet galerisinde; gerçek DeFacto referansı ayrı proje bölümünde korunur. Galerinin yapay zekâ ile hazırlanmış temsili görseller olduğu TR/EN açıklanır; müşteri projesi fotoğrafı olarak sunulmaz.
- Kullanıcının ilk seti fazla yabancı stok model görünümünde bulması üzerine yeni kurgusal Türk yetişkin kadınlarla doğal İstanbul şirket etkinliği temalı alternatifler üretildi. Kullanıcının beğendiği daha doğal görsel yönü korundu. Logolar veya gerçek müşteri etkinliği taklidi kullanılmadı.
- Mevcut premium tasarım ailesi ve DB/editpanel içerik yönetimi korunur. Yalnızca bu kategori + slug + rental varyantında kampanya etiketi, CTA, temsili görsel notu ve genel operasyon/FAQ istisnası vardır.

## SEO ve form

Mevcut TR/EN URL'leri, self-canonical, karşılıklı tr/en/x-default ve site haritası kayıtları korunur. Her iki sayfa index/follow. Service, BreadcrumbList ve görünür sorularla aynı FAQPage listesi kullanılır. OG/Twitter, yeni DB metadata ve görsel alanlarını kullanır. Sahte fiyat/puan şeması eklenmez.

Teklif formu mevcut `/api/contact` ve attribution akışını kullanır; test sırasında form gönderilmez. Reklam kampanyası açılmaz ve bütçe harcanmaz.

## Uygulama güvenliği

`src/content/momento-ball/update.ts` DB güncelleme verisidir; runtime override değildir. `scripts/prepare-momento-ball.ts` çevrimdışı varsayılanla öneri dosyası üretir. `--apply` için incelenmiş güncel `MOMENTO_REVIEWED_UPDATED_AT` gerekir. Kayıt önce yedeklenir; sabit kimlik + updatedAt koşulu ile yalnızca Momento Ball güncellenir. Eşzamanlı değişiklikte işlem durur. Slug, published ve proje bağlantıları değişmez.

## Doğrulama

- TypeScript ve değişen dosyaların ESLint kontrolleri geçti.
- Canlı DB runtime validation geçti.
- Tam `next build --webpack` üretim derlemesi ve TypeScript aşaması geçti.
- Önceki TR/EN fixture testleri: 1440px/390px, HTTP 200, tek H1, taşma yok, tüm görseller, galeri büyütme, teklif alanına kaydırma, referans bağlantısı; sayfa hatası yok.
- Yayın tamamlandıktan sonra gerçek TR/EN DB-backed sayfalarda metadata, şema, galeri, lead bölümü yokluğu ve teklif CTA'sı tekrar kontrol edilir. Yayın sonucu ve görsel manifesti çalışma çıktılarında tutulur.

Görsel üretimi yerleşik image generation aracıyla yapıldı. Seçilen PNG'ler çalışma alanında saklanır ve Cloudinary'ye yeni, sürümlü adlarla yüklenir. Prompt ve dosya eşleştirmeleri çalışma alanındaki `output/momento-ball` altında tutulur.
