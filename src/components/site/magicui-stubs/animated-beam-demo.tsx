"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function AnimatedBeamMultipleOutputDemo({ className }: { className?: string }) {
    return (
        <div className={cn("relative flex h-full w-full items-center justify-center overflow-hidden p-10", className)}>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex gap-8">
                    <div className="h-12 w-12 rounded-full bg-[#900a03]/20 flex items-center justify-center">🔗</div>
                    <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">☁️</div>
                    <div className="h-12 w-12 rounded-full bg-pink-500/20 flex items-center justify-center">📦</div>
                </div>
                <div className="h-16 w-16 rounded-2xl bg-white dark:bg-neutral-900 border flex items-center justify-center shadow-xl">
                    🤖
                </div>
            </div>
            {/* Visual beams simulation */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 h-px w-32 bg-gradient-to-r from-transparent via-[#900a03] to-transparent -translate-x-full -rotate-45" />
                <div className="absolute top-1/2 left-1/2 h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent -translate-x-1/2 -translate-y-8" />
                <div className="absolute top-1/2 left-1/2 h-px w-32 bg-gradient-to-r from-transparent via-pink-500 to-transparent rotate-45" />
            </div>
        </div>
    );
}
