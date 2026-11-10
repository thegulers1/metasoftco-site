import Link from "next/link";
import { googleConfigStatus } from "@/lib/google-api";
import { buildTrafficReport } from "@/lib/traffic-report";
import TrafficAnalysis from "./TrafficAnalysis";
import { BarList, DailyChart, Funnel, ShareBar } from "./TrafficCharts";

export const dynamic = "force-dynamic";

const RANGES = [7, 14, 30];

const CHANNEL_LABEL: Record<string, string> = {
    "google / organic": "Google (arama)",
    "google / cpc": "Google Ads",
    "(direct) / (none)": "Doğrudan / WhatsApp / bilinmeyen",
    "chatgpt.com / ai-assistant": "ChatGPT",
    "chatgpt.com / referral": "ChatGPT",
    "l.instagram.com / referral": "Instagram",
    "ig / social": "Instagram",
    "ig / paid": "Instagram reklam",
};

const percent = (value: number) => `${Math.round(value * 100)}%`;
const seconds = (value: number) => (value >= 60 ? `${Math.floor(value / 60)} dk ${Math.round(value % 60)} sn` : `${Math.round(value)} sn`);

function delta(current: number, previous?: number) {
    if (previous === undefined || previous === 0) return null;
    const change = Math.round(((current - previous) / previous) * 100);
    return `${change >= 0 ? "+" : ""}${change}% önceki dönem`;
}

function Card({ label, value, hint }: { label: string; value: string | number; hint?: string | null }) {
    return (
        <div className="bg-white rounded-xl border border-black/10 p-5">
            <p className="text-xs text-black/50">{label}</p>
            <p className="text-2xl font-bold text-black mt-1">{value}</p>
            {hint && <p className="text-[11px] text-black/40 mt-1">{hint}</p>}
        </div>
    );
}

