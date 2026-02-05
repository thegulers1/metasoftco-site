"use client";

import { useState, useRef } from "react";

interface GalleryUploadProps {
    value: string[]; // URL array
    onChange: (urls: string[]) => void;
    folder?: string;
    label?: string;
    maxImages?: number;
}

export default function GalleryUpload({
    value = [],
    onChange,
    folder = "gallery",
    label = "Galeri",
    maxImages = 10,
}: GalleryUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Limit kontrolü
        if (value.length + files.length > maxImages) {
            setError(`En fazla ${maxImages} görsel ekleyebilirsiniz`);
            return;
        }

        setError(null);
        setUploading(true);

        const newUrls: string[] = [];

        for (const file of Array.from(files)) {
            // Dosya boyutu kontrolü (10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError("Her dosya maksimum 10MB olabilir");
                continue;
            }

            try {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", `metasoftco/${folder}`);

                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (res.ok) {
                    const data = await res.json();
                    newUrls.push(data.url);
                }
            } catch (err) {
                console.error("Upload error:", err);
            }
        }

        onChange([...value, ...newUrls]);
        setUploading(false);

        // Input'u resetle
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const handleRemove = (index: number) => {
        const newUrls = [...value];
        newUrls.splice(index, 1);
        onChange(newUrls);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
                {label} ({value.length}/{maxImages})
            </label>

            {/* Mevcut görseller */}
            {value.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {value.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                            <img
                                src={url}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Yükleme alanı */}
            {value.length < maxImages && (
                <div
                    onClick={() => inputRef.current?.click()}
                    className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${uploading
                        ? "border-black/20 bg-black/5"
                        : "border-black/20 hover:border-black/40 hover:bg-black/5"
                        }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            <p className="mt-2 text-xs text-black/50">Yükleniyor...</p>
                        </div>
                    ) : (
                        <>
                            <svg className="w-8 h-8 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <p className="mt-1 text-xs text-black/50">Görsel ekle (çoklu seçim yapabilirsin)</p>
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
                multiple
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
