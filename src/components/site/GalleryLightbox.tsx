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
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setIsOpen(false);
        document.body.style.overflow = "auto";
    };

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goToNext();
            if (e.key === "ArrowLeft") goToPrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, goToNext, goToPrev]);

    return (
        <div className="w-full">
            {/* Horizontal Scroll Gallery (Carousel) */}
            <div className="relative group">
                <div className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    {images.map((imageUrl, index) => (
                        <motion.div
                            key={index}
                            onClick={() => openLightbox(index)}
                            className="relative flex-none h-[400px] md:h-[600px] w-auto snap-center cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[0.98] group/item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <img
                                src={cloudinaryOptimize(imageUrl, 1200)}
                                alt={`${title} - ${index + 1}`}
                                className="h-full w-auto object-contain bg-black/[0.02] pointer-events-none select-none"
                                loading="lazy"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                                <span className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-black uppercase tracking-wider">
                                    Büyüt
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl"
                        onClick={closeLightbox}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 z-10 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Navigation Buttons (Desktop) */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrev();
                            }}
                            className="hidden md:flex absolute left-6 z-10 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        >
                            <ChevronLeft className="w-10 h-10" />
                        </button>

                        {/* Image Container */}
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: -20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative z-10 max-w-[95vw] max-h-[85vh] flex items-center justify-center select-none"
                            onClick={(e) => e.stopPropagation()}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(_, info) => {
                                if (info.offset.x > 100) goToPrev();
                                else if (info.offset.x < -100) goToNext();
                            }}
                        >
                            <img
                                src={cloudinaryOptimize(images[currentIndex], 2400)}
                                alt={`${title} - ${currentIndex + 1}`}
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                            />

                            {/* Counter & Info */}
                            <div className="absolute -bottom-12 left-0 right-0 flex flex-col items-center gap-1">
                                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
                                    {title}
                                </p>
                                <div className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white text-xs font-mono">
                                    {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                                </div>
                            </div>
                        </motion.div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="hidden md:flex absolute right-6 z-10 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                        >
                            <ChevronRight className="w-10 h-10" />
                        </button>

                        {/* Mobile Swipe Hint */}
                        <div className="md:hidden absolute bottom-8 text-white/30 text-[10px] uppercase tracking-widest">
                            Kaydırarak geçiş yapabilirsiniz
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
