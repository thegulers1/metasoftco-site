"use client";

import { useState, useRef } from "react";
import MediaLibrary from "./MediaLibrary";

interface ImageUploadProps {
    value?: string | null;
    onChange: (url: string | null) => void;
    folder?: string;
    label?: string;
}

export default function ImageUpload({
    value,
    onChange,
    folder = "services",
    label = "Görsel",
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Dosya boyutu kontrolü (10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("Dosya boyutu 10MB'dan küçük olmalı");
            return;
        }

        setError(null);
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", `metasoftco/${folder}`);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            const data = await res.json();
            onChange(data.url);
        } catch (err) {
            setError("Yükleme başarısız oldu");
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-black/70">
                    {label}
                </label>
                {!value && (
                    <button
                        type="button"
                        onClick={() => setIsLibraryOpen(true)}
                        className="text-xs font-bold text-black/40 hover:text-black flex items-center gap-1 transition-colors"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Kütüphaneden Seç
                    </button>
                )}
            </div>

            {value ? (
                <div className="relative group">
                    <img
                        src={value}
                        alt="Uploaded"
                        className="w-full h-48 object-cover rounded-2xl border bg-black/5"
                    />
                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition shadow-lg opacity-0 group-hover:opacity-100"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className={`w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition ${uploading
                        ? "border-black/10 bg-black/5"
                        : "border-black/10 hover:border-blue-500/30 hover:bg-blue-50/10"
                        }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                            <p className="mt-2 text-sm text-black/50">Yükleniyor...</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center mb-3 text-black/20 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-black/50">Görsel yüklemek için tıkla</p>
                            <p className="text-[10px] text-black/30 mt-1 uppercase tracking-widest font-bold">PNG, JPG, WEBP (max 10MB)</p>
                        </>
                    )}
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />

            <MediaLibrary
                isOpen={isLibraryOpen}
                onClose={() => setIsLibraryOpen(false)}
                onSelect={(url) => onChange(url)}
                currentUrl={value}
            />
        </div>
    );
}
