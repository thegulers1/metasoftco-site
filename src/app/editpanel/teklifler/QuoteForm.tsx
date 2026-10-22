"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/ToastProvider";
import {
    QUOTE_STATUSES,
    defaultInclusionsFor,
    formatTL,
    newId,
    optionLetter,
    optionTotals,
    type QuoteItem,
    type QuoteOption,
} from "@/lib/quotes";

export interface QuoteFormProduct {
    id: string;
    title: string;
    description: string;
    image: string | null;
    outputType: string;
    published: boolean;
    category: string;
}

export interface QuoteFormSettings {
    inclusions: { id: string; label: string; outputTypes: string[]; defaultOn: boolean }[];
    shipping: { id: string; city: string; amount: number | null }[];
}

export interface QuoteFormValues {
    id?: string;
    number?: string;
    status: string;
    company: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    eventName: string;
    eventDate: string;
    city: string;
    venue: string;
    shippingAmount: string;
    vatRate: number;
    validUntil: string;
    notes: string;
    options: QuoteOption[];
}

const input =
    "w-full px-3 py-2 text-sm bg-white border border-black/15 rounded-lg focus:outline-none focus:border-black transition";
const label = "block text-xs font-medium text-black/60 mb-1";
const card = "bg-white rounded-xl border border-black/10 p-6";

