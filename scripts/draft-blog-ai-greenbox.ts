import "dotenv/config";
import { prisma } from "../src/lib/db";

// Guide for "yapay zekâlı greenbox fotoğraf aktivasyonu ile neler yapılabilir"
// (AI-assistant query gap, October 2026). Built on the AI Greenbox service
// page and the TCMB and Allianz projects. Created UNPUBLISHED for review in
// the editpanel. Reruns are no-ops.

const slug = "ai-greenbox-nedir-etkinlikte-neler-yapilabilir";

// [categorySlug, serviceSlug] pairs shown as "related services" on the post.
const relatedServices: [string, string][] = [
    ["yapay-zeka-etkinlik-cozumleri", "ai-greenbox-kiralama"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "photobooth-kirala"],
];

const greenbox = "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama";
const tcmb = "/projeler/tcmb-ai-greenbox-dijital-fotograf-aktivasyonu-istanbul-finans-merkezi";
const allianz = "/projeler/allianz-x-ai-greenbox";

const content = `<p><strong>Kısa cevap:</strong> AI Greenbox, misafirin fotoğrafını çekip arka planı yapay zekâ ile değiştiren bir fotoğraf aktivasyonudur. Fiziksel dekor ya da yeşil perde kurmadan misafiri markanıza özel tasarlanmış dijital bir dünyaya yerleştirir; görsel saniyeler içinde üretilir ve QR kod ile telefona iner.</p>

<h2>AI Greenbox klasik greenbox'tan nasıl ayrılır?</h2>
<p>Klasik greenbox'ta misafir yeşil bir perdenin önünde durur ve yazılım yeşil rengi silip yerine hazır bir görsel koyar. Sonuç çoğu zaman “yapıştırılmış” görünür ve perde için geniş, eşit aydınlatılmış bir alan gerekir.</p>
<p><a href="${greenbox}">AI Greenbox</a>'ta iki fark vardır:</p>
<ul>
<li><strong>Perde zorunlu değildir.</strong> Yapay zekâ arka planı kendisi algılayıp temizler; bu yüzden dar alanlarda da kurulabilir.</li>
<li><strong>Misafir sahnenin parçası olur.</strong> Sistem kişinin yüz hatlarını ve mimiklerini korurken onu yeni sahneye ışık ve stil olarak uyumlu biçimde yerleştirir.</li>
</ul>

<h2>Etkinlikte AI Greenbox ile neler yapılabilir?</h2>

<h3>1. Dekor kurmadan markaya özel sahne</h3>
<p>Fiziksel dekorun kurulamadığı ya da kurulmasının istenmediği mekânlarda sahne dijital olarak tasarlanır. <a href="${tcmb}">TCMB'nin İstanbul Finans Merkezi'ndeki Merkez Akademi etkinliğinde</a> katılımcıları kuruma özel tasarlanan dijital dünyalara yerleştirdik; kompozisyon kurumsal kimliğe uygun dijital çerçevelerle tamamlandı.</p>

<h3>2. Kampanya hikâyesinin içine misafiri koymak</h3>
<p>Arka plan yalnızca bir manzara olmak zorunda değil; kampanyanın görsel dili olabilir. <a href="${allianz}">Allianz'ın “Ada'nın Yıldızı” deneyiminde</a> markanın mavi tonları ve yıldız detaylarıyla kurulan sahneye her ziyaretçinin portresini yerleştirdik. Ziyaretçi kampanyayı izlemek yerine onun içinde yer aldı.</p>

<h3>3. Misafirin kendi yazdığı sahne</h3>
<p>İki çalışma modu vardır. İlkinde sahneler markanız için önceden hazırlanır ve misafir bunlardan birini seçer; akış hızlıdır. İkincisinde misafir kendi komutunu (prompt) yazar ve hayalindeki arka planı o an üretir. Kalabalık etkinliklerde hazır sahneleri, daha küçük ve deneyim odaklı etkinliklerde serbest modu öneririz.</p>

<h3>4. Etkinlik temasına göre farklı dünyalar</h3>
<p>Uzay çağı, Rönesans, cyberpunk ya da tamamen soyut bir stil: tema etkinliğin konseptine göre belirlenir ve sahneler buna göre tasarlanır. Aynı etkinlikte birden fazla sahne sunulabilir.</p>

<h3>5. Paylaşılabilir ve basılabilir çıktı</h3>
<p>Görsel ekranda beliren QR kod ile misafirin telefonuna iner ve sosyal medya için uygun formatta sunulur. İstenirse baskı da verilir.</p>

<h2>Hangi etkinliklere uygun?</h2>
<ul>
<li><strong>Kurumsal etkinlikler ve akademiler:</strong> resmî mekânlarda dekor kurmadan kuruma özel görsel.</li>
<li><strong>Lansmanlar:</strong> ürünün ya da kampanyanın dünyasını misafire yaşatmak için.</li>
<li><strong>Fuar stantları:</strong> perde gerektirmediği için dar stantlarda kurulabilir.</li>
<li><strong>Bayi toplantıları ve gala geceleri:</strong> gecenin temasına özel hatıra.</li>
</ul>

<h2>Planlarken bilmeniz gerekenler</h2>
<ul>
<li><strong>Hazırlık:</strong> sahneler ve çerçeve etkinlikten önce markanıza göre tasarlanır; tema ve görsel dilinizi ne kadar erken paylaşırsanız sonuç o kadar isabetli olur.</li>
<li><strong>Kurulum:</strong> etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır.</li>
<li><strong>Altyapı:</strong> standart bir 220V priz yeterlidir; internet kendi 5G modemlerimizle gelir.</li>
<li><strong>Ekip:</strong> etkinlik boyunca alanda en az iki teknik personel bulunur.</li>
<li><strong>Veri:</strong> isterseniz <a href="/hizmetler/data-capture-crm">Data-Capture &amp; CRM</a> modülüyle katılımcı kaydı toplanır.</li>
</ul>
<p>Etkinliğinizin temasını paylaşırsanız size özel sahne önerileriyle dönüş yaparız: <a href="/iletisim">teklif alın</a>.</p>`;

