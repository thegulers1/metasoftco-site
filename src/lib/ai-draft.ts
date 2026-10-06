// Turns a free-text note from the team into unpublished drafts for the
// editpanel: project pages, service pages or a blog post. The model only
// arranges what the note and the verified facts below say; anything else goes
// into `missing` as a question instead of being invented.

import OpenAI from "openai";
import { prisma } from "./db";
import { COMPANY_FACTS } from "./llms";
import { SOFTWARE_CATEGORY_SLUG } from "./software";
import type { DraftKind, DraftResult } from "./ai-draft-shared";

const MODEL = process.env.OPENAI_CONTENT_MODEL || "gpt-5.5";

/** Categories the public project list already uses. */
const PROJECT_CATEGORIES = ["Yapay Zeka", "Fotoğraf Aktiviteleri", "İnteraktif Etkinlik", "Video", "VR & AR", "Yazılım"];
const BLOG_CATEGORIES = ["Etkinlik Teknolojileri", "Yapay Zeka", "Marka Aktivasyonu", "Etkinlik Trendleri"];

/** Per-product figures confirmed by the team; nothing else may be quoted as a number. */
const PRODUCT_FACTS = [
    "AI Photo: tek istasyon saatte 40–60 kişi; kapasite istasyon ekleyerek artar.",
    "Photobooth: 2 m² alan, saatte 70–80 kişi (grup çekiminde 150 kişiye kadar).",
    "Mirror Booth: 4 m² alan, saatte 60–80 kişi.",
    "360 Video Booth: 3 m² alan, saatte 40–50 kişi, baskı yok.",
    "Cabin Photo: 5 m² alan, saatte yaklaşık 50 kişi.",
];

const string = { type: "string" } as const;
const stringList = { type: "array", items: string } as const;
const faqSchema = {
    type: "array",
    items: {
        type: "object",
        additionalProperties: false,
        required: ["q", "a"],
        properties: { q: string, a: string },
    },
} as const;

const COMMON_PROPERTIES = {
    title: string,
    slug: string,
    summary: string,
    content: string,
    metaTitle: string,
    metaDescription: string,
    metaKeywords: string,
    faq: faqSchema,
    title_en: string,
    slug_en: string,
    summary_en: string,
    content_en: string,
    metaTitle_en: string,
    metaDescription_en: string,
    metaKeywords_en: string,
    faq_en: faqSchema,
};

function responseSchema(extra: Record<string, unknown>) {
    const properties = { ...COMMON_PROPERTIES, ...extra };
    return {
        type: "object",
        additionalProperties: false,
        required: ["drafts", "instagramCaption", "missing", "unmatchedActivities"],
        properties: {
            drafts: {
                type: "array",
                items: { type: "object", additionalProperties: false, required: Object.keys(properties), properties },
            },
            instagramCaption: string,
            missing: stringList,
            unmatchedActivities: stringList,
        },
    };
}

function slugify(value: string): string {
    const map: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", "×": "x" };
    return value
        .toLocaleLowerCase("tr")
        .replace(/[çğıöşü×]/g, (char) => map[char])
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 90);
}

function stripUnsafeHtml(html: string): string {
    return html
        .replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, "")
        .replace(/\son\w+="[^"]*"/gi, "")
        .replace(/Metasoftco(?![a-z.])/g, "MetasoftCo");
}

async function loadCatalogue() {
    return prisma.serviceCategory.findMany({
        where: { slug: { not: SOFTWARE_CATEGORY_SLUG } },
        orderBy: { order: "asc" },
        select: {
            id: true,
            name: true,
            slug: true,
            services: {
                where: { published: true, type: "RENTAL" },
                orderBy: { order: "asc" },
                select: { id: true, title: true, slug: true, description: true },
            },
        },
    });
}

type Catalogue = Awaited<ReturnType<typeof loadCatalogue>>;

function serviceLines(catalogue: Catalogue, withLinks = false): string {
    return catalogue.flatMap((category) =>
        category.services.map((service) => {
            const link = withLinks ? ` | link=/hizmetler/${category.slug}/${service.slug}` : "";
            return `- id=${service.id}${link} | ${service.title} [${category.name}] — ${(service.description || "").replace(/\s+/g, " ").slice(0, 140)}`;
        })
    ).join("\n");
}

