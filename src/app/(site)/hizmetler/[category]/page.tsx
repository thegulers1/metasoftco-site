import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/site";
import Link from "next/link";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";

export const dynamic = "force-dynamic";

const categoryFAQs: Record<string, { question: string; answer: string }[]> = {
    "yapay-zeka-etkinlik-cozumleri": [
        {
            question: "AI photo ve face swap etkinliklerde nasıl kullanılır?",
            answer: "MetasoftCo'nun AI Photo sistemleri, Stable Diffusion ve ControlNet teknolojisiyle misafirlerin fotoğraflarını saniyeler içinde Forbes kapak, Cyberpunk, Rönesans gibi farklı konseptlere dönüştürür. Bir stand kurulur, misafir fotoğrafı çekilir ve 5-15 saniye içinde dönüştürülmüş görsel e-posta veya QR kod ile paylaşılır.",
        },
        {
            question: "AI yüz dönüşümü (face swap) ne kadar sürede sonuç verir?",
            answer: "LoRA tabanlı model mimarisi sayesinde yüz dönüşümü 5-15 saniye içinde tamamlanır. Misafire gerçek zamanlı önizleme gösterilir, onay sonrası baskı veya dijital paylaşım yapılır. Saatte 40-60 kişiye kesintisiz hizmet sunulabilir.",
        },
        {
            question: "AI Fashion Mirror (Akıllı Ayna) nedir?",
            answer: "Computer Vision ve AR teknolojisiyle donatılmış interaktif aynalardır. Unity/WebGL tabanlı gerçek zamanlı render ile misafirler sanal kıyafetler giyebilir, marka karakterlerine dönüşebilir. Gerçek zamanlı segmentasyon teknolojisi arka planı otomatik kaldırır. Özellikle tekstil, moda ve marka aktivasyonu etkinlikleri için idealdir.",
        },
        {
            question: "Bu yapay zeka teknolojileri kurumsal etkinliklere uygun mu?",
            answer: "Evet. Tüm sistemler marka kimliğine özel yapılandırılır: logo, renk paleti, tema içerikleri kurumsal kimliğinize göre hazırlanır. KVKK uyumlu veri yönetimi, etkinlik öncesi teknik test ve etkinlik sırası yerinde destek standarttır.",
        },
        {
            question: "Kaç kişilik etkinlikte yapay zeka sistemleri kullanılabilir?",
            answer: "Küçük seminerlerden binlerce katılımcılı fuarlara kadar ölçeklenebilir mimari ile çalışır. Tek istasyon saatte 40-60 kişiye hizmet verir; büyük etkinlikler için birden fazla istasyon kurularak kapasite artırılabilir.",
        },
    ],
    "photobooth-ve-fotograf-aktivasyonlari": [
        {
            question: "Dijital photobooth ile klasik photobooth arasındaki fark nedir?",
            answer: "MetasoftCo dijital photobooth'ları yapay zeka arka plan kaldırma, anlık sosyal medya paylaşımı, marka özelleştirmesi ve analitik raporlama sunar. Klasik photobooth sadece fotoğraf çeker; dijital photobooth bir marka deneyim platformudur ve katılımcı verilerini KVKK uyumlu olarak raporlar.",
        },
        {
            question: "Photobooth kurulumu ne kadar sürer?",
            answer: "MetasoftCo ekibi etkinlik alanına 2-3 saat öncesinde gelerek tüm donanım ve yazılım kurulumunu tamamlar. Kompakt sistemler 45 dakikada hazır hale getirilebilir. Kurulum ve söküm hizmeti fiyata dahildir.",
        },
        {
            question: "Fotoğraflar katılımcılara nasıl iletilir?",
            answer: "E-posta (anında gönderim), SMS ile link veya etkinlik alanındaki kiosk ekranından QR kod okutma seçenekleri mevcuttur. İstek üzerine direkt Instagram veya LinkedIn paylaşımı da yapılabilir.",
        },
        {
            question: "Etkinlik sonrası analitik rapor alınabilir mi?",
            answer: "Evet. Gerçek zamanlı analitik panel ile katılım sayısı, paylaşım oranları, en popüler saatler ve etkileşim süreleri raporlanır. Etkinlik sonrasında PDF rapor sunulur. Tüm veri toplama KVKK uyumlu açık rıza alımı ile gerçekleşir.",
        },
        {
            question: "Hangi etkinlik türleri için photobooth uygundur?",
            answer: "Ürün lansmanları, fuar aktivasyonları, kurumsal yıl sonu partileri, açılış törenleri, mezuniyet törenleri, teknoloji konferansları, perakende aktivasyonları ve düğün organizasyonları başlıca kullanım alanlarıdır.",
        },
    ],
    "interaktif-etkinlik-aktiviteleri": [
        {
            question: "İnteraktif oyunlar kurumsal etkinliklerde ne işe yarar?",
            answer: "Gamification ile çalışan bağlılığı, marka bilinirliği ve etkinlik katılımı artırılır. Anket, ürün tanıtımı ve ödül kampanyaları eğlenceli bir formata dönüştürülür. Leaderboard (sıralama tablosu) ile rekabetçi katılım teşvik edilir.",
        },
        {
            question: "Hangi interaktif oyun konseptleri mevcuttur?",
            answer: "Hazır modüller: İnteraktif Hafıza Oyunu (marka görselleriyle kart eşleştirme), Dijital Hediye Çarkı Aktivasyonu (çark çevirme ve ödül kazanma), Geri Dönüşüm Kazan Oyunu (sürdürülebilirlik temalı). Ayrıca etkinliğe özel tamamen özel oyun mekaniği de geliştirilebilir.",
        },
        {
            question: "Oyunlar marka kimliğiyle özelleştirilebiliyor mu?",
            answer: "Evet. Tüm oyunlar şirket logonuz, renk paletiniz ve içeriğinizle tamamen özelleştirilir. Ürün görselleri, marka sloganları ve kampanya mesajları oyun içine entegre edilir. Marka onayı sonrası konfigürasyon kilitlenir.",
        },
        {
            question: "İnteraktif oyunlar için teknik altyapı gereksinimi nedir?",
            answer: "Tablet (10\"+), büyük dokunmatik ekran veya standart bilgisayar ile çalışır. İnternet bağlantısı ve elektrik prizi yeterlidir. Tüm donanım MetasoftCo tarafından sağlanır ve kurulumu ekibimizce yapılır.",
        },
        {
            question: "Oyunlarda sosyal medya entegrasyonu var mı?",
            answer: "Evet. Oyun sonunda oyuncunun skoru veya kazanım ekranı sosyal medya paylaşım modülüne yönlendirilebilir. Hashtag, marka etiketi ve etkinliğe özel çerçeve desteklenir.",
        },
    ],
};

