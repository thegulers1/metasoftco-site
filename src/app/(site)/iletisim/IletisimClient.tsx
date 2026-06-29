"use client";

import { useRef, useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "@/providers/LanguageProvider";

export default function ContactPage() {
    const { t, language, setAlternateUrl } = useLanguage();
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setAlternateUrl("/iletisim", "/en/contact");
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = heroRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

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
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            {/* Hero */}
            <section
                ref={heroRef}
                onMouseMove={handleMouseMove}
                className="relative overflow-hidden bg-[#0a0a0f]"
            >
                <div
                    className="aurora-blob aurora-drift"
                    style={{ width: 640, height: 640, top: "-18%", left: "4%", background: "radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%)" }}
                />
                <div
                    className="aurora-blob aurora-drift2"
                    style={{ width: 560, height: 560, top: "-12%", right: "0%", background: "radial-gradient(circle, rgba(34,211,238,0.3), transparent 70%)" }}
                />
                <div
                    className="aurora-blob aurora-drift3"
                    style={{ width: 520, height: 520, top: "8%", left: "40%", background: "radial-gradient(circle, rgba(232,121,249,0.22), transparent 70%)" }}
                />
                <div className="hero-mouse-glow" />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(180deg, rgba(10,10,15,.1), rgba(10,10,15,.84))" }}
                />

                <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-12 pt-32 pb-16">
                    <div className="max-w-[920px]">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] px-3.5 py-[7px] mb-[30px]"
                        >
                            <span className="h-[7px] w-[7px] rounded-full bg-[#4ade80] live-dot" style={{ boxShadow: "0 0 10px #4ade80" }} />
                            <span
                                className="text-[12px] uppercase tracking-[0.08em] text-[rgba(255,255,255,.7)]"
                                style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 500 }}
                            >
                                {t("İLETİŞİM", "CONTACT")}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.05 }}
                            className="text-white font-bold tracking-[-0.02em] leading-[0.98]"
                            style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(40px, 7vw, 76px)" }}
                        >
                            {language === "tr" ? (
                                <>
                                    Hadi
                                    <br />
                                    <span className="shimmer-text">konuşalım.</span>
                                </>
                            ) : (
                                <>
                                    Let&apos;s
                                    <br />
                                    <span className="shimmer-text">talk.</span>
                                </>
                            )}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.12 }}
                            className="mt-[26px] max-w-[560px] text-[rgba(255,255,255,.64)]"
                            style={{ fontFamily: "var(--font-manrope)", fontSize: 19, lineHeight: 1.55 }}
                        >
                            {t(
                                "Etkinliğiniz için fiyat teklifi alın, iş birliği teklif edin veya sadece merhaba deyin.",
                                "Get a quote for your event, propose a partnership, or just say hello."
                            )}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main content */}
            <section className="relative max-w-[1240px] mx-auto px-6 sm:px-12 pb-20 sm:pb-24 grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
                {/* Left: contact info */}
                <div className="lg:col-span-2 space-y-8">
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
                            "Zeytinlik, Fişekhane Cd. 5/17\n34140 Bakırköy / Istanbul"
                        )}
                    />
                </div>

                {/* Right: form */}
                <div className="lg:col-span-3">
                    {status === "sent" ? (
                        <div className="flex flex-col items-start gap-5 py-16 border-t border-white/[0.08]">
                            <div className="w-12 h-12 rounded-full bg-[#4ade80]/10 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-[#4ade80]" />
                            </div>
                            <div>
                                <h3
                                    className="text-white mb-2"
                                    style={{ fontFamily: "var(--font-space-grotesk)", fontSize: 24, fontWeight: 600 }}
                                >
                                    {t("Mesajınız İletildi!", "Message Sent!")}
                                </h3>
                                <p
                                    className="text-[rgba(255,255,255,.5)]"
                                    style={{ fontFamily: "var(--font-manrope)", fontSize: 14, lineHeight: 1.6 }}
                                >
                                    {t("En kısa sürede size dönüş yapacağız. Teşekkür ederiz.", "We'll get back to you shortly. Thank you.")}
                                </p>
                            </div>
                            <button
                                onClick={() => setStatus("idle")}
                                className="flex items-center gap-2 text-sm font-semibold transition-colors mt-2 text-[var(--acc)] hover:text-white"
                                style={{ fontFamily: "var(--font-manrope)" }}
                            >
                                {t("Yeni Mesaj Gönder", "Send Another Message")}
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-[20px] border border-white/10 p-6 sm:p-8"
                            style={{ background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))" }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                <Field label={t("Ad Soyad", "Full Name")} required>
                                    <UnderlineInput
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder={t("Adınız Soyadınız", "Your Full Name")}
                                    />
                                </Field>
                                <Field label={t("E-Posta", "Email")} required>
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
                                <Field label={t("Konu", "Subject")} required>
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
                                    placeholder={t("Mesajınızı buraya yazın...", "Write your message here...")}
                                    className="w-full bg-transparent border-b border-white/[0.14] focus:border-[var(--acc)] outline-none py-3 text-white text-sm placeholder:text-white/30 transition-colors resize-none"
                                    style={{ fontFamily: "var(--font-manrope)" }}
                                />
                            </Field>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-[#f87171] text-sm pt-4" style={{ fontFamily: "var(--font-manrope)" }}>
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{t("Mesaj gönderilemedi. Lütfen tekrar deneyin.", "Message could not be sent. Please try again.")}</span>
                                </div>
                            )}

                            <div className="pt-10">
                                <button
                                    type="submit"
                                    disabled={status === "sending"}
                                    className="group inline-flex items-center gap-3 text-white font-semibold uppercase tracking-[0.1em] text-xs px-8 py-4 rounded-full transition-transform hover:-translate-y-0.5 disabled:opacity-40"
                                    style={{ background: "linear-gradient(90deg, #7c3aed, var(--acc))", fontFamily: "var(--font-manrope)" }}
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    {status === "sending" ? t("Gönderiliyor...", "Sending...") : t("Mesaj Gönder", "Send Message")}
                                    <ArrowRight className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* Map */}
            <div className="border-t border-white/[0.08]">
                <div className="h-[360px] lg:h-[420px] w-full grayscale opacity-70 hover:opacity-90 hover:grayscale-0 transition-all duration-700">
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
            <div
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center shrink-0 transition-colors"
                style={{ color: "var(--acc)", background: "rgba(255,255,255,.04)" }}
            >
                {icon}
            </div>
            <div>
                <p
                    className="uppercase tracking-[0.14em] text-[rgba(255,255,255,.4)] mb-1"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, fontWeight: 500 }}
                >
                    {label}
                </p>
                <div
                    className="text-[rgba(255,255,255,.8)] group-hover:text-white transition-colors leading-relaxed"
                    style={{ fontFamily: "var(--font-manrope)", fontSize: 15, fontWeight: 500 }}
                >
                    {lines.map((l, i) => (
                        <span key={i} className="block">
                            {l}
                        </span>
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
        <div className={`border-t border-white/[0.08] ${full ? "" : ""}`}>
            <div className="pt-5 pb-2">
                <label
                    className="block uppercase tracking-[0.14em] text-[rgba(255,255,255,.5)] mb-0"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, fontWeight: 500 }}
                >
                    {label}
                    {required && <span className="text-[var(--acc)] ml-1">*</span>}
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
            className="w-full bg-transparent border-b border-white/[0.14] focus:border-[var(--acc)] outline-none py-3 text-white text-sm placeholder:text-white/30 transition-colors"
            style={{ fontFamily: "var(--font-manrope)" }}
        />
    );
}