const INTRO = `MetasoftCo'nun editörüsün. MetasoftCo, İstanbul merkezli bir etkinlik teknolojisi şirketi; markalar için yapay zeka fotoğraf, photobooth ve interaktif oyun aktivasyonlarını anahtar teslim kiralar.`;

const SHARED_RULES = `# Uydurma yasağı (en önemli kural)
- Yalnızca ekibin notunda ve aşağıdaki doğrulanmış bilgilerde geçen bilgileri kullan. Katılımcı sayısı, kapasite, alan ölçüsü, süre, oran, fiyat, ödül, müşteri adı, müşteri yorumu, tarih gibi kaynaklarda OLMAYAN hiçbir somut bilgiyi yazma.
- Rakam yoksa rakam yazma; "yüzlerce", "binlerce", "rekor" gibi ölçü bildiren ifadeler de yasak. Fiyat hiçbir zaman yazılmaz.
- İyi bir sayfa için gereken ama kaynaklarda olmayan her şeyi "missing" listesine kısa Türkçe sorular olarak yaz.

# Yayın metni kuralı
- content, summary, faq ve meta alanları doğrudan sitede yayınlanır. Bu alanlarda "notta", "anlatıda", "brief", "belirtilmediği için", "bilgi verilmedi" gibi ifadeler ASLA geçmez; eksik bilgiden söz etme, o kısmı yazma ve eksikliği yalnızca "missing" listesine koy.
- Nottaki istekler ve iç planlar (Instagram metni isteği, video hazırlatılması, paylaşım planı) içeriğin parçası değildir.
- Dil: sade ve somut; "unutulmaz", "eşsiz", "büyüleyici", "sihirli" gibi boş övgülerden kaçın. Marka adı her zaman "MetasoftCo" yazılır. Kiralama varsayılan tekliftir; satın almayı öne çıkarma. Düğün/nişan vurgusu yapma, anlatım kurumsal etkinlik odaklıdır.
- HTML: yalnızca h2, h3, p, ul, ol, li, strong, a, table, thead, tbody, tr, th, td etiketleri. Bilgi azsa metin de kısa kalır; şişirme.

# Ortak alanlar
- slug: başlığın küçük harfli, Türkçe karaktersiz, tireli hali; "×" yerine "x".
- metaTitle: en fazla 60 karakter. metaDescription: 140–160 karakter. metaKeywords: virgülle ayrılmış 4–6 ifade.
- *_en alanları: aynı içeriğin doğal İngilizcesi (çeviri kokmayan); slug_en İngilizce başlıktan.

# Instagram metni
- "instagramCaption": notun TAMAMINI kapsayan tek bir Türkçe Instagram gönderi metni. Samimi ama kurumsal; 3–5 kısa satır, en fazla 2 emoji, sonda 5–8 hashtag. Metin gönderinin kendisidir: "video yayında", "paylaşıyoruz" gibi gönderiden söz eden cümle kurma. Uydurma yasağı burada da geçerli.`;

function facts(): string {
    return `# Doğrulanmış şirket bilgileri
${COMPANY_FACTS.map((fact) => `- ${fact}`).join("\n")}

# Doğrulanmış ürün rakamları (bunların dışında kapasite/alan rakamı yazma)
${PRODUCT_FACTS.map((fact) => `- ${fact}`).join("\n")}`;
}