interface PageProps {
    params: Promise<{ category: string }>;
}

async function getCategoryWithServices(slug: string) {
    return prisma.serviceCategory.findUnique({
        where: { slug },
        include: {
            services: { orderBy: { order: "asc" } },
        },
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const category = await getCategoryWithServices(categorySlug);
    if (!category) return {};

    const title = category.metaTitle || `${category.name} | MetasoftCo`;
    const description = category.metaDescription || siteConfig.description;
    const url = `${siteConfig.url}/hizmetler/${categorySlug}`;

    return {
        title,
        description,
        keywords: category.metaKeywords || undefined,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type: "website",
        },
        alternates: {
            canonical: url,
            ...(category.slug_en && {
                languages: {
                    "x-default": url,
                    tr: url,
                    en: `${siteConfig.url}/en/services/${category.slug_en}`,
                },
            }),
        },
    };
}

export default async function CategoryHubPage({ params }: PageProps) {
    const { category: categorySlug } = await params;
    const category = await getCategoryWithServices(categorySlug);

    if (!category) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Anasayfa", url: siteConfig.url },
        { name: "Hizmetler", url: `${siteConfig.url}/hizmetler` },
        { name: category.name, url: `${siteConfig.url}/hizmetler/${categorySlug}` },
    ]);

    const faqs = categoryFAQs[categorySlug] || [];
    const faqSchema = faqs.length > 0 ? generateFAQSchema(faqs) : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <AdminEditUrlSetter url={`/editpanel/services/categories/${category.id}/edit`} />

            <div className="min-h-screen bg-white">
                {/* Hero */}
                <section className="pt-36 pb-20 border-b border-black/5">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/40 font-bold mb-10">
                            <Link href="/" className="hover:text-black transition">Ana Sayfa</Link>
                            <span>/</span>
                            <Link href="/hizmetler" className="hover:text-black transition">Hizmetler</Link>
                            <span>/</span>
                            <span className="text-black">{category.name}</span>
                        </nav>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 mb-6 border border-red-600/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                            {category.name}
                        </span>

                        <h1
                            className="text-4xl sm:text-6xl lg:text-7xl font-light text-black tracking-tighter leading-[1.05] uppercase mb-8 max-w-4xl"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            {category.heroTitle || category.name}
                        </h1>

                        {category.heroContent && (
                            <p className="text-lg text-black/60 leading-relaxed max-w-3xl">
                                {category.heroContent}
                            </p>
                        )}
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                                {category.services.length} Hizmet
                            </h2>
                            <div className="h-[1px] flex-1 bg-black/5" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={`/hizmetler/${categorySlug}/${service.slug}`}
                                    className="group block relative aspect-[4/3] overflow-hidden bg-neutral-100"
                                >
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-8">
                                            <span
                                                className="text-white text-3xl font-bold uppercase tracking-tighter text-center leading-tight"
                                                style={{ fontFamily: "var(--font-inter-tight)" }}
                                            >
                                                {service.title}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-5 left-0">
                                        <div className="bg-white px-6 py-4 border-y border-r border-black/5">
                                            <h3
                                                className="text-lg font-bold text-red-600 uppercase tracking-tighter leading-none"
                                                style={{ fontFamily: "var(--font-inter-tight)" }}
                                            >
                                                {service.title}
                                            </h3>
                                            {service.description && (
                                                <p className="text-xs text-black/50 mt-1 line-clamp-1">
                                                    {service.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                {faqs.length > 0 && (
                    <section className="py-20 border-t border-black/5">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-4 mb-12">
                                <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                                    Sık Sorulan Sorular
                                </h2>
                                <div className="h-[1px] flex-1 bg-black/5" />
                            </div>
                            <div className="max-w-3xl">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="border-b border-black/5 py-6">
                                        <h3 className="font-semibold text-black mb-2">{faq.question}</h3>
                                        <p className="text-black/60 text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="py-24 bg-black mx-4 sm:mx-8 mb-16 rounded-2xl">
                    <div className="max-w-2xl mx-auto text-center px-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-4">
                            Etkinliğinizi Planlayalım
                        </p>
                        <p
                            className="text-3xl sm:text-4xl font-light text-white tracking-tighter leading-[1.1] uppercase mb-4"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            Projeniz için <br />
                            <span className="font-bold">Hemen Teklif Alın</span>
                        </p>
                        <p className="text-white/40 text-sm mb-8">
                            Size 24 saat içinde geri döneceğiz.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/iletisim"
                                className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs"
                            >
                                ETKİNLİĞİMİZİ PLANLAYALIM
                            </Link>
                            <a
                                href="tel:+905342334051"
                                className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition uppercase tracking-widest text-xs"
                            >
                                +90 534 233 4051
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
