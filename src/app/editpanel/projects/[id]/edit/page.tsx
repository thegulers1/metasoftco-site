"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/editpanel/ImageUpload";
import GalleryUpload from "@/components/editpanel/GalleryUpload";
import VideoUpload from "@/components/editpanel/VideoUpload";
import RichTextEditor from "@/components/editpanel/RichTextEditor";

export const dynamic = 'force-dynamic';

interface Project {
    title: string;
    slug: string;
    description: string | null;
    content: string | null;
    image: string | null;
    gallery: string | null;
    category: string | null;
    client: string | null;
    projectDate: string | null;
    technologies: string | null;
    projectUrl: string | null;
    githubUrl: string | null;
    video: string | null;
    featured: boolean;
    published: boolean;
    order: number;
    metaTitle: string | null;
    metaDescription: string | null;
    metaKeywords: string | null;
    ogImage: string | null;
    slug_en: string | null;
    title_en: string | null;
    description_en: string | null;
    content_en: string | null;
    metaTitle_en: string | null;
    metaDescription_en: string | null;
    metaKeywords_en: string | null;
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [translating, setTranslating] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "media" | "seo">("general");
    const [project, setProject] = useState<Project | null>(null);
    const [projectId, setProjectId] = useState<string | null>(null);

    // Unwrap params Promise
    useEffect(() => {
        params.then(({ id }) => setProjectId(id));
    }, [params]);

