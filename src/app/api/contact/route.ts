import { NextResponse } from "next/server";
import {
    escapeHtml,
    escapeHtmlMultiline,
    getRecipient,
    getSender,
    getTransporter,
    safeReplyTo,
    sanitizeHeader,
} from "@/lib/mailer";
import { attributionRows } from "@/lib/attribution";

export const dynamic = 'force-dynamic';

/** Optional event details a visitor can add; each is capped so a pasted wall of text stays readable. */
const EVENT_FIELDS = [
    ["product", "İlgilenilen ürün"],
    ["company", "Şirket"],
    ["eventDate", "Etkinlik tarihi"],
    ["city", "Şehir / mekân"],
    ["guests", "Tahmini katılımcı"],
] as const;

function optionalText(value: unknown, max = 200): string {
    return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
    const body = await req.json().catch(() => ({}));
    const { name, email, message } = body;
    const phone = optionalText(body.phone, 40);
    const details = EVENT_FIELDS
        .map(([key, label]) => ({ label, value: optionalText(body[key]) }))
        .filter((row) => row.value);
    const source = attributionRows(body.attribution);
    const product = optionalText(body.product);
    const subject = optionalText(body.subject) || (product ? `Teklif Talebi: ${product}` : "Genel İletişim");

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Ad, e-posta ve mesaj alanları zorunludur." }, { status: 400 });
    }

    const replyTo = safeReplyTo(email);
    if (!replyTo) {
        return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
    }

    const row = (label: string, value: string) => `
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">${label}:</td>
                            <td style="padding: 8px 0;">${value}</td>
                        </tr>`;

    try {
        const transporter = getTransporter();

        await transporter.sendMail({
            from: getSender(),
            to: getRecipient(),
            replyTo,
            subject: `[İletişim Formu] ${sanitizeHeader(subject)}`,
            text: [
                `Ad Soyad: ${name}`,
                `E-Posta: ${email}`,
                `Telefon: ${phone || "—"}`,
                ...details.map((d) => `${d.label}: ${d.value}`),
                `Konu: ${subject}`,
                ...source.map((d) => `${d.label}: ${d.value}`),
                "",
                "Mesaj:",
                String(message),
            ].join("\n"),
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">
                        Yeni İletişim Formu Mesajı
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${row("Ad Soyad", escapeHtml(name))}
                        ${row("E-Posta", `<a href="mailto:${escapeHtml(replyTo)}">${escapeHtml(replyTo)}</a>`)}
                        ${row("Telefon", escapeHtml(phone) || "—")}
                        ${details.map((d) => row(d.label, escapeHtml(d.value))).join("")}
                        ${row("Konu", escapeHtml(subject))}
                        ${source.map((d) => row(d.label, escapeHtml(d.value))).join("")}
                    </table>
                    <h3 style="color: #333; margin-top: 24px;">Mesaj:</h3>
                    <div style="background: #f4f4f4; border-left: 4px solid #dc2626; padding: 16px; border-radius: 4px; white-space: pre-wrap;">
                        ${escapeHtmlMultiline(message)}
                    </div>
                    <p style="color: #999; font-size: 12px; margin-top: 24px;">
                        Bu mesaj metasoftco.com iletişim formundan gönderilmiştir.
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("SMTP error:", err);
        return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 500 });
    }
}
