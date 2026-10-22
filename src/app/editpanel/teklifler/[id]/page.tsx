import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getQuoteProducts, getQuoteSettings } from "@/lib/quotes-server";
import { normalizeOptions } from "@/lib/quotes";
import QuoteForm from "../QuoteForm";

export const dynamic = "force-dynamic";

export default async function EditQuotePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [quote, settings, products] = await Promise.all([
        prisma.quote.findUnique({ where: { id } }),
        getQuoteSettings(),
        getQuoteProducts(),
    ]);
    if (!quote) notFound();

    return (
        <div>
            <div className="mb-8">
                <Link href="/editpanel/teklifler" className="text-xs text-black/40 hover:text-black">← Teklifler</Link>
                <h1 className="text-2xl font-bold text-black mt-1">
                    Teklif <span className="font-mono">{quote.number}</span>
                    <span className="text-black/40 font-normal"> · {quote.company}</span>
                </h1>
            </div>
            <QuoteForm
                key={quote.id}
                products={products}
                settings={settings}
                initial={{
                    id: quote.id,
                    number: quote.number,
                    status: quote.status,
                    company: quote.company,
                    contactName: quote.contactName ?? "",
                    contactEmail: quote.contactEmail ?? "",
                    contactPhone: quote.contactPhone ?? "",
                    eventName: quote.eventName ?? "",
                    eventDate: quote.eventDate ?? "",
                    city: quote.city ?? "",
                    venue: quote.venue ?? "",
                    shippingAmount: quote.shippingAmount === null ? "" : String(quote.shippingAmount),
                    vatRate: quote.vatRate,
                    validUntil: quote.validUntil ? quote.validUntil.toISOString().slice(0, 10) : "",
                    notes: quote.notes ?? "",
                    options: normalizeOptions(quote.options),
                }}
            />
        </div>
    );
}
