"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/editpanel/ImageUpload";
import { useToast } from "@/providers/ToastProvider";

interface ServiceOption {
    id: string;
    title: string;
    title_en: string | null;
    slug: string;
    image: string | null;
    category: { name: string; slug: string } | null;
}

const RichTextEditor = dynamic(() => import("@/components/editpanel/RichTextEditor"), { ssr: false });

interface SectorImage { url: string; alt: string; }

interface FormData {
    title: string;
    slug: string;
    h1: string;
    excerpt: string;
    content: string;
    // EN
    slug_en: string;
    h1_en: string;
    excerpt_en: string;
    content_en: string;
    // Media
    images: SectorImage[];
    published: boolean;
    order: number;
    // SEO TR
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogImage: string;
    // SEO EN
    metaTitle_en: string;
    metaDescription_en: string;
    metaKeywords_en: string;
    // Schema
    customSchema: string;
    // Önerilen Hizmetler
    serviceIds: string[];
}

interface SectorPageFormProps {
    initialData?: Partial<FormData> & { id?: string };
    mode: "new" | "edit";
}

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

const EMPTY: FormData = {
    title: "", slug: "", h1: "", excerpt: "", content: "",
    slug_en: "", h1_en: "", excerpt_en: "", content_en: "",
    images: [], published: false, order: 0,
    metaTitle: "", metaDescription: "", metaKeywords: "", ogImage: "",
    metaTitle_en: "", metaDescription_en: "", metaKeywords_en: "",
    customSchema: "",
    serviceIds: [],
};

