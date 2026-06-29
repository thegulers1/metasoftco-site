"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

interface Project {
    id: string;
    slug: string;
    slug_en: string | null;
    image: string | null;
    title: string;
    title_en: string | null;
    category: string | null;
    description: string | null;
    description_en: string | null;
}

type GroupKey = "ai" | "photobooth" | "interactive";
type FilterKey = "all" | GroupKey;

const PROJECT_CONFIG: {
    slug: string;
    group: GroupKey;
    cat: { tr: string; en: string };
    title: { tr: string; en: string };
    desc: { tr: string; en: string };
    metric: { tr: string; en: string };
    c1: string;
}[] = [
    {
        slug: "defacto-x-afra-saracoglu-ai-fashion-experience",
        group: "ai",
        cat: { tr: "YAPAY ZEKA", en: "AI" },
        title: { tr: "DeFacto × Afra Saraçoğlu", en: "DeFacto × Afra Saraçoğlu" },
        desc: {
            tr: "LoRA fine-tune edilmiş modelimizle katılımcılar Afra Saraçoğlu koleksiyonunu saniyeler içinde üzerlerinde gördü.",
            en: "With our LoRA fine-tuned model, participants saw themselves in the Afra Saraçoğlu collection within seconds.",
        },
        metric: { tr: "Reklam ₺0 · organik erişim ∞", en: "Ad spend ₺0 · organic reach ∞" },
        c1: "#7c3aed",
    },
    {
        slug: "adidas-evo-sl-x-ai-try-on-photo",
        group: "ai",
        cat: { tr: "YAPAY ZEKA", en: "AI" },
        title: { tr: "Adidas EVO SL × AI Try-On", en: "Adidas EVO SL × AI Try-On" },
        desc: {
            tr: "Lansmana özel; ziyaretçiler tek bir fotoğraf karesiyle tüm koleksiyonu dijital olarak üzerlerinde denedi.",
            en: "Built for the launch; visitors tried on the entire collection digitally with a single photo frame.",
        },
        metric: { tr: "Virtual Try-On · canlı lansman", en: "Virtual Try-On · live launch" },
        c1: "#22d3ee",
    },
    {
        slug: "tavuk-dunyasi-x-ai-photo",
        group: "ai",
        cat: { tr: "YAPAY ZEKA", en: "AI" },
        title: { tr: "Tavuk Dünyası × AI Photo", en: "Tavuk Dünyası × AI Photo" },
        desc: {
            tr: "Yapay zeka destekli yüz değiştirme ve fotoğraf deneyimiyle katılımcılara eşsiz bir an sunduk.",
            en: "AI-powered face swap and photo experience delivered a unique moment for every participant.",
        },
        metric: { tr: "AI Face Swap", en: "AI Face Swap" },
        c1: "#a78bfa",
    },
    {
        slug: "pegasus-hava-yollari-x-dijital-hediye-carki-aktivasyonu",
        group: "interactive",
        cat: { tr: "İNTERAKTİF ETKİNLİK", en: "INTERACTIVE EVENT" },
        title: { tr: "Pegasus × Dijital Hediye Çarkı", en: "Pegasus × Digital Gift Wheel" },
        desc: {
            tr: "Markaya özel UI/UX ve ağırlıklı algoritmayla kurgulanan dijital çark; binlerce katılımcıya kişiselleştirilmiş ödül.",
            en: "A digital wheel built with a brand-specific UI/UX and weighted algorithm handed out personalized prizes to thousands of participants.",
        },
        metric: { tr: "Sıfır kesinti · %94 tamamlama", en: "Zero downtime · 94% completion" },
        c1: "#fb923c",
    },
    {
        slug: "akbank-odtu-bogazici-x-fotograf-aktiviteleri",
        group: "photobooth",
        cat: { tr: "FOTOĞRAF AKTİVİTELERİ", en: "PHOTO ACTIVITIES" },
        title: { tr: "Akbank ODTÜ & Boğaziçi", en: "Akbank ODTÜ & Boğaziçi" },
        desc: {
            tr: "İki kampüs, iki şehir, aynı gün. AI photobooth ile öğrenciler anılarını QR ve baskı çıktıya taşıdı.",
            en: "Two campuses, two cities, same day. Students carried their memories to QR codes and prints with the AI photobooth.",
        },
        metric: { tr: "Z kuşağında rekor etkileşim", en: "Record engagement with Gen Z" },
        c1: "#4ade80",
    },
    {
        slug: "defacto-x-momento-ball-photo",
        group: "photobooth",
        cat: { tr: "PHOTOBOOTH", en: "PHOTOBOOTH" },
        title: { tr: "DeFacto × Momento Ball", en: "DeFacto × Momento Ball" },
        desc: {
            tr: "En neşeli anı, anında şık ve şeffaf bir DeFacto hatırasına dönüştüren moda odaklı dairesel fotoğraf aktivasyonu.",
            en: "A fashion-focused circular photo activation that instantly turns the happiest moment into a chic, transparent DeFacto keepsake.",
        },
        metric: { tr: "Fiziksel hatıra · mağaza & etkinlik", en: "Physical keepsake · retail & events" },
        c1: "#e879f9",
    },
    {
        slug: "bud-x-cabin-photo",
        group: "photobooth",
        cat: { tr: "PHOTOBOOTH", en: "PHOTOBOOTH" },
        title: { tr: "BUD × Cabin Photo", en: "BUD × Cabin Photo" },
        desc: {
            tr: "Life Park'ta 2 gün süren özel aktivitede katılımcılar BUD'a özel \"Eğlence Kutusu\" kabininde anlarını ölümsüzleştirdi.",
            en: "Over 2 days at Life Park, participants immortalized their moments in BUD's custom \"Fun Box\" cabin.",
        },
        metric: { tr: "Yüksek kalite baskı + dijital anı", en: "High-quality print + digital memory" },
        c1: "#facc15",
    },
    {
        slug: "garanti-bbva-genc-x-kulupler-bulusmasi",
        group: "photobooth",
        cat: { tr: "PHOTOBOOTH", en: "PHOTOBOOTH" },
        title: { tr: "Garanti BBVA Genç × Kulüpler", en: "Garanti BBVA Genç × Clubs" },
        desc: {
            tr: "Garanti BBVA Genç Kulüpler Buluşması'nda hem eğlendik hem de en hızlı hatıraları biriktirdik.",
            en: "At the Garanti BBVA Genç Clubs Meeting, we had fun and collected the fastest memories.",
        },
        metric: { tr: "Anlık hatıra · kampüs etkinliği", en: "Instant memory · campus event" },
        c1: "#f472b6",
    },
];

