import Link from "next/link";
import { getQuoteSettings } from "@/lib/quotes-server";
import QuoteSettingsForm from "./QuoteSettingsForm";

export const dynamic = "force-dynamic";

export default async function QuoteSettingsPage() {
    const settings = await getQuoteSettings();
    return (
        <div>
            <div className="mb-8">
                <Link href="/editpanel/teklifler" className="text-xs text-black/40 hover:text-black">← Teklifler</Link>
                <h1 className="text-2xl font-bold text-black mt-1">Teklif ayarları</h1>
                <p className="text-sm text-black/50 mt-1">Burada yapılan değişiklikler yeni eklenen kalemlere uygulanır; kaydedilmiş teklifler değişmez.</p>
            </div>
            <QuoteSettingsForm initial={settings} />
        </div>
    );
}
