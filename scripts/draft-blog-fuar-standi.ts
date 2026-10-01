import "dotenv/config";
import { prisma } from "../src/lib/db";

// Third post of docs/seo-kapsama-haritasi.md: "fuar standına ziyaretçi çekme"
// and "etkinlikte veri toplayan kiosk" had a service page but no guide.
// Created UNPUBLISHED for review in the editpanel. Reruns are no-ops.

const slug = "fuar-standina-ziyaretci-ceken-ve-lead-toplayan-aktiviteler";

// [categorySlug, serviceSlug] pairs shown as "related services" on the post.
const relatedServices: [string, string][] = [
    ["interaktif-etkinlik-aktiviteleri", "reflex-game-hiz-ve-rekabet-oyunu"],
    ["interaktif-etkinlik-aktiviteleri", "reflex-wall"],
    ["interaktif-etkinlik-aktiviteleri", "dijital-hediye-carki-aktivasyonu"],
    ["interaktif-etkinlik-aktiviteleri", "catch-collect-game"],
    ["photobooth-ve-fotograf-aktivasyonlari", "photobooth-kirala"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
];

const games = "/hizmetler/interaktif-etkinlik-aktiviteleri";
const photo = "/hizmetler/photobooth-ve-fotograf-aktivasyonlari";
const content = `<p><strong>Kısa cevap:</strong> Fuar standına ziyaretçi çekmenin en güvenilir yolu, koridordan geçen kişiye 30 saniye ile birkaç dakika arasında süren, sonunda skor, hediye ya da fotoğraf veren bir aktivite sunmaktır. Refleks oyunları, dijital hediye çarkı ve photobooth bu işi görür. Aynı aktiviteye bir kayıt adımı eklendiğinde ziyaretçi, satış ekibinizin fuardan sonra arayabileceği bir kayda dönüşür: katılımcı QR kodu okutur, formu doldurur, kayıt panelinize anlık düşer.</p>

<h2>Bir fuar aktivitesinin iki işi vardır</h2>
<p>Birincisi durdurmaktır: koridordaki kişi standın önünde yavaşlamalı ve ne olduğunu merak etmelidir. İkincisi tanışmaktır: duran kişi kim olduğunu bırakmadan gitmemelidir. Çoğu stant birincisini broşürle, ikincisini kartvizit kâsesiyle yapmaya çalışır. İnteraktif bir aktivite ikisini tek adımda birleştirir, çünkü ziyaretçi bilgisini bir şey karşılığında verir: skor tablosunda adını görmek, fotoğrafını telefonuna almak ya da hediyesini kazanmak.</p>

<h2>Ziyaretçiyi durduran aktiviteler</h2>

<h3>Refleks oyunları: 30 saniyelik rekabet</h3>
<p><a href="${games}/reflex-game-hiz-ve-rekabet-oyunu">Reflex Game</a>'de ziyaretçi 30 saniye boyunca rastgele yanan LED butonlara basarak puan toplar. <a href="${games}/reflex-wall">Reflex Wall</a>'da iki kişi aynı anda yarışır. İkisi de kısa sürdüğü için kalabalık fuarlarda sirkülasyonu yüksek tutar; yarışanları izleyenler de standın önünde birikir.</p>

<h3>Dijital Hediye Çarkı: promosyonu oyuna çevirir</h3>
<p>Promosyon ürününü elden dağıtmak yerine <a href="${games}/dijital-hediye-carki-aktivasyonu">Dijital Hediye Çarkı</a> ile kazandırabilirsiniz: ziyaretçi dokunmatik ekrandaki çarkı çevirir, çıkan hediyeyi alır. Pegasus Hava Yolları için kurduğumuz çark, <a href="/projeler/pegasus-hava-yollari-x-dijital-hediye-carki-aktivasyonu">proje sayfasında</a> anlatıldığı gibi markaya özel arayüzle binlerce katılımcıya ödül deneyimi sundu.</p>

<h3>Catch &amp; Collect ve Human vs AI: ürünü ve mesajı oyunun içine koyar</h3>
<p><a href="${games}/catch-collect-game">Catch &amp; Collect</a>'te ziyaretçi QR kod ile oyuna bağlanır, telefonu joystick'e dönüşür ve büyük ekranda markanın ürünlerini toplar. <a href="${games}/gercek-mi-yapay-zeka-mi-human-vs-ai">Human vs AI</a>'da ise markanıza özel hazırlanan sorulara cevap verir; skorlar canlı liderlik tablosuna yansır. Ürününüzü ya da mesajınızı anlatmak istediğiniz fuarlarda bu ikisi öne çıkar.</p>

<h3>Photobooth ve AI Photobooth: standdan çıkan hatıra</h3>
<p><a href="${photo}/photobooth-kirala">Photobooth</a> 2 m² alana sığar ve saatte ortalama 70–80 kişiye hizmet verir; dar stantlar için en uygun fotoğraf aktivitesidir. <a href="/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala">AI Photobooth</a> ziyaretçinin fotoğrafını markanıza özel bir temaya dönüştürür ve saatte ortalama 80–120 kişiye hizmet verir. İkisinde de fotoğraf marka logolu çerçeveyle basılır ve QR kod ile telefona iner; ziyaretçi standınızdan markanızı taşıyan bir hatırayla ayrılır.</p>

<h3>Çizim Robotu: uzaktan görünen bir şov</h3>
<p><a href="${games}/cizim-robotu-kiralama">Çizim Robotu</a> ziyaretçinin fotoğrafını 40–70 saniyede gerçek bir kalemle kâğıda çizer. Robot kolunun hareketi koridordan fark edilir ve standın önünde izleyici toplar.</p>

<h2>Ziyaretçi nasıl lead'e dönüşür?</h2>
<p>Aktiviteye <a href="/hizmetler/data-capture-crm">Data-Capture &amp; CRM</a> modülü eklendiğinde kayıt adımı deneyimin doğal bir parçası olur:</p>
<ul>
<li><strong>Oyunlarda:</strong> skor tablosu isteğe bağlıdır. Ziyaretçi QR kodu okutup formu doldurursa adı skor tablosunda yer alır.</li>
<li><strong>Fotoğraf aktivasyonlarında:</strong> ziyaretçi fotoğrafına QR kod ile ulaşırken markanıza özel mikro sitede ad, şirket ve e-posta gibi bilgilerini paylaşır.</li>
<li><strong>Kayıtlar:</strong> size tanımlanan panele anlık düşer; fuar sürerken canlı takip eder, filtreler ve Excel/CSV olarak indirirsiniz.</li>
</ul>
<p>Formda hangi alanların sorulacağını birlikte belirleriz. Alan sayısı arttıkça formu dolduranların oranı düşer; satış ekibinizin gerçekten kullanacağı bilgilerle sınırlı tutmak en iyi sonucu verir.</p>

<h2>KVKK: veri nasıl toplanır?</h2>
<p>Form, aydınlatma metniyle birlikte sunulur; pazarlama izni ayrı ve isteğe bağlı bir açık rıza onayıyla alınır. Veri sorumlusu sizin markanızdır, MetasoftCo verileri yalnızca talimatlarınız doğrultusunda veri işleyen olarak işler. Veriler standart olarak 90 gün saklanır, bu sürede panelden indirilebilir ve süre sonunda sistemlerimizden silinir. Modül yalnızca sizin talebiniz ve yazılı onayınızla etkinleştirilir.</p>

<h2>Standınıza göre hangisini seçmelisiniz?</h2>
<ul>
<li><strong>Stant dar ise:</strong> Photobooth (2 m²) ya da tek ekranlı bir oyun.</li>
<li><strong>Amaç olabildiğince çok kişiye ulaşmak ise:</strong> Reflex Game ve Dijital Hediye Çarkı gibi kısa süren aktiviteler.</li>
<li><strong>Amaç ürünü anlatmak ise:</strong> Human vs AI ya da Quiz ile markaya özel sorular.</li>
<li><strong>Amaç hatırlanmak ise:</strong> AI Photobooth ya da Çizim Robotu; ziyaretçi elinde markalı bir çıktıyla ayrılır.</li>
</ul>

<h2>Fuar öncesi netleşmesi gerekenler</h2>
<p>Standınızda tek bir standart 220V priz yeterlidir; internet kendi 5G mobil altyapımızla gelir, fuar alanının ağına bağlı kalmazsınız. Kurulum fuardan bir gün önce ya da açılıştan 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer. Fuar boyunca alanda en az iki teknik personel bulunur. Kiosk markanıza göre giydirilir, oyun ve ekran arayüzü markaya özel tasarlanır.</p>
<p>Kiralama anahtar teslimdir: nakliye, kurulum, söküm, teknik personel ve markaya özel tasarım fiyata dahildir. İstanbul dışındaki fuarlarda ulaşım ve konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır. Ayrıntılar <a href="/hizmetler/fuar-aktivasyonlari">Fuar Aktivasyonları</a> sayfasında.</p>`;

const faq = [
    {
        q: "Fuar standına ziyaretçi çekmek için hangi aktiviteler işe yarar?",
        a: "Kısa süren ve sonunda bir sonuç veren aktiviteler: Reflex Game ve Reflex Wall gibi refleks oyunları, Dijital Hediye Çarkı, markaya özel sorulu Human vs AI ve Quiz, Photobooth ve AI Photobooth. Yarışanları izleyenler de standın önünde birikir.",
    },
    {
        q: "Fuarda aktivite ile lead nasıl toplanır?",
        a: "Aktiviteye Data-Capture modülü eklenir. Oyunlarda ziyaretçi skor tablosuna girmek için QR kodu okutup formu doldurur; fotoğraf aktivasyonlarında fotoğrafını alırken bilgilerini paylaşır. Kayıtlar panelinize anlık düşer ve Excel/CSV olarak indirilir.",
    },
    {
        q: "Fuarda toplanan veriler KVKK'ya uygun mu?",
        a: "Form aydınlatma metniyle sunulur, pazarlama izni ayrı ve isteğe bağlı bir açık rıza onayıyla alınır. Veri sorumlusu müşteri markadır, MetasoftCo veri işleyendir. Veriler standart olarak 90 gün saklanır ve süre sonunda silinir.",
    },
    {
        q: "Dar bir fuar standına hangi aktivite sığar?",
        a: "Photobooth 2 m² alana kurulur. Dijital Hediye Çarkı ve Reflex Game gibi tek ekranlı ya da masa tipi oyunlar da dar stantlar için uygundur; gereken alan teklif aşamasında netleştirilir.",
    },
    {
        q: "Fuar alanında internet ve elektrik için ne gerekir?",
        a: "Tek bir standart 220V priz yeterlidir. İnternet kendi 5G mobil altyapımızla gelir; fuar alanının ağına ihtiyaç duymayız.",
    },
    {
        q: "İstanbul dışındaki fuarlara kurulum yapıyor musunuz?",
        a: "Evet. Türkiye genelinde anahtar teslim kurulum yapıyoruz. İstanbul dışındaki etkinliklerde ulaşım ve konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır.",
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
            title: "Fuar Standına Ziyaretçi Çeken ve Lead Toplayan Aktiviteler",
            excerpt:
                "Fuar standına ziyaretçi çekmek ve gelen ziyaretçiyi satış ekibinin arayabileceği bir kayda dönüştürmek için hangi aktiviteler kullanılır? Refleks oyunları, hediye çarkı ve photobooth ile lead toplamanın nasıl işlediğini anlatıyoruz.",
            content,
            category: "Etkinlik Teknolojileri",
            author: "MetasoftCo Ekibi",
            metaTitle: "Fuar Standına Ziyaretçi Çekme ve Lead Toplama Aktiviteleri | MetasoftCo",
            metaDescription:
                "Fuar standına ziyaretçi çeken aktiviteler: refleks oyunları, dijital hediye çarkı, photobooth. QR ile KVKK uyumlu lead toplama, panelden canlı takip ve kurulum bilgileri.",
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
