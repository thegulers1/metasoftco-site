import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import BrandStrip from "@/components/site/BrandStrip";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { SOFTWARE_CATEGORY_PATH, softwareHomeCopy } from "@/lib/software";
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
	// `projects` already arrives pre-selected (featured, published) and
	// pre-ordered from the DB query in page.tsx — no further filtering by
	// slug here, or newly-featured projects would never make it through.
	const orderedProjects = projects.filter(
		(project): project is P2ProjectCard & { image: string } => Boolean(project.image)
	);

	return (
		<div className="phase2">
			<section
				className="p2-home-hero"
				aria-labelledby="home-hero-title">
				<P2Container className="p2-home-hero__stage">
					<div className="p2-home-hero__content">
						<div className="p2-home-hero__badge">
							<span className="p2-home-hero__badge-dot" aria-hidden="true" />
							<P2Eyebrow>{copy.heroEyebrow}</P2Eyebrow>
						</div>
						<h1
							id="home-hero-title"
							className="p2-signal-title"
							aria-label={copy.heroTitleLabel}>
							<P2Display
								text={copy.heroTitle}
								outlineClassName="p2-signal-title__highlight"
							/>
						</h1>
						<div className="p2-actions">
							<P2Button href={dictionary.routes.contact}>{copy.heroPrimaryCta}</P2Button>
							<P2Button
								href={dictionary.routes.work}
								variant="secondary">
								{copy.heroSecondaryCta}
							</P2Button>
						</div>
						<div className="p2-home-hero__stats">
							{copy.heroStats.map((stat) => (
								<div
									key={stat.label}
									className="p2-home-hero__stat">
									<span className="p2-home-hero__stat-value">{stat.value}</span>
									<span className="p2-home-hero__stat-label">{stat.label}</span>
								</div>
							))}
						</div>
					</div>
					{rayBan?.image && (
						<figure className="p2-signal-portal">
							<div className="p2-signal-portal__frame">
								<div className="p2-signal-portal__image">
									<Image
										src={rayBan.image}
										alt={copy.heroFigureAlt}
										fill
										priority
										sizes="(max-width: 1000px) 80vw, 40vw"
									/>
								</div>
							</div>
							<figcaption>
								<span>{copy.heroFigureLabel}</span>
								{copy.heroFigureCaption}
							</figcaption>
						</figure>
					)}
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

			{locale === "tr" && (
				<section
					className="p2-section p2-home-software"
					aria-labelledby="software-title">
					<P2Container>
						<header className="p2-home-section-head">
							<P2Eyebrow>{softwareHomeCopy.eyebrow}</P2Eyebrow>
							<h2
								id="software-title"
								aria-label={softwareHomeCopy.titleLabel}>
								<P2Display text={softwareHomeCopy.title} />
							</h2>
							<p className="p2-home-software__lede">{softwareHomeCopy.lede}</p>
						</header>
						<ul className="p2-dc-cards p2-dc-cards--4">
							{softwareHomeCopy.cards.map((card, index) => (
								<li key={card.title}>
									<span className="p2-gradient-number">{String(index + 1).padStart(2, "0")}</span>
									<h3>{card.title}</h3>
									<p>{card.body}</p>
								</li>
							))}
						</ul>
						<ul className="p2-home-software__proof">
							{softwareHomeCopy.proof.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
						<div className="p2-actions">
							<P2Button href={SOFTWARE_CATEGORY_PATH}>{softwareHomeCopy.cta}</P2Button>
						</div>
					</P2Container>
				</section>
			)}

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
