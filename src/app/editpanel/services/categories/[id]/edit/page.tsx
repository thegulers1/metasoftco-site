"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useToast } from "@/providers/ToastProvider";
import RichTextEditor from "@/components/editpanel/RichTextEditor";

export const dynamic = "force-dynamic";

interface FaqItem {
    q: string;
    a: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    order: number;
    heroTitle: string | null;
    heroContent: string | null;
    content: string | null;
    content_en: string | null;
    faq: string | null;
    faq_en: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    name_en: string | null;
    metaTitle_en: string | null;
    metaDescription_en: string | null;
    metaKeywords_en: string | null;
}

function parseFaq(raw: string | null): FaqItem[] {
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function FaqListEditor({ items, onChange, addLabel, qPlaceholder, aPlaceholder }: {
    items: FaqItem[];
    onChange: (items: FaqItem[]) => void;
    addLabel: string;
    qPlaceholder: string;
    aPlaceholder: string;
}) {
    return (
        <div>
            <div className="flex items-center justify-end mb-3">
                <button type="button" onClick={() => onChange([...items, { q: "", a: "" }])}
                    className="text-xs px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition">
                    {addLabel}
                </button>
            </div>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div key={i} className="p-4 bg-black/[0.03] rounded-xl space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-black/40 w-4">{i + 1}</span>
                            <input type="text" value={item.q}
                                onChange={(e) => {
                                    const updated = [...items];
                                    updated[i] = { ...updated[i], q: e.target.value };
                                    onChange(updated);
                                }}
                                placeholder={qPlaceholder}
                                className="flex-1 px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30" />
                            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
                                className="text-black/30 hover:text-red-500 transition text-lg leading-none">
                                ×
                            </button>
                        </div>
                        <textarea value={item.a}
                            onChange={(e) => {
                                const updated = [...items];
                                updated[i] = { ...updated[i], a: e.target.value };
                                onChange(updated);
                            }}
                            placeholder={aPlaceholder} rows={2}
                            className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 ml-6" />
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-sm text-black/30 text-center py-4">Henüz soru eklenmedi</p>
                )}
            </div>
        </div>
    );
}

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { showToast } = useToast();
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "content" | "seo">("general");

    useEffect(() => {
        fetch(`/api/services/categories/${id}`)
            .then((r) => r.json())
            .then((data) => { setCategory(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id]);

    async function handleSave() {
        if (!category) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/services/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(category),
            });
            if (res.ok) {
                showToast("Kategori güncellendi", "success");
            } else {
                const errorText = await res.text();
                console.error("Failed to update category:", errorText);
                let message = "Güncelleme başarısız";
                try {
                    message = JSON.parse(errorText).error || message;
                } catch { }
                showToast(message, "error");
            }
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-8 text-black/40">Yükleniyor...</div>;
    if (!category) return <div className="p-8 text-red-500">Kategori bulunamadı</div>;

    const tabs = [
        { id: "general" as const, label: "Genel" },
        { id: "content" as const, label: "İçerik & SSS" },
        { id: "seo" as const, label: "SEO" },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <button
                        onClick={() => router.back()}
                        className="text-xs text-black/40 hover:text-black transition mb-2 flex items-center gap-1"
                    >
                        ← Geri
                    </button>
                    <h1 className="text-2xl font-bold text-black">Kategori Düzenle</h1>
                    <p className="text-sm text-black/40 mt-1">{category.name}</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50"
                >
                    {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-black/5 p-1 rounded-xl w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-5 py-2 text-sm font-medium rounded-lg transition ${
                            activeTab === tab.id
                                ? "bg-white text-black shadow-sm"
                                : "text-black/50 hover:text-black"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {activeTab === "general" && (
                    <>
                        {/* Temel Bilgiler */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-black mb-4">Temel Bilgiler</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                        Kategori Adı
                                    </label>
                                    <input
                                        type="text"
                                        value={category.name}
                                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                        Slug (URL)
                                    </label>
                                    <input
                                        type="text"
                                        value={category.slug}
                                        onChange={(e) => setCategory({ ...category, slug: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm font-mono focus:outline-none focus:border-black/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                        Sıra
                                    </label>
                                    <input
                                        type="number"
                                        value={category.order}
                                        onChange={(e) => setCategory({ ...category, order: Number(e.target.value) })}
                                        className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                        Kategori Adı (İngilizce)
                                    </label>
                                    <input
                                        type="text"
                                        value={category.name_en || ""}
                                        onChange={(e) => setCategory({ ...category, name_en: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hub Sayfası İçerik */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-black mb-1">Hub Sayfası İçeriği</h2>
                            <p className="text-xs text-black/40 mb-4">
                                Bu içerik <code className="bg-black/5 px-1 rounded">/hizmetler/{category.slug}</code> adresindeki kategori sayfasında görünür.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                        H1 Başlık
                                    </label>
                                    <input
                                        type="text"
                                        value={category.heroTitle || ""}
                                        onChange={(e) => setCategory({ ...category, heroTitle: e.target.value })}
                                        placeholder={category.name}
                                        className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                        Açıklama Metni (SEO Paragraf)
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={category.heroContent || ""}
                                        onChange={(e) => setCategory({ ...category, heroContent: e.target.value })}
                                        placeholder="Kategori hakkında açıklayıcı SEO metni..."
                                        className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "content" && (
                    <>
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-black mb-1">Uzun İçerik (Nedir / Neden / Popüler Türler)</h2>
                            <p className="text-xs text-black/40 mb-4">
                                H2/H3 alt başlıklar ve listeler kullanarak bu kategori hakkında ansiklopedik bir metin yazın —
                                servis listesinin <strong>üzerinde</strong> gösterilir ve arama motorlarının / AI özetlerinin
                                doğrudan alıntılayabileceği yapıyı sağlar.
                            </p>
                            <RichTextEditor
                                value={category.content || ""}
                                onChange={(value) => setCategory((prev) => (prev ? { ...prev, content: value } : prev))}
                                placeholder="Örn: İnteraktif Etkinlik Nedir? ... Popüler Aktivite Türleri ..."
                            />
                            <div className="border-t border-black/5 mt-6 pt-4">
                                <h3 className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-3">İngilizce içerik</h3>
                                <RichTextEditor
                                    value={category.content_en || ""}
                                    onChange={(value) => setCategory((prev) => (prev ? { ...prev, content_en: value } : prev))}
                                    placeholder="English long-form content..."
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-black mb-1">Sıkça Sorulan Sorular</h2>
                            <p className="text-xs text-black/40 mb-4">
                                Bu sorular hem sayfada görünür hem de Google&apos;ın FAQPage yapılandırılmış verisine (schema)
                                dahil edilir.
                            </p>
                            <FaqListEditor
                                items={parseFaq(category.faq)}
                                onChange={(items) =>
                                    setCategory((prev) =>
                                        prev ? { ...prev, faq: items.length ? JSON.stringify(items) : null } : prev
                                    )
                                }
                                addLabel="+ Soru Ekle"
                                qPlaceholder="Soru"
                                aPlaceholder="Cevap"
                            />
                            <div className="border-t border-black/5 mt-6 pt-4">
                                <h3 className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-3">İngilizce SSS</h3>
                                <FaqListEditor
                                    items={parseFaq(category.faq_en)}
                                    onChange={(items) =>
                                        setCategory((prev) =>
                                            prev ? { ...prev, faq_en: items.length ? JSON.stringify(items) : null } : prev
                                        )
                                    }
                                    addLabel="+ Add Question"
                                    qPlaceholder="Question"
                                    aPlaceholder="Answer"
                                />
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "seo" && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-sm font-semibold text-black mb-4">SEO Ayarları</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                    Meta Başlık
                                </label>
                                <input
                                    type="text"
                                    value={category.metaTitle || ""}
                                    onChange={(e) => setCategory({ ...category, metaTitle: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                    Meta Açıklama
                                </label>
                                <textarea
                                    rows={3}
                                    value={category.metaDescription || ""}
                                    onChange={(e) => setCategory({ ...category, metaDescription: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                    Anahtar Kelimeler
                                </label>
                                <input
                                    type="text"
                                    value={category.metaKeywords || ""}
                                    onChange={(e) => setCategory({ ...category, metaKeywords: e.target.value })}
                                    placeholder="kelime1, kelime2, kelime3"
                                    className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
                                />
                            </div>
                            <div className="border-t border-black/5 pt-4">
                                <h3 className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-3">İngilizce SEO</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                            Meta Başlık (EN)
                                        </label>
                                        <input
                                            type="text"
                                            value={category.metaTitle_en || ""}
                                            onChange={(e) => setCategory({ ...category, metaTitle_en: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                            Meta Açıklama (EN)
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={category.metaDescription_en || ""}
                                            onChange={(e) => setCategory({ ...category, metaDescription_en: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-black/60 mb-1.5 uppercase tracking-wider">
                                            Anahtar Kelimeler (EN)
                                        </label>
                                        <input
                                            type="text"
                                            value={category.metaKeywords_en || ""}
                                            onChange={(e) => setCategory({ ...category, metaKeywords_en: e.target.value })}
                                            placeholder="keyword1, keyword2, keyword3"
                                            className="w-full px-4 py-2.5 bg-black/[0.03] border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
