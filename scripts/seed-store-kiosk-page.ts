import "dotenv/config";
import { prisma } from "../src/lib/db";

// Landing page for permanent in-store installations, served at
// /hizmetler/magaza-ici-kalici-photobooth (see excludedSectorPageSlugs in
// src/lib/publication.ts). Copy uses only verified facts: the DeFacto store
// installation (Adana, later moved to Bodrum) sold to DeFacto, and the sale package contents.
// An existing row is left untouched.

const slug = "magaza-ici-kalici-photobooth";

// [categorySlug, serviceSlug] pairs listed as the page's related services.
const relatedServices: [string, string][] = [
    ["yapay-zeka-etkinlik-cozumleri", "ai-photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "photobooth-kirala"],
    ["photobooth-ve-fotograf-aktivasyonlari", "mirror-booth"],
    ["yapay-zeka-etkinlik-cozumleri", "ai-fashion-mirror-akilli-ayna"],
];

const sale = "/urunler/ai-photobooth-kurumsal-satis";

const content = `<h2>Mağaza İçi Kalıcı Photobooth Sistemi Kuran Firma</h2>
<p>MetasoftCo, etkinlikler için kiraladığı photobooth ve yapay zekâ fotoğraf sistemlerini mağaza, showroom ve deneyim merkezlerine kalıcı olarak da kurar. Donanımı temin eder, yazılımı kendi ekibimizle markanıza göre uyarlar ve mağaza ekibinizi sistemi kullanacak şekilde eğitiriz.</p>
<p>DeFacto, Adana mağazası için photobooth sistemimizi satın aldı. Sistemi mağazaya kalıcı olarak kurduk; daha sonra markanın Bodrum mağazasına taşındı ve orada kullanılmaya devam etti.</p>

<h2>Kalıcı Kurulum Etkinlik Kiralamasından Nasıl Ayrılır?</h2>
<ul>
<li><strong>Süre:</strong> etkinlik kiralaması bir ya da birkaç gün sürer; kalıcı sistem mağazada her gün çalışır.</li>
<li><strong>Kullanım:</strong> etkinlikte sistemi teknik ekibimiz işletir; mağazada verdiğimiz eğitimle sizin ekibiniz kullanır.</li>
<li><strong>Model:</strong> sabit bir noktada sürekli kullanım için sistemi satın almak, her kampanya için ayrı ayrı kiralamaktan daha uygundur. Karşılaştırmayı <a href="/blog/etkinlik-teknolojisi-kiralamak-mi-satin-almak-mi">kiralamak mı, satın almak mı</a> yazımızda anlattık.</li>
</ul>

<h2>Pakete Neler Dahil?</h2>
<ul>
<li><strong>Donanım:</strong> kamera, ışık, dokunmatik ekran ve kiosk. Teslimden önce test edilir; 12 ay donanım garantisi vardır.</li>
<li><strong>Markaya özel tasarım:</strong> kiosk giydirmesi, ekran arayüzü ve fotoğraf çerçevesi kurumsal kimliğinize göre hazırlanır.</li>
<li><strong>Yazılım lisansı ve güncellemeler:</strong> yazılımı kendi ekibimiz geliştirdiği için güncellemeler satış sonrasında da tarafımızca sağlanır.</li>
<li><strong>Kurulum ve eğitim:</strong> sistemi mağazanıza kurar, ekibinize günlük kullanım eğitimi veririz.</li>
<li><strong>Teknik destek:</strong> uzaktan bağlantıyla müdahale, gerektiğinde yerinde destek.</li>
</ul>
<p>Yapay zekâ fotoğraf sistemi için paket ayrıntıları <a href="${sale}">AI Photobooth Kurumsal Satış</a> sayfasında.</p>

<h2>Mağazadan Mağazaya Taşınabilir</h2>
<p>Kalıcı kurulum, sistemin tek bir noktaya bağlı kalacağı anlamına gelmez. DeFacto örneğinde olduğu gibi sistem bir mağazadan sökülüp başka bir mağazaya taşınabilir; açılışlarda ya da sezonluk kampanyalarda farklı şubelerde değerlendirilebilir.</p>

<h2>Mağaza Ziyaretçisini Kayda Dönüştürme</h2>
<p>İsterseniz sisteme <a href="/hizmetler/data-capture-crm">Data-Capture &amp; CRM</a> modülü eklenir: ziyaretçi fotoğrafını almak için QR kodu okutur ve formu doldurur, kayıtlar panelinize anlık düşer ve Excel/CSV olarak indirilir. Modül isteğe bağlıdır.</p>

<h2>Önce Denemek İsterseniz</h2>
<p>Kalıcı kuruluma karar vermeden önce aynı sistemi bir mağaza açılışı ya da kampanya haftası için kiralayabilirsiniz. Mağaza içi bir kampanya örneği için <a href="/blog/magaza-ici-kampanya-cizimi-yapay-zeka-ile-stickera-donusturme">çizimi yapay zekâ ile sticker'a dönüştürme</a> yazımıza bakabilirsiniz.</p>`;

const faq = [
    {
        q: "Mağaza içi kalıcı fotokabin sistemi geliştiren firma var mı?",
        a: "Evet. MetasoftCo, photobooth ve yapay zekâ fotoğraf sistemlerini mağaza ve showroom'lara kalıcı olarak kurar. DeFacto, Adana mağazası için photobooth sistemimizi satın aldı; sistem daha sonra markanın Bodrum mağazasına taşındı.",
    },
    {
        q: "Kalıcı sistem satın mı alınır, kiralanır mı?",
        a: "Sabit bir noktada sürekli kullanım için satın alma modelini öneriyoruz; DeFacto da sistemi satın aldı. Mağaza açılışı ya da kampanya haftası gibi kısa süreli kullanımlar için kiralama daha uygundur.",
    },
    {
        q: "Satın alma paketine neler dahil?",
        a: "Donanım (kamera, ışık, dokunmatik ekran, kiosk), yazılım lisansı, markaya özel tasarım, kurulum, ekibinizin eğitimi, yazılım güncellemeleri ve teknik destek dahildir. Donanım 12 ay garantilidir.",
    },
    {
        q: "Sistem başka bir mağazaya taşınabilir mi?",
        a: "Evet. Sistem sökülüp başka bir mağazaya taşınabilir. DeFacto'nun satın aldığı photobooth Adana mağazasından Bodrum mağazasına taşındı.",
    },
    {
        q: "Sistemi mağaza personeli kullanabilir mi?",
        a: "Evet. Kurulumda ekibinize günlük kullanım eğitimi veriyoruz; sonrasında uzaktan ve gerektiğinde yerinde teknik destek sağlıyoruz.",
    },
    {
        q: "Mağazadaki sistemle müşteri verisi toplanabilir mi?",
        a: "Evet, isteğe bağlı olarak. Data-Capture modülüyle ziyaretçi QR kodu okutup formu doldurur; kayıtlar panelinize anlık düşer ve Excel/CSV olarak indirilir.",
    },
];

async function main() {
    const existing = await prisma.sectorPage.findUnique({ where: { slug } });
    if (existing) {
        console.log(`Page already exists (published: ${existing.published}), skipping.`);
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

    await prisma.sectorPage.create({
        data: {
            slug,
            title: "Mağaza İçi Kalıcı Photobooth",
            h1: "Mağaza İçi Kalıcı Photobooth ve Kiosk Sistemleri",
            excerpt:
                "Mağaza, showroom ve deneyim merkezleri için kalıcı photobooth ve yapay zekâ fotoğraf sistemleri kuruyoruz: donanım, markaya özel yazılım, kurulum, ekip eğitimi ve teknik destek tek pakette.",
            content,
            metaTitle: "Mağaza İçi Kalıcı Photobooth ve Kiosk Sistemleri | MetasoftCo",
            metaDescription:
                "Mağaza ve showroom için kalıcı photobooth sistemi: donanım, markaya özel yazılım, kurulum, eğitim ve destek. DeFacto mağazalarında kullanıldı.",
            metaKeywords: "mağaza içi photobooth, kalıcı fotokabin sistemi, mağaza kiosk sistemi, photobooth satın alma, showroom photobooth",
            faq: JSON.stringify(faq),
            serviceIds: JSON.stringify(serviceIds),
            published: true,
            order: 6,
        },
    });
    console.log(`Created /hizmetler/${slug}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
