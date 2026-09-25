"use client";

export interface FaqItem { q: string; a: string; }

const rowInput = "px-3 py-2 bg-white border-0 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black";

export default function FaqListEditor({ items, onChange, addLabel }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void; addLabel: string }) {
    const update = (i: number, patch: Partial<FaqItem>) => onChange(items.map((item, j) => (j === i ? { ...item, ...patch } : item)));
    return (
        <div>
            <div className="flex justify-end mb-3">
                <button type="button" onClick={() => onChange([...items, { q: "", a: "" }])}
                    className="text-xs px-3 py-1.5 bg-black text-white rounded-lg hover:bg-black/80 transition">
                    {addLabel}
                </button>
            </div>
            <div className="space-y-4">
                {items.map((item, i) => (
                    <div key={i} className="p-4 bg-[#f5f5f5] rounded-xl space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-black/40 w-4">{i + 1}</span>
                            <input value={item.q} onChange={(e) => update(i, { q: e.target.value })} placeholder="Soru?" className={`flex-1 ${rowInput}`} />
                            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))}
                                className="text-black/30 hover:text-red-500 transition text-lg leading-none">×</button>
                        </div>
                        <textarea value={item.a} onChange={(e) => update(i, { a: e.target.value })} placeholder="Cevap..." rows={3}
                            className={`w-full ml-6 ${rowInput}`} style={{ width: "calc(100% - 1.5rem)" }} />
                    </div>
                ))}
                {items.length === 0 && <p className="text-sm text-black/30 text-center py-4">Henüz soru eklenmedi</p>}
            </div>
        </div>
    );
}
