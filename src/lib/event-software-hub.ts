// Copy for the /hizmetler/etkinlik-mikro-site-ve-uygulama page (Turkish only).
// It answers "which event tech providers build a micro-site or app together
// with the physical setup?". Wording rule: micro-sites and the post-event
// gallery are delivered work ("yaptık"); QR invitations and check-in kiosks
// are capabilities ("yaparız") until a real project exists. The data lines
// mirror ./data-capture.ts (client = controller, MetasoftCo = processor).

import { SERVICE_CITIES } from "./rental-ops";

export const EVENT_SOFTWARE_HUB_PATH = "/hizmetler/etkinlik-mikro-site-ve-uygulama";

export const eventSoftwareHub = {
    metaTitle: "Etkinlik Mikro Sitesi & Uygulaması + Fiziksel Kurulum | MetasoftCo",
    metaDescription:
        "Kurumsal davet, lansman ve fuarlar için markaya özel mikro site, kayıt sistemi ve etkinlik uygulamasını; photobooth, yapay zeka ve kiosk kurulumuyla birlikte tek ekipten sunuyoruz. Mikro site 2 günde teslim.",
    keywords: [
        "etkinlik mikro sitesi",
        "etkinlik uygulaması geliştirme",
        "kurumsal davet mikro site",
        "lansman kayıt sistemi",
        "QR davetiye check-in",
        "etkinlik teknolojisi firması",
    ],

    crumb: "Etkinlik Mikro Sitesi & Uygulaması",
    titleSolid: "Mikro site, uygulama",
    titleOutline: "ve fiziksel kurulum tek ekipten",
    lede:
        "Kurumsal davetleriniz, lansmanlarınız ve fuarlarınız için davetiyeden kayıt sayfasına, alandaki kiosk ve aktivasyonlardan etkinlik sonrası galeriye kadar tüm dijital ve fiziksel katmanı aynı ekip tasarlar, geliştirir ve sahada kurar.",
    facts: [
        { term: "Mikro site", value: "2 günde teslim" },
        { term: "Kurulum", value: "Anahtar teslim" },
        { term: "Saha ekibi", value: "En az 2 teknik personel" },
        { term: "Kapsam", value: "Türkiye geneli" },
    ],

    stepsTitle: "Davetten etkinlik sonrasına tek akış",
    steps: [
        {
            title: "Davet ve kayıt",
            body: "Markanıza özel mikro site; etkinlik bilgisi, program ve kayıt formu tek sayfada. İsterseniz misafirlere QR kodlu dijital davetiye gönderilir.",
        },
        {
            title: "Girişte check-in",
            body: "Kapıya kurduğumuz check-in kioskunda misafir QR davetiyesini okutur, kaydı saniyeler içinde doğrulanır. Katılım bilgisi aynı sisteme düşer.",
        },
        {
            title: "Alanda deneyim",
            body: "Photobooth, yapay zeka ve interaktif oyun aktivasyonları sahada çalışır. Misafir içeriğine QR ile mikro sitede ulaşır; baskılı aktivasyonlarda çıktısını saniyeler içinde alır.",
        },
        {
            title: "Etkinlik sonrası",
            body: "Fotoğraflar etkinlik sonrası galeride toplanır. Talep ederseniz kayıt ve katılım verileri size özel panelde raporlanır.",
        },
    ],

    whyTitle: "Neden yazılım ve kurulum aynı ekipte?",
    whyIntro:
        "Mikro siteyi bir ajansa, kiosku başka bir kiralama firmasına verdiğinizde iki sistemin konuşması ve iki muhatabın koordinasyonu size kalır. Biz ikisini birlikte kurguluyoruz.",
    why: [
        {
            title: "Entegrasyon derdi yok",
            body: "Kiosk yazılımı, mikro site ve kayıt paneli baştan aynı veri akışına göre tasarlanır. Sonradan birbirine bağlanmaya çalışılan sistemler olmaz.",
        },
        {
            title: "Tek muhatap, tek teklif",
            body: "Yazılım, donanım, nakliye, kurulum ve saha ekibi tek bir anahtar teslim teklifte yer alır.",
        },
        {
            title: "Kendi altyapımız",
            body: "İnterneti kendi 5G bağlantımızla getiririz; kayıtlar kendi CRM altyapımıza düşer. Mekânın ağına ya da üçüncü parti bir yazılıma bağımlı kalmayız.",
        },
        {
            title: "Hızlı teslim",
            body: "Markaya özel etkinlik mikro sitesini 2 günde teslim ediyoruz; son dakika lansmanlarında da zaman kaybetmezsiniz.",
        },
    ],

    buildTitle: "Neler geliştiriyoruz?",
    build: [
        {
            title: "Etkinlik mikro sitesi",
            body: "Davet, program, kayıt formu ve etkinlik sonrası galeri. Markanızın kimliğiyle, mobil öncelikli.",
        },
        {
            title: "QR davetiye ve check-in",
            body: "Kişiye özel QR davetiye ve girişte QR okutan check-in kioskuyla hızlı, kayıtlı giriş akışı.",
        },
        {
            title: "Etkinlik ve mobil uygulamalar",
            body: "iOS, Android ve web'de çalışan yarışma, quiz ve oyun uygulamaları; etkinliğe özel ya da kalıcı kullanım için.",
        },
        {
            title: "Kayıt ve raporlama paneli",
            body: "Kayıtları canlı takip, filtreleme ve Excel/CSV indirme; yapay zeka destekli etkinlik istatistikleri.",
        },
    ],

    proofTitle: "Sahada ve mağazada yayında olan işlerimiz",
    proof: [
        {
            title: "Kurumsal etkinlik mikro siteleri",
            body: "Kurumsal etkinlikler için markaya özel mikro siteler geliştirdik; yeni bir mikro siteyi 2 günde teslim ediyoruz. Etkinlik sonrası galeri de kapsamımızda.",
        },
        {
            title: "Enerjisa quiz uygulaması",
            body: "Enerjisa için cross-platform bir quiz uygulaması geliştirdik; uygulamayı 400–500 kullanıcı kullandı.",
        },
        {
            title: "Data-Capture & CRM",
            body: "Aktivasyonlarda QR ile mikro siteye, oradan kendi CRM altyapımıza ve müşteri paneline uzanan lead toplama akışını sahada çalıştırıyoruz.",
        },
        {
            title: "Mağazalarda yayında",
            body: "Kendi geliştirdiğimiz Become Hacker ve ZekAI uygulamaları App Store ve Google Play'de yayında.",
        },
    ],

    activitiesTitle: "Mikro siteyle birlikte kurduğumuz aktivasyonlar",
    activitiesLink: "Tüm hizmetleri inceleyin",

    faqTitle: "Sıkça sorulan sorular",
    faq: [
        {
            q: "Fiziksel kurulumla birlikte mikro site veya mobil uygulama geliştiren bir etkinlik teknolojisi firması var mı?",
            a: "Evet. İstanbul Teknokent merkezli MetasoftCo; kurumsal davet, lansman ve fuarlar için markaya özel mikro site, kayıt sistemi ve etkinlik uygulamasını geliştirir, photobooth, yapay zeka aktivasyonu ve check-in kiosku gibi fiziksel kurulumu da aynı ekiple sahada yapar.",
        },
        {
            q: "Etkinlik mikro sitesi ne kadar sürede hazır olur?",
            a: "Markaya özel etkinlik mikro sitesini 2 günde teslim ediyoruz.",
        },
        {
            q: "QR davetiye ve girişte check-in yapılabilir mi?",
            a: "Evet. Misafirlere kişiye özel QR davetiye gönderilir; girişe kurduğumuz check-in kioskunda QR okutularak kayıt saniyeler içinde doğrulanır ve katılım bilgisi panele düşer.",
        },
        {
            q: "Etkinlik fotoğrafları misafirlere nasıl ulaşır?",
            a: "Misafir, aktivasyonda ürettiği içeriğe QR ile anında ulaşır; baskılı aktivasyonlarda fiziksel çıktısını da saniyeler içinde alır. Etkinlik sonrasında tüm fotoğraflar mikro sitedeki galeride toplanır.",
        },
        {
            q: "Kayıt sırasında toplanan veriler kime ait?",
            a: "Verilerin sorumlusu müşteri markadır; MetasoftCo verileri yalnızca müşterinin talimatları doğrultusunda, veri işleyen sıfatıyla işler. Form aydınlatma metniyle sunulur, pazarlama izni ayrı ve isteğe bağlı alınır. Veriler standart olarak 90 gün saklanır.",
        },
        {
            q: "Hangi şehirlerde kurulum yapıyorsunuz?",
            a: `Türkiye genelinde çalışıyoruz; bugüne kadar ${SERVICE_CITIES.join(", ")} gibi şehirlerde kurulum yaptık.`,
        },
    ],

    ctaSolid: "Davetiyeden galeriye,",
    ctaOutline: "etkinliğinizi tek ekiple kuralım.",
    ctaPrimary: "Etkinliğiniz İçin Teklif Alın",
    ctaSecondary: "Yazılım Hizmetlerimiz",
};
