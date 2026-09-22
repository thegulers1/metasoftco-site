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

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const { name, email, phone, subject: rawSubject, message } = await req.json().catch(() => ({}));
    const subject = rawSubject || "Genel İletişim";

    if (!name || !email || !message) {
        return NextResponse.json({ error: "Ad, e-posta ve mesaj alanları zorunludur." }, { status: 400 });
    }

    const replyTo = safeReplyTo(email);
    if (!replyTo) {
        return NextResponse.json({ error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
    }

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
                `Konu: ${subject}`,
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
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Ad Soyad:</td>
                            <td style="padding: 8px 0;">${escapeHtml(name)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">E-Posta:</td>
                            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(replyTo)}">${escapeHtml(replyTo)}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                            <td style="padding: 8px 0;">${escapeHtml(phone) || "—"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">Konu:</td>
                            <td style="padding: 8px 0;">${escapeHtml(subject)}</td>
                        </tr>
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
