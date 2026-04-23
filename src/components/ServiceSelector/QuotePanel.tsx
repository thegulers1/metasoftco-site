"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useQuoteStore } from "./useQuoteStore";
import { useLanguage } from "@/providers/LanguageProvider";
import Image from "next/image";

const PARTICIPANT_OPTIONS_TR = ["<50", "50–200", "200–500", "500+"];
const PARTICIPANT_OPTIONS_EN = ["<50", "50–200", "200–500", "500+"];

interface FormState {
    name: string;
    email: string;
    phone: string;
    eventDate: string;
    participants: string;
    notes: string;
}

const EMPTY_FORM: FormState = {
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    participants: "",
    notes: "",
};

export function QuotePanel() {
    const { selected, panelOpen, closePanel, remove, clear } = useQuoteStore();
    const { language } = useLanguage();
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const tr = (trText: string, enText: string) => language === "en" ? enText : trText;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone) return;
        if (selected.length === 0) return;

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/quote-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    services: selected.map(s => ({
                        id: s.id,
                        title: language === "en" ? (s.title_en || s.title) : s.title,
                        url: language === "en" && s.slug_en && s.categorySlugEn
                            ? `/en/services/${s.categorySlugEn}/${s.slug_en}`
                            : `/hizmetler/${s.categorySlug}/${s.slug}`,
                    })),
                    language,
                }),
            });

            if (!res.ok) throw new Error();
            setStatus("success");
            setForm(EMPTY_FORM);
            clear();
            setTimeout(() => {
                setStatus("idle");
                closePanel();
            }, 3500);
        } catch {
            setStatus("error");
            setErrorMsg(tr("E-posta gönderilemedi, lütfen tekrar deneyin.", "Failed to send, please try again."));
        }
    };

    return (
        <AnimatePresence>
            {panelOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
                        onClick={closePanel}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 220 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md z-[301] bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
                            <h2 className="text-lg font-bold tracking-tight text-black uppercase">
                                {tr("Teklif İste", "Request a Quote")}
                            </h2>
                            <button
                                onClick={closePanel}
                                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 transition text-black/50 hover:text-black"
                                aria-label={tr("Kapat", "Close")}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto">

                            {/* Success State */}
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold text-black mb-2">
                                            {tr("Talebiniz Alındı!", "Request Received!")}
                                        </p>
                                        <p className="text-black/60 text-sm leading-relaxed">
                                            {tr(
                                                "En kısa sürede size dönüş yapacağız. Seçtiğiniz hizmetlerin özeti e-posta adresinize gönderildi.",
                                                "We'll get back to you as soon as possible. A summary of your selected services has been sent to your email."
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Selected Services */}
                                    <div className="px-6 py-5 border-b border-black/8">
                                        <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-3">
                                            {tr("Seçilen Hizmetler", "Selected Services")} ({selected.length})
                                        </p>
                                        {selected.length === 0 ? (
                                            <p className="text-sm text-black/40 italic">
                                                {tr("Henüz hizmet seçilmedi.", "No services selected yet.")}
                                            </p>
                                        ) : (
                                            <ul className="space-y-2">
                                                {selected.map(s => (
                                                    <li key={s.id} className="flex items-center gap-3 bg-black/3 rounded-lg px-3 py-2">
                                                        {s.image && (
                                                            <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-neutral-100">
                                                                <Image
                                                                    src={s.image}
                                                                    alt={s.title}
                                                                    width={40}
                                                                    height={40}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        )}
                                                        <span className="flex-1 text-sm font-medium text-black leading-tight">
                                                            {language === "en" ? (s.title_en || s.title) : s.title}
                                                        </span>
                                                        <button
                                                            onClick={() => remove(s.id)}
                                                            className="text-black/30 hover:text-red-600 transition-colors shrink-0"
                                                            aria-label={tr("Kaldır", "Remove")}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                                        <p className="text-xs font-bold uppercase tracking-widest text-black/40 mb-1">
                                            {tr("İletişim Bilgileri", "Contact Information")}
                                        </p>

                                        {/* Ad Soyad */}
                                        <div>
                                            <label className="block text-xs font-semibold text-black/60 mb-1.5 uppercase tracking-wider">
                                                {tr("Ad Soyad", "Full Name")} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                placeholder={tr("Adınız Soyadınız", "Your full name")}
                                                className="w-full border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors"
                                            />
                                        </div>

                                        {/* E-posta */}
                                        <div>
                                            <label className="block text-xs font-semibold text-black/60 mb-1.5 uppercase tracking-wider">
                                                {tr("E-posta", "Email")} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="ornek@sirket.com"
                                                className="w-full border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors"
                                            />
                                        </div>

                                        {/* Telefon */}
                                        <div>
                                            <label className="block text-xs font-semibold text-black/60 mb-1.5 uppercase tracking-wider">
                                                {tr("Telefon", "Phone")} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+90 5XX XXX XX XX"
                                                className="w-full border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors"
                                            />
                                        </div>

                                        {/* Etkinlik Tarihi */}
                                        <div>
                                            <label className="block text-xs font-semibold text-black/60 mb-1.5 uppercase tracking-wider">
                                                {tr("Etkinlik Tarihi", "Event Date")}
                                            </label>
                                            <input
                                                type="date"
                                                name="eventDate"
                                                value={form.eventDate}
                                                onChange={handleChange}
                                                className="w-full border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors text-black/70"
                                            />
                                        </div>

                                        {/* Katılımcı Sayısı */}
                                        <div>
                                            <label className="block text-xs font-semibold text-black/60 mb-1.5 uppercase tracking-wider">
                                                {tr("Tahmini Katılımcı", "Estimated Attendees")}
                                            </label>
                                            <select
                                                name="participants"
                                                value={form.participants}
                                                onChange={handleChange}
                                                className="w-full border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors text-black/70 bg-white"
                                            >
                                                <option value="">{tr("Seçiniz", "Select")}</option>
                                                {(language === "en" ? PARTICIPANT_OPTIONS_EN : PARTICIPANT_OPTIONS_TR).map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Notlar */}
                                        <div>
                                            <label className="block text-xs font-semibold text-black/60 mb-1.5 uppercase tracking-wider">
                                                {tr("Notlar", "Notes")}
                                            </label>
                                            <textarea
                                                name="notes"
                                                value={form.notes}
                                                onChange={handleChange}
                                                rows={3}
                                                placeholder={tr("Etkinliğiniz hakkında ek bilgi...", "Additional details about your event...")}
                                                className="w-full border border-black/15 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors resize-none"
                                            />
                                        </div>

                                        {errorMsg && (
                                            <p className="text-red-600 text-sm">{errorMsg}</p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === "loading" || selected.length === 0}
                                            className="w-full bg-red-600 text-white font-bold py-3.5 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm mt-2"
                                        >
                                            {status === "loading"
                                                ? tr("Gönderiliyor...", "Sending...")
                                                : tr("Teklif İste", "Request Quote")
                                            }
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
