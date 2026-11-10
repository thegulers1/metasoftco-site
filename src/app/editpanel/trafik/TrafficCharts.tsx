import type { DailyPoint } from "@/lib/traffic-report";

/** Pure-SVG / CSS charts for the Trafik screen; no chart library needed. */

export function DailyChart({ data }: { data: DailyPoint[] }) {
    const width = 720;
    const height = 220;
    const pad = { left: 32, right: 12, top: 12, bottom: 28 };
    const max = Math.max(4, ...data.map((d) => d.sessions));
    const niceMax = Math.ceil(max / 4) * 4;
    const innerW = width - pad.left - pad.right;
    const innerH = height - pad.top - pad.bottom;
    const step = data.length > 1 ? innerW / (data.length - 1) : innerW;
    const x = (i: number) => pad.left + i * step;
    const y = (v: number) => pad.top + innerH - (v / niceMax) * innerH;
    const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(d.sessions).toFixed(1)}`).join(" ");
    const area = `${line} L${x(data.length - 1).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`;
    const ticks = [0, 1, 2, 3, 4].map((t) => (niceMax / 4) * t);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Günlük oturum grafiği">
            {ticks.map((t) => (
                <g key={t}>
                    <line x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} stroke="#000" strokeOpacity="0.08" />
                    <text x={pad.left - 6} y={y(t) + 3} textAnchor="end" fontSize="10" fill="#000" fillOpacity="0.4">{t}</text>
                </g>
            ))}
            <path d={area} fill="#000" fillOpacity="0.06" />
            <path d={line} fill="none" stroke="#000" strokeWidth="2" strokeLinejoin="round" />
            {data.map((d, i) => (
                <g key={d.date}>
                    <circle cx={x(i)} cy={y(d.sessions)} r="3" fill="#000" />
                    {d.keyEvents > 0 && (
                        <>
                            <line x1={x(i)} x2={x(i)} y1={y(d.sessions)} y2={y(0)} stroke="#2563eb" strokeOpacity="0.35" strokeDasharray="3 3" />
                            <circle cx={x(i)} cy={y(0) - 6} r="5" fill="#2563eb" />
                            <text x={x(i)} y={y(0) - 3} textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">{d.keyEvents}</text>
                        </>
                    )}
                    {(i % 2 === 0 || data.length < 9) && (
                        <text x={x(i)} y={height - 8} textAnchor="middle" fontSize="10" fill="#000" fillOpacity="0.45">{d.date.slice(8)}.{d.date.slice(5, 7)}</text>
                    )}
                    <title>{`${d.date}: ${d.sessions} oturum, ${d.users} kullanıcı, ${d.keyEvents} anahtar olay`}</title>
                </g>
            ))}
        </svg>
    );
}

export interface BarItem { label: string; sub?: string; value: number; extra?: string; tone?: "default" | "warn" | "good" }

const TONE: Record<string, string> = { default: "bg-black", warn: "bg-red-500", good: "bg-blue-600" };

/** Horizontal bars; `value` sets the length, `extra` is the small right-hand figure. */
export function BarList({ items, unit }: { items: BarItem[]; unit?: string }) {
    const max = Math.max(1, ...items.map((item) => item.value));
    return (
        <ul className="space-y-3">
            {items.map((item) => (
                <li key={item.label + (item.sub ?? "")}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="text-black truncate" title={item.label}>{item.label}</span>
                        <span className="shrink-0 text-black/70">
                            <b className="text-black">{item.value}</b>{unit ? ` ${unit}` : ""}
                            {item.extra && <span className="ml-2 text-xs text-black/40">{item.extra}</span>}
                        </span>
                    </div>
                    <div className="mt-1 h-2 rounded bg-black/5">
                        <div className={`h-2 rounded ${TONE[item.tone ?? "default"]}`} style={{ width: `${Math.max(2, (item.value / max) * 100)}%` }} />
                    </div>
                    {item.sub && <p className="mt-0.5 text-[11px] text-black/35 truncate">{item.sub}</p>}
                </li>
            ))}
        </ul>
    );
}

export interface FunnelStep { label: string; value: number }

/** Where visitors drop on the way to contacting us. */
export function Funnel({ steps }: { steps: FunnelStep[] }) {
    const top = Math.max(1, steps[0]?.value ?? 1);
    return (
        <ul className="space-y-2">
            {steps.map((step, index) => {
                const previous = index === 0 ? null : steps[index - 1].value;
                const keep = previous ? Math.round((step.value / previous) * 100) : null;
                return (
                    <li key={step.label} className="flex items-center gap-3">
                        <span className="w-36 shrink-0 text-xs text-black/60">{step.label}</span>
                        <div className="flex-1 h-7 rounded bg-black/5">
                            <div
                                className="h-7 rounded bg-blue-600 flex items-center justify-end pr-2 text-xs font-bold text-white"
                                style={{ width: `${Math.max(6, (step.value / top) * 100)}%`, opacity: 1 - index * 0.12 }}
                            >
                                {step.value}
                            </div>
                        </div>
                        <span className="w-14 shrink-0 text-right text-[11px] text-black/40">{keep === null ? "" : `%${keep}`}</span>
                    </li>
                );
            })}
        </ul>
    );
}

/** Stacked share bar, e.g. traffic by source. */
export function ShareBar({ items }: { items: { label: string; value: number }[] }) {
    const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
    const shades = ["bg-black", "bg-blue-600", "bg-black/60", "bg-blue-400", "bg-black/35", "bg-black/15"];
    return (
        <div>
            <div className="flex h-5 w-full overflow-hidden rounded">
                {items.map((item, index) => (
                    <div key={item.label} className={shades[Math.min(index, shades.length - 1)]} style={{ width: `${(item.value / total) * 100}%` }} title={`${item.label}: ${item.value}`} />
                ))}
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-black/60">
                {items.map((item, index) => (
                    <li key={item.label} className="flex items-center gap-1.5">
                        <span className={`inline-block h-2.5 w-2.5 rounded-sm ${shades[Math.min(index, shades.length - 1)]}`} />
                        {item.label} <b className="text-black">%{Math.round((item.value / total) * 100)}</b>
                    </li>
                ))}
            </ul>
        </div>
    );
}
