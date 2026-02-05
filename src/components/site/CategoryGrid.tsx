import Link from "next/link";
import Container from "./Container";
import { serviceCategories } from "@/content/services";

export default function CategoryGrid() {
    return (
        <section className="py-12">
            <Container>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Ne yapıyoruz?
                    </h2>
                    <p className="mt-2 text-black/70 max-w-2xl">
                        MetasoftCo; etkinlik deneyimi, interaktif oyunlar ve yapay zeka tabanlı
                        içerik çözümleri üretir. Aşağıdan tüm kategorileri inceleyin.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {serviceCategories.map((c) => (
                        <Link
                            key={c.href}
                            href={c.href}
                            className="group rounded-2xl border border-black/10 p-5 hover:border-black transition"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h3 className="font-semibold tracking-tight">{c.title}</h3>
                                <span className="text-black/40 group-hover:text-black transition">
                                    →
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-black/70">{c.description}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {c.tags.map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full border border-black/10 px-2.5 py-1 text-xs text-black/70"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
