import { P2Display, p2PlainText } from "./P2Display";

export function SignalHeading({ solid, outline, as = "h1", className = "", label }: { solid: string; outline: string; as?: "h1" | "h2"; className?: string; label?: string }) {
    const Tag = as;
    return (
        <Tag
            aria-label={label ?? p2PlainText(`${solid} ${outline}`)}
            className={`p2-screen-title ${className}`.trim()}
        >
            <span><P2Display text={solid} /></span>
            <span className="p2-screen-title__outline" data-text={outline}>{outline}</span>
        </Tag>
    );
}
