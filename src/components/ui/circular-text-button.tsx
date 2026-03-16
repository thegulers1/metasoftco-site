"use client";

import React from "react";
import styles from "./circular-text-button.module.css";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CircularTextButtonProps {
    text: string;
    href: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

export function CircularTextButton({ text, href, className, style, onClick }: CircularTextButtonProps) {
    const characters = text.split("");
    const angleStep = 360 / characters.length;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(styles.button, className)}
            style={style}
        >
            <p className={styles.buttonText}>
                {characters.map((char, i) => (
                    <span
                        key={i}
                        style={{
                            transform: `rotate(${i * angleStep}deg)`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </p>

            <div className={styles.buttonCircle}>
                <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.buttonIcon}
                    width="14"
                >
                    <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                    ></path>
                </svg>

                <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                    className={cn(styles.buttonIcon, styles.buttonIconCopy)}
                >
                    <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                    ></path>
                </svg>
            </div>
        </Link>
    );
}
