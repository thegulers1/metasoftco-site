"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export interface ToastProps {
    id: string;
    message: string;
    type: "success" | "error";
    duration?: number;
    onClose: (id: string) => void;
}

export default function Toast({ id, message, type, duration = 4000, onClose }: ToastProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`min-w-[300px] max-w-md p-4 rounded-xl shadow-2xl flex items-start gap-3 ${
                type === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
            }`}
        >
            <div className="flex-shrink-0 mt-0.5">
                {type === "success" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
            </div>
            <div className="flex-1 pr-2">
                <p className="text-sm font-medium leading-relaxed">{message}</p>
            </div>
            <button
                onClick={() => onClose(id)}
                className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </motion.div>
    );
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastProps[], onClose: (id: string) => void }) {
    return (
        <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast {...toast} onClose={onClose} />
                    </div>
                ))}
            </AnimatePresence>
        </div>
    );
}
