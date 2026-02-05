"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        agreed: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Backend bağlandığında: POST /api/contact
        console.log("Form submitted:", formData);
    };

    return (
        <footer className="relative overflow-hidden">
            {/* Big "contacts" Text */}
            <div className="bg-white pt-16 pb-0 relative z-10">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        className="text-[15vw] lg:text-[180px] font-black leading-[0.85] tracking-tighter text-black text-center -mb-[30%] lg:-mb-[100px]"
                        style={{ fontFamily: "var(--font-inter-tight)" }}
                    >
                        contacts
                    </h2>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative">
                {/* White background left side */}
                <div className="absolute top-0 left-0 w-1/3 h-full bg-white hidden lg:block" />

                {/* Orange background right side */}
                <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full bg-[#ff4d2d]" />

                <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 lg:py-16">
                        {/* Left - Social Links */}
                        <div className="lg:col-span-3 space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium uppercase tracking-wider text-black/50 bg-white/80 px-2 py-1 rounded">
                                    telegram
                                </span>
                                <Link
                                    href="https://t.me/metasoftco"
                                    target="_blank"
                                    className="text-sm text-black hover:underline"
                                >
                                    @metasoftco
                                </Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium uppercase tracking-wider text-black/50 bg-white/80 px-2 py-1 rounded">
                                    instagram
                                </span>
                                <Link
                                    href="https://instagram.com/metasoftco"
                                    target="_blank"
                                    className="text-sm text-black hover:underline"
                                >
                                    @metasoftco
                                </Link>
                            </div>
                        </div>

                        {/* Center - Contact Form */}
                        <div className="lg:col-span-5 bg-[#ff4d2d] lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none -mx-4 lg:mx-0 sm:-mx-6">
                            <div className="lg:pl-8">
                                <p className="text-sm text-white/80 mb-6">
                                    leave your contacts
                                    <br />
                                    and I'll get back to you
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full max-w-xs px-4 py-3 bg-white/90 border-0 rounded-none text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-white"
                                    />
                                    <input
                                        type="email"
                                        placeholder="e mail"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full max-w-xs px-4 py-3 bg-white/90 border-0 rounded-none text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-white"
                                    />

                                    <label className="flex items-start gap-3 cursor-pointer max-w-xs">
                                        <input
                                            type="checkbox"
                                            checked={formData.agreed}
                                            onChange={(e) =>
                                                setFormData({ ...formData, agreed: e.target.checked })
                                            }
                                            className="mt-1 w-4 h-4 rounded-none border-white/50 bg-transparent checked:bg-white checked:border-white focus:ring-white text-black"
                                        />
                                        <span className="text-xs text-white/70 leading-relaxed">
                                            by clicking the button, you consent to the processing
                                            of your personal data and agree to the{" "}
                                            <Link href="/gizlilik" className="underline">
                                                privacy policy
                                            </Link>
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition"
                                    >
                                        submit
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right - Illustration Placeholder */}
                        <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
                            {/* Placeholder for illustration - replace with actual image */}
                            <div className="w-64 h-64 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-white/50 text-sm text-center">
                                    İllüstrasyon
                                    <br />
                                    (görsel eklenecek)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#ff4d2d] lg:bg-white border-t border-white/20 lg:border-black/10">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-white/70 lg:text-black/50">
                            © 2025 MetasoftCo. Tüm hakları saklıdır.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link
                                href="/gizlilik"
                                className="text-xs text-white/70 lg:text-black/50 hover:text-white lg:hover:text-black transition"
                            >
                                Gizlilik Politikası
                            </Link>
                            <Link
                                href="/kullanim-kosullari"
                                className="text-xs text-white/70 lg:text-black/50 hover:text-white lg:hover:text-black transition"
                            >
                                Kullanım Koşulları
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// ============================================
// BACKEND ENTEGRASYONU:
// ============================================
// 
// Form submit için:
// POST /api/contact
// { name: string, email: string }
//
// İllüstrasyon için:
// /public/footer/illustration.png veya .svg
// ============================================
