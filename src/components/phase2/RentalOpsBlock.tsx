import Link from "next/link";
import { IconArrowRight as ArrowRight } from "@tabler/icons-react";
import type { RentalOpsCopy } from "@/lib/rental-ops";

interface RentalOpsBlockProps {
    copy: RentalOpsCopy;
    contactHref: string;
    /** Physical photo print product: adds the print line to the scope list. */
    showPrint?: boolean;
}

/** Shared logistics / scope / service-area block, shown on every event rental service. */
export function RentalOpsBlock({ copy, contactHref, showPrint = false }: RentalOpsBlockProps) {
    const scope = showPrint ? [...copy.scope, copy.printScope] : copy.scope;
    return (
        <section
            id="kiralama"
            className="p2-container p2-detail-section p2-detail-section--rentalops"
            aria-labelledby="rental-ops-title"
        >
            <div className="p2-datacapture p2-rentalops">
                <p className="p2-datacapture__eyebrow">{copy.eyebrow}</p>
                <h2 id="rental-ops-title">{copy.title}</h2>

                <div className="p2-rentalops__cols">
                    <div>
                        <h3>{copy.logisticsTitle}</h3>
                        <dl className="p2-rentalops__list">
                            {copy.logistics.map((item) => (
                                <div key={item.term}>
                                    <dt>{item.term}</dt>
                                    <dd>{item.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <div>
                        <h3>{copy.scopeTitle}</h3>
                        <ul className="p2-rentalops__scope">
                            {scope.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="p2-datacapture__intro p2-rentalops__area">{copy.serviceArea}</p>

                <div className="p2-datacapture__actions">
                    <Link href={contactHref} className="p2-screen-button">
                        {copy.cta} <ArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
