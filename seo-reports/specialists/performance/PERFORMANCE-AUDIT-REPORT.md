# MetasoftCo Performans Denetimi

- URL: https://www.metasoftco.com/
- Tarih: 2026-09-11
- Birleşik laboratuvar skoru: **90/100**
- Mobil Lighthouse: **93/100**
- Masaüstü Lighthouse: **86/100**
- API anahtarı: kullanılmadı

## Ölçümler

| Metrik | Mobil | Masaüstü | Hedef | Durum |
|---|---:|---:|---:|---|
| Performance | 93 | 86 | 90+ | Mobil iyi, masaüstü iyileştirilebilir |
| LCP | 3,07 sn | 2,55 sn | <2,5 sn | Yüksek öncelik |
| CLS | 0,000 | 0,000 | <0,1 | Geçti |
| TBT | 90 ms | 0 ms | <200 ms | Geçti (lab proxy) |
| FCP | 1,42 sn | 0,40 sn | <1,8 sn | Geçti |
| Speed Index | 1,77 sn | 0,89 sn | <3,4 sn | Geçti |
| INP | Kullanılamıyor | Kullanılamıyor | <200 ms | Saha verisi gerekli |

INP, laboratuvar çalışmasından türetilmedi. Kurulu performans betiğinin 500 ms tahmini gerçek bir CWV ölçümü olmadığı için karar metriği olarak kullanılmadı.

## Yüksek öncelikli işler

1. **LCP görselini hızlandırın.** Mobil LCP öğesi `p2-signal-portal` içindeki Ray-Ban görseli. Görsel erken keşfediliyor olsa da LCP 3,07 sn; uygun preload/fetch priority, doğru `sizes` ve daha küçük ilk kaynak denenmeli.
2. **Görsel aktarımını azaltın.** Lighthouse mobilde yaklaşık 579 KiB, masaüstünde 643 KiB potansiyel tasarruf hesapladı. `/phase2/signal-atmosphere-v2.png` tek başına yaklaşık 487 KiB tasarruf fırsatı oluşturuyor.
3. **Kullanılmayan JavaScript'i azaltın.** Yaklaşık 309 KiB mobil tasarruf var. En büyük pay Google Tag Manager/gtag, Yandex Metrica ve iki Next.js chunk'ından geliyor.

## Orta öncelikli işler

- Mobilde iki CSS kaynağı yaklaşık 390 ms render engelleme potansiyeli taşıyor.
- Mobil aktarım 2,21 MB/81 istek, masaüstü 2,36 MB/93 istek. İlk ekran dışı üçüncü taraf ve görsel kaynaklarını geciktirin.
- Logo dosyası 1803×710 iken yaklaşık 156×61 gösteriliyor; responsive logo varyantı kullanın.
- Bazı harici SVG ve analitik dosyalarının cache ömrü kısa veya sıfır. Kontrol edilebilen kaynaklarda daha uzun cache politikası uygulayın.

## Ek kalite skorları

| Kategori | Mobil | Masaüstü |
|---|---:|---:|
| Accessibility | 96 | 96 |
| Best Practices | 77 | 77 |
| SEO | 100 | 100 |

## Sınırlamalar

- Lighthouse tek koşuluk laboratuvar ölçümüdür; ağ ve CPU koşullarına göre değişebilir.
- CrUX saha verisi ile gerçek kullanıcı INP/LCP/CLS değerleri API anahtarsız elde edilemedi.
- Ham SEO betiğinin 35/100 sezgisel skoru yalnızca fallback'tir; yerel Lighthouse sonuçları bulunduğu için nihai performans skorunda kullanılmadı.
