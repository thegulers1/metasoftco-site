// Shared copy for the optional Data-Capture / CRM module. Rendered on every
// rental service whose `dataCapture` flag is on, so the wording lives in one
// place. The legal lines are deliberately conservative: the client is the
// data controller, MetasoftCo only processes on their instructions, and
// marketing consent is always separate and optional.

export type DataCaptureLocale = "tr" | "en";

export interface DataCaptureCopy {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
    legal: string;
    cta: string;
    more?: string;
    faq: { q: string; a: string }[];
}

const tr: DataCaptureCopy = {
    eyebrow: "Opsiyonel modül · Data-Capture & CRM",
    title: "Bu aktiviteyi lead toplama motoruna dönüştürün",
    intro:
        "Talep etmeniz halinde bu aktivasyona Data-Capture modülünü ekliyoruz. Katılımcıların keyifle yaşadığı deneyim, fuar veya lansman sonrasında satış ekibinizin takip edebileceği nitelikli bir potansiyel müşteri listesine dönüşür.",
    items: [
        {
            title: "Akıllı teslimat ve lead formu",
            body: "Katılımcılar ürettikleri dijital içeriğe QR kod ile ulaşırken markanıza özel tasarlanan mikro siteye yönlendirilir. Ad, şirket ve e-posta gibi, birlikte belirlediğimiz alanları doldurarak içeriklerini alırlar.",
        },
        {
            title: "KVKK ve GDPR'a uygun kurgu",
            body: "Form; aydınlatma metni ile birlikte sunulur. Pazarlama iletişimi izni, içerik teslimine bağlanmadan ayrı ve isteğe bağlı bir açık rıza onayıyla alınır. Yalnızca amaca uygun ve gerekli veriler toplanır.",
        },
        {
            title: "Kendi CRM altyapımız",
            body: "Toplanan kayıtlar MetasoftCo'nun kendi CRM altyapısına anlık olarak aktarılır. Ek bir yazılım satın almanıza ya da entegrasyon süreci beklemenize gerek kalmaz.",
        },
        {
            title: "Size özel müşteri paneli",
            body: "Size tanımlanan panelden gelen kayıtları canlı takip eder, filtreler ve Excel/CSV olarak indirirsiniz. Yapay zeka destekli istatistikler etkinliğinizin performansını özetler.",
        },
    ],
    legal:
        "Data-Capture modülü yalnızca müşterinin talebi ve yazılı onayı ile etkinleştirilir. Toplanan kişisel verilere ilişkin veri sorumlusu müşteri markadır; MetasoftCo bu verileri yalnızca müşterinin talimatları doğrultusunda, veri işleyen sıfatıyla işler. Aydınlatma metni ve rıza metinlerinin nihai içeriği ile onayı müşterinin sorumluluğundadır. Veriler standart olarak 90 gün saklanır; bu süre içinde panelden indirilebilir, süre sonunda sistemlerimizden silinir. Farklı bir süre sözleşmede kararlaştırılabilir.",
    cta: "Data-Capture ile Teklif Alın",
    more: "Modülü Detaylı İnceleyin",
    faq: [
        {
            q: "Bu aktivasyonla katılımcı verisi (lead) toplanabilir mi?",
            a: "Evet. Talep etmeniz halinde Data-Capture modülü eklenir: katılımcılar içeriklerine QR kod ile ulaşırken markanıza özel mikro sitede ad, şirket ve e-posta gibi bilgilerini paylaşır. Kayıtlar MetasoftCo'nun kendi CRM altyapısına anlık aktarılır ve size özel panelden canlı olarak takip edilir.",
        },
        {
            q: "Toplanan veriler KVKK ve GDPR kapsamında nasıl yönetiliyor?",
            a: "Form, aydınlatma metni ile sunulur; pazarlama izni ise ayrı ve isteğe bağlı bir açık rıza onayıyla alınır. Veri sorumlusu müşteri marka, MetasoftCo ise müşterinin talimatlarıyla hareket eden veri işleyendir. Metinlerin nihai onayı müşteriye aittir.",
        },
    ],
};

const en: DataCaptureCopy = {
    eyebrow: "Optional module · Data-Capture & CRM",
    title: "Turn this activation into a lead-generation engine",
    intro:
        "On request, we add the Data-Capture module to this activation. An experience guests enjoy becomes a qualified lead list your sales team can follow up after the trade show or launch.",
    items: [
        {
            title: "Smart delivery and lead form",
            body: "Guests reach their digital content via QR code and land on a micro-site designed for your brand. They receive their content by filling in fields we define together, such as name, company and email.",
        },
        {
            title: "Built for KVKK and GDPR",
            body: "The form is shown with a privacy notice. Marketing consent is collected through a separate, optional opt-in that is never tied to content delivery. Only data that is necessary for the stated purpose is collected.",
        },
        {
            title: "Our own CRM infrastructure",
            body: "Captured records flow instantly into MetasoftCo's own CRM infrastructure. No extra software to buy and no integration project to wait for.",
        },
        {
            title: "Your dedicated client dashboard",
            body: "Follow incoming records live from your dedicated dashboard, filter them and download them as Excel/CSV. AI-generated statistics summarise how your event performed.",
        },
    ],
    legal:
        "The Data-Capture module is activated only at the client's request and with their written approval. The client brand is the data controller for the personal data collected; MetasoftCo processes it solely on the client's instructions as a data processor. The final wording and approval of the privacy notice and consent texts remain the client's responsibility. Data is retained for 90 days by default, can be downloaded from the dashboard during that period and is deleted from our systems afterwards. A different period can be agreed in the contract.",
    cta: "Request a Data-Capture Quote",
    faq: [
        {
            q: "Can this activation capture attendee data (leads)?",
            a: "Yes. On request we add the Data-Capture module: guests reach their content via QR code and share details such as name, company and email on a micro-site designed for your brand. Records flow instantly into MetasoftCo's own CRM infrastructure and can be followed live from your dedicated dashboard.",
        },
        {
            q: "How is the collected data handled under KVKK and GDPR?",
            a: "The form is shown with a privacy notice, and marketing consent is collected through a separate, optional opt-in. The client brand is the data controller and MetasoftCo acts as a data processor on the client's instructions. Final approval of the texts rests with the client.",
        },
    ],
};

export function dataCaptureCopy(locale: DataCaptureLocale): DataCaptureCopy {
    return locale === "en" ? en : tr;
}
