/** 18 Kasım 2026 — perakende, otomotiv ve sağlık sektör sayfaları (düzeltme listesi, bölüm 4).
 * Hedef sorular: "perakende mağaza içi deneyim", "otomotiv lansman ve showroom",
 * "ilaç sektörü kongre teknolojisi". H1 ve ilk paragraf soruyla eşleşen jenerik
 * kelimelerle başlar; hizmet kartları gerçek ürün sayfalarına gider; referanslar
 * yalnızca yayındaki projelerden; rakamlar src/lib/rental-ops.ts ve kalıcı kurulum
 * sayfasından. Doğrulanamayan iddialar (2–4 haftada kurulum, klinik/randevu yazılımı,
 * stok yönetimi, konfigürasyon kiosku) çıkarıldı. Fiyat yok.
 * Slug, ad ve İngilizce alanlar değişmez.
 *
 * Önizleme:   pnpm exec tsx scripts/sector-pages-2026-11.ts
 * Uygula:     pnpm exec tsx scripts/sector-pages-2026-11.ts --apply
 * Geri al:    pnpm exec tsx scripts/sector-pages-2026-11.ts --rollback /mutlak/yol/backup.json
 * Alanlar arada değişmişse (editpanel'den düzenlenmişse) yazmaz, durur.
 */
import "dotenv/config";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "../src/lib/db";

const FIELDS = ["title", "heroSubtitle", "intro", "content", "services", "faq", "cta", "metaTitle", "metaDescription", "metaKeywords"] as const;
type Field = (typeof FIELDS)[number];
type Fields = Record<Field, string | null>;

const card = (name: string, desc: string, href: string) => ({ name, desc, href });
const qa = (q: string, a: string) => ({ q, a });

const SETUP =
    "Mekândan tek bir standart 220V priz yeterli; interneti kendi 5G altyapımızla getirdiğimiz için mekânın ağına ihtiyaç duymayız. Kurulumu etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yaparız; cihaz başına ortalama 30–40 dakika sürer ve etkinlik boyunca alanda en az 2 teknik personelimiz bulunur. Teknik hazırlık için etkinlikten 3 gün önce haber vermeniz yeterli.";

const AI_PHOTO = "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala";
const KALICI = "/hizmetler/magaza-ici-kalici-photobooth";
const DATA = "/hizmetler/data-capture-crm";
const QUIZ = "/hizmetler/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi";

