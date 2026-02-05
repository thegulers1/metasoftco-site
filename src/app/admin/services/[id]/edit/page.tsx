"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import ImageUpload from "@/components/admin/ImageUpload";
import GalleryUpload from "@/components/admin/GalleryUpload";
import VideoUpload from "@/components/admin/VideoUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface Service {
    id: string;
    title: string;
    slug: string;
    description: string | null;
    content: string | null;
    image: string | null;
    gallery: string | null; // JSON string
    video: string | null;
    videoThumbnailTime: number | null;
    size: string;
    bgColor: string | null;
    textColor: string;
    order: number;
    categoryId: string;
    // SEO fields
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    ogImage: string | null;
    // English fields
    title_en: string | null;
    description_en: string | null;
    content_en: string | null;
    metaTitle_en: string | null;
    metaDescription_en: string | null;
    metaKeywords_en: string | null;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function EditServicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();
    const [service, setService] = useState<Service | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "media" | "seo">("general");

    useEffect(() => {
        async function fetchData() {
            const [serviceRes, categoriesRes] = await Promise.all([
                fetch(`/api/services/${id}`),
                fetch("/api/services/categories"),
            ]);

            if (serviceRes.ok) {
                setService(await serviceRes.json());
            }
            if (categoriesRes.ok) {
                setCategories(await categoriesRes.json());
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!service) return;

        // Debug log
        console.log("Saving service:", {
            gallery: service.gallery,
            video: service.video,
            image: service.image,
        });

        setSaving(true);
        const res = await fetch(`/api/services/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(service),
        });

        setSaving(false);
        if (res.ok) {
            router.push("/admin/services");
        } else {
            console.error("Save failed:", await res.text());
        }
    };

    if (loading) {
        return <div className="text-center py-8">Yükleniyor...</div>;
    }

    if (!service) {
        return <div className="text-center py-8">Hizmet bulunamadı</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-black mb-8">Hizmeti Düzenle</h1>

            {/* Tabs */}
            <div className="mb-6 flex gap-2">
                <button
                    onClick={() => setActiveTab("general")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "general"
                        ? "bg-black text-white"
                        : "bg-black/5 text-black hover:bg-black/10"
                        }`}
                >
                    Genel
                </button>
                <button
                    onClick={() => setActiveTab("media")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "media"
                        ? "bg-black text-white"
                        : "bg-black/5 text-black hover:bg-black/10"
                        }`}
                >
                    Medya
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

            <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-2xl p-6 shadow-sm space-y-6">

                {/* General Tab */}
                {activeTab === "general" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Başlık
                            </label>
                            <input
                                type="text"
                                value={service.title}
                                onChange={(e) => setService({ ...service, title: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Başlık (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={service.title_en || ""}
                                onChange={(e) => setService({ ...service, title_en: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={service.slug}
                                onChange={(e) => setService({ ...service, slug: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Kategori
                            </label>
                            <select
                                value={service.categoryId}
                                onChange={(e) => setService({ ...service, categoryId: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Açıklama
                            </label>
                            <textarea
                                value={service.description || ""}
                                onChange={(e) => setService({ ...service, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Kısa açıklama (listelerde görünür)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Açıklama (İngilizce)
                            </label>
                            <textarea
                                value={service.description_en || ""}
                                onChange={(e) => setService({ ...service, description_en: e.target.value || null })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Kısa açıklama (İngilizce)"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Detaylı İçerik
                            </label>
                            <RichTextEditor
                                value={service.content || ""}
                                onChange={(value) => setService({ ...service, content: value })}
                                placeholder="Hizmet detay sayfasında görünecek içerik..."
                            />
                            <p className="mt-1 text-xs text-black/40">
                                Yukarıdaki araç çubuğunu kullanarak metni biçimlendirebilirsiniz
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Detaylı İçerik (İngilizce)
                            </label>
                            <RichTextEditor
                                value={service.content_en || ""}
                                onChange={(value) => setService({ ...service, content_en: value })}
                                placeholder="Hizmet detay sayfasında görünecek içerik (İngilizce)..."
                            />
                        </div>

                        <ImageUpload
                            value={service.image}
                            onChange={(url) => setService({ ...service, image: url })}
                            folder="services"
                            label="Hizmet Görseli"
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Boyut
                                </label>
                                <select
                                    value={service.size}
                                    onChange={(e) => setService({ ...service, size: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="wide">Wide</option>
                                    <option value="tall">Tall</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Sıra
                                </label>
                                <input
                                    type="number"
                                    value={service.order}
                                    onChange={(e) => setService({ ...service, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Arka Plan Rengi
                                </label>
                                <input
                                    type="text"
                                    value={service.bgColor || ""}
                                    onChange={(e) => setService({ ...service, bgColor: e.target.value || null })}
                                    placeholder="#000000"
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Yazı Rengi
                                </label>
                                <select
                                    value={service.textColor}
                                    onChange={(e) => setService({ ...service, textColor: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="light">Açık</option>
                                    <option value="dark">Koyu</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}

                {/* Media Tab */}
                {activeTab === "media" && (
                    <>
                        <GalleryUpload
                            value={
                                typeof service.gallery === 'string'
                                    ? JSON.parse(service.gallery)
                                    : (service.gallery || [])
                            } onChange={(urls) => setService({ ...service, gallery: urls.length > 0 ? JSON.stringify(urls) : null })}
                            folder="services/gallery"
                            label="Galeri Görselleri"
                            maxImages={12}
                        />

                        <VideoUpload
                            value={service.video}
                            onChange={(url) => setService({ ...service, video: url })}
                            folder="services/videos"
                            label="Tanıtım Videosu"
                        />

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Video Kapak Fotoğrafı Saniyesi
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                value={service.videoThumbnailTime || ""}
                                onChange={(e) => setService({ ...service, videoThumbnailTime: parseFloat(e.target.value) || null })}
                                placeholder="Örn: 4.5"
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="mt-1 text-xs text-black/40">
                                Videonun kaçıncı saniyesini kapak fotoğrafı yapmak istersiniz?
                            </p>
                        </div>
                    </>
                )}

                {/* SEO Tab */}
                {activeTab === "seo" && (
                    <>
                        <div className="p-4 bg-blue-50 rounded-lg mb-6">
                            <p className="text-sm text-blue-800">
                                SEO alanları boş bırakılırsa otomatik olarak hizmet başlığı ve açıklaması kullanılır.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Başlık
                            </label>
                            <input
                                type="text"
                                value={service.metaTitle || ""}
                                onChange={(e) => setService({ ...service, metaTitle: e.target.value || null })}
                                placeholder={service.title}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="mt-1 text-xs text-black/40">
                                Google sonuçlarında görünecek başlık (max 60 karakter)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Başlık (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={service.metaTitle_en || ""}
                                onChange={(e) => setService({ ...service, metaTitle_en: e.target.value || null })}
                                placeholder={service.title_en || "Meta Title (EN)"}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Açıklama
                            </label>
                            <textarea
                                value={service.metaDescription || ""}
                                onChange={(e) => setService({ ...service, metaDescription: e.target.value || null })}
                                placeholder={service.description || "Açıklama giriniz..."}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="mt-1 text-xs text-black/40">
                                Google sonuçlarında görünecek açıklama (max 160 karakter)
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Açıklama (İngilizce)
                            </label>
                            <textarea
                                value={service.metaDescription_en || ""}
                                onChange={(e) => setService({ ...service, metaDescription_en: e.target.value || null })}
                                placeholder={service.description_en || "Meta Description (EN)..."}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Anahtar Kelimeler
                            </label>
                            <input
                                type="text"
                                value={service.metaKeywords || ""}
                                onChange={(e) => setService({ ...service, metaKeywords: e.target.value || null })}
                                placeholder="yapay zeka, chatbot, müşteri hizmetleri"
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="mt-1 text-xs text-black/40">
                                Virgülle ayırarak yazın
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Anahtar Kelimeler (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={service.metaKeywords_en || ""}
                                onChange={(e) => setService({ ...service, metaKeywords_en: e.target.value || null })}
                                placeholder="ai, chatbot, customer service"
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="mt-1 text-xs text-black/40">
                                Virgülle ayırarak yazın
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                OG Image URL
                            </label>
                            <input
                                type="text"
                                value={service.ogImage || ""}
                                onChange={(e) => setService({ ...service, ogImage: e.target.value || null })}
                                placeholder="https://..."
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="mt-1 text-xs text-black/40">
                                Sosyal medya paylaşımlarında görünecek görsel (1200x630px önerilir)
                            </p>
                        </div>
                    </>
                )}

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50"
                    >
                        {saving ? "Kaydediliyor..." : "Kaydet"}
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
