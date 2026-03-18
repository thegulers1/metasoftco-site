import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { siteConfig, generateBreadcrumbSchema } from "@/lib/site";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ category: string }>;
}

async function getCategoryBySlugEn(slugEn: string) {
    return prisma.serviceCategory.findFirst({
        where: { slug_en: slugEn },
        include: { services: { orderBy: { order: "asc" } } },
    });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlugEn } = await params;
    const category = await getCategoryBySlugEn(categorySlugEn);
    if (!category) return {};

    const title = category.metaTitle_en || category.metaTitle || `${category.name_en || category.name} | MetasoftCo`;
    const description = category.metaDescription_en || category.metaDescription || siteConfig.description;
    const url = `${siteConfig.url}/en/services/${categorySlugEn}`;

    return {
        title,
        description,
        keywords: category.metaKeywords_en || undefined,
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            locale: "en_US",
            type: "website",
        },
        alternates: {
            canonical: url,
            languages: {
                "x-default": `${siteConfig.url}/hizmetler/${category.slug}`,
                tr: `${siteConfig.url}/hizmetler/${category.slug}`,
                en: url,
            },
        },
    };
}

export default async function EnCategoryHubPage({ params }: PageProps) {
    const { category: categorySlugEn } = await params;
    const category = await getCategoryBySlugEn(categorySlugEn);

    if (!category) notFound();

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: `${siteConfig.url}/en` },
        { name: "Services", url: `${siteConfig.url}/en/services` },
        { name: category.name_en || category.name, url: `${siteConfig.url}/en/services/${categorySlugEn}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <main className="min-h-screen bg-white">
                {/* Hero */}
                <section className="pt-36 pb-20 border-b border-black/5">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/40 font-bold mb-10">
                            <Link href="/en" className="hover:text-black transition">Home</Link>
                            <span>/</span>
                            <Link href="/en/services" className="hover:text-black transition">Services</Link>
                            <span>/</span>
                            <span className="text-black">{category.name_en || category.name}</span>
                        </nav>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-600 mb-6 border border-red-600/10">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                            {category.name_en || category.name}
                        </span>

                        <h1
                            className="text-4xl sm:text-6xl lg:text-7xl font-light text-black tracking-tighter leading-[1.05] uppercase mb-8 max-w-4xl"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            {category.name_en || category.name}
                        </h1>

                        {(category.metaDescription_en || category.heroContent) && (
                            <p className="text-lg text-black/60 leading-relaxed max-w-3xl">
                                {category.metaDescription_en || category.heroContent}
                            </p>
                        )}
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-xs uppercase tracking-[0.3em] text-black/40 font-semibold">
                                {category.services.length} Services
                            </h2>
                            <div className="h-[1px] flex-1 bg-black/5" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {category.services.map((service) => (
                                <Link
                                    key={service.id}
                                    href={
                                        service.slug_en
                                            ? `/en/services/${categorySlugEn}/${service.slug_en}`
                                            : `/hizmetler/${category.slug}/${service.slug}`
                                    }
                                    className="group block relative aspect-[4/3] overflow-hidden bg-neutral-100"
                                >
                                    {service.image ? (
                                        <img
                                            src={service.image}
                                            alt={service.title_en || service.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center p-8">
                                            <span
                                                className="text-white text-3xl font-bold uppercase tracking-tighter text-center leading-tight"
                                                style={{ fontFamily: "var(--font-inter-tight)" }}
                                            >
                                                {service.title_en || service.title}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute bottom-5 left-0">
                                        <div className="bg-white px-6 py-4 border-y border-r border-black/5">
                                            <h3
                                                className="text-lg font-bold text-red-600 uppercase tracking-tighter leading-none"
                                                style={{ fontFamily: "var(--font-inter-tight)" }}
                                            >
                                                {service.title_en || service.title}
                                            </h3>
                                            {(service.description_en || service.description) && (
                                                <p className="text-xs text-black/50 mt-1 line-clamp-1">
                                                    {service.description_en || service.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-black mx-4 sm:mx-8 mb-16 rounded-2xl">
                    <div className="max-w-2xl mx-auto text-center px-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-semibold mb-4">
                            Let&apos;s Plan Your Event
                        </p>
                        <p
                            className="text-3xl sm:text-4xl font-light text-white tracking-tighter leading-[1.1] uppercase mb-4"
                            style={{ fontFamily: "var(--font-inter-tight)" }}
                        >
                            Get a Quote <br />
                            <span className="font-bold">For Your Project</span>
                        </p>
                        <p className="text-white/40 text-sm mb-8">
                            We&apos;ll get back to you within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/en/contact"
                                className="inline-flex items-center justify-center px-10 py-4 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition uppercase tracking-widest text-xs"
                            >
                                PLAN MY EVENT
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
            </main>
        </>
    );
}
