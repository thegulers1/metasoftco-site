# Özel gün ve etkinlik türü sayfaları: yazılım briefi

Hazırlanma: 10 Kasım 2026. Kaynaklar: Google Ads anahtar kelime planlayıcısı (Türkiye, Türkçe, son 12 ay) ve Search Console (son 90 gün).

## Amaç

Etkinlik türüne göre arama yapanları ("lansman organizasyonu", "avm etkinlik" gibi) kendi konusuna özel bir sayfaya getirmek. Bu sayfalar aynı zamanda:
- Google Ads reklamlarının açılış sayfası olur. Reklamla sayfa birebir uyuşunca kalite puanı yükselir, tıklama ucuzlar.
- Satış maillerinde "buraya tıklayabilirsiniz" bağlantısı olarak kullanılır (AVM, koşu sponsorları gibi).

## Veriden çıkan üç önemli bulgu

1. **İnsanlar "X photobooth" diye aramıyor, etkinliğin kendisini arıyor.**
   - "Düğün photobooth", "nişan photobooth", "mezuniyet photobooth" ve "festival aktivasyon" için Google ölçülebilir hacim vermiyor.
   - Buna karşılık "nişan organizasyon" (4.400/ay), "doğum günü organizasyonu" (3.600/ay) ve "lansman organizasyonu" (260/ay) aranıyor.
   - Sonuç: sayfa başlıkları etkinlik adıyla kurulmalı, ürün adıyla değil.
2. **Site şu an bu konuların hiçbirinde görünmüyor.** Search Console'da etkinlik türüyle ilgili tek tük sorgu var ("kurumsal photobooth kiralama": 13 gösterim, ortalama sıra 46). Yeni sayfalar organikte haftalar içinde yükselir. Yılbaşı için asıl faydası reklam açılış sayfası olmaları.
3. **Kurumsal aramalar az ama değerli.** Nişan, kına, düğün gibi bireysel davetler kapsam dışı; sayfalar yalnızca kurumsal alıcılara yazılacak. "Şirket etkinliği" ayda 90 arama alıyor, ama tıklaması 159 TL.

## Öncelik sırası

| # | Sayfa | Neden | Ne zaman |
|---|---|---|---|
| 1 | AVM etkinlikleri | AVM'lere mail atıyoruz; yılbaşı sezonu şimdi. "avm etkinlik" 110/ay, tıklama 29 TL | Bu hafta |
| 2 | Lansman ve bayi toplantısı aktiviteleri | "lansman organizasyonu" 260/ay, tıklama 43 TL | Bu hafta |
| 3 | Çalışan etkinlikleri (yaz partisi, aile günü, ödül gecesi) | "şirket etkinliği" 90/ay, tıklama 159 TL; 2027 bütçeleri ocakta planlanır | Aralık |
| 4 | Koşu ve maraton aktivasyonları | Aramadan az trafik gelir ("kurumsal koşu" 30/ay), asıl işi sponsor markalara satış sayfası olmak. Bahar koşuları için sponsorlar şimdiden planlıyor | Aralık–Ocak |
| 5 | Mezuniyet balosu aktiviteleri | "mezuniyet balosu" 720/ay; alıcı okul ve öğrenci toplulukları; sezon mayıs–haziran | Şubat–Mart |

Ramazan (`ramazan-etkinlikleri`), yılbaşı (`yilbasi-partisi-aktiviteleri`) ve fuar (`fuar-aktivasyonlari`) sayfaları zaten var, yeniden yapılmayacak. Ramazan sayfasına yalnızca bir ekleme önerisi var (aşağıda).

## Teknik uygulama (tüm sayfalar için)

- Mevcut **occasion sistemi** kullanılacak:
  - İçerik: `src/lib/occasions.ts` içine yeni kayıt.
  - Sayfa: `src/app/(site)/hizmetler/<slug>/page.tsx` dosyasında `OccasionPage` ve `occasionMetadata` çağıran ince bir sayfa (yılbaşı örneğindeki gibi).
