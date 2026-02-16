import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getStats() {
    const [servicesCount, categoriesCount, blogCount, contactsCount] = await Promise.all([
        prisma.service.count(),
        prisma.serviceCategory.count(),
        prisma.blogPost.count(),
        prisma.contactSubmission.count(),
    ]);

    return { servicesCount, categoriesCount, blogCount, contactsCount };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="text-2xl font-bold text-black mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-black/50 mb-1">Kategoriler</p>
                    <p className="text-3xl font-bold text-black">{stats.categoriesCount}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-black/50 mb-1">Hizmetler</p>
                    <p className="text-3xl font-bold text-black">{stats.servicesCount}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-black/50 mb-1">Blog Yazıları</p>
                    <p className="text-3xl font-bold text-black">{stats.blogCount}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-black/50 mb-1">İletişim Mesajları</p>
                    <p className="text-3xl font-bold text-black">{stats.contactsCount}</p>
                </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-black mb-4">Hoş Geldin!</h2>
                <p className="text-black/60">
                    Sol menüden hizmetleri, blog yazılarını ve iletişim mesajlarını yönetebilirsin.
                </p>
            </div>
        </div>
    );
}