const patches: Record<string, Fields> = {
    "perakende-sektoru": {
        title: "Perakende İçin Mağaza İçi Deneyim ve Aktivasyon Teknolojileri",
        heroSubtitle: "Mağaza açılışı, kampanya haftası ve kalıcı mağaza deneyimi.",
        intro:
            "Mağaza içi deneyim; perakende markalarının mağaza, AVM ve showroom ziyaretçisini fotoğraf, oyun ya da yapay zekâ deneyimiyle alanda tutup kampanyaya dahil ettiği aktivasyonlardır. MetasoftCo bu deneyimleri mağaza açılışı ve kampanya haftası için kiralık, her gün çalışacak noktalar için kalıcı kurulumla sunar; tasarım, yazılım ve saha ekibi kendi bünyemizdedir.",
        content: [
            "<h2>Kiralık mı, kalıcı mı?</h2>",
            "<p>Mağaza açılışı, sezon kampanyası ya da AVM etkinliği gibi birkaç günlük işlerde sistemi kiralarsınız; kurulumu, işletmeyi ve sökümü ekibimiz yapar. Sabit bir noktada her gün kullanılacaksa sistemi satın alırsınız: kamera, ışık, dokunmatik ekran ve kiosk birlikte teslim edilir, mağaza ekibinize kullanım eğitimi verilir, 12 ay donanım garantisi ve uzaktan teknik destek sağlanır. Ayrıntılar <a href=\"/hizmetler/magaza-ici-kalici-photobooth\">mağaza içi kalıcı photobooth ve kiosk</a> sayfasında.</p>",
            "<h2>Mağazada hangi deneyim ne işe yarar?</h2>",
            "<ul>",
            "<li><strong>Fotoğraf noktası:</strong> <a href=\"/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala\">photobooth</a> 2 m² alana sığar, fotoğrafı markalı çerçeveyle basar ve QR ile telefona gönderir; ziyaretçi mağazadan bir hatırayla çıkar.</li>",
            "<li><strong>Yapay zekâ fotoğrafı:</strong> <a href=\"/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala\">AI Photobooth</a> ziyaretçiyi kampanya görselinin içine yerleştirir; tek istasyon saatte ortalama 40–60 kişiye hizmet verir.</li>",
            "<li><strong>Sanal deneme:</strong> <a href=\"/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-fashion-mirror-akilli-ayna\">AI Fashion Mirror</a> ile ziyaretçi koleksiyon parçalarını kendi fotoğrafı üzerinde dener.</li>",
            "<li><strong>Hediye dağıtımı:</strong> <a href=\"/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu\">dijital hediye çarkı</a> kampanya hediyelerini kuralları önceden belirlenmiş bir oyunla dağıtır.</li>",
            "<li><strong>Kayıt:</strong> <a href=\"/hizmetler/data-capture-crm\">Data-Capture</a> modülüyle ziyaretçi fotoğrafını almak için QR kodu okutup formu doldurur; kayıtlar KVKK onayıyla alınır, panelden izlenir ve Excel/CSV olarak indirilir.</li>",
            "</ul>",
            "<h2>Sahadan örnekler</h2>",
            "<p>DeFacto, Adana mağazası için photobooth sistemimizi satın aldı; sistemi mağazaya kalıcı olarak kurduk, daha sonra markanın Bodrum mağazasına taşındı ve orada kullanılmaya devam etti. DeFacto mağaza ve etkinlikleri için <a href=\"/projeler/defacto-x-momento-ball-photo\">Momento Ball</a> uygulamasında ziyaretçilerin fotoğrafları şeffaf kürelerde hatıraya dönüştü. Akmerkez'de EURO 2024 döneminde ziyaretçiler kendi isim ve fotoğraflarıyla <a href=\"/projeler/akmerkez-x-ai-football-card\">kişiselleştirilmiş futbol kartı</a> aldı. État Pur için <a href=\"/projeler/etat-pur-ozel-tasarim-dev-krem-kutusu-aktivasyonu\">1,90 metrelik dev krem kutusu</a> konseptli interaktif hediye dağıtım mekanizması tasarladık.</p>",
            "<h2>Kurulum ve hazırlık</h2>",
            `<p>${SETUP} Kalıcı kurulumda sistem mağazanıza kurulur, ekibinize eğitim verilir; gerektiğinde bir mağazadan sökülüp başka bir şubeye taşınabilir.</p>`,
        ].join(""),
        services: JSON.stringify([
            card("Mağaza İçi Kalıcı Photobooth ve Kiosk", "Mağazada her gün çalışan photobooth ve AI fotoğraf kiosku; eğitim, 12 ay donanım garantisi ve uzaktan destekle.", KALICI),
            card("AI Photobooth Kiralama", "Açılış ve kampanya haftası için ziyaretçiyi kampanya görselinin içine yerleştiren yapay zekâ fotoğraf istasyonu.", AI_PHOTO),
            card("AI Fashion Mirror: Sanal Deneme Aynası", "Koleksiyon parçalarını ziyaretçinin kendi fotoğrafı üzerinde gösteren sanal deneme deneyimi.", "/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-fashion-mirror-akilli-ayna"),
            card("Dijital Hediye Çarkı", "Kampanya hediyelerini kuralları önceden belirlenmiş, markalı bir oyunla dağıtın.", "/hizmetler/interaktif-etkinlik-aktiviteleri/dijital-hediye-carki-aktivasyonu"),
            card("Data-Capture ve CRM", "Mağaza ziyaretçisini KVKK onaylı kayda dönüştüren QR form ve yönetim paneli.", DATA),
        ]),
        faq: JSON.stringify([
            qa("Mağaza içi deneyim nedir?", "Mağaza içi deneyim, perakende markalarının mağaza, AVM ve showroom ziyaretçisini fotoğraf, oyun ya da yapay zekâ deneyimiyle alanda tutup kampanyaya dahil ettiği aktivasyonlardır. Photobooth, AI fotoğraf kiosku, sanal deneme aynası ve hediye çarkı en sık kullanılan örneklerdir."),
            qa("Mağaza açılışı için hangi aktivasyon uygun?", "Açılış birkaç gün sürüyorsa sistemi kiralamak daha uygundur. Fotoğraf noktası (photobooth ya da AI Photobooth) ziyaretçiye mağazadan bir hatıra verir; hediye çarkı açılış hediyelerini dağıtır. Alan, kişi sayısı ve kampanya hedefine göre birlikte seçeriz."),
            qa("Sistemi mağazamıza kalıcı olarak kurabilir misiniz?", "Evet. Kamera, ışık, dokunmatik ekran ve kioskı yazılımla birlikte teslim eder, mağazanıza kurar ve ekibinize eğitim veririz. 12 ay donanım garantisi vardır; teknik destek uzaktan bağlantıyla, gerektiğinde yerinde verilir. DeFacto'nun Adana mağazasına kurduğumuz sistem daha sonra Bodrum mağazasına taşındı."),
            qa("Mağaza ziyaretçisinden veri toplanabilir mi?", "İsterseniz Data-Capture modülü eklenir: ziyaretçi fotoğrafını almak için QR kodu okutup kısa bir form doldurur. Kayıtlar KVKK onayıyla alınır, panelden anlık izlenir ve Excel/CSV olarak indirilir. Modül isteğe bağlıdır."),
            qa("Kurulum için ne kadar önceden haber vermeliyiz?", "Kiralık kurulumlarda teknik hazırlık için etkinlikten 3 gün önce haber vermeniz yeterli. Kurulum etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yapılır; mekândan tek bir 220V priz bekleriz, interneti kendi 5G altyapımızla getiririz."),
        ]),
        cta: "Mağaza açılışınız ya da kalıcı kurulum için görüşelim",
        metaTitle: "Mağaza İçi Deneyim ve Perakende Aktivasyonu | Photobooth, Kiosk | MetasoftCo",
        metaDescription:
            "Perakende markaları için mağaza içi deneyim: açılış ve kampanya haftası için kiralık photobooth, AI fotoğraf ve oyunlar; mağazaya kalıcı kiosk. DeFacto ve Akmerkez örnekleri.",
        metaKeywords:
            "mağaza içi deneyim, perakende aktivasyonu, mağaza açılışı aktivasyonu, mağaza içi photobooth, mağaza kiosku, AVM etkinlik aktivasyonu, perakende deneyim teknolojisi",
    },
    "otomotiv-sektoru": {
        title: "Otomotiv Lansmanı ve Showroom Etkinlikleri İçin İnteraktif Deneyimler",
        heroSubtitle: "Araç lansmanı, bayi açılışı ve showroom için.",
        intro:
            "Otomotiv lansmanı ve showroom aktivasyonu; araç tanıtımında, bayi açılışında ya da test sürüşü gününde ziyaretçiyi markayla etkileşime sokan fotoğraf, video ve oyun deneyimleridir. MetasoftCo bu deneyimleri lansman günü için kiralık, showroom için kalıcı kurulumla sunar; tasarım, yazılım ve saha ekibi kendi bünyemizdedir.",
        content: [
            "<h2>Lansman gecesi</h2>",
            "<p><a href=\"/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala\">AI Photobooth</a> ziyaretçiyi markanıza özel sahnelere (yarış pisti, tasarım stüdyosu, kampanya afişi) yerleştirir; tek istasyon saatte ortalama 40–60 kişiye hizmet verir. <a href=\"/hizmetler/video/360-video-booth\">360 Video Booth</a> 3 m² alana kurulur ve lansmanın paylaşılan kısa videolarını üretir; saatte ortalama 40–50 kişi. Görseller ve videolar QR kod ile telefona iner.</p>",
            "<h2>Showroom'da her gün</h2>",
            "<p>Showroom ve deneyim merkezleri için aynı sistemleri <a href=\"/hizmetler/magaza-ici-kalici-photobooth\">kalıcı olarak</a> kurarız: dokunmatik terminal, kamera ve fotoğraf yazılımı birlikte teslim edilir, ekibinize eğitim verilir, 12 ay donanım garantisi ve uzaktan teknik destek sağlanır. Castrol EDGE için tasarlayıp ürettiğimiz <a href=\"/projeler/castrol-edge-x-ai-photo-kiosk-yapay-zek-fotograf-deneyimi\">AI Photo Kiosk</a>, kullanıcıların fotoğraflarını motorsporları temalı görsellere dönüştüren kalıcı bir interaktif deneyim sistemi.</p>",
            "<h2>Test sürüşü ve bayi toplantıları</h2>",
            "<p>Test sürüşü günlerinde <a href=\"/hizmetler/data-capture-crm\">Data-Capture</a> modülüyle katılımcı formu QR kod üzerinden alınır; kayıtlar KVKK onayıyla toplanır, panelden izlenir ve Excel/CSV olarak satış ekibinize aktarılır. Bayi toplantılarında <a href=\"/hizmetler/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi\">canlı quiz</a> ile yeni modelin özellikleri, katılımcıların telefonundan yanıt verdiği ve skorların ekranda canlı gösterildiği bir yarışmaya dönüşür.</p>",
            "<h2>Kurulum ve hazırlık</h2>",
            `<p>${SETUP}</p>`,
        ].join(""),
        services: JSON.stringify([
            card("AI Photobooth Kiralama", "Ziyaretçiyi markaya özel lansman sahnelerine yerleştiren yapay zekâ fotoğraf istasyonu.", AI_PHOTO),
            card("360 Video Booth Kiralama", "Lansmanın paylaşılan kısa videoları: dönen kamera, yavaş çekim ve markalı grafikler.", "/hizmetler/video/360-video-booth"),
            card("Showroom İçin Kalıcı Kiosk", "Showroom ve deneyim merkezine kalıcı AI fotoğraf kiosku; eğitim, garanti ve uzaktan destekle.", KALICI),
            card("Canlı Quiz Bilgi Yarışması", "Bayi toplantısında yeni modeli telefonla oynanan, canlı skor tablolu bir yarışmaya dönüştürün.", QUIZ),
            card("Data-Capture ve CRM", "Test sürüşü ve lansman katılımcılarından KVKK onaylı kayıt; panel ve Excel/CSV aktarımı.", DATA),
        ]),
        faq: JSON.stringify([
            qa("Otomotiv lansmanında hangi interaktif deneyimler kullanılır?", "En sık kullanılanlar ziyaretçiyi markaya özel sahnelere yerleştiren AI Photobooth, lansmanın paylaşılan videolarını üreten 360 Video Booth, bayi ve satış ekipleri için canlı quiz ve katılımcı kaydı alan Data-Capture formudur. Kombinasyonu kişi sayısı ve alanınıza göre birlikte seçeriz."),
            qa("Showroom'a kalıcı kurulum yapıyor musunuz?", "Evet. Dokunmatik terminal, kamera ve yazılımı birlikte teslim eder, showroom'a kurar ve ekibinize eğitim veririz; 12 ay donanım garantisi ve uzaktan teknik destek vardır. Castrol EDGE için ürettiğimiz AI Photo Kiosk bu modelin bir örneğidir."),
            qa("Test sürüşü etkinliğinde katılımcı kaydı alınabilir mi?", "Evet. Data-Capture modülüyle katılımcı QR kodu okutup formu doldurur; kayıtlar KVKK onayıyla alınır, etkinlik boyunca panelden izlenir ve Excel/CSV olarak indirilir."),
            qa("Bayi toplantısı için ne önerirsiniz?", "Yeni modelin özelliklerini anlatan canlı quiz bayi toplantılarında iyi çalışır: katılımcılar telefonlarından yanıt verir, skorlar ekranda canlı gösterilir. Gecenin sosyal kısmı için AI Photobooth ya da 360 Video Booth eklenebilir."),
            qa("Kurulum için ne gerekiyor?", "Mekândan tek bir standart 220V priz yeterli; interneti kendi 5G altyapımızla getiririz. Kurulum etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer; etkinlik boyunca alanda en az 2 teknik personelimiz bulunur."),
        ]),
        cta: "Araç lansmanınız ya da showroom projeniz için görüşelim",
        metaTitle: "Otomotiv Lansmanı ve Showroom Aktivasyonu | AI Fotoğraf, Kiosk | MetasoftCo",
        metaDescription:
            "Araç lansmanı, bayi ve showroom etkinlikleri için AI fotoğraf, 360 video, canlı quiz ve katılımcı kaydı. Showroom'a kalıcı kiosk; Castrol EDGE AI Photo Kiosk örneği.",
        metaKeywords:
            "otomotiv lansman etkinliği, showroom aktivasyonu, araç lansmanı aktivasyon, bayi açılışı etkinlik, test sürüşü etkinliği, otomotiv marka aktivasyonu, showroom kiosk",
    },
    "saglik-sektoru": {
        title: "İlaç ve Sağlık Sektörü Kongreleri İçin Etkinlik Teknolojisi",
        heroSubtitle: "Medikal kongre, sempozyum ve ilaç lansmanları için.",
        intro:
            "İlaç sektörü kongre teknolojisi; medikal kongre, sempozyum ve ürün lansmanlarında sponsor standını ve oturum aralarını hekimler ve sağlık profesyonelleri için ilgi çekici kılan dijital deneyimlerdir. MetasoftCo stant için canlı quiz, AI fotoğraf köşesi ve açık rızaya dayalı katılımcı formlarını tasarlar, kurar ve kongre boyunca sahada işletir.",
        content: [
            "<h2>Kongre standında ne işe yarar?</h2>",
            "<ul>",
            "<li><strong>Canlı quiz:</strong> <a href=\"/hizmetler/interaktif-etkinlik-aktiviteleri/quiz-bilgi-yarismasi\">quiz bilgi yarışmasında</a> katılımcılar sorulara telefonlarından yanıt verir, skorlar ekranda canlı gösterilir. Soru içerikleri firmanızın medikal ekibi tarafından hazırlanır ya da onaylanır.</li>",
            "<li><strong>Fotoğraf köşesi:</strong> <a href=\"/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-photobooth-kirala\">AI Photobooth</a> standı oturum aralarında ziyaret edilen bir noktaya çevirir; görsel QR kod ile telefona iner.</li>",
            "<li><strong>Katılımcı formu:</strong> <a href=\"/hizmetler/data-capture-crm\">Data-Capture</a> modülüyle form QR kod üzerinden doldurulur; açık rıza metni formda yer alır, kayıtlar panelden izlenir ve Excel/CSV olarak indirilir.</li>",
            "<li><strong>Markaya özel uygulama:</strong> ürün ya da tedavi alanına özel bir oyun veya bilgi uygulaması gerekiyorsa <a href=\"/hizmetler/markaya-ozel-etkinlik-yazilimi\">markaya özel etkinlik yazılımı</a> kapsamında geliştiririz.</li>",
            "</ul>",
            "<h2>Tanıtım kurallarına uygun kurgu</h2>",
            "<p>Hekimlere ve sağlık profesyonellerine yönelik çekiliş, hediye ve ödül mekanikleri ilaç tanıtım kuralları nedeniyle her kongrede uygun olmayabilir. Bu tür mekanikleri yalnızca firmanızın uyum ekibinin onayıyla kurguluyoruz; quiz ve fotoğraf deneyimi ödül olmadan da kurulabilir. Ekranda görünen tüm içerik sahaya çıkmadan önce onayınıza sunulur.</p>",
            "<h2>Kongre merkezinde ve otelde kurulum</h2>",
            `<p>${SETUP} Kongre merkezlerinin ve otellerin ağına bağlı olmadığımız için stant internet altyapısından etkilenmeyiz. İstanbul merkezliyiz; Antalya dahil Türkiye genelinde kurulum yapıyoruz.</p>`,
        ].join(""),
        services: JSON.stringify([
            card("Canlı Quiz Bilgi Yarışması", "Stant ve oturum aralarında telefonla katılımlı, canlı skor tablolu yarışma; sorular medikal ekibinizin onayıyla.", QUIZ),
            card("AI Photobooth Kiralama", "Sponsor standını ziyaret edilen bir fotoğraf noktasına çeviren yapay zekâ fotoğraf istasyonu.", AI_PHOTO),
            card("Data-Capture ve CRM", "Açık rızaya dayalı QR katılımcı formu; panel ve Excel/CSV aktarımı.", DATA),
            card("Markaya Özel Etkinlik Yazılımı", "Ürün ya da tedavi alanına özel oyun ve bilgi uygulamaları.", "/hizmetler/markaya-ozel-etkinlik-yazilimi"),
            card("Fuar ve Stant Aktivasyonları", "Kongre ve fuar standları için aktivasyon seçeneklerinin tamamı.", "/hizmetler/fuar-aktivasyonlari"),
        ]),
        faq: JSON.stringify([
            qa("İlaç sektörü kongrelerinde hangi etkinlik teknolojileri kullanılır?", "Sponsor standında en sık kullanılanlar telefonla katılımlı canlı quiz, AI fotoğraf köşesi ve açık rızaya dayalı katılımcı formudur. Ürün ya da tedavi alanına özel bir uygulama gerekiyorsa markaya özel olarak geliştirilir."),
            qa("Quiz soruları kimin onayından geçiyor?", "Soru içerikleri firmanızın medikal ekibi tarafından hazırlanır ya da onaylanır. Ekran tasarımı ve akış da sahaya çıkmadan önce onayınıza sunulur."),
            qa("Hekimlere yönelik çekiliş ya da hediye yapılabilir mi?", "Bu tür mekanikler ilaç tanıtım kuralları nedeniyle her kongrede uygun olmayabilir. Yalnızca firmanızın uyum ekibinin onayıyla kurguluyoruz; quiz ve fotoğraf deneyimi ödül olmadan da kurulabilir."),
            qa("Katılımcı verisi nasıl toplanıyor?", "Katılımcı QR kodu okutup formu doldurur; açık rıza metni formda yer alır. Kayıtlar panelden izlenir ve Excel/CSV olarak indirilir. Veri sorumlusu ve veri işleyen rolleri projenin kapsamına göre belirlenir."),
            qa("Kongre merkezinde kurulum için ne gerekiyor?", "Tek bir standart 220V priz yeterli; interneti kendi 5G altyapımızla getirdiğimiz için kongre merkezinin ağına ihtiyaç duymayız. Kurulum etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yapılır; kongre boyunca alanda en az 2 teknik personelimiz bulunur."),
        ]),
        cta: "Kongre standınız için deneyimi birlikte planlayalım",
        metaTitle: "İlaç Sektörü Kongre Teknolojisi | Stant Aktivasyonu, Quiz | MetasoftCo",
        metaDescription:
            "Medikal kongre, sempozyum ve ilaç lansmanları için stant aktivasyonu: canlı quiz, AI fotoğraf köşesi ve açık rızalı katılımcı formu. Kurulum ve saha ekibi dahil.",
        metaKeywords:
            "ilaç sektörü kongre teknolojisi, medikal kongre aktivasyonu, kongre standı aktivasyonu, sempozyum etkinlik teknolojisi, ilaç lansmanı etkinlik, kongre quiz uygulaması",
    },
};

