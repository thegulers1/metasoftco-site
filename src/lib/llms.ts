// Builds /llms.txt and /llms-full.txt from the database plus the verified
// company facts below, so AI assistants always read the same catalogue and
// the same numbers as the site. Only verified facts belong in COMPANY_FACTS;
// anything not confirmed by the team stays out rather than being guessed.

import { prisma } from "./db";
import { siteConfig } from "./site";
import { SERVICE_CITIES, rentalOpsCopy, toRentalOutput, type RentalOutput } from "./rental-ops";
import { SOFTWARE_CATEGORY_SLUG } from "./software";
import { DATA_CAPTURE_HUB_PATH, dataCaptureHub } from "./data-capture-hub";
import { EVENT_SOFTWARE_HUB_PATH, eventSoftwareHub } from "./event-software-hub";

const base = siteConfig.url;

const COMPANY_FACTS = [
    "Kuruluş: 2020, İstanbul. Yazılım şirketi olarak kuruldu, ardından etkinlik teknolojilerine geçti; yazılım ve donanım aynı ekipte.",
    "Merkez: İstanbul Teknokent, Avcılar/İstanbul.",
    "Deneyim: 1.000+ etkinlik, 100+ marka.",
    `Hizmet bölgesi: Türkiye geneli. Kurulum yapılan şehirler: ${SERVICE_CITIES.join(", ")}.`,
    "Kiralama anahtar teslimdir: nakliye, kurulum, söküm, teknik personel ve markaya özel tasarım fiyata dahildir.",
    "Kurulum: etkinlikten 1 gün önce ya da etkinlik günü 3–4 saat önce; cihaz başına ortalama 30–40 dakika.",
    "Saha ekibi: etkinlik boyunca alanda en az 2 teknik personel.",
    "Mekândan beklenen: tek bir standart 220V priz. İnternet kendi 5G mobil altyapımızla gelir.",
    "Kiosklar marka kaplamasıyla (dış giydirme) teslim edilir; ekran arayüzü markaya özel tasarlanır.",
    "Baskılı aktivasyonlarda saniyeler içinde fiziksel baskı; pakete 750 adet baskı dahildir. Dijital aktivasyonlarda QR ile anında paylaşım.",
    "Oyunlarda isteğe bağlı skor tablosu: katılımcı QR okutup form doldurursa skor tablosunda yer alır (Data-Capture ile lead toplama).",
    "Data-Capture & CRM: kayıtlar kendi CRM altyapımıza anlık düşer, müşteri panelinden canlı takip ve Excel/CSV indirme; veriler standart 90 gün saklanır. Veri sorumlusu müşteri, MetasoftCo veri işleyendir.",
    "Etkinlik mikro sitesi (davet, kayıt, etkinlik sonrası galeri) 2 günde teslim edilir; QR davetiye ve check-in kiosku kurgulanabilir.",
];

const CITY_REFERENCES = [
    "Ankara: TRT, Anadolu Ajansı",
    "İzmir: Turkcell",
    "Antalya: Nirvana otelde bir tohum markası etkinliği",
    "Diyarbakır: Turkcell",
    "Çorum: Turkcell",
];

const SOLUTION_PAGES = [
    { title: "Etkinlik Mikro Sitesi & Uygulaması + Fiziksel Kurulum", path: EVENT_SOFTWARE_HUB_PATH, note: eventSoftwareHub.metaDescription },
    { title: "Data-Capture & CRM (etkinlikte lead toplama)", path: DATA_CAPTURE_HUB_PATH, note: dataCaptureHub.metaDescription },
    { title: "Kurumsal Etkinlik Teknolojisi", path: "/hizmetler/kurumsal-etkinlik-teknolojisi", note: "Lansman, fuar ve kurumsal etkinlikler için uçtan uca etkinlik teknolojisi." },
    { title: "Fuar Aktivasyonları", path: "/hizmetler/fuar-aktivasyonlari", note: "Fuar standında katılım ve lead toplama odaklı aktivasyonlar." },
    { title: "İstanbul AI Photobooth", path: "/hizmetler/istanbul-ai-photobooth", note: "İstanbul'da yapay zeka photobooth kiralama." },
    { title: "Ankara Photobooth Kiralama", path: "/hizmetler/ankara-photobooth-kiralama", note: "Ankara'da photobooth ve etkinlik teknolojisi kiralama." },
    { title: "İzmir Photobooth Kiralama", path: "/hizmetler/izmir-photobooth-kiralama", note: "İzmir'de photobooth ve etkinlik teknolojisi kiralama." },
    { title: "Antalya Photobooth Kiralama", path: "/hizmetler/antalya-photobooth-kiralama", note: "Antalya'da photobooth ve etkinlik teknolojisi kiralama." },
    { title: "Yazılım Geliştirme", path: `/hizmetler/${SOFTWARE_CATEGORY_SLUG}`, note: "Mobil uygulama, web uygulaması ve panel, süreç yazılımı, yapay zeka entegrasyonu, oyun ve eğitim uygulamaları." },
];

