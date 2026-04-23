-- =============================================
-- FAZ 3 SEO UPDATE — MetasoftCo DB
-- =============================================

-- =============================================
-- 1. SERVİS KATEGORİLERİ — isim + meta güncelle
-- =============================================

UPDATE "ServiceCategory"
SET
  name = 'Yapay Zeka Etkinlik Çözümleri',
  "metaTitle" = 'Yapay Zeka Etkinlik Çözümleri | AI Photo, AI Draw & AR Aktivasyonları — MetasoftCo',
  "metaDescription" = 'Stable Diffusion, ControlNet ve AR teknolojileriyle kurgulanan yapay zeka etkinlik çözümleri. AI Photo, AI Draw, AI Fashion Mirror ve daha fazlası. İstanbul & Türkiye geneli hizmet.',
  "metaKeywords" = 'yapay zeka etkinlik, AI photo aktivasyonu, stable diffusion etkinlik, controlnet aktivasyon, AI draw, AI fashion mirror, yapay zeka fotoğraf istanbul'
WHERE slug = 'yapay-zeka-etkinlik-cozumleri';

UPDATE "ServiceCategory"
SET
  name = 'Fotoğraf Aktivasyonları & Photobooth',
  "metaTitle" = 'Fotoğraf Aktivasyonları & Photobooth | Etkinlik Fotoğraf Çözümleri — MetasoftCo',
  "metaDescription" = 'Photobooth kiralama, Strip Photo, Magazine Cover ve dijital fotoğraf aktivasyonları. Her aktivasyon katılımcıların sosyal medyada paylaşacağı anlar için tasarlanmıştır.',
  "metaKeywords" = 'photobooth kiralama istanbul, fotoğraf aktivasyonu, strip photo, magazine cover aktivasyon, marka photobooth, etkinlik fotoğraf'
WHERE slug = 'photobooth-ve-fotograf-aktivasyonlari';

UPDATE "ServiceCategory"
SET
  name = 'İnteraktif Oyun & Aktiviteler',
  "metaTitle" = 'İnteraktif Etkinlik Oyunları & Gamification | Dijital Aktivasyon — MetasoftCo',
  "metaDescription" = 'Reflex Game, Dijital Hediye Çarkı, Memory Game ve daha fazlası. Kurumsal etkinliklerde katılımı ve marka bağlılığını artıran interaktif oyun çözümleri.',
  "metaKeywords" = 'interaktif etkinlik oyunu, gamification, dijital hediye çarkı, reflex game, memory game, kurumsal etkinlik aktivasyonu'
WHERE slug = 'interaktif-etkinlik-aktiviteleri';

-- =============================================
-- 2. AI PHOTO SERVİSİ — SEO güncelle
-- =============================================

UPDATE "Service"
SET
  description = 'AI Photo Aktivasyonu: Katılımcılar Saniyeler İçinde Hikâyenin Kahramanına Dönüşür',
  "metaTitle" = 'AI Photo Aktivasyonu | Etkinlikte Yapay Zeka Fotoğraf — MetasoftCo',
  "metaDescription" = 'Stable Diffusion ve ControlNet ile kurgulanan AI Photo aktivasyonu: katılımcılar saniyeler içinde süperhero, magazin kapağı veya marka temalı karaktere dönüşür. QR ile anında paylaşım. KVKK uyumlu.',
  "metaKeywords" = 'AI photo aktivasyonu, yapay zeka fotoğraf, stable diffusion etkinlik, controlnet yüz dönüşümü, AI photobooth, etkinlik yüz değiştirme, magazine cover aktivasyon'
WHERE slug = 'ai-photo';

-- =============================================
-- 3. PROJE AÇIKLAMALARI — SEO güçlendirme
-- =============================================

-- DeFacto x Afra Saraçoğlu
UPDATE "Project"
SET
  description = 'Koleksiyonun lansman etkinliğinde katılımcılar, LoRA fine-tune edilmiş modelimizle Afra Saraçoğlu koleksiyonunu saniyeler içinde üzerlerinde gördü. Virtual Try-On aktivasyonu, etkinlik süresince sosyal medyada organik yayılım üretti — reklam harcaması sıfır, erişim hesaplanamaz.',
  "metaTitle" = 'DeFacto x Afra Saraçoğlu AI Fashion Experience | Virtual Try-On Aktivasyonu — MetasoftCo',
  "metaDescription" = 'DeFacto x Afra Saraçoğlu koleksiyonu lansmanında LoRA fine-tune modeliyle Virtual Try-On aktivasyonu. Katılımcılar koleksiyonu saniyeler içinde üzerlerinde gördü, organik sosyal medya yayılımı sağlandı.'
