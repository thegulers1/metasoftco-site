"use client";

import { useState } from "react";

interface Props {
    serviceId: string;
    initialFeatured: boolean;
    initialFeaturedOrder: number;
    orderOnly?: boolean;
}

export function ServiceFeaturedToggle({
    serviceId,
    initialFeatured,
    initialFeaturedOrder,
    orderOnly,
}: Props) {
    const [featured, setFeatured] = useState(initialFeatured);
    const [featuredOrder, setFeaturedOrder] = useState(initialFeaturedOrder);
    const [saving, setSaving] = useState(false);

    async function update(data: { featured?: boolean; featuredOrder?: number }) {
        setSaving(true);
        try {
            await fetch(`/api/services/${serviceId}/featured`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
        } catch (e) {
            console.error("Failed to update:", e);
        } finally {
            setSaving(false);
        }
    }

    if (orderOnly) {
        return (
            <input
                type="number"
                value={featuredOrder}
                onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setFeaturedOrder(val);
                }}
                onBlur={() => update({ featuredOrder })}
                disabled={saving}
                className="w-16 px-2 py-1 text-sm text-center border border-black/10 rounded bg-white text-black disabled:opacity-50"
            />
        );
    }

    return (
        <input
            type="checkbox"
            checked={featured}
            onChange={(e) => {
                const val = e.target.checked;
                setFeatured(val);
                update({ featured: val });
            }}
            disabled={saving}
            className="w-4 h-4 accent-black cursor-pointer disabled:opacity-50"
        />
    );
}
