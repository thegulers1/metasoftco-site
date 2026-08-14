import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import VideoPlayer from "@/components/site/VideoPlayer";
import { P2Container, P2Eyebrow, P2FinalCta, P2SectionHeading } from "./Phase2Primitives";

interface GalleryItem { url: string; alt: string }

interface CaseStudyPrototypeProps {
    image: string | null;
    video: string | null;
    gallery: GalleryItem[];
    year: string;
}

const journey = [
    ["01", "Guest portrait", "A participant steps into the branded capture experience."],
    ["02", "Campaign scene", "The portrait enters a visual scenario developed for Tavuk Dünyası."],
    ["03", "AI rendering", "The live image pipeline creates the personalised final composition."],
    ["04", "Digital takeaway", "The guest receives the branded result as a shareable image."],
];

export default function CaseStudyPrototype({ image, video, gallery, year }: CaseStudyPrototypeProps) {
    return (
        <div className="phase2">
            <section className="p2-case-hero" aria-labelledby="case-title">
                <P2Container>
                    <nav className="p2-breadcrumbs" aria-label="Breadcrumb"><Link href="/en">Home</Link><span>/</span><Link href="/en/projects">Work</Link><span>/</span><span>Tavuk Dünyası × AI Photo</span></nav>
                    <div className="p2-case-hero__heading">
                        <div><P2Eyebrow>CASE STUDY · AI PHOTO</P2Eyebrow><h1 id="case-title">Tavuk Dünyası × AI Photo</h1></div>
                        <p>A live AI portrait experience that placed guests inside a visual world created for Tavuk Dünyası—and delivered a branded image they could take with them.</p>
                    </div>
                    <dl className="p2-case-facts">
                        <div><dt>CLIENT</dt><dd>Tavuk Dünyası</dd></div>
                        <div><dt>FORMAT</dt><dd>AI Photo activation</dd></div>
                        <div><dt>YEAR</dt><dd>{year}</dd></div>
                        <div><dt>OUTPUT</dt><dd>Branded digital portrait</dd></div>
                    </dl>
                    {image && <figure className="p2-case-hero__image"><Image src={image} alt="Tavuk Dünyası AI Photo campaign portrait" fill priority sizes="100vw" /><figcaption>CAMPAIGN OUTPUT · TAVUK DÜNYASI</figcaption></figure>}
                </P2Container>
            </section>

            <section className="p2-section" aria-labelledby="opportunity-title">
                <P2Container className="p2-case-intro">
                    <P2SectionHeading eyebrow="THE OPPORTUNITY" title="Turn the audience into the campaign image." />
                    <div>
                        <p className="p2-lede">The experience gave each participant a personal role in a Tavuk Dünyası visual world. The creative idea, capture flow and final branded composition were treated as one connected guest journey.</p>
                        <p>Instead of asking people to watch the content, the activation made their own portrait the content—creating a direct, memorable interaction with the campaign.</p>
                    </div>
                </P2Container>
            </section>

            <section className="p2-section p2-section--surface" aria-labelledby="concept-title">
                <P2Container>
                    <P2SectionHeading eyebrow="THE CONCEPT" title="A branded scene, completed by the guest." copy="The visual direction was designed to hold together as campaign content while leaving enough space for every participant to become the focal point." />
                    <ol className="p2-journey-grid">
                        {journey.map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}
                    </ol>
                </P2Container>
            </section>

            {video && (
                <section className="p2-section" aria-labelledby="execution-title">
                    <P2Container className="p2-video-proof__grid">
                        <div>
                            <P2SectionHeading eyebrow="PHYSICAL EXECUTION" title="From screen interaction to personal takeaway." />
                            <p>The project record shows the experience as a physical event installation: a branded kiosk, a simple guest-facing flow and an AI-generated image delivered at the end.</p>
                            <ul className="p2-check-list">
                                <li><Check aria-hidden="true" />Branded kiosk and interface</li>
                                <li><Check aria-hidden="true" />Live portrait capture</li>
                                <li><Check aria-hidden="true" />Real-time AI image pipeline</li>
                                <li><Check aria-hidden="true" />Digital result for the guest</li>
                            </ul>
                        </div>
                        <VideoPlayer src={video} title="Tavuk Dünyası AI Photo activation in use" fallbackPoster={image} />
                    </P2Container>
                </section>
            )}

            {gallery.length > 0 && (
                <section className="p2-section p2-section--surface" aria-labelledby="gallery-title">
                    <P2Container>
                        <P2SectionHeading eyebrow="CAMPAIGN OUTPUTS" title="One visual system, multiple personal portraits." />
                        <div className="p2-case-gallery">
                            {gallery.map((item, index) => <figure key={`${item.url}-${index}`}><Image src={item.url} alt={item.alt || `Tavuk Dünyası AI portrait ${index + 1}`} fill sizes="(max-width: 760px) 100vw, 33vw" /></figure>)}
                        </div>
                    </P2Container>
                </section>
            )}

            <section className="p2-section" aria-labelledby="record-title">
                <P2Container className="p2-case-record">
                    <P2SectionHeading eyebrow="WHAT THE PROJECT DEMONSTRATES" title="Creative direction, custom software and live delivery working as one." />
                    <div className="p2-record-list">
                        <div><span>01</span><p>A brand-specific visual concept rather than a generic effect.</p></div>
                        <div><span>02</span><p>A guest journey designed for a physical live environment.</p></div>
                        <div><span>03</span><p>A personalised digital asset that extends the interaction beyond the kiosk.</p></div>
                        <div><span>04</span><p>A connected build across interface, AI processing and event installation.</p></div>
                    </div>
                </P2Container>
            </section>

            <section className="p2-case-capability">
                <P2Container>
                    <span>RELATED CAPABILITY</span>
                    <Link href="/en/services/ai-event-solutions/ai-photobooth"><strong>AI Photo Booth for Events</strong><ArrowRight aria-hidden="true" /></Link>
                </P2Container>
            </section>

            <P2FinalCta title="Build a similar experience for your campaign." copy="Bring us the audience, venue and visual idea. We’ll turn it into a practical guest journey and a live-ready system." primaryLabel="Build a Similar Experience" secondary={{ label: "Explore More Work", href: "/en/projects" }} />
        </div>
    );
}
