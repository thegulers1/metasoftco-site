"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPage() {
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
                    İleti<br />şim
                </h1>

                {/* Bilgiler */}
                <div className="space-y-8 mb-10">
                    <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 mt-0.5 shrink-0 opacity-70" />
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Telefon</p>
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
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">E-Posta</p>
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
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-1">Adres</p>
                            <p className="text-base font-medium leading-relaxed">
                                Zeytinlik Mah. Fişekhane Cd.<br />
                                5/17 Bakırköy, İstanbul
                            </p>
                        </div>
                    </div>
                </div>

                {/* Google Maps */}
                <div className="flex-1 min-h-[220px] rounded-xl overflow-hidden opacity-90">
                    {/* TODO: Google Maps pinini güncelledikten sonra aşağıdaki src'yi
                         Google Maps > Share > Embed a map'ten aldığın URL ile değiştir */}
                    <iframe
                        src="https://maps.google.com/maps?q=Fi%C5%9Eekhane+Caddesi+Bak%C4%B1rk%C3%B6y+%C4%B0stanbul&output=embed"
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
                        Hadi Konuşalım
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-10 leading-tight">
                        Nasıl Yardımcı<br />Olabiliriz?
                    </h2>

                    {status === "sent" ? (
                        <div className="flex flex-col items-start gap-4 py-12">
                            <CheckCircle className="w-14 h-14 text-green-500" />
                            <h3 className="text-2xl font-bold text-black">Mesajınız İletildi!</h3>
                            <p className="text-black/60">
                                En kısa sürede size dönüş yapacağız. Teşekkür ederiz.
                            </p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="mt-4 text-sm uppercase tracking-widest text-red-600 font-semibold hover:underline"
                            >
                                Yeni Mesaj Gönder
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                                        Ad Soyad <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Adınız Soyadınız"
                                        className="w-full border-b-2 border-black/10 focus:border-red-600 outline-none py-3 text-black bg-transparent transition-colors placeholder:text-black/25 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                                        E-Posta <span className="text-red-600">*</span>
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
                                        Telefon
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
                                        Konu <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="Mesajınızın konusu"
                                        className="w-full border-b-2 border-black/10 focus:border-red-600 outline-none py-3 text-black bg-transparent transition-colors placeholder:text-black/25 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                                    Mesaj <span className="text-red-600">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={5}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Mesajınızı buraya yazın..."
                                    className="w-full border-b-2 border-black/10 focus:border-red-600 outline-none py-3 text-black bg-transparent transition-colors resize-none placeholder:text-black/25 text-sm"
                                />
                            </div>

                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>Mesaj gönderilemedi. Lütfen tekrar deneyin.</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="flex items-center gap-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold uppercase tracking-[0.15em] text-sm px-8 py-4 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                {status === "sending" ? "Gönderiliyor..." : "Mesaj Gönder"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
