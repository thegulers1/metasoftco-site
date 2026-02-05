"use client";

import { useState, useRef } from "react";

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
            <label className="block text-sm font-medium text-black/70 mb-2">
                {label}
            </label>

            {value ? (
                <div className="relative">
                    <img
                        src={value}
                        alt="Uploaded"
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={() => onChange(null)}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${uploading
                            ? "border-black/20 bg-black/5"
                            : "border-black/20 hover:border-black/40 hover:bg-black/5"
                        }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            <p className="mt-2 text-sm text-black/50">Yükleniyor...</p>
                        </div>
                    ) : (
                        <>
                            <svg className="w-10 h-10 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2 text-sm text-black/50">Görsel yüklemek için tıkla</p>
                            <p className="text-xs text-black/30">PNG, JPG, WEBP (max 10MB)</p>
                        </>
                    )}
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
