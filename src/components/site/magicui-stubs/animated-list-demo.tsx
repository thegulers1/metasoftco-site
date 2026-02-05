"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function AnimatedListDemo({ className }: { className?: string }) {
    const notifications = [
        { name: "Payment Received", description: "You received $240.00", time: "2m ago", icon: "💰", color: "#00C9A7" },
        { name: "New User Registered", description: "Alice just joined", time: "5m ago", icon: "👤", color: "#FFB800" },
        { name: "New message", description: "Hey, check this out!", time: "10m ago", icon: "💬", color: "#FF3D71" },
        { name: "Server Update", description: "Version 2.0 deployed", time: "15m ago", icon: "🚀", color: "#1E88E5" },
    ];

    return (
        <div className={cn("flex flex-col gap-4 p-4", className)}>
            {notifications.map((item, idx) => (
                <div
                    key={idx}
                    className="flex items-center gap-4 rounded-xl border bg-white/50 p-4 backdrop-blur-sm dark:bg-black/50"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg" style={{ backgroundColor: item.color + "20" }}>
                        {item.icon}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">{item.name}</span>
                        <span className="text-xs text-neutral-500">{item.description}</span>
                    </div>
                    <span className="ml-auto text-[10px] text-neutral-400">{item.time}</span>
                </div>
            ))}
        </div>
    );
}
