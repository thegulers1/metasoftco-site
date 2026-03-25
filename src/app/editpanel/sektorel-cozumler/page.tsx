import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SectorPagesListPage() {
    const pages = await prisma.sectorPage.findMany({ orderBy: { order: "asc" } });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-black">Sektörel Çözümler</h1>
                    <p className="text-sm text-black/50 mt-1">{pages.length} sayfa</p>
                </div>
                <Link
                    href="/editpanel/sektorel-cozumler/new"
                    className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition"
                >
                    + Yeni Sayfa
                </Link>
            </div>

            {pages.length === 0 ? (
                <div className="bg-white rounded-xl border border-black/10 p-16 text-center">
                    <p className="text-black/40 text-sm">Henüz sektörel çözüm sayfası eklenmedi.</p>
                    <Link
                        href="/editpanel/sektorel-cozumler/new"
                        className="inline-block mt-4 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition"
                    >
                        İlk Sayfayı Ekle
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-black/10 bg-black/[0.02]">
                                <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">Başlık</th>
                                <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">Slug</th>
                                <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">Durum</th>
                                <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">Sıra</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {pages.map((page) => (
                                <tr key={page.id} className="hover:bg-black/[0.02] transition">
                                    <td className="px-6 py-4 font-medium text-black">{page.title}</td>
                                    <td className="px-6 py-4 text-black/50 font-mono text-xs">/sektorel-cozumler/{page.slug}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${page.published ? "bg-green-50 text-green-700" : "bg-black/5 text-black/50"}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${page.published ? "bg-green-500" : "bg-black/30"}`} />
                                            {page.published ? "Yayında" : "Taslak"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-black/50">{page.order}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3 justify-end">
                                            <a
                                                href={`/sektorel-cozumler/${page.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-black/40 hover:text-black transition"
                                            >
                                                Görüntüle ↗
                                            </a>
                                            <Link
                                                href={`/editpanel/sektorel-cozumler/${page.id}/edit`}
                                                className="px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-black/80 transition"
                                            >
                                                Düzenle
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
