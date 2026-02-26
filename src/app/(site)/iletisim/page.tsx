"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/providers/LanguageProvider";

export default function ContactPage() {
    const { t } = useLanguage();
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
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* ─── SOL PANEL — %33 Kırmızı ─── */}
            <div className="w-full md:w-1/3 bg-red-600 text-white flex flex-col px-8 md:px-10 pt-24 md:pt-36 pb-12">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-12 leading-none">
                    {t("İletişim", "Contact")}
                </h1>

                {/* Bilgiler */}
                <div className="space-y-8 mb-10">
                    <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 mt-0.5 shrink-0 opacity-70" />
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{t("Telefon", "Phone")}</p>
                            <a
                                href="tel:+905342334051"
                                className="text-base font-medium hover:text-white/75 transition-colors"
                            >
                                +90 534 233 4051
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 mt-0.5 shrink-0 opacity-70" />
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{t("E-Posta", "E-Mail")}</p>
                            <a
                                href="mailto:info@metasoftco.com"
                                className="text-base font-medium hover:text-white/75 transition-colors break-all"
                            >
                                info@metasoftco.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 mt-0.5 shrink-0 opacity-70" />
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">{t("Adres", "Address")}</p>
                            <p className="text-base font-medium leading-relaxed">
                                Zeytinlik Mah. Fişekhane Cd.<br />
                                5/17 Bakırköy, İstanbul
                            </p>
                        </div>
                    </div>
                </div>

                {/* Google Maps */}
                <div className="flex-1 min-h-[220px] rounded-xl overflow-hidden opacity-90">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1506.07891589804!2d28.872877898521597!3d40.97802464471601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab5abfb7a082f%3A0x9fa556de25d2775d!2sMetasoftCo%20-%20%C4%B0nteraktif%20Deneyim%20Ajans%C4%B1!5e0!3m2!1str!2str!4v1772108241472!5m2!1str!2str"
                        width="100%"
                        height="100%"
                        className="w-full h-full min-h-[220px]"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Metasoftco Konum"
                    />
                </div>
            </div>

            {/* ─── SAĞ PANEL — %67 Beyaz ─── */}
            <div className="w-full md:w-2/3 bg-white flex items-start justify-center px-8 md:px-16 pt-24 md:pt-36 pb-16">
                <div className="w-full max-w-2xl">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-black/40 mb-2">
                        {t("Hadi Konuşalım", "Let's Talk")}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-10 leading-tight">
                        {t("Nasıl Yardımcı", "How Can We")}<br />{t("Olabiliriz?", "Help You?")}
                    </h2>

                    {status === "sent" ? (
                        <div className="flex flex-col items-start gap-4 py-12">
                            <CheckCircle className="w-14 h-14 text-green-500" />
                            <h3 className="text-2xl font-bold text-black">{t("Mesajınız İletildi!", "Message Sent!")}</h3>
                            <p className="text-black/60">
                                {t("En kısa sürede size dönüş yapacağız. Teşekkür ederiz.", "We'll get back to you shortly. Thank you.")}
                            </p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-4 text-sm uppercase tracking-widest text-red-600 font-semibold hover:underline"
                            >
                                {t("Yeni Mesaj Gönder", "Send New Message")}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                                        {t("Ad Soyad", "Full Name")} <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder={t("Adınız Soyadınız", "Your Full Name")}
                                        className="w-full border-b-2 border-black/10 focus:border-red-600 outline-none py-3 text-black bg-transparent transition-colors placeholder:text-black/25 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                                        {t("E-Posta", "E-Mail")} <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="ornek@email.com"
                                        className="w-full border-b-2 border-black/10 focus:border-red-600 outline-none py-3 text-black bg-transparent transition-colors placeholder:text-black/25 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                                        {t("Telefon", "Phone")}
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+90 5XX XXX XX XX"
                                        className="w-full border-b-2 border-black/10 focus:border-red-600 outline-none py-3 text-black bg-transparent transition-colors placeholder:text-black/25 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                                        {t("Konu", "Subject")} <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder={t("Mesajınızın konusu", "Subject of your message")}
                                        className="w-full border-b-2 border-black/10 focus:border-red-600 outline-none py-3 text-black bg-transparent transition-colors placeholder:text-black/25 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                                    {t("Mesaj", "Message")} <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder={t("Mesajınızı buraya yazın...", "Write your message here...")}
                                    className="w-full border-b-2 border-black/10 focus:border-red-600 outline-none py-3 text-black bg-transparent transition-colors resize-none placeholder:text-black/25 text-sm"
                                />
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{t("Mesaj gönderilemedi. Lütfen tekrar deneyin.", "Message could not be sent. Please try again.")}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold uppercase tracking-[0.15em] text-sm px-8 py-4 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                {status === "sending" ? t("Gönderiliyor...", "Sending...") : t("Mesaj Gönder", "Send Message")}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
