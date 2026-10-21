import { phase2Routes, type Phase2Locale } from "@/lib/phase2";
import { SOFTWARE_CATEGORY_PATH } from "@/lib/software";

/**
 * Copy for the site-wide chrome of the October 2026 redesign: the inner-page
 * navigation, the closing block that doubles as the footer, and the floating
 * actions. The homepage renders its own versions (src/components/home).
 */

type Closing = { lede: string; word: string };
type NavLink = { href: string; label: string };

const tr = {
    nav: [
        { href: phase2Routes.tr.capabilities, label: "KİRALAMA" },
        { href: phase2Routes.tr.products, label: "SATIN ALMA" },
        { href: phase2Routes.tr.work, label: "PROJELER" },
        { href: phase2Routes.tr.about, label: "HAKKIMIZDA" },
        { href: phase2Routes.tr.contact, label: "İLETİŞİM" },
    ] as NavLink[],
    /** Shown in the mobile menu and the footer so these sections stay one click away. */
    more: [
        { href: phase2Routes.tr.insights, label: "Blog" },
        { href: SOFTWARE_CATEGORY_PATH, label: "Yazılım" },
        { href: "/sektorel-cozumler", label: "Sektörel Çözümler" },
        { href: "/sektorel-yazilim-cozumleri", label: "Sektörel Yazılım" },
        { href: "/sunum", label: "Sunum 2026" },
    ] as NavLink[],
    navAria: "Ana menü",
    skipLink: "İçeriğe geç",
    homeAria: "MetasoftCo anasayfa",
    menuOpen: "Menüyü aç",
    menuClose: "Menüyü kapat",
    menuLabel: "MENÜ",
    quote: "TEKLİF AL ↗",
    localeAria: { tr: "Türkçe", en: "English" },
    cursor: { go: "GİT", write: "YAZ", home: "ANA SAYFA", ask: "SOR" },
    closingKicker: "SIRADAKİ DENEYİM",
    labels: { email: "E-POSTA", phone: "TELEFON", address: "ADRES", follow: "TAKİP EDİN", explore: "KEŞFET" },
    address: "İstanbul Teknokent No: 37/1, İç Kapı No: 28, Avcılar / İstanbul",
    legal: [
        { href: "/gizlilik", label: "GİZLİLİK POLİTİKASI" },
        { href: "/kullanim-kosullari", label: "KULLANIM KOŞULLARI" },
    ],
    baseline: "FİKİR · YAZILIM · FİZİKSEL ÜRETİM · SAHA OPERASYONU",
    whatsappText: "Merhaba, bilgi almak istiyorum.",
    ai: "✶ METASOFT AI'YA SOR",
    closing: {
        serviceDetail: { lede: "Bu hizmeti etkinliğinize uyarlayalım.", word: "Uyarlayalım." },
        services: { lede: "Fikrinizi canlı bir deneyime dönüştürelim.", word: "Planlayalım." },
        products: { lede: "Sisteminizi markanıza göre kuralım.", word: "Kuralım." },
        work: { lede: "Sıradaki etkinliğinizi katılım odaklı bir deneyime dönüştürelim.", word: "Sıradaki sizsiniz." },
        insights: { lede: "Anlatmaya değer bir projeniz mi var?", word: "Anlatın." },
        about: { lede: "İhtiyacı siz anlatın. Deneyimi biz hayata geçirelim.", word: "Tanışalım." },
        contact: { lede: "Sıradaki canlı an burada başlıyor.", word: "Başlayalım." },
        fallback: { lede: "Sıradaki etkinliğinizi insanların katılmak isteyeceği bir deneyime dönüştürelim.", word: "Konuşalım." },
    } satisfies Record<string, Closing>,
};

export type MsChromeCopy = typeof tr;

const en: MsChromeCopy = {
    nav: [
        { href: phase2Routes.en.capabilities, label: "RENTAL" },
        { href: phase2Routes.en.products, label: "BUY" },
        { href: phase2Routes.en.work, label: "WORK" },
        { href: phase2Routes.en.about, label: "ABOUT" },
        { href: phase2Routes.en.contact, label: "CONTACT" },
    ],
    more: [
        { href: phase2Routes.en.insights, label: "Insights" },
        { href: "/en/services/software-development", label: "Software" },
        { href: "/en/sector-solutions", label: "Sector Solutions" },
        { href: "/en/industry-software-solutions", label: "Industry Software" },
    ],
    navAria: "Main menu",
    skipLink: "Skip to content",
    homeAria: "MetasoftCo home",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menuLabel: "MENU",
    quote: "GET A QUOTE ↗",
    localeAria: tr.localeAria,
    cursor: { go: "GO", write: "WRITE", home: "HOME", ask: "ASK" },
    closingKicker: "YOUR NEXT EXPERIENCE",
    labels: { email: "EMAIL", phone: "PHONE", address: "ADDRESS", follow: "FOLLOW", explore: "EXPLORE" },
    address: "İstanbul Teknokent No: 37/1, İç Kapı No: 28, Avcılar / Istanbul",
    legal: [
        { href: "/gizlilik", label: "PRIVACY POLICY (TR)" },
        { href: "/kullanim-kosullari", label: "TERMS OF USE (TR)" },
    ],
    baseline: "IDEA · SOFTWARE · PHYSICAL BUILD · FIELD OPERATIONS",
    whatsappText: "Hello, I would like some information.",
    ai: "✶ ASK METASOFT AI",
    closing: {
        serviceDetail: { lede: "Let's tailor this service to your event.", word: "Let's tailor it." },
        services: { lede: "Let's turn your idea into a live experience.", word: "Let's plan." },
        products: { lede: "Let's set the system up around your brand.", word: "Let's build." },
        work: { lede: "Let's turn your next event into an experience built on participation.", word: "You're next." },
        insights: { lede: "Have a project worth telling?", word: "Tell us." },
        about: { lede: "You tell us the need. We bring the experience to life.", word: "Let's meet." },
        contact: { lede: "The next live moment starts here.", word: "Let's start." },
        fallback: { lede: "Let's turn your next event into an experience people want to be part of.", word: "Let's talk." },
    },
};

export function msChromeCopy(locale: Phase2Locale): MsChromeCopy {
    return locale === "en" ? en : tr;
}

/** Picks the closing headline for a path; the most specific section wins. */
export function msClosingFor(pathname: string, locale: Phase2Locale): Closing {
    const c = msChromeCopy(locale).closing;
    const p = pathname.replace(/\/$/, "") || "/";
    const r = phase2Routes[locale];
    const under = (base: string) => p === base || p.startsWith(`${base}/`);
    if (under(r.capabilities)) {
        const depth = p.slice(r.capabilities.length).split("/").filter(Boolean).length;
        return depth >= 2 ? c.serviceDetail : c.services;
    }
    if (under(r.products)) return p === r.products ? c.products : c.serviceDetail;
    if (under(r.work)) return c.work;
    if (under(r.insights)) return c.insights;
    if (p === r.about) return c.about;
    if (p === r.contact) return c.contact;
    return c.fallback;
}