export default function SectorPageForm({ initialData, mode }: SectorPageFormProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<"genel" | "medya" | "hizmetler" | "seo">("genel");
    const [saving, setSaving] = useState(false);
    const [allServices, setAllServices] = useState<ServiceOption[]>([]);
    const [serviceSearch, setServiceSearch] = useState("");

    const [form, setForm] = useState<FormData>({ ...EMPTY, ...initialData });

    useEffect(() => {
        fetch("/api/services")
            .then((r) => r.json())
            .then((data) => {
                // API kategoriler + services döndürüyor, flatten edelim
                const services: ServiceOption[] = [];
                if (Array.isArray(data)) {
                    data.forEach((cat: any) => {
                        if (cat.services) {
                            cat.services.forEach((s: any) => services.push({ ...s, category: { name: cat.name, slug: cat.slug } }));
                        }
                    });
                }
                setAllServices(services);
            })
            .catch(() => {});
    }, []);

    const set = (field: keyof FormData, value: any) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const handleTitleChange = (val: string) => {
        set("title", val);
        if (mode === "new") set("slug", slugify(val));
    };

    const addImage = (url: string) => {
        if (!url) return;
        set("images", [...form.images, { url, alt: "" }]);
    };

    const updateAlt = (index: number, alt: string) => {
        set("images", form.images.map((img, i) => i === index ? { ...img, alt } : img));
    };

    const removeImage = (index: number) => {
        set("images", form.images.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.slug.trim()) {
            showToast("Başlık ve slug alanları zorunludur.", "error");
            return;
        }
        setSaving(true);
        try {
            const payload = {
                ...form,
                images: form.images.length > 0 ? JSON.stringify(form.images) : null,
                slug_en: form.slug_en || null,
                serviceIds: form.serviceIds.length > 0 ? JSON.stringify(form.serviceIds) : null,
            };
            const url = mode === "edit" ? `/api/sector-pages/${initialData?.id}` : "/api/sector-pages";
            const res = await fetch(url, {
                method: mode === "edit" ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Kayıt başarısız");
            }
            showToast(mode === "edit" ? "Sayfa güncellendi." : "Sayfa oluşturuldu.", "success");
            router.push("/editpanel/sektorel-cozumler");
            router.refresh();
        } catch (err: any) {
            showToast(err.message, "error");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return;
        try {
            await fetch(`/api/sector-pages/${initialData?.id}`, { method: "DELETE" });
            showToast("Sayfa silindi.", "success");
            router.push("/editpanel/sektorel-cozumler");
            router.refresh();
        } catch {
            showToast("Silme işlemi başarısız.", "error");
        }
    };

    const toggleService = (id: string) => {
        set("serviceIds", form.serviceIds.includes(id)
            ? form.serviceIds.filter((s) => s !== id)
            : [...form.serviceIds, id]
        );
    };

    const selectedServices = allServices.filter((s) => form.serviceIds.includes(s.id));
    const filteredServices = allServices.filter((s) =>
        !form.serviceIds.includes(s.id) &&
        (s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
            (s.title_en || "").toLowerCase().includes(serviceSearch.toLowerCase()) ||
            (s.category?.name || "").toLowerCase().includes(serviceSearch.toLowerCase()))
    );

    const tabs = [
        { key: "genel", label: "Genel" },
        { key: "medya", label: "Medya" },
        { key: "hizmetler", label: `Hizmetler${form.serviceIds.length > 0 ? ` (${form.serviceIds.length})` : ""}` },
        { key: "seo", label: "SEO" },
    ] as const;

    // Ortak input stilleri
    const input = "w-full border border-black/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/40";
    const textarea = "w-full border border-black/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/40 resize-none";
    const label = "block text-xs font-semibold text-black/60 uppercase tracking-wider mb-2";

    // Bölüm başlığı: TR veya EN
    const SectionDivider = ({ lang }: { lang: "TR" | "EN" }) => (
        <div className="flex items-center gap-3 py-2">
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded ${lang === "TR" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                {lang}
            </span>
            <div className="h-px flex-1 bg-black/8" />
        </div>
    );

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-black">
                        {mode === "new" ? "Yeni Sektörel Çözüm Sayfası" : "Sayfayı Düzenle"}
                    </h1>
                    {mode === "edit" && initialData?.slug && (
                        <a href={`/sektorel-cozumler/${initialData.slug}`} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-black/40 hover:text-black mt-1 inline-block transition">
                            /sektorel-cozumler/{initialData.slug} ↗
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

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-black/5 rounded-xl p-1 w-fit">
                {tabs.map((tab) => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-2 text-sm font-medium rounded-lg transition ${activeTab === tab.key ? "bg-white shadow-sm text-black" : "text-black/50 hover:text-black"}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-black/10 p-8">

                {/* ── GENEL ── */}
                {activeTab === "genel" && (
                    <div className="space-y-5 max-w-3xl">

                        {/* Admin başlık + yayın + sıra */}
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className={label}>Admin Başlığı <span className="text-red-500">*</span></label>
                                <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
                                    placeholder="ör: Maraton & Spor Etkinlikleri" className={input} />
                            </div>
                            <div className="flex items-end gap-4">
                                <div className="flex-1">
                                    <label className={label}>Sıra</label>
                                    <input type="number" value={form.order}
                                        onChange={(e) => set("order", parseInt(e.target.value) || 0)}
                                        className="w-full border border-black/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/40" />
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

                        {/* ── TR ── */}
                        <SectionDivider lang="TR" />

                        <div>
                            <label className={label}>TR Slug <span className="text-red-500">*</span></label>
                            <div className="flex items-center border border-black/15 rounded-lg overflow-hidden focus-within:border-black/40">
                                <span className="px-3 py-3 bg-black/[0.03] text-black/40 text-xs border-r border-black/10 whitespace-nowrap">/sektorel-cozumler/</span>
                                <input value={form.slug} onChange={(e) => set("slug", e.target.value)}
                                    placeholder="maraton-ve-spor-etkinlikleri" className="flex-1 px-3 py-3 text-sm focus:outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className={label}>H1 Başlık (TR)</label>
                            <input value={form.h1} onChange={(e) => set("h1", e.target.value)}
                                placeholder="ör: Maraton ve Spor Organizasyonları İçin İnteraktif Yapay Zeka Aktiviteleri" className={input} />
                        </div>

                        <div>
                            <label className={label}>Giriş Paragrafı (TR)</label>
                            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)}
                                rows={3} placeholder="H1 altında görünecek kısa giriş metni..." className={textarea} />
                        </div>

                        <div>
                            <label className={label}>İçerik / WYSIWYG (TR)</label>
                            <RichTextEditor value={form.content} onChange={(val) => set("content", val)}
                                placeholder="H2, H3 başlıklar ve detaylı içerik buraya..." />
                        </div>

                        {/* ── EN ── */}
                        <SectionDivider lang="EN" />

                        <div>
                            <label className={label}>EN Slug</label>
                            <div className="flex items-center border border-black/15 rounded-lg overflow-hidden focus-within:border-black/40">
                                <span className="px-3 py-3 bg-black/[0.03] text-black/40 text-xs border-r border-black/10 whitespace-nowrap">/en/sector-solutions/</span>
                                <input value={form.slug_en} onChange={(e) => set("slug_en", e.target.value)}
                                    placeholder="marathon-and-sports-events" className="flex-1 px-3 py-3 text-sm focus:outline-none" />
                            </div>
                        </div>

                        <div>
                            <label className={label}>H1 Heading (EN)</label>
                            <input value={form.h1_en} onChange={(e) => set("h1_en", e.target.value)}
                                placeholder="ör: Interactive AI Activities for Marathon & Sports Events" className={input} />
                        </div>

                        <div>
                            <label className={label}>Intro Paragraph (EN)</label>
                            <textarea value={form.excerpt_en} onChange={(e) => set("excerpt_en", e.target.value)}
                                rows={3} placeholder="Short intro text shown below H1..." className={textarea} />
                        </div>

                        <div>
                            <label className={label}>Content / WYSIWYG (EN)</label>
                            <RichTextEditor value={form.content_en} onChange={(val) => set("content_en", val)}
                                placeholder="H2, H3 headings and detailed content here..." />
                        </div>
                    </div>
                )}

                {/* ── MEDYA ── */}
                {activeTab === "medya" && (
                    <div className="max-w-3xl space-y-8">
                        <div>
                            <label className={label}>Görsel Ekle</label>
                            <ImageUpload value="" onChange={(url) => addImage(url)} folder="sector-pages" />
                            <p className="text-xs text-black/30 mt-2">Cloudinary'e yüklenir, WebP dönüşümü otomatiktir.</p>
                        </div>

                        {form.images.length > 0 && (
                            <div>
                                <label className={label}>Yüklenen Görseller ({form.images.length})</label>
                                <div className="space-y-4">
                                    {form.images.map((img, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 border border-black/10 rounded-xl bg-black/[0.01]">
                                            <div className="flex-none w-24 h-20 rounded-lg overflow-hidden bg-black/5">
                                                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <label className="block text-xs text-black/40 mb-1.5 uppercase tracking-wider">Alt Text (SEO)</label>
                                                <input value={img.alt} onChange={(e) => updateAlt(i, e.target.value)}
                                                    placeholder="ör: Maraton finişinde AI fotoğraf istasyonu"
                                                    className="w-full border border-black/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black/40" />
                                                <p className="text-xs text-black/25 mt-1 truncate font-mono">{img.url}</p>
                                            </div>
                                            <button onClick={() => removeImage(i)} className="flex-none p-2 text-black/30 hover:text-red-500 transition">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* ── HİZMETLER ── */}
                {activeTab === "hizmetler" && (
                    <div className="max-w-3xl space-y-6">

                        {/* Seçili hizmetler */}
                        {selectedServices.length > 0 && (
                            <div>
                                <label className={label}>Seçilen Hizmetler ({selectedServices.length})</label>
                                <div className="space-y-2">
                                    {selectedServices.map((s) => (
                                        <div key={s.id} className="flex items-center gap-3 p-3 bg-black/[0.02] border border-black/10 rounded-lg">
                                            {s.image && (
                                                <img src={s.image} alt={s.title} className="w-12 h-10 object-cover rounded flex-none" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-black truncate">{s.title}</p>
                                                {s.category && <p className="text-xs text-black/40 uppercase tracking-widest">{s.category.name}</p>}
                                            </div>
                                            <button onClick={() => toggleService(s.id)} className="flex-none text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition">
                                                Çıkar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Arama + tüm hizmetler */}
                        <div>
                            <label className={label}>Hizmet Ekle</label>
                            <input
                                value={serviceSearch}
                                onChange={(e) => setServiceSearch(e.target.value)}
                                placeholder="Hizmet adı veya kategori ile ara..."
                                className="w-full border border-black/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/40 mb-3"
                            />
                            {allServices.length === 0 ? (
                                <p className="text-sm text-black/40 py-4 text-center">Hizmetler yükleniyor...</p>
                            ) : filteredServices.length === 0 ? (
                                <p className="text-sm text-black/40 py-4 text-center">Sonuç bulunamadı.</p>
                            ) : (
                                <div className="border border-black/10 rounded-xl overflow-hidden divide-y divide-black/5 max-h-[420px] overflow-y-auto">
                                    {filteredServices.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => toggleService(s.id)}
                                            className="w-full flex items-center gap-3 p-3 hover:bg-black/[0.03] transition text-left"
                                        >
                                            {s.image ? (
                                                <img src={s.image} alt={s.title} className="w-12 h-10 object-cover rounded flex-none" />
                                            ) : (
                                                <div className="w-12 h-10 bg-black/10 rounded flex-none flex items-center justify-center text-black/30 text-xs font-bold">
                                                    {s.title.charAt(0)}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-black truncate">{s.title}</p>
                                                {s.category && <p className="text-xs text-black/40 uppercase tracking-widest">{s.category.name}</p>}
                                            </div>
                                            <span className="flex-none w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-lg leading-none">+</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* ── SEO ── */}
                {activeTab === "seo" && (
                    <div className="max-w-3xl space-y-5">

                        <SectionDivider lang="TR" />

                        <div>
                            <label className={label}>Meta Başlık / Title (TR)</label>
                            <input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)}
                                placeholder="ör: Maraton Aktiviteleri | MetasoftCo" className={input} />
                            <p className={`text-xs mt-1 ${form.metaTitle.length > 60 ? "text-red-500" : "text-black/30"}`}>{form.metaTitle.length}/60</p>
                        </div>

                        <div>
                            <label className={label}>Meta Açıklama / Description (TR)</label>
                            <textarea value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)}
                                rows={3} placeholder="Arama sonuçlarında görünecek açıklama..." className={textarea} />
                            <p className={`text-xs mt-1 ${form.metaDescription.length > 160 ? "text-red-500" : "text-black/30"}`}>{form.metaDescription.length}/160</p>
                        </div>

                        <div>
                            <label className={label}>Anahtar Kelimeler (TR)</label>
                            <input value={form.metaKeywords} onChange={(e) => set("metaKeywords", e.target.value)}
                                placeholder="maraton aktivite, spor etkinliği, AI fotoğraf..." className={input} />
                        </div>

                        <SectionDivider lang="EN" />

                        <div>
                            <label className={label}>Meta Title (EN)</label>
                            <input value={form.metaTitle_en} onChange={(e) => set("metaTitle_en", e.target.value)}
                                placeholder="ör: Marathon Activities | MetasoftCo" className={input} />
                            <p className={`text-xs mt-1 ${form.metaTitle_en.length > 60 ? "text-red-500" : "text-black/30"}`}>{form.metaTitle_en.length}/60</p>
                        </div>

                        <div>
                            <label className={label}>Meta Description (EN)</label>
                            <textarea value={form.metaDescription_en} onChange={(e) => set("metaDescription_en", e.target.value)}
                                rows={3} placeholder="Description shown in search results..." className={textarea} />
                            <p className={`text-xs mt-1 ${form.metaDescription_en.length > 160 ? "text-red-500" : "text-black/30"}`}>{form.metaDescription_en.length}/160</p>
                        </div>

                        <div>
                            <label className={label}>Meta Keywords (EN)</label>
                            <input value={form.metaKeywords_en} onChange={(e) => set("metaKeywords_en", e.target.value)}
                                placeholder="marathon activity, sports event, AI photo..." className={input} />
                        </div>

                        <div className="pt-2">
                            <label className={label}>OG Image URL</label>
                            <input value={form.ogImage} onChange={(e) => set("ogImage", e.target.value)}
                                placeholder="https://res.cloudinary.com/..." className={`${input} font-mono`} />
                            <p className="text-xs text-black/30 mt-1">TR ve EN için ortak kullanılır.</p>
                        </div>

                        <div>
                            <label className={label}>Özel Schema (JSON-LD)</label>
                            <textarea value={form.customSchema} onChange={(e) => set("customSchema", e.target.value)}
                                rows={10} placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "Service",\n  ...\n}'}
                                className="w-full border border-black/15 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-black/40 resize-y bg-[#fafafa]"
                                spellCheck={false} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