async function projectPrompt(catalogue: Catalogue) {
    const sample = await prisma.project.findUnique({
        where: { slug: "akmerkez-x-ai-football-card" },
        select: { title: true, description: true, content: true },
    });
    return {
        extra: {
            client: string,
            category: { type: "string", enum: PROJECT_CATEGORIES },
            projectDate: { type: ["string", "null"], description: "YYYY-MM-DD, or null when the note gives no date" },
            tags: stringList,
            serviceIds: stringList,
        },
        prompt: `${INTRO}
Ekipten biri yaptığı işi serbest bir dille anlatacak. Sen bu nottan web sitesinin "Projeler" bölümü için taslak kayıtlar çıkaracaksın.

# Bölme kuralı
- Her MARKA için ayrı bir proje çıkar. Aynı markaya birden fazla aktivite yapıldıysa hepsi o markanın tek projesinde anlatılır.
- Etkinliğin adı (ör. bir yarı maraton) marka değildir; etkinlik, projenin geçtiği yer olarak içerikte anılır.
- Hangi aktivitenin hangi markaya yapıldığı kesin anlaşılmıyorsa TAHMİN ETME: en makul eşleştirmeyle taslağı çıkar ve belirsizliği "missing" listesine soru olarak yaz.

${SHARED_RULES}

# Hizmet eşleştirme
- Nottaki her aktiviteyi aşağıdaki listeden bir hizmetle eşleştir ve projenin "serviceIds" alanına o hizmetin id değerini yaz. Yalnızca listedeki id değerlerini kullan.
- Aktivitenin adı farklı olsa da mekaniği listedeki bir hizmetle açıkça aynıysa (ör. vücut hareketiyle sepeti yönetip düşen nesneleri toplama → Catch & Collect Game) o hizmete bağla, içerikte hizmetin sitedeki adını kullan ve "missing" listesine "… olarak eşleştirdim, doğru mu?" diye yaz.
- Listede karşılığı olmayan aktiviteyi hiçbir hizmete bağlama; adını "unmatchedActivities" listesine yaz. Aktivite yine de içerikte, anlatıldığı kadarıyla yer alır; hakkında yalnızca adı biliniyorsa tek cümleyle an. Video çekimi, sosyal medya metni gibi işler aktivite değildir.

# Proje alanları
- title: "Marka × Aktivite" biçiminde (ör. "Akmerkez × AI Football Card").
- client: markanın adı. category: ana aktivitenin türü.
- projectDate: notta kesin tarih varsa YYYY-MM-DD, yoksa null. "Haftasonu" gibi ifadelerden tarih türetme.
- summary: tek cümlelik özet, en fazla 160 karakter.
- content: bir <h2> ile başla, 2–3 <h3> alt başlık ve <p> paragraflar. Birinci çoğul şahıs ("hazırladık", "kurduk").
- tags: 2–4 kısa etiket (aktivitenin adı ve öne çıkan özelliği).
- metaTitle: "Marka × Aktivite | MetasoftCo".
- faq: bu aktiviteyi kendi etkinliğinde isteyen birinin soracağı 2–3 soru (nasıl çalışır, kurulum için ne gerekir, markaya özel tasarlanır mı gibi), cevapları hizmet listesi ve doğrulanmış bilgilerden. Sayfanın zaten söylediği şeyleri soru yapma. Cevaplanabilecek soru yoksa boş liste.

${facts()}

# Hizmet listesi
${serviceLines(catalogue)}

# Üslup örneği (yayındaki bir proje; ayrıntılarını KOPYALAMA, yalnızca tonu ve yapıyı örnek al)
Başlık: ${sample?.title ?? ""}
Özet: ${sample?.description ?? ""}
İçerik: ${sample?.content ?? ""}`,
    };
}

