"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/ToastProvider";
import { OUTPUT_TYPE_LABELS, newId, type OutputType } from "@/lib/quotes";

interface Inclusion {
    id: string;
    label: string;
    outputTypes: string[];
    defaultOn: boolean;
}

interface Shipping {
    id: string;
    city: string;
    amount: number | null;
}

interface Settings {
    inclusions: Inclusion[];
    shipping: Shipping[];
    defaults: { validityDays: number; notes: string };
}

const input =
    "w-full px-3 py-2 text-sm bg-white border border-black/15 rounded-lg focus:outline-none focus:border-black transition";
const card = "bg-white rounded-xl border border-black/10 p-6";
const OUTPUT_TYPES = Object.keys(OUTPUT_TYPE_LABELS) as OutputType[];

function move<T>(list: T[], index: number, delta: number) {
    const next = [...list];
    const target = index + delta;
    if (target < 0 || target >= next.length) return list;
    [next[index], next[target]] = [next[target], next[index]];
    return next;
}

export default function QuoteSettingsForm({ initial }: { initial: Settings }) {
    const router = useRouter();
    const { showToast } = useToast();
    const [inclusions, setInclusions] = useState(initial.inclusions);
    const [shipping, setShipping] = useState(initial.shipping);
    const [defaults, setDefaults] = useState(initial.defaults);
    const [saving, setSaving] = useState(false);

    const patchInclusion = (id: string, patch: Partial<Inclusion>) =>
        setInclusions((list) => list.map((inc) => (inc.id === id ? { ...inc, ...patch } : inc)));
    const patchShipping = (id: string, patch: Partial<Shipping>) =>
        setShipping((list) => list.map((r) => (r.id === id ? { ...r, ...patch } : r)));

    async function save() {
        setSaving(true);
        try {
            const res = await fetch("/api/quotes/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inclusions, shipping, defaults }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Ayarlar kaydedilemedi");
            showToast("Teklif ayarları kaydedildi.", "success");
            router.refresh();
        } catch (error) {
            showToast((error as Error).message, "error");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-6 max-w-4xl">
            <section className={card}>
                <h2 className="text-sm font-semibold text-black">Bütçeye dahil olanlar</h2>
                <p className="text-xs text-black/50 mt-1 mb-4">
                    Teklife ürün eklerken bu maddeler listelenir. &quot;Otomatik seçili&quot; işaretli maddeler, ürünün çıktı türü
                    (hizmet düzenleme ekranındaki ayar) uyuyorsa işaretli gelir. Hiçbir tür seçilmezse her üründe işaretli gelir.
                </p>
                <div className="space-y-2">
                    {inclusions.map((inc, i) => (
                        <div key={inc.id} className="flex flex-wrap items-center gap-2 border border-black/10 rounded-lg p-2">
                            <div className="flex flex-col">
                                <button type="button" className="text-[10px] text-black/30 hover:text-black leading-none" onClick={() => setInclusions((l) => move(l, i, -1))}>▲</button>
                                <button type="button" className="text-[10px] text-black/30 hover:text-black leading-none" onClick={() => setInclusions((l) => move(l, i, 1))}>▼</button>
                            </div>
                            <input className={`${input} flex-1 min-w-60`} value={inc.label} onChange={(e) => patchInclusion(inc.id, { label: e.target.value })} />
                            <label className="flex items-center gap-1.5 text-xs text-black/60">
                                <input type="checkbox" checked={inc.defaultOn} onChange={(e) => patchInclusion(inc.id, { defaultOn: e.target.checked })} />
                                Otomatik seçili
                            </label>
                            <div className="flex gap-1">
                                {OUTPUT_TYPES.map((t) => {
                                    const on = inc.outputTypes.includes(t);
                                    return (
                                        <button
                                            key={t}
                                            type="button"
                                            disabled={!inc.defaultOn}
                                            onClick={() => patchInclusion(inc.id, { outputTypes: on ? inc.outputTypes.filter((x) => x !== t) : [...inc.outputTypes, t] })}
                                            className={`px-2 py-1 text-[11px] rounded-full border transition disabled:opacity-30 ${on ? "bg-black text-white border-black" : "text-black/50 border-black/15"}`}
                                        >
                                            {OUTPUT_TYPE_LABELS[t]}
                                        </button>
                                    );
                                })}
                            </div>
                            <button type="button" className="px-2 text-black/30 hover:text-red-600" onClick={() => setInclusions((l) => l.filter((x) => x.id !== inc.id))}>
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="mt-3 text-xs font-medium text-black/60 hover:text-black"
                    onClick={() => setInclusions((l) => [...l, { id: newId(), label: "", outputTypes: [], defaultOn: true }])}
                >
                    + Madde ekle
                </button>
            </section>

            <section className={card}>
                <h2 className="text-sm font-semibold text-black">Nakliye tutarları</h2>
                <p className="text-xs text-black/50 mt-1 mb-4">
                    Teklifte şehir seçilince tutar buradan gelir (KDV hariç). Boş bırakılan şehirde tutarı teklif ekranında elle girersiniz.
                </p>
                <div className="grid grid-cols-2 gap-2">
                    {shipping.map((rate) => (
                        <div key={rate.id} className="flex gap-2">
                            <input className={input} value={rate.city} onChange={(e) => patchShipping(rate.id, { city: e.target.value })} placeholder="Şehir" />
                            <input
                                className={`${input} w-36`}
                                type="number"
                                min={0}
                                value={rate.amount === null ? "" : rate.amount}
                                onChange={(e) => patchShipping(rate.id, { amount: e.target.value === "" ? null : Number(e.target.value) })}
                                placeholder="TL"
                            />
                            <button type="button" className="px-2 text-black/30 hover:text-red-600" onClick={() => setShipping((l) => l.filter((x) => x.id !== rate.id))}>
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="mt-3 text-xs font-medium text-black/60 hover:text-black"
                    onClick={() => setShipping((l) => [...l, { id: newId(), city: "", amount: null }])}
                >
                    + Şehir ekle
                </button>
            </section>

            <section className={card}>
                <h2 className="text-sm font-semibold text-black">Genel</h2>
                <div className="grid grid-cols-[160px_1fr] gap-4 mt-4">
                    <div>
                        <label className="block text-xs font-medium text-black/60 mb-1">Geçerlilik (gün)</label>
                        <input
                            className={input}
                            type="number"
                            min={1}
                            value={defaults.validityDays}
                            onChange={(e) => setDefaults((d) => ({ ...d, validityDays: Number(e.target.value) }))}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-black/60 mb-1">Her teklifin altına eklenen notlar (satır başına bir not)</label>
                        <textarea
                            className={`${input} min-h-32`}
                            value={defaults.notes}
                            onChange={(e) => setDefaults((d) => ({ ...d, notes: e.target.value }))}
                        />
                        <p className="text-[11px] text-black/40 mt-1">&quot;Tutarlar KDV hariçtir; %20 KDV ayrıca eklenir.&quot; notu her zaman en üstte yer alır.</p>
                    </div>
                </div>
            </section>

            <button
                type="button"
                onClick={save}
                disabled={saving}
                className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50"
            >
                {saving ? "Kaydediliyor…" : "Ayarları kaydet"}
            </button>
        </div>
    );
}