const OUTPUT_LABEL: Record<RentalOutput, string> = {
    none: "oyun/etkileşim, çıktı yok",
    digital: "dijital çıktı, QR ile paylaşım",
    print: "dijital çıktı + anında baskı (750 baskı dahil)",
};

/** Plain text from editor HTML, trimmed to a sentence-ish length. */
function plain(html: string | null | undefined, max = 280): string {
    const text = (html ?? "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&[a-z]+;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

function withNote(line: string, note: string): string {
    return note ? `${line}: ${note}` : line;
}

function parseList<T>(raw: string | null | undefined): T[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

async function loadCatalogue() {
    const [categories, projects, posts] = await Promise.all([
        prisma.serviceCategory.findMany({
            orderBy: { order: "asc" },
            include: {
                services: {
                    where: { published: true, type: "RENTAL" },
                    orderBy: { order: "asc" },
                },
            },
        }),
        prisma.project.findMany({
            where: { published: true },
            orderBy: [{ featured: "desc" }, { order: "asc" }],
            select: { title: true, slug: true, client: true, category: true, description: true },
        }),
        prisma.blogPost.findMany({
            where: { published: true },
            orderBy: { publishedAt: "desc" },
            select: { title: true, slug: true, excerpt: true },
        }),
    ]);
    return { categories: categories.filter((c) => c.services.length > 0), projects, posts };
}

function header(): string[] {
    return [
        "# MetasoftCo — Kurumsal Etkinlik Teknolojileri, Yapay Zeka Aktivasyonları ve Kiralama",
        "",
        "> İstanbul Teknokent merkezli etkinlik teknolojisi ve yazılım şirketi. 2020'den bu yana 1.000+ etkinlik, 100+ marka. Yapay zeka fotoğraf, photobooth, interaktif oyun ve AR aktivasyonlarını Türkiye genelinde anahtar teslim kiralar; mikro site, uygulama ve lead toplama (Data-Capture & CRM) yazılımını aynı ekiple geliştirir.",
        "",
        "## Doğrulanmış bilgiler",
        "",
        ...COMPANY_FACTS.map((fact) => `- ${fact}`),
        "",
        "## Şehir referansları",
        "",
        ...CITY_REFERENCES.map((ref) => `- ${ref}`),
        "",
    ];
}

function contact(): string[] {
    return [
        "## İletişim",
        "",
        `- Teklif formu: ${base}/iletisim (etkinlik tarihi, şehir ve katılımcı sayısı ile)`,
        `- E-posta: ${siteConfig.contact.email}`,
        `- Telefon: ${siteConfig.contact.phone}`,
        `- Adres: ${siteConfig.contact.address}`,
        "",
        "## English summary",
        "",
        `MetasoftCo is an event technology and software company based at İstanbul Teknokent, founded in 2020 as a software company. 1,000+ events and 100+ brands. It rents AI photo, photobooth, interactive game and AR activations turnkey across Türkiye (${SERVICE_CITIES.join(", ")}): transport, setup, at least 2 on-site technicians, branded kiosk wrap and interface included; own 5G connectivity, a single 220V socket needed; print activations include 750 prints. The same team builds event micro-sites (delivered in 2 days), apps and the Data-Capture & CRM lead module. Contact: ${siteConfig.contact.email} · ${base}/en`,
        "",
    ];
}

export async function buildLlmsTxt(): Promise<string> {
    const { categories, projects, posts } = await loadCatalogue();
    const lines = header();

    lines.push("## Çözüm sayfaları", "");
    for (const page of SOLUTION_PAGES) lines.push(`- [${page.title}](${base}${page.path}): ${page.note}`);
    lines.push("");

    lines.push("## Kiralık etkinlik ürünleri", "");
    for (const category of categories.filter((c) => c.slug !== SOFTWARE_CATEGORY_SLUG)) {
        lines.push(`### [${category.name}](${base}/hizmetler/${category.slug})`, "");
        for (const service of category.services) {
            const output = OUTPUT_LABEL[toRentalOutput(service.outputType)];
            lines.push(`- [${service.title}](${base}/hizmetler/${category.slug}/${service.slug}) — ${output}. ${plain(service.description, 180)}`.trimEnd());
        }
        lines.push("");
    }

    lines.push("## Projeler", "");
    for (const project of projects) {
        const client = project.client ? ` (${project.client})` : "";
        lines.push(`- [${project.title}](${base}/projeler/${project.slug})${client}`);
    }
    lines.push("");

    lines.push("## Rehber yazıları", "");
    for (const post of posts) lines.push(withNote(`- [${post.title}](${base}/blog/${post.slug})`, plain(post.excerpt, 160)));
    lines.push("");

    lines.push(`Ayrıntılı sürüm (her ürünün teknik özellikleri ve SSS'si): ${base}/llms-full.txt`, "");
    lines.push(...contact());
    return lines.join("\n");
}

export async function buildLlmsFullTxt(): Promise<string> {
    const { categories, projects, posts } = await loadCatalogue();
    const ops = rentalOpsCopy("tr");
    const lines = header();

    lines.push("## Kiralama nasıl işler?", "");
    for (const item of ops.logistics) lines.push(`- ${item.term}: ${item.value}`);
    lines.push(`- ${ops.serviceArea}`, "");

    lines.push("## Çözüm sayfaları", "");
    for (const page of SOLUTION_PAGES) lines.push(`### ${page.title}`, `${base}${page.path}`, page.note, "");
    lines.push("### Etkinlik mikro sitesi — SSS", "");
    for (const item of eventSoftwareHub.faq) lines.push(`**S: ${item.q}**`, `C: ${item.a}`, "");

    for (const category of categories) {
        const isSoftware = category.slug === SOFTWARE_CATEGORY_SLUG;
        lines.push(`## ${category.name}`, `${base}/hizmetler/${category.slug}`, "");
        for (const service of category.services) {
            const output = toRentalOutput(service.outputType);
            lines.push(`### ${service.title}`, `${base}/hizmetler/${category.slug}/${service.slug}`, "");
            const description = plain(service.description || service.content, 600);
            if (description) lines.push(description, "");
            if (!isSoftware) {
                lines.push(`- Çıktı: ${OUTPUT_LABEL[output]}`);
                lines.push(`- Kapsam: ${ops.scope(output).join("; ")}`);
                if (service.dataCapture) lines.push("- Data-Capture & CRM modülü eklenebilir");
            }
            for (const spec of parseList<{ label: string; value: string }>(service.specs)) {
                lines.push(`- ${spec.label}: ${spec.value}`);
            }
            lines.push("");
            for (const item of parseList<{ q: string; a: string }>(service.faq)) {
                lines.push(`**S: ${item.q}**`, `C: ${item.a}`, "");
            }
        }
    }

    lines.push("## Projeler", "");
    for (const project of projects) {
        lines.push(`### ${project.title}`, `${base}/projeler/${project.slug}`);
        if (project.client) lines.push(`Müşteri: ${project.client}`);
        if (project.category) lines.push(`Kategori: ${project.category}`);
        const description = plain(project.description, 400);
        if (description) lines.push(description);
        lines.push("");
    }

    lines.push("## Rehber yazıları", "");
    for (const post of posts) lines.push(withNote(`- [${post.title}](${base}/blog/${post.slug})`, plain(post.excerpt, 240)));
    lines.push("");

    lines.push(
        "## Teknoloji altyapısı",
        "",
        "- Yapay zeka: Stable Diffusion, LoRA fine-tuning, ControlNet, Computer Vision",
        "- AR ve oyun: Unity, WebGL",
        "- Yazılım: Python, Next.js, Node.js, .NET MVC, React Native",
        "",
    );
    lines.push(...contact());
    return lines.join("\n");
}
