import "dotenv/config";
import { prisma } from "../src/lib/db";

// Follow-up to seed-city-pages.ts:
//  1. İstanbul page rewritten: the office moved from Bakırköy to İstanbul
//     Teknokent (Avcılar), and the copy now leads with corporate events
//     instead of weddings.
//  2. İzmir gets its named reference (Turkcell).
//  3. English versions of all four city pages (/en/services/<slug_en>).
//  4. Wedding mentions removed from the remaining product and category copy.
// Safe to rerun: every write sets the same final values.

const photo = "/hizmetler/photobooth-ve-fotograf-aktivasyonlari";
const ai = "/hizmetler/yapay-zeka-etkinlik-cozumleri";
const photoEn = "/en/services/photobooth-and-photo-activations";
const aiEn = "/en/services/ai-event-solutions";

const productsTr = `<ul>
<li><strong><a href="${ai}/ai-photobooth-kirala">AI Photobooth</a>:</strong> misafirin fotoğrafını yapay zekâ ile etkinliğin temasına göre dönüştürür. Saatte ortalama 80–120 kişi.</li>
<li><strong><a href="${photo}/photobooth-kirala">Photobooth</a>:</strong> fotoğraf, GIF ve Boomerang çeken kompakt kiosk. 2 m² alan, saatte 70–80 kişi.</li>
<li><strong><a href="${photo}/mirror-booth">Mirror Booth</a>:</strong> büyük dokunmatik ayna ekranlı photobooth. 4 m² alan, saatte 60–80 kişi.</li>
<li><strong><a href="${photo}/cabin-photo">Cabin Photo</a>:</strong> dört tarafı kapalı fotoğraf kabini. 5 m² alan, saatte yaklaşık 50 kişi.</li>
<li><strong><a href="/hizmetler/video/360-video-booth">360 Video Booth</a>:</strong> dönen kamerayla yavaş çekim 360 derece video. 3 m² alan, saatte 40–50 kişi.</li>
<li><strong><a href="/hizmetler/interaktif-etkinlik-aktiviteleri">İnteraktif oyunlar</a>:</strong> refleks oyunları, quiz, dijital hediye çarkı ve diğerleri.</li>
</ul>`;

const productsEn = `<ul>
<li><strong><a href="${aiEn}/ai-photobooth">AI Photobooth</a>:</strong> transforms each guest's photo with AI to match the event theme. About 80–120 guests per hour.</li>
<li><strong><a href="${photoEn}/photobooth-rental">Photobooth</a>:</strong> a compact kiosk for photos, GIFs and Boomerangs. 2 m² of space, 70–80 guests per hour.</li>
<li><strong><a href="${photoEn}/mirror-booth">Mirror Booth</a>:</strong> a photo booth with a large touchscreen mirror. 4 m² of space, 60–80 guests per hour.</li>
<li><strong><a href="${photoEn}/cabin-photo">Cabin Photo</a>:</strong> a fully enclosed photo cabin. 5 m² of space, about 50 guests per hour.</li>
<li><strong><a href="/en/services/video/360-video-booth">360 Video Booth</a>:</strong> slow-motion 360-degree video shot by a rotating camera. 3 m² of space, 40–50 guests per hour.</li>
<li><strong><a href="/en/services/interactive-event-activities">Interactive games</a>:</strong> reflex games, quizzes, a digital gift wheel and more.</li>
</ul>`;

const outputEn =
    "<p>On photo activations each photo is printed within seconds and also reaches the guest's phone through a QR code; 750 prints are included in the package. Kiosks are wrapped for your brand, and the screen interface and photo frame are designed with your logo and brand colours.</p>";

type CityEn = {
    slug: string;
    slug_en: string;
    name: string;
    reference: string;
    referenceAnswer: string;
    venues: string;
};

