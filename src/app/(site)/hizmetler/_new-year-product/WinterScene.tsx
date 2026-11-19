"use client";

import { useState, type CSSProperties } from "react";
import styles from "./new-year-product.module.css";

/** Deterministic positions keep SSR/hydration identical. Motion is optional. */
export function WinterScene() {
    const [paused, setPaused] = useState(false);
    return <>
        <div className={styles.snowfall} data-paused={paused} aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => <i key={i} style={{
                "--x": `${(i * 37 + 11) % 100}%`,
                "--delay": `${-(i * 1.7) % 15}s`,
                "--duration": `${12 + i % 8}s`,
                "--size": `${2 + i % 4}px`,
                "--drift": `${(i % 2 ? 1 : -1) * (25 + i * 2)}px`,
            } as CSSProperties} />)}
        </div>
        <button type="button" className={styles.snowToggle} aria-pressed={!paused} onClick={() => setPaused(!paused)} aria-label={paused ? "Kar animasyonunu başlat" : "Kar animasyonunu durdur"}>
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span> Kar {paused ? "başlasın" : "yağıyor"}
        </button>
    </>;
}
