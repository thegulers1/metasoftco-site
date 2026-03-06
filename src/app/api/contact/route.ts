import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { name, email, phone, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.CONTACT_TO,
            replyTo: email,
            subject: `[İletişim Formu] ${subject}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #dc2626; border-bottom: 2px solid #dc2626; padding-bottom: 8px;">
                        Yeni İletişim Formu Mesajı
                    </h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 120px;">Ad Soyad:</td>
                            <td style="padding: 8px 0;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">E-Posta:</td>
                            <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                            <td style="padding: 8px 0;">${phone || "—"}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #555;">Konu:</td>
                            <td style="padding: 8px 0;">${subject}</td>
                        </tr>
                    </table>
                    <h3 style="color: #333; margin-top: 24px;">Mesaj:</h3>
                    <div style="background: #f4f4f4; border-left: 4px solid #dc2626; padding: 16px; border-radius: 4px; white-space: pre-wrap;">
                        ${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}
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
