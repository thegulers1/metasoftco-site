import "dotenv/config";
import { prisma } from "../src/lib/db";

// Second post of docs/seo-kapsama-haritasi.md: answers "photobooth
// alternatifleri" and "standart mı AI mı" queries, which no page covered.
// Created UNPUBLISHED for review in the editpanel. Reruns are no-ops.

const slug = "standart-photobooth-mu-ai-photobooth-mu-secim-rehberi";

// [categorySlug, serviceSlug] pairs shown as "related services" on the post.
const relatedServices: [string, string][] = [
    ["photobooth-ve-fotograf-aktivasyonlari", "photobooth-kirala"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "mirror-booth"],
    ["photobooth-ve-fotograf-aktivasyonlari", "cabin-photo"],
    ["video", "360-video-booth"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-greenbox-kiralama"],
];

const photo = "/hizmetler/photobooth-ve-fotograf-aktivasyonlari";
const ai = "/hizmetler/yapay-zeka-etkinlik-cozumleri";
const content = `<p><strong>Kısa cevap:</strong> Standart photobooth misafirin fotoğrafını olduğu gibi çeker, üzerine marka çerçevesi ve filtre ekler. AI photobooth ise fotoğrafı yapay zekâ ile etkinliğin temasına göre yeniden üretir; misafir bir karaktere ya da markaya özel bir dünyaya dönüşür. Amaç hızlı ve herkesin anladığı bir hatıra ise standart photobooth, amaç konuşulan ve temaya bağlı bir deneyim ise AI photobooth doğru seçimdir. İkisi de baskılı ve dijital çıktı verir.</p>

<h2>Standart photobooth ne yapar?</h2>
<p><a href="${photo}/photobooth-kirala">Photobooth</a>, misafirin kendi fotoğrafını çektiği dokunmatik ekranlı kompakt bir kiosktur. Fotoğraf, GIF ve Boomerang çeker; filtre ve sihirli arka plan seçenekleri vardır. Fotoğraf marka logolu dijital çerçeveyle saniyeler içinde basılır ve QR kod ile telefona iner.</p>
<p>2 m² alan yeterlidir. Saatte ortalama 70–80 kişiye hizmet verir; misafirler gruplar hâlinde çekildiğinde bu sayı 150 kişiye kadar çıkar.</p>

<h2>AI photobooth ne yapar?</h2>
<p><a href="${ai}/ai-photobooth-kirala">AI Photobooth</a> fotoğrafı çektikten sonra yapay zekâ ile işler: misafir, etkinlik için önceden hazırlanan temaya göre bir süper kahramana, bir dönem karakterine ya da markaya özel tasarlanmış bir karaktere dönüşür. Tema her etkinlik için ayrı hazırlanır. Sonuç saniyeler içinde basılır ve QR kod ile telefona iner.</p>
<p>Tek istasyon saatte ortalama 80–120 kişiye hizmet verir.</p>

<h2>Yan yana karşılaştırma</h2>
<table>
<thead><tr><th></th><th>Standart Photobooth</th><th>AI Photobooth</th></tr></thead>
<tbody>
<tr><td><strong>Çıktı</strong></td><td>Misafirin gerçek fotoğrafı, marka çerçevesiyle</td><td>Yapay zekâ ile temaya göre üretilmiş fotoğraf</td></tr>
<tr><td><strong>Çekim türleri</strong></td><td>Fotoğraf, GIF, Boomerang</td><td>Fotoğraf</td></tr>
<tr><td><strong>Marka uyarlaması</strong></td><td>Çerçeve, arayüz, kiosk giydirmesi</td><td>Çerçeve, arayüz, kiosk giydirmesi ve markaya özel yapay zekâ teması</td></tr>
<tr><td><strong>Saatlik kapasite</strong></td><td>70–80 kişi, grup çekimlerinde 150 kişiye kadar</td><td>80–120 kişi</td></tr>
<tr><td><strong>Baskı</strong></td><td>Var, 750 adet dahil</td><td>Var, 750 adet dahil</td></tr>
<tr><td><strong>Dijital paylaşım</strong></td><td>QR kod ile</td><td>QR kod ile</td></tr>
</tbody>
</table>

<h2>Hangisini ne zaman seçmeli?</h2>
<ul>
<li><strong>Standart photobooth:</strong> misafirlerin gruplar hâlinde ve tekrar tekrar fotoğraf çektireceği etkinlikler; alanın dar olduğu stantlar; herkesin kendi gerçek fotoğrafını istediği kutlamalar.</li>
<li><strong>AI photobooth:</strong> belirli bir teması olan lansmanlar ve partiler; markanın yenilikçi görünmek istediği etkinlikler; sosyal medyada paylaşılacak, alışılmışın dışında bir görsel istenen durumlar.</li>
<li><strong>İkisi birlikte:</strong> kalabalık etkinliklerde kuyruğu tek noktada toplamak yerine iki farklı aktivite kurmak hem bekleme süresini kısaltır hem misafire seçenek sunar.</li>
</ul>

<h2>Photobooth alternatifleri</h2>
<p>Seçenek yalnızca bu ikisi değil. Etkinliğin havasına göre aynı işi farklı biçimde gören aktiviteler var:</p>
<ul>
<li><strong><a href="${photo}/mirror-booth">Mirror Booth</a>:</strong> ekranı büyük bir dokunmatik aynadır. Gala ve davetlerde şık bir fotoğraf köşesi olur. 4 m² alan, saatte 60–80 kişi.</li>
<li><strong><a href="${photo}/cabin-photo">Cabin Photo</a>:</strong> dört tarafı kapalı fotoğraf kabini. Misafirler kimse izlemeden poz verir. 5 m² alan, saatte yaklaşık 50 kişi.</li>
<li><strong><a href="/hizmetler/video/360-video-booth">360 Video Booth</a>:</strong> kamera misafirin etrafında dönerek yavaş çekim video çeker. Baskı vermez, video QR kod ile paylaşılır. 3 m² alan, saatte 40–50 kişi.</li>
<li><strong><a href="${ai}/ai-greenbox-kiralama">AI Greenbox</a>:</strong> fiziksel dekor kurmadan misafiri markaya özel dijital bir arka plana yerleştirir.</li>
<li><strong><a href="${photo}/magazine-cover">Magazine Cover</a>:</strong> misafirin fotoğrafını etkinliğe özel tasarlanmış bir dergi kapağına yerleştirir.</li>
<li><strong><a href="${photo}/aura-photobooth-kiralama">Aura Photobooth</a>:</strong> sensörlerle aldığı veriyi misafirin fotoğrafında aura olarak görselleştirir.</li>
</ul>

<h2>Hangisini seçerseniz seçin değişmeyenler</h2>
<p>Kiralama anahtar teslimdir: nakliye, kurulum, söküm, teknik personel ve markaya özel tasarım fiyata dahildir. Mekândan tek bir standart 220V priz beklenir; internet kendi 5G mobil altyapımızla gelir. Kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer. Etkinlik boyunca alanda en az iki teknik personel bulunur.</p>`;

const faq = [
    {
        q: "Standart photobooth ile AI photobooth arasındaki fark nedir?",
        a: "Standart photobooth misafirin gerçek fotoğrafını çeker ve üzerine marka çerçevesi ile filtre ekler. AI photobooth fotoğrafı yapay zekâ ile etkinliğin temasına göre yeniden üretir; misafir bir karaktere ya da markaya özel bir dünyaya dönüşür.",
    },
    {
        q: "Photobooth alternatifleri nelerdir?",
        a: "AI Photobooth, Mirror Booth, Cabin Photo, 360 Video Booth, AI Greenbox, Magazine Cover ve Aura Photobooth. Hepsi misafire kişisel bir hatıra verir; fark çıktının türünde ve kapladığı alandadır.",
    },
    {
        q: "Hangisi daha kalabalık etkinliğe uygun?",
        a: "AI Photobooth saatte ortalama 80–120 kişiye, standart Photobooth 70–80 kişiye hizmet verir; grup çekimlerinde Photobooth 150 kişiye kadar çıkar. Çok kalabalık etkinliklerde iki farklı aktivite kurmak kuyruğu böler.",
    },
    {
        q: "AI photobooth da baskı veriyor mu?",
        a: "Evet. İkisi de fotoğrafı saniyeler içinde basar ve QR kod ile telefona gönderir. Kiralama paketine 750 adet baskı dahildir.",
    },
    {
        q: "Dar bir alana hangi photobooth sığar?",
        a: "Standart Photobooth 2 m² alana kurulur. 360 Video Booth için 3 m², Mirror Booth için 4 m², Cabin Photo için 5 m² alan gerekir.",
    },
];

async function main() {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
        console.log(`Post already exists (published: ${existing.published}), skipping.`);
        return;
    }

    const serviceIds: string[] = [];
    for (const [categorySlug, serviceSlug] of relatedServices) {
        const service = await prisma.service.findFirst({
            where: { slug: serviceSlug, category: { slug: categorySlug } },
            select: { id: true },
        });
        if (service) serviceIds.push(service.id);
        else console.warn(`Related service not found, left out: ${categorySlug}/${serviceSlug}`);
    }

    await prisma.blogPost.create({
        data: {
            slug,
            title: "Standart Photobooth mu, AI Photobooth mu? Alternatifler ve Seçim Rehberi",
            excerpt:
                "Standart photobooth ile AI photobooth arasındaki farklar, saatlik kapasiteleri, kapladıkları alan ve hangi etkinlikte hangisinin seçileceği. Mirror Booth, Cabin Photo ve 360 Video Booth gibi alternatiflerle birlikte.",
            content,
            category: "Etkinlik Teknolojileri",
            author: "MetasoftCo Ekibi",
            metaTitle: "Standart Photobooth mu, AI Photobooth mu? Seçim Rehberi | MetasoftCo",
            metaDescription:
                "Standart photobooth ve AI photobooth karşılaştırması: çıktı, kapasite, alan ve marka uyarlaması. Mirror Booth, Cabin Photo ve 360 Video Booth gibi photobooth alternatifleri.",
            faq: JSON.stringify(faq),
            serviceIds: JSON.stringify(serviceIds),
            published: false,
        },
    });
    console.log(`Draft created: /blog/${slug} (unpublished)`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
