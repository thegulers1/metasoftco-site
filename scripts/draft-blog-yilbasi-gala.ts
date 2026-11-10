import "dotenv/config";

// First post of docs/seo-kapsama-haritasi.md: the site had no page answering
// year-end party / gala queries. Created UNPUBLISHED so it can be reviewed and
// given a cover image in the editpanel before going live. Existing posts are preserved.

const slug = "kurumsal-yilbasi-partisi-ve-gala-gecesi-interaktif-aktiviteler";

// [categorySlug, serviceSlug] pairs shown as "related services" on the post.
const relatedServices: [string, string][] = [
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "mirror-booth"],
    ["video", "360-video-booth"],
    ["photobooth-ve-fotograf-aktivasyonlari", "strip-photo"],
    ["interaktif-etkinlik-aktiviteleri", "dijital-hediye-carki-aktivasyonu"],
    ["interaktif-etkinlik-aktiviteleri", "quiz-bilgi-yarismasi"],
];

const base = "/hizmetler";
const campaign = `${base}/yilbasi-partisi-aktiviteleri`;
const content = `<p>Şirket yılbaşı partisi için karşılama alanında bir fotoğraf noktası, programda da herkesi bir araya getiren tek bir aktivite seçin. Kişiselleştirilmiş portre için AI Photobooth, ekip fotoğrafı için Strip Photo, masalar arası yarışma için canlı quiz iyi bir başlangıç. Ödül törenli galada fotoğrafı kokteyl saatine, çekilişi ise sahnede ayrılmış bir araya yerleştirin. Seçimi salon düzeni ve misafirlerin gerçekten katılabileceği süre belirlesin.</p>

<h2>Gecenin akışına göre hangi aktiviteleri seçelim?</h2>

<h3>Karşılamada AI Photobooth, Strip Photo veya Mirror Booth</h3>
<p>Gecenin görsel teması öne çıkacaksa <a href="${base}/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala">AI Photobooth</a> ile katılımcı portrelerini o temaya uyarlayabilirsiniz. Departmanların birlikte poz vermesini istiyorsanız <a href="${base}/photobooth-ve-fotograf-aktivasyonlari/strip-photo">Strip Photo</a> ile ekip karelerini şerit formatında bir araya getirin. Resmî bir galada tam boy portre için <a href="${base}/photobooth-ve-fotograf-aktivasyonlari/mirror-booth">Mirror Booth</a>'u fuayede değerlendirin. Fotoğraf sırasının kayıt masasını ve salon girişini kapatmaması için bekleme alanını planda işaretleyin.</p>

<h3>Yemek arasında canlı quiz veya dijital hediye çarkı</h3>
<p>Masaların takım olarak katılmasını istiyorsanız <a href="${base}/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi">canlı quiz</a> için şirketin yılından ve ekiplerin ortak anılarından kısa bir soru turu hazırlayın. Programda zaten ödül töreni varsa, ayrı bir yarışma yerine <a href="${base}/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu">dijital hediye çarkını</a> önceden belirlenmiş bir çekiliş anına yerleştirebilirsiniz. Kimlerin katılacağını, ödül sırasını ve sunucunun rolünü programdan önce belirleyin.</p>

<h3>Parti bölümünde 360 Video Booth</h3>
<p>Geceden hareketli bir video isteyen ekipler için <a href="${base}/video/360-video-booth">360 Video Booth</a>'u resmî programın sonrasına planlayın. Salon planında platformu, kameranın hareket alanını ve sıranın nerede oluşacağını birlikte değerlendirin. Platforma çıkmak istemeyen misafirler için fotoğraf köşesi ayrı bir seçenek sunar.</p>

<h2>300 kişilik bir etkinlikte tek fotoğraf noktası yeter mi?</h2>
<p>Üç saatlik bir gecede istasyonun açık olduğu süreyi ve misafirlerin ne zaman gelebileceğini ayrı hesaplayın. Örneğin hedefiniz 300 misafirin yarısının 45 dakikalık kokteylde fotoğraf çektirmesi ise planı 150 kişi üzerinden kurun. Kişi sayısını tekil çekim sayısıyla karıştırmayın. Katılımcıların kaçı tek başına, kaçı grup hâlinde poz verecek? Teklifte bu varsayımlarla bir istasyonun kaç çekim yapabileceğini ve bekleme alanının nasıl yerleşeceğini sorun. Yoğunluk tek araya yığılıyorsa ikinci fotoğraf noktası veya daha geniş bir katılım aralığı değerlendirin.</p>
<p>İlk kombinasyonunuzu oluşturmak için <a href="${campaign}">yılbaşı partisi aktivite seçeneklerini</a> inceleyin. Kısa bir gala kokteylinde bir fotoğraf noktasıyla başlamak, daha serbest akışlı bir partide ise fotoğrafı quiz veya çekilişle eşleştirmek makul bir planlama tercihidir.</p>

<h2>MetasoftCo portföyünden gerçek uygulamalar</h2>
<ul>
<li><a href="/projeler/tavuk-dunyasi-x-ai-photo">Tavuk Dünyası × AI Photo</a> projesinde katılımcı portreleri markaya özel bir sahneye yerleştirildi. Proje sayfasında belgelenen çıktı, katılımcıya özel dijital portreydi. Bu uygulama, gecenin görsel temasını kişisel bir portreye taşımak isteyen ekipler için bir referans.</li>
<li><a href="/projeler/pegasus-hava-yollari-x-dijital-hediye-carki-aktivasyonu">Pegasus Hava Yolları × Dijital Hediye Çarkı</a>, fuar ve etkinlik stantlarında kullanılan markaya özel bir ödül deneyimiydi. Yılbaşı galasında sahne çekilişi planlayan ekipler için çarkın marka kimliğine nasıl uyarlanabildiğini gösteriyor.</li>
</ul>

<h2>Kiralama teklifi için hangi bilgileri hazırlayalım?</h2>
<p>Tarih, şehir, mekân, misafir sayısı, program akışı ve seçtiğiniz aktiviteleri paylaşın. Teklifte istasyon sayısını, aktif süreyi, salonun teknik ihtiyaçlarını, saha ekibinin görevlerini ve fiyata dahil kalemleri netleştirin. Baskı düşünüyorsanız format ve adedi, dijital paylaşım istiyorsanız teslim yöntemini sorun. Katılımcı fotoğrafları veya iletişim bilgileri işlenecekse hangi verilerin alınacağını, erişim ve saklama koşullarını kendi ekibinizle birlikte değerlendirin.</p>
<p>Etkinliğinizin ayrıntılarını <a href="${campaign}">kurumsal yılbaşı partisi kiralama ve teklif sayfası</a> üzerinden iletebilirsiniz.</p>`;

