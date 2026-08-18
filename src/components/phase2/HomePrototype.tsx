import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import BrandStrip from "@/components/site/BrandStrip";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { P2Button, P2Container, P2Eyebrow } from "./Phase2Primitives";
import { P2Display } from "./P2Display";

/**
 * A featured homepage project, already resolved to the active locale by the
 * page: `slug` and `title` are the locale's own values, `key` is the English
 * slug used to look up the editorial presentation override.
 */
export interface P2ProjectCard {
	key: string;
	slug: string;
	title: string | null;
	description: string | null;
	image: string | null;
}

/**
 * A featured homepage service, already resolved to the active locale by the
 * page: `slug`, `categorySlug` and `title` are the locale's own values, `key`
 * is the English slug used to look up the editorial presentation override.
 */
export interface P2ServiceCard {
	key: string;
	categorySlug: string;
	slug: string;
	title: string | null;
	description: string | null;
	image: string | null;
}

export default function HomePrototype({
	projects,
	services,
	locale,
}: {
	projects: P2ProjectCard[];
	services: P2ServiceCard[];
	locale: Phase2Locale;
}) {
	const dictionary = phase2Copy(locale);
	const copy = dictionary.home;
	const presentation = dictionary.featuredProjects;
	const servicePresentation = dictionary.featuredServices;

	const rayBan = projects.find((project) => project.key.includes("ray-ban"));
	const projectOrder = [
		"ray-ban-x-strip-photo",
		"pegasus-airlines-digital-gift-wheel-activation",
		"tavuk-dunyasi-x-ai-photo",
	];
	const orderedProjects = projectOrder
		.map((key) => projects.find((project) => project.key === key))
		.filter((project): project is P2ProjectCard & { image: string } => Boolean(project?.image));

	return (
		<div className="phase2">
			<section
				className="p2-home-hero"
				aria-labelledby="home-hero-title">
				<P2Container className="p2-home-hero__stage">
					<P2Eyebrow>{copy.heroEyebrow}</P2Eyebrow>
					<h1
						id="home-hero-title"
						className="p2-signal-title"
						aria-label={copy.heroTitleLabel}>
						<span
							className="p2-signal-title__outline"
							data-text={copy.heroTitleOutline}>
							{copy.heroTitleOutline}
						</span>
						<span className="p2-signal-title__solid">
							{copy.heroTitleSolid.map((line) => (
								<span key={line}>{line}</span>
							))}
						</span>
					</h1>
					{rayBan?.image && (
						<figure className="p2-signal-portal">
							<div className="p2-signal-portal__frame">
								<div className="p2-signal-portal__image">
									<Image
										src={rayBan.image}
										alt={copy.heroFigureAlt}
										fill
										priority
										sizes="(max-width: 700px) 78vw, 370px"
									/>
								</div>
							</div>
							<figcaption>
								<span>{copy.heroFigureLabel}</span>
								{copy.heroFigureCaption}
							</figcaption>
						</figure>
					)}
					<div className="p2-home-hero__brief">
						<p>{copy.heroBrief}</p>
						{/* <div className="p2-actions">
							<P2Button href={dictionary.routes.contact}>{copy.heroPrimaryCta}</P2Button>
							<P2Button
								href={dictionary.routes.work}
								variant="secondary">
								{copy.heroSecondaryCta}
							</P2Button>
						</div> */}
					</div>
				</P2Container>
			</section>

			<div
				className="p2-home-brand-loop"
				aria-label={copy.brandLoopAria}>
				<div className="p2-container p2-home-brand-loop__label">
					<P2Eyebrow>{copy.brandLoopEyebrow}</P2Eyebrow>
				</div>
				<BrandStrip />
			</div>

			<section
				className="p2-section p2-home-work"
				aria-labelledby="featured-work-title">
				<P2Container>
					<header className="p2-home-section-head p2-home-work__head">
						<P2Eyebrow>{copy.workEyebrow}</P2Eyebrow>
						<h2 id="featured-work-title">
							<P2Display text={copy.workTitle} />
						</h2>
						<p>{copy.workCopy}</p>
					</header>
					<div className="p2-editorial-projects">
						{orderedProjects.map((project, index) => (
							<Link
								href={`${dictionary.routes.work}/${project.slug}`}
								className={`p2-editorial-project p2-editorial-project--${index + 1}`}
								key={project.key}>
								<div className="p2-editorial-project__copy">
									<span
										className="p2-editorial-project__index"
										data-text={`0${index + 1}`}>
										0{index + 1}
									</span>
									<div>
										<span className="p2-editorial-project__category">
											0{index + 1} ·{" "}
											{presentation[project.key]?.category || copy.workFallbackCategory}
										</span>
										<h3>{presentation[project.key]?.title || project.title}</h3>
										<p>{project.description}</p>
										<span className="p2-editorial-project__link">
											{copy.workLinkLabel} <ArrowUpRight aria-hidden="true" />
										</span>
									</div>
								</div>
								<div className="p2-editorial-project__image">
									<Image
										src={project.image}
										alt={presentation[project.key]?.title || project.title || "MetasoftCo"}
										fill
										sizes="(max-width: 760px) 100vw, 50vw"
									/>
								</div>
							</Link>
						))}
					</div>
				</P2Container>
			</section>

			<section
				className="p2-section p2-home-services"
				aria-labelledby="services-title">
				<P2Container>
					<header className="p2-home-section-head p2-home-services__head">
						<P2Eyebrow>{copy.capabilitiesEyebrow}</P2Eyebrow>
						<h2 id="services-title">
							<P2Display text={copy.capabilitiesTitle} />
						</h2>
						<p>{copy.capabilitiesCopy}</p>
					</header>
					<div className="p2-editorial-projects">
						{services.map((service, index) => (
							<Link
								href={`${dictionary.routes.capabilities}/${service.categorySlug}/${service.slug}`}
								className={`p2-editorial-project p2-editorial-project--${index + 1}`}
								key={service.key}>
								<div className="p2-editorial-project__copy">
									<span
										className="p2-editorial-project__index"
										data-text={`0${index + 1}`}>
										0{index + 1}
									</span>
									<div>
										<span className="p2-editorial-project__category">
											0{index + 1} ·{" "}
											{servicePresentation[service.key]?.category ||
												copy.capabilitiesFallbackCategory}
										</span>
										<h3>{service.title}</h3>
										<p>{servicePresentation[service.key]?.description || service.description}</p>
										<span className="p2-editorial-project__link">
											{copy.capabilitiesLinkLabel} <ArrowUpRight aria-hidden="true" />
										</span>
									</div>
								</div>
								<div className="p2-editorial-project__image">
									{service.image && (
										<Image
											src={service.image}
											alt={service.title || "MetasoftCo"}
											fill
											sizes="(max-width: 760px) 100vw, 50vw"
										/>
									)}
								</div>
							</Link>
						))}
					</div>
				</P2Container>
			</section>

			<section
				className="p2-section p2-home-process"
				aria-labelledby="process-title">
				<P2Container>
					<header className="p2-home-compact-head">
						<P2Eyebrow>{copy.processEyebrow}</P2Eyebrow>
						<h2
							id="process-title"
							className="sr-only">
							{copy.processSrTitle}
						</h2>
					</header>
					<ol className="p2-process-grid">
						{copy.process.map((step, index) => (
							<li key={step.number}>
								<div className="p2-process-grid__signal">
									<span data-text={step.number}>{step.number}</span>
									{index < copy.process.length - 1 && <ArrowRight aria-hidden="true" />}
								</div>
								<h3>{step.title}</h3>
								<p>{step.copy}</p>
							</li>
						))}
					</ol>
				</P2Container>
			</section>

			<section
				className="p2-section p2-value p2-home-value"
				aria-labelledby="value-title">
				<P2Container className="p2-value__grid">
					<header className="p2-home-section-head">
						<P2Eyebrow>{copy.valueEyebrow}</P2Eyebrow>
						<h2
							id="value-title"
							aria-label={copy.valueTitleLabel}>
							<P2Display text={copy.valueTitle} />
						</h2>
					</header>
					<div className="p2-value__copy">
						<ul>
							{copy.valuePoints.map((point) => (
								<li key={point}>
									<Sparkles aria-hidden="true" />
									<span>{point}</span>
								</li>
							))}
						</ul>
					</div>
				</P2Container>
			</section>

			<section
				className="p2-home-final"
				aria-labelledby="home-final-title">
				<P2Container>
					<P2Eyebrow>{copy.finalEyebrow}</P2Eyebrow>
					<h2
						id="home-final-title"
						aria-label={copy.finalTitleLabel}>
						<P2Display text={copy.finalTitle} />
					</h2>
					<div className="p2-home-final__base">
						<p>{copy.finalCopy}</p>
						<div className="p2-actions">
							<P2Button href={dictionary.routes.contact}>{copy.finalCta}</P2Button>
						</div>
					</div>
				</P2Container>
			</section>
		</div>
	);
}
