import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getBlogPosts() {
    return prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export default async function AdminBlogPage() {
    const posts = await getBlogPosts();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-black">Blog Yazıları</h1>
                <Link
                    href="/editpanel/blog/new"
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition"
                >
                    + Yeni Yazı
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black/5">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Başlık
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Kategori
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Durum
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Tarih
                            </th>
                            <th className="text-right px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-black/50">
                                    Henüz blog yazısı yok. İlk yazını ekle!
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-black/[0.02]">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-black">
                                                {post.title}
                                            </p>
                                            <p className="text-sm text-black/50">
                                                /{post.slug}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-black/5 rounded text-xs text-black/70">
                                            {post.category || "Genel"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${post.published
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {post.published ? "Yayında" : "Taslak"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-black/70">
                                        {new Date(post.createdAt).toLocaleDateString("tr-TR")}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/editpanel/blog/${post.id}/edit`}
                                            className="text-sm text-blue-600 hover:underline mr-4"
                                        >
                                            Düzenle
                                        </Link>
                                        <button className="text-sm text-red-600 hover:underline">
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
