"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/providers/ToastProvider";

export default function QuoteRowActions({ id, number }: { id: string; number: string }) {
    const router = useRouter();
    const { showToast } = useToast();
    const [busy, setBusy] = useState(false);

    async function call(url: string, method: string) {
        setBusy(true);
        try {
            const res = await fetch(url, { method });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "İşlem başarısız");
            return data;
        } catch (error) {
            showToast((error as Error).message, "error");
            return null;
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex items-center gap-3 justify-end text-xs">
            <a href={`/api/quotes/${id}/pdf`} className="text-black/50 hover:text-black">
                PDF
            </a>
            <button
                type="button"
                disabled={busy}
                className="text-black/50 hover:text-black disabled:opacity-40"
                onClick={async () => {
                    const data = await call(`/api/quotes/${id}/duplicate`, "POST");
                    if (data) router.push(`/editpanel/teklifler/${data.id}`);
                }}
            >
                Kopyala
            </button>
            <button
                type="button"
                disabled={busy}
                className="text-red-500/70 hover:text-red-600 disabled:opacity-40"
                onClick={async () => {
                    if (!confirm(`${number} numaralı teklif silinsin mi?`)) return;
                    if (await call(`/api/quotes/${id}`, "DELETE")) {
                        showToast("Teklif silindi.", "success");
                        router.refresh();
                    }
                }}
            >
                Sil
            </button>
            <Link href={`/editpanel/teklifler/${id}`} className="px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition">
                Düzenle
            </Link>
        </div>
    );
}
