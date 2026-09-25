"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useToast } from "@/providers/ToastProvider";
import FaqListEditor, { type FaqItem } from "@/components/editpanel/FaqListEditor";

const RichTextEditor = dynamic(() => import("@/components/editpanel/RichTextEditor"), { ssr: false });

interface ServiceCard { name: string; desc: string; href: string; }

export interface IndustryFormData {
    name: string;
    slug: string;
    title: string;
    heroSubtitle: string;
    intro: string;
    content: string;
    cta: string;
    slug_en: string;
    name_en: string;
    title_en: string;
    intro_en: string;
    content_en: string;
    cta_en: string;
    services: ServiceCard[];
    services_en: ServiceCard[];
    faq: FaqItem[];
    faq_en: FaqItem[];
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    metaTitle_en: string;
    metaDescription_en: string;
    metaKeywords_en: string;
    published: boolean;
    order: number;
}

const EMPTY: IndustryFormData = {
    name: "", slug: "", title: "", heroSubtitle: "", intro: "", content: "", cta: "",
    slug_en: "", name_en: "", title_en: "", intro_en: "", content_en: "", cta_en: "",
    services: [], services_en: [], faq: [], faq_en: [],
    metaTitle: "", metaDescription: "", metaKeywords: "",
    metaTitle_en: "", metaDescription_en: "", metaKeywords_en: "",
    published: false, order: 0,
};

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
        .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
}

const input = "w-full border border-black/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/40";
const textarea = `${input} resize-none`;
const label = "block text-xs font-semibold text-black/60 uppercase tracking-wider mb-2";