const cityEn: CityEn[] = [
    {
        slug: "ankara-photobooth-kiralama",
        slug_en: "ankara-photo-booth-rental",
        name: "Ankara",
        reference: "In Ankara we have installed at TRT and Anadolu Agency events.",
        referenceAnswer: "Yes. In Ankara we have installed at TRT and Anadolu Agency events.",
        venues: "We install for institutional and corporate events, congresses, launches, dealer meetings and year-end celebrations.",
    },
    {
        slug: "izmir-photobooth-kiralama",
        slug_en: "izmir-photo-booth-rental",
        name: "İzmir",
        reference: "In İzmir we installed a photo booth for Turkcell.",
        referenceAnswer: "Yes. In İzmir we installed a photo booth for Turkcell.",
        venues: "We install for trade show stands, corporate events, launches, dealer meetings and year-end celebrations.",
    },
    {
        slug: "antalya-photobooth-kiralama",
        slug_en: "antalya-photo-booth-rental",
        name: "Antalya",
        reference: "In Antalya we installed at a seed brand's event at the Nirvana hotel.",
        referenceAnswer: "Yes. In Antalya we installed at a seed brand's event at the Nirvana hotel.",
        venues: "We install for dealer meetings, congresses, gala nights and corporate events held at hotels.",
    },
];

const allCitiesEn = [
    { name: "İstanbul", slug_en: "istanbul-photo-booth-rental" },
    ...cityEn.map((c) => ({ name: c.name, slug_en: c.slug_en })),
];
const otherCitiesEn = (slug_en: string) =>
    allCitiesEn.filter((c) => c.slug_en !== slug_en).map((c) => `<a href="/en/services/${c.slug_en}">${c.name}</a>`).join(", ");

function buildCityEn(city: CityEn) {
    const content_en = `<h2>Photo Booth and Event Technology Rental in ${city.name}</h2>
<p>MetasoftCo is an event technology company based at İstanbul Teknokent, and we provide turnkey installations for events in ${city.name}: the devices, the technical crew and the branded design all come from İstanbul. ${city.reference}</p>
<p>${city.venues}</p>

<h2>What You Can Rent in ${city.name}</h2>
${productsEn}
${outputEn}

<h2>How Installation Works for an Event in ${city.name}</h2>
<ul>
<li><strong>Travel and accommodation:</strong> either included in the quote or arranged by your team.</li>
<li><strong>Setup time:</strong> the day before the event or 3–4 hours before doors open; about 30–40 minutes per device.</li>
<li><strong>On-site crew:</strong> at least two technicians on site throughout the event.</li>
<li><strong>What the venue provides:</strong> a single standard 220V socket. We bring our own 5G connection.</li>
<li><strong>Scope:</strong> transport, setup, teardown, technical crew and branded design are included in the price.</li>
</ul>

<h2>Collecting Attendee Data at the Event</h2>
<p>The Data-Capture &amp; CRM module can be added to any activation: attendees scan a QR code and fill in a form, records land in your client panel in real time and can be downloaded as Excel/CSV.</p>

<h2>Other Cities</h2>
<p>We offer the same scope in ${otherCitiesEn(city.slug_en)} and across Türkiye.</p>`;

    const faq_en = [
        {
            q: `Do you rent photo booths in ${city.name}?`,
            a: `Yes. We are an İstanbul-based team and provide turnkey installations for events in ${city.name}: transport, setup, teardown, technical crew and branded design are included in the price.`,
        },
        { q: `Have you run events in ${city.name} before?`, a: city.referenceAnswer },
        {
            q: `How are travel and accommodation handled for an event in ${city.name}?`,
            a: "For events outside İstanbul, travel and accommodation are either included in the quote or arranged by your team.",
        },
        {
            q: `Which activities can be rented in ${city.name}?`,
            a: "Everything we rent in İstanbul: AI Photobooth, Photobooth, Mirror Booth, Cabin Photo, 360 Video Booth, AI Greenbox and interactive games.",
        },
        {
            q: "When is setup done and what does the venue need to provide?",
            a: "We set up the day before the event or 3–4 hours before doors open; each device takes about 30–40 minutes. The venue only needs to provide a single standard 220V socket; we bring our own 5G connection.",
        },
    ];

    return {
        slug_en: city.slug_en,
        h1_en: `Photo Booth and Event Technology Rental in ${city.name}`,
        excerpt_en: `Turnkey rental of AI Photobooth, Mirror Booth, 360 Video Booth and interactive games for corporate events, launches and trade shows in ${city.name}: transport, setup, technical crew and branded design included.`,
        content_en,
        faq_en: JSON.stringify(faq_en),
        metaTitle_en: `${city.name} Photo Booth Rental | Event Technology — MetasoftCo`,
        metaDescription_en: `Photo booth rental in ${city.name}: AI Photobooth, Mirror Booth, 360 Video Booth and interactive games. Transport, setup, technical crew and branded design included.`,
        metaKeywords_en: `${city.name} photo booth rental, ${city.name} ai photo booth, ${city.name} event technology, ${city.name} 360 video booth rental`,
    };
}