- Aşağıdaki hizmet ve proje slug'ları veritabanında **yayında olmalı**. Yayında olmayan slug'ı listeden çıkarın, sayfada boş kart kalmasın.
- Her sayfa için:
  - Sitemap'e ekleyin.
  - FAQ şeması basın (OccasionPage zaten yapıyorsa kontrol edin).
  - Canonical: `https://www.metasoftco.com/hizmetler/<slug>`.
- **İç linkler:**
  - `/hizmetler` sayfasına bir "Etkinlik türüne göre" bölümü ekleyin, tüm occasion sayfalarını listeleyin.
  - İlgili hizmet sayfalarının altına "Bu deneyim şu etkinliklerde kullanılıyor" bağlantıları koyun.
- **Form:** teklif formuna gizli `occasion=<slug>` alanı ekleyin. Hangi sayfadan teklif geldiğini GA4'te (`generate_lead` olayı, `occasion` parametresi) ve gelen mailde görelim.
- **Metin kuralları:**
  - Gerçekleşmemiş iş, rakam veya müşteri adı yazılmayacak.
  - Projeler bölümünde yalnızca gerçek proje slug'ları kullanılacak.
  - Garanti dili kullanılmayacak ("kesin", "garanti" gibi). Müsaitlik ve kapsam "teklifte netleşir" diye anlatılacak.

---

## 1. AVM etkinlikleri

- **slug:** `avm-etkinlikleri`
- **name:** AVM etkinlikleri
- **Hedef kitle:** AVM pazarlama ve etkinlik müdürleri, AVM'de aktivasyon yapan markalar
- **keywords:** avm etkinlik, avm etkinlikleri, avm aktivasyon, avm yılbaşı etkinliği, avm çocuk etkinliği, alışveriş merkezi etkinlik
- **metaTitle:** AVM Etkinlikleri: AI Photobooth, 360 Video ve İnteraktif Oyunlar | MetasoftCo
- **metaDescription:** AVM'niz için yılbaşı, bayram ve özel gün etkinlikleri: AI photobooth, 360 video booth, interaktif oyun ve hediye çarkı. Ziyaretçi akışına göre kurgu ve teklif alın.
- **h1:** AVM'nize ziyaretçinin durup vakit geçirdiği bir alan.
- **lede:** Yılbaşı, bayram, sevgililer günü ve anneler günü dönemlerinde AVM ziyaretçileri için fotoğraf, video ve oyun deneyimleri. Alan, ziyaretçi akışı ve kampanya takviminize göre birlikte planlayalım.
- **tiersTitle:** Alanınıza göre öneri
- **tiers:**
  - *Koridor noktası*: Tek bir fotoğraf noktası, AVM logolu baskı ya da QR ile dijital paylaşım. Ürünler: AI Photo, Strip Photo
  - *Atrium etkinliği*: Fotoğraf noktası, çocuklu aileler için interaktif oyun ve hediye çarkı. Ürünler: AI Photo, İnteraktif Oyun, Hediye Çarkı
  - *Sezon kurgusu*: Haftalarca süren dönemler için tek kioskta birden fazla deneyim. İçerik haftalık değiştirilebilir. Ürünler: AI Photo, 360 & GIF Video Booth, İnteraktif Oyun, Hediye Çarkı
- **flowTitle:** Bir ziyaretçinin deneyimi
- **flow:**
  1. *Durma*: Atriumda dikkat çeken ekran, kısa ve anlaşılır bir davet.
  2. *Deneyim*: Birkaç saniyede biten AI fotoğraf, oyun turu veya çark.
  3. *Paylaşım*: Fotoğraf QR ile telefona, isteğe göre baskı. AVM'nin sosyal medya etiketiyle.
  4. *Veri (isteğe bağlı)*: Ziyaretçi izin verirse iletişim bilgisi KVKK'ya uygun toplanır ve AVM'ye raporlanır.
