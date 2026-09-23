// Copy for the /hizmetler/data-capture-crm hub page (Turkish only for now).
// Legal statements mirror the service-page block in ./data-capture.ts: the
// client is the data controller, MetasoftCo the processor, 90-day retention.

export const DATA_CAPTURE_HUB_PATH = "/hizmetler/data-capture-crm";

export const dataCaptureHub = {
    metaTitle: "Etkinlik ve Fuarda Lead Toplama | Data-Capture & CRM | MetasoftCo",
    metaDescription:
        "Photobooth, AI ve interaktif oyun aktivasyonlarınızda katılımcı verisini KVKK ve GDPR'a uygun toplayın. Kayıtlar kendi CRM altyapımıza anlık düşer, size özel panelden takip edilir.",
    keywords: [
        "etkinlik lead toplama",
        "fuar ziyaretçi verisi toplama",
        "data capture etkinlik",
        "KVKK uyumlu veri toplama",
        "etkinlik CRM",
        "photobooth lead toplama",
    ],

    crumb: "Data-Capture & CRM",
    titleSolid: "Etkinlikte lead toplama:",
    titleOutline: "Data-Capture & CRM",
    lede:
        "Photobooth, yapay zeka ve interaktif oyun aktivasyonlarınıza eklenen Data-Capture modülü, katılımcı deneyimini satış ekibinizin takip edebileceği nitelikli bir potansiyel müşteri listesine dönüştürür.",
    facts: [
        { term: "Entegrasyon", value: "Aktivasyona gömülü" },
        { term: "Aktarım", value: "Anlık" },
        { term: "Saklama", value: "90 gün" },
        { term: "Çerçeve", value: "KVKK & GDPR" },
    ],

    stepsTitle: "Nasıl çalışır?",
    steps: [
        {
            title: "Deneyim",
            body: "Katılımcı AI fotoğraf, photobooth ya da interaktif oyun deneyimini yaşar ve kendine özel bir içerik üretir.",
        },
        {
            title: "QR ile mikro site",
            body: "İçeriğine ulaşmak için ekrandaki QR kodu okutur ve markanıza özel tasarlanan mikro siteye gelir.",
        },
        {
            title: "Form ve onaylar",
            body: "Ad, şirket, e-posta gibi birlikte belirlediğimiz alanları doldurur; aydınlatma metnini görür, pazarlama iznini isteğe bağlı olarak verir.",
        },
        {
            title: "CRM ve panel",
            body: "Kayıt anında kendi CRM altyapımıza düşer ve size özel panelde görünür. Katılımcı içeriğini hemen alır.",
        },
    ],

    panelTitle: "Size özel müşteri paneli",
    panelIntro:
        "Etkinlik boyunca ve sonrasında tüm kayıtları tek bir arayüzden yönetirsiniz. Ek yazılım kurmanız ya da entegrasyon beklemeniz gerekmez.",
    panelFeatures: [
        { title: "Canlı takip", body: "Gelen kayıtları etkinlik sürerken anlık olarak görün." },
        { title: "Filtreleme", body: "Kayıtları ihtiyacınıza göre süzüp segmentlere ayırın." },
        { title: "Excel / CSV indirme", body: "Listeyi tek tıkla indirip satış ekibinizle paylaşın." },
        { title: "Yapay zeka istatistikleri", body: "Katılım ve dönüşüm verilerinden otomatik istatistik ve özetler alın." },
    ],
    panelCaption: "Temsili görsel. Gösterilen veriler örnektir.",

    complianceTitle: "KVKK ve GDPR çerçevesi",
    complianceIntro:
        "Veri toplama akışını, müşterimizin hukuk birimiyle birlikte son hale getirilecek şekilde, gizlilik ilkeleri gözetilerek kurgularız.",
    compliance: [
        {
            title: "Roller net",
            body: "Toplanan kişisel verilerin veri sorumlusu müşteri markadır. MetasoftCo bu verileri yalnızca müşterinin talimatları doğrultusunda, veri işleyen sıfatıyla işler.",
        },
        {
            title: "Aydınlatma ve ayrı rıza",
            body: "Form, aydınlatma metniyle birlikte sunulur. Pazarlama iletişimi izni içerik teslimine bağlanmaz; ayrı ve isteğe bağlı bir onay kutusuyla alınır.",
        },
        {
            title: "Gerekli olan kadar veri",
            body: "Yalnızca birlikte belirlediğimiz, amaca uygun alanlar toplanır. Gereksiz veri talep edilmez.",
        },
        {
            title: "90 gün saklama",
            body: "Veriler standart olarak 90 gün saklanır ve bu süre içinde panelden indirilebilir. Süre sonunda sistemlerimizden silinir; farklı bir süre sözleşmede kararlaştırılabilir.",
        },
    ],
    legal:
        "Data-Capture modülü yalnızca müşterinin talebi ve yazılı onayı ile etkinleştirilir. Aydınlatma metni ve rıza metinlerinin nihai içeriği ile onayı müşterinin sorumluluğundadır. Bu sayfadaki bilgiler genel niteliktedir ve hukuki danışmanlık yerine geçmez.",

    scenariosTitle: "Nerede kullanılır?",
    scenarios: [
        {
            title: "Fuar standları",
            body: "Standı ziyaret eden karar vericileri fuar kapanmadan satış ekibinizin listesine ekleyin.",
        },
        {
            title: "Ürün lansmanları",
            body: "Lansmana katılan davetlilerle etkinlik sonrasında doğrudan iletişim kurun.",
        },
        {
            title: "Bayi ve kurumsal toplantılar",
            body: "Katılımcı bilgilerini düzenli ve tek bir listede toplayın.",
        },
        {
            title: "AVM ve saha aktivasyonları",
            body: "Yoğun trafikli alanlarda marka deneyimini ölçülebilir bir potansiyel müşteri listesine dönüştürün.",
        },
    ],

    activitiesTitle: "Data-Capture ile çalışan aktiviteler",
    activitiesLink: "Tüm hizmetleri görün",

    faqTitle: "Sıkça sorulan sorular",
    faq: [
        {
            q: "Data-Capture modülü hangi aktivitelere eklenebilir?",
            a: "AI fotoğraf, photobooth, video booth ve interaktif oyunlar gibi katılımcının tek tek deneyim yaşadığı aktivasyonların büyük çoğunluğuna eklenebilir. Her hizmet sayfasında modülün uygun olup olmadığı belirtilir.",
        },
        {
            q: "Katılımcılardan hangi bilgiler toplanabilir?",
            a: "Genellikle ad, soyad, şirket, unvan, e-posta ve telefon gibi alanlar kullanılır. Alanları etkinliğinizin amacına göre birlikte belirleriz ve yalnızca gerekli olanları toplarız.",
        },
        {
            q: "Veriler hangi CRM'e aktarılıyor?",
            a: "Kayıtlar MetasoftCo'nun kendi CRM altyapısına anlık olarak aktarılır. Size özel panelden takip eder, filtreler ve Excel/CSV olarak indirerek kendi sistemlerinize alabilirsiniz.",
        },
        {
            q: "Müşteri panelinde neler yapabilirim?",
            a: "Gelen kayıtları canlı takip edebilir, filtreleyebilir, Excel/CSV olarak indirebilir ve yapay zeka ile oluşturulan istatistiksel özetleri inceleyebilirsiniz.",
        },
        {
            q: "Veriler ne kadar süre saklanıyor?",
            a: "Veriler standart olarak 90 gün saklanır. Bu süre içinde panelden indirebilirsiniz; süre sonunda sistemlerimizden silinir. Farklı bir süre ihtiyacınız varsa sözleşmede kararlaştırılabilir.",
        },
        {
            q: "KVKK ve GDPR açısından sorumluluk kimde?",
            a: "Toplanan kişisel verilerin veri sorumlusu müşteri markadır; MetasoftCo verileri müşterinin talimatlarıyla, veri işleyen olarak işler. Aydınlatma ve rıza metinleri form üzerinde sunulur, nihai onayları müşterinin hukuk birimine aittir.",
        },
        {
            q: "Pazarlama izni vermeyen katılımcı içeriğini alabilir mi?",
            a: "Evet. Pazarlama iletişimi izni içerik teslimine bağlanmaz, ayrı ve isteğe bağlı bir onay olarak alınır.",
        },
    ],

    ctaSolid: "Bir sonraki etkinliğinizi",
    ctaOutline: "lead motoruna dönüştürelim.",
    ctaPrimary: "Data-Capture ile Teklif Alın",
    ctaSecondary: "Seçili Projeleri İnceleyin",
};