function SectionDivider({ lang }: { lang: "TR" | "EN" }) {
    return (
        <div className="flex items-center gap-3 py-2">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded ${lang === "TR" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                {lang}
            </span>
            <div className="h-px flex-1 bg-black/8" />
        </div>
    );
}

export default function IndustryPageForm({ initialData, mode }: { initialData?: Partial<IndustryFormData> & { id?: string }; mode: "new" | "edit" }) {
    const router = useRouter();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<"genel" | "hizmetler" | "sss" | "seo">("genel");
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<IndustryFormData>({ ...EMPTY, ...initialData });

    const set = <K extends keyof IndustryFormData>(field: K, value: IndustryFormData[K]) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleSave = async () => {
        if (!form.name.trim() || !form.slug.trim() || !form.title.trim()) {
            showToast("Sektör adı, slug ve H1 başlık zorunludur.", "error");
            return;
        }
        setSaving(true);
        try {
            const list = <T,>(items: T[]) => (items.length > 0 ? JSON.stringify(items) : null);
            const payload = {
                ...form,
                services: list(form.services.filter((s) => s.name.trim())),
                services_en: list(form.services_en.filter((s) => s.name.trim())),
                faq: list(form.faq.filter((f) => f.q.trim() && f.a.trim())),
                faq_en: list(form.faq_en.filter((f) => f.q.trim() && f.a.trim())),
            };
            const res = await fetch(mode === "edit" ? `/api/industry-pages/${initialData?.id}` : "/api/industry-pages", {
                method: mode === "edit" ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error((await res.json()).error || "Kayıt başarısız");
            showToast(mode === "edit" ? "Sayfa güncellendi." : "Sayfa oluşturuldu.", "success");
            router.push("/editpanel/sektorel-yazilim");
            router.refresh();
        } catch (err) {
            showToast(err instanceof Error ? err.message : "Kayıt başarısız", "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return;
        const res = await fetch(`/api/industry-pages/${initialData?.id}`, { method: "DELETE" });
        if (!res.ok) {
            showToast("Silme işlemi başarısız.", "error");
            return;
        }
        showToast("Sayfa silindi.", "success");
        router.push("/editpanel/sektorel-yazilim");
        router.refresh();
    };

    const tabs = [
        { key: "genel", label: "Genel" },
        { key: "hizmetler", label: `Hizmet Kartları${form.services.length > 0 ? ` (${form.services.length})` : ""}` },
        { key: "sss", label: `SSS${form.faq.length > 0 ? ` (${form.faq.length})` : ""}` },
        { key: "seo", label: "SEO" },
    ] as const;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-black">
                        {mode === "new" ? "Yeni Sektörel Yazılım Sayfası" : "Sayfayı Düzenle"}
                    </h1>
                    {mode === "edit" && initialData?.slug && (
                        <a href={`/sektorel-yazilim-cozumleri/${initialData.slug}`} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-black/40 hover:text-black mt-1 inline-block transition">
                            /sektorel-yazilim-cozumleri/{initialData.slug} ↗
                        </a>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {mode === "edit" && (
                        <button onClick={handleDelete} className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                            Sil
                        </button>
                    )}
                    <button onClick={handleSave} disabled={saving}
                        className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50">
                        {saving ? "Kaydediliyor..." : mode === "edit" ? "Güncelle" : "Oluştur"}
                    </button>
                </div>
            </div>

            <div className="flex gap-1 mb-6 bg-black/5 rounded-xl p-1 w-fit">
                {tabs.map((tab) => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-2 text-sm font-medium rounded-lg transition ${activeTab === tab.key ? "bg-white shadow-sm text-black" : "text-black/50 hover:text-black"}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-black/10 p-8">
                {activeTab === "genel" && (
                    <div className="space-y-5 max-w-3xl">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className={label}>Sektör Adı <span className="text-red-500">*</span></label>
                                <input value={form.name}
                                    onChange={(e) => {
                                        set("name", e.target.value);
                                        if (mode === "new") set("slug", slugify(e.target.value));
                                    }}
                                    placeholder="ör: Sağlık & İlaç" className={input} />
                                <p className="text-xs text-black/30 mt-1">Liste sayfasındaki kartta görünür.</p>
                            </div>
                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className={label}>Sıra</label>
                                    <input type="number" value={form.order}
                                        onChange={(e) => set("order", parseInt(e.target.value) || 0)} className={input} />
                                </div>
                                <div className="pb-1">
                                    <button type="button" onClick={() => set("published", !form.published)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? "bg-black" : "bg-black/20"}`}>
                                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? "translate-x-6" : ""}`} />
                                    </button>
                                    <p className="text-[10px] text-center mt-1 text-black/40">{form.published ? "Yayında" : "Taslak"}</p>
                                </div>
                            </div>
                        </div>

                        <SectionDivider lang="TR" />
                        <div>
                            <label className={label}>TR Slug <span className="text-red-500">*</span></label>
                            <div className="flex items-center border border-black/15 rounded-lg overflow-hidden focus-within:border-black/40">
                                <span className="px-3 py-3 bg-black/[0.03] text-black/40 text-xs border-r border-black/10 whitespace-nowrap">/sektorel-yazilim-cozumleri/</span>
                                <input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="saglik-sektoru"
                                    className="flex-1 px-3 py-3 text-sm focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className={label}>H1 Başlık <span className="text-red-500">*</span></label>
                            <input value={form.title} onChange={(e) => set("title", e.target.value)}
                                placeholder="ör: Sağlık Sektörü İçin Dijital Etkinlik & Yazılım Çözümleri" className={input} />
                        </div>
                        <div>
                            <label className={label}>Giriş Paragrafı</label>
                            <textarea value={form.intro} onChange={(e) => set("intro", e.target.value)} rows={3}
                                placeholder="H1 altında görünen kısa giriş metni..." className={textarea} />
                        </div>
                        <div>
                            <label className={label}>Yaklaşımımız (İçerik)</label>
                            <RichTextEditor value={form.content} onChange={(val) => set("content", val)}
                                placeholder="Sektördeki yaklaşımınızı anlatan paragraflar, başlıklar, listeler..." />
                        </div>
                        <div>
                            <label className={label}>İletişim Metni (CTA)</label>
                            <input value={form.cta} onChange={(e) => set("cta", e.target.value)}
                                placeholder="ör: Sağlık etkinliğiniz için bizimle iletişime geçin" className={input} />
                        </div>
                        <div>
                            <label className={label}>Paylaşım Alt Başlığı</label>
                            <input value={form.heroSubtitle} onChange={(e) => set("heroSubtitle", e.target.value)}
                                placeholder="Sosyal medyada paylaşılınca görselde çıkan kısa cümle" className={input} />
                        </div>

                        <SectionDivider lang="EN" />
                        <p className="text-xs text-black/40 -mt-2">İngilizce sayfa; EN slug, H1 ve giriş paragrafı dolu olduğunda yayına çıkar.</p>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className={label}>EN Slug</label>
                                <input value={form.slug_en} onChange={(e) => set("slug_en", e.target.value)} placeholder="healthcare" className={input} />
                            </div>
                            <div>
                                <label className={label}>Sector Name (EN)</label>
                                <input value={form.name_en} onChange={(e) => set("name_en", e.target.value)} placeholder="Healthcare & Pharma" className={input} />
                            </div>
                        </div>
                        <div>
                            <label className={label}>H1 Heading (EN)</label>
                            <input value={form.title_en} onChange={(e) => set("title_en", e.target.value)} className={input} />
                        </div>
                        <div>
                            <label className={label}>Intro Paragraph (EN)</label>
                            <textarea value={form.intro_en} onChange={(e) => set("intro_en", e.target.value)} rows={3} className={textarea} />
                        </div>
                        <div>
                            <label className={label}>Our Approach (EN)</label>
                            <RichTextEditor value={form.content_en} onChange={(val) => set("content_en", val)} placeholder="Content..." />
                        </div>
                        <div>
                            <label className={label}>Contact Text (EN)</label>
                            <input value={form.cta_en} onChange={(e) => set("cta_en", e.target.value)} className={input} />
                        </div>
                    </div>
                )}

                {activeTab === "hizmetler" && (
                    <div className="max-w-3xl space-y-8">
                        <p className="text-xs text-black/40">
                            Sayfadaki &quot;Sunduğumuz Hizmetler&quot; kartları. Link alanına ör. /hizmetler/yazilim-gelistirme/mobil-uygulama-gelistirme yazabilirsiniz.
                        </p>
                        <SectionDivider lang="TR" />
                        <ServiceListEditor items={form.services} onChange={(items) => set("services", items)} addLabel="+ Kart Ekle" defaultHref="/hizmetler" />
                        <SectionDivider lang="EN" />
                        <ServiceListEditor items={form.services_en} onChange={(items) => set("services_en", items)} addLabel="+ Add Card" defaultHref="/en/services" />
                    </div>
                )}

                {activeTab === "sss" && (
                    <div className="max-w-3xl space-y-8">
                        <p className="text-xs text-black/40">Sayfada görünür ve Google&apos;a FAQ şeması olarak gönderilir.</p>
                        <SectionDivider lang="TR" />
                        <FaqListEditor items={form.faq} onChange={(items) => set("faq", items)} addLabel="+ Soru Ekle" />
                        <SectionDivider lang="EN" />
                        <FaqListEditor items={form.faq_en} onChange={(items) => set("faq_en", items)} addLabel="+ Add Question" />
                    </div>
                )}

                {activeTab === "seo" && (
                    <div className="max-w-3xl space-y-5">
                        <SectionDivider lang="TR" />
                        <SeoFields
                            title={form.metaTitle} description={form.metaDescription} keywords={form.metaKeywords}
                            onTitle={(v) => set("metaTitle", v)} onDescription={(v) => set("metaDescription", v)} onKeywords={(v) => set("metaKeywords", v)}
                        />
                        <SectionDivider lang="EN" />
                        <SeoFields
                            title={form.metaTitle_en} description={form.metaDescription_en} keywords={form.metaKeywords_en}
                            onTitle={(v) => set("metaTitle_en", v)} onDescription={(v) => set("metaDescription_en", v)} onKeywords={(v) => set("metaKeywords_en", v)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function SeoFields({ title, description, keywords, onTitle, onDescription, onKeywords }: {
    title: string; description: string; keywords: string;
    onTitle: (v: string) => void; onDescription: (v: string) => void; onKeywords: (v: string) => void;
}) {
    return (
        <>
            <div>
                <label className={label}>Meta Başlık</label>
                <input value={title} onChange={(e) => onTitle(e.target.value)} className={input} />
                <p className={`text-xs mt-1 ${title.length > 60 ? "text-red-500" : "text-black/30"}`}>{title.length}/60</p>
            </div>
            <div>
                <label className={label}>Meta Açıklama</label>
                <textarea value={description} onChange={(e) => onDescription(e.target.value)} rows={3} className={textarea} />
                <p className={`text-xs mt-1 ${description.length > 160 ? "text-red-500" : "text-black/30"}`}>{description.length}/160</p>
            </div>
            <div>
                <label className={label}>Anahtar Kelimeler (virgülle ayırın)</label>
                <input value={keywords} onChange={(e) => onKeywords(e.target.value)} className={input} />
            </div>
        </>
    );
}

const rowInput = "px-3 py-2 bg-white border-0 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black";

function ServiceListEditor({ items, onChange, addLabel, defaultHref }: {
    items: ServiceCard[]; onChange: (items: ServiceCard[]) => void; addLabel: string; defaultHref: string;
}) {
    const update = (i: number, patch: Partial<ServiceCard>) => onChange(items.map((item, j) => (j === i ? { ...item, ...patch } : item)));
    return (
        <div>
            <div className="flex justify-end mb-3">
                <button type="button" onClick={() => onChange([...items, { name: "", desc: "", href: defaultHref }])}
                    className="text-xs px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition">
                    {addLabel}
                </button>
            </div>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div key={i} className="p-4 bg-[#f5f5f5] rounded-xl space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-black/40 w-4">{i + 1}</span>
                            <input value={item.name} onChange={(e) => update(i, { name: e.target.value })} placeholder="Kart başlığı" className={`flex-1 ${rowInput}`} />
                            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
                                className="text-black/30 hover:text-red-500 transition text-lg leading-none">×</button>
                        </div>
                        <textarea value={item.desc} onChange={(e) => update(i, { desc: e.target.value })} placeholder="Kısa açıklama" rows={2}
                            className={`w-full ml-6 ${rowInput}`} style={{ width: "calc(100% - 1.5rem)" }} />
                        <input value={item.href} onChange={(e) => update(i, { href: e.target.value })} placeholder="/hizmetler/..."
                            className={`w-full ml-6 font-mono ${rowInput}`} style={{ width: "calc(100% - 1.5rem)" }} />
                    </div>
                ))}
                {items.length === 0 && <p className="text-sm text-black/30 text-center py-4">Henüz kart eklenmedi</p>}
            </div>
        </div>
    );
}
