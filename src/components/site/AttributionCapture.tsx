"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Remembers how the visitor arrived so lead forms can report their source. */
export default function AttributionCapture() {
    useEffect(() => {
        captureAttribution();
    }, []);
    return null;
}
