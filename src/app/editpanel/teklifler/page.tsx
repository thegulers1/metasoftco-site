import Link from "next/link";
import { prisma } from "@/lib/db";
import { QUOTE_STATUSES, formatTL, normalizeOptions, optionTotals } from "@/lib/quotes";
import QuoteRowActions from "./QuoteRowActions";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
    DRAFT: "bg-black/5 text-black/50",
    SENT: "bg-blue-50 text-blue-700",
    ACCEPTED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-600",
};

export default async function QuotesListPage() {
    const quotes = await prisma.quote.findMany({ orderBy: { createdAt: "desc" }, take: 300 });

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-black">Teklifler</h1>
                    <p className="text-sm text-black/50 mt-1">{quotes.length} teklif</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/editpanel/teklifler/ayarlar" className="px-5 py-2.5 border border-black/15 text-sm font-medium rounded-lg hover:bg-black/5 transition">
                        Teklif ayarları
                    </Link>
                    <Link href="/editpanel/teklifler/yeni" className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition">
                        + Yeni teklif
                    </Link>
                </div>
            </div>

            {quotes.length === 0 ? (
                <div className="bg-white rounded-xl border border-black/10 p-16 text-center">
                    <p className="text-black/40 text-sm">Henüz teklif yok.</p>
                    <p className="text-black/40 text-xs mt-1">İlk teklifi hazırlamadan önce &quot;Teklif ayarları&quot;ndan dahil olanlar ve nakliye listesini kontrol edin.</p>
                    <Link href="/editpanel/teklifler/yeni" className="inline-block mt-4 px-5 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/80 transition">
                        İlk teklifi hazırla
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-black/10 bg-black/[0.02]">
                                {["No", "Firma", "Etkinlik", "Tutar (KDV hariç)", "Durum", "Tarih", ""].map((h) => (
                                    <th key={h} className="text-left px-5 py-4 font-semibold text-black/60 uppercase tracking-wider text-xs">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {quotes.map((quote) => {
                                const ctx = { vatRate: quote.vatRate, city: quote.city, shippingAmount: quote.shippingAmount };
                                const nets = normalizeOptions(quote.options).map((o) => optionTotals(o, ctx).net);
                                const min = Math.min(...nets);
                                const max = Math.max(...nets);
                                const status = QUOTE_STATUSES.find((s) => s.value === quote.status);
                                return (
                                    <tr key={quote.id} className="hover:bg-black/[0.02] transition">
                                        <td className="px-5 py-4 font-mono text-xs">
                                            <Link href={`/editpanel/teklifler/${quote.id}`} className="hover:underline">
                                                {quote.number}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-4 font-medium text-black">{quote.company}</td>
                                        <td className="px-5 py-4 text-black/60">
                                            {[quote.eventName, quote.city].filter(Boolean).join(" · ") || "—"}
                                        </td>
                                        <td className="px-5 py-4 tabular-nums">
                                            {nets.length === 0 ? "—" : min === max ? formatTL(min) : `${formatTL(min)} – ${formatTL(max)}`}
                                            {nets.length > 1 && <span className="ml-1 text-xs text-black/40">({nets.length} seçenek)</span>}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLE[quote.status] ?? STATUS_STYLE.DRAFT}`}>
                                                {status?.label ?? quote.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-black/50 text-xs">{quote.createdAt.toLocaleDateString("tr-TR")}</td>
                                        <td className="px-5 py-4">
                                            <QuoteRowActions id={quote.id} number={quote.number} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