    useEffect(() => {
        if (!projectId) return;

        async function fetchProject() {
            const res = await fetch(`/api/projects/${projectId}`);
            if (res.ok) {
                const data = await res.json();
                setProject(data);
            } else {
                console.error("Failed to fetch project");
            }
            setLoading(false);
        }
        fetchProject();
    }, [projectId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!project || !projectId) return;

        setSaving(true);

        const res = await fetch(`/api/projects/${projectId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });

        setSaving(false);
        if (res.ok) {
            router.push("/editpanel/projects");
        } else {
            console.error("Update failed:", await res.text());
        }
    };

    const handleTranslate = async () => {
        if (!project) return;

        setTranslating(true);
        try {
            const fields = [
                { tr: project.title, en: 'title_en', field: 'title' },
                { tr: project.description, en: 'description_en', field: 'description' },
                { tr: project.content, en: 'content_en', field: 'content' },
                { tr: project.metaTitle, en: 'metaTitle_en', field: 'metaTitle' },
                { tr: project.metaDescription, en: 'metaDescription_en', field: 'metaDescription' },
                { tr: project.metaKeywords, en: 'metaKeywords_en', field: 'metaKeywords' },
            ].filter(f => f.tr);

            const translations: any = {};

            for (const field of fields) {
                const res = await fetch('/api/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: field.tr, field: field.field }),
                });

                if (res.ok) {
                    const data = await res.json();
                    translations[field.en] = data.translation;
                }
            }

            setProject({ ...project, ...translations });
        } catch (error) {
            console.error('Translation failed:', error);
            alert('Çeviri başarısız oldu. Lütfen tekrar deneyin.');
        } finally {
            setTranslating(false);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Yükleniyor...</div>;
    }

    if (!project) {
        return <div className="text-center py-8">Proje bulunamadı.</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-black">Proje Düzenle</h1>
                <button
                    type="button"
                    onClick={handleTranslate}
                    disabled={translating || !project.title}
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
                                Proje Başlığı *
                            </label>
                            <input
                                type="text"
                                required
                                value={project.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    const slug = title.toLowerCase()
                                        .replace(/ğ/g, 'g').replace(/ü/g, 'u')
                                        .replace(/ş/g, 's').replace(/ı/g, 'i')
                                        .replace(/ö/g, 'o').replace(/ç/g, 'c')
                                        .replace(/[^a-z0-9]+/g, '-')
                                        .replace(/^-+|-+$/g, '');
                                    setProject({ ...project, title, slug });
                                }}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Proje Başlığı (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={project.title_en || ""}
                                onChange={(e) => {
                                    const title_en = e.target.value;
                                    const slug_en = title_en
                                        ? title_en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
                                        : null;
                                    setProject({ ...project, title_en: title_en || null, slug_en });
                                }}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Slug (TR)
                            </label>
                            <input
                                type="text"
                                value={project.slug}
                                onChange={(e) => setProject({ ...project, slug: e.target.value })}
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
                                value={project.slug_en || ""}
                                onChange={(e) => setProject({ ...project, slug_en: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <p className="text-xs text-black/40 mt-1">İngilizce başlıktan otomatik oluşturulur · URL: /en/projects/{project.slug_en || "—"}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Kategori
                                </label>
                                <input
                                    type="text"
                                    value={project.category || ""}
                                    onChange={(e) => setProject({ ...project, category: e.target.value || null })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Müşteri
                                </label>
                                <input
                                    type="text"
                                    value={project.client || ""}
                                    onChange={(e) => setProject({ ...project, client: e.target.value || null })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Proje Tarihi
                            </label>
                            <input
                                type="date"
                                value={project.projectDate || ""}
                                onChange={(e) => setProject({ ...project, projectDate: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Kısa Açıklama
                            </label>
                            <textarea
                                value={project.description || ""}
                                onChange={(e) => setProject({ ...project, description: e.target.value || null })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Kısa Açıklama (İngilizce)
                            </label>
                            <textarea
                                value={project.description_en || ""}
                                onChange={(e) => setProject({ ...project, description_en: e.target.value || null })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Detaylı İçerik
                            </label>
                            <RichTextEditor
                                value={project.content || ""}
                                onChange={(val) => setProject({ ...project, content: val || null })}
                                placeholder="Proje detaylarını yazın..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Detaylı İçerik (İngilizce)
                            </label>
                            <RichTextEditor
                                value={project.content_en || ""}
                                onChange={(val) => setProject({ ...project, content_en: val || null })}
                                placeholder="Write project details in English..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Kullanılan Teknolojiler
                            </label>
                            <input
                                type="text"
                                value={project.technologies || ""}
                                onChange={(e) => setProject({ ...project, technologies: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                placeholder='["React", "Next.js", "TypeScript"]'
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Proje URL
                                </label>
                                <input
                                    type="url"
                                    value={project.projectUrl || ""}
                                    onChange={(e) => setProject({ ...project, projectUrl: e.target.value || null })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={project.githubUrl || ""}
                                    onChange={(e) => setProject({ ...project, githubUrl: e.target.value || null })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={project.featured}
                                        onChange={(e) => setProject({ ...project, featured: e.target.checked })}
                                        className="w-4 h-4 rounded border-black/20"
                                    />
                                    <span className="text-sm font-medium text-black/70">Öne Çıkan</span>
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={project.published}
                                        onChange={(e) => setProject({ ...project, published: e.target.checked })}
                                        className="w-4 h-4 rounded border-black/20"
                                    />
                                    <span className="text-sm font-medium text-black/70">Yayında</span>
                                </label>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-black/70 mb-2">
                                    Sıra
                                </label>
                                <input
                                    type="number"
                                    value={project.order}
                                    onChange={(e) => setProject({ ...project, order: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>
                    </>
                )}

                {/* Media Tab */}
                {activeTab === "media" && (
                    <>
                        <ImageUpload
                            value={project.image}
                            onChange={(url) => setProject({ ...project, image: url })}
                            folder="projects"
                            label="Ana Proje Görseli"
                        />

                        <GalleryUpload
                            value={(() => {
                                if (!project.gallery) return [];
                                const parsed = JSON.parse(project.gallery) as (string | { url: string; alt?: string })[];
                                return parsed.map((item) => typeof item === 'string' ? item : item.url);
                            })()}
                            onChange={(urls) => {
                                const currentItems: { url: string; alt: string }[] = project.gallery
                                    ? (JSON.parse(project.gallery) as (string | { url: string; alt?: string })[]).map(
                                          (item) => typeof item === 'string' ? { url: item, alt: '' } : { url: item.url, alt: item.alt || '' }
                                      )
                                    : [];
                                const newItems = urls.map((url) => ({
                                    url,
                                    alt: currentItems.find((i) => i.url === url)?.alt || '',
                                }));
                                setProject({ ...project, gallery: newItems.length > 0 ? JSON.stringify(newItems) : null });
                            }}
                            folder="projects/gallery"
                            label="Proje Galerisi"
                            maxImages={12}
                        />

                        {/* Alt metin girdileri */}
                        {project.gallery && JSON.parse(project.gallery).length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-black/70">
                                        Görsel Alt Metinleri <span className="text-black/30 font-normal">(SEO)</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const templates = [
                                                `${project.title} - Proje Görseli | MetasoftCo`,
                                                `${project.title} Projesi - Detay Fotoğraf | MetasoftCo`,
                                                `MetasoftCo ${project.title} Çalışması | Dijital Deneyim`,
                                            ];
                                            const items = (JSON.parse(project.gallery!) as (string | { url: string; alt?: string })[]).map(
                                                (item, i) => {
                                                    const url = typeof item === 'string' ? item : item.url;
                                                    return { url, alt: templates[i % 3] };
                                                }
                                            );
                                            setProject({ ...project, gallery: JSON.stringify(items) });
                                        }}
                                        className="text-xs px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition"
                                    >
                                        Otomatik Doldur
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {(JSON.parse(project.gallery) as (string | { url: string; alt?: string })[]).map((item, i) => {
                                        const url = typeof item === 'string' ? item : item.url;
                                        const alt = typeof item === 'string' ? '' : (item.alt || '');
                                        return (
                                            <div key={url} className="flex items-center gap-3">
                                                <img src={url} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0 bg-black/5" />
                                                <input
                                                    type="text"
                                                    value={alt}
                                                    onChange={(e) => {
                                                        const items = (JSON.parse(project.gallery!) as (string | { url: string; alt?: string })[]).map(
                                                            (it) => {
                                                                const u = typeof it === 'string' ? it : it.url;
                                                                const a = typeof it === 'string' ? '' : (it.alt || '');
                                                                return u === url ? { url: u, alt: e.target.value } : { url: u, alt: a };
                                                            }
                                                        );
                                                        setProject({ ...project, gallery: JSON.stringify(items) });
                                                    }}
                                                    placeholder={`${project.title} - görsel ${i + 1}`}
                                                    className="flex-1 px-3 py-2 bg-[#f5f5f5] border-0 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <VideoUpload
                            value={project.video}
                            onChange={(url) => setProject({ ...project, video: url })}
                            folder="projects/videos"
                            label="Proje Videosu"
                        />
                    </>
                )}

                {/* SEO Tab */}
                {activeTab === "seo" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Başlık
                            </label>
                            <input
                                type="text"
                                value={project.metaTitle || ""}
                                onChange={(e) => setProject({ ...project, metaTitle: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Başlık (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={project.metaTitle_en || ""}
                                onChange={(e) => setProject({ ...project, metaTitle_en: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Açıklama
                            </label>
                            <textarea
                                value={project.metaDescription || ""}
                                onChange={(e) => setProject({ ...project, metaDescription: e.target.value || null })}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Meta Açıklama (İngilizce)
                            </label>
                            <textarea
                                value={project.metaDescription_en || ""}
                                onChange={(e) => setProject({ ...project, metaDescription_en: e.target.value || null })}
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
                                value={project.metaKeywords || ""}
                                onChange={(e) => setProject({ ...project, metaKeywords: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                Anahtar Kelimeler (İngilizce)
                            </label>
                            <input
                                type="text"
                                value={project.metaKeywords_en || ""}
                                onChange={(e) => setProject({ ...project, metaKeywords_en: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black/70 mb-2">
                                OG Image URL
                            </label>
                            <input
                                type="text"
                                value={project.ogImage || ""}
                                onChange={(e) => setProject({ ...project, ogImage: e.target.value || null })}
                                className="w-full px-4 py-3 bg-[#f5f5f5] border-0 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </>
                )}

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50"
                    >
                        {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
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
