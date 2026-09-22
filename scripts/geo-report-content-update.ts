import "dotenv/config";
import { prisma } from "../src/lib/db";

const PHOTOBOOTH_CATEGORY_ID = "cmkjoho8700072orrgjf2w4hy"; // photobooth-ve-fotograf-aktivasyonlari

async function updatePhotoboothCategory() {
    const category = await prisma.serviceCategory.findUnique({ where: { id: PHOTOBOOTH_CATEGORY_ID } });
    if (!category) throw new Error("Photobooth category not found");

    const existingFaqs: { q: string; a: string }[] = category.faq ? JSON.parse(category.faq) : [];
    const hasMirrorBoothFaq = existingFaqs.some((f) => /mirror booth/i.test(f.q));

    const updatedHeroContent =
        "Geleneksel fotoğraf kabinlerini unutun. Metasoftco, etkinliklerinize dijital fotoğraf aktivasyonları ile modern bir dokunuş katıyor. Mirror Booth, Aura Photobooth, Strip Photo, Momento Ball ve Glow Box gibi yaratıcı çözümlerimizle katılımcılarınıza markalı, dijital veya basılı hatıralar sunuyoruz. Sosyal medya paylaşımına uygun içerik üretimini teşvik eden photobooth kiralama çözümlerimizle, markanızın etkinlik alanındaki dijital ayak izini büyütüyoruz.";

    const newFaqs = hasMirrorBoothFaq
        ? existingFaqs
        : [
              ...existingFaqs,
              {
                  q: "Mirror Booth İstanbul'da kiralanabilir mi?",
                  a: "Evet. MetasoftCo, İstanbul merkezli olup Mirror Booth'u Türkiye genelinde etkinliklere kiralık olarak sunar. Dev dokunmatik ayna ekranı, yüzlerce dijital filtre, anında baskı ve QR kod ile dijital paylaşım içerir; kurulum ve söküm hizmeti dahildir. Markanıza özel arayüz ve çerçeve tasarımıyla teslim edilir.",
              },
          ];

    await prisma.serviceCategory.update({
        where: { id: PHOTOBOOTH_CATEGORY_ID },
        data: {
            heroContent: updatedHeroContent,
            faq: JSON.stringify(newFaqs),
        },
    });
    console.log("Photobooth category updated (Mirror Booth surfaced in hero + FAQ).");
}

