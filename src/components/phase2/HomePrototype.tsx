import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { P2Button, P2Container, P2Eyebrow, P2FinalCta, P2SectionHeading } from "./Phase2Primitives";

export interface P2ProjectCard {
    slug_en: string | null;
    title_en: string | null;
    description_en: string | null;
    image: string | null;
    category: string | null;
}

const clientLogos = [
    { src: "/brands/nivea-logo.png", alt: "Nivea" },
    { src: "/brands/pegasus-logo.png", alt: "Pegasus Airlines" },
    { src: "/brands/rayban-logo.png", alt: "Ray-Ban" },
    { src: "/brands/samsung-logo.png", alt: "Samsung" },
];

const capabilities = [
    {
        number: "01",
        title: "AI photo and video",
        copy: "Campaign-specific visual worlds that turn a guest portrait into branded content.",
        href: "/en/services/ai-event-solutions",
    },
    {
        number: "02",
        title: "Photo activations",
        copy: "Physical capture experiences designed around the venue, brand and sharing journey.",
        href: "/en/services/photobooth-and-photo-activations",
    },
    {
        number: "03",
        title: "Interactive games",
        copy: "Touch, movement and competition translated into playful branded participation.",
        href: "/en/services/interactive-event-activities",
    },
    {
        number: "04",
        title: "Custom installations",
        copy: "Software, interfaces and physical systems developed as one live experience.",
        href: "/en/services",
    },
];

const process = [
    ["01", "Frame the brief", "Audience, venue, campaign idea and desired guest journey."],
    ["02", "Prototype the experience", "Creative direction, interaction flow and technical proof of concept."],
    ["03", "Build the system", "Custom software, branded interface, content and physical integration."],
    ["04", "Deliver it live", "Installation, event-day operation and a handover shaped around the brief."],
];

const signalCapabilities = ["AI PHOTO", "INTERACTIVE GAMES", "CUSTOM SOFTWARE", "LIVE INSTALLATIONS"];

const projectPresentation: Record<string, { title: string; category: string }> = {
    "tavuk-dunyasi-x-ai-photo": { title: "Tavuk Dünyası × AI Photo", category: "AI Photo Activation" },
    "pegasus-airlines-digital-gift-wheel-activation": { title: "Pegasus × Digital Gift Wheel", category: "Interactive Game" },
    "ray-ban-x-strip-photo": { title: "Ray-Ban × Strip Photo", category: "Photo Activation" },
};

export default function HomePrototype({ projects }: { projects: P2ProjectCard[] }) {
    const rayBan = projects.find((project) => project.slug_en?.includes("ray-ban"));

    return (
        <div className="phase2">
            <section className="p2-home-hero" aria-labelledby="home-hero-title">
                <P2Container className="p2-home-hero__stage">
                    <P2Eyebrow>AI-POWERED EXPERIENTIAL TECHNOLOGY</P2Eyebrow>
                    <h1 id="home-hero-title" className="p2-signal-title">
                        <span className="p2-signal-title__outline" data-text="Experiences">Experiences</span>
                        <span className="p2-signal-title__solid">
                            <span>That</span>
                            <span>Connect</span>
                            <span>Brands</span>
                        </span>
                    </h1>
                    {rayBan?.image && (
                        <figure className="p2-signal-portal">
                            <div className="p2-signal-portal__frame">
                                <div className="p2-signal-portal__image">
                                    <Image src={rayBan.image} alt="Guests taking part in a Ray-Ban photo activation" fill priority sizes="(max-width: 700px) 78vw, 370px" />
                                </div>
                            </div>
                            <figcaption><span>LIVE PARTICIPATION</span>Ray-Ban · Strip Photo</figcaption>
                        </figure>
                    )}
                    <div className="p2-home-hero__brief">
                        <p>MetasoftCo creates branded photo, video, game and installation experiences for brands and agencies—combining creative direction, custom software and live production.</p>
                        <div className="p2-actions">
                            <P2Button href="/en/contact">Plan Your Activation</P2Button>
                            <P2Button href="/en/projects" variant="secondary">View Selected Work</P2Button>
                        </div>
                    </div>
                </P2Container>
                <div className="p2-signal-ticker" aria-label="MetasoftCo capabilities">
                    <div className="p2-signal-ticker__track">
                        {[0, 1, 2].map((group) => (
                            <div className="p2-signal-ticker__group" aria-hidden={group > 0} key={group}>
                                {signalCapabilities.map((capability) => <span key={`${group}-${capability}`}><Sparkles aria-hidden="true" />{capability}</span>)}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="p2-logo-strip" aria-label="Selected client collaborations">
                <P2Container>
                    <p>SELECTED COLLABORATIONS</p>
                    <div>
                        {clientLogos.map((logo) => <Image key={logo.alt} src={logo.src} alt={logo.alt} width={132} height={42} />)}
                    </div>
                </P2Container>
            </section>

            <section className="p2-section" aria-labelledby="featured-work-title">
                <P2Container>
                    <P2SectionHeading eyebrow="SELECTED WORK" title="Built for people to take part." copy="A selection of AI, photo and interactive experiences delivered for live brand environments." />
                    <div className="p2-project-grid">
                        {projects.map((project, index) => project.image && project.slug_en && (
                            <Link href={`/en/projects/${project.slug_en}`} className="p2-project-card" key={project.slug_en}>
                                <div className="p2-project-card__image">
                                    <Image src={project.image} alt={projectPresentation[project.slug_en]?.title || project.title_en || "MetasoftCo project"} fill sizes="(max-width: 760px) 100vw, 50vw" />
                                </div>
                                <div className="p2-project-card__meta">
                                    <div><span>0{index + 1} · {projectPresentation[project.slug_en]?.category || "Live Experience"}</span><h3>{projectPresentation[project.slug_en]?.title || project.title_en}</h3></div>
                                    <ArrowUpRight aria-hidden="true" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </P2Container>
            </section>

            <section className="p2-section p2-section--surface" aria-labelledby="capabilities-title">
                <P2Container>
                    <P2SectionHeading eyebrow="CAPABILITIES" title="One partner from interaction idea to live system." copy="The creative and technical layers are designed together, so the concept survives contact with the real venue." />
                    <div className="p2-capability-list">
                        {capabilities.map((capability) => (
                            <Link href={capability.href} key={capability.number}>
                                <span>{capability.number}</span><h3>{capability.title}</h3><p>{capability.copy}</p><ArrowUpRight aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </P2Container>
            </section>

            <section className="p2-section" aria-labelledby="process-title">
                <P2Container>
                    <P2SectionHeading eyebrow="HOW WE BUILD" title="A continuous path from brief to live operation." />
                    <ol className="p2-process-grid">
                        {process.map(([number, title, copy]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}
                    </ol>
                </P2Container>
            </section>

            <section className="p2-section p2-value" aria-labelledby="value-title">
                <P2Container className="p2-value__grid">
                    <P2SectionHeading eyebrow="WHY INTERACTIVE" title="Give the audience a role in the brand story." />
                    <div className="p2-value__copy">
                        <p>Experiential technology works when it does more than attract a queue. We design for a clear moment of participation: something guests can influence, create with and carry into the rest of the campaign.</p>
                        <ul>
                            <li>Personalised branded content</li>
                            <li>Product and campaign storytelling</li>
                            <li>Shareable digital takeaways</li>
                            <li>Flexible flows for launches, events and retail</li>
                        </ul>
                    </div>
                </P2Container>
            </section>

            <P2FinalCta title="Make the next campaign something people can enter." copy="Share the audience, venue and campaign goal. We’ll shape the interaction, system and live delivery around the brief." />
        </div>
    );
}
