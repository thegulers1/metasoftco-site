import Link from "next/link";
import { IconArrowRight as ArrowRight } from "@tabler/icons-react";
import type { DataCaptureCopy } from "@/lib/data-capture";

interface DataCaptureBlockProps {
    copy: DataCaptureCopy;
    contactHref: string;
    /** Link to the Data-Capture hub page; omitted where no localized hub exists. */
    hubHref?: string;
}

/** Shared Data-Capture / CRM pitch, shown on rental services with the flag on. */
export function DataCaptureBlock({ copy, contactHref, hubHref }: DataCaptureBlockProps) {
    return (
        <section
            id="data-capture"
            className="p2-container p2-detail-section p2-detail-section--datacapture"
            aria-labelledby="data-capture-title"
        >
            <div className="p2-datacapture">
                <p className="p2-datacapture__eyebrow">{copy.eyebrow}</p>
                <h2 id="data-capture-title">{copy.title}</h2>
                <p className="p2-datacapture__intro">{copy.intro}</p>

                <ol className="p2-datacapture__grid">
                    {copy.items.map((item, index) => (
                        <li key={item.title}>
                            <span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                        </li>
                    ))}
                </ol>

                <p className="p2-datacapture__legal">{copy.legal}</p>

                <div className="p2-datacapture__actions">
                    <Link href={contactHref} className="p2-screen-button">
                        {copy.cta} <ArrowRight aria-hidden="true" />
                    </Link>
                    {hubHref && copy.more && (
                        <Link href={hubHref} className="p2-screen-button p2-screen-button--secondary">
                            {copy.more} <ArrowRight aria-hidden="true" />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