function servicePrompt(catalogue: Catalogue) {
    return {
        extra: {
            categoryId: { type: "string", enum: catalogue.map((category) => category.id) },
            homeTitle: string,
            homeTitle_en: string,
            outputType: { type: "string", enum: ["none", "digital", "print"] },
        },
        prompt: `${INTRO}
Ekipten biri sunduğumuz yeni bir aktivasyonu (hizmeti) serbest bir dille anlatacak. Sen bu nottan web sitesinin "Hizmetler" bölümü için kiralama sayfası taslağı çıkaracaksın. Notta birden fazla ayrı hizmet anlatılıyorsa her biri için ayrı taslak çıkar; aksi halde tek taslak.

${SHARED_RULES}

# Hizmet alanları
- Aşağıdaki listede aynı hizmet zaten varsa yeni taslak ÇIKARMA; "drafts" boş kalsın ve "missing" listesine "Bu hizmet sitede zaten var: …" yaz.
- title: "<Hizmet adı> Kiralama" (ör. "Mirror Booth Kiralama"). homeTitle: yalnızca hizmetin kısa adı (ör. "Mirror Booth").
- categoryId: aşağıdaki kategorilerden en uygununun id değeri.
- outputType: katılımcı bir şey almıyorsa (oyun) "none"; yalnızca dijital çıktı/QR paylaşım varsa "digital"; fiziksel baskı da varsa "print". Nottan anlaşılmıyorsa "none" seç ve "missing" listesine sor.
- summary: hizmeti bir-iki cümleyle anlatan kısa açıklama, en fazla 200 karakter.
- content: bir <h2> ile başla; şu sırayla <h3> bölümleri: "Nasıl çalışır?" (katılımcının adım adım deneyimi), "Markaya özel tasarım", "Alan ve kurulum" (yalnızca notta ya da doğrulanmış bilgilerde olan ölçülerle; hizmete özgü alan/kapasite rakamı yoksa genel kurulum bilgilerini yaz ve rakamı "missing" listesine sor), "Hangi etkinliklere uygun?".
- metaTitle: "<Hizmet adı> Kiralama | <kısa ayırt edici ifade> — MetasoftCo". metaKeywords: insanların arayacağı ifadeler ("… kiralama", Türkçe karşılığı vb.).
- faq: bu hizmeti kiralamayı düşünen birinin soracağı 3–4 soru (nedir, ne kadar alan gerekir, baskı/çıktı var mı, İstanbul dışına kurulum var mı, markaya özel tasarlanır mı); cevaplar nottan ve doğrulanmış bilgilerden. Cevabı bilinmeyen soru yazma.
- Her zaman şunları "missing" listesinde sor (notta yoksa): gereken alan (m²), saatlik kapasite, çıktı türü, bu hizmetle yapılmış referans proje.
- unmatchedActivities boş liste döner.

${facts()}

# Kategoriler
${catalogue.map((category) => `- id=${category.id} | ${category.name}`).join("\n")}

# Sitedeki mevcut hizmetler (tekrar etmemek ve üsluba uymak için)
${serviceLines(catalogue)}`,
    };
}

async function blogPrompt(catalogue: Catalogue) {
    const sample = await prisma.blogPost.findUnique({
        where: { slug: "lansmanda-sosyal-medya-icerigi-ve-lead-ureten-aktivasyonlar" },
        select: { title: true, excerpt: true, content: true },
    });
    return {
        extra: {
            category: { type: "string", enum: BLOG_CATEGORIES },
            serviceIds: stringList,
        },
        prompt: `${INTRO}
Ekipten biri bir blog yazısının konusunu ve varsa vermek istediği bilgileri yazacak. Sen bu nottan web sitesinin blogu için TEK bir yazı taslağı çıkaracaksın. Okur: etkinlik planlayan marka yöneticisi ya da ajans çalışanı. Amaç: onun Google'a ya da bir yapay zekâ asistanına sorduğu soruya net cevap vermek.

${SHARED_RULES}

# Blog alanları
- title: okurun sorusunu taşıyan somut başlık (ör. "500 Kişilik Etkinlik İçin Kaç Photobooth Gerekir?"). "… Nedir?" tarzı genel başlıklardan kaçın.
- category: listeden en uygunu.
- summary: yazının özeti, 1–2 cümle.
- content: ilk paragraf "<p><strong>Kısa cevap:</strong> …</p>" ile başlar ve soruyu 2–3 cümlede doğrudan cevaplar. Ardından <h2>/<h3> bölümleri; karşılaştırma varsa bir <table>; adım varsa <ol>. Hesap gerektiren konularda yalnızca doğrulanmış ürün rakamlarıyla hesap yap ve hesabı göster.
- Yazıda adı geçen her hizmete, hizmet listesindeki link değeriyle <a href="…"> bağlantısı ver (her hizmete en fazla bir kez). Listede olmayan adrese bağlantı verme; dış siteye bağlantı verme.
- İstatistik, araştırma sonucu, sektör verisi, rakip adı ve fiyat YAZMA. Genel bilgi olarak kabul edilen şeyleri rakamsız anlat.
- serviceIds: yazının altında önerilecek 2–4 hizmetin id değerleri (yazıda geçenler).
- metaTitle: başlığın kısa hali + " | MetasoftCo".
- faq: okurun aynı konuda soracağı 3–4 ek soru; cevaplar doğrulanmış bilgilerden. Cevabı bilinmeyen soru yazma.
- İçeriği güçlendirecek ama elinde olmayan bilgileri (gerçek proje örneği, ölçülmüş sonuç, belirli bir ürünün rakamı) "missing" listesinde sor.
- unmatchedActivities boş liste döner.

${facts()}

# Hizmet listesi
${serviceLines(catalogue, true)}

# Üslup örneği (yayındaki bir yazının başı; içeriğini KOPYALAMA, yalnızca yapıyı ve tonu örnek al)
Başlık: ${sample?.title ?? ""}
Özet: ${sample?.excerpt ?? ""}
İçerik: ${(sample?.content ?? "").slice(0, 2400)}`,
    };
}