- **servicesTitle:** AVM'lerde kullanılan deneyimler
- **services:**
  - `ai-photobooth-kirala`: Sezona göre tema; yılbaşında kar küresi, bayramda geleneksel çerçeve.
  - `strip-photo`: Ailece çekilen şerit kareler, AVM logolu baskı.
  - `360-video-booth`: Sosyal medyada paylaşılan kısa videolar.
  - `dijital-hediye-carki-aktivasyonu`: Mağaza indirim kuponu veya hediye dağıtımı.
  - `interaktif-kiosk`: Tek kioskta birden fazla oyun ve deneyim.
  - `ai-football-card`: Maç dönemlerinde futbol kartı.
  - `data-capture-crm` (hizmet sayfası varsa link): İzinli ziyaretçi verisi ve raporlama.
- **projectsTitle:** AVM'lerden
- **projectSlugs:** `akmerkez-x-ai-football-card` (yayındaysa)
- **faqs:**
  - *AVM yönetiminin izin süreçlerine uyuyor musunuz?* Kurulum saatleri, elektrik, güvenlik ve alan kuralları AVM teknik ekibiyle önceden planlanır.
  - *Birkaç haftalık kurulum yapılabiliyor mu?* Evet. Günlük ya da dönemlik planlanabilir. Saha ekibi ve içerik değişim takvimi teklifte belirtilir.
  - *Mağazalarımız kampanyaya dahil olabilir mi?* Hediye çarkında mağaza kuponları dağıtılabilir; hangi mağazaların katılacağını siz belirlersiniz.
  - *Ziyaretçi verisi topluyor musunuz?* Yalnızca ziyaretçinin açık izniyle ve KVKK bilgilendirmesiyle. Kapsam projeye göre belirlenir.
  - *Fiyat nasıl belirleniyor?* Süre, alan, seçilen deneyimler, baskı ve saha ekibine göre. Tarih ve alanı paylaşarak teklif alabilirsiniz.
- **closing:** "AVM'nizin sezon takvimini planlayalım" / Kampanya dönemini, alanı ve beklediğiniz ziyaretçi sayısını paylaşın; size uygun kurguyu ve teklifi hazırlayalım.

## 2. Lansman ve bayi toplantısı aktiviteleri

- **slug:** `lansman-aktiviteleri`
- **name:** Lansman ve bayi toplantısı
- **Hedef kitle:** Marka pazarlama ekipleri, lansman ajansları, satış/bayi kanalı yöneticileri
- **keywords:** lansman organizasyonu, ürün lansmanı aktivite, lansman etkinliği fikirleri, bayi toplantısı aktivite, bayi toplantısı organizasyonu, basın lansmanı
- **metaTitle:** Lansman ve Bayi Toplantısı Aktiviteleri: AI Photo, Quiz, Momento Ball | MetasoftCo
- **metaDescription:** Ürün lansmanı ve bayi toplantıları için ürününüzü konuşturan interaktif deneyimler: ürünlü AI fotoğraf, canlı quiz, hareketli kart ve hediye çarkı. Teklif alın.
- **h1:** Lansmanınızda ürününüz, misafirlerin elinde kalsın.
- **lede:** Lansman ve bayi toplantılarında ürünü ve mesajı merkeze alan fotoğraf, oyun ve yarışma deneyimleri. Misafir tipi ve akışa göre birlikte kurgulayalım.
- **tiers:**
  - *Basın lansmanı (30–100 kişi)*: Ürünlü AI fotoğraf ve hareketli kart. Ürünler: AI Photo, Hareketli GIF Kart
  - *Bayi toplantısı (100–500)*: Ürün bilgisi üzerine canlı quiz, ödül çarkı, fotoğraf noktası. Ürünler: Canlı Quiz, Hediye Çarkı, AI Photo
  - *Halka açık lansman (500+)*: Birden fazla nokta, 360 video, Momento Ball. Ürünler: AI Photo, 360 & GIF Video Booth, Momento Ball
