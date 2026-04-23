import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

interface QuoteService {
    id: string;
    title: string;
    url: string;
}

export async function POST(req: Request) {
    try {
        const { name, email, phone, eventDate, participants, notes, services, language } = await req.json();

        if (!name || !email || !phone || !services?.length) {
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

        const serviceListHtml = (services as QuoteService[])
            .map(s => `<li style="margin-bottom:6px;"><a href="https://metasoftco.com${s.url}" style="color:#dc2626;">${s.title}</a></li>`)
            .join("");

        const serviceListText = (services as QuoteService[])
            .map(s => `• ${s.title} — https://metasoftco.com${s.url}`)
            .join("\n");

        // MetasoftCo'ya giden email
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.CONTACT_TO,
            replyTo: email,
            subject: `[Teklif Talebi] ${name} — ${services.length} hizmet`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
                    <h2 style="color:#dc2626;border-bottom:2px solid #dc2626;padding-bottom:8px;">
                        Yeni Teklif Talebi
                    </h2>
                    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
                        <tr><td style="padding:8px 0;font-weight:bold;color:#555;width:160px;">Ad Soyad:</td><td>${name}</td></tr>
                        <tr><td style="padding:8px 0;font-weight:bold;color:#555;">E-Posta:</td><td><a href="mailto:${email}">${email}</a></td></tr>
                        <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Telefon:</td><td>${phone}</td></tr>
                        <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Etkinlik Tarihi:</td><td>${eventDate || "—"}</td></tr>
                        <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Katılımcı Sayısı:</td><td>${participants || "—"}</td></tr>
                        <tr><td style="padding:8px 0;font-weight:bold;color:#555;">Dil:</td><td>${language === "en" ? "English" : "Türkçe"}</td></tr>
                    </table>
                    <h3 style="color:#333;margin-bottom:8px;">Seçilen Hizmetler (${services.length}):</h3>
                    <ul style="padding-left:16px;margin-bottom:24px;">${serviceListHtml}</ul>
                    ${notes ? `<h3 style="color:#333;margin-bottom:8px;">Notlar:</h3><div style="background:#f4f4f4;border-left:4px solid #dc2626;padding:16px;border-radius:4px;white-space:pre-wrap;">${notes.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>` : ""}
                    <p style="color:#999;font-size:12px;margin-top:24px;">Bu talep metasoftco.com teklif formundan gönderilmiştir.</p>
                </div>
            `,
        });

        // Müşteriye giden onay emaili
        const isEn = language === "en";
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: isEn
                ? "MetasoftCo — Your Quote Request Received"
                : "MetasoftCo — Teklif Talebiniz Alındı",
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
                    <h2 style="color:#dc2626;border-bottom:2px solid #dc2626;padding-bottom:8px;">
                        ${isEn ? "Thank You, " + name + "!" : "Teşekkürler, " + name + "!"}
                    </h2>
                    <p style="color:#333;line-height:1.6;">
                        ${isEn
                            ? "We have received your quote request. Our team will review your selections and get back to you within <strong>1–2 business days</strong>."
                            : "Teklif talebinizi aldık. Ekibimiz seçimlerinizi inceleyecek ve <strong>1–2 iş günü</strong> içinde size dönüş yapacaktır."
                        }
                    </p>
                    <h3 style="color:#333;margin-top:24px;margin-bottom:8px;">
                        ${isEn ? "Selected Services:" : "Seçtiğiniz Hizmetler:"}
                    </h3>
                    <ul style="padding-left:16px;color:#555;line-height:2;">
                        ${(services as QuoteService[]).map(s => `<li>${s.title}</li>`).join("")}
                    </ul>
                    <p style="color:#555;line-height:1.6;margin-top:24px;">
                        ${isEn
                            ? "If you have any urgent questions, feel free to reach us at <a href='mailto:info@metasoftco.com' style='color:#dc2626;'>info@metasoftco.com</a> or <a href='tel:+905342334051' style='color:#dc2626;'>+90 534 233 4051</a>."
                            : "Acil sorularınız için <a href='mailto:info@metasoftco.com' style='color:#dc2626;'>info@metasoftco.com</a> veya <a href='tel:+905342334051' style='color:#dc2626;'>+90 534 233 4051</a> üzerinden bize ulaşabilirsiniz."
                        }
                    </p>
                    <p style="color:#999;font-size:12px;margin-top:32px;">MetasoftCo — Istanbul, Turkey</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Quote request error:", err);
        return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 500 });
    }
}
