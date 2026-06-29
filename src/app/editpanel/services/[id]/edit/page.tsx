"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useToast } from "@/providers/ToastProvider";
import ImageUpload from "@/components/editpanel/ImageUpload";
import GalleryUpload from "@/components/editpanel/GalleryUpload";
import VideoUpload from "@/components/editpanel/VideoUpload";
import RichTextEditor from "@/components/editpanel/RichTextEditor";

export const dynamic = 'force-dynamic';

interface Service {
    id: string;
    title: string;
    homeTitle: string | null;
    homeTitle_en: string | null;
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
    accentText: string | null;
    accentText_en: string | null;
    accentColor: string | null;
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
    slug_en: string | null;
    title_en: string | null;
    description_en: string | null;
    content_en: string | null;
    metaTitle_en: string | null;
    metaDescription_en: string | null;
    metaKeywords_en: string | null;
    // FAQ & Specs
    faq: string | null;
    faq_en: string | null;
    specs: string | null;
    specs_en: string | null;
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
    const [activeTab, setActiveTab] = useState<"general" | "media" | "seo" | "content">("general");

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
            let message = "Lütfen tekrar deneyin.";
            try {
                message = JSON.parse(errorText).error || message;
            } catch { }
            showToast(`Değişiklikler kaydedilemedi: ${message}`, 'error');
        }
    };

    if (loading) {
        return <div className="text-center py-8">Yükleniyor...</div>;
    }

    if (!service) {
        return <div className="text-center py-8">Hizmet bulunamadı</div>;
    }

    const categorySlug = categories.find((c) => c.id === service.categoryId)?.slug;
    const serviceUrl = categorySlug ? `/hizmetler/${categorySlug}/${service.slug}` : null;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-black">Hizmeti Düzenle</h1>
                    {serviceUrl && (
                        <a
                            href={serviceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-black/50 bg-black/5 hover:bg-black/10 hover:text-black rounded-lg transition"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Sayfayı Görüntüle
                        </a>
                    )}
                </div>
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
                <button
                    onClick={() => setActiveTab("content")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === "content"
                        ? "bg-black text-white"
                        : "bg-black/5 text-black hover:bg-black/10"
                        }`}
                >
                    FAQ & Özellikler
                </button>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-2xl p-6 shadow-sm space-y-6">

                {/* General Tab */}
                {activeTab === "general" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Başlık <span className="text-black/30 font-normal">(Sayfada H1 olarak görünür)</span>
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
                            <p className="text-xs text-black/40 mt-1">SEO ve detay sayfasındaki H1 başlığı — uzun ve aranabilir tutun, örn: <em>AI Photobooth Kiralama</em></p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Başlık (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={service.title_en || ""}
                                onChange={(e) => {
                                    const title_en = e.target.value;
                                    const slug_en = title_en
                                        ? title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                                        : null;
                                    setService({ ...service, title_en: title_en || null, slug_en });
                                }}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Anasayfa Başlığı <span className="text-black/30 font-normal">(opsiyonel)</span>
                            </label>
                            <input
                                type="text"
                                value={service.homeTitle || ""}
                                onChange={(e) => setService({ ...service, homeTitle: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Boş bırakılırsa Başlık kullanılır"
                            />
                            <p className="text-xs text-black/40 mt-1">Anasayfada kartlarda gösterilen kısa başlık, örn: <em>AI Photo</em>. Detay sayfasındaki Başlık'tan farklı olabilir.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Anasayfa Başlığı (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={service.homeTitle_en || ""}
                                onChange={(e) => setService({ ...service, homeTitle_en: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Boş bırakılırsa Başlık (İngilizce) kullanılır"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Slug (TR)
                            </label>
                            <input
                                type="text"
                                value={service.slug}
                                onChange={(e) => setService({ ...service, slug: e.target.value })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="text-xs text-black/40 mt-1">Türkçe başlıktan otomatik oluşturulur, düzenleyebilirsiniz</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Slug (EN)
                            </label>
                            <input
                                type="text"
                                value={service.slug_en || ""}
                                onChange={(e) => setService({ ...service, slug_en: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="text-xs text-black/40 mt-1">İngilizce başlıktan otomatik oluşturulur · URL: /en/services/…/{service.slug_en || "—"}</p>
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
                                Spot Metin <span className="text-black/30 font-normal">(Başlık altında görünür)</span>
                            </label>
                            <textarea
                                value={service.description || ""}
                                onChange={(e) => setService({ ...service, description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Örn: Hızın ve heyecanın zirvesini etkinliğinize taşıyoruz."
                            />
                            <p className="text-xs text-black/40 mt-1">H1 başlığının hemen altında şık küçük bir font ile görünür</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Kart Alt Yazısı (Renkli)
                            </label>
                            <input
                                type="text"
                                value={service.accentText || ""}
                                onChange={(e) => setService({ ...service, accentText: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder="Altına görünecek kısa renkli metin (örn: 'Canlı Lansman')"
                            />
                            <p className="text-xs text-black/40 mt-1">Kart altında gösterilecek kısa vurgulu metin. Renk seçmek için aşağıyı kullanın.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Kart Alt Yazısı (İngilizce)</label>
                                <input
                                    type="text"
                                    value={service.accentText_en || ""}
                                    onChange={(e) => setService({ ...service, accentText_en: e.target.value || null })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Accent text (EN)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">Accent Rengi (hex)</label>
                                <input
                                    type="text"
                                    value={service.accentColor || ""}
                                    onChange={(e) => setService({ ...service, accentColor: e.target.value || null })}
                                    placeholder="#22d3ee"
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
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
                                onChange={(value) => setService(prev => prev ? { ...prev, content: value } : prev)}
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
                                onChange={(value) => setService(prev => prev ? { ...prev, content_en: value } : prev)}
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
                            value={(() => {
                                if (!service.gallery) return [];
                                const parsed = JSON.parse(service.gallery) as (string | { url: string; alt?: string })[];
                                return parsed.map((item) => typeof item === 'string' ? item : item.url);
                            })()}
                            onChange={(urls) => {
                                // Mevcut alt metinleri koru, yeni URL'ler için boş alt kullan
                                const currentItems: { url: string; alt: string }[] = service.gallery
                                    ? (JSON.parse(service.gallery) as (string | { url: string; alt?: string })[]).map(
                                          (item) => typeof item === 'string' ? { url: item, alt: '' } : { url: item.url, alt: item.alt || '' }
                                      )
                                    : [];
                                const newItems = urls.map((url) => ({
                                    url,
                                    alt: currentItems.find((i) => i.url === url)?.alt || '',
                                }));
                                setService({ ...service, gallery: newItems.length > 0 ? JSON.stringify(newItems) : null });
                            }}
                            folder="services/gallery"
                            label="Galeri Görselleri"
                            maxImages={12}
                        />

                        {/* Alt metin girdileri */}
                        {service.gallery && JSON.parse(service.gallery).length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-black/70">
                                        Görsel Alt Metinleri <span className="text-black/30 font-normal">(SEO · boş bırakırsanız hizmet başlığı kullanılır)</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const templates = [
                                                `${service.title} - Kurumsal Etkinlik ve Marka Aktivasyon Çözümleri | MetasoftCo`,
                                                `Etkinlikler için İnteraktif ${service.title} Deneyimi ve Dijital Hatıralar | MetasoftCo`,
                                                `Profesyonel ${service.title} Hizmeti ve Yeni Nesil Etkinlik Teknolojileri | MetasoftCo`,
                                            ];
                                            const items = (JSON.parse(service.gallery!) as (string | { url: string; alt?: string })[]).map(
                                                (item, i) => {
                                                    const url = typeof item === 'string' ? item : item.url;
                                                    return { url, alt: templates[i % 3] };
                                                }
                                            );
                                            setService({ ...service, gallery: JSON.stringify(items) });
                                        }}
                                        className="text-xs px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition"
                                    >
                                        Otomatik Doldur
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(JSON.parse(service.gallery) as (string | { url: string; alt?: string })[]).map((item, i) => {
                                        const url = typeof item === 'string' ? item : item.url;
                                        const alt = typeof item === 'string' ? '' : (item.alt || '');
                                        return (
                                            <div key={url} className="flex items-center gap-3">
                                                <img src={url} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0 bg-black/5" />
                                                <input
                                                    type="text"
                                                    value={alt}
                                                    onChange={(e) => {
                                                        const items = (JSON.parse(service.gallery!) as (string | { url: string; alt?: string })[]).map(
                                                            (it) => {
                                                                const u = typeof it === 'string' ? it : it.url;
                                                                const a = typeof it === 'string' ? '' : (it.alt || '');
                                                                return u === url ? { url: u, alt: e.target.value } : { url: u, alt: a };
                                                            }
                                                        );
                                                        setService({ ...service, gallery: JSON.stringify(items) });
                                                    }}
                                                    placeholder={`${service.title} - görsel ${i + 1}`}
                                                    className="flex-1 px-3 py-2 bg-[#f5f5f5] border-0 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

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
                                SEO Başlık / Sayfa H1 <span className="text-black/30 font-normal">(Sayfa başlığı olarak görünür)</span>
                            </label>
                            <input
                                type="text"
                                value={service.metaTitle || ""}
                                onChange={(e) => setService({ ...service, metaTitle: e.target.value || null })}
                                placeholder={service.title}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="mt-1 text-xs text-black/40">
                                Hem sayfanın H1 başlığında hem Google'da görünür. Anahtar kelime ekleyin — örn: <em>AI Photo Booth Kiralama</em>
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

                {/* FAQ & Specs Tab */}
                {activeTab === "content" && (() => {
                    const faqItems: { q: string; a: string }[] = service.faq ? JSON.parse(service.faq) : [];
                    const specsItems: { label: string; value: string }[] = service.specs ? JSON.parse(service.specs) : [];

                    const updateFaq = (items: { q: string; a: string }[]) =>
                        setService({ ...service, faq: items.length ? JSON.stringify(items) : null });
                    const updateSpecs = (items: { label: string; value: string }[]) =>
                        setService({ ...service, specs: items.length ? JSON.stringify(items) : null });

                    return (
                        <>
                            {/* FAQ */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-black/70">Sıkça Sorulan Sorular (FAQ)</label>
                                        <p className="text-xs text-black/40 mt-0.5">Google'da öne çıkan snippet almak için kullanılır</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => updateFaq([...faqItems, { q: "", a: "" }])}
                                        className="text-xs px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition"
                                    >
                                        + Soru Ekle
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {faqItems.map((item, i) => (
                                        <div key={i} className="p-4 bg-[#f5f5f5] rounded-xl space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-black/40 w-4">{i + 1}</span>
                                                <input
                                                    type="text"
                                                    value={item.q}
                                                    onChange={(e) => {
                                                        const updated = [...faqItems];
                                                        updated[i] = { ...updated[i], q: e.target.value };
                                                        updateFaq(updated);
                                                    }}
                                                    placeholder="Soru?"
                                                    className="flex-1 px-3 py-2 bg-white border-0 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => updateFaq(faqItems.filter((_, j) => j !== i))}
                                                    className="text-black/30 hover:text-red-500 transition text-lg leading-none"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <textarea
                                                value={item.a}
                                                onChange={(e) => {
                                                    const updated = [...faqItems];
                                                    updated[i] = { ...updated[i], a: e.target.value };
                                                    updateFaq(updated);
                                                }}
                                                placeholder="Cevap..."
                                                rows={2}
                                                className="w-full px-3 py-2 bg-white border-0 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black ml-6"
                                            />
                                        </div>
                                    ))}
                                    {faqItems.length === 0 && (
                                        <p className="text-sm text-black/30 text-center py-4">Henüz soru eklenmedi</p>
                                    )}
                                </div>
                            </div>

                            {/* Specs */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-black/70">Teknik Özellikler</label>
                                        <p className="text-xs text-black/40 mt-0.5">Sayfada tablo olarak gösterilir</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => updateSpecs([...specsItems, { label: "", value: "" }])}
                                        className="text-xs px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition"
                                    >
                                        + Özellik Ekle
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {specsItems.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={item.label}
                                                onChange={(e) => {
                                                    const updated = [...specsItems];
                                                    updated[i] = { ...updated[i], label: e.target.value };
                                                    updateSpecs(updated);
                                                }}
                                                placeholder="Özellik (örn: Kamera)"
                                                className="w-40 px-3 py-2 bg-[#f5f5f5] border-0 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                            <input
                                                type="text"
                                                value={item.value}
                                                onChange={(e) => {
                                                    const updated = [...specsItems];
                                                    updated[i] = { ...updated[i], value: e.target.value };
                                                    updateSpecs(updated);
                                                }}
                                                placeholder="Değer (örn: Profesyonel DSLR)"
                                                className="flex-1 px-3 py-2 bg-[#f5f5f5] border-0 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => updateSpecs(specsItems.filter((_, j) => j !== i))}
                                                className="text-black/30 hover:text-red-500 transition text-lg leading-none"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                    {specsItems.length === 0 && (
                                        <p className="text-sm text-black/30 text-center py-4">Henüz özellik eklenmedi</p>
                                    )}
                                </div>
                            </div>
                        </>
                    );
                })()}

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
