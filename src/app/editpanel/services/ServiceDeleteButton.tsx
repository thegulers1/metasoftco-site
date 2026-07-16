"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ServiceDeleteButton({ serviceId, serviceTitle }: { serviceId: string; serviceTitle: string }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        if (!confirm(`"${serviceTitle}" hizmetini silmek istediğinizden emin misiniz?`)) return;

        setDeleting(true);
        try {
            const res = await fetch(`/api/services/${serviceId}`, { method: "DELETE" });
            if (res.ok) {
                router.refresh();
            } else {
                const errorText = await res.text();
                let message = "Silme işlemi başarısız oldu.";
                try {
                    message = JSON.parse(errorText).error || message;
                } catch { }
                alert(message);
            }
        } catch (error) {
            console.error("Error deleting service:", error);
            alert("Bir hata oluştu.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
        >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {deleting ? "Siliniyor..." : "Sil"}
        </button>
    );
}
