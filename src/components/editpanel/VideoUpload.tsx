"use client";

import { useState, useRef } from "react";

interface VideoUploadProps {
    value?: string | null;
    onChange: (url: string | null) => void;
    folder?: string;
    label?: string;
}

export default function VideoUpload({
    value,
    onChange,
    folder = "videos",
    label = "Video",
}: VideoUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadFile = async (file: File) => {
        if (!file) return;

        // Dosya boyutu kontrolü (100MB)
        if (file.size > 100 * 1024 * 1024) {
            setError("Video boyutu 100MB'dan küçük olmalı");
            return;
        }

        // Video formatı kontrolü
        if (!file.type.startsWith("video/")) {
            setError("Lütfen video dosyası yükleyin");
            return;
        }

        setError(null);
        setUploading(true);
        setProgress(10);

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", `metasoftco/${folder}`);

            setProgress(30);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            setProgress(80);

            if (!res.ok) {
                throw new Error("Upload failed");
            }

            const data = await res.json();
            setProgress(100);
            onChange(data.url);
        } catch (err) {
            setError("Video yüklemesi başarısız oldu");
            console.error(err);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await uploadFile(file);
        }
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
            await uploadFile(files[0]);
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
                {label}
            </label>

            {value ? (
                <div className="relative">
                    <video
                        src={value}
                        controls
                        className="w-full h-48 rounded-lg bg-black object-contain"
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
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${uploading
                            ? "border-black/20 bg-black/5"
                            : isDragging
                                ? "border-blue-500 bg-blue-50/20 scale-[1.02]"
                                : "border-black/20 hover:border-black/40 hover:bg-black/5"
                        }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center w-full px-8">
                            <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-black transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="mt-2 text-sm text-black/50">Yükleniyor... {progress}%</p>
                        </div>
                    ) : (
                        <>
                            <svg className="w-10 h-10 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-2 text-sm text-black/50">
                                {isDragging ? "Video dosyasını buraya bırak" : "Tıkla veya sürükle-bırak"}
                            </p>
                            {!isDragging && (
                                <p className="text-xs text-black/30">MP4, MOV, WEBM (max 100MB)</p>
                            )}
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
                accept="video/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
}
