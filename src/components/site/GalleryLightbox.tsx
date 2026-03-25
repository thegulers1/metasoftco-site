"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cloudinaryOptimize } from "@/lib/cloudinary";

interface GalleryLightboxProps {
    images: string[];
    title: string;
}

export default function GalleryLightbox({ images, title }: GalleryLightboxProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const open = (i: number) => {
        setLightboxIndex(i);
        document.body.style.overflow = "hidden";
    };

    const close = () => {
        setLightboxIndex(null);
        document.body.style.overflow = "";
    };

    const prev = useCallback(() => {
        setLightboxIndex((i) => i === null ? null : (i - 1 + images.length) % images.length);
    }, [images.length]);

    const next = useCallback(() => {
        setLightboxIndex((i) => i === null ? null : (i + 1) % images.length);
    }, [images.length]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightboxIndex, prev, next]);

    return (
        <>
            {/* ── MASONRY GRID ── */}
            <div className="columns-2 md:columns-3 gap-3 space-y-3">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="break-inside-avoid cursor-zoom-in overflow-hidden group relative"
                        onClick={() => open(i)}
                    >
                        <img
                            src={cloudinaryOptimize(img, 1000)}
                            alt={`${title} - ${i + 1}`}
                            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center"
                        onClick={close}
                    >
                        {/* Close */}
                        <button
                            onClick={close}
                            className="absolute top-5 right-5 z-20 p-2.5 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        >
                            <X className="w-7 h-7" />
                        </button>

                        {/* Counter */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-mono tracking-widest pointer-events-none">
                            {String(lightboxIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                        </div>

                        {/* Prev */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); prev(); }}
                                className="absolute left-4 md:left-8 z-20 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                <ChevronLeft className="w-9 h-9" />
                            </button>
                        )}

                        {/* Image */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                transition={{ duration: 0.18 }}
                                className="relative z-10 max-w-[88vw] max-h-[88vh] flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.15}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x > 80) prev();
                                    else if (info.offset.x < -80) next();
                                }}
                            >
                                <img
                                    src={cloudinaryOptimize(images[lightboxIndex], 2400)}
                                    alt={`${title} - ${lightboxIndex + 1}`}
                                    className="max-w-full max-h-[88vh] object-contain shadow-2xl pointer-events-none"
                                    draggable={false}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Next */}
                        {images.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); next(); }}
                                className="absolute right-4 md:right-8 z-20 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                <ChevronRight className="w-9 h-9" />
                            </button>
                        )}

                        {/* Mobile hint */}
                        <p className="md:hidden absolute bottom-6 text-white/25 text-[10px] uppercase tracking-widest pointer-events-none">
                            Kaydırarak geçiş yapabilirsiniz
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
