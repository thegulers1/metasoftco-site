"use client";

import { useState, useRef } from "react";
import MediaLibrary from "./MediaLibrary";

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
    const [isLibraryOpen, setIsLibraryOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadFiles = async (files: FileList | File[]) => {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);

        // Sadece görsel dosyalarını filtrele
        const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length === 0) {
            setError("Lütfen sadece görsel dosyaları yükleyin");
            return;
        }

        // Limit kontrolü
        if (value.length + imageFiles.length > maxImages) {
            setError(`En fazla ${maxImages} görsel ekleyebilirsiniz`);
            return;
        }

        setError(null);
        setUploading(true);

        const newUrls: string[] = [];

        for (const file of imageFiles) {
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

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            await uploadFiles(files);
        }
    };

    const handleRemove = (index: number) => {
        const newUrls = [...value];
        newUrls.splice(index, 1);
        onChange(newUrls);
    };

    const handleSelectFromLibrary = (url: string) => {
        if (value.length >= maxImages) {
            setError(`En fazla ${maxImages} görsel ekleyebilirsiniz`);
            return;
        }
        if (value.includes(url)) return; // Zaten varsa ekleme
        onChange([...value, url]);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            await uploadFiles(files);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-black/70">
                    {label} ({value.length}/{maxImages})
                </label>
                {value.length < maxImages && (
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

            {/* Mevcut görseller */}
            {value.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                    {value.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border bg-black/5">
                            <img
                                src={url}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition opacity-0 group-hover:opacity-100 shadow-lg"
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
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`w-full h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition ${uploading
                        ? "border-black/10 bg-black/5"
                        : isDragging
                            ? "border-blue-500 bg-blue-50/20 scale-[1.02]"
                            : "border-black/10 hover:border-blue-500/30 hover:bg-blue-50/10"
                        }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="w-6 h-6 border-2 border-black/10 border-t-black rounded-full animate-spin" />
                            <p className="mt-2 text-xs text-black/50">Yükleniyor...</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center mb-2 text-black/20 group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <p className="text-xs font-medium text-black/50">
                                {isDragging ? "Dosyaları buraya bırak" : "Tıkla veya sürükle-bırak"}
                            </p>
                            {!isDragging && (
                                <p className="text-[10px] text-black/30 mt-0.5">Çoklu seçim desteklenir</p>
                            )}
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
                multiple
                onChange={handleUpload}
                className="hidden"
            />

            <MediaLibrary
                isOpen={isLibraryOpen}
                onClose={() => setIsLibraryOpen(false)}
                onSelect={handleSelectFromLibrary}
            />
        </div>
    );
}
