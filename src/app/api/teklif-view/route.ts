import { NextResponse } from "next/server";
import { getProposal } from "@/lib/teklifler";
import { escapeHtml, getRecipient, getSender, getTransporter } from "@/lib/mailer";

/**
 * Teklif sayfası açıldığında satış ekibine e-posta ile haber verir.
 * Sayfa her sekmede bir kez çağırır; aynı slug için 10 dakikada en fazla bir
 * bildirim gönderilir (sunucu belleğinde, yeniden başlatmada sıfırlanır).
 */
const lastSent = new Map<string, number>();
const COOLDOWN_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
    let body: { slug?: unknown; referrer?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ ok: false }, { status: 400 });
    }
    const slug = typeof body.slug === "string" ? body.slug : "";
    const proposal = getProposal(slug);
    if (!proposal) return NextResponse.json({ ok: false }, { status: 404 });

    const now = Date.now();
    if (now - (lastSent.get(slug) ?? 0) < COOLDOWN_MS) return NextResponse.json({ ok: true, skipped: true });
    lastSent.set(slug, now);

    const agent = request.headers.get("user-agent") ?? "-";
    const city = request.headers.get("x-vercel-ip-city") ?? request.headers.get("cf-ipcity") ?? "-";
    const referrer = typeof body.referrer === "string" ? body.referrer : "-";
    const when = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

    try {
        await getTransporter().sendMail({
            from: getSender(),
            to: getRecipient(),
            subject: `Teklif açıldı: ${proposal.client} — ${proposal.title}`,
            html: `<p><b>${escapeHtml(proposal.client)}</b> teklif sayfası açıldı.</p>
<p>Zaman: ${escapeHtml(when)}<br>Şehir: ${escapeHtml(city)}<br>Geldiği yer: ${escapeHtml(referrer)}<br>Tarayıcı: ${escapeHtml(agent)}</p>
<p><a href="https://www.metasoftco.com/teklif/${escapeHtml(proposal.slug)}">Sayfayı aç</a></p>`,
        });
    } catch (error) {
        console.error("teklif-view bildirimi gönderilemedi", error);
    }
    return NextResponse.json({ ok: true });
}