- **flow:** Karşılama (ürünlü fotoğraf) → Sunum (ürün üzerine canlı quiz) → Ödül (çark) → Hatıra (hareketli kart veya Momento Ball)
- **services:** `ai-photobooth-kirala`, `hareketli-fotograf-gif-kart-aktivasyonu-kiralama`, `momento-ball`, `quiz-bilgi-yarismasi`, `dijital-hediye-carki-aktivasyonu`, `360-video-booth`, `ai-fashion-mirror` (moda/perakende lansmanı)
- **projectSlugs:** `adidas-evo-sl-x-ai-try-on-photo`, `defacto-x-momento-ball-photo`, `defacto-x-afra-saracoglu-ai-fashion-experience`, `ray-ban-x-strip-photo` (yayında olanlar)
- **faqs:** Ürün görselleri fotoğraflara nasıl giriyor? · Quiz soruları kimden geliyor? (Sorular sizden gelir, biz ekrana uyarlarız.) · Ajansımızla birlikte çalışabilir misiniz? · Gizlilik: lansman öncesi ürün görselleri nasıl korunuyor? · Fiyat.

## 3. Çalışan etkinlikleri

- **slug:** `calisan-etkinlikleri`
- **name:** Çalışan etkinlikleri
- **Hedef kitle:** İK, işveren markası ve iç iletişim ekipleri
- **keywords:** şirket etkinliği, şirket etkinlikleri, çalışan etkinlikleri, şirket içi motivasyon etkinlikleri, kurumsal yaz partisi, aile günü etkinliği, ödül gecesi organizasyonu
- **metaTitle:** Çalışan Etkinlikleri: Yaz Partisi, Aile Günü ve Ödül Gecesi Aktiviteleri | MetasoftCo
- **metaDescription:** Şirket içi etkinlikler için AI photobooth, canlı quiz, oyunlar ve hediye çarkı. Yaz partisi, aile günü, ödül gecesi ve bayramlaşma için teklif alın.
- **h1:** Çalışanlarınızın konuşacağı bir şirket etkinliği.
- **tiers:** Ofis içi (50–150) / Tüm şirket (150–500) / Aileler dahil (500+, çocuk oyunları ile)
- **flow:** Karşılama fotoğrafı → Departmanlar arası quiz → Çocuklar için oyun alanı (aile günü) → Çekiliş
- **services:** `ai-photobooth-kirala`, `quiz-bilgi-yarismasi`, `reflex-wall`, `vr-beat-saber-kiralama`, `dijital-hediye-carki-aktivasyonu`, `magazine-cover` (ödül gecesi), `karaoke`
- **projectSlugs:** `rollic-summer-party-x-seri-t-foto`, `enerjisa-quiz-uygulamasi`, `bsh-x-ai-draw`, `allianz-x-ai-greenbox` (yayında olanlar)
- **Not:** Yılbaşı sayfasına ve Ramazan sayfasına çapraz link verin ("Yılbaşı partisi için", "Ramazan ve iftar için").

## 4. Koşu ve maraton aktivasyonları

