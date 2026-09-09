import nodemailer, { type Transporter } from "nodemailer";

/**
 * Ortak SMTP taşıyıcısı. İletişim ve teklif formları buradan gönderim yapar.
 * Ortam değişkenleri:
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD (veya SMTP_PASS),
 *   SMTP_FROM, SMTP_REPLY_TO / CONTACT_TO
 */

let cached: Transporter | null = null;

function requiredEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Eksik ortam değişkeni: ${name}`);
    }
    return value;
}

export function getTransporter(): Transporter {
    if (cached) return cached;

    const host = requiredEnv("SMTP_HOST", process.env.SMTP_HOST);
    const port = Number(process.env.SMTP_PORT ?? 465);
    const user = requiredEnv("SMTP_USER", process.env.SMTP_USER);
    const pass = requiredEnv("SMTP_PASSWORD", process.env.SMTP_PASSWORD ?? process.env.SMTP_PASS);

    cached = nodemailer.createTransport({
        host,
        port,
        // 465 implicit TLS, 587 STARTTLS ile yükseltilir.
        secure: port === 465,
        auth: { user, pass },
    });

    return cached;
}

/** Formlardan gelen mesajların gönderileceği kutu. */
export function getRecipient(): string {
    return requiredEnv(
        "CONTACT_TO",
        process.env.CONTACT_TO ?? process.env.SMTP_REPLY_TO ?? process.env.SMTP_USER,
    );
}

/** Zarf gönderici adresi; SMTP_USER ile uyumlu olmalı (Gmail aksi halde reddeder). */
export function getSender(): string {
    return process.env.SMTP_FROM ?? requiredEnv("SMTP_USER", process.env.SMTP_USER);
}

/** Kullanıcı girdisini HTML gövdesine gömmeden önce kaçış uygular. */
export function escapeHtml(value: unknown): string {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

/** Çok satırlı metni HTML'e çevirir. */
export function escapeHtmlMultiline(value: unknown): string {
    return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

/** Başlık alanına satır sonu enjeksiyonunu engeller. */
export function sanitizeHeader(value: unknown, maxLength = 200): string {
    return String(value ?? "")
        .replace(/[\r\n]+/g, " ")
        .trim()
        .slice(0, maxLength);
}

/** replyTo başlığına yalnızca geçerli bir adres koyar. */
export function safeReplyTo(email: unknown): string | undefined {
    const value = sanitizeHeader(email, 254);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : undefined;
}
