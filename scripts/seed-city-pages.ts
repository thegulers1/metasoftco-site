import "dotenv/config";
import { prisma } from "../src/lib/db";

// City landing pages for Ankara, İzmir and Antalya, served at
// /hizmetler/<slug> like the İstanbul page (see cityLandingSlugs in
// src/lib/publication.ts). Copy uses only verified facts: the cities we have
// installed in, the named references per city, and the rental logistics.
// An existing row is left untouched.

// [categorySlug, serviceSlug] pairs listed as the page's related services.
const relatedServices: [string, string][] = [
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "mirror-booth"],
    ["photobooth-ve-fotograf-aktivasyonlari", "cabin-photo"],
    ["video", "360-video-booth"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-greenbox-kiralama"],
];

type City = {
    slug: string;
    name: string;
    /** Locative: "Ankara'da". */
    inCity: string;
    /** Dative: "Ankara'ya". */
    toCity: string;
    /** Genitive-style: "Ankara'daki". */
    ofCity: string;
    order: number;
    /** What we can truthfully say about past work in this city. */
    reference: string;
    referenceAnswer: string;
    venues: string;
};

const cities: City[] = [
    {
        slug: "ankara-photobooth-kiralama",
        name: "Ankara",
        inCity: "Ankara'da",
        toCity: "Ankara'ya",
        ofCity: "Ankara'daki",
        order: 1,
        reference: "Ankara'da bugüne kadar TRT ve Anadolu Ajansı etkinliklerinde kurulum yaptık.",
        referenceAnswer: "Evet. Ankara'da TRT ve Anadolu Ajansı etkinliklerinde kurulum yaptık.",
        venues: "Kurum ve şirket etkinlikleri, kongreler, lansmanlar, bayi toplantıları ve yıl sonu kutlamaları için kurulum yapıyoruz.",
    },
    {
        slug: "izmir-photobooth-kiralama",
        name: "İzmir",
        inCity: "İzmir'de",
        toCity: "İzmir'e",
        ofCity: "İzmir'deki",
        order: 2,
        reference: "İzmir'de Turkcell için photobooth kurulumu yaptık.",
        referenceAnswer: "Evet. İzmir'de Turkcell için photobooth kurulumu yaptık.",
        venues: "Fuar stantları, kurumsal etkinlikler, lansmanlar, bayi toplantıları ve yıl sonu kutlamaları için kurulum yapıyoruz.",
    },
    {
        slug: "antalya-photobooth-kiralama",
        name: "Antalya",
        inCity: "Antalya'da",
        toCity: "Antalya'ya",
        ofCity: "Antalya'daki",
        order: 3,
        reference: "Antalya'da Nirvana otelde bir tohum markasının etkinliğinde kurulum yaptık.",
        referenceAnswer: "Evet. Antalya'da Nirvana otelde bir tohum markasının etkinliğinde kurulum yaptık.",
        venues: "Otellerde yapılan bayi toplantıları, kongreler, gala geceleri ve kurumsal etkinlikler için kurulum yapıyoruz.",
    },
];

const photo = "/hizmetler/photobooth-ve-fotograf-aktivasyonlari";
const ai = "/hizmetler/yapay-zeka-etkinlik-cozumleri";

