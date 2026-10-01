import "dotenv/config";
import { prisma } from "../src/lib/db";

// Fourth post of docs/seo-kapsama-haritasi.md: no page explained what drives
// rental pricing ("photobooth kiralama fiyatları"). By decision the post gives
// no figures, only the factors. Created UNPUBLISHED for review in the
// editpanel. A rerun refreshes the text while the post is still a draft and
// leaves it alone once published.

const slug = "photobooth-kiralama-fiyati-neye-gore-belirlenir";

// [categorySlug, serviceSlug] pairs shown as "related services" on the post.
const relatedServices: [string, string][] = [
    ["photobooth-ve-fotograf-aktivasyonlari", "photobooth-kirala"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "mirror-booth"],
    ["video", "360-video-booth"],
    ["photobooth-ve-fotograf-aktivasyonlari", "cabin-photo"],
];

const content = `<p><strong>Kısa cevap:</strong> Photobooth ve etkinlik teknolojisi kiralama fiyatını altı şey belirler: hangi ürünlerin kiralanacağı, katılımcı sayısı, etkinliğin kaç gün süreceği, etkinliğin İstanbul içinde mi dışında mı olduğu, markaya özel tasarımın kapsamı ve baskı adedi. Birden fazla gün süren ya da birden fazla ürün içeren kiralamalarda indirim uygulanır. Etkinliğin kaç saat sürdüğü, sezon ve rezervasyonun ne kadar önceden yapıldığı ise fiyatı değiştirmez.</p>

<h2>Neden sabit bir fiyat listesi yok?</h2>
<p>Aynı ürün, 100 kişilik tek günlük bir İstanbul davetinde ve 1.000 kişilik üç günlük bir şehir dışı fuarda çok farklı bir operasyon demektir: cihaz sayısı, ekibin sahada kalacağı süre ve ulaşım değişir. Aşağıdaki altı kalem netleştiğinde fiyat da netleşir.</p>

<h2>1. Kiralanacak ürünler</h2>
<p>Her ürünün donanımı ve hazırlığı farklıdır. Kompakt bir <a href="/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala">Photobooth</a> ile her etkinlik için yapay zekâ teması ayrıca hazırlanan bir <a href="/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala">AI Photobooth</a> aynı kalemde değildir. Birden fazla ürün birlikte kiralanabilir; örneğin baskı veren bir fotoğraf aktivasyonunun yanına <a href="/hizmetler/video/360-video-booth">360 Video Booth</a> ya da bir oyun eklenebilir. Aynı etkinliğe birden fazla ürün kiralandığında indirim uygulanır.</p>

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
<p>Fiyat günlüktür; etkinliğin gün içinde kaç saat sürdüğü fiyatı değiştirmez. Fuar ve festival gibi birden fazla gün süren etkinliklerde fiyat gün sayısına göre hesaplanır ve çok günlü kiralamalarda indirim uygulanır.</p>

<h2>4. Lokasyon</h2>
<p>İstanbul içindeki etkinliklerde ulaşım, kurulum ve söküm teklife dahildir. İstanbul dışındaki etkinliklerde fiyatı lokasyon da etkiler: ekibin ve ekipmanın ulaşımı ile konaklama teklife dahil edilir ya da sizin organizasyonunuzla planlanır. Bugüne kadar İstanbul, Ankara, İzmir, Antalya, Bodrum, Adana, Diyarbakır, Kocaeli, Sapanca ve Çorum'da kurulum yaptık.</p>

<h2>5. Markaya özel tasarımın kapsamı</h2>
<p>Ekran arayüzü, fotoğraf çerçevesi ve kiosk giydirmesi her kiralamada markanıza göre hazırlanır. Bunun ötesinde istenen özel çalışmalar, örneğin etkinliğe özel yapay zekâ temaları ya da markaya özel oyun içeriği, kapsamı ve dolayısıyla fiyatı etkiler.</p>

<h2>6. Baskı adedi</h2>
<p>Baskılı aktivasyonlarda pakete 750 adet baskı dahildir. Etkinliğinizde bundan fazla baskı gerekecekse ek baskılar ayrıca fiyatlanır; beklenen katılımcı sayısını teklif aşamasında paylaşmanız bu yüzden önemlidir.</p>

<h2>Fiyatı değiştirmeyenler</h2>
<ul>
<li><strong>Etkinliğin saati:</strong> fiyat günlüktür; üç saatlik bir davet ile tam günlük bir etkinlik aynı fiyatlanır.</li>
<li><strong>Sezon:</strong> yıl sonu gibi yoğun dönemlerde fiyat artmaz.</li>
<li><strong>Son dakika rezervasyonu:</strong> kiosk giydirmesi ve tasarım etkinliğe yetişecekse fiyat aynıdır.</li>
<li><strong>Lead toplama:</strong> istenirse <a href="/hizmetler/data-capture-crm">Data-Capture &amp; CRM</a> modülü ek ücret olmadan eklenir.</li>
<li><strong>Ek talepler:</strong> İngilizce operatör gibi talepler için ayrıca ücret alınmaz.</li>
</ul>

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
        a: "Kiralanacak ürünlere, katılımcı sayısına, etkinliğin kaç gün süreceğine, etkinliğin İstanbul içinde mi dışında mı olduğuna, markaya özel tasarımın kapsamına ve baskı adedine göre belirlenir. Teklif etkinliğe göre hazırlanır.",
    },
    {
        q: "Birden fazla gün ya da birden fazla ürün kiralamada indirim var mı?",
        a: "Evet. Birden fazla gün süren kiralamalarda ve aynı etkinliğe birden fazla ürün kiralandığında indirim uygulanır.",
    },
    {
        q: "Photobooth kiralama saatlik mi, günlük mü fiyatlanır?",
        a: "Günlük fiyatlanır. Etkinliğin gün içinde kaç saat sürdüğü fiyatı değiştirmez.",
    },
    {
        q: "Yılbaşı gibi yoğun dönemlerde ya da son dakika rezervasyonlarında fiyat artar mı?",
        a: "Hayır. Yoğun dönemlerde fiyat artmaz. Son dakika rezervasyonlarında da kiosk giydirmesi ve tasarım etkinliğe yetişecekse fiyat aynıdır.",
    },
    {
        q: "Photobooth kiralama fiyatına neler dahil?",
        a: "Nakliye, kurulum, söküm, etkinlik boyunca alanda en az iki teknik personel, markaya özel arayüz ve kiosk giydirmesi, QR ile dijital paylaşım ve baskılı aktivasyonlarda 750 adet baskı fiyata dahildir. 750'den fazla baskı ayrıca fiyatlanır. Lead toplama istenirse Data-Capture modülü ek ücret olmadan eklenir.",
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
    if (existing?.published) {
        console.log("Post is published, skipping.");
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

    const data = {
            slug,
            title: "Photobooth ve Etkinlik Teknolojisi Kiralama Fiyatını Ne Belirler?",
            excerpt:
                "Photobooth kiralama fiyatı ürüne, katılımcı sayısına, gün sayısına, lokasyona, tasarım kapsamına ve baskı adedine göre değişir. Fiyatı neyin değiştirmediğini, nelerin dahil olduğunu ve hızlı teklif için gerekenleri anlatıyoruz.",
            content,
            category: "Etkinlik Teknolojileri",
            author: "MetasoftCo Ekibi",
            metaTitle: "Photobooth Kiralama Fiyatı Neye Göre Belirlenir? | MetasoftCo",
            metaDescription:
                "Photobooth ve etkinlik teknolojisi kiralama fiyatını belirleyen 6 kalem: ürün, katılımcı sayısı, gün sayısı, lokasyon, tasarım kapsamı ve baskı adedi. Fiyata dahil olanlar ve teklif için gerekenler.",
            faq: JSON.stringify(faq),
            serviceIds: JSON.stringify(serviceIds),
            published: false,
    };
    if (existing) await prisma.blogPost.update({ where: { id: existing.id }, data });
    else await prisma.blogPost.create({ data });
    console.log(`Draft ${existing ? "refreshed" : "created"}: /blog/${slug} (unpublished)`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
