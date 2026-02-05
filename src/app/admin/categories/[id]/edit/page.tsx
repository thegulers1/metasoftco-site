"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function EditCategoryPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        order: 0,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        // English
        name_en: "",
        metaTitle_en: "",
        metaDescription_en: "",
    });

    useEffect(() => {
        async function fetchCategory() {
            try {
                const res = await fetch(`/api/services/categories/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        name: data.name || "",
                        slug: data.slug || "",
                        order: data.order || 0,
                        metaTitle: data.metaTitle || "",
                        metaDescription: data.metaDescription || "",
                        metaKeywords: data.metaKeywords || "",
                        name_en: data.name_en || "",
                        metaTitle_en: data.metaTitle_en || "",
                        metaDescription_en: data.metaDescription_en || "",
                    });
                } else {
                    alert("Kategori bulunamadı");
                    router.push("/admin/categories");
                }
            } catch (error) {
                console.error("Error fetching category:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCategory();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/services/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin/categories");
            } else {
                console.error("Failed to update category");
                alert("Kategori güncellenemedi.");
            }
        } catch (error) {
            console.error("Error updating category:", error);
            alert("Bir hata oluştu.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Yükleniyor...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-black mb-8">Kategoriyi Düzenle</h1>

            <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-medium text-black/70 mb-2">
                        Kategori Adı (Türkçe)
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-black/70 mb-2">
                        Kategori Adı (İngilizce)
                    </label>
                    <input
                        type="text"
                        value={formData.name_en}
                        onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                        className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-black/70 mb-2">
                            Slug
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-black/70 mb-2">
                            Sıra
                        </label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                </div>

                <div className="border-t border-black/5 pt-6 mt-6">
                    <h2 className="text-lg font-bold text-black mb-4">SEO Ayarları</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Başlık (TR)
                            </label>
                            <input
                                type="text"
                                value={formData.metaTitle}
                                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                placeholder={formData.name}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Başlık (EN)
                            </label>
                            <input
                                type="text"
                                value={formData.metaTitle_en}
                                onChange={(e) => setFormData({ ...formData, metaTitle_en: e.target.value })}
                                placeholder={formData.name_en}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Açıklama (TR)
                            </label>
                            <textarea
                                value={formData.metaDescription}
                                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Açıklama (EN)
                            </label>
                            <textarea
                                value={formData.metaDescription_en}
                                onChange={(e) => setFormData({ ...formData, metaDescription_en: e.target.value })}
                                rows={2}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Anahtar Kelimeler
                            </label>
                            <input
                                type="text"
                                value={formData.metaKeywords}
                                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50"
                    >
                        {saving ? "Kaydet" : "Kategoriyi Güncelle"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 bg-black/5 text-black font-medium rounded-lg hover:bg-black/10 transition"
                    >
                        İptal
                    </button>
                </div>
            </form>
        </div>
    );
}
