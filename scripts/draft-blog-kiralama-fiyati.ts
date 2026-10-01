import "dotenv/config";
import { prisma } from "../src/lib/db";

// Fourth post of docs/seo-kapsama-haritasi.md: no page explained what drives
// rental pricing ("photobooth kiralama fiyatları"). By decision the post gives
// no figures, only the factors. Created UNPUBLISHED for review in the
// editpanel. Reruns are no-ops.

const slug = "photobooth-kiralama-fiyati-neye-gore-belirlenir";

// [categorySlug, serviceSlug] pairs shown as "related services" on the post.
const relatedServices: [string, string][] = [
    ["photobooth-ve-fotograf-aktivasyonlari", "photobooth-kirala"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "mirror-booth"],
    ["video", "360-video-booth"],
    ["photobooth-ve-fotograf-aktivasyonlari", "cabin-photo"],
];

const content = `<p><strong>Kısa cevap:</strong> Photobooth ve etkinlik teknolojisi kiralama fiyatını beş şey belirler: hangi ürünlerin kiralanacağı, katılımcı sayısı, etkinliğin kaç gün süreceği, etkinliğin İstanbul içinde mi dışında mı olduğu ve markaya özel tasarımın kapsamı. Birden fazla gün süren kiralamalarda indirim uygulanır. Bu yüzden tek bir liste fiyatı yoktur; teklif etkinliğe göre hazırlanır.</p>

<h2>Neden sabit bir fiyat listesi yok?</h2>
<p>Aynı ürün, 100 kişilik tek günlük bir İstanbul davetinde ve 1.000 kişilik üç günlük bir şehir dışı fuarda çok farklı bir operasyon demektir: cihaz sayısı, ekibin sahada kalacağı süre ve ulaşım değişir. Aşağıdaki beş kalem netleştiğinde fiyat da netleşir.</p>

<h2>1. Kiralanacak ürünler</h2>
<p>Her ürünün donanımı ve hazırlığı farklıdır. Kompakt bir <a href="/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala">Photobooth</a> ile her etkinlik için yapay zekâ teması ayrıca hazırlanan bir <a href="/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala">AI Photobooth</a> aynı kalemde değildir. Birden fazla ürün birlikte kiralanabilir; örneğin baskı veren bir fotoğraf aktivasyonunun yanına <a href="/hizmetler/video/360-video-booth">360 Video Booth</a> ya da bir oyun eklenebilir.</p>

<h2>2. Katılımcı sayısı</h2>
<p>Katılımcı sayısı, kaç istasyon gerektiğini belirler. Saatlik ortalama kapasiteler şöyle:</p>
<ul>
<li><strong>AI Photobooth:</strong> 80–120 kişi</li>
<li><strong>Photobooth:</strong> 70–80 kişi; grup çekimlerinde 150 kişiye kadar</li>
<li><strong>Mirror Booth:</strong> 60–80 kişi</li>
<li><strong>Cabin Photo:</strong> yaklaşık 50 kişi</li>
<li><strong>360 Video Booth:</strong> 40–50 kişi</li>
</ul>
<p>Etkinliğin aktif süresi ile bu rakamları çarptığınızda tek istasyonun yetip yetmeyeceğini görürsünüz. Misafir sayısı tek istasyonun kapasitesini aşıyorsa ikinci bir istasyon ya da ikinci bir aktivite gerekir.</p>

<h2>3. Gün sayısı</h2>
<p>Fuar ve festival gibi birden fazla gün süren etkinliklerde fiyat gün sayısına göre hesaplanır ve çok günlü kiralamalarda indirim uygulanır. Kurulum ve söküm bir kez yapıldığı için gün başına maliyet tek günlük kiralamaya göre düşer.</p>

<h2>4. Lokasyon</h2>
<p>İstanbul içindeki etkinliklerde ulaşım, kurulum ve söküm teklife dahildir. İstanbul dışındaki etkinliklerde fiyatı lokasyon da etkiler: ekibin ve ekipmanın ulaşımı ile konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır. Bugüne kadar İstanbul, Ankara, İzmir, Antalya, Bodrum, Adana, Diyarbakır, Kocaeli, Sapanca ve Çorum'da kurulum yaptık.</p>

<h2>5. Markaya özel tasarımın kapsamı</h2>
<p>Ekran arayüzü, fotoğraf çerçevesi ve kiosk giydirmesi her kiralamada markanıza göre hazırlanır. Bunun ötesinde istenen özel çalışmalar, örneğin etkinliğe özel yapay zekâ temaları ya da markaya özel oyun içeriği, kapsamı ve dolayısıyla fiyatı etkiler.</p>

<h2>Fiyata neler dahil?</h2>
<ul>
<li>Nakliye, kurulum ve söküm</li>
<li>Etkinlik boyunca alanda en az iki teknik personel</li>
<li>Markaya özel arayüz, çıktı tasarımı ve kiosk giydirmesi</li>
<li>QR kod ile anında dijital paylaşım</li>
<li>Baskılı aktivasyonlarda 750 adet baskı</li>
</ul>
<p>Mekândan beklenen tek bir standart 220V prizdir; internet kendi 5G mobil altyapımızla gelir, bunun için ayrıca bir şey ayarlamanız gerekmez.</p>

<h2>Hızlı teklif almak için hazırlamanız gerekenler</h2>
<ul>
<li>Etkinlik tarihi ve kaç gün süreceği</li>
<li>Şehir ve mekân</li>
<li>Beklenen katılımcı sayısı</li>
<li>İlgilendiğiniz ürünler ya da ulaşmak istediğiniz hedef (hatıra, sosyal medya paylaşımı, lead toplama)</li>
<li>Mekânda ayırabileceğiniz alan</li>
</ul>
<p>Bu bilgilerle <a href="/iletisim">teklif istediğinizde</a> size etkinliğinize göre hazırlanmış net bir fiyat döneriz. Sistemi sabit bir noktada sürekli kullanacaksanız <a href="/blog/etkinlik-teknolojisi-kiralamak-mi-satin-almak-mi">kiralamak mı, satın almak mı</a> karşılaştırmasına; teklifte netleşmesi gereken diğer başlıklar için <a href="/blog/anahtar-teslim-etkinlik-teknolojisi-ticari-sartlar">sorulması gereken 8 ticari şart</a> yazısına bakabilirsiniz.</p>`;