const FILTERS: { key: FilterKey; label: { tr: string; en: string } }[] = [
    { key: "all", label: { tr: "Tümü", en: "All" } },
    { key: "ai", label: { tr: "Yapay Zeka", en: "AI" } },
    { key: "photobooth", label: { tr: "Photobooth", en: "Photobooth" } },
    { key: "interactive", label: { tr: "İnteraktif Etkinlik", en: "Interactive Event" } },
];

export default function ProjectsListClient({ projects }: { projects: Project[] }) {
    const { language } = useLanguage();
    const [active, setActive] = useState<FilterKey>("all");

    const bySlug = new Map(projects.map((p) => [p.slug, p]));

    const cards = PROJECT_CONFIG
        .map((c) => ({ ...c, db: bySlug.get(c.slug) }))
        .filter((c) => !!c.db);

    const visible = active === "all" ? cards : cards.filter((c) => c.group === active);

    return (
        <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 pt-2 pb-10">
            <div className="flex items-center justify-between gap-5 flex-wrap py-[18px] mb-[30px] border-t border-white/[0.08]">
                <div className="flex gap-2.5 flex-wrap">
                    {FILTERS.map((f) => {
                        const on = f.key === active;
                        return (
                            <button
                                key={f.key}
                                onClick={() => setActive(f.key)}
                                className="rounded-full transition-all duration-300 px-[18px] py-[10px] text-[13px] font-semibold cursor-pointer"
                                style={{
                                    fontFamily: "var(--font-manrope)",
                                    background: on ? "#fff" : "rgba(255,255,255,.04)",
                                    color: on ? "#0a0a0f" : "rgba(255,255,255,.72)",
                                    border: `1px solid ${on ? "#fff" : "rgba(255,255,255,.14)"}`,
                                }}
                            >
                                {f.label[language]}
                            </button>
                        );
                    })}
                </div>
                <span
                    className="text-[13px] text-[rgba(255,255,255,.4)]"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                >
                    {visible.length} {language === "en" ? "PROJECTS" : "PROJE"}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {visible.map((p) => {
                    const db = p.db!;
                    const href = language === "en" ? `/en/projects/${db.slug_en || db.slug}` : `/projeler/${db.slug}`;

                    return (
                        <Link
                            key={p.slug}
                            href={href}
                            className="group relative flex flex-col rounded-[20px] overflow-hidden border border-white/10 transition-all duration-[.4s] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-3 hover:border-white/30"
                            style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                        >
                            <div className="relative h-[210px]">
                                <img
                                    src={db.image || ""}
                                    alt={p.title[language]}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-[.34]"
                                    style={{ background: `radial-gradient(circle at 72% 20%, ${p.c1}, transparent 64%)` }}
                                />
                                <div
                                    className="absolute left-3.5 top-3.5 rounded-full px-3 py-1.5 backdrop-blur-sm"
                                    style={{
                                        background: "rgba(10,10,15,.62)",
                                        fontFamily: "var(--font-jetbrains-mono)",
                                        fontSize: 11,
                                        fontWeight: 500,
                                        letterSpacing: ".04em",
                                        color: "rgba(255,255,255,.88)",
                                    }}
                                >
                                    {p.cat[language]}
                                </div>
                            </div>
                            <div className="flex flex-col flex-1 px-[22px] pt-[22px] pb-6">
                                <div className="flex items-start justify-between gap-3 mb-2.5">
                                    <div
                                        className="text-white"
                                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 19, lineHeight: 1.2, fontWeight: 600 }}
                                    >
                                        {p.title[language]}
                                    </div>
                                    <span className="text-[17px] font-semibold text-[var(--acc)] shrink-0">→</span>
                                </div>
                                <p
                                    className="text-[rgba(255,255,255,.55)] mb-4"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 13.5, lineHeight: 1.55 }}
                                >
                                    {p.desc[language]}
                                </p>
                                <div
                                    className="mt-auto pt-3.5 border-t border-white/[0.08]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, letterSpacing: ".03em", fontWeight: 500, color: p.c1 }}
                                >
                                    {p.metric[language]}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
