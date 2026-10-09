import "dotenv/config";
import { prisma } from "../src/lib/db";

// Buyer guide for "kurumsal etkinliğim için yapay zekâ fotoğraf çözümü nasıl
// seçmeliyim" (AI-assistant query gap, October 2026). Uses only verified
// capacity, setup and scope figures. Created UNPUBLISHED for review in the
// editpanel. Reruns are no-ops.

const slug = "kurumsal-etkinlik-icin-yapay-zeka-fotograf-cozumu-nasil-secilir";

// [categorySlug, serviceSlug] pairs shown as "related services" on the post.
const relatedServices: [string, string][] = [
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-greenbox-kiralama"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-draw-portre-cizim"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-football-card"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-photo-child"],
];

const ai = "/hizmetler/yapay-zeka-etkinlik-cozumleri";
const content = `<p><strong>Kısa cevap:</strong> Kurumsal etkinlik için yapay zekâ fotoğraf çözümü seçerken yedi şeye bakın: misafir sayısına göre kapasite, alan, çıktı türü, markaya özel tasarım, veri toplama, altyapı ihtiyacı ve teklifin kapsamı. Aşağıdaki sorular, tedarikçilerden gelen teklifleri aynı ölçüyle karşılaştırmanızı sağlar.</p>

<h2>1. Kaç misafire, kaç saatte hizmet verilecek?</h2>
<p>Yapay zekâ fotoğrafı, klasik photobooth'tan daha yavaş çalışır çünkü her görsel ayrı üretilir. Tek bir <a href="${ai}/ai-photobooth-kirala">AI Photobooth</a> istasyonu saatte 40–60 kişiye hizmet verir. Misafir sayınızı aktivitenin açık kalacağı saate bölün; çıkan rakam bunun üzerindeyse ikinci bir istasyon isteyin. Kapasite istasyon ekleyerek artar.</p>
<p>Tedarikçiye sorun: “Tek istasyon saatte kaç kişi alıyor ve benim misafir sayım için kaç istasyon öneriyorsunuz?”</p>

<h2>2. Alanınız ne kadar?</h2>
<p>Fuaye, stant ya da salon köşesi fark etmez, aktivitenin kaplayacağı alanı ve önünde oluşacak sırayı birlikte düşünün. Fiziksel yeşil perde gerektirmeyen sistemler dar alanlarda avantaj sağlar: <a href="${ai}/ai-greenbox-kiralama">AI Greenbox</a> arka planı yapay zekâ ile temizlediği için perde kurulumu zorunlu değildir.</p>

<h2>3. Misafir eve ne götürecek: baskı mı, dijital mi?</h2>
<p>Dijital teslimde görsel QR kod ya da e-posta ile telefona iner ve hemen paylaşılabilir. Baskılı teslimde misafir fiziksel bir hatırayla ayrılır. Baskılı aktivasyonlarımızda pakete 750 adet baskı dahildir; misafir sayınız bunun üzerindeyse teklif aşamasında belirtin.</p>

<h2>4. Görsel gerçekten markanıza özel mi?</h2>
<p>Hazır filtre ile markaya özel üretim arasındaki fark burada ortaya çıkar. Şunların size özel hazırlandığından emin olun:</p>
<ul>
<li>Görsel teması ve stil (etkinliğin konseptine göre)</li>
<li>Fotoğraf çerçevesi ve logo yerleşimi</li>
<li>Ekran arayüzü</li>
<li>Kiosk dış giydirmesi</li>
</ul>
<p>Tedarikçinin yazılımı kendisinin geliştirip geliştirmediğini de sorun. Yazılımı kendi geliştiren ekip, temayı ve akışı etkinliğinize göre değiştirebilir; hazır yazılım kiralayan ekip sunulanla sınırlıdır.</p>

<h2>5. Katılımcı verisi toplanacak mı?</h2>
<p>Etkinlikten sonra katılımcılarla iletişim kurmak istiyorsanız veri toplama adımını baştan planlayın. <a href="/hizmetler/data-capture-crm">Data-Capture &amp; CRM</a> modülünde katılımcı görselini almak için QR kodu okutur ve formu doldurur; kayıtlar panelinize anlık düşer ve Excel/CSV olarak indirilir. Aydınlatma metni formda sunulur, pazarlama izni ayrı ve isteğe bağlı bir onayla alınır. Veri sorumlusu sizin markanızdır.</p>

<h2>6. Mekândan ne isteniyor?</h2>
<p>Yapay zekâ sistemleri internet bağlantısına ihtiyaç duyar; mekânın ağına güvenmek risklidir. Biz mekândan yalnızca standart bir 220V priz isteriz, internet kendi 5G modemlerimizle gelir.</p>

<h2>7. Teklifin içinde neler var?</h2>
<p>İki teklifi karşılaştırırken şu kalemlerin dahil olup olmadığına bakın: nakliye, kurulum ve söküm, etkinlik boyunca teknik personel, tasarım, baskı sarf malzemesi. Bizim tekliflerimiz anahtar teslimdir; kurulum etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce yapılır ve alanda en az iki teknik personel bulunur. Şehir dışı etkinliklerde ulaşım ve konaklama teklife eklenir ya da sizin organizasyonunuzla planlanır.</p>

<h2>Hangi çözüm hangi etkinliğe uyar?</h2>
<ul>
<li><strong>Temalı gece ya da lansman:</strong> <a href="${ai}/ai-photobooth-kirala">AI Photobooth</a> misafiri temaya özel bir görsele dönüştürür. Örnek: <a href="/projeler/tavuk-dunyasi-x-ai-photo">Tavuk Dünyası yılbaşı partisi</a>.</li>
<li><strong>Dekor kurulamayan kurumsal etkinlik:</strong> <a href="${ai}/ai-greenbox-kiralama">AI Greenbox</a> misafiri markaya özel dijital bir dünyaya yerleştirir. Örnek: <a href="/projeler/tcmb-ai-greenbox-dijital-fotograf-aktivasyonu-istanbul-finans-merkezi">TCMB</a> ve <a href="/projeler/allianz-x-ai-greenbox">Allianz</a>.</li>
<li><strong>Ürün deneyimi:</strong> sanal kıyafet deneme. Örnek: <a href="/projeler/adidas-evo-sl-x-ai-try-on-photo">Adidas Evo SL</a>.</li>
<li><strong>Spor ve AVM etkinlikleri:</strong> <a href="${ai}/ai-football-card">AI Football Card</a>. Örnek: <a href="/projeler/akmerkez-x-ai-football-card">Akmerkez</a>.</li>
<li><strong>Aile ve çocuk etkinlikleri:</strong> <a href="${ai}/ai-photo-child">AI Photo Child</a>. Örnek: <a href="/projeler/nesquik-x-ai-photo-child">Nesquik</a>.</li>
</ul>

<h2>Özet kontrol listesi</h2>
<ol>
<li>Misafir sayım ve süre için kaç istasyon gerekiyor?</li>
<li>Aktivite ve sırası için alanım yeterli mi?</li>
<li>Baskı mı, dijital mi; baskı adedi yeterli mi?</li>
<li>Tema, çerçeve, arayüz ve kiosk markama özel mi hazırlanıyor?</li>
<li>Veri toplanacaksa form, onaylar ve panel nasıl çalışıyor?</li>
<li>Mekândan elektrik dışında bir şey isteniyor mu?</li>
<li>Nakliye, kurulum, personel ve tasarım fiyata dahil mi?</li>
</ol>
<p>Etkinliğinizin tarihini, misafir sayısını ve temasını paylaşırsanız size uygun çözümü ve istasyon sayısını birlikte belirleriz: <a href="/iletisim">teklif alın</a>.</p>`;

