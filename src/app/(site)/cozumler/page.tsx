import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { sectors } from "./data";

export const metadata: Metadata = {
    title: "Sektörel Çözümler | MetasoftCo",
    description:
        "Tekstil, sağlık, gıda, otomotiv, perakende, finans ve teknoloji sektörlerine özel interaktif etkinlik teknolojileri ve yazılım çözümleri. MetasoftCo sektörünüzü anlıyor.",
    keywords: [
        "sektörel yazılım çözümleri",
        "sektöre özel etkinlik teknolojisi",
        "interaktif etkinlik çözümleri",
        "marka aktivasyonu çözümleri türkiye",
    ],
    openGraph: {
        title: "Sektörel Çözümler | MetasoftCo",
        description: "Sektörünüze özel interaktif etkinlik ve yazılım çözümleri.",
        url: `${siteConfig.url}/cozumler`,
        siteName: siteConfig.name,
        images: [{ url: `${siteConfig.url}/og?title=Sektörel+Çözümler&desc=Sektörünüze+özel+dijital+deneyimler`, width: 1200, height: 630 }],
        locale: siteConfig.locale,
        type: "website",
    },
    alternates: { canonical: `${siteConfig.url}/cozumler` },
};

export default function CozumlerPage() {
    return (
        <div className="bg-white min-h-screen pt-24 pb-24">
            <div className="mx-auto max-w-7xl px-6 sm:px-8">
                {/* Header */}
                <div className="mb-16">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 mb-3">Sektörel Çözümler</p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-none mb-6">
                        Sektörünüzü<br />
                        <span className="text-red-600">Anlıyoruz</span>
                    </h1>
                    <p className="text-lg text-black/60 max-w-2xl">
                        Her sektörün dinamikleri farklıdır. Tekstilden sağlığa, otomotivden finansa kadar sektörünüze
                        özel interaktif etkinlik teknolojileri ve yazılım çözümleri sunuyoruz.
                    </p>
                </div>

                {/* Sector Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sectors.map((sector) => (
                        <Link
                            key={sector.slug}
                            href={`/cozumler/${sector.slug}`}
                            className="group block border border-black/10 p-6 hover:border-red-600 hover:bg-red-600 transition-all duration-300"
                        >
                            <h2 className="text-xl font-bold text-black group-hover:text-white mb-2 tracking-tight">
                                {sector.name}
                            </h2>
                            <p className="text-sm text-black/50 group-hover:text-white/80 line-clamp-2">
                                {sector.heroSubtitle}
                            </p>
                            <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-red-600 group-hover:text-white">
                                Çözümleri Gör →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
