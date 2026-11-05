# Ortak hizmet detay düzeni

AI Photo ürün düzeni, TR/EN kiralama ve sistem satış detaylarına uygulanır. Siyah site zemini, üst menü ve footer mevcut site layout'undan gelir.

- Dört route mevcut Prisma sorgularını, yayın kontrollerini, metadata/canonical/hreflang ve JSON-LD üretimini korur. Genel bileşene ayrıca yayımlanmış proje referansları geçirilir.
- ServiceDetailClient: veri kaynaklı galeri, hizmet açıklaması ve teklif formundan oluşan hero; tam editör içeriği; teknik özellikler; uygun kiralamalarda operasyon; açıkça bağlanmış projeler; dataCapture; mevcut FAQ listesi; kapanış ve ilgili hizmetler.
- Uzun içerik, doğrulanmış üst düzey h1–h6 başlıklarına ve eski editördeki belirgin kalın alt başlıklara göre ayrı editoryal satırlara ayrılır: solda bölüm başlığı, sağda ilgili metin; mobilde tek sütun. İçerikteki h1 etiketleri görünüm katmanında h2 olur. İç içe başlıklar, başlığa yanlışlıkla konmuş uzun paragraflar ve dengesi bozuk HTML parçalanmadan korunur; veritabanı değiştirilmez.
- Görseli olmayan yazılım hizmetleri metin + teklif düzenine geçer. Yazılım ve satış sayfaları etkinlik lojistiğini ve katılımcı/tarih alanlarını göstermez.
- AI Photo, Fashion Mirror ve Greenbox'ın incelenmiş özel içerikleri mevcut product düzeninde korunur. AI Photo özel referans izin listesi değişmez.
- ServiceGallery tüm galeri kayıtlarını erişilebilir tutar; büyütme, YouTube ve doğrudan video/Cloudinary video desteği vardır. Mobilde teklif CTA'sı ve görsel erkendir; uzun açıklama açılabilir.
- ProductQuoteForm TR/EN metinleriyle mevcut /api/contact sözleşmesini ve attribution'ı kullanır. Gönderim QA sırasında yapılmaz. Detaylı iletişim formu ?urun= ön seçimini taşır.
- Referanslar Project.serviceIds içindeki kesin hizmet kimliğiyle eşleşir. Yayımlanmamış, görselsiz veya EN yayın koşullarını sağlamayan proje gösterilmez. Hiç eşleşme yoksa bölüm gösterilmez.
- Teknik özelliklerde mevcut EN alanı boşsa önceki davranıştaki TR yedeği korunur. Kaynaktaki metinler yeniden yazılmamıştır.
- Ortak kapsam listesindeki doğrulanmamış 750 baskı dahil ifadesi bu şablonda gösterilmez. Paket sayısı eklenmez.

Değişiklikler yereldir; deploy veya veritabanı yazımı içermez. Kategori, katalog, şehir landing ve sektör sayfaları bu detay şablonunun kapsamı dışındadır.

Tüm içerik kontrolü: 51 yayımlanmış hizmet, 99 TR/EN içerik alanı. Eski kalın başlıklı paragraflar, h4 başlıkları ve her maddesi açıkça adlandırılmış özellik listeleri de bölüm düzenine alınır. Liste gövdeleri ve bağlantılar korunur; tek başına metin içinde geçen ürün vurguları başlığa dönüştürülmez. Galerilerde CDN boyutlandırma isteği hata verirse aynı görselin orijinal URL’sine geçilir.

Galeri görselleri sabit dikey kutu yerine kendi doğal en/boy oranında gösterilir. Fotoğraf çerçevesinin koyu zemini kaldırılmıştır; yatay ve dikey dosyalar kırpılmadan gösterilir. Video oynatıcılarının mevcut oran davranışı korunur.