function build(city: City) {
    const others = [
        { name: "İstanbul", path: "/hizmetler/istanbul-ai-photobooth" },
        ...cities.filter((c) => c.slug !== city.slug).map((c) => ({ name: c.name, path: `/hizmetler/${c.slug}` })),
    ];

    const content = `<h2>${city.inCity} Photobooth ve Etkinlik Teknolojisi Kiralama</h2>
<p>MetasoftCo, İstanbul Teknokent merkezli bir etkinlik teknolojisi şirketidir ve ${city.ofCity} etkinliklere anahtar teslim kurulum yapar: cihazlar, teknik ekip ve markaya özel tasarım İstanbul'dan gelir. ${city.reference}</p>
<p>${city.venues}</p>

<h2>${city.inCity} Kiralayabileceğiniz Aktiviteler</h2>
<ul>
<li><strong><a href="${ai}/ai-photobooth-kirala">AI Photobooth</a>:</strong> misafirin fotoğrafını yapay zekâ ile etkinliğin temasına göre dönüştürür. Saatte ortalama 80–120 kişi.</li>
<li><strong><a href="${photo}/photobooth-kirala">Photobooth</a>:</strong> fotoğraf, GIF ve Boomerang çeken kompakt kiosk. 2 m² alan, saatte 70–80 kişi.</li>
<li><strong><a href="${photo}/mirror-booth">Mirror Booth</a>:</strong> büyük dokunmatik ayna ekranlı photobooth. 4 m² alan, saatte 60–80 kişi.</li>
<li><strong><a href="${photo}/cabin-photo">Cabin Photo</a>:</strong> dört tarafı kapalı fotoğraf kabini. 5 m² alan, saatte yaklaşık 50 kişi.</li>
<li><strong><a href="/hizmetler/video/360-video-booth">360 Video Booth</a>:</strong> dönen kamerayla yavaş çekim 360 derece video. 3 m² alan, saatte 40–50 kişi.</li>
<li><strong><a href="/hizmetler/interaktif-etkinlik-aktiviteleri">İnteraktif oyunlar</a>:</strong> refleks oyunları, quiz, dijital hediye çarkı ve diğerleri.</li>
</ul>
<p>Fotoğraf aktivasyonlarında fotoğraf saniyeler içinde basılır ve QR kod ile telefona da iner; pakete 750 adet baskı dahildir. Kiosklar markanıza göre giydirilir, ekran arayüzü ve fotoğraf çerçevesi logonuz ve kurumsal renklerinizle hazırlanır.</p>

<h2>${city.ofCity} Etkinliğe Kurulum Nasıl Yapılır?</h2>
<ul>
<li><strong>Ulaşım ve konaklama:</strong> teklife dahil edilir ya da sizin organizasyonunuzla planlanır.</li>
<li><strong>Kurulum zamanı:</strong> etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce; cihaz başına ortalama 30–40 dakika.</li>
<li><strong>Saha ekibi:</strong> etkinlik boyunca alanda en az iki teknik personel.</li>
<li><strong>Mekândan beklenen:</strong> tek bir standart 220V priz. İnternet kendi 5G mobil altyapımızla gelir.</li>
<li><strong>Kapsam:</strong> nakliye, kurulum, söküm, teknik personel ve markaya özel tasarım fiyata dahildir.</li>
</ul>

<h2>Etkinlikte Katılımcı Verisi Toplama</h2>
<p>İsterseniz aktivasyona <a href="/hizmetler/data-capture-crm">Data-Capture &amp; CRM</a> modülü eklenir: katılımcı QR kodu okutup formu doldurur, kayıtlar müşteri panelinize anlık düşer ve Excel/CSV olarak indirilir.</p>

<h2>Diğer Şehirler</h2>
<p>${others.map((o) => `<a href="${o.path}">${o.name}</a>`).join(", ")} ve Türkiye genelinde de aynı kapsamla hizmet veriyoruz.</p>`;

    const faq = [
        {
            q: `${city.inCity} photobooth kiralama hizmeti veriyor musunuz?`,
            a: `Evet. İstanbul merkezli bir ekibiz ve ${city.ofCity} etkinliklere anahtar teslim kurulum yapıyoruz: nakliye, kurulum, söküm, teknik personel ve markaya özel tasarım fiyata dahildir.`,
        },
        {
            q: `${city.inCity} daha önce etkinlik yaptınız mı?`,
            a: city.referenceAnswer,
        },
        {
            q: `${city.ofCity} etkinlik için ulaşım ve konaklama nasıl planlanıyor?`,
            a: "Şehir dışı etkinliklerde ulaşım ve konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır.",
        },
        {
            q: `${city.inCity} hangi aktiviteler kiralanabiliyor?`,
            a: "İstanbul'da kiraladığımız ürünlerin tamamı: AI Photobooth, Photobooth, Mirror Booth, Cabin Photo, 360 Video Booth, AI Greenbox ve interaktif oyunlar.",
        },
        {
            q: "Kurulum ne zaman yapılır ve mekândan ne gerekir?",
            a: "Kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır; cihaz başına ortalama 30–40 dakika sürer. Mekândan tek bir standart 220V priz beklenir; internet kendi 5G mobil altyapımızla gelir.",
        },
    ];

    return {
        slug: city.slug,
        title: `${city.name} Photobooth Kiralama`,
        h1: `${city.name} Photobooth ve Etkinlik Teknolojisi Kiralama`,
        excerpt: `${city.ofCity} kurumsal etkinlik, lansman ve fuarlar için AI Photobooth, Mirror Booth, 360 Video Booth ve interaktif oyunları anahtar teslim kiralıyoruz: nakliye, kurulum, teknik personel ve markaya özel tasarım dahil.`,
        content,
        faq: JSON.stringify(faq),
        metaTitle: `${city.name} Photobooth Kiralama | Etkinlik Teknolojisi — MetasoftCo`,
        metaDescription: `${city.inCity} photobooth kiralama: AI Photobooth, Mirror Booth, 360 Video Booth ve interaktif oyunlar. Nakliye, kurulum, teknik personel ve markaya özel tasarım dahil.`,
        metaKeywords: `${city.name.toLocaleLowerCase("tr")} photobooth kiralama, ${city.name.toLocaleLowerCase("tr")} ai photobooth, ${city.name.toLocaleLowerCase("tr")} etkinlik teknolojisi, ${city.name.toLocaleLowerCase("tr")} 360 video booth kiralama`,
        order: city.order,
        published: true,
    };
}

async function main() {
    const serviceIds: string[] = [];
    for (const [categorySlug, serviceSlug] of relatedServices) {
        const service = await prisma.service.findFirst({
            where: { slug: serviceSlug, category: { slug: categorySlug } },
            select: { id: true },
        });
        if (service) serviceIds.push(service.id);
        else console.warn(`Related service not found, left out: ${categorySlug}/${serviceSlug}`);
    }

    for (const city of cities) {
        const existing = await prisma.sectorPage.findUnique({ where: { slug: city.slug } });
        if (existing) {
            console.log(`Page already exists, skipped: ${city.slug}`);
            continue;
        }
        await prisma.sectorPage.create({ data: { ...build(city), serviceIds: JSON.stringify(serviceIds) } });
        console.log(`Created /hizmetler/${city.slug}`);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
