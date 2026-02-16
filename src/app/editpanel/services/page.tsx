import { prisma } from "@/lib/db";
import Link from "next/link";

async function getServicesWithCategories() {
    const categories = await prisma.serviceCategory.findMany({
        orderBy: { order: "asc" },
        include: {
            services: {
                orderBy: { order: "asc" },
            },
        },
    });
    return categories;
}

export default async function AdminServicesPage() {
    const categories = await getServicesWithCategories();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-black">Hizmetler</h1>
                <Link
                    href="/editpanel/services/new"
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition"
                >
                    + Yeni Hizmet
                </Link>
            </div>

            {categories.map((category) => (
                <div key={category.id} className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-black">
                            {category.name}
                        </h2>
                        <span className="text-sm text-black/50">
                            {category.services.length} hizmet
                        </span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-black/5">
                                <tr>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                        Hizmet
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                        Boyut
                                    </th>
                                    <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                        Sıra
                                    </th>
                                    <th className="text-right px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5">
                                {category.services.map((service) => (
                                    <tr key={service.id} className="hover:bg-black/[0.02]">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-black">
                                                    {service.title}
                                                </p>
                                                <p className="text-sm text-black/50">
                                                    {service.description || "-"}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-black/5 rounded text-xs text-black/70">
                                                {service.size}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-black/70">
                                            {service.order}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/editpanel/services/${service.id}/edit`}
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
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