const faq = [
    {
        q: "Resmî bir gala için fotoğraf köşesi nereye konur?",
        a: "Kokteyl alanında, salon girişini ve servis yolunu boş bırakacak bir yer seçin. Tam boy portre için Mirror Booth, geceye özel temalı portre için AI Photobooth değerlendirilebilir.",
    },
    {
        q: "Quiz ile çekiliş arasında nasıl seçim yapalım?",
        a: "Masaları takım hâlinde oyuna katmak istiyorsanız quiz seçin. Programda kısa bir ödül dağıtım anı planlıyorsanız dijital hediye çarkını değerlendirin.",
    },
    {
        q: "Baskılı hatıra istiyorsak teklifte neyi belirtelim?",
        a: "Fotoğraf formatını, tahmini çekim sayısını ve grup başına kaç kopya istediğinizi paylaşın. Baskı seçeneğini ve adedini seçtiğiniz aktivite için teklifte teyit edin.",
    },
];

const draft = {
    slug,
    title: "Kurumsal Yılbaşı Partisi ve Gala Rehberi",
    excerpt: "Şirket yılbaşı partisinde hangi aktiviteleri seçelim? Fotoğraf, video, quiz ve çekilişi gecenin akışına, salon düzenine ve katılım süresine göre planlayın.",
    content,
    category: "Etkinlik Teknolojileri",
    author: "MetasoftCo Ekibi",
    metaTitle: "Kurumsal Yılbaşı Partisi ve Gala Rehberi | MetasoftCo",
    metaDescription: "Şirket yılbaşı partisi veya galası için AI Photobooth, 360 video, quiz ve çekiliş seçeneklerini karşılaştırın. Salon ve katılım süresine göre gecenizi planlayın.",
    faq: JSON.stringify(faq),
    published: false,
};

async function main() {
    if (!process.argv.includes("--create-draft")) {
        console.log(JSON.stringify({ ...draft, relatedServices }, null, 2));
        return;
    }

    const { prisma } = await import("../src/lib/db");
    try {
        const existing = await prisma.blogPost.findUnique({ where: { slug } });
        if (existing) {
            console.log(`Post already exists (published: ${existing.published}), skipping.`);
            return;
        }

        const serviceIds: string[] = [];
        for (const [categorySlug, serviceSlug] of relatedServices) {
            const service = await prisma.service.findFirst({
                where: { slug: serviceSlug, category: { slug: categorySlug }, published: true, type: "RENTAL" },
                select: { id: true },
            });
            if (!service) throw new Error(`Published rental service not found: ${categorySlug}/${serviceSlug}`);
            serviceIds.push(service.id);
        }

        await prisma.blogPost.create({
            data: { ...draft, serviceIds: JSON.stringify(serviceIds) },
        });
        console.log(`Draft created: /blog/${slug} (unpublished)`);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
