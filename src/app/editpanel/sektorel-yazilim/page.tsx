import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function IndustryPagesListPage() {
    const pages = await prisma.industryPage.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-black">Sektörel Yazılım</h1>
                    <p className="text-sm text-black/50 mt-1">
                        {pages.length} sayfa · <a href="/sektorel-yazilim-cozumleri" target="_blank" rel="noopener noreferrer" className="hover:text-black">/sektorel-yazilim-cozumleri ↗</a>
                    </p>
                </div>
                <Link href="/editpanel/sektorel-yazilim/new"
                    className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition">
                    + Yeni Sektör
                </Link>
            </div>

            <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-black/10 bg-black/[0.02]">
                            <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">Sektör</th>
                            <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">Slug</th>
                            <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">EN</th>
                            <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">Durum</th>
                            <th className="text-left px-6 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">Sıra</th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {pages.map((page) => (
                            <tr key={page.id} className="hover:bg-black/[0.02] transition">
                                <td className="px-6 py-4 font-medium text-black">{page.name}</td>
                                <td className="px-6 py-4 text-black/50 font-mono text-xs">{page.slug}</td>
                                <td className="px-6 py-4 text-black/50 text-xs">{page.slug_en && page.title_en && page.intro_en ? "✓" : "–"}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${page.published ? "bg-green-50 text-green-700" : "bg-black/5 text-black/50"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${page.published ? "bg-green-500" : "bg-black/30"}`} />
                                        {page.published ? "Yayında" : "Taslak"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-black/50">{page.order}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3 justify-end">
                                        <a href={`/sektorel-yazilim-cozumleri/${page.slug}`} target="_blank" rel="noopener noreferrer"
                                            className="text-xs text-black/40 hover:text-black transition">Görüntüle ↗</a>
                                        <Link href={`/editpanel/sektorel-yazilim/${page.id}/edit`}
                                            className="px-3 py-1.5 bg-black text-white text-xs rounded-lg hover:bg-black/80 transition">Düzenle</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {pages.length === 0 && <p className="text-black/40 text-sm text-center py-16">Henüz sektör sayfası yok.</p>}
            </div>
        </div>
    );
}