- **slug:** `kosu-maraton-aktivasyonlari`
- **name:** Koşu ve maraton aktivasyonları
- **Hedef kitle:** Koşu sponsoru markalar (spor giyim, banka, telekom, içecek), koşu organizatörleri, kurumsal koşu takımı kuran şirketler
- **keywords:** maraton aktivasyon, koşu etkinliği sponsor aktivasyonu, maraton stand aktivitesi, kurumsal koşu, maraton fotoğraf, bitiş çizgisi fotoğrafı
- **metaTitle:** Koşu ve Maraton Aktivasyonları: Bitiş Fotoğrafı, AI Koşucu Kartı | MetasoftCo
- **metaDescription:** Maraton ve koşu etkinliklerinde sponsor standları için AI bitiş fotoğrafı, koşucu kartı, 360 video ve refleks oyunları. Koşucu yoğunluğuna uygun hızlı akış. Teklif alın.
- **h1:** Koşucunun bitişten sonra ilk durduğu stand sizinki olsun.
- **lede:** Koşu ve maratonlarda sponsor markalar için madalyalı AI fotoğraf, kişiye özel koşucu kartı ve hız oyunları. Yoğun bitiş alanına uygun, sıra bekletmeyen akış.
- **tiers:** Kurumsal koşu takımı / Sponsor standı / Ana sponsor (birden fazla nokta)
- **flow:** Isınma alanında refleks oyunu → Bitişte madalyalı AI fotoğraf → Kişiye özel koşucu kartı (derece ve marka ile) → Sosyal medyada paylaşım
- **services:** `ai-photobooth-kirala`, `ai-football-card` (koşucu kartı uyarlaması olarak anlatılabilir, slug korunur), `reflex-wall`, `reflex-game-hiz-ve-rekabet-oyunu`, `360-video-booth`, `adidas-evo-sl-x-ai-try-on-photo` (yalnızca proje olarak, hizmet değil)
- **projectSlugs:** `adidas-evo-sl-x-ai-try-on-photo` (koşu ayakkabısı lansmanı, yayındaysa)
- **faqs:** Binlerce koşucuya yetişir mi? (Akış ve nokta sayısı katılımcı sayısına göre planlanır.) · Dış mekânda, yağmurda çalışır mı? (Çadır, elektrik ve hava koşulu planı teklifte.) · Derece bilgisini karta koyabilir miyiz? (Organizasyonun zamanlama sistemiyle entegrasyon projeye göre değerlendirilir.) · Fiyat.
- **Not:** Bu sayfa aramadan az trafik alır. Asıl kullanımı koşu sponsorlarına giden satış maillerinde bağlantı olmak.

## 5. Mezuniyet balosu aktiviteleri

- **slug:** `mezuniyet-balosu-aktiviteleri`
- **name:** Mezuniyet balosu
- **Hedef kitle:** Lise ve üniversite mezuniyet komiteleri, okul yönetimleri, balo organizatörleri
- **keywords:** mezuniyet balosu, mezuniyet balosu organizasyonu, mezuniyet balosu fikirleri, mezuniyet töreni photobooth
- **metaTitle:** Mezuniyet Balosu Aktiviteleri: Photobooth, 360 Video, Dergi Kapağı | MetasoftCo
- **h1:** Mezuniyet gecesinden paylaşılacak kareler.
- **services:** `strip-photo`, `360-video-booth`, `magazine-cover`, `glow-box-photo`, `ai-photobooth-kirala`, `mirror-booth`
- **Not:** Sayfa şubat–mart arasında yayına girsin, sezon mayıs–haziran.

## Mevcut Ramazan sayfasına ek (yeni sayfa değil)

`ramazan-etkinlikleri` sayfasına eklenecekler:
- **Anahtar kelimeler:** "iftar organizasyonu" (140/ay) ve "kurumsal iftar".
- **SSS:** "Kurumsal iftar davetimizde kurulum yapabiliyor musunuz?" sorusu.
- **Kapsam:** "ramazan etkinlikleri" 6.600/ay aranıyor ama çoğu bireysel. Sayfanın kurumsal ve belediye odağı korunmalı.

## Yayından sonra (pazarlama tarafı, yazılım değil)

- Her sayfa yayına girince Search Console'dan indeksleme istenecek.
- AVM ve lansman sayfaları Google Ads'te ayrı reklam gruplarına açılış sayfası olacak (onay alınarak).
- Satış maillerinde ilgili sayfaya bağlantı verilecek.
