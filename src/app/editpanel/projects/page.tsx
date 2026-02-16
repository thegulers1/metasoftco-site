import { prisma } from "@/lib/db";
import Link from "next/link";

async function getProjects() {
    const projects = await prisma.project.findMany({
        orderBy: [
            { featured: "desc" },
            { order: "asc" },
            { createdAt: "desc" },
        ],
    });
    return projects;
}

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-black">Projeler</h1>
                <Link
                    href="/editpanel/projects/new"
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition"
                >
                    + Yeni Proje
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black/5">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Proje
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Kategori
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Müşteri
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Tarih
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Durum
                            </th>
                            <th className="text-right px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-black/[0.02]">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {project.image && (
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/5 flex-shrink-0">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium text-black">
                                                {project.title}
                                            </p>
                                            <p className="text-sm text-black/50">
                                                {project.description || "-"}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {project.category ? (
                                        <span className="px-2 py-1 bg-black/5 rounded text-xs text-black/70">
                                            {project.category}
                                        </span>
                                    ) : (
                                        <span className="text-sm text-black/30">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-black/70">
                                    {project.client || "-"}
                                </td>
                                <td className="px-6 py-4 text-sm text-black/70">
                                    {project.projectDate
                                        ? new Date(project.projectDate).toLocaleDateString("tr-TR")
                                        : "-"}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {project.featured && (
                                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                                                ⭐ Öne Çıkan
                                            </span>
                                        )}
                                        {project.published ? (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">
                                                ✓ Yayında
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                                                Taslak
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        href={`/editpanel/projects/${project.id}/edit`}
                                        className="text-sm text-blue-600 hover:underline mr-4"
                                    >
                                        Düzenle
                                    </Link>
                                    <button className="text-sm text-red-600 hover:underline">
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-black/40">
                                    Henüz proje eklenmemiş. Yeni proje eklemek için yukarıdaki butonu kullanın.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