const faq = [
    {
        q: "Photobooth kiralama fiyatı neye göre belirlenir?",
        a: "Kiralanacak ürünlere, katılımcı sayısına, etkinliğin kaç gün süreceğine, etkinliğin İstanbul içinde mi dışında mı olduğuna ve markaya özel tasarımın kapsamına göre belirlenir. Teklif etkinliğe göre hazırlanır.",
    },
    {
        q: "Birden fazla gün kiralamada indirim var mı?",
        a: "Evet. Birden fazla gün süren kiralamalarda indirim uygulanır; kurulum ve söküm bir kez yapıldığı için gün başına maliyet düşer.",
    },
    {
        q: "Photobooth kiralama fiyatına neler dahil?",
        a: "Nakliye, kurulum, söküm, etkinlik boyunca alanda en az iki teknik personel, markaya özel arayüz ve kiosk giydirmesi, QR ile dijital paylaşım ve baskılı aktivasyonlarda 750 adet baskı fiyata dahildir.",
    },
    {
        q: "İstanbul dışındaki etkinliklerde fiyat değişir mi?",
        a: "Evet, lokasyon fiyatı etkiler. İstanbul dışındaki etkinliklerde ulaşım ve konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır.",
    },
    {
        q: "Katılımcı sayısı fiyatı nasıl etkiler?",
        a: "Katılımcı sayısı kaç istasyon gerektiğini belirler. Örneğin tek bir AI Photobooth saatte ortalama 80–120 kişiye hizmet verir; misafir sayısı bunu aşıyorsa ikinci bir istasyon ya da ikinci bir aktivite eklenir.",
    },
    {
        q: "Teklif almak için hangi bilgileri vermeliyim?",
        a: "Etkinlik tarihi ve gün sayısı, şehir ve mekân, beklenen katılımcı sayısı, ilgilendiğiniz ürünler ve mekânda ayırabileceğiniz alan yeterlidir.",
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
            title: "Photobooth ve Etkinlik Teknolojisi Kiralama Fiyatını Ne Belirler?",
            excerpt:
                "Photobooth kiralama fiyatı ürüne, katılımcı sayısına, gün sayısına, lokasyona ve markaya özel tasarımın kapsamına göre değişir. Fiyata nelerin dahil olduğunu ve hızlı teklif için hangi bilgilerin gerektiğini anlatıyoruz.",
            content,
            category: "Etkinlik Teknolojileri",
            author: "MetasoftCo Ekibi",
            metaTitle: "Photobooth Kiralama Fiyatı Neye Göre Belirlenir? | MetasoftCo",
            metaDescription:
                "Photobooth ve etkinlik teknolojisi kiralama fiyatını belirleyen 5 kalem: ürün, katılımcı sayısı, gün sayısı, lokasyon ve tasarım kapsamı. Fiyata dahil olanlar ve teklif için gerekenler.",
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
