"use client";

import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";

export default function ContactPage() {
    const { t, setAlternateUrl } = useLanguage();

    useEffect(() => {
        setAlternateUrl("/iletisim", "/en/contact");
    }, []);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setStatus("sent");
                setForm({ name: "", email: "", phone: "", subject: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">

            {/* ─── HERO / BAŞLIK ─── */}
            <div className="border-b border-white/5 pt-32 pb-16 px-6 sm:px-10 lg:px-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold mb-4">
                            {t("İletişim", "Contact")}
                        </p>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-none">
                            {t("Hadi", "Let's")}<br />
                            <span className="text-white/30">{t("Konuşalım", "Talk")}</span>
                        </h1>
                    </div>
                    <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                        {t(
                            "Etkinliğiniz için fiyat teklifi alın, iş birliği teklif edin veya sadece merhaba deyin.",
                            "Get a quote for your event, propose a partnership, or just say hello.",
                        )}
                    </p>
                </div>
            </div>

            {/* ─── ANA İÇERİK ─── */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-16 grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

                {/* ─── SOL: İletişim Bilgileri ─── */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Bilgiler */}
                    <div className="space-y-8">
                        <ContactItem
                            icon={<Phone className="w-4 h-4" />}
                            label={t("Telefon", "Phone")}
                            value="+90 534 233 4051"
                            href="tel:+905342334051"
                        />
                        <ContactItem
                            icon={<Mail className="w-4 h-4" />}
                            label={t("E-Posta", "Email")}
                            value="info@metasoftco.com"
                            href="mailto:info@metasoftco.com"
                        />
                        <ContactItem
                            icon={<MapPin className="w-4 h-4" />}
                            label={t("Adres", "Address")}
                            value={t(
                                "Zeytinlik, Fişekhane Cd. 5/17\n34140 Bakırköy / İstanbul",
                                "Zeytinlik, Fişekhane Cd. 5/17\n34140 Bakırköy / Istanbul",
                            )}
                        />
                    </div>

                    {/* Logo */}
                    <div className="pt-4 border-t border-white/5">
                        <Image
                            src="/blackLogo.png"
                            alt="MetasoftCo"
                            width={120}
                            height={32}
                            className="opacity-25"
                            style={{ filter: "brightness(0) invert(1)" }}
                        />
                    </div>
                </div>

                {/* ─── SAĞ: Form ─── */}
                <div className="lg:col-span-3">
                    {status === "sent" ? (
                        <div className="flex flex-col items-start gap-5 py-16 border-t border-white/20">
                            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">
                                    {t("Mesajınız İletildi!", "Message Sent!")}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed">
                                    {t(
                                        "En kısa sürede size dönüş yapacağız. Teşekkür ederiz.",
                                        "We'll get back to you shortly. Thank you.",
                                    )}
                                </p>
                            </div>
                            <button
                                onClick={() => setStatus("idle")}
                                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-400 font-semibold transition-colors mt-2"
                            >
                                {t("Yeni Mesaj Gönder", "Send Another Message")}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-0 bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                <Field
                                    label={t("Ad Soyad", "Full Name")}
                                    required
                                >
                                    <UnderlineInput
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder={t("Adınız Soyadınız", "Your Full Name")}
                                    />
                                </Field>
                                <Field
                                    label={t("E-Posta", "Email")}
                                    required
                                >
                                    <UnderlineInput
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="ornek@email.com"
                                    />
                                </Field>
                                <Field label={t("Telefon", "Phone")}>
                                    <UnderlineInput
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+90 5XX XXX XX XX"
                                    />
                                </Field>
                                <Field
                                    label={t("Konu", "Subject")}
                                    required
                                >
                                    <UnderlineInput
                                        type="text"
                                        name="subject"
                                        required
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder={t("Konu", "Subject")}
                                    />
                                </Field>
                            </div>

                            <Field label={t("Mesaj", "Message")} required full>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder={t(
                                        "Mesajınızı buraya yazın...",
                                        "Write your message here...",
                                    )}
                                    className="w-full bg-transparent border-b border-white/25 focus:border-red-500 outline-none py-3 text-white text-sm placeholder:text-white/40 transition-colors resize-none"
                                />
                            </Field>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-400 text-sm pt-4">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>
                                        {t(
                                            "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
                                            "Message could not be sent. Please try again.",
                                        )}
                                    </span>
                                </div>
                            )}

                            <div className="pt-10">
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="group inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold uppercase tracking-[0.15em] text-xs px-8 py-4 rounded-full transition-colors"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    {status === "sending"
                                        ? t("Gönderiliyor...", "Sending...")
                                        : t("Mesaj Gönder", "Send Message")}
                                    <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* ─── HARİTA — Full Width ─── */}
            <div className="mt-4 border-t border-white/5">
                <div className="h-[360px] lg:h-[420px] w-full grayscale opacity-60 hover:opacity-80 hover:grayscale-0 transition-all duration-700">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1506.07891589804!2d28.872877898521597!3d40.97802464471601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5abfb7a082f%3A0x9fa556de25d2775d!2sMetasoftCo%20-%20%C4%B0nteraktif%20Deneyim%20Ajans%C4%B1!5e0!3m2!1str!2str!4v1772108241472!5m2!1str!2str"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Metasoftco Konum"
                    />
                </div>
            </div>
        </div>
    );
}

// ─── Alt Bileşenler ────────────────────────────────

function ContactItem({
    icon,
    label,
    value,
    href,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
}) {
    const lines = value.split("\n");
    const content = (
        <div className="flex items-start gap-4 group">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 text-red-500 group-hover:bg-red-600/10 group-hover:border-red-500/20 transition-colors">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold mb-1">
                    {label}
                </p>
                <div className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-relaxed">
                    {lines.map((l, i) => (
                        <span key={i} className="block">{l}</span>
                    ))}
                </div>
            </div>
        </div>
    );

    if (href) {
        return <a href={href}>{content}</a>;
    }
    return content;
}


function Field({
    label,
    required,
    children,
    full,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
    full?: boolean;
}) {
    return (
        <div className={`border-t border-white/10 px-0 py-0 ${full ? "" : "sm:px-0"}`}>
            <div className="pt-5 pb-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/60 font-semibold mb-0">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {children}
            </div>
        </div>
    );
}

function UnderlineInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="w-full bg-transparent border-b border-white/25 focus:border-red-500 outline-none py-3 text-white text-sm placeholder:text-white/40 transition-colors"
        />
    );
}
