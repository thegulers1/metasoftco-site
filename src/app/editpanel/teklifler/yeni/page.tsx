import Link from "next/link";
import { getQuoteProducts, getQuoteSettings, validUntilFromToday } from "@/lib/quotes-server";
import { DEFAULT_VAT_RATE } from "@/lib/quotes";
import QuoteForm from "../QuoteForm";

export const dynamic = "force-dynamic";

export default async function NewQuotePage() {
    const [settings, products] = await Promise.all([getQuoteSettings(), getQuoteProducts()]);
    const validUntil = validUntilFromToday(settings.defaults.validityDays);

    return (
        <div>
            <div className="mb-8">
                <Link href="/editpanel/teklifler" className="text-xs text-black/40 hover:text-black">← Teklifler</Link>
                <h1 className="text-2xl font-bold text-black mt-1">Yeni teklif</h1>
            </div>
            <QuoteForm
                products={products}
                settings={settings}
                initial={{
                    status: "DRAFT",
                    company: "",
                    contactName: "",
                    contactEmail: "",
                    contactPhone: "",
                    eventName: "",
                    eventDate: "",
                    city: "",
                    venue: "",
                    shippingAmount: "",
                    vatRate: DEFAULT_VAT_RATE,
                    validUntil,
                    notes: "",
                    options: [],
                }}
            />
        </div>
    );
}
