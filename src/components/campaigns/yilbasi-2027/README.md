# Yılbaşı 2027 kampanyası

Canlı rota: `/hizmetler/yilbasi-partisi-aktiviteleri`. Kampanya route grubu kendi sade navigasyon/footer'ını kullanır. Diğer hizmetlerin ortak tasarımı değişmez. Kök layout'un consent ve analytics akışı korunur; AttributionCapture kampanya layout'unda çalışır.

## Kaynaklar

Prisma salt okunur: yayımlanmış RENTAL kayıtları AI Photo, Strip Photo, 360 Video Booth, Hediye Çarkı; yayımlanmış Tavuk Dünyası ve Rollic projeleri. Yayından kaldırılan kayıtlar gösterilmez. Kişi aralıkları ve kombinasyonlar occasions.ts kaydından gelir. Gerçek referanslar konsept görsellerinden ayrıdır.

Kullanıcının sağladığı 12 yılbaşı PNG'si oran/içerik korunarak WebP'ye dönüştürüldü. İki kiosk sahnesi, dört karlı portre, dört retro portre, iki altılı tema seçkisi. 30 MB kaynak yerine ana görseller yaklaşık 2,64 MB; sekiz küçük thumbnail eklenir. Orijinaller değiştirilmedi.

`holiday-photobooth.webp`, `holiday-gift-wheel.webp` ve `holiday-360-photo.webp` imagegen ile hazırlanmış yılbaşı konsept görselleridir. Görünür not/alt metin örnek konsept olduğunu belirtir; gerçek müşteri uygulaması iddiası yoktur. 360 görseli platform, döner kamera kolu ve yılbaşı backdrop gösterir. Kart sırası Photobooth / 360 Photo / Hediye Çarkı; masaüstü üç sütun, mobil tek sütun.

## SEO ve form

Metadata mevcut occasionMetadata kaynağından gelir. URL, canonical, title, OG/Twitter ve mevcut alternates davranışı korunur. Meta açıklamasındaki doğrulanmamış aynı gün vaadi önceki Görev 59 kapsamında çıkarıldı. BreadcrumbList korunur; FAQPage ve görünür FAQ aynı sekiz sorudan üretilir. Tek H1. Dev önizleme production'da 404 kalır.

Form mevcut /api/contact sözleşmesini kullanır. Ad/e-posta zorunlu, telefon/şirket/etkinlik bilgisi opsiyonel. Ürün ve kiralama/yılbaşı etiketleri, consent tercihine bağlı attribution ile gönderilir. generate_lead yalnız HTTP başarılı ve success:true sonrası çalışır. WhatsApp tıklaması whatsapp_click olarak ayrı ölçülür; lead sayılmaz. Instagram reklam parametrelerinde utm_source/medium/campaign kullanımı mevcut attribution sistemi tarafından desteklenir. Meta Pixel/Ads dönüşüm aktarımı doğrulanmış kabul edilmez.

Saklama: etkinlikten önce talep varsa en fazla 90 gün ve belirlenen paylaşım süreci, yoksa etkinlik sonrası otomatik silme. Baskı, personel, kurulum ve müsaitlik kapsamı teklifte netleşir. Kapasite/baskı adedi/yanıt süresi garantisi eklenmedi.

## Kontroller

Typecheck, ESLint, tam pnpm build (Prisma generate/runtime validation/Next production build). Mobil ilk ekranda CTA ve kiosk görseli, taşma yok. Tek H1, canonical ve görünür/schema 8 FAQ eşleşmesi. Galeri seçimi, tema seçkisi, görsel büyütme ve paket ürün ön seçimi kontrol edildi. SMTP bağlantısı/auth mesaj göndermeden doğrulandı; form gönderilmedi ve sahte lead üretilmedi. Production deploy sırasında canlı HTTP/görsel kontroller ayrıca yapılır. DB içerik yazımı yok.

## Kasım 2026 yenilemesi

Sayfa, müşteri sunumundaki dille (koyu kapak, kâğıt renkli oyun bölümü, büyük başlık, mono etiketler) ve sitenin sarı vurgusuyla yeniden kuruldu. Sunumdaki deneyimler eklendi: AI Photo + Video, Momento Ball, AI Karikatür Video, Hediye Çantası, 20.27 Saniye, Kartopu Düellosu, Ağacı Birlikte Süsle, Yılın Quiz’i, Reflex Wall ve VR; ayrıca Mirror Booth, AI Draw Portre, Karaoke, Dans Düellosu. Müşteri adı ve etkinlik bilgisi sayfaya taşınmadı.

Görseller `public/images/yilbasi/sunum/` altında, videolar `public/videos/yilbasi/` altında; boyutlu sürümler `node scripts/make-campaign-variants.mjs` ile `public/images/yilbasi/v/` altına üretilir (yeni görsel eklenince yeniden çalıştırın). Genişliği 800 pikselden küçük görsellerin `-800` sürümü yoktur; bunlar yalnızca video kapağı olarak kullanılır.

Her deneyimde "Teklife ekle" düğmesi seçimi teklif formuna taşır; seçim yapılınca altta bir özet çubuğu görünür. "Detay" bağlantısı yalnızca hizmet yayındaysa çıkar. `/design-preview/yilbasi-2027` veritabanı tüneli kapalıyken statik içerikle açılır.
