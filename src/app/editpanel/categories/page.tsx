"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
    slug: string;
    order: number;
    // Add other fields if needed for display
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const res = await fetch("/api/services/categories");
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) return;

        try {
            const res = await fetch(`/api/services/categories/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setCategories(categories.filter((c) => c.id !== id));
            } else {
                alert("Silme işlemi başarısız oldu.");
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("Bir hata oluştu.");
        }
    }

    if (loading) {
        return <div className="text-center py-8">Yükleniyor...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-black">Hizmet Kategorileri</h1>
                <Link
                    href="/editpanel/categories/new"
                    className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition"
                >
                    + Yeni Kategori
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-black/5">
                        <tr>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Sıra
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Kategori Adı
                            </th>
                            <th className="text-left px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="text-right px-6 py-3 text-xs font-medium text-black/50 uppercase tracking-wider">
                                İşlemler
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-black/50">
                                    Henüz kategori yok.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id} className="hover:bg-black/[0.02]">
                                    <td className="px-6 py-4 text-sm text-black/70">
                                        {category.order}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-black">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-black/50">
                                        /{category.slug}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/editpanel/categories/${category.id}/edit`}
                                            className="text-sm text-blue-600 hover:underline mr-4"
                                        >
                                            Düzenle
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="text-sm text-red-600 hover:underline"
                                        >
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
