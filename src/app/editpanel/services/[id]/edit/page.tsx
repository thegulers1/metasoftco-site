"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useToast } from "@/providers/ToastProvider";
import ImageUpload from "@/components/editpanel/ImageUpload";
import GalleryUpload from "@/components/editpanel/GalleryUpload";
import VideoUpload from "@/components/editpanel/VideoUpload";
import RichTextEditor from "@/components/editpanel/RichTextEditor";

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
    featured: boolean;
    featuredOrder: number;
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
    const { showToast } = useToast();
    const [service, setService] = useState<Service | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [translating, setTranslating] = useState(false);
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

    const handleTranslate = async () => {
        if (!service) return;

        setTranslating(true);
        try {
            const fields = [
                { tr: service.title, en: 'title_en', field: 'title' },
                { tr: service.description, en: 'description_en', field: 'description' },
                { tr: service.content, en: 'content_en', field: 'content' },
                { tr: service.metaTitle, en: 'metaTitle_en', field: 'metaTitle' },
                { tr: service.metaDescription, en: 'metaDescription_en', field: 'metaDescription' },
                { tr: service.metaKeywords, en: 'metaKeywords_en', field: 'metaKeywords' },
            ].filter(f => f.tr); // Sadece dolu alanları çevir

            console.log('Çevrilecek alanlar:', fields);

            const translations: any = {};

            for (const field of fields) {
                console.log(`Çevriliyor: ${field.field} ->`, field.tr);

                const res = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: field.tr, field: field.field }),
                });

                if (res.ok) {
                    const data = await res.json();
                    translations[field.en] = data.translation;
                    console.log(`✓ ${field.field} çevrildi:`, data.translation);
                } else {
                    console.error(`✗ ${field.field} çevrilemedi:`, await res.text());
                }
            }

            console.log('Tüm çeviriler:', translations);

            // State'i callback ile güncelle (closure problemi çözümü)
            setService(prev => {
                if (!prev) return prev;
                const updated = { ...prev, ...translations };
                console.log('Güncellenmiş service:', updated);
                return updated;
            });

            // Başarı mesajı
            const translatedCount = Object.keys(translations).length;
            if (translatedCount > 0) {
                showToast(`Başarılı! ${translatedCount} alan İngilizce'ye çevrildi.`, 'success');
            } else {
                showToast('Çevrilecek Türkçe alan bulunamadı.', 'error');
            }
        } catch (error) {
            console.error('Translation failed:', error);
            showToast('Çeviri başarısız oldu. Lütfen tekrar deneyin.', 'error');
        } finally {
            setTranslating(false);
        }
    };

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
            showToast("Değişiklikler başarıyla kaydedildi!", 'success');
            // router.push("/editpanel/services"); // Sayfada kal
        } else {
            const errorText = await res.text();
            console.error("Save failed:", errorText);
            showToast(`Değişiklikler kaydedilemedi: ${errorText || 'Lütfen tekrar deneyin.'}`, 'error');
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
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-black">Hizmeti Düzenle</h1>
                <button
                    type="button"
                    onClick={handleTranslate}
                    disabled={translating || !service.title}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {translating ? (
                        <>
                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Çevriliyor...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            AI ile Çevir
                        </>
                    )}
                </button>
            </div>

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
                                onChange={(e) => {
                                    const title = e.target.value;
                                    const slug = title.toLowerCase()
                                        .replace(/ğ/g, 'g').replace(/ü/g, 'u')
                                        .replace(/ş/g, 's').replace(/ı/g, 'i')
                                        .replace(/ö/g, 'o').replace(/ç/g, 'c')
                                        .replace(/[^a-z0-9]+/g, '-')
                                        .replace(/^-+|-+$/g, '');
                                    setService({ ...service, title, slug });
                                }}
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
                                Slug (Otomatik)
                            </label>
                            <input
                                type="text"
                                value={service.slug}
                                readOnly
                                className="w-full px-4 py-3 bg-black/5 border-0 rounded-lg text-black/50 cursor-not-allowed"
                            />
                            <p className="text-xs text-black/40 mt-1">Başlıktan otomatik oluşturulur</p>
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

                        <div className="flex items-center gap-6 p-4 bg-[#f5f5f5] rounded-lg">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={service.featured}
                                    onChange={(e) => setService({ ...service, featured: e.target.checked })}
                                    className="w-4 h-4 accent-black cursor-pointer"
                                />
                                <span className="text-sm font-medium text-black/70">Anasayfada Göster</span>
                            </label>
                            {service.featured && (
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-black/70">
                                        Anasayfa Sırası:
                                    </label>
                                    <input
                                        type="number"
                                        value={service.featuredOrder}
                                        onChange={(e) => setService({ ...service, featuredOrder: parseInt(e.target.value) || 0 })}
                                        className="w-20 px-3 py-2 bg-white border-0 rounded-lg text-black text-center focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            )}
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