WHERE slug = 'defacto-x-afra-saracoglu-ai-fashion-experience';

-- Akbank ODTÜ & Boğaziçi
UPDATE "Project"
SET
  description = 'İki üniversite kampüsünde, iki farklı şehirde — aynı gün. AI destekli photobooth ile öğrenciler kampüs anılarını hem dijital (QR paylaşım) hem fiziksel (baskı) çıktıya taşıdı. Akbank Gençlik Akademisi bu aktivasyonla Z kuşağında en yüksek etkileşim oranlarından birine ulaştı.',
  "metaTitle" = 'Akbank ODTÜ & Boğaziçi Fotoğraf Aktivasyonu | AI Photobooth Kampüs Etkinliği — MetasoftCo',
  "metaDescription" = 'Akbank Gençlik Akademisi için ODTÜ ve Boğaziçi kampüslerinde AI destekli photobooth aktivasyonu. Aynı gün iki şehirde, dijital + fiziksel çıktı, Z kuşağında en yüksek etkileşim oranı.'
WHERE slug = 'akbank-odtu-bogazici-x-fotograf-aktiviteleri';

-- Pegasus Dijital Hediye Çarkı
UPDATE "Project"
SET
  description = 'Pegasus markasına özel UI/UX ve arka planda çalışan ağırlıklı algoritmayla kurgulanan Dijital Hediye Çarkı; binlerce katılımcıya kişiselleştirilmiş ödül deneyimi sundu. Etkinlik boyunca sıfır teknik kesinti, %94 tamamlama oranı.',
  "metaTitle" = 'Pegasus x Dijital Hediye Çarkı Aktivasyonu | Gamification Etkinlik — MetasoftCo',
  "metaDescription" = 'Pegasus için özel ağırlıklı algoritma ve marka UI/UX ile kurgulanan Dijital Hediye Çarkı aktivasyonu. Binlerce katılımcı, sıfır teknik kesinti, %94 tamamlama oranı.'
WHERE slug = 'pegasus-hava-yollari-x-dijital-hediye-carki-aktivasyonu';

-- =============================================
-- 4. BLOG BAŞLIKLARI — SEO güçlendirme
-- =============================================

-- MetasoftCo Nedir?
UPDATE "BlogPost"
SET
  title = 'Yapay Zeka Etkinlik Ajansı MetasoftCo: Hizmetler ve Uzmanlık Alanları',
  "metaTitle" = 'Yapay Zeka Etkinlik Ajansı MetasoftCo: Hizmetler ve Uzmanlık Alanları',
  "metaDescription" = 'MetasoftCo nedir, ne yapar? İstanbul merkezli yapay zeka etkinlik ajansının hizmetleri, uzmanlık alanları ve referans markaları hakkında kapsamlı rehber.'
WHERE slug = 'metasoftco-nedir-interaktif-etkinlik-teknolojileri';

-- AI Photobooth Neden Kullanmalısınız?
UPDATE "BlogPost"
SET
  title = 'AI Photobooth Aktivasyonu: Etkinlik Katılımını ve Marka Etkileşimini Artırmanın 5 Yolu',
  "metaTitle" = 'AI Photobooth Aktivasyonu: Etkinlik Katılımını ve Marka Etkileşimini Artırmanın 5 Yolu',
  "metaDescription" = 'AI photobooth aktivasyonu ile etkinlik katılım oranını ve marka etkileşimini nasıl artırırsınız? Stable Diffusion destekli sistemlerin 5 somut faydası ve gerçek proje örnekleri.'
WHERE slug = 'etkinliklerde-ai-photobooth-avantajlari';

-- Etkinliklerde İnteraktif Deneyim Alanları
UPDATE "BlogPost"
SET
  title = 'İnteraktif Deneyim Alanları: Etkinliğinizde Katılımı Artıran Aktivasyon Fikirleri',
  "metaTitle" = 'İnteraktif Deneyim Alanları: Etkinliğinizde Katılımı Artıran Aktivasyon Fikirleri',
  "metaDescription" = 'Etkinliklerde AI photo booth, gamification, AR deneyimleri ve interaktif oyunlarla katılımı artıran aktivasyon fikirleri. Gerçek projelerden ilham veren örnekler ve uygulama rehberi.'
WHERE slug = 'etkinliklerde-interaktif-deneyim-alanlari';