async function createSectorPages() {
    const pages = [
        {
            slug: "kurumsal-etkinlik-teknolojisi",
            title: "Kurumsal Etkinlik Teknolojisi",
            h1: "Kurumsal Etkinlik Teknolojisi",
            excerpt:
                "AI aktivasyonlarından interaktif oyunlara, photobooth sistemlerinden marka aktivasyonuna — MetasoftCo etkinlik teknolojisini tek çatı altında sunan İstanbul merkezli ajanstır.",
            metaTitle: "Kurumsal Etkinlik Teknoloji Firması | MetasoftCo",
            metaDescription:
                "MetasoftCo; yapay zeka aktivasyonları, photobooth sistemleri, interaktif oyunlar ve marka aktivasyonunu tek çatı altında sunan İstanbul merkezli kurumsal etkinlik teknoloji firmasıdır.",
            metaKeywords: "kurumsal etkinlik teknoloji firması, deneyim tasarım stüdyosu, etkinlik teknolojisi İstanbul",
            content:
                "<h2>Kurumsal Etkinlik Teknolojisi Nedir?</h2><p>Kurumsal etkinlik teknolojisi; bir markanın lansmanında, fuarında veya iç iletişim etkinliğinde katılımcıyla dijital ve fiziksel dünyayı birleştiren interaktif sistemler kurmayı ifade eder. MetasoftCo, bu alanda İstanbul merkezli, uçtan uca çalışan bir ekiptir: prompt mühendisliğinden sahne lojistiğine, yazılım geliştirmeden fiziksel kurulum ve söküme kadar her adımı kendi ekibimizle yürütürüz.</p><h2>Tek Çatı Altında Sunduğumuz Teknolojiler</h2><ul><li><strong>Yapay Zeka Aktivasyonları:</strong> AI Photo &amp; Face Swap, AI Fashion Mirror (Akıllı Ayna), AI Draw gibi Stable Diffusion ve ControlNet tabanlı sistemler.</li><li><strong>Photobooth &amp; Fotoğraf Sistemleri:</strong> Mirror Booth, Aura Photobooth, Strip Photo ve daha fazlası.</li><li><strong>İnteraktif Oyun &amp; Gamification:</strong> Dijital Hediye Çarkı, Reflex Game, Memory Game gibi katılım odaklı sistemler.</li><li><strong>Marka Aktivasyonu &amp; Özel Yazılım:</strong> Etkinliğe özel analitik panel, KVKK uyumlu veri toplama ve raporlama.</li></ul><h2>Neden MetasoftCo?</h2><p>2020'den beri İstanbul'da, 1.000'den fazla etkinlikte sahne aldık. Süreci dışarıya bırakmadığımız için kaliteyi kontrolümüzde tutuyor, her aktivasyonun çıktısını (katılım, paylaşım oranı, etkileşim süresi) ölçülebilir şekilde raporluyoruz.</p>",
            faq: JSON.stringify([
                {
                    q: "Kurumsal etkinlik teknoloji firması ne yapar?",
                    a: "Bir markanın etkinliğinde katılımcı deneyimini teknolojiyle zenginleştiren sistemleri tasarlar, geliştirir ve sahada kurar: yapay zeka aktivasyonları, interaktif oyunlar, photobooth sistemleri ve etkinlik analitiği bu kapsama girer. MetasoftCo bu hizmetleri İstanbul merkezli, uçtan uca bir ekiple sunar.",
                },
                {
                    q: "Deneyim tasarım stüdyosu ile etkinlik ajansı arasındaki fark nedir?",
                    a: "Klasik bir etkinlik ajansı organizasyon ve lojistiğe odaklanırken, deneyim tasarım stüdyosu katılımcının markayla kurduğu interaktif anı tasarlar. MetasoftCo her ikisini birleştirir: yazılım geliştirme, AR/AI teknolojisi ve fiziksel prodüksiyonu aynı ekipte barındırır.",
                },
                {
                    q: "Hangi etkinlik türlerinde kurumsal etkinlik teknolojisi kullanılır?",
                    a: "Ürün lansmanları, fuar stantları, iç iletişim etkinlikleri, yıl sonu organizasyonları ve marka aktivasyonlarında kullanılır. Sistemler etkinliğin ölçeğine göre (tek istasyon veya çoklu istasyon) uyarlanabilir.",
                },
                {
                    q: "Fiyat teklifi nasıl alınır?",
                    a: "info@metasoftco.com adresine etkinlik tarihi, lokasyon ve tahmini katılımcı sayısını belirterek e-posta gönderebilir veya iletişim formunu doldurabilirsiniz. 24 saat içinde detaylı teklif sunulur.",
                },
            ]),
            districts: JSON.stringify([
                { title: "Yapay Zeka Aktivasyonları", description: "AI Photo, AI Fashion Mirror ve AI Draw ile Stable Diffusion / ControlNet tabanlı deneyimler." },
                { title: "Photobooth & Fotoğraf Sistemleri", description: "Mirror Booth ve Aura Photobooth başta olmak üzere dijital fotoğraf aktivasyonları." },
                { title: "İnteraktif Oyun & Gamification", description: "Dijital Hediye Çarkı, Reflex Game ve Memory Game ile katılım odaklı sistemler." },
                { title: "Marka Aktivasyonu & Özel Yazılım", description: "Etkinliğe özel analitik panel, KVKK uyumlu veri toplama ve raporlama." },
            ]),
            serviceIds: JSON.stringify([
                "cmkjohn4800012orrjn8ixgjb", // AI Photo & AI Photobooth
                "cmkjohn4800032orr66dsoree", // AI Fashion Mirror
                "cmlg2dyp2000087gttg1ob6sf", // Mirror Booth
                "cmquunnaw000fo0rr2d19essn", // Aura Photobooth
                "cmkjohprt000j2orrxvz971w5", // Digital Gift Wheel
                "cmkjohprt000i2orru17gvv0y", // Reflex Game
            ]),
            published: true,
            order: 100,
        },
        {
            slug: "fuar-aktivasyonlari",
            title: "Fuar & Stant Aktivasyonları",
            h1: "Fuar & Stant Aktivasyonları",
            excerpt:
                "Fuar standınızı ziyaretçi çeken, veri toplayan ve marka hatırlanırlığı yaratan interaktif bir istasyona dönüştürün. MetasoftCo'nun AI ve gamification çözümleriyle standınız kalabalığın içinde fark edilir.",
            metaTitle: "Fuar Stand Teknolojisi & Aktivasyonları | MetasoftCo",
            metaDescription:
                "Fuar standınıza ziyaretçi çekecek AI photobooth, Mirror Booth ve interaktif oyun aktivasyonları. MetasoftCo ile standınızda kesintisiz kurulum, KVKK uyumlu lead toplama ve marka hatırlanırlığı.",
            metaKeywords: "fuar stand teknolojisi, ziyaretçi çekecek aktivasyon, fuar aktivasyonu İstanbul",
            content:
                "<h2>Fuar Standınızda Fark Yaratmanın Yolu</h2><p>Fuarlarda katılımcı dikkati saniyeler içinde başka bir standa kayabilir. MetasoftCo'nun fuar aktivasyonları, standınızı sadece görülen değil, deneyimlenen bir alana dönüştürerek ziyaretçiyi durdurur, etkileşime sokar ve markanızı hatırlanır kılar.</p><h2>Fuar Standları İçin Önerilen Aktivasyonlar</h2><ul><li><strong>AI Photo & Face Swap:</strong> Ziyaretçileri saniyeler içinde markanıza özel konseptlere dönüştürerek stant önünde doğal bir kalabalık oluşturur.</li><li><strong>Mirror Booth:</strong> Dev dokunmatik ayna ekranı, uzaktan da dikkat çeken görsel bir çekim noktası yaratır.</li><li><strong>Dijital Hediye Çarkı:</strong> KVKK uyumlu formlarla lead toplarken katılımcıyı eğlendirir.</li><li><strong>Reflex Game / Memory Game:</strong> Takım ruhunu ve rekabeti tetikleyerek stant içinde bekleme süresini deneyime çevirir.</li></ul><h2>Fuar Operasyonu Nasıl İşler?</h2><p>Ekibimiz fuar alanına kurulum için yeterli süre öncesinde gelir, tüm donanım ve yazılım testlerini tamamlar ve fuar boyunca yerinde teknik destek sağlar. Etkinlik sonunda katılım sayısı, paylaşım oranları ve toplanan lead verileri raporlanır.</p>",
            faq: JSON.stringify([
                {
                    q: "Fuar stand teknolojisi ile standımıza nasıl ziyaretçi çekilir?",
                    a: "AI Photo, Mirror Booth ve interaktif oyun gibi görsel açıdan dikkat çeken, katılımcıyı aktif hale getiren sistemler kullanılır. Bu sistemler hem uzaktan görülebilir bir hareket yaratır hem de katılımcıyı standa yaklaştırıp deneyime dahil eder.",
                },
                {
                    q: "Fuar standı kurulumu ne kadar sürer?",
                    a: "Sistem sayısına göre değişmekle birlikte ekibimiz fuar açılışından önce alana gelerek kurulum ve teknik testleri tamamlar. Kompakt sistemler daha kısa sürede hazır hale getirilebilir; kurulum ve söküm hizmeti fiyata dahildir.",
                },
                {
                    q: "Fuar aktivasyonlarıyla lead (potansiyel müşteri verisi) toplanabilir mi?",
                    a: "Evet. Dijital Hediye Çarkı gibi oyunlaştırma araçları, katılım şartı olarak KVKK uyumlu formlarla lead toplar. Etkinlik sonunda toplanan veriler raporlanarak teslim edilir.",
                },
                {
                    q: "Hangi fuar türlerinde bu aktivasyonlar kullanılabilir?",
                    a: "Sektör fuarları, ürün lansmanları, teknoloji konferansları ve B2B etkinliklerinde kullanılır. Stant büyüklüğüne ve hedeflenen etkileşim türüne göre sistem kombinasyonu önerilir.",
                },
            ]),
            districts: JSON.stringify([
                { title: "Ziyaretçi Çekme", description: "Görsel açıdan dikkat çeken AI Photo ve Mirror Booth aktivasyonlarıyla standınıza akışı artırın." },
                { title: "Lead Toplama", description: "KVKK uyumlu formlarla entegre gamification araçlarıyla potansiyel müşteri verisi toplayın." },
                { title: "Marka Hatırlanırlığı", description: "Katılımcının markayla kurduğu interaktif anı, fuar sonrası da paylaşılan bir anıya dönüştürün." },
            ]),
            serviceIds: JSON.stringify([
                "cmkjohn4800012orrjn8ixgjb", // AI Photo & AI Photobooth
                "cmlg2dyp2000087gttg1ob6sf", // Mirror Booth
                "cmkjohprt000j2orrxvz971w5", // Digital Gift Wheel
                "cmkjohprt000i2orru17gvv0y", // Reflex Game
                "cmkjohn4800032orr66dsoree", // AI Fashion Mirror
            ]),
            published: true,
            order: 101,
        },
    ];

    for (const page of pages) {
        const existing = await prisma.sectorPage.findUnique({ where: { slug: page.slug } });
        if (existing) {
            await prisma.sectorPage.update({ where: { slug: page.slug }, data: page });
            console.log(`Updated existing sector page: ${page.slug}`);
        } else {
            await prisma.sectorPage.create({ data: page });
            console.log(`Created sector page: ${page.slug}`);
        }
    }
}

async function main() {
    await updatePhotoboothCategory();
    await createSectorPages();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
