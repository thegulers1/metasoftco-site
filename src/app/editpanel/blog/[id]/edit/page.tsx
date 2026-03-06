"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/editpanel/ImageUpload";
import RichTextEditor from "@/components/editpanel/RichTextEditor";

export const dynamic = 'force-dynamic';

interface BlogFormData {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string | null;
    category: string;
    author: string;
    published: boolean;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogImage: string | null;
    title_en: string;
    excerpt_en: string;
    content_en: string;
    metaTitle_en: string;
    metaDescription_en: string;
    metaKeywords_en: string;
}

export default function EditBlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
    const [formData, setFormData] = useState<BlogFormData>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: null,
        category: "",
        author: "",
        published: false,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        ogImage: null,
        // English
        title_en: "",
        excerpt_en: "",
        content_en: "",
        metaTitle_en: "",
        metaDescription_en: "",
        metaKeywords_en: "",
    });

    useEffect(() => {
        async function fetchPost() {
            try {
                const res = await fetch(`/api/blog/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        title: data.title || "",
                        slug: data.slug || "",
                        excerpt: data.excerpt || "",
                        content: data.content || "",
                        image: data.image || null,
                        category: data.category || "",
                        author: data.author || "",
                        published: data.published || false,
                        metaTitle: data.metaTitle || "",
                        metaDescription: data.metaDescription || "",
                        metaKeywords: data.metaKeywords || "",
                        ogImage: data.ogImage || null,
                        title_en: data.title_en || "",
                        excerpt_en: data.excerpt_en || "",
                        content_en: data.content_en || "",
                        metaTitle_en: data.metaTitle_en || "",
                        metaDescription_en: data.metaDescription_en || "",
                        metaKeywords_en: data.metaKeywords_en || "",
                    });
                } else {
                    alert("Yazı bulunamadı");
                    router.push("/editpanel/blog");
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/editpanel/blog");
            } else {
                console.error("Failed to update blog post");
                alert("Yazı güncellenemedi.");
            }
        } catch (error) {
            console.error("Error updating blog post:", error);
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
            <h1 className="text-2xl font-bold text-black mb-8">Blog Yazısını Düzenle</h1>

            {/* Tabs */}
            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => setActiveTab("content")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "content"
                        ? "bg-black text-white"
                        : "bg-black/5 text-black hover:bg-black/10"
                        }`}
                >
                    İçerik
                </button>
                <button
                    onClick={() => setActiveTab("seo")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "seo"
                        ? "bg-black text-white"
                        : "bg-black/5 text-black hover:bg-black/10"
                        }`}
                >
                    SEO
                </button>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl bg-white rounded-2xl p-6 shadow-sm space-y-6">

                {activeTab === "content" && (
                    <>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Başlık (TR)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Başlık (EN)</label>
                                <input
                                    type="text"
                                    value={formData.title_en}
                                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">Slug</label>
                            <input
                                type="text"
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">Özet (TR)</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">Özet (EN)</label>
                            <textarea
                                value={formData.excerpt_en}
                                onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">İçerik (TR)</label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(val) => setFormData({ ...formData, content: val })}
                                placeholder="Blog içeriği..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">İçerik (EN)</label>
                            <RichTextEditor
                                value={formData.content_en}
                                onChange={(val) => setFormData({ ...formData, content_en: val })}
                                placeholder="Blog content in English..."
                            />
                        </div>

                        <ImageUpload
                            value={formData.image}
                            onChange={(url) => setFormData({ ...formData, image: url })}
                            folder="blog"
                            label="Kapak Görseli"
                        />

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Kategori</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Teknoloji, Haberler..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Yazar</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="published"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="w-5 h-5 text-black border-2 border-black/20 rounded focus:ring-black"
                            />
                            <label htmlFor="published" className="text-sm font-medium text-black">
                                Yayına Al
                            </label>
                        </div>
                    </>
                )}

                {activeTab === "seo" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Meta Başlık (TR)</label>
                                <input
                                    type="text"
                                    value={formData.metaTitle}
                                    onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Meta Başlık (EN)</label>
                                <input
                                    type="text"
                                    value={formData.metaTitle_en}
                                    onChange={(e) => setFormData({ ...formData, metaTitle_en: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Meta Açıklama (TR)</label>
                                <textarea
                                    value={formData.metaDescription}
                                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Meta Açıklama (EN)</label>
                                <textarea
                                    value={formData.metaDescription_en}
                                    onChange={(e) => setFormData({ ...formData, metaDescription_en: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Anahtar Kelimeler (TR)</label>
                                <input
                                    type="text"
                                    value={formData.metaKeywords}
                                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Anahtar Kelimeler (EN)</label>
                                <input
                                    type="text"
                                    value={formData.metaKeywords_en}
                                    onChange={(e) => setFormData({ ...formData, metaKeywords_en: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">OG Image URL</label>
                            <input
                                type="text"
                                value={formData.ogImage || ""}
                                onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>
                )}

                <div className="flex gap-4 pt-4 border-t border-black/5">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50"
                    >
                        {saving ? "Yazıyı Güncelle" : "Yazıyı Güncelle"}
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
