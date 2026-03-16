import { prisma } from "@/lib/db";
import Link from "next/link";
import { ServiceFeaturedToggle } from "./ServiceFeaturedToggle";

export const dynamic = 'force-dynamic';

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
                                    <th className="text-center px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                        Anasayfa
                                    </th>
                                    <th className="text-center px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                        A.Sayfa Sırası
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
                                            <p className="font-medium text-black">
                                                {service.title}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <ServiceFeaturedToggle
                                                serviceId={service.id}
                                                initialFeatured={service.featured}
                                                initialFeaturedOrder={service.featuredOrder}
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <ServiceFeaturedToggle
                                                serviceId={service.id}
                                                initialFeatured={service.featured}
                                                initialFeaturedOrder={service.featuredOrder}
                                                orderOnly
                                            />
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
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/editpanel/services/${service.id}/edit`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-black text-white rounded-lg hover:bg-black/80 transition"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Düzenle
                                                </Link>
                                                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    Sil
                                                </button>
                                            </div>
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