// ---- İstanbul ----------------------------------------------------------

const istanbul = {
    excerpt:
        "Maslak, Levent, Ataşehir, Şişli, Beşiktaş, Kadıköy ve İstanbul'un her ilçesinde kurumsal etkinlik, lansman ve fuarlar için AI Photobooth, marka aktivasyonu ve etkinlik teknolojisi kiralıyoruz.",
    metaDescription:
        "Maslak, Levent, Ataşehir, Şişli, Beşiktaş, Kadıköy ve tüm İstanbul ilçelerinde kurumsal etkinlik, lansman ve fuarlar için AI Photobooth ve etkinlik teknolojisi kiralama.",
    metaKeywords:
        "istanbul ai photobooth kiralama, istanbul photobooth kiralama, maslak kurumsal etkinlik, levent photobooth, ataşehir photobooth, kadıköy photobooth, beşiktaş photobooth, marka aktivasyonu istanbul",
    content: `<h2>İstanbul'da AI Photobooth ve Marka Aktivasyonu</h2>
<p>MetasoftCo olarak İstanbul Teknokent (Avcılar) merkezli ekibimizle İstanbul'un her iki yakasında kurumsal etkinliklere, lansmanlara, fuarlara ve AVM aktivasyonlarına AI Photobooth, AI yüz değiştirme, AR ve interaktif kiosk çözümleri kuruyoruz.</p>

<h2>Çalıştığımız Mekan Türleri</h2>
<ul>
<li>Oteller ve kongre merkezleri</li>
<li>Plaza ve ofis etkinlik alanları (Maslak, Levent, Ataşehir)</li>
<li>Fuar alanları ve AVM aktivasyon alanları</li>
<li>Boğaz kıyısındaki mekanlar ve açık hava etkinlik alanları</li>
</ul>

<h2>Etkinlik Tipleri</h2>
<h3>Kurumsal Etkinlikler</h3>
<p>Yıl sonu kutlamaları, gala geceleri, bayi toplantıları ve şirket içi etkinliklerde marka entegrasyonu, QR ile KVKK uyumlu lead toplama ve İngilizce operatör desteği sunuyoruz.</p>
<h3>Lansman ve Marka Aktivasyonları</h3>
<p>Ürün lansmanlarında ve mağaza açılışlarında markaya özel yapay zekâ temaları, kiosk giydirmesi ve anlık sosyal medya paylaşımıyla çalışıyoruz.</p>
<h3>Fuar ve Kongre</h3>
<p>Fuar stantlarında ve kongrelerde ziyaretçiyi standa çeken, isteğe bağlı olarak katılımcı verisi toplayan aktivasyonlar kuruyoruz.</p>
<h3>AVM Aktivasyonları</h3>
<p>AVM yönetimiyle protokol süreçlerini biz yürütüyor, yoğun trafiğe uygun hızlı çekim akışıyla marka bilinirliğini artırıyoruz.</p>

<h2>İstanbul'da Kiralayabileceğiniz Aktiviteler</h2>
${productsTr}
<p>Fotoğraf aktivasyonlarında fotoğraf saniyeler içinde basılır ve QR kod ile telefona da iner; pakete 750 adet baskı dahildir. Kiosklar markanıza göre giydirilir, ekran arayüzü ve fotoğraf çerçevesi logonuz ve kurumsal renklerinizle hazırlanır.</p>

<h2>Kurulum Nasıl Yapılır?</h2>
<ul>
<li><strong>Kurulum zamanı:</strong> etkinlikten bir gün önce ya da etkinlik günü 3–4 saat önce; cihaz başına ortalama 30–40 dakika.</li>
<li><strong>Saha ekibi:</strong> etkinlik boyunca alanda en az iki teknik personel.</li>
<li><strong>Mekândan beklenen:</strong> tek bir standart 220V priz. İnternet kendi 5G mobil altyapımızla gelir.</li>
<li><strong>Kapsam:</strong> nakliye, kurulum, söküm, teknik personel ve markaya özel tasarım fiyata dahildir.</li>
</ul>

<h2>Neden MetasoftCo?</h2>
<p>İstanbul Teknokent'teki Ar-Ge ofisimizde geliştirdiğimiz yazılım ve donanımlarla her etkinliğe özel deneyimler tasarlıyoruz. Avcılar'daki merkezimizden İstanbul'un her noktasına kurulum yapıyoruz.</p>

<h2>Diğer Şehirler</h2>
<p><a href="/hizmetler/ankara-photobooth-kiralama">Ankara</a>, <a href="/hizmetler/izmir-photobooth-kiralama">İzmir</a>, <a href="/hizmetler/antalya-photobooth-kiralama">Antalya</a> ve Türkiye genelinde de aynı kapsamla hizmet veriyoruz.</p>`,
    districts: [
        ["Kadıköy", "Kadıköy, Moda, Caddebostan ve Bağdat Caddesi hattındaki marka aktivasyonları, mağaza açılışları ve kurumsal etkinliklerde AI Photobooth ve interaktif kiosk çözümleri kuruyoruz. Mekan sahipleri ve organizasyon firmalarıyla doğrudan çalışıyoruz."],
        ["Beşiktaş", "Beşiktaş ve Boğaz hattındaki otel ve restoranlarda yapılan kurumsal davet ve lansmanlarda AI yüz değiştirme, AR filtre ve dijital fotoğraf istasyonları sunuyoruz. Açık alan etkinlikleri için outdoor-uyumlu ekipman kullanıyoruz."],
        ["Etiler", "Etiler'deki kurumsal davetler, marka buluşmaları ve özel lansmanlarda butik, marka temalı AI Photobooth deneyimleri kuruyoruz."],
        ["Nişantaşı", "Nişantaşı'ndaki moda lansmanları, mağaza açılışları ve butik etkinliklerde markanıza özel AI görsel aktivasyonları ve sosyal medya entegreli fotoğraf deneyimleri sağlıyoruz."],
        ["Ortaköy", "Ortaköy'deki Boğaz manzaralı mekanlarda yapılan gala geceleri ve kurumsal davetlerde, markaya özel AI çerçeveleri ve anlık sosyal medya paylaşımı sunan photobooth kurulumları yapıyoruz."],
        ["Bebek", "Bebek'teki butik otel ve restoran etkinliklerinde, davetli sayısına göre ölçeklenen kompakt AI Photobooth çözümleri sunuyoruz."],
        ["Maslak", "Maslak'taki plaza ve ofis etkinliklerinde; yıl sonu kutlamaları, ürün lansmanları ve kurumsal toplantılarda marka entegrasyonlu AI aktivasyonları ve QR ile lead toplama çözümleri kuruyoruz."],
        ["Levent", "Levent'teki finans ve holding merkezlerinde, çok uluslu şirket etkinliklerine uygun İngilizce operatör desteğiyle kurumsal AI Photobooth hizmeti veriyoruz."],
        ["Şişli", "Şişli ve Mecidiyeköy hattındaki kongre merkezleri ve otellerde, yoğun katılımlı lansman ve yılbaşı etkinlikleri için hızlı kurulum ve yüksek kapasiteli AI Photobooth sistemleri kuruyoruz."],
        ["Ataşehir", "Ataşehir Finans Merkezi'ndeki plaza ve şirket etkinliklerinde, güvenlik ve erişim protokollerine uygun kurumsal AI aktivasyon hizmeti sunuyoruz."],
        ["Küçükyalı", "Küçükyalı ve Maltepe hattındaki etkinlik mekanlarında ve kurumsal davetlerde, Anadolu yakasında AI Photobooth kurulumu yapıyoruz."],
        ["Avcılar", "Merkez ofisimizin bulunduğu İstanbul Teknokent Avcılar ve yakın çevresinde (Beylikdüzü, Küçükçekmece, Esenyurt) aynı gün kurulum imkânı sunan, en hızlı yanıt verdiğimiz bölgedeyiz."],
    ].map(([name, description]) => ({ title: `${name} AI Photobooth Kiralama`, description })),
    faq: [
        {
            q: "İstanbul'un hangi ilçelerine hizmet veriyorsunuz?",
            a: "Kadıköy, Beşiktaş, Etiler, Nişantaşı, Ortaköy, Bebek, Maslak, Levent, Şişli, Ataşehir, Küçükyalı, Avcılar dahil İstanbul'un her iki yakasında da hizmet veriyoruz. Listede görmediğiniz bir ilçe için de teklif alabilirsiniz.",
        },
        {
            q: "Aynı gün kurulum mümkün mü?",
            a: "Merkez ofisimize yakın bölgelerde (Avcılar, Beylikdüzü, Küçükçekmece) aynı gün kurulum mümkün olabilir. Diğer ilçeler için en az 2-3 gün önceden rezervasyon öneriyoruz.",
        },
        {
            q: "Kurumsal/plaza etkinliklerinde marka entegrasyonu yapabiliyor musunuz?",
            a: "Evet. Maslak, Levent ve Ataşehir'deki plaza etkinliklerinde logo, renk paleti ve özel AI filtreleriyle markanıza özel deneyimler tasarlıyoruz. QR kod ile KVKK uyumlu lead toplama da mümkündür.",
        },
        {
            q: "Boğaz kıyısındaki (Ortaköy, Bebek, Beşiktaş) mekanlarda açık alan kurulumu yapıyor musunuz?",
            a: "Evet, outdoor-uyumlu ekipmanlarımızla açık hava etkinliklerinde de hizmet veriyoruz. Mekanın elektrik ve yer koşullarına göre önceden keşif yapıyoruz.",
        },
        {
            q: "İstanbul içi ulaşım/kurulum ücreti var mı?",
            a: "İstanbul Teknokent (Avcılar) merkezli ekibimiz İstanbul içi tüm ilçelere kurulum hizmeti verir; ulaşım, kurulum ve söküm teklif paketimize dahildir.",
        },
    ],
    slug_en: "istanbul-photo-booth-rental",
    h1_en: "AI Photo Booth Rental in İstanbul — All Districts",
    excerpt_en:
        "AI Photobooth, brand activation and event technology rental for corporate events, launches and trade shows in Maslak, Levent, Ataşehir, Şişli, Beşiktaş, Kadıköy and every district of İstanbul.",
    metaTitle_en: "İstanbul AI Photo Booth Rental — All Districts | MetasoftCo",
    metaDescription_en:
        "AI Photobooth and event technology rental for corporate events, launches and trade shows in Maslak, Levent, Ataşehir, Şişli, Beşiktaş, Kadıköy and all İstanbul districts.",
    metaKeywords_en:
        "istanbul ai photo booth rental, istanbul photo booth rental, corporate event istanbul, brand activation istanbul, event technology istanbul",
    content_en: `<h2>AI Photobooth and Brand Activation in İstanbul</h2>
<p>From our base at İstanbul Teknokent (Avcılar), the MetasoftCo team installs AI Photobooth, AI face swap, AR and interactive kiosk solutions for corporate events, launches, trade shows and shopping-mall activations on both sides of İstanbul.</p>

<h2>Venues We Work In</h2>
<ul>
<li>Hotels and congress centres</li>
<li>Plaza and office event spaces (Maslak, Levent, Ataşehir)</li>
<li>Exhibition halls and shopping-mall activation areas</li>
<li>Bosphorus-side venues and outdoor event spaces</li>
</ul>

<h2>Event Types</h2>
<h3>Corporate Events</h3>
<p>For year-end celebrations, gala nights, dealer meetings and internal events we offer brand integration, KVKK-compliant lead capture via QR and English-speaking operators.</p>
<h3>Launches and Brand Activations</h3>
<p>For product launches and store openings we work with brand-specific AI themes, kiosk wraps and instant social sharing.</p>
<h3>Trade Shows and Congresses</h3>
<p>On trade show stands and at congresses we install activations that draw visitors to the stand and, if you wish, collect attendee data.</p>
<h3>Shopping-Mall Activations</h3>
<p>We handle the protocol with mall management and keep brand visibility high with a fast shooting flow built for heavy footfall.</p>

<h2>What You Can Rent in İstanbul</h2>
${productsEn}
${outputEn}

<h2>How Installation Works</h2>
<ul>
<li><strong>Setup time:</strong> the day before the event or 3–4 hours before doors open; about 30–40 minutes per device.</li>
<li><strong>On-site crew:</strong> at least two technicians on site throughout the event.</li>
<li><strong>What the venue provides:</strong> a single standard 220V socket. We bring our own 5G connection.</li>
<li><strong>Scope:</strong> transport, setup, teardown, technical crew and branded design are included in the price.</li>
</ul>

<h2>Why MetasoftCo?</h2>
<p>We design each experience with software and hardware developed at our R&amp;D office in İstanbul Teknokent, and install anywhere in İstanbul from our base in Avcılar.</p>

<h2>Other Cities</h2>
<p>We offer the same scope in ${otherCitiesEn("istanbul-photo-booth-rental")} and across Türkiye.</p>`,
    districts_en: [
        ["Kadıköy", "We install AI Photobooth and interactive kiosk solutions for brand activations, store openings and corporate events along Kadıköy, Moda, Caddebostan and Bağdat Avenue. We work directly with venue owners and event agencies."],
        ["Beşiktaş", "For corporate receptions and launches at hotels and restaurants in Beşiktaş and along the Bosphorus we offer AI face swap, AR filters and digital photo stations, with outdoor-ready equipment for open-air events."],
        ["Etiler", "We set up boutique, brand-themed AI Photobooth experiences for corporate receptions, brand gatherings and private launches in Etiler."],
        ["Nişantaşı", "For fashion launches, store openings and boutique events in Nişantaşı we provide brand-specific AI visual activations and photo experiences built for social sharing."],
        ["Ortaköy", "For gala nights and corporate receptions at Bosphorus-view venues in Ortaköy we install photo booths with brand-specific AI frames and instant social sharing."],
        ["Bebek", "For events at boutique hotels and restaurants in Bebek we offer compact AI Photobooth setups scaled to the guest count."],
        ["Maslak", "For plaza and office events in Maslak — year-end celebrations, product launches and corporate meetings — we install brand-integrated AI activations with lead capture via QR."],
        ["Levent", "At the finance and holding headquarters in Levent we provide corporate AI Photobooth service with English-speaking operators, suited to multinational company events."],
        ["Şişli", "At congress centres and hotels around Şişli and Mecidiyeköy we install fast-setup, high-capacity AI Photobooth systems for well-attended launches and year-end events."],
        ["Ataşehir", "For plaza and company events at the Ataşehir Finance Centre we provide corporate AI activations that follow security and access protocols."],
        ["Küçükyalı", "We install AI Photobooth at event venues and corporate receptions around Küçükyalı and Maltepe on the Anatolian side."],
        ["Avcılar", "Around İstanbul Teknokent in Avcılar, where our head office is, and nearby Beylikdüzü, Küçükçekmece and Esenyurt we can offer same-day setup; this is where we respond fastest."],
    ].map(([name, description]) => ({ title: `${name} AI Photo Booth Rental`, description })),
    faq_en: [
        {
            q: "Which districts of İstanbul do you serve?",
            a: "We serve both sides of İstanbul, including Kadıköy, Beşiktaş, Etiler, Nişantaşı, Ortaköy, Bebek, Maslak, Levent, Şişli, Ataşehir, Küçükyalı and Avcılar. You can also request a quote for a district not listed here.",
        },
        {
            q: "Is same-day setup possible?",
            a: "Same-day setup may be possible in areas close to our head office (Avcılar, Beylikdüzü, Küçükçekmece). For other districts we recommend booking at least 2–3 days ahead.",
        },
        {
            q: "Can you integrate our brand at corporate and plaza events?",
            a: "Yes. At plaza events in Maslak, Levent and Ataşehir we design experiences specific to your brand with your logo, colour palette and custom AI filters. KVKK-compliant lead capture via QR code is also available.",
        },
        {
            q: "Do you install outdoors at Bosphorus-side venues (Ortaköy, Bebek, Beşiktaş)?",
            a: "Yes, with outdoor-ready equipment we also serve open-air events. We survey the venue's power and floor conditions beforehand.",
        },
        {
            q: "Is there a travel or setup fee within İstanbul?",
            a: "Our team, based at İstanbul Teknokent (Avcılar), installs in every district of İstanbul; transport, setup and teardown are included in our quote.",
        },
    ],
};

