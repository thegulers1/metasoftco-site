import "dotenv/config";
import { prisma } from "../src/lib/db";

// Nine published posts had no FAQ, so they rendered without FAQPage schema.
// Answers use only verified company facts (see src/lib/llms.ts) and what each
// post itself says. A post that already has an FAQ is left untouched.

type Faq = { q: string; a: string }[];

const cities = "İstanbul, Ankara, İzmir, Antalya, Bodrum, Adana, Diyarbakır, Kocaeli, Sapanca ve Çorum";

const faqs: Record<string, Faq> = {
    "metasoftco-nedir-interaktif-etkinlik-teknolojileri": [
        {
            q: "MetasoftCo nedir, ne iş yapar?",
            a: "MetasoftCo, İstanbul Teknokent merkezli bir etkinlik teknolojisi ve yazılım şirketidir. Yapay zekâ fotoğraf, photobooth, interaktif oyun ve AR aktivasyonlarını Türkiye genelinde anahtar teslim kiralar; etkinlik mikro sitesi, uygulama ve lead toplama yazılımını aynı ekiple geliştirir.",
        },
        {
            q: "MetasoftCo ne zaman kuruldu ve nerede?",
            a: "2020'de İstanbul'da yazılım şirketi olarak kuruldu, ardından etkinlik teknolojilerine geçti. Merkezi İstanbul Teknokent'tedir (Avcılar). Bugüne kadar 1.000'den fazla etkinlikte 100'den fazla markayla çalıştı.",
        },
        {
            q: "MetasoftCo hangi şehirlerde hizmet veriyor?",
            a: `Türkiye genelinde hizmet veriyor. Bugüne kadar kurulum yapılan şehirler: ${cities}.`,
        },
        {
            q: "MetasoftCo'dan kiralama neleri kapsar?",
            a: "Kiralama anahtar teslimdir: nakliye, kurulum, söküm, etkinlik boyunca alanda en az iki teknik personel ve markaya özel tasarım fiyata dahildir. Mekândan tek bir standart 220V priz beklenir; internet kendi 5G mobil altyapımızla gelir.",
        },
        {
            q: "MetasoftCo hangi markalarla çalıştı?",
            a: "Yayındaki projeler arasında TCMB, Allianz, Akbank, Garanti BBVA, Pegasus Hava Yolları, Adidas, DeFacto, Ray-Ban ve Nesquik için yapılan aktivasyonlar yer alıyor. Ayrıntılar Projeler sayfasında.",
        },
    ],
    "etkinliklerde-ai-photobooth-avantajlari": [
        {
            q: "AI photobooth nedir?",
            a: "AI photobooth, misafirin fotoğrafını yapay zekâ ile etkinliğin temasına göre yeniden yorumlayan fotoğraf aktivasyonudur. Klasik photobooth fotoğrafa çerçeve ve filtre ekler; AI photobooth misafiri bir karaktere ya da markaya özel bir görsel dünyaya dönüştürür.",
        },
        {
            q: "AI photobooth saatte kaç kişiye hizmet verir?",
            a: "Tek bir istasyon saatte ortalama 80–120 kişiye hizmet verir. Fotoğraf saniyeler içinde işlenir.",
        },
        {
            q: "AI photobooth baskı veriyor mu?",
            a: "Evet. Fotoğraf saniyeler içinde basılır ve aynı anda QR kod ile telefona iner. Kiralama paketine 750 adet baskı dahildir.",
        },
        {
            q: "AI photobooth markaya özel hazırlanabilir mi?",
            a: "Evet. Yapay zekâ teması, ekran arayüzü ve fotoğraf çerçevesi markaya ve etkinliğe özel tasarlanır; kiosk da markaya göre giydirilir.",
        },
    ],
    "yapay-zeka-yuz-degistirme-face-swap-nasil-calisir": [
        {
            q: "Face swap ne demek?",
            a: "Face swap, Türkçesiyle yüz değiştirme, bir fotoğraftaki yüzün yapay zekâ ile başka bir yüzün ya da karakterin üzerine yerleştirilmesidir.",
        },
        {
            q: "Yapay zekâ ile yüz değiştirme nasıl çalışır?",
            a: "Sistem önce yüzü ve yüzdeki göz, burun, dudak gibi referans noktalarını tespit eder. Ardından derin öğrenme modeli bu yüzü hedef görsele açı, ışık ve ifadeyi koruyarak uyarlar.",
        },
        {
            q: "Face swap etkinliklerde nasıl kullanılır?",
            a: "AI Photo aktivasyonunda misafir fotoğrafını çektirir, yüzü etkinliğin temasına göre hazırlanmış bir karaktere ya da sahneye yerleştirilir. Sonuç saniyeler içinde basılır ve QR kod ile telefona iner.",
        },
        {
            q: "Etkinlikte yüz değiştirme ne kadar sürer?",
            a: "Fotoğraf saniyeler içinde işlenir. Tek bir AI Photobooth istasyonu saatte ortalama 80–120 kişiye hizmet verir.",
        },
    ],
    "kurumsal-etkinliklerde-gamification": [
        {
            q: "Gamification (oyunlaştırma) nedir?",
            a: "Gamification, puan, skor tablosu, görev ve ödül gibi oyun unsurlarının oyun olmayan bir ortama uygulanmasıdır. Etkinliklerde katılımcıyı izleyici olmaktan çıkarıp aktif katılımcıya dönüştürmek için kullanılır.",
        },
        {
            q: "Kurumsal etkinlikte hangi oyunlar kurulabilir?",
            a: "Kiraladığımız oyunlar arasında Reflex Game, Reflex Wall, Memory Game, Quiz bilgi yarışması, Dijital Hediye Çarkı, Catch & Collect, Interactive Puzzle, Human vs AI ve Prompt Battle yer alıyor.",
        },
        {
            q: "Oyunlarda skor tablosu ve katılımcı verisi toplanabilir mi?",
            a: "Evet, isteğe bağlı olarak. Katılımcı QR kodu okutup formu doldurursa skor tablosunda yer alır; bu kayıtlar Data-Capture modülüyle müşteri paneline anlık düşer.",
        },
        {
            q: "Oyunlar markaya özel hazırlanıyor mu?",
            a: "Evet. Oyun ve ekran arayüzü markaya özel tasarlanır, kiosk markaya göre giydirilir.",
        },
    ],
    "marka-aktivasyonu-icin-dijital-deneyimler-2025": [
        {
            q: "Marka aktivasyonu nedir?",
            a: "Marka aktivasyonu, markanın hedef kitlesiyle bir etkinlik, stant ya da kurulum üzerinden birebir deneyim yaşatarak buluşmasıdır. Amaç katılımcının markayla aktif olarak etkileşime girmesidir.",
        },
        {
            q: "Marka aktivasyonunda hangi dijital deneyimler kullanılır?",
            a: "Yapay zekâ fotoğraf aktivasyonları (AI Photobooth, AI Greenbox), photobooth türleri, 360 Video Booth, interaktif oyunlar ve AR deneyimleri en sık kullanılanlardır.",
        },
        {
            q: "Aktivasyonun etkisi nasıl ölçülür?",
            a: "Data-Capture & CRM modülüyle katılımcı kayıtları müşteri paneline anlık düşer; panelden canlı takip edilir ve Excel/CSV olarak indirilir. Veriler standart 90 gün saklanır.",
        },
        {
            q: "İstanbul dışında marka aktivasyonu kuruyor musunuz?",
            a: `Evet. Türkiye genelinde anahtar teslim kurulum yapıyoruz. Bugüne kadar kurulum yapılan şehirler: ${cities}.`,
        },
    ],
    "etkinliklerde-interaktif-deneyim-alanlari": [
        {
            q: "İnteraktif etkinlik ne demek?",
            a: "İnteraktif etkinlik, katılımcının yalnızca izlemediği; dokunduğu, oynadığı, fotoğraf çektirdiği ve bir sonuçla ayrıldığı etkinliktir. Markanın mesajı bu deneyimin içinde verilir.",
        },
        {
            q: "Hangi hedefe hangi interaktif aktivite uygundur?",
            a: "Hızlı katılım ve yüksek sirkülasyon için refleks oyunları; sosyal medya paylaşımı ve hatıra için Photobooth, AI Photo ve Greenbox; ekip hâlinde eğlence için oyun ve yarışmalar uygundur.",
        },
        {
            q: "İnteraktif deneyim alanı için ne kadar yer gerekir?",
            a: "Ürüne göre değişir: Photobooth için 2 m², 360 Video Booth için 3 m², Mirror Booth için 4 m², Cabin Photo için 5 m² alan yeterlidir. Mekândan tek bir standart 220V priz beklenir.",
        },
        {
            q: "Kurulum ne kadar sürer?",
            a: "Kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer. Etkinlik boyunca alanda en az iki teknik personel bulunur.",
        },
    ],
    "2026-etkinlik-trendleri-interaktif-teknolojiler": [
        {
            q: "2026'da etkinliklerde öne çıkan teknoloji trendleri neler?",
            a: "Yapay zekâ ile kişiselleştirilmiş deneyimler, oyunlaştırma, sürdürülebilirlik temalı aktiviteler, paylaşılabilir fotoğraf ve video aktivasyonları ve veriyle ölçülen etkinlik yönetimi.",
        },
        {
            q: "Yapay zekâ etkinliklerde nasıl kullanılıyor?",
            a: "En yaygın kullanım fotoğraf aktivasyonlarıdır: AI Photobooth misafiri temaya özel bir karaktere dönüştürür, AI Draw misafirin çizimini görsele ya da sticker'a çevirir, AI Fashion Mirror kıyafet denemesini dijitale taşır.",
        },
        {
            q: "Sürdürülebilirlik temalı etkinlik aktivitesi var mı?",
            a: "Evet. Recycle & Win geri dönüşümü oyuna çevirir. Charge Bike'ta ise pedal çevrildikçe telefonlar şarj olur ve ekrandaki oyun ilerler.",
        },
        {
            q: "Etkinlikteki etkileşim nasıl ölçülür?",
            a: "Data-Capture & CRM modülüyle katılımcı kayıtları müşteri paneline anlık düşer, canlı takip edilir ve Excel/CSV olarak indirilir.",
        },
    ],
    "stable-diffusion-etkinlik-yuz-donusumu-teknik-analiz": [
        {
            q: "AI photobooth hangi yapay zekâ modeliyle çalışıyor?",
            a: "Altyapımız Stable Diffusion üzerine kuruludur. Konsepte özel LoRA eğitimi ve misafirin yüz yapısını koruyan ControlNet katmanıyla birlikte kullanılır.",
        },
        {
            q: "Kalabalık bir etkinlikte tek fotoğraf ne kadar sürede hazırlanır?",
            a: "Yazıda anlatılan ödül gecesinde ortalama işlem süresi 9,4 saniye oldu. Süreyi kısaltan adımlar: model optimizasyonu, etkinlik öncesi sistem ısıtması ve sabit komutların önbelleğe alınması.",
        },
        {
            q: "Yapay zekâ fotoğrafında yüz benzerliği nasıl korunuyor?",
            a: "Yüzü ve duruşu referans alan ControlNet ile yüz kimliğini taşıyan IP-Adapter FaceID katmanları kullanılır. Yalnızca temel model ve LoRA ile elde edilen benzerlik bu katmanlarla belirgin biçimde artar.",
        },
        {
            q: "Bu etkinlikte fotoğraflar nerede işlendi?",
            a: "Yazıda anlatılan etkinlikte tüm işlemler yerel sunucularda yapıldı; görüntüler buluta gönderilmedi ve etkinlik sonunda belirlenen sürede silindi.",
        },
    ],
    "kurumsal-fotograf-aktiviteleri": [
        {
            q: "Kurumsal etkinlik için hangi fotoğraf aktiviteleri var?",
            a: "AI Photobooth, AI Greenbox, sanal kıyafet deneme (Virtual Try-On) ve iris fotoğrafçılığı bu yazıda anlatılanlardır. Bunların yanında Photobooth, Mirror Booth, Cabin Photo ve 360 Video Booth da kiralanır.",
        },
        {
            q: "AI Greenbox nedir?",
            a: "AI Greenbox, fiziksel dekor kurmadan misafiri markaya özel tasarlanmış dijital bir arka plana yerleştiren fotoğraf aktivasyonudur. TCMB ve Allianz etkinliklerinde kullanıldı.",
        },
        {
            q: "İris fotoğrafı etkinlikte nasıl çekilir?",
            a: "Misafirin göz irisi makro lensle dakikalar içinde fotoğraflanır, ışık parlamaları temizlenir ve fotoğraf dijital ya da baskılı olarak teslim edilir.",
        },
        {
            q: "Fotoğraf aktivitelerinde baskı veriliyor mu?",
            a: "Baskılı aktivasyonlarda fotoğraf saniyeler içinde basılır ve QR kod ile telefona da iner; kiralama paketine 750 adet baskı dahildir.",
        },
    ],
};

async function main() {
    for (const [slug, faq] of Object.entries(faqs)) {
        const post = await prisma.blogPost.findUnique({ where: { slug } });
        if (!post) {
            console.warn(`Post not found, skipped: ${slug}`);
            continue;
        }
        if (post.faq && JSON.parse(post.faq).length > 0) {
            console.log(`FAQ already present, skipped: ${slug}`);
            continue;
        }
        await prisma.blogPost.update({ where: { id: post.id }, data: { faq: JSON.stringify(faq) } });
        console.log(`Added ${faq.length} questions: ${slug}`);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