export default async function TrafficPage({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
    const params = await searchParams;
    const requested = Number(params.days);
    const days = RANGES.includes(requested) ? requested : 14;
    const config = googleConfigStatus();

    const needsSetup = !config.hasKey || !config.ga4PropertyId;

    const report = await buildTrafficReport(days);
    const { totals, previous } = report;
    const eventCount = (name: string) => report.events.find((event) => event.name === name)?.count ?? 0;
    const contact = eventCount("whatsapp_click") + eventCount("form_submit");
    const funnel = [
        { label: "Oturum", value: totals.sessions },
        { label: "Forma başladı", value: eventCount("form_start") },
        { label: "Formu gönderdi", value: eventCount("form_submit") },
        { label: "Talep (lead)", value: eventCount("generate_lead") },
    ];
    const channelShare = (() => {
        const top = report.channels.slice(0, 4).map((row) => ({ label: CHANNEL_LABEL[row.source] ?? row.source, value: row.sessions }));
        const rest = report.channels.slice(4).reduce((sum, row) => sum + row.sessions, 0);
        return rest ? [...top, { label: "Diğer", value: rest }] : top;
    })();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-black">Trafik</h1>
                    <p className="text-sm text-black/50 mt-1">Ziyaretçiler nereden geldi, nereleri gezdi, neden aramadı. Admin sayfaları sayılmaz.</p>
                </div>
                <div className="flex gap-2">
                    {RANGES.map((range) => (
                        <Link
                            key={range}
                            href={`/editpanel/trafik?days=${range}`}
                            className={`px-4 py-2 text-sm rounded-lg border transition ${range === days ? "bg-black text-white border-black" : "border-black/15 hover:bg-black/5"}`}
                        >
                            {range} gün
                        </Link>
                    ))}
                </div>
            </div>

            {report.warnings.length > 0 && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs text-amber-800 space-y-1">
                    {report.warnings.map((warning) => <p key={warning}>{warning}</p>)}
                </div>
            )}

            {needsSetup && (
                <details className="rounded-lg border border-black/10 bg-white p-4 text-sm text-black/70">
                    <summary className="cursor-pointer font-medium text-black">Canlı veri için Google bağlantısını kurun</summary>
                    <ol className="mt-3 list-decimal pl-5 space-y-2">
                        <li>Google Cloud&apos;da bir <b>servis hesabı</b> oluşturun ve JSON anahtarını indirin (Analytics Data API ve Search Console API açık olmalı).</li>
                        <li>Servis hesabının e-postasını GA4 mülkünde <b>Görüntüleyici</b>, Search Console&apos;da <b>Kullanıcı</b> olarak ekleyin.</li>
                        <li>Coolify ortam değişkenleri: <code>GOOGLE_SERVICE_ACCOUNT_JSON</code> (JSON ya da base64), <code>GA4_PROPERTY_ID=413240077</code>, <code>GSC_SITE_URL=sc-domain:metasoftco.com</code></li>
                    </ol>
                    <p className="mt-3 text-xs text-black/40">Durum: anahtar {config.hasKey ? "var" : "yok"}, GA4 mülkü {config.ga4PropertyId ?? "yok"}, Search Console {config.gscSiteUrl ?? "yok"}.</p>
                </details>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <Card label="Oturum" value={totals.sessions} hint={delta(totals.sessions, previous?.sessions)} />
                <Card label="Kullanıcı" value={totals.users} hint={delta(totals.users, previous?.users)} />
                <Card label="Sayfa görüntüleme" value={totals.pageViews} />
                <Card label="Etkileşim oranı" value={percent(totals.engagementRate)} />
                <Card label="İletişim (WhatsApp + form)" value={contact} hint={delta(totals.keyEvents, previous?.keyEvents)?.replace("önceki", "anahtar olay, önceki")} />
            </div>

            <TrafficAnalysis days={days} />

            <section className="bg-white rounded-xl border border-black/10 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-black">Günlük oturum</h2>
                    <p className="text-[11px] text-black/40"><span className="inline-block h-2 w-2 rounded-full bg-blue-600 mr-1" />mavi: o gün iletişim / anahtar olay</p>
                </div>
                <DailyChart data={report.daily} />
            </section>

            <div className="grid lg:grid-cols-2 gap-8">
                <section className="bg-white rounded-xl border border-black/10 p-6">
                    <h2 className="text-lg font-bold text-black mb-4">Nereden geldiler</h2>
                    <ShareBar items={channelShare} />
                    <div className="mt-6">
                        <BarList
                            unit="oturum"
                            items={report.channels.slice(0, 8).map((row) => ({
                                label: CHANNEL_LABEL[row.source] ?? row.source,
                                sub: row.source,
                                value: row.sessions,
                                extra: `etkileşim %${Math.round(row.engagementRate * 100)}`,
                                tone: row.keyEvents > 0 ? "good" : "default",
                            }))}
                        />
                    </div>
                    <p className="text-[11px] text-black/40 mt-4">Mavi çubuk: o kaynaktan iletişim olayı gelmiş. WhatsApp&apos;tan gelenler çoğunlukla &quot;doğrudan&quot; görünür; ayırmak için linke <code>?utm_source=whatsapp</code> ekleyin.</p>
                </section>

                <section className="bg-white rounded-xl border border-black/10 p-6">
                    <h2 className="text-lg font-bold text-black mb-1">Ziyaretten iletişime</h2>
                    <p className="text-xs text-black/50 mb-4">Sağdaki yüzde, bir önceki adımdan kaç kişinin devam ettiği.</p>
                    <Funnel steps={funnel} />
                    <p className="text-[11px] text-black/40 mt-4">WhatsApp tıklaması: {eventCount("whatsapp_click")}. Form adımları ayrı bir yoldur, WhatsApp&apos;a tıklayan forma başlamadan da yazabilir.</p>
                </section>
            </div>

            <section className="bg-white rounded-xl border border-black/10 p-6">
                <h2 className="text-lg font-bold text-black mb-1">Giriş sayfaları</h2>
                <p className="text-xs text-black/50 mb-4">İlk indikleri sayfa. <span className="text-red-600">Kırmızı</span>: 3 veya daha fazla oturum aldı ama hiç iletişim olayı yok.</p>
                <BarList
                    unit="oturum"
                    items={report.landing.slice(0, 10).map((row) => ({
                        label: row.page || "(boş)",
                        value: row.sessions,
                        extra: `etkileşim %${Math.round(row.engagementRate * 100)} · ${seconds(row.avgDuration)} · ${row.keyEvents} olay`,
                        tone: row.keyEvents > 0 ? "good" : row.sessions >= 3 ? "warn" : "default",
                    }))}
                />
                {report.landing.some((row) => row.page === "(not set)") && (
                    <p className="text-[11px] text-black/40 mt-4">&quot;(not set)&quot;: giriş sayfası kaydedilmemiş, süre ve etkileşimi çok düşük. Büyük olasılıkla bot ya da yarım kalan yükleme.</p>
                )}
            </section>

            <div className="grid lg:grid-cols-2 gap-8">
                <section className="bg-white rounded-xl border border-black/10 p-6">
                    <h2 className="text-lg font-bold text-black mb-4">En çok gezilen sayfalar</h2>
                    <BarList
                        unit="görüntüleme"
                        items={report.pages.slice(0, 10).map((row) => ({ label: row.page, value: row.views, extra: seconds(row.avgDuration) }))}
                    />
                </section>

                <section className="bg-white rounded-xl border border-black/10 p-6">
                    <h2 className="text-lg font-bold text-black mb-1">Google&apos;da ne arayıp bulmuşlar</h2>
                    <p className="text-xs text-black/50 mb-4">Çubuk: gösterim. Sağda tık ve ortalama sıra. Search Console, son 3 gün hariç.</p>
                    <BarList
                        unit="gösterim"
                        items={report.searchQueries.slice(0, 10).map((row) => ({
                            label: row.query,
                            value: row.impressions,
                            extra: `${row.clicks} tık · sıra ${row.position.toFixed(0)}`,
                            tone: row.clicks > 0 ? "good" : "default",
                        }))}
                    />
                </section>
            </div>

            <section className="bg-white rounded-xl border border-black/10 p-6">
                <h2 className="text-lg font-bold text-black mb-1">Google hangi sayfalarımızı gösteriyor</h2>
                <p className="text-xs text-black/50 mb-4">Aramadan gelen gösterimin çoğu blog yazılarında; hizmet sayfalarının gösterimi çok az.</p>
                <BarList
                    unit="gösterim"
                    items={report.searchPages.slice(0, 8).map((row) => ({
                        label: row.page,
                        value: row.impressions,
                        extra: `${row.clicks} tık · sıra ${row.position.toFixed(0)}`,
                        tone: row.clicks > 0 ? "good" : "default",
                    }))}
                />
            </section>
        </div>
    );
}
