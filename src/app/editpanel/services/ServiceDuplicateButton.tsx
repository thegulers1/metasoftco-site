"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ServiceDuplicateButton({ serviceId, serviceTitle }: { serviceId: string; serviceTitle: string }) {
    const router = useRouter();
    const [duplicating, setDuplicating] = useState(false);

    async function handleDuplicate() {
        if (!confirm(`"${serviceTitle}" hizmetinin bir kopyası oluşturulacak (taslak olarak). Devam edilsin mi?`)) return;

        setDuplicating(true);
        try {
            const res = await fetch(`/api/services/${serviceId}/duplicate`, { method: "POST" });
            if (res.ok) {
                const copy = await res.json();
                router.push(`/editpanel/services/${copy.id}/edit`);
            } else {
                const errorText = await res.text();
                let message = "Kopyalama işlemi başarısız oldu.";
                try {
                    message = JSON.parse(errorText).error || message;
                } catch { }
                alert(message);
            }
        } catch (error) {
            console.error("Error duplicating service:", error);
            alert("Bir hata oluştu.");
        } finally {
            setDuplicating(false);
        }
    }

    return (
        <button
            onClick={handleDuplicate}
            disabled={duplicating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-black/5 text-black/70 rounded-lg hover:bg-black/10 transition disabled:opacity-50"
        >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {duplicating ? "Kopyalanıyor..." : "Kopyala"}
        </button>
    );
}
