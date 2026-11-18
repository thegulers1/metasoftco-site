# 18 Kasım 2026 — sektör URL geçişi ve etkinlik yazılımı sayfası

- Yeni, bağımsız hizmet sayfası: `/hizmetler/markaya-ozel-etkinlik-yazilimi`. Yazılım türleri, süreç, teslim takviminin nasıl belirlendiği, Rollic/Ray-Ban/Enerjisa proje bağlantıları, teklif CTA ve SSS içerir. Fiyat eklenmedi. Genel yazılım kategorisi korunur ve yeni sayfaya bağlantı verir.
- TR sektör ana/alt sayfaları: `/sektorel-yazilim-cozumleri` → `/sektorel-etkinlik-cozumleri`.
- EN karşılıkları: `/en/industry-software-solutions` → `/en/industry-event-solutions`.
- Eski adresler Next redirects ile açıkça **301** döner, alt yol ve sorgu korunur. Eski `tekstil-sektoru` kısa adı doğrudan mevcut tekstil içeriğinin yeni adresine gider.
- Menü, footer, dil eşleştirme, canonical/hreflang, sitemap, breadcrumb, yönetim paneli önizlemeleri ve cache revalidation adresleri güncellendi.
- Veritabanındaki sektör slug'ları değişmedi; içerik kaybı veya çift kayıt oluşturulmadı.
- `scripts/check-sector-migration.py [base-url]`: 18 ana/alt TR/EN adresi + kısa tekstil adresi + sorgu parametreli adres olmak üzere 20 yönlendirmeyi, yeni hedeflerin 200/self-canonical olmasını, yeni hizmetin Service schema'sını ve sitemap'i kontrol eder.
- Lokal üretim derlemesi ve 20 yönlendirme kontrolü başarılı. Canlı kontrol sonucu `tmp/route-migration/live-verification.json` içine kaydedilir.
