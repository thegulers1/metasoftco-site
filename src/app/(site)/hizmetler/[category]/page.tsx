import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/site";
import Link from "next/link";
import { AdminEditUrlSetter } from "@/components/site/AdminBar";
import CtaSection from "@/components/site/CtaSection";

export const revalidate = 3600;

const CATEGORY_ACCENT: Record<string, string> = {
    "yapay-zeka-etkinlik-cozumleri": "#7c3aed",
    "photobooth-ve-fotograf-aktivasyonlari": "#e879f9",
    "interaktif-etkinlik-aktiviteleri": "#fb923c",
};

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
            services: { where: { published: true }, orderBy: { order: "asc" } },
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
            images: [{ url: `${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: "summary_large_image", title, description, images: [`${siteConfig.url}/og?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(description.slice(0, 120))}`] },
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
    const c1 = CATEGORY_ACCENT[categorySlug] || "#22d3ee";

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

            <div className="min-h-screen bg-[#0a0a0f]">
                {/* Hero */}
                <section className="relative overflow-hidden bg-[#0a0a0f]">
                    <div
                        className="aurora-blob aurora-drift"
                        style={{ width: 640, height: 640, top: "-18%", left: "4%", background: `radial-gradient(circle, ${c1}59, transparent 70%)` }}
                    />
                    <div
                        className="aurora-blob aurora-drift2"
                        style={{ width: 560, height: 560, top: "-12%", right: "0%", background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)" }}
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(180deg, rgba(10,10,15,.1), rgba(10,10,15,.84))" }}
                    />

                    <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12 pt-32 pb-16">
                        <nav
                            className="flex items-center gap-2 mb-8 text-[rgba(255,255,255,.4)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase" }}
                        >
                            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
                            <span>/</span>
                            <Link href="/hizmetler" className="hover:text-white transition-colors">Hizmetler</Link>
                            <span>/</span>
                            <span className="text-white/70">{category.name}</span>
                        </nav>

                        <div className="max-w-[920px]">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px] mb-[26px]">
                                <span className="h-[7px] w-[7px] rounded-full" style={{ background: c1, boxShadow: `0 0 10px ${c1}` }} />
                                <span
                                    className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                                >
                                    {category.services.length} HİZMET
                                </span>
                            </div>

                            <h1
                                className="text-white font-bold tracking-[-0.02em] leading-[0.98]"
                                style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(36px, 6vw, 64px)" }}
                            >
                                {category.heroTitle || category.name}
                            </h1>

                            {category.heroContent && (
                                <p
                                    className="mt-[22px] max-w-[640px] text-[rgba(255,255,255,.64)]"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 18, lineHeight: 1.55 }}
                                >
                                    {category.heroContent}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {category.services.map((service) => (
                            <Link
                                key={service.id}
                                href={`/hizmetler/${categorySlug}/${service.slug}`}
                                className="group relative flex flex-col rounded-[20px] overflow-hidden border border-white/10 transition-all duration-[.4s] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-3 hover:border-white/30"
                                style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden bg-[#14141d]">
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div
                                            className="absolute inset-0"
                                            style={{
                                                backgroundImage:
                                                    "repeating-linear-gradient(135deg,#14141d,#14141d 11px,#1a1a25 11px,#1a1a25 22px)",
                                            }}
                                        />
                                    )}
                                    <div
                                        className="absolute inset-0 pointer-events-none opacity-[.34]"
                                        style={{ background: `radial-gradient(circle at 72% 20%, ${c1}, transparent 64%)` }}
                                    />
                                </div>
                                <div className="flex flex-col flex-1 px-[22px] pt-[22px] pb-6">
                                    <div className="flex items-start justify-between gap-3 mb-2.5">
                                        <div
                                            className="text-white"
                                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 19, lineHeight: 1.2, fontWeight: 600 }}
                                        >
                                            {service.title}
                                        </div>
                                        <span className="text-[17px] font-semibold text-[var(--acc)] shrink-0">→</span>
                                    </div>
                                    {service.description && (
                                        <p
                                            className="text-[rgba(255,255,255,.55)]"
                                            style={{ fontFamily: "var(--font-manrope)", fontSize: 13.5, lineHeight: 1.55 }}
                                        >
                                            {service.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* FAQ */}
                {faqs.length > 0 && (
                    <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 pb-20 sm:pb-24 border-t border-white/[0.08] pt-16">
                        <span
                            className="text-[12px] uppercase tracking-[0.14em] text-[var(--acc)]"
                            style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                        >
                            SIK SORULAN SORULAR
                        </span>
                        <div className="max-w-[760px] mt-8">
                            {faqs.map((faq, i) => (
                                <div key={i} className="border-b border-white/[0.08] py-6">
                                    <h3
                                        className="text-white mb-2"
                                        style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 17, fontWeight: 600 }}
                                    >
                                        {faq.question}
                                    </h3>
                                    <p
                                        className="text-[rgba(255,255,255,.55)]"
                                        style={{ fontFamily: "var(--font-manrope)", fontSize: 14.5, lineHeight: 1.65 }}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <CtaSection />
            </div>
        </>
    );
}
