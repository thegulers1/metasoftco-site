import { Fragment } from "react";

const OUTLINE_TOKEN = /(\{[^}]*\})/;

/**
 * Renders display copy coming from the phase 2 dictionary.
 *
 *   "\n"     → hard line break
 *   "{word}" → rendered with the outline/gradient stroke treatment
 */
export function P2Display({ text, outlineClassName = "p2-home-outline" }: { text: string; outlineClassName?: string }) {
    return (
        <>
            {text.split("\n").map((line, lineIndex) => (
                <Fragment key={lineIndex}>
                    {lineIndex > 0 && <br />}
                    {line.split(OUTLINE_TOKEN).filter(Boolean).map((token, tokenIndex) => {
                        if (!token.startsWith("{") || !token.endsWith("}")) return <Fragment key={tokenIndex}>{token}</Fragment>;
                        const word = token.slice(1, -1);
                        return <span key={tokenIndex} className={outlineClassName} data-text={word}>{word}</span>;
                    })}
                </Fragment>
            ))}
        </>
    );
}

/** Flattens dictionary display copy into a single accessible string. */
export function p2PlainText(text: string) {
    return text.replace(/[{}]/g, "").replace(/\n/g, " ").trim();
}
