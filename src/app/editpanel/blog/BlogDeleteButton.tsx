"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BlogDeleteButton({ postId, postTitle }: { postId: string; postTitle: string }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        if (!confirm(`"${postTitle}" yazısını silmek istediğinizden emin misiniz?`)) return;

        setDeleting(true);
        try {
            const res = await fetch(`/api/blog/${postId}`, { method: "DELETE" });
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
            console.error("Error deleting blog post:", error);
            alert("Bir hata oluştu.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-red-600 hover:underline disabled:opacity-50"
        >
            {deleting ? "Siliniyor..." : "Sil"}
        </button>
    );
}