const faq = [
    {
        q: "AI Greenbox nedir?",
        a: "AI Greenbox, misafirin fotoğrafını çekip arka planı yapay zekâ ile değiştiren fotoğraf aktivasyonudur. Misafiri fiziksel dekor kurmadan markaya özel tasarlanmış dijital bir dünyaya yerleştirir.",
    },
    {
        q: "Yapay zekâlı greenbox fotoğraf aktivasyonu ile neler yapılabilir?",
        a: "Dekor kurmadan markaya özel sahne oluşturulabilir, misafir kampanya görselinin içine yerleştirilebilir, misafir kendi yazdığı komutla arka plan üretebilir ve etkinlik temasına göre farklı dünyalar sunulabilir.",
    },
    {
        q: "AI Greenbox için yeşil perde gerekir mi?",
        a: "Hayır. Yapay zekâ arka planı kendisi algılayıp temizler; fiziksel yeşil perde zorunlu değildir. Bu sayede dar alanlarda da kurulabilir.",
    },
    {
        q: "AI Greenbox hangi etkinliklerde kullanıldı?",
        a: "TCMB'nin İstanbul Finans Merkezi'ndeki Merkez Akademi etkinliğinde ve Allianz'ın “Ada'nın Yıldızı” deneyiminde kullanıldı.",
    },
    {
        q: "Arka planları misafir mi seçiyor, marka mı belirliyor?",
        a: "İki mod vardır: misafir markanız için önceden hazırlanan sahnelerden birini seçer ya da kendi komutunu yazarak arka planı o an üretir.",
    },
    {
        q: "Görsel misafire nasıl teslim edilir?",
        a: "Görsel saniyeler içinde üretilir ve ekrandaki QR kod ile telefona iner. İstenirse baskı da verilir.",
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
            title: "AI Greenbox Nedir? Etkinlikte Yapay Zekâlı Greenbox ile Neler Yapılabilir?",
            excerpt:
                "AI Greenbox, dekor ve yeşil perde kurmadan misafiri markaya özel dijital bir dünyaya yerleştirir. Klasik greenbox'tan farkı, etkinlikte kullanım biçimleri ve TCMB ile Allianz örnekleri.",
            content,
            category: "Etkinlik Teknolojileri",
            author: "MetasoftCo Ekibi",
            metaTitle: "AI Greenbox Nedir? Etkinlikte Neler Yapılabilir? | MetasoftCo",
            metaDescription:
                "AI Greenbox dekor ve yeşil perde olmadan misafiri markaya özel dijital sahneye yerleştirir. Kullanım biçimleri, planlama bilgileri, TCMB ve Allianz örnekleri.",
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
