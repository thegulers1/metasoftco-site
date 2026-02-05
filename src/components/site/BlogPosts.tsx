"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageProvider";

// ============================================
// BLOG POST TİPİ - Backend entegrasyonu için hazır
// Admin panelden gelen veriler bu yapıda olacak
// ============================================
export interface BlogPost {
    id: string;
    title: string;
    title_en?: string | null;
    excerpt: string;
    excerpt_en?: string | null;
    image: string;
    slug: string;
    category: string;
    publishedAt: string;
    author?: {
        name: string;
        avatar?: string;
    };
}

// ============================================
// MOCK DATA - Backend bağlandığında bu kaldırılacak
// API'den çekilecek: GET /api/blog/posts
// ============================================
const mockPosts: BlogPost[] = [
    {
        id: "1",
        title: "Shopify vs WooCommerce: Hangisi Daha İyi?",
        excerpt:
            "E-ticaret dünyasında doğru platform seçimi başarının anahtarı olabilir. Her iki platformun avantaj ve dezavantajlarını inceliyoruz...",
        image: "/blog/post-1.jpg",
        slug: "shopify-vs-woocommerce",
        category: "E-Ticaret",
        publishedAt: "2025-01-15",
    },
    {
        id: "2",
        title: "2025'in En İyi 100 Ücretsiz Fontu",
        excerpt:
            "Tipografi, web tasarımında merkezi bir rol oynuyor. Variable Fonts, CSS Shapes ve FlexBox gibi yeniliklerle birlikte gelişiyor...",
        image: "/blog/post-2.jpg",
        slug: "100-best-free-fonts-2025",
        category: "Tasarım",
        publishedAt: "2025-01-10",
    },
    {
        id: "3",
        title: "Web Tasarımında Trend Gradientler",
        excerpt:
            "Bu yıl canlı renk paletleri ve düzensiz şekillerle blur ve distortion efektleri içeren gradient'ler çok popüler...",
        image: "/blog/post-3.jpg",
        slug: "trendy-gradients-web-design",
        category: "UI/UX",
        publishedAt: "2025-01-05",
    },
];

// ============================================
// BLOG POSTS KOMPONENTİ
// Props olarak posts array alabilir (API'den gelecek)
// Eğer props verilmezse mock data kullanır
// ============================================
interface BlogPostsProps {
    posts?: BlogPost[];
    title?: string;
    subtitle?: string;
}

export default function BlogPosts({
    posts = mockPosts,
    title = "Popüler yazıları keşfedin.",
    subtitle = "Blog",
}: BlogPostsProps) {
    const { language, t } = useLanguage();

    return (
        <section className="bg-[#f5f5f5] py-16 sm:py-24">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pl-8 sm:pl-10 lg:pl-12">
                {/* Section Header */}
                <div className="mb-12">
                    <span className="text-xs uppercase tracking-widest text-black/50">
                        {t("Blog", "Blog")}
                    </span>
                    <h2
                        className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        {t("Popüler yazıları keşfedin.", "Discover popular articles.")}
                    </h2>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group block"
                        >
                            {/* Card Image */}
                            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/5">
                                {/* Placeholder gradient - backend bağlandığında gerçek resimler */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 transition-transform duration-500 group-hover:scale-105" />

                                {/* Category Badge */}
                                <div className="absolute top-3 left-3 z-10">
                                    <span className="inline-block rounded-md bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-black">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold text-black group-hover:underline underline-offset-2 line-clamp-2">
                                    {language === "en" ? (post.title_en || post.title) : post.title}
                                </h3>
                                <p className="mt-2 text-sm text-black/60 line-clamp-3">
                                    {language === "en" ? (post.excerpt_en || post.excerpt) : post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-12 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-black hover:underline underline-offset-4"
                    >
                        {t("Tüm yazıları görüntüle", "View all articles")}
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ============================================
// BACKEND ENTEGRASYONU İÇİN NOTLAR:
// ============================================
// 1. Admin panelden blog yazısı eklendiğinde:
//    POST /api/blog/posts { title, excerpt, image, category, ... }
//
// 2. Ana sayfada blog yazılarını çekmek için:
//    GET /api/blog/posts?limit=3
//
// 3. Sayfa componentinde kullanım (server component):
//    const posts = await fetch('/api/blog/posts?limit=3').then(r => r.json())
//    <BlogPosts posts={posts} />
//
// 4. Resimler için:
//    - Upload: POST /api/upload (multipart/form-data)
//    - Supabase Storage veya Cloudinary kullanılabilir
// ============================================
