"use client";

import { useState } from "react";

interface Props {
    serviceId: string;
    initialPublished: boolean;
}

export function ServicePublishedToggle({ serviceId, initialPublished }: Props) {
    const [published, setPublished] = useState(initialPublished);
    const [saving, setSaving] = useState(false);

    async function update(value: boolean) {
        setSaving(true);
        try {
            await fetch(`/api/services/${serviceId}/published`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ published: value }),
            });
        } catch (e) {
            console.error("Failed to update:", e);
        } finally {
            setSaving(false);
        }
    }

    return (
        <button
            type="button"
            disabled={saving}
            onClick={() => {
                const val = !published;
                setPublished(val);
                update(val);
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition disabled:opacity-50 ${
                published
                    ? "bg-green-50 text-green-700 hover:bg-green-100"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
        >
            {published ? "Yayında" : "Taslak"}
        </button>
    );
}
