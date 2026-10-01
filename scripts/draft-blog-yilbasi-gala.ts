import "dotenv/config";
import { prisma } from "../src/lib/db";

// First post of docs/seo-kapsama-haritasi.md: the site had no page answering
// year-end party / gala queries. Created UNPUBLISHED so it can be reviewed and
// given a cover image in the editpanel before going live. Reruns are no-ops.

const slug = "kurumsal-yilbasi-partisi-ve-gala-gecesi-interaktif-aktiviteler";

// [categorySlug, serviceSlug] pairs shown as "related services" on the post.
const relatedServices: [string, string][] = [
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "mirror-booth"],
    ["video", "360-video-booth"],
    ["photobooth-ve-fotograf-aktivasyonlari", "aura-photobooth-kiralama"],
    ["interaktif-etkinlik-aktiviteleri", "dijital-hediye-carki-aktivasyonu"],
    ["interaktif-etkinlik-aktiviteleri", "quiz-bilgi-yarismasi"],
];

const base = "/hizmetler";
const content = `<p><strong>Kısa cevap:</strong> Kurumsal yılbaşı partisi ve gala gecesinde en iyi çalışan interaktif aktiviteler, misafirin birkaç dakikada katılıp elinde bir hatırayla ayrıldığı fotoğraf ve video aktivasyonlarıdır: AI Photobooth, Mirror Booth, 360 Video Booth ve Aura Photobooth. Yanına bir çekiliş ya da yarışma (Dijital Hediye Çarkı, Quiz) eklendiğinde gecenin hem sakin hem hareketli saatleri dolar. Hangisinin seçileceğini üç şey belirler: misafir sayısı, mekânda ayrılabilecek alan ve hatıranın baskılı mı dijital mi olacağı.</p>

<h2>Yılbaşı partisi ile gala gecesinin ihtiyacı aynı değil</h2>
<p>Yılbaşı partisinde amaç eğlencedir; misafirler ayaktadır, gruplar hâlinde dolaşır ve aktiviteye birlikte katılmak ister. Gala gecesinde ise misafirler çoğunlukla masalarında oturur, kıyafetler özenlidir ve aktivitenin kendisi de şık görünmelidir. Bu yüzden yılbaşı partisinde hareketli ve kalabalık kaldıran aktiviteler, galada ise karşılama alanında duran ve gecenin akışını bölmeyen aktiviteler öne çıkar.</p>

<h2>Yılbaşı partisi için aktiviteler</h2>

<h3>AI Photobooth: yılbaşı temalı yapay zekâ fotoğrafı</h3>
<p><a href="${base}/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala">AI Photobooth</a>, misafirin fotoğrafını etkinliğin temasına göre yapay zekâ ile yeniden yorumlar. Tema markaya ve geceye özel hazırlanır; kış masalı, 1920'ler ya da şirketin kendi kurgusu olabilir. Fotoğraf saniyeler içinde basılır ve QR kod ile telefona iner. Tek istasyon saatte ortalama 80–120 kişiye hizmet verir.</p>

<h3>360 Video Booth: gecenin sosyal medya içeriği</h3>
<p><a href="${base}/video/360-video-booth">360 Video Booth</a>'ta misafirler platformun üzerine çıkar, kamera etraflarında dönerek yavaş çekim bir video çeker. Gruplar hâlinde katılmaya en uygun aktivitedir. Çıktı videodur ve QR kod ile paylaşılır; baskı vermez. 3 m² alan yeterlidir ve saatte ortalama 40–50 kişiye hizmet verir.</p>

<h3>Dijital Hediye Çarkı ve Quiz: çekiliş ve yarışma</h3>
<p>Yılbaşı çekilişini <a href="${base}/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu">Dijital Hediye Çarkı</a> ile oyuna çevirebilirsiniz. Ekipler arası rekabet isteniyorsa <a href="${base}/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi">Quiz</a> ile şirkete ve yıla özel sorulardan oluşan bir bilgi yarışması kurulur. <a href="${base}/interaktif-etkinlik-aktiviteleri/karaoke">Karaoke</a> ise gecenin ilerleyen saatleri için uygundur.</p>

<h2>Gala gecesi için aktiviteler</h2>

<h3>Mirror Booth: karşılama alanında şık bir fotoğraf köşesi</h3>
<p><a href="${base}/photobooth-ve-fotograf-aktivasyonlari/mirror-booth">Mirror Booth</a>'un ekranı büyük bir dokunmatik aynadır; misafir aynaya bakarak poz verir. Fotoğraf marka logolu dijital çerçeveyle basılır ve QR kod ile telefona da iner. 4 m² alan yeterlidir ve saatte ortalama 60–80 kişiye hizmet verir; fuayede ya da karşılama alanında kurulduğunda yemek başlamadan önceki kokteyl saatini doldurur.</p>

<h3>Aura Photobooth: kişiye özel bir hatıra</h3>
<p><a href="${base}/photobooth-ve-fotograf-aktivasyonlari/aura-photobooth-kiralama">Aura Photobooth</a>, sensörlerle aldığı veriyi misafirin fotoğrafında renkli bir aura olarak görselleştirir. Her misafirin sonucu farklı çıktığı için masalarda konuşulan bir hatıraya dönüşür. Baskılı ve dijital çıktı verir.</p>

<h3>Magazine Cover: misafir dergi kapağında</h3>
<p><a href="${base}/photobooth-ve-fotograf-aktivasyonlari/magazine-cover">Magazine Cover</a> ile misafirin fotoğrafı, geceye özel tasarlanmış bir dergi kapağına yerleştirilir. Ödül törenli galalarda gecenin temasına uyarlanabilir.</p>

<h2>Kaç kişilik etkinliğe hangi aktivite?</h2>
<p>Hesabı gecenin aktif süresi üzerinden yapın. Saatlik ortalama kapasiteler şöyle:</p>
<ul>
<li><strong>AI Photobooth:</strong> 80–120 kişi</li>
<li><strong>Photobooth:</strong> 70–80 kişi; misafirler gruplar hâlinde çekilirse 150 kişiye kadar</li>
<li><strong>Mirror Booth:</strong> 60–80 kişi</li>
<li><strong>Cabin Photo:</strong> yaklaşık 50 kişi</li>
<li><strong>360 Video Booth:</strong> 40–50 kişi</li>
</ul>
<p>Tek bir AI Photobooth istasyonu 3 saatlik bir partide 240–360 kişiye yetişir. Misafir sayısı bunun üzerindeyse ikinci bir istasyon ya da farklı türde ikinci bir aktivite eklemek, kuyruğu tek noktada toplamaktan daha iyi sonuç verir.</p>
<ul>
<li><strong>Alan dar ise:</strong> Photobooth 2 m², 360 Video Booth 3 m², Mirror Booth 4 m² alana kurulur.</li>
<li><strong>Baskılı hatıra isteniyorsa:</strong> AI Photobooth, Mirror Booth, Aura Photobooth. Pakete 750 adet baskı dahildir.</li>
<li><strong>Sosyal medya paylaşımı isteniyorsa:</strong> 360 Video Booth; çıktı videodur.</li>
</ul>

<h2>Bir örnek: Tavuk Dünyası yılbaşı partisi</h2>
<p>Tavuk Dünyası'nın 2026'ya girerken düzenlediği yılbaşı partisinde AI Photo kurduk; misafirler yapay zekâ destekli yüz değiştirme ile kendi fotoğraflarını aldı. Ayrıntılar <a href="/projeler/tavuk-dunyasi-x-ai-photo">Tavuk Dünyası × AI Photo</a> proje sayfasında.</p>

<h2>Mekândan ne istenir, kurulum nasıl yapılır?</h2>
<p>Otel balo salonu ya da restoran fark etmez; mekândan beklediğimiz tek bir standart 220V prizdir. İnternet kendi 5G mobil altyapımızla gelir, mekânın ağına ihtiyaç duymayız. Kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer. Etkinlik boyunca alanda en az iki teknik personel bulunur.</p>
<p>Kiralama anahtar teslimdir: nakliye, kurulum, söküm, teknik personel ve markaya özel tasarım fiyata dahildir. Kiosklar markanıza göre giydirilir, ekran arayüzü ve fotoğraf çerçevesi kurumsal renkleriniz ve logonuzla hazırlanır.</p>

<h2>Ne zaman rezervasyon yapılmalı?</h2>
<p>Aralık ayında etkinlikler aynı haftalara yığılır; markaya özel arayüz, çerçeve ve kiosk giydirmesinin hazırlanması da zaman alır. Tarihiniz belli olduğunda teklif istemek, hem cihazın hem tasarım süresinin garanti altına alınmasını sağlar.</p>`;

