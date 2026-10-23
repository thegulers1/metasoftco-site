import "dotenv/config";
import { prisma } from "../src/lib/db";

// 2026-10-23: /blog/etkinliklerde-ai-face-swap-nasil-calisir (22 Ekim) competed
// with the face swap guide for the same searches. Its verified parts go into
// the guide; the post is unpublished (not deleted) and next.config.ts 301s its
// TR and EN URLs to the guide. Unverified claims in it (Salesforce/HubSpot
// real-time sync, "tam KVKK uyumu", the old Teknopark name) are not carried over.
// Idempotent: a second run changes nothing. Pass --apply to write.

const GUIDE = "yapay-zeka-yuz-degistirme-face-swap-nasil-calisir";
const MERGED = "etkinliklerde-ai-face-swap-nasil-calisir";
const MARKER_TR = "<h3>Arka planda neler oluyor? Kioskten çıktıya akış</h3>";
const MARKER_EN = "<h3>Behind the scenes: from kiosk to output</h3>";

const sectionTr = `${MARKER_TR}
<ol>
<li><strong>Çekim:</strong> Kiosktaki kamera ve stüdyo ışığı yüzü net ve dengeli bir ışıkla kaydeder. Sonucun kalitesi büyük ölçüde bu karede belirlenir.</li>
<li><strong>Yüz analizi:</strong> Fotoğraf GPU üzerinde işlenir. Model yüzü bulur, referans noktalarını çıkarır; yüzün açısını, eğimini ve ışığını seçilen konseptin sahnesiyle karşılaştırır.</li>
<li><strong>Üretim:</strong> Difüzyon modeli sahneyi katılımcının yüzüyle birlikte yeniden üretir. Kimlik koruma katmanları yüz hatlarını ve ten tonunu kişiye sadık tutar.</li>
<li><strong>Harmanlama:</strong> Işık rengi, gölgeler ve kenar geçişleri sahneye uyarlanır; yüz sahneye yapıştırılmış gibi durmaz.</li>
<li><strong>Teslim:</strong> Sonuç ekranda gösterilir, QR kodla telefona iner ve baskılı paketlerde yerinde basılır. Form kullanılan etkinliklerde katılımcının izin verdiği bilgiler markanın paneline düşer.</li>
</ol>
`;

const sectionEn = `${MARKER_EN}
<ol>
<li><strong>Capture:</strong> The kiosk camera and studio light record the face sharply and evenly. Most of the final quality is decided in this frame.</li>
<li><strong>Face analysis:</strong> The photo is processed on a GPU. The model finds the face, extracts its landmarks and compares its angle, tilt and light with the scene of the chosen concept.</li>
<li><strong>Generation:</strong> A diffusion model regenerates the scene together with the guest's face. Identity-preserving layers keep the facial features and skin tone true to the person.</li>
<li><strong>Blending:</strong> Light colour, shadows and edges are matched to the scene, so the face never looks pasted in.</li>
<li><strong>Delivery:</strong> The result appears on screen, reaches the phone via QR code and, with print packages, is printed on site. Where a form is used, the details the guest agrees to share go to the brand's dashboard.</li>
</ol>
`;

const faqTr = [
    {
        q: "Kendi marka kimliğimiz ve konseptimiz kullanılabilir mi?",
        a: "Evet. Kiosk giydirmesi, ekran arayüzü, konsept sahneleri ve çıktı tasarımı markanıza ve etkinlik temanıza göre hazırlanır.",
    },
    {
        q: "Katılımcı verileri CRM sistemimize aktarılabilir mi?",
        a: "Data-Capture kurgusunda katılımcının izin verdiği bilgiler (ad, e-posta, telefon gibi) etkinlik boyunca müşteri panelinde canlı izlenir. Veriler Excel ya da CSV olarak indirilip kendi CRM sisteminize aktarılabilir; standart olarak 90 gün saklanır.",
    },
    {
        q: "Kurulum ve etkinlik günü teknik destek nasıl işliyor?",
        a: "Kurulum etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce yapılır ve cihaz başına ortalama 30–40 dakika sürer. Etkinlik boyunca alanda en az 2 teknik personel bulunur.",
    },
];

const faqEn = [
    {
        q: "Can our own brand identity and concept be used?",
        a: "Yes. The kiosk wrap, screen interface, concept scenes and output design are made for your brand and event theme.",
    },
    {
        q: "Can guest data be transferred to our CRM?",
        a: "In a Data-Capture setup, the details guests agree to share (such as name, email and phone) can be followed live on the client dashboard during the event. The data can be downloaded as Excel or CSV and imported into your own CRM; by default it is kept for 90 days.",
    },
    {
        q: "How do setup and on-site technical support work?",
        a: "Setup takes place the day before the event or 3–4 hours before doors open, about 30–40 minutes per device. At least 2 technicians stay on site throughout the event.",
    },
];

function insertBefore(html: string, anchor: string, section: string) {
    const i = html.indexOf(anchor);
    if (i === -1) throw new Error(`Anchor not found: ${anchor.slice(0, 40)}`);
    return html.slice(0, i) + section + html.slice(i);
}

function addFaq(value: string | null, extra: { q: string; a: string }[]) {
    const list: { q: string; a: string }[] = value ? JSON.parse(value) : [];
    const known = new Set(list.map((item) => item.q));
    return JSON.stringify([...list, ...extra.filter((item) => !known.has(item.q))]);
}

async function main() {
    const apply = process.argv.includes("--apply");
    const guide = await prisma.blogPost.findUnique({ where: { slug: GUIDE } });
    const merged = await prisma.blogPost.findUnique({ where: { slug: MERGED } });
    if (!guide) throw new Error("Guide not found");

    const data: { content?: string; content_en?: string; faq?: string; faq_en?: string } = {};
    if (guide.content && !guide.content.includes(MARKER_TR)) {
        data.content = insertBefore(guide.content, "<p>Etkinliğiniz için konsept önerisi", sectionTr);
    }
    if (guide.content_en && !guide.content_en.includes(MARKER_EN)) {
        data.content_en = insertBefore(guide.content_en, "<p>For concept ideas", sectionEn);
    }
    const faq = addFaq(guide.faq, faqTr);
    if (faq !== guide.faq) data.faq = faq;
    const faqEnValue = addFaq(guide.faq_en, faqEn);
    if (faqEnValue !== guide.faq_en) data.faq_en = faqEnValue;

    console.log("guide fields to update:", Object.keys(data).join(", ") || "none");
    console.log("merged post:", merged ? `published=${merged.published}` : "missing");
    if (!apply) return console.log("Dry run. Pass --apply to write.");

    await prisma.$transaction([
        ...(Object.keys(data).length ? [prisma.blogPost.update({ where: { slug: GUIDE }, data })] : []),
        ...(merged && merged.published ? [prisma.blogPost.update({ where: { slug: MERGED }, data: { published: false } })] : []),
    ]);
    console.log("Applied.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