/** First sentences of a product description, short enough for a quote line. */
function shortDescription(text: string, max = 220) {
    const clean = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (clean.length <= max) return clean;
    let out = "";
    for (const sentence of clean.match(/[^.!?]+[.!?]+/g) ?? []) {
        if ((out + sentence).length > max) break;
        out += sentence;
    }
    return out.trim() || `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function emptyOption(): QuoteOption {
    return { id: newId(), title: "", items: [], extras: [], discount: 0 };
}

export default function QuoteForm({
    initial,
    products,
    settings,
}: {
    initial: QuoteFormValues;
    products: QuoteFormProduct[];
    settings: QuoteFormSettings;
}) {
    const router = useRouter();
    const { showToast } = useToast();
    const [values, setValues] = useState<QuoteFormValues>(() => ({
        ...initial,
        options: initial.options.length ? initial.options : [emptyOption()],
    }));
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState(false);

    const productById = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
    const productGroups = useMemo(() => {
        const groups = new Map<string, QuoteFormProduct[]>();
        for (const p of products) groups.set(p.category, [...(groups.get(p.category) ?? []), p]);
        return [...groups];
    }, [products]);

    const set = <K extends keyof QuoteFormValues>(key: K, value: QuoteFormValues[K]) => {
        setValues((v) => ({ ...v, [key]: value }));
        setDirty(true);
    };

    const updateOption = (optionId: string, update: (o: QuoteOption) => QuoteOption) =>
        set("options", values.options.map((o) => (o.id === optionId ? update(o) : o)));

    const updateItem = (optionId: string, itemId: string, patch: Partial<QuoteItem>) =>
        updateOption(optionId, (o) => ({ ...o, items: o.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) }));

    const addItem = (optionId: string, productId: string) => {
        const product = productById.get(productId);
        const item: QuoteItem = {
            id: newId(),
            serviceId: product?.id ?? null,
            // Service titles are SEO titles ("AI Photo Kiralama | Etkinlik …"); keep the product name.
            title: product?.title.split(" | ")[0].replace(/\s+Kiralama$/i, "").trim() ?? "",
            description: product ? shortDescription(product.description) : "",
            image: product?.image ?? null,
            quantity: 1,
            days: 1,
            amount: 0,
            inclusions: defaultInclusionsFor(settings.inclusions, product?.outputType ?? null),
            note: "",
        };
        updateOption(optionId, (o) => ({ ...o, items: [...o.items, item] }));
    };

    const onCityChange = (city: string) => {
        const rate = settings.shipping.find((r) => r.city.toLocaleLowerCase("tr") === city.trim().toLocaleLowerCase("tr"));
        setValues((v) => ({
            ...v,
            city,
            shippingAmount: rate ? (rate.amount === null ? "" : String(rate.amount)) : v.shippingAmount,
        }));
        setDirty(true);
    };

    const shippingAmount = values.shippingAmount.trim() === "" ? null : Number(values.shippingAmount);
    const totalsCtx = { vatRate: values.vatRate, city: values.city.trim() || null, shippingAmount };

    async function save(): Promise<string | null> {
        if (!values.company.trim()) {
            showToast("Firma adı zorunludur.", "error");
            return null;
        }
        setSaving(true);
        try {
            const res = await fetch(values.id ? `/api/quotes/${values.id}` : "/api/quotes", {
                method: values.id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, shippingAmount }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Teklif kaydedilemedi");
            setDirty(false);
            if (!values.id) {
                setValues((v) => ({ ...v, id: data.id, number: data.number }));
                showToast(`Teklif ${data.number} oluşturuldu.`, "success");
                router.replace(`/editpanel/teklifler/${data.id}`);
            } else {
                showToast("Teklif kaydedildi.", "success");
                router.refresh();
            }
            return data.id as string;
        } catch (error) {
            showToast((error as Error).message, "error");
            return null;
        } finally {
            setSaving(false);
        }
    }

    async function openPdf(inline: boolean) {
        // Open the tab before awaiting so the popup blocker allows it.
        const tab = inline ? window.open("about:blank", "_blank") : null;
        const id = dirty || !values.id ? await save() : values.id;
        if (!id) return tab?.close();
        const url = `/api/quotes/${id}/pdf${inline ? "?inline=1" : ""}`;
        if (tab) tab.location.href = url;
        else window.location.href = url;
    }

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 items-start">
            <div className="space-y-6">
                <section className={card}>
                    <h2 className="text-sm font-semibold text-black mb-4">Müşteri</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className={label}>Firma *</label>
                            <input className={input} value={values.company} onChange={(e) => set("company", e.target.value)} placeholder="Örn. Acme İletişim A.Ş." />
                        </div>
                        <div>
                            <label className={label}>Yetkili</label>
                            <input className={input} value={values.contactName} onChange={(e) => set("contactName", e.target.value)} />
                        </div>
                        <div>
                            <label className={label}>Telefon</label>
                            <input className={input} value={values.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
                        </div>
                        <div className="col-span-2">
                            <label className={label}>E-posta</label>
                            <input className={input} type="email" value={values.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
                        </div>
                    </div>
                </section>

                <section className={card}>
                    <h2 className="text-sm font-semibold text-black mb-4">Etkinlik</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={label}>Etkinlik adı</label>
                            <input className={input} value={values.eventName} onChange={(e) => set("eventName", e.target.value)} placeholder="Örn. Bayi Toplantısı 2026" />
                        </div>
                        <div>
                            <label className={label}>Tarih</label>
                            <input className={input} value={values.eventDate} onChange={(e) => set("eventDate", e.target.value)} placeholder="Örn. 12–13 Kasım 2026" />
                        </div>
                        <div>
                            <label className={label}>Şehir</label>
                            <input className={input} list="quote-cities" value={values.city} onChange={(e) => onCityChange(e.target.value)} placeholder="Listeden seçin ya da yazın" />
                            <datalist id="quote-cities">
                                {settings.shipping.map((r) => (
                                    <option key={r.id} value={r.city} />
                                ))}
                            </datalist>
                        </div>
                        <div>
                            <label className={label}>Mekân</label>
                            <input className={input} value={values.venue} onChange={(e) => set("venue", e.target.value)} />
                        </div>
                        <div>
                            <label className={label}>Nakliye (KDV hariç, TL)</label>
                            <input
                                className={input}
                                type="number"
                                min={0}
                                value={values.shippingAmount}
                                onChange={(e) => set("shippingAmount", e.target.value)}
                                placeholder="Boş = PDF'te nakliye satırı yok"
                            />
                            <p className="text-[11px] text-black/40 mt-1">Şehir seçince ayarlardaki tutar gelir; bu teklif için değiştirebilirsiniz.</p>
                        </div>
                    </div>
                </section>

                {values.options.map((option, optionIndex) => {
                    const totals = optionTotals(option, totalsCtx);
                    return (
                        <section key={option.id} className={card}>
                            <div className="flex items-center gap-3 mb-4">
                                {values.options.length > 1 && (
                                    <span className="w-7 h-7 rounded-md bg-[#E94B35] text-white text-sm font-bold flex items-center justify-center">
                                        {optionLetter(optionIndex)}
                                    </span>
                                )}
                                <input
                                    className={`${input} font-semibold`}
                                    value={option.title}
                                    onChange={(e) => updateOption(option.id, (o) => ({ ...o, title: e.target.value }))}
                                    placeholder={values.options.length > 1 ? `Seçenek ${optionLetter(optionIndex)} başlığı (örn. Tek istasyon)` : "Başlık (boş bırakılırsa \"Teklif detayı\")"}
                                />
                                <button
                                    type="button"
                                    onClick={() => set("options", [...values.options.slice(0, optionIndex + 1), { ...structuredClone(option), id: newId(), title: option.title ? `${option.title} (kopya)` : "" }, ...values.options.slice(optionIndex + 1)])}
                                    className="shrink-0 px-3 py-2 text-xs border border-black/15 rounded-lg hover:bg-black/5"
                                >
                                    Kopyala
                                </button>
                                {values.options.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => confirm("Bu seçenek silinsin mi?") && set("options", values.options.filter((o) => o.id !== option.id))}
                                        className="shrink-0 px-3 py-2 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                                    >
                                        Sil
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {option.items.map((item) => (
                                    <ItemEditor
                                        key={item.id}
                                        item={item}
                                        vatRate={values.vatRate}
                                        inclusionLabels={settings.inclusions.map((i) => i.label)}
                                        onChange={(patch) => updateItem(option.id, item.id, patch)}
                                        onRemove={() => updateOption(option.id, (o) => ({ ...o, items: o.items.filter((i) => i.id !== item.id) }))}
                                    />
                                ))}
                            </div>

                            <select
                                className={`${input} mt-4 text-black/60`}
                                value=""
                                onChange={(e) => e.target.value && addItem(option.id, e.target.value)}
                            >
                                <option value="">+ Ürün ekle…</option>
                                <option value="__free">Serbest kalem (listede olmayan)</option>
                                {productGroups.map(([category, list]) => (
                                    <optgroup key={category} label={category}>
                                        {list.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.title}
                                                {p.published ? "" : " (yayında değil)"}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>

                            <div className="mt-6 pt-4 border-t border-black/10">
                                <p className="text-xs font-medium text-black/60 mb-2">Ek kalemler (konaklama, ulaşım, ekstra baskı…)</p>
                                <div className="space-y-2">
                                    {option.extras.map((extra) => (
                                        <div key={extra.id} className="flex gap-2">
                                            <input
                                                className={input}
                                                value={extra.label}
                                                placeholder="Kalem adı"
                                                onChange={(e) => updateOption(option.id, (o) => ({ ...o, extras: o.extras.map((x) => (x.id === extra.id ? { ...x, label: e.target.value } : x)) }))}
                                            />
                                            <input
                                                className={`${input} w-40`}
                                                type="number"
                                                value={extra.amount || ""}
                                                placeholder="Tutar (KDV hariç)"
                                                onChange={(e) => updateOption(option.id, (o) => ({ ...o, extras: o.extras.map((x) => (x.id === extra.id ? { ...x, amount: Number(e.target.value) } : x)) }))}
                                            />
                                            <button
                                                type="button"
                                                className="px-3 text-black/40 hover:text-red-600"
                                                onClick={() => updateOption(option.id, (o) => ({ ...o, extras: o.extras.filter((x) => x.id !== extra.id) }))}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <button
                                        type="button"
                                        className="text-xs font-medium text-black/60 hover:text-black"
                                        onClick={() => updateOption(option.id, (o) => ({ ...o, extras: [...o.extras, { id: newId(), label: "", amount: 0 }] }))}
                                    >
                                        + Ek kalem
                                    </button>
                                    <label className="flex items-center gap-2 text-xs text-black/60">
                                        İndirim (KDV hariç, TL)
                                        <input
                                            className={`${input} w-32`}
                                            type="number"
                                            min={0}
                                            value={option.discount || ""}
                                            onChange={(e) => updateOption(option.id, (o) => ({ ...o, discount: Number(e.target.value) }))}
                                        />
                                    </label>
                                </div>
                            </div>

                            <table className="w-full text-sm mt-6">
                                <thead>
                                    <tr className="text-[11px] uppercase tracking-wider text-black/40 border-b border-black/10">
                                        <th className="text-left py-2 font-medium">Kalem</th>
                                        <th className="text-right py-2 font-medium">KDV hariç</th>
                                        <th className="text-right py-2 font-medium">KDV %{values.vatRate}</th>
                                        <th className="text-right py-2 font-medium">KDV dahil</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {totals.rows.map((r, i) => (
                                        <tr key={i}>
                                            <td className="py-2 text-black/70">{r.label}</td>
                                            <td className="py-2 text-right tabular-nums">{formatTL(r.net)}</td>
                                            <td className="py-2 text-right tabular-nums text-black/50">{formatTL(r.vat)}</td>
                                            <td className="py-2 text-right tabular-nums">{formatTL(r.gross)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t-2 border-black font-semibold">
                                        <td className="py-2">Toplam</td>
                                        <td className="py-2 text-right tabular-nums">{formatTL(totals.net)}</td>
                                        <td className="py-2 text-right tabular-nums">{formatTL(totals.vat)}</td>
                                        <td className="py-2 text-right tabular-nums">{formatTL(totals.gross)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </section>
                    );
                })}

                <button
                    type="button"
                    onClick={() => set("options", [...values.options, emptyOption()])}
                    className="w-full py-3 text-sm font-medium border-2 border-dashed border-black/15 rounded-xl text-black/50 hover:border-black/40 hover:text-black transition"
                >
                    + Alternatif seçenek ekle
                </button>

                <section className={card}>
                    <h2 className="text-sm font-semibold text-black mb-1">Bu teklife özel notlar</h2>
                    <p className="text-xs text-black/40 mb-3">
                        Satır başına bir not. &quot;Tutarlar KDV hariçtir&quot; notu ve ayarlardaki genel notlar PDF&apos;e kendiliğinden eklenir.
                    </p>
                    <textarea className={`${input} min-h-24`} value={values.notes} onChange={(e) => set("notes", e.target.value)} />
                </section>
            </div>

            <aside className="xl:sticky xl:top-8 space-y-4">
                <div className={card}>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label className={label}>Durum</label>
                            <select className={input} value={values.status} onChange={(e) => set("status", e.target.value)}>
                                {QUOTE_STATUSES.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={label}>Geçerlilik</label>
                            <input className={input} type="date" value={values.validUntil} onChange={(e) => set("validUntil", e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2 mb-5">
                        {values.options.map((option, i) => {
                            const t = optionTotals(option, totalsCtx);
                            return (
                                <div key={option.id} className="flex items-baseline justify-between gap-3 text-sm">
                                    <span className="text-black/60 truncate">
                                        {values.options.length > 1 ? `${optionLetter(i)} · ` : ""}
                                        {option.title || (values.options.length > 1 ? `Seçenek ${optionLetter(i)}` : "Toplam")}
                                    </span>
                                    <span className="text-right shrink-0">
                                        <span className="block font-semibold tabular-nums">{formatTL(t.net)} + KDV</span>
                                        <span className="block text-xs text-black/40 tabular-nums">KDV dahil {formatTL(t.gross)}</span>
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={save}
                        disabled={saving}
                        className="w-full py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition disabled:opacity-50"
                    >
                        {saving ? "Kaydediliyor…" : values.id ? (dirty ? "Kaydet" : "Kaydedildi") : "Teklifi oluştur"}
                    </button>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <button type="button" onClick={() => openPdf(true)} disabled={saving} className="py-2.5 text-sm border border-black/15 rounded-lg hover:bg-black/5 disabled:opacity-50">
                            Önizle
                        </button>
                        <button type="button" onClick={() => openPdf(false)} disabled={saving} className="py-2.5 text-sm border border-black/15 rounded-lg hover:bg-black/5 disabled:opacity-50">
                            PDF indir
                        </button>
                    </div>
                    <p className="text-[11px] text-black/40 mt-3">Önizleme ve PDF, değişiklikleri önce kaydeder.</p>
                </div>
            </aside>
        </div>
    );
}

function ItemEditor({
    item,
    vatRate,
    inclusionLabels,
    onChange,
    onRemove,
}: {
    item: QuoteItem;
    vatRate: number;
    inclusionLabels: string[];
    onChange: (patch: Partial<QuoteItem>) => void;
    onRemove: () => void;
}) {
    const [custom, setCustom] = useState("");
    // Labels saved on this line that are no longer (or never were) in settings stay toggleable.
    const allLabels = [...inclusionLabels, ...item.inclusions.filter((l) => !inclusionLabels.includes(l))];
    const toggle = (l: string) =>
        onChange({ inclusions: item.inclusions.includes(l) ? item.inclusions.filter((x) => x !== l) : [...item.inclusions, l] });
    const addCustom = () => {
        const l = custom.trim();
        if (l && !item.inclusions.includes(l)) onChange({ inclusions: [...item.inclusions, l] });
        setCustom("");
    };
    const vat = Math.round(item.amount * vatRate) / 100;

    return (
        <div className="border border-black/10 rounded-lg p-4">
            <div className="flex gap-4">
                {item.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.image.replace("/image/upload/", "/image/upload/f_auto,q_auto,w_200/")} alt="" className="w-24 h-auto self-start rounded" />
                ) : (
                    <div className="w-24 h-16 rounded bg-black/5 shrink-0" />
                )}
                <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex gap-2">
                        <input className={`${input} font-medium`} value={item.title} onChange={(e) => onChange({ title: e.target.value })} placeholder="Ürün / kalem adı" />
                        <button type="button" onClick={onRemove} className="px-3 text-black/40 hover:text-red-600" title="Kalemi kaldır">
                            ✕
                        </button>
                    </div>
                    <textarea className={`${input} min-h-16 text-xs`} value={item.description} onChange={(e) => onChange({ description: e.target.value })} placeholder="Kısa açıklama (PDF'te ürün adının altında çıkar)" />
                    <div className="grid grid-cols-[80px_80px_1fr] gap-2 items-end">
                        <div>
                            <label className={label}>Adet</label>
                            <input className={input} type="number" min={1} value={item.quantity} onChange={(e) => onChange({ quantity: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className={label}>Gün</label>
                            <input className={input} type="number" min={1} value={item.days} onChange={(e) => onChange({ days: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className={label}>Tutar · KDV hariç, satır toplamı (TL)</label>
                            <input className={`${input} font-semibold`} type="number" min={0} value={item.amount || ""} onChange={(e) => onChange({ amount: Number(e.target.value) })} />
                        </div>
                    </div>
                    {item.amount > 0 && (
                        <p className="text-xs text-black/50 tabular-nums">
                            KDV %{vatRate}: {formatTL(vat)} · KDV dahil: {formatTL(item.amount + vat)}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-4">
                <p className="text-xs font-medium text-black/60 mb-2">Bütçeye dahil olanlar</p>
                <div className="flex flex-wrap gap-1.5">
                    {allLabels.map((l) => {
                        const on = item.inclusions.includes(l);
                        return (
                            <button
                                key={l}
                                type="button"
                                onClick={() => toggle(l)}
                                className={`px-2.5 py-1 text-xs rounded-full border transition ${on ? "bg-black text-white border-black" : "bg-white text-black/50 border-black/15 hover:border-black/40"}`}
                            >
                                {on ? "✓ " : ""}
                                {l}
                            </button>
                        );
                    })}
                </div>
                <div className="flex gap-2 mt-2">
                    <input
                        className={`${input} text-xs`}
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addCustom();
                            }
                        }}
                        placeholder="Bu kaleme özel madde ekle (Enter)"
                    />
                </div>
                <input className={`${input} text-xs mt-2`} value={item.note} onChange={(e) => onChange({ note: e.target.value })} placeholder="Not (isteğe bağlı, örn. 4 saatlik kullanım)" />
            </div>
        </div>
    );
}