async function slugExists(kind: DraftKind, field: "slug" | "slug_en", value: string): Promise<boolean> {
    const where = { [field]: value };
    if (kind === "project") return Boolean(await prisma.project.findFirst({ where, select: { id: true } }));
    if (kind === "blog") return Boolean(await prisma.blogPost.findFirst({ where, select: { id: true } }));
    return Boolean(await prisma.service.findFirst({ where, select: { id: true } }));
}

async function uniqueSlug(kind: DraftKind, field: "slug" | "slug_en", base: string, taken: Set<string>) {
    const root = base || "taslak";
    for (let attempt = 1; ; attempt++) {
        const candidate = attempt === 1 ? root : `${root}-${attempt}`;
        if (taken.has(candidate) || await slugExists(kind, field, candidate)) continue;
        taken.add(candidate);
        return candidate;
    }
}

export async function generateDrafts(kind: DraftKind, brief: string): Promise<DraftResult> {
    const catalogue = await loadCatalogue();
    const { prompt, extra } = kind === "project"
        ? await projectPrompt(catalogue)
        : kind === "service"
            ? servicePrompt(catalogue)
            : await blogPrompt(catalogue);

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: [
            { role: "system", content: prompt },
            { role: "user", content: brief },
        ],
        response_format: {
            type: "json_schema",
            json_schema: { name: `${kind}_drafts`, strict: true, schema: responseSchema(extra) },
        },
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("Model boş yanıt döndürdü");
    const result = JSON.parse(raw) as Omit<DraftResult, "kind">;

    const serviceIds = new Set(catalogue.flatMap((category) => category.services.map((service) => service.id)));
    const servicePaths = new Set(catalogue.flatMap((category) => category.services.map((service) => `/hizmetler/${category.slug}/${service.slug}`)));
    /** Drops links the model made up; only catalogue service pages may be linked. */
    const keepKnownLinks = (html: string) =>
        html.replace(/<a\s[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi, (_link, href: string, text: string) => (servicePaths.has(href) ? `<a href="${href}">${text}</a>` : text));

    const takenSlugs = new Set<string>();
    const takenSlugsEn = new Set<string>();
    for (const draft of result.drafts) {
        draft.slug = await uniqueSlug(kind, "slug", slugify(draft.slug || draft.title), takenSlugs);
        draft.slug_en = await uniqueSlug(kind, "slug_en", slugify(draft.slug_en || draft.title_en), takenSlugsEn);
        draft.content = keepKnownLinks(stripUnsafeHtml(draft.content));
        // English pages live at different addresses, so Turkish service links are dropped there.
        draft.content_en = stripUnsafeHtml(draft.content_en).replace(/<a\s[^>]*>([\s\S]*?)<\/a>/gi, "$1");
        if (draft.serviceIds) draft.serviceIds = draft.serviceIds.filter((id) => serviceIds.has(id));
        if (draft.categoryId) draft.categoryName = catalogue.find((category) => category.id === draft.categoryId)?.name;
        if (draft.projectDate && !/^\d{4}-\d{2}-\d{2}$/.test(draft.projectDate)) draft.projectDate = null;
    }
    return { kind, ...result };
}