// ---- Wedding mentions in product/category copy -------------------------

// Editor HTML stores spaces as &nbsp; in places, so match either.
const sp = "(&nbsp;| )";
const weddingFixes: { model: "service" | "category"; slug: string; field: string; from: RegExp; to: string }[] = [
    { model: "service", slug: "mirror-booth", field: "content", from: new RegExp(`düğün${sp}veya${sp}gala`), to: "lansman$1veya$2gala" },
    { model: "service", slug: "mirror-booth", field: "content_en", from: new RegExp(`wedding,${sp}or${sp}gala`), to: "launch,$1or$2gala" },
    { model: "service", slug: "hareketli-fotograf-gif-kart-aktivasyonu-kiralama", field: "content", from: new RegExp(`festivaller,${sp}düğünler${sp}ve${sp}özel`), to: "festivaller$2ve$3özel" },
    { model: "service", slug: "hareketli-fotograf-gif-kart-aktivasyonu-kiralama", field: "content_en", from: new RegExp(`festivals,${sp}weddings,${sp}and${sp}special`), to: "festivals$2and$3special" },
    { model: "service", slug: "momento-ball", field: "content", from: new RegExp(`Lansmanlar,${sp}düğünler${sp}veya${sp}kurumsal`), to: "Lansmanlar$2veya$3kurumsal" },
    { model: "service", slug: "momento-ball", field: "content_en", from: new RegExp(`launches,${sp}weddings,${sp}or${sp}corporate`), to: "launches$2or$3corporate" },
    { model: "category", slug: "photobooth-ve-fotograf-aktivasyonlari", field: "faq", from: /teknoloji konferansları, perakende aktivasyonları ve düğün organizasyonları/, to: "teknoloji konferansları ve perakende aktivasyonları" },
    { model: "category", slug: "photobooth-ve-fotograf-aktivasyonlari", field: "faq_en", from: /technology conferences, retail activations, and wedding events/, to: "technology conferences and retail activations" },
];

