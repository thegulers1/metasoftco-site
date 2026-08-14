import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import VideoPlayer from "@/components/site/VideoPlayer";
import { P2Button, P2Container, P2Eyebrow, P2FinalCta, P2SectionHeading } from "./Phase2Primitives";

interface GalleryItem { url: string; alt: string }
interface RelatedService { slug_en: string | null; title_en: string | null; description_en: string | null; image: string | null }

interface ServicePrototypeProps {
    image: string | null;
    video: string | null;
    gallery: GalleryItem[];
    relatedServices: RelatedService[];
}

const guestJourney = [
    ["01", "Capture", "The guest takes a portrait at the branded event interface."],
    ["02", "Create", "The image is processed inside a campaign-approved visual scenario."],
    ["03", "Review", "The final portrait appears in the experience for a clear handoff."],
    ["04", "Take away", "The guest accesses the branded digital result by QR code."],
];

const capabilities = [
    "Campaign-specific visual scenes and art direction",
    "Branded capture interface and final image frame",
    "Real-time AI image processing",
    "QR-based digital image delivery",
    "Physical event setup and live installation",
];

const faqs = [
    ["What can be customised?", "The visual scenario, prompts, interface and final branded frame are shaped around the campaign. The production scope is agreed before build."],
    ["How do guests receive the image?", "The current experience supports digital delivery by QR code. Any additional delivery or print requirement should be included in the brief."],
    ["What do you need from our team?", "A campaign goal, audience profile, venue details, brand assets and an approval route for the visual scenarios."],
    ["How is guest data handled?", "Capture, retention and delivery settings are agreed for the project. Specific legal, deletion and consent requirements are confirmed during scoping."],
    ["What affects the event setup?", "Venue footprint, power, connectivity, audience volume, staffing and any print requirement all affect the production plan."],
];

export default function ServicePrototype({ image, video, gallery, relatedServices }: ServicePrototypeProps) {
    const secondaryImage = gallery[0]?.url;

    return (
        <div className="phase2">
            <section className="p2-detail-hero" aria-labelledby="service-title">
                <P2Container className="p2-detail-hero__grid">
                    <div className="p2-detail-hero__copy">
                        <nav className="p2-breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/services">Capabilities</Link><span>/</span><span>AI Photo Booth</span></nav>
                        <P2Eyebrow>AI PHOTO ACTIVATION</P2Eyebrow>
                        <h1 id="service-title">AI Photo Booth for events and brand activations.</h1>
                        <p>Turn a guest portrait into campaign-specific content, delivered through a branded live experience built for the venue and audience.</p>
                        <div className="p2-actions">
                            <P2Button href="/en/contact">Plan Your Activation</P2Button>
                            <P2Button href="/en/projects/tavuk-dunyasi-x-ai-photo" variant="secondary">See the Case Study</P2Button>
                        </div>
                        <dl className="p2-detail-facts">
                            <div><dt>FORMAT</dt><dd>Live AI portrait</dd></div>
                            <div><dt>DELIVERY</dt><dd>Branded image via QR</dd></div>
                            <div><dt>BUILT FOR</dt><dd>Events, launches and retail</dd></div>
                        </dl>
                    </div>
                    <div className="p2-detail-hero__media">
                        {image && <div className="p2-detail-hero__main"><Image src={image} alt="AI Photo Booth branded portrait experience" fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>}
                        {secondaryImage && <div className="p2-detail-hero__secondary"><Image src={secondaryImage} alt="Example AI portrait output" fill sizes="(max-width: 900px) 38vw, 16vw" /></div>}
                    </div>
                </P2Container>
            </section>

            <section className="p2-section" aria-labelledby="journey-title">
                <P2Container>
                    <P2SectionHeading eyebrow="THE GUEST JOURNEY" title="One clear interaction. One personal result." copy="The flow is intentionally simple for a live environment, while the creative and technical system behind it is tailored to the campaign." />
                    <ol className="p2-journey-grid">
                        {guestJourney.map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}
                    </ol>
                </P2Container>
            </section>

            <section className="p2-section p2-section--surface" aria-labelledby="custom-title">
                <P2Container className="p2-split-copy">
                    <P2SectionHeading eyebrow="BUILT AROUND THE BRAND" title="Not a filter pack. A visual world made for the brief." />
                    <div>
                        <p className="p2-lede">We develop the visual scenarios, interaction and output as a connected system. The result can echo a campaign, product launch, location or event theme without losing the guest at the centre of it.</p>
                        <ul className="p2-check-list">
                            {capabilities.map((capability) => <li key={capability}><Check aria-hidden="true" />{capability}</li>)}
                        </ul>
                    </div>
                </P2Container>
            </section>

            {video && (
                <section className="p2-section p2-video-proof" aria-labelledby="live-proof-title">
                    <P2Container className="p2-video-proof__grid">
                        <div>
                            <P2SectionHeading eyebrow="LIVE PROOF" title="See the physical experience in use." />
                            <p>The Tavuk Dünyası project record shows the kiosk, participant flow and final branded portrait in a live setting.</p>
                            <P2Button href="/en/projects/tavuk-dunyasi-x-ai-photo" variant="text">Open Full Case Study</P2Button>
                        </div>
                        <VideoPlayer src={video} title="Tavuk Dünyası AI Photo live activation" fallbackPoster={image} />
                    </P2Container>
                </section>
            )}

            <section className="p2-section p2-section--surface" aria-labelledby="scope-title">
                <P2Container>
                    <P2SectionHeading eyebrow="PRODUCTION SCOPE" title="Questions we resolve before the event." copy="A reliable live experience depends on the practical layer. These details are defined with the creative direction—not left until installation day." />
                    <div className="p2-scope-grid">
                        {["Audience and expected flow", "Venue footprint and power", "Connectivity and delivery", "Approved visual scenarios", "Staffing and installation", "Consent and data retention", "Print or additional handoff", "Fallback requirements"].map((item) => <div key={item}><span>{item}</span></div>)}
                    </div>
                    <p className="p2-note">Exact footprint, processing capacity, staffing, print options and lead-capture requirements are confirmed for each brief.</p>
                </P2Container>
            </section>

            <section className="p2-section" aria-labelledby="faq-title">
                <P2Container>
                    <P2SectionHeading eyebrow="COMMON QUESTIONS" title="What teams usually need to know." />
                    <div className="p2-faq-list">
                        {faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
                    </div>
                </P2Container>
            </section>

            {relatedServices.length > 0 && (
                <section className="p2-section p2-section--surface" aria-labelledby="related-title">
                    <P2Container>
                        <P2SectionHeading eyebrow="RELATED EXPERIENCES" title="Other ways to make the audience part of the idea." />
                        <div className="p2-related-grid">
                            {relatedServices.slice(0, 3).map((service) => service.slug_en && (
                                <Link href={`/en/services/ai-event-solutions/${service.slug_en}`} key={service.slug_en}>
                                    {service.image && <div><Image src={service.image} alt={service.title_en || "Related AI experience"} fill sizes="(max-width: 760px) 100vw, 33vw" /></div>}
                                    <span>AI EXPERIENCE</span><h3>{service.title_en}</h3><ArrowUpRight aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                    </P2Container>
                </section>
            )}

            <P2FinalCta title="Give your campaign a personal AI moment." copy="Tell us where it will live, who will use it and what the brand needs to express. We’ll define the creative and technical route." />
        </div>
    );
}