const faq = [
    {
        q: "Kurumsal yılbaşı partisi için hangi interaktif aktiviteler uygundur?",
        a: "Misafirlerin gruplar hâlinde katılabildiği ve hatırayla ayrıldığı aktiviteler: yılbaşı temalı AI Photobooth, 360 Video Booth, çekiliş için Dijital Hediye Çarkı ve ekipler arası yarışma için Quiz.",
    },
    {
        q: "Gala gecesi için hangi aktivite daha uygun?",
        a: "Karşılama alanında duran ve gecenin akışını bölmeyen fotoğraf aktivasyonları: Mirror Booth, Aura Photobooth ve Magazine Cover. Üçü de marka logolu çerçeveyle baskılı ve dijital çıktı verir.",
    },
    {
        q: "300 kişilik bir yılbaşı partisine tek photobooth yeter mi?",
        a: "Tek bir AI Photobooth istasyonu saatte ortalama 80–120 kişiye hizmet verir; 3 saatlik bir partide 240–360 kişi eder. 300 kişi için tek istasyon sınırda kalır; yanına 360 Video Booth gibi ikinci bir aktivite eklemek kuyruğu böler.",
    },
    {
        q: "Aktiviteler için mekânda ne kadar alan ayırmak gerekir?",
        a: "Photobooth için 2 m², 360 Video Booth için 3 m², Mirror Booth için 4 m², Cabin Photo için 5 m² alan yeterlidir. Mekândan tek bir standart 220V priz beklenir; internet kendi 5G altyapımızla gelir.",
    },
    {
        q: "Fotoğraflar basılı mı veriliyor, dijital mi?",
        a: "Fotoğraf aktivasyonlarında ikisi de verilir: fotoğraf saniyeler içinde basılır ve QR kod ile telefona iner. Pakete 750 adet baskı dahildir. 360 Video Booth yalnızca dijital video verir.",
    },
    {
        q: "İstanbul dışındaki bir otelde yılbaşı etkinliğine kurulum yapıyor musunuz?",
        a: "Evet. İstanbul merkezli bir ekibiz ve Türkiye genelinde anahtar teslim kurulum yapıyoruz. Bugüne kadar İstanbul, Ankara, İzmir, Antalya, Bodrum, Adana, Diyarbakır, Kocaeli, Sapanca ve Çorum'da kurulum yaptık.",
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
            title: "Kurumsal Yılbaşı Partisi ve Gala Gecesi İçin İnteraktif Aktivite Rehberi",
            excerpt:
                "Yılbaşı partisi ve gala gecesi için hangi interaktif aktivite seçilmeli? Misafir sayısına, mekândaki alana ve hatıranın baskılı mı dijital mi olacağına göre fotoğraf, video ve oyun aktivasyonlarını karşılaştırıyoruz.",
            content,
            category: "Etkinlik Teknolojileri",
            author: "MetasoftCo Ekibi",
            metaTitle: "Kurumsal Yılbaşı Partisi ve Gala Gecesi Aktiviteleri | MetasoftCo",
            metaDescription:
                "Kurumsal yılbaşı partisi ve gala gecesi için interaktif aktivite fikirleri: AI Photobooth, Mirror Booth, 360 Video Booth, çekiliş ve quiz. Kapasite, alan ve kurulum bilgileriyle.",
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