const select = { id: true, slug: true, ...Object.fromEntries(FIELDS.map((f) => [f, true])) } as { id: true; slug: true } & Record<Field, true>;
const args = process.argv.slice(2);
const pick = (row: Record<string, unknown>): Fields => Object.fromEntries(FIELDS.map((f) => [f, (row[f] as string | null) ?? null])) as Fields;
const same = (a: Fields, b: Fields) => FIELDS.every((f) => a[f] === b[f]);
/** `title` is required in the schema; every row and patch has one. */
const toData = (fields: Fields) => ({ ...fields, title: fields.title ?? "" });

async function rollback(file: string) {
    const backup = JSON.parse(readFileSync(resolve(file), "utf8")) as { id: string; slug: string; before: Fields; after: Fields }[];
    await prisma.$transaction(async (tx) => {
        for (const row of backup) {
            const now = pick(await tx.industryPage.findUniqueOrThrow({ where: { id: row.id }, select }));
            if (!same(now, row.after)) throw new Error(`${row.slug}: uygulamadan sonra değişmiş, geri alma durdu.`);
            await tx.industryPage.update({ where: { id: row.id }, data: toData(row.before) });
        }
    });
    console.log(`Geri alındı: ${backup.length} kayıt.`);
}

async function main() {
    const rollbackAt = args.indexOf("--rollback");
    if (rollbackAt >= 0) return rollback(args[rollbackAt + 1]);

    const rows = await prisma.industryPage.findMany({ where: { slug: { in: Object.keys(patches) } }, select });
    const missing = Object.keys(patches).filter((slug) => !rows.some((r) => r.slug === slug));
    if (missing.length) throw new Error(`Bulunamadı: ${missing.join(", ")}`);

    const changes = rows
        .map((r) => ({ id: r.id, slug: r.slug, before: pick(r), after: patches[r.slug] }))
        .filter((c) => !same(c.before, c.after));

    for (const c of changes) {
        console.log(`\n${c.slug}`);
        console.log(`  H1       : ${c.before.title}\n           → ${c.after.title}`);
        console.log(`  metaTitle: ${c.before.metaTitle}\n           → ${c.after.metaTitle} (${c.after.metaTitle?.length})`);
        console.log(`  metaDesc : → ${c.after.metaDescription} (${c.after.metaDescription?.length})`);
        console.log(`  giriş    : → ${c.after.intro}`);
        console.log(`  hizmetler: → ${JSON.parse(c.after.services ?? "[]").map((s: { name: string; href: string }) => `${s.name} (${s.href})`).join(" · ")}`);
        console.log(`  SSS      : → ${JSON.parse(c.after.faq ?? "[]").map((s: { q: string }) => s.q).join(" · ")}`);
    }
    console.log(`\n${changes.length} kayıt değişecek.`);
    if (!args.includes("--apply") || changes.length === 0) return;

    mkdirSync("tmp/seo-release", { recursive: true });
    const file = resolve(`tmp/seo-release/sector-pages-backup-${Date.now()}.json`);
    writeFileSync(file, JSON.stringify(changes, null, 2));

    await prisma.$transaction(async (tx) => {
        for (const c of changes) {
            const now = pick(await tx.industryPage.findUniqueOrThrow({ where: { id: c.id }, select }));
            if (!same(now, c.before)) throw new Error(`${c.slug}: önizlemeden sonra değişmiş, yazma durdu.`);
            await tx.industryPage.update({ where: { id: c.id }, data: toData(c.after) });
        }
    });
    console.log(`Uygulandı. Yedek: ${file}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
