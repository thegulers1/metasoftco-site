"use client";

import { useState } from "react";

export interface ServiceOption {
    id: string;
    title: string;
    title_en: string | null;
    slug: string;
    image: string | null;
    category: { name: string; slug: string } | null;
}

const label = "block text-xs font-semibold text-black/60 uppercase tracking-wider mb-2";

export default function ServicePicker({
    allServices,
    selectedIds,
    onChange,
}: {
    allServices: ServiceOption[];
    selectedIds: string[];
    onChange: (ids: string[]) => void;
}) {
    const [search, setSearch] = useState("");

    const toggleService = (id: string) => {
        onChange(selectedIds.includes(id)
            ? selectedIds.filter((s) => s !== id)
            : [...selectedIds, id]
        );
    };

    const selectedServices = allServices.filter((s) => selectedIds.includes(s.id));
    const filteredServices = allServices.filter((s) =>
        !selectedIds.includes(s.id) &&
        (s.title.toLowerCase().includes(search.toLowerCase()) ||
            (s.title_en || "").toLowerCase().includes(search.toLowerCase()) ||
            (s.category?.name || "").toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="max-w-3xl space-y-6">
            <p className="text-xs text-black/40">
                Seçilen hizmetler, yazının altında "Önerilen Hizmetler" olarak gösterilir.
            </p>

            {selectedServices.length > 0 && (
                <div>
                    <label className={label}>Seçilen Hizmetler ({selectedServices.length})</label>
                    <div className="space-y-2">
                        {selectedServices.map((s) => (
                            <div key={s.id} className="flex items-center gap-3 p-3 bg-black/[0.02] border border-black/10 rounded-lg">
                                {s.image && (
                                    <img src={s.image} alt={s.title} className="w-12 h-10 object-cover rounded flex-none" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-black truncate">{s.title}</p>
                                    {s.category && <p className="text-xs text-black/40 uppercase tracking-widest">{s.category.name}</p>}
                                </div>
                                <button type="button" onClick={() => toggleService(s.id)} className="flex-none text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition">
                                    Çıkar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <label className={label}>Hizmet Ekle</label>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Hizmet adı veya kategori ile ara..."
                    className="w-full border border-black/15 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/40 mb-3"
                />
                {allServices.length === 0 ? (
                    <p className="text-sm text-black/40 py-4 text-center">Hizmetler yükleniyor...</p>
                ) : filteredServices.length === 0 ? (
                    <p className="text-sm text-black/40 py-4 text-center">Sonuç bulunamadı.</p>
                ) : (
                    <div className="border border-black/10 rounded-xl overflow-hidden divide-y divide-black/5 max-h-[420px] overflow-y-auto">
                        {filteredServices.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                onClick={() => toggleService(s.id)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-black/[0.03] transition text-left"
                            >
                                {s.image ? (
                                    <img src={s.image} alt={s.title} className="w-12 h-10 object-cover rounded flex-none" />
                                ) : (
                                    <div className="w-12 h-10 bg-black/10 rounded flex-none flex items-center justify-center text-black/30 text-xs font-bold">
                                        {s.title.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-black truncate">{s.title}</p>
                                    {s.category && <p className="text-xs text-black/40 uppercase tracking-widest">{s.category.name}</p>}
                                </div>
                                <span className="flex-none w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-lg leading-none">+</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
