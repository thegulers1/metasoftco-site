# MetasoftCo Teknik SEO Denetimi

- URL: https://www.metasoftco.com/
- Tarih: 2026-09-11
- Düzeltilmiş teknik skor: **90/100**
- Paket betiğinin ham skoru: **84/100**
- Veri kaynakları: canlı HTTP/HTML, robots.txt, sitemap.xml, yerel Lighthouse ve Codex SEO betikleri
- API anahtarı: kullanılmadı

## Kategori özeti

| Kategori | Durum | Skor |
|---|---:|---:|
| Crawlability | Geçti | 100 |
| Indexability | Geçti | 100 |
| Security | Uyarı | 88 |
| URL Structure | Geçti | 100 |
| Mobile | Geçti | 100 |
| Core Web Vitals | Uyarı | 70 |
| Structured Data | Geçti | 92 |
| JS Rendering | Geçti | 90 |
| IndexNow | Uyarı | 68 |

Skor, paket betiğinin sitemap canonical ayrıştırma hatası giderilerek ve API'siz yerel Lighthouse bulguları dikkate alınarak normalize edilmiştir. Ham betik, Core Web Vitals için 35/100 sezgisel skor üretmiş ve sitemap canonical kontrolünde hatalı ceza uygulamıştır.

## Kritik bulgu

Kritik erişim veya indeksleme engeli bulunmadı. HTTPS zorlanıyor, ana sayfa 200 dönüyor, self-canonical mevcut, robots.txt erişilebilir ve sitemap'i açıkça bildiriyor. Ana sayfadaki kritik SEO içeriği ilk HTML yanıtında görülebiliyor.

## Yüksek öncelik

1. **LCP hedefin üzerinde.** Yerel Lighthouse mobilde 3,07 sn, masaüstünde 2,55 sn ölçtü; her ikisi de 2,5 sn hedefini aşıyor. Mobil LCP öğesi Ray-Ban hero/proje görseli.
2. **İçerik Güvenlik Politikası eksik.** HSTS, X-Frame-Options, X-Content-Type-Options ve Referrer-Policy var; `Content-Security-Policy` yanıt başlığı yok.

## Orta öncelik

1. **IndexNow algılanmadı.** Bing/Yandex keşfi önemliyse yayın akışına eklenebilir; Google indekslemesini etkilemez.
2. **Sitemap'te gereksiz etiketler var.** 167 URL'nin tamamında artık arama motorlarınca dikkate alınmayan `priority` ve `changefreq` alanları bulunuyor.
3. **Saha CWV verisi yok.** API anahtarsız çalışmada CrUX/PSI alan verisi alınamadı; INP bu nedenle ölçülmedi ve tahmin edilmedi.

## Sitemap doğrulama notu

Kurulu `analyze_sitemap.py` betiği ilk taramada 71 canonical uyuşmazlığı bildirdi. Betiğin `href` değerini `rel="canonical"` çevresinde metin aramasıyla seçmesi bazı URL'leri `tps://...` veya `ww...` biçiminde kesiyor. BeautifulSoup ile bağımsız yeniden kontrolde ilk 100 sitemap URL'sinin tamamı 200 döndü; canonical eksikliği veya uyuşmazlığı bulunmadı. Bu nedenle canonical uyarısı gerçek site sorunu olarak rapora alınmadı.

## Olumlu sinyaller

- HTTP ve çıplak alan adı tek adımda `https://www.metasoftco.com/` adresine 308 ile yönleniyor.
- robots.txt önemli sayfaları engellemiyor ve GPTBot, ClaudeBot, PerplexityBot ile Google-Extended erişimine izin veriyor.
- Sitemap 167 indekslenebilir aday içeriyor ve robots.txt içinde bildiriliyor.
- Viewport etiketi, self-canonical ve yapılandırılmış veri mevcut.
- Googlebot ve standart istemci için kritik içerik ilk HTML yanıtında mevcut.

## Sınırlamalar

- Google Search Console, CrUX ve PageSpeed API kimlik bilgileri kullanılmadı.
- Sitemap canonical yeniden doğrulaması 167 URL'nin ilk 100'ünü kapsar.
- Performans ölçümleri laboratuvar verisidir; 75. yüzdelik gerçek kullanıcı CWV verisi değildir.
