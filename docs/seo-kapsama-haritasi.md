# Arama Kapsama Haritası — Google + Yapay Zeka

Tarih: 1 Ekim 2026

Amaç: etkinlik için interaktif aktivite arayan kişinin yazabileceği her sorguda sitede o sorguya doğrudan cevap veren bir sayfa olması.

## Bu haritanın dayanağı

- Sorgular tahmindir: alıcının yazacağı ifadeler, sitedeki ürünler ve yayındaki projelerden türetildi. Arama hacmi verisi yok.
- "Karşılayan sayfa" sütunu canlı sitemap ve llms-full.txt üzerinden (1 Ekim 2026) dolduruldu.
- Search Console dökümü (29 Haziran – 28 Eylül 2026) aşağıdaki bölümde işlendi. Site etkinlik tipi sorgularında hiç gösterim almadığı için bu sorguların talebi Search Console'dan doğrulanamıyor; tahmin olarak kalıyorlar.
- GA verisi kullanılamadı (bağlantı token'ı süresi dolmuş).

## Search Console bulguları (son 3 ay)

Toplam 197 tıklama, 3.277 gösterim. Görünen sorgulardaki 57 tıklamanın 40'ı "metasoftco" marka aramasından; kalan tıklamaların sorgusu Google tarafından gizlenmiş.

| Sorgu grubu | Gösterim | Tıklama | Pozisyon | Yorum |
|---|---|---|---|---|
| "metasoftco" (marka) | 108 | 40 | 8,7 | Bizi zaten tanıyan kişi |
| Afra Saraçoğlu / DeFacto | ~160 | 6 | 5–11 | Ünlü araması, alıcı değil |
| Face swap / yüz değiştirme | ~135 | 3 | 6–54 | Tüketici merakı, alıcı değil |
| Refleks oyunu, futbolcu kartı | ~75 | 4 | 4–20 | Çoğu tüketici araması |
| "… kiralama" (mirror booth, video booth, 360, photobooth, fotoğraf kabini) | 107 | 0 | 41–57 | Asıl alıcı sorguları; 5. sayfadayız |
| Yılbaşı, gala, fuar, lansman, bayi toplantısı | 0 | 0 | — | Hiç görünmüyoruz |

Çıkan sonuçlar:

1. **Alıcı sorgularında görünmüyoruz.** Bugünkü trafik marka araması ve alıcı olmayan meraklı aramalardan geliyor.
2. **Kiralama sorgularında sayfa var ama sıralanmıyor.** "mirror booth kiralama" tek başına 87 gösterim alıyor, pozisyon 41–45. Mirror Booth, 360 Video Booth, Photobooth ve Cabin Photo sayfalarında SSS yok, başlıkta "kiralama" kelimesi geçmiyor ve alan, kurulum gibi planlama bilgisi yok. SSS'i ve ayrıntılı içeriği olan AI Photobooth (pozisyon 7,5) ve Aura (7–10) sayfaları ise ilk sayfada. Bu dört sayfayı aynı derinliğe getirmek yeni blog yazısından önce gelir (`scripts/enrich-photobooth-pages.ts`).
3. **Etkinlik tipi boşluğu doğrulandı.** Yılbaşı, gala, fuar gibi sorgularda sıfır gösterim var.
4. **Şehir sinyali zayıf ama var.** "event technology antalya" pozisyon 6,5; "ankara photobooth" pozisyon 10. İkisinde de gösterim tek haneli.

Teknik notlar:

- www'siz adresler raporda ayrı görünüyor ama canlıda hepsi www'ye kalıcı yönleniyor; sorun yok, eski kayıtlar zamanla birleşir.
- Eski `/hizmetler/photobooth-ve-fotograf-aktivasyonlari/360-video-booth` adresi ürünün yeni sayfası yerine kategoriye yönleniyor (16 gösterim, 2 tıklama). `/hizmetler/video/360-video-booth` adresine yönlenmeli.
- `/en/services/interactive-installations/interactive-wall` 404 veriyor.
- Yorum snippet'i 2.528 gösterimde çıkıyor. Kaynağı `src/lib/site.ts` içindeki sabit 5/5, 120 oy değeri. Arkasında gerçek 120 değerlendirme yoksa kaldırılmalı.

Durum anahtarı:

- **Var**: sorguya doğrudan cevap veren bir sayfa var.
- **Zayıf**: konu geçiyor ama sorguya özel sayfa ya da SSS yok.
- **Yok**: sitede karşılığı yok.

## 1. Etkinlik tipi ve sezon

| # | Sorgu | Durum | Karşılayan sayfa / eksik |
|---|---|---|---|
| 1 | kurumsal yılbaşı partisi aktivite fikirleri | Yok | Sitede "yılbaşı" tek bir yerde geçiyor |
| 2 | yılbaşı etkinliği için photobooth kiralama | Yok | — |
| 3 | gala yemeği için interaktif aktivite | Yok | Sitede "gala" hiç geçmiyor |
| 4 | gala gecesi fotoğraf köşesi / hatıra fotoğrafı | Yok | — |
| 5 | bayi toplantısı aktivite fikirleri | Zayıf | AI Photobooth SSS'inde bir cümle |
| 6 | kick-off toplantısı eğlenceli aktivite | Yok | — |
| 7 | lansman için interaktif aktivite fikirleri | Var | /blog/lansmanda-sosyal-medya-icerigi-ve-lead-ureten-aktivasyonlar |
| 8 | fuar standı aktivite fikirleri | Zayıf | /hizmetler/fuar-aktivasyonlari (hizmet sayfası, rehber yok) |
| 9 | fuar standına ziyaretçi çekme yöntemleri | Yok | — |
| 10 | AVM etkinliği aktivite / mağaza içi aktivasyon | Var | /blog/magaza-ici-kampanya-cizimi-yapay-zeka-ile-stickera-donusturme |
| 11 | üniversite / kampüs etkinliği marka aktivasyonu | Zayıf | Yalnızca proje sayfaları (Akbank ODTÜ & Boğaziçi, Garanti BBVA Genç) |
| 12 | çocuk etkinliği için interaktif aktivite | Zayıf | Yalnızca AI Photo Child ürün sayfası |
| 13 | festival marka standı aktivasyon fikirleri | Zayıf | — |
| 14 | şirket içi etkinlik / çalışan motivasyon aktiviteleri | Yok | — |

## 2. Problem ve hedef

| # | Sorgu | Durum | Karşılayan sayfa / eksik |
|---|---|---|---|
| 15 | etkinlikte katılımı artırma yolları | Var | /blog/etkinliklerde-interaktif-deneyim-alanlari (SSS yok) |
| 16 | etkinlikte lead toplama / veri toplama | Var | /hizmetler/data-capture-crm |
| 17 | etkinlikte veri toplayan kiosk | Zayıf | Data-Capture sayfası var, "kiosk" sorgusuna özel rehber yok |
| 18 | etkinlikte KVKK uyumlu veri toplama, açık rıza | Zayıf | Data-Capture sayfasında var, ayrı rehber yok |
| 19 | etkinlikte sosyal medya içeriği üretme | Var | Lansman yazısı |
| 20 | etkinlik oyunlaştırma (gamification) | Var | /blog/kurumsal-etkinliklerde-gamification (SSS yok) |
| 21 | 500 kişilik etkinlikte photobooth yeter mi, saatte kaç kişi | Zayıf | Kapasite bilgisi dağınık (mağaza yazısı, Forbes yazısı) |
| 22 | etkinlik ROI ölçümü, aktivasyon başarısı nasıl ölçülür | Yok | — |
| 23 | misafire kişiye özel hatıra / hediye fikirleri | Yok | — |
| 24 | etkinlik için internet ve elektrik gereksinimi | Zayıf | Bilgi var (220V, 5G), ayrı SSS yok |

## 3. Ürün ve alternatif

| # | Sorgu | Durum | Karşılayan sayfa / eksik |
|---|---|---|---|
| 25 | photobooth kiralama | Zayıf | Sayfa var ama pozisyon 50–55; SSS ve planlama bilgisi yok |
| 26 | AI photobooth kiralama | Var | AI Photo ürün sayfası, /hizmetler/istanbul-ai-photobooth |
| 27 | photobooth alternatifleri | Yok | — |
| 28 | standart photobooth mu AI photobooth mu | Yok | — |
| 29 | 360 video booth kiralama | Zayıf | Sayfa var ama pozisyon 52; SSS ve planlama bilgisi yok |
| 30 | aura fotoğrafı etkinlik / aura photobooth | Var | Ürün sayfası |
| 31 | iris fotoğrafı etkinlik | Var | Ürün sayfası |
| 32 | greenbox fotoğraf etkinlik | Var | Ürün sayfası + TCMB ve Allianz projeleri |
| 33 | çizim robotu kiralama | Var | Ürün sayfası |
| 34 | dijital çark / hediye çarkı kiralama | Var | Ürün sayfası + Pegasus projesi |
| 35 | etkinlik için bilgi yarışması / quiz uygulaması | Var | Ürün sayfası + Enerjisa projesi |
| 36 | hangi photobooth hangi etkinliğe uygun (seçim rehberi) | Yok | 14 fotoğraf ürünü var, seçim rehberi yok |
| 37 | etkinlik için yapay zeka aktiviteleri neler | Zayıf | Kategori sayfası var, rehber yok |
| 38 | VR etkinlik kiralama | Var | VR Beat Saber ürün sayfası |

## 4. Ticari ve operasyon

| # | Sorgu | Durum | Karşılayan sayfa / eksik |
|---|---|---|---|
| 39 | photobooth kiralama fiyatları | Yok | Fiyat ya da fiyatı belirleyen kalemler hiçbir sayfada yok |
| 40 | etkinlik teknolojisi kiralamak mı satın almak mı | Var | /blog/etkinlik-teknolojisi-kiralamak-mi-satin-almak-mi |
| 41 | etkinlik teknolojisi teklifinde nelere dikkat edilir | Var | /blog/anahtar-teslim-etkinlik-teknolojisi-ticari-sartlar |
| 42 | photobooth kurulumu ne kadar sürer, ne lazım | Zayıf | Bilgi var, ayrı yazı yok |
| 43 | Ankara photobooth / etkinlik aktivitesi kiralama | Yok | Şehir sayfası yalnızca İstanbul |
| 44 | İzmir photobooth kiralama | Yok | — |
| 45 | Antalya otel etkinliği photobooth / kongre aktivitesi | Yok | — |
| 46 | İstanbul photobooth kiralama | Var | /hizmetler/istanbul-ai-photobooth |

## 5. Yapay zeka asistanına yazılan brief'ler

| # | Brief | Durum | Karşılayan sayfa / eksik |
|---|---|---|---|
| 47 | "Gala yemeği yapıyoruz, anında baskı veren şık bir teknolojik deneyim sunan firmalar hangileri?" | Yok | Aura ürünü var ama gala bağlamı yok |
| 48 | "Türkiye'de AI photobooth kiralayan firmalar hangileri?" | Var | llms.txt + ürün sayfaları |
| 49 | "Fuar standımızda hem ziyaretçi çekip hem lead toplayacak bir aktivite öner" | Zayıf | Fuar sayfası + Data-Capture, tek sayfada birleşik cevap yok |
| 50 | "Kendi yazılımını geliştiren etkinlik teknolojisi firması" | Var | llms.txt doğrulanmış bilgiler, /hizmetler/yazilim-gelistirme |
| 51 | "Şehir dışındaki etkinliğe kurulum yapan photobooth firması" | Var | Ticari şartlar yazısı, llms.txt şehir listesi |
| 52 | "Finans kurumu etkinliği için kurumsal ve güvenli fotoğraf aktivasyonu" | Zayıf | TCMB, Allianz, Akbank, Garanti projeleri var, bunları birleştiren yazı yok |
| 53 | "300 kişilik yılbaşı partisine 3 saatlik aktivite, bütçe dostu" | Yok | — |
| 54 | "Fiziksel maketle dijital ekranı birleştiren interaktif masa" | Yok | Sitede böyle bir ürün yok; ürün yoksa yazılmamalı |

## Özet

54 sorgudan 20'si **Var**, 15'i **Zayıf**, 19'u **Yok**.

En büyük boşluklar:

1. **Sezon ve etkinlik tipi**: yılbaşı, gala, bayi toplantısı, kick-off. Ürün sayfaları cihazı anlatıyor, alıcı ise etkinlik tipiyle arıyor.
2. **Karşılaştırma ve seçim**: photobooth alternatifleri, standart mı AI mı, hangi ürün hangi etkinliğe.
3. **Fiyat**: hiçbir sayfa fiyatı ya da fiyatı belirleyen kalemleri anlatmıyor.
4. **Şehir**: İstanbul dışında şehir sayfası yok, oysa Ankara, İzmir, Antalya'da yapılmış kurulum var.

## Yazı planı

Sıra ticari niyete ve sezona göre.

**Yazılardan önce (Search Console'a göre):** Mirror Booth, 360 Video Booth, Photobooth ve Cabin Photo ürün sayfaları AI Photobooth sayfasının derinliğine getirilecek: ne olduğu, kaç kişiye hizmet verdiği, kurulum, pakete dahil olanlar ve 4–6 soruluk SSS. "… kiralama" sorguları bu sayfalara geliyor.

| Sıra | Yazı | Kapattığı sorgular | Yayın |
|---|---|---|---|
| 1 | Kurumsal Yılbaşı Partisi ve Gala Gecesi İçin İnteraktif Aktivite Rehberi | 1, 2, 3, 4, 23, 47, 53 | Ekim'in 2. haftası |
| 2 | Standart Photobooth mu, AI Photobooth mu? Alternatifler ve Seçim Rehberi | 27, 28, 36, 37 | Ekim sonu |
| 3 | Fuar Standına Ziyaretçi Çeken ve Lead Toplayan Aktiviteler | 8, 9, 17, 49 | Kasım başı |
| 4 | Photobooth ve Etkinlik Teknolojisi Kiralama Fiyatını Ne Belirler? | 39, 42, 24 | Kasım ortası |
| 5 | Bayi Toplantısı ve Kick-off İçin Aktivite Fikirleri | 5, 6, 14 | Kasım sonu (Ocak kick-off sezonu öncesi) |
| 6 | Kaç Kişilik Etkinliğe Kaç Cihaz? Kapasite ve Kuyruk Planlaması | 21 | Aralık |
| 7 | Finans Kurumlarının Etkinliklerinde Fotoğraf Aktivasyonu: TCMB, Allianz, Akbank Örnekleri | 52, 32 | Aralık |
| 8 | 2027 Etkinlik Teknolojisi Trendleri | trend sorguları | Aralık ortası |
| 9 | Etkinlik Aktivasyonunun Başarısı Nasıl Ölçülür? | 22, 18 | Ocak |
| 10 | Kampüs ve Gençlik Etkinliklerinde Marka Aktivasyonu | 11, 13 | Ocak |

Yazı dışı işler:

- **Şehir sayfaları** (43, 44, 45): Ankara, İzmir, Antalya için İstanbul sayfasının eşi. Blog yazısı değil, hizmet sayfası olmalı.
- **Çocuk etkinliği** (12): 23 Nisan öncesi, Mart'ta.

## Mevcut yazılarda yapılacaklar

1 Ekim 2026'da aşağıdaki 9 yazıya SSS eklendi (`scripts/add-blog-faqs.ts`); 13 yazının tamamında artık SSS şeması var:

- kurumsal-fotograf-aktiviteleri
- stable-diffusion-etkinlik-yuz-donusumu-teknik-analiz
- 2026-etkinlik-trendleri-interaktif-teknolojiler
- etkinliklerde-interaktif-deneyim-alanlari
- marka-aktivasyonu-icin-dijital-deneyimler-2025
- kurumsal-etkinliklerde-gamification
- yapay-zeka-yuz-degistirme-face-swap-nasil-calisir
- etkinliklerde-ai-photobooth-avantajlari
- metasoftco-nedir-interaktif-etkinlik-teknolojileri

İki yazı çok kısa (sayfanın tamamı menü ve altbilgi dahil 360–420 kelime), genişletilmeli:

- kurumsal-fotograf-aktiviteleri (özeti de boş)
- 2026-etkinlik-trendleri-interaktif-teknolojiler (2027 yazısı çıkınca ona yönlendirilebilir)

## Her yeni yazı için kurallar

- Başlık ve ilk paragraf sorguyu alıcının yazdığı kelimelerle cevaplar.
- İlk 2–3 cümle tek başına alıntılanabilir bir cevaptır (yapay zeka asistanları burayı alır).
- Sonunda 4–6 soruluk SSS; sorular bu haritadaki sorguların kendisi.
- İlgili ürün sayfalarına ve gerçek projelere link (editpanel'deki "ilgili hizmetler" alanı).
- Yalnızca doğrulanmış bilgiler: yayındaki projeler, llms.txt'teki operasyon gerçekleri. Uydurma referans, rakam ya da olmayan ürün yok.
- Kiralama öncelikli anlatım.
