import "dotenv/config";
import { prisma } from "../src/lib/db";

// Search Console (Jun–Sep 2026): "… kiralama" queries land on these four pages
// at positions 41–57. They had no FAQ, generic meta titles and no practical
// planning info. This adds a "Alan ve kurulum" section, a product FAQ and
// query-matching meta. Existing copy is kept; reruns are no-ops.
//
// The shared rental block already answers price, indoor use, branding, setup
// time and cities, so the product FAQs below stay off those questions.

// The section opens with this heading; its presence means the page is done.
const MARKER = "<h3><strong>Alan ve Kurulum</strong></h3>";

type Target = {
    categorySlug: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
    section: string;
    faq: { q: string; a: string }[];
};

const targets: Target[] = [
    {
        categorySlug: "photobooth-ve-fotograf-aktivasyonlari",
        slug: "mirror-booth",
        metaTitle: "Mirror Booth Kiralama | Aynalı Photobooth — MetasoftCo",
        metaDescription:
            "Mirror Booth kiralama: dokunmatik ayna ekranlı photobooth, anında baskı ve QR ile dijital paylaşım. 4 m² alan yeterli; nakliye, kurulum ve teknik personel dahil.",
        section: `${MARKER}
<p>Mirror Booth için <strong>4 m² alan</strong> yeterlidir. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G mobil altyapımızla gelir. Kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer.</p>
<h3><strong>Baskı, Dijital Çıktı ve Marka Uyarlaması</strong></h3>
<p>Her fotoğraf saniyeler içinde basılır; pakete 750 adet baskı dahildir. Aynı fotoğraf QR kod ile misafirin telefonuna dijital olarak da ulaşır. Fotoğraflar marka logolu, kurumsal renklerde dijital çerçeveyle çıkar; kiosk markanıza göre giydirilir, ekran arayüzü markaya özel tasarlanır.</p>
<h3><strong>Kiralamaya Dahil Olanlar</strong></h3>
<ul><li>Nakliye, kurulum ve söküm</li><li>Etkinlik boyunca alanda teknik personel</li><li>Markaya özel arayüz, dijital çerçeve ve kiosk giydirmesi</li><li>750 adet baskı ve QR ile dijital paylaşım</li></ul>`,
        faq: [
            {
                q: "Mirror Booth nedir?",
                a: "Mirror Booth, ekranı büyük bir dokunmatik ayna olan photobooth'tur. Misafir aynanın karşısına geçer, ekrandaki yönlendirmelerle fotoğrafını çeker; fotoğraf saniyeler içinde basılır ve QR kod ile telefona da iner.",
            },
            {
                q: "Mirror Booth için ne kadar alan gerekir?",
                a: "4 m² alan yeterlidir. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G mobil altyapımızla gelir.",
            },
            {
                q: "Mirror Booth baskı veriyor mu, yoksa yalnızca dijital mi?",
                a: "İkisini de veriyor. Fotoğraf saniyeler içinde basılır, aynı anda QR kod ile dijital olarak paylaşılır. Kiralama paketine 750 adet baskı dahildir.",
            },
            {
                q: "Mirror Booth ile klasik photobooth arasındaki fark nedir?",
                a: "Klasik photobooth kompakt bir kiosktur ve 2 m² alana sığar. Mirror Booth'ta ekranın kendisi büyük bir dokunmatik aynadır; misafir aynaya bakarak poz verir ve fotoğrafın üzerine ayna üzerinden imza atabilir. Bu nedenle 4 m² alan ister ve gala, davet gibi şıklığın öne çıktığı etkinliklerde tercih edilir.",
            },
            {
                q: "Mirror Booth hangi etkinliklere uygundur?",
                a: "Gala geceleri, yılbaşı partileri, lansmanlar, bayi toplantıları ve kurumsal davetler için uygundur. Marka logolu dijital çerçeve ve kiosk giydirmesiyle etkinliğin görsel kimliğine uyarlanır.",
            },
        ],
    },
    {
        categorySlug: "photobooth-ve-fotograf-aktivasyonlari",
        slug: "photobooth-kirala",
        metaTitle: "Photobooth Kiralama | Etkinlik İçin Photo Booth — MetasoftCo",
        metaDescription:
            "Photobooth kiralama: fotoğraf, GIF ve Boomerang çeken kompakt kiosk; anında baskı ve QR ile dijital paylaşım. 2 m² alan yeterli; kurulum ve teknik personel dahil.",
        section: `${MARKER}
<p>Photobooth için <strong>2 m² alan</strong> yeterlidir. Saatte ortalama 70–80 kişiye hizmet verir; misafirler gruplar hâlinde çekildiğinde bu sayı 150 kişiye kadar çıkar. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G mobil altyapımızla gelir. Kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer.</p>
<h3><strong>Baskı, Dijital Çıktı ve Marka Uyarlaması</strong></h3>
<p>Her fotoğraf saniyeler içinde basılır; pakete 750 adet baskı dahildir. Aynı fotoğraf QR kod ile misafirin telefonuna dijital olarak da ulaşır. Fotoğraflar marka logolu, kurumsal renklerde dijital çerçeveyle çıkar; kiosk markanıza göre giydirilir, ekran arayüzü markaya özel tasarlanır.</p>
<h3><strong>Kiralamaya Dahil Olanlar</strong></h3>
<ul><li>Nakliye, kurulum ve söküm</li><li>Etkinlik boyunca alanda teknik personel</li><li>Markaya özel arayüz, dijital çerçeve ve kiosk giydirmesi</li><li>750 adet baskı ve QR ile dijital paylaşım</li></ul>`,
        faq: [
            {
                q: "Photobooth nedir?",
                a: "Photobooth, misafirlerin kendi fotoğrafını çektiği dokunmatik ekranlı bir kiosktur. Fotoğraf, GIF ve Boomerang çeker; çıktıyı saniyeler içinde basar ve QR kod ile telefona gönderir.",
            },
            {
                q: "Photobooth için ne kadar alan gerekir?",
                a: "2 m² alan yeterlidir. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G mobil altyapımızla gelir.",
            },
            {
                q: "Photobooth saatte kaç kişiye hizmet verir?",
                a: "Saatte ortalama 70–80 kişiye hizmet verir. Misafirler gruplar hâlinde çekildiğinde bu sayı saatte 150 kişiye kadar çıkar.",
            },
            {
                q: "Photobooth kiralamaya kaç baskı dahil?",
                a: "Kiralama paketine 750 adet baskı dahildir. Fotoğraflar ayrıca QR kod ile dijital olarak paylaşılır.",
            },
            {
                q: "Fotoğrafların üzerinde markamız yer alır mı?",
                a: "Evet. Fotoğraflar marka logolu, kurumsal renklerde dijital çerçeveyle çıkar. Kiosk da markanıza göre giydirilir ve ekran arayüzü markaya özel tasarlanır.",
            },
            {
                q: "Photobooth hangi etkinliklere uygundur?",
                a: "Lansman, fuar standı, bayi toplantısı, yılbaşı partisi ve şirket içi etkinlikler için uygundur. Az yer kapladığı için dar stantlarda da kurulabilir.",
            },
        ],
    },
    {
        categorySlug: "photobooth-ve-fotograf-aktivasyonlari",
        slug: "cabin-photo",
        metaTitle: "Fotoğraf Kabini Kiralama | Cabin Photo — MetasoftCo",
        metaDescription:
            "Fotoğraf kabini kiralama: kapalı kabinde çekim, anında baskı ve QR ile dijital paylaşım. 5 m² alan yeterli; nakliye, kurulum ve teknik personel dahil.",
        section: `${MARKER}
<p>Cabin Photo için <strong>5 m² alan</strong> yeterlidir. Saatte yaklaşık 50 kişiye hizmet verir; misafirler kabine girip çıktığı için çekim açık photobooth'a göre biraz daha uzun sürer. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G mobil altyapımızla gelir. Kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer.</p>
<h3><strong>Baskı, Dijital Çıktı ve Marka Uyarlaması</strong></h3>
<p>Her fotoğraf saniyeler içinde basılır; pakete 750 adet baskı dahildir. Aynı fotoğraf QR kod ile misafirin telefonuna dijital olarak da ulaşır. Fotoğraflar marka logolu, kurumsal renklerde dijital çerçeveyle çıkar; kabin markanıza göre giydirilir, ekran arayüzü markaya özel tasarlanır.</p>
<h3><strong>Kiralamaya Dahil Olanlar</strong></h3>
<ul><li>Nakliye, kurulum ve söküm</li><li>Etkinlik boyunca alanda teknik personel</li><li>Markaya özel arayüz, dijital çerçeve ve kabin giydirmesi</li><li>750 adet baskı ve QR ile dijital paylaşım</li></ul>`,
        faq: [
            {
                q: "Fotoğraf kabini (Cabin Photo) nedir?",
                a: "Cabin Photo, misafirlerin içine girip fotoğraf çektirdiği, dört tarafı kapalı bir fotoğraf kabinidir. Fotoğraf saniyeler içinde basılır ve QR kod ile telefona da iner.",
            },
            {
                q: "Fotoğraf kabini için ne kadar alan gerekir?",
                a: "5 m² alan yeterlidir. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G mobil altyapımızla gelir.",
            },
            {
                q: "Fotoğraf kabini ile açık photobooth arasındaki fark nedir?",
                a: "Açık photobooth 2 m² alana sığan bir kiosktur ve çekim herkesin gözü önünde yapılır. Fotoğraf kabini kapalıdır; misafirler kimse izlemeden poz verir. Buna karşılık 5 m² alan ister.",
            },
            {
                q: "Fotoğraf kabini saatte kaç kişiye hizmet verir?",
                a: "Saatte yaklaşık 50 kişiye hizmet verir. Misafirler kabine girip çıktığı için çekim açık photobooth'a göre biraz daha uzun sürer.",
            },
            {
                q: "Fotoğraf kabini baskı veriyor mu?",
                a: "Evet. Fotoğraf saniyeler içinde basılır ve aynı anda QR kod ile dijital olarak paylaşılır. Kiralama paketine 750 adet baskı dahildir.",
            },
            {
                q: "Kabinin dışı markamıza göre kaplanabilir mi?",
                a: "Evet. Kabin markanıza göre giydirilir, ekran arayüzü markaya özel tasarlanır ve fotoğraflar marka logolu dijital çerçeveyle çıkar.",
            },
        ],
    },
    {
        categorySlug: "video",
        slug: "360-video-booth",
        metaTitle: "360 Video Booth Kiralama | 360 Derece Video Platformu — MetasoftCo",
        metaDescription:
            "360 Video Booth kiralama: dönen kamerayla yavaş çekim 360 derece video, QR ile anında dijital paylaşım. 3 m² alan yeterli; kurulum ve teknik personel dahil.",
        section: `${MARKER}
<p>360 Video Booth için <strong>3 m² alan</strong> yeterlidir. Saatte ortalama 40–50 kişiye hizmet verir. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G mobil altyapımızla gelir. Kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer.</p>
<h3><strong>Dijital Çıktı ve Marka Uyarlaması</strong></h3>
<p>360 Video Booth video ürettiği için baskı vermez; video QR kod ile misafirin telefonuna dijital olarak ulaşır. Videonun giriş-çıkış ekranları ve hareketli grafikleri marka logosu ve kurumsal renklerle hazırlanır; ekran arayüzü markaya özel tasarlanır.</p>
<h3><strong>Kiralamaya Dahil Olanlar</strong></h3>
<ul><li>Nakliye, kurulum ve söküm</li><li>Etkinlik boyunca alanda teknik personel</li><li>Markaya özel arayüz ve video grafikleri</li><li>QR ile anında dijital paylaşım</li></ul>`,
        faq: [
            {
                q: "360 Video Booth nedir?",
                a: "360 Video Booth, misafirin bir platformun üzerinde durduğu ve kameranın etrafında dönerek 360 derece video çektiği bir video aktivasyonudur. Video yavaş çekim ve markaya özel grafiklerle kurgulanır, QR kod ile telefona iner.",
            },
            {
                q: "360 Video Booth için ne kadar alan gerekir?",
                a: "3 m² alan yeterlidir. Mekândan tek bir standart 220V priz bekliyoruz; internet kendi 5G mobil altyapımızla gelir.",
            },
            {
                q: "360 Video Booth saatte kaç kişiye hizmet verir?",
                a: "Saatte ortalama 40–50 kişiye hizmet verir.",
            },
            {
                q: "360 Video Booth baskı veriyor mu?",
                a: "Hayır. Çıktı video olduğu için dijitaldir; misafir videoyu QR kod ile telefonuna indirir. Baskılı hatıra isteniyorsa Photobooth, Mirror Booth ya da Cabin Photo ile birlikte kurulabilir.",
            },
            {
                q: "Videolarda markamız yer alır mı?",
                a: "Evet. Videonun giriş-çıkış ekranları ve hareketli grafikleri marka logosu ve kurumsal renklerle hazırlanır; ekran arayüzü de markaya özel tasarlanır.",
            },
            {
                q: "360 Video Booth hangi etkinliklere uygundur?",
                a: "Yılbaşı partileri, gala geceleri, lansmanlar ve festivaller gibi hareketin ve sosyal medya paylaşımının öne çıktığı etkinlikler için uygundur.",
            },
        ],
    },
];

async function main() {
    for (const target of targets) {
        const category = await prisma.serviceCategory.findUnique({ where: { slug: target.categorySlug } });
        if (!category) throw new Error(`Category not found: ${target.categorySlug}`);
        const service = await prisma.service.findUnique({
            where: { categoryId_slug: { categoryId: category.id, slug: target.slug } },
        });
        if (!service) throw new Error(`Service not found: ${target.categorySlug}/${target.slug}`);

        const content = service.content ?? "";
        const hasFaq = Boolean(service.faq && JSON.parse(service.faq).length > 0);
        await prisma.service.update({
            where: { id: service.id },
            data: {
                metaTitle: target.metaTitle,
                metaDescription: target.metaDescription,
                content: content.includes(MARKER) ? content : `${content}\n${target.section}`,
                // An FAQ written in the editpanel wins over this one.
                faq: hasFaq ? service.faq : JSON.stringify(target.faq),
            },
        });
        console.log(`Updated ${target.categorySlug}/${target.slug}${hasFaq ? " (existing FAQ kept)" : ""}`);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
