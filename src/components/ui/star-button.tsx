"use client";

import React from "react";
import styles from "./star-button.module.css";
import { cn } from "@/lib/utils";

interface StarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function StarButton({ children, className, ...props }: StarButtonProps) {
    const StarIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 784.11 815.53"
        >
            <defs></defs>
            <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                    className={styles.fil0}
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                ></path>
            </g>
        </svg>
    );

    return (
        <button className={cn(styles.starButton, className)} {...props}>
            {children}
            <div className={styles.star1}>
                <StarIcon />
            </div>
            <div className={styles.star2}>
                <StarIcon />
            </div>
            <div className={styles.star3}>
                <StarIcon />
            </div>
            <div className={styles.star4}>
                <StarIcon />
            </div>
            <div className={styles.star5}>
                <StarIcon />
            </div>
            <div className={styles.star6}>
                <StarIcon />
            </div>
        </button>
    );
}