async function main() {
    // 1 + 3. İstanbul: Turkish rewrite and English version.
    await prisma.sectorPage.update({
        where: { slug: "istanbul-ai-photobooth" },
        data: {
            excerpt: istanbul.excerpt,
            metaDescription: istanbul.metaDescription,
            metaKeywords: istanbul.metaKeywords,
            content: istanbul.content,
            districts: JSON.stringify(istanbul.districts),
            faq: JSON.stringify(istanbul.faq),
            slug_en: istanbul.slug_en,
            h1_en: istanbul.h1_en,
            excerpt_en: istanbul.excerpt_en,
            metaTitle_en: istanbul.metaTitle_en,
            metaDescription_en: istanbul.metaDescription_en,
            metaKeywords_en: istanbul.metaKeywords_en,
            content_en: istanbul.content_en,
            districts_en: JSON.stringify(istanbul.districts_en),
            faq_en: JSON.stringify(istanbul.faq_en),
        },
    });
    console.log("Updated istanbul-ai-photobooth (TR rewrite + EN)");

    // 2. İzmir reference.
    const izmir = await prisma.sectorPage.findUnique({ where: { slug: "izmir-photobooth-kiralama" } });
    if (!izmir) throw new Error("izmir-photobooth-kiralama not found; run seed-city-pages.ts first");
    const oldRef = "İzmir, bugüne kadar kurulum yaptığımız şehirler arasında.";
    const newRef = "İzmir'de Turkcell için photobooth kurulumu yaptık.";
    await prisma.sectorPage.update({
        where: { id: izmir.id },
        data: {
            content: (izmir.content ?? "").replace(oldRef, newRef),
            faq: (izmir.faq ?? "").replace(`Evet. ${oldRef}`, `Evet. ${newRef}`),
        },
    });
    console.log("Updated izmir-photobooth-kiralama reference");

    // 3. English versions of the other three cities.
    for (const city of cityEn) {
        await prisma.sectorPage.update({ where: { slug: city.slug }, data: buildCityEn(city) });
        console.log(`Updated EN ${city.slug} -> /en/services/${city.slug_en}`);
    }

    // 4. Wedding mentions.
    for (const fix of weddingFixes) {
        const row: Record<string, unknown> | null =
            fix.model === "service"
                ? await prisma.service.findFirst({ where: { slug: fix.slug } })
                : await prisma.serviceCategory.findUnique({ where: { slug: fix.slug } });
        if (!row) throw new Error(`${fix.model} not found: ${fix.slug}`);
        const value = row[fix.field];
        if (typeof value !== "string" || !fix.from.test(value)) {
            console.log(`No wedding mention left: ${fix.model}/${fix.slug}.${fix.field}`);
            continue;
        }
        const data = { [fix.field]: value.replace(fix.from, fix.to) };
        if (fix.model === "service") await prisma.service.update({ where: { id: row.id as string }, data });
        else await prisma.serviceCategory.update({ where: { id: row.id as string }, data });
        console.log(`Removed wedding mention: ${fix.model}/${fix.slug}.${fix.field}`);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