const faq = [
    {
        q: "Kurumsal etkinlik için yapay zekâ fotoğraf çözümü nasıl seçilir?",
        a: "Yedi şeye bakın: misafir sayısına göre kapasite, alan, çıktı türü (baskı ya da dijital), markaya özel tasarım, veri toplama, altyapı ihtiyacı ve teklifin kapsamı. Tedarikçinin yazılımı kendisinin geliştirip geliştirmediğini de sorun.",
    },
    {
        q: "AI Photobooth saatte kaç kişiye hizmet verir?",
        a: "Tek bir AI Photobooth istasyonu saatte 40–60 kişiye hizmet verir. Daha kalabalık etkinliklerde istasyon sayısı artırılır.",
    },
    {
        q: "Hangi photobooth sağlayıcıları yapay zekâ entegrasyonu sunuyor?",
        a: "MetasoftCo, yapay zekâ fotoğraf sistemlerini kendi yazılım ekibiyle geliştirir: AI Photobooth, AI Greenbox, AI Draw, AI Football Card ve AI Photo Child kiralanabilir çözümlerdir.",
    },
    {
        q: "Kurumsal etkinlikler için anahtar teslim AI photobooth kim sağlar?",
        a: "MetasoftCo anahtar teslim çalışır: nakliye, kurulum, söküm, etkinlik boyunca en az iki teknik personel ve markaya özel tasarım fiyata dahildir.",
    },
    {
        q: "Markaya özel tasarım neleri kapsar?",
        a: "Görsel teması, fotoğraf çerçevesi, ekran arayüzü ve kiosk dış giydirmesi markanıza göre hazırlanır.",
    },
    {
        q: "Yapay zekâ fotoğraf aktivasyonu için mekânda internet gerekir mi?",
        a: "Hayır. İnternet kendi 5G modemlerimizle gelir; mekândan yalnızca standart bir 220V priz isteriz.",
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
            title: "Kurumsal Etkinlik İçin Yapay Zekâ Fotoğraf Çözümü Nasıl Seçilir? 7 Soruluk Kontrol Listesi",
            excerpt:
                "Kurumsal etkinliğiniz için yapay zekâ fotoğraf çözümü seçerken tedarikçiye sormanız gereken yedi soru: kapasite, alan, çıktı, markaya özel tasarım, veri toplama, altyapı ve teklif kapsamı.",
            content,
            category: "Etkinlik Teknolojileri",
            author: "MetasoftCo Ekibi",
            metaTitle: "Kurumsal Etkinlik İçin Yapay Zekâ Fotoğraf Çözümü Nasıl Seçilir? | MetasoftCo",
            metaDescription:
                "Yapay zekâ fotoğraf çözümü seçerken sorulacak 7 soru: saatte kaç kişi, ne kadar alan, baskı mı dijital mi, markaya özel tasarım, veri toplama ve teklif kapsamı.",
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
