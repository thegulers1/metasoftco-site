# Güncel sürüm: gerçek hizmet sayfası üzerinde siyah ürün düzeni

Son revizyonda tasarım yalnız önizlemeden çıkarılıp hedef Türkçe hizmet bileşenine uygulandı. Mevcut `MsNav`, `MsClosing` ve yüzen kontroller korunur. Arka plan mevcut siyah site zemini; stiller AI Photobooth CSS Module'üyle izoledir. Production deploy yapılmadı.

- Tekrarlanan “Fotoğraftan markaya özel bir hatıraya” görsel bölümü kaldırıldı. Ana galeri tek yerde kalır.
- Referanslar küçük “Seçili projeler” başlığı, 3:4 yuvarlatılmış görseller ve kısa açıklamalarla sunulur. Castrol sistem satışı olarak etiketli kalır.
- `ProductGallery` ve `QuoteForm` hizmet bileşeninin yanına taşındı; eski önizleme kopyaları kaldırıldı.
- Development önizlemesi artık gerçek route bileşenini mevcut site layout'u ile render eder; ayrı tasarım kopyası yoktur. Production guard ve noindex korunur.
- Data-Capture, outputType, satış karşılığı, teknik özellikler, ilgili hizmetler ve fotoğraf saklama açıklaması korunur.
- Gerçek rotada tek H1, index/follow, canonical, altı uygun JSON-LD türü ve 16 FAQ soru/cevap eşleşmesi tarayıcıda doğrulandı. 320/390/768/1440 px taşma yok.
- Güncel görüntüler: `output/ai-photobooth-site/desktop.jpg`, `mobile.jpg`, `projects-desktop.jpg`.

Aşağıdaki notlar önceki açık zeminli önizleme sürümünün tarihsel kaydıdır.

---

# AI Photobooth ürün sayfası önizlemesi

Önizleme: `http://localhost:3000/design-preview/ai-photobooth-lab`

## Güncel tasarım

AI Experience Lab / Gerçek insanlar manifesto tasarımı, kullanıcı geri bildirimi üzerine kaldırıldı. Aynı geliştirme rotası artık Hatıra Atölyesi'nin ürün–açıklama–teklif düzenine ve Harikalar'ın belirgin CTA/video yaklaşımına yakın bir ürün sayfası gösterir.

- Açık zemin, siyah metin, sarı CTA, ölçülü tipografi.
- Masaüstünde solda fotoğraf/video galerisi, ortada ürün başlığı ve açıklama, sağda hızlı teklif formu.
- Mobilde başlık ve teklif aksiyonu, ardından gerçek görsel ve galeri. Alt teklif / WhatsApp / telefon şeridi.
- Kullanım adımları, kapsam/opsiyon ayrımı, özgün dönüşüm kompozisyonları, iki gerçek referans, mevcut hizmet FAQ'sı ve kapanış.
- Tavuk Dünyası etkinlik aktivasyonu; Castrol EDGE özel üretim ve sistem satışı olarak etiketlenir.

## Veri ve izolasyon

Mevcut hizmet sayfası, ortak CSS, Prisma şeması, SEO üretimi, robots ve sitemap değiştirilmedi. Layout ve page içindeki development kontrolü korunur; production modunda `notFound()` DB import/sorgusundan önce çalışır. Preview `noindex, nofollow, nocache` taşır. Deploy yapılmadı.

Medya ve yayımlanmış Tavuk Dünyası / Castrol kayıtları Prisma'dan okunur. Yeni, stok veya sahte dönüşüm görselleri eklenmedi. Galeri özgün kaynak kompozisyonlarını gösterir. FAQ aynı hizmetin gözden geçirilmiş soru listesini kullanır. Kaynak HTML kartlara parçalanmaz.

## Teklif formu

`QuoteForm.tsx` mevcut `/api/contact` sözleşmesini kullanır. Ad, e-posta ve telefon zorunludur. Şirket, tarih, şehir ve katılımcı bilgisi isteğe bağlı açılan alandadır. Ürün adı otomatik olarak `AI Photo & AI Photobooth` gönderilir. Hata, bekleme ve başarı durumları vardır; mevcut attribution bilgisi korunur. Yeni API veya production veritabanı değişikliği yoktur.

Form gerçek talep gönderme işlevine sahiptir. QA sırasında form gönderilmemiş, e-posta veya kayıt oluşturulmamıştır; teslimat uçtan uca doğrulanmamıştır.

## Kontroller

- `pnpm typecheck`: geçti.
- `pnpm exec eslint src/app/design-preview`: geçti (yalnız eski Browserslist veri uyarısı).
- `pnpm exec next build --webpack`: üretim derlemesi ve statik sayfa üretimi geçti.
- `git diff --check`: geçti.
- 320, 390, 768 ve 1440 px: yatay taşma gözlenmedi.
- 390×844: ana teklif CTA'sı yaklaşık 348 px; ilk görsel 468 px seviyesinde.
- Galeri küçük görsel seçimi, modal aç/kapat, video iframe'i, teklif bağlantısının formu görünür konuma getirmesi ve isteğe bağlı alanların açılması kontrol edildi.
- Zorunlu alanların name/email/phone olduğu doğrulandı. Form gönderilmedi.

## Görüntüler

Güncel: `output/ai-photobooth-product/desktop.jpg`, `output/ai-photobooth-product/mobile.jpg`.

Önceki Lab tasarımı görüntüleri tarihsel karşılaştırma için `output/ai-photobooth-lab/` içinde durur; güncel tasarımı temsil etmez.

Önizleme, gerçek Prisma kayıtları için proje README'sinde belirtilen SSH tüneline ihtiyaç duyar.
