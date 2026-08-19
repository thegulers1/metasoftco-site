import {
	phase2CapabilityDetailSlugs,
	phase2CategorySlugs,
	phase2ProjectSlugs,
	phase2Routes,
	type Phase2Locale,
} from "./phase2";

/**
 * Every string rendered by the phase 2 (v2) screens, in both locales.
 *
 * Conventions used by the display headings:
 *   "\n"      → hard line break
 *   "{word}"  → the word is rendered with the outline/gradient stroke treatment
 *
 * Hrefs live here too because slugs are not translatable by string
 * replacement — each locale points at its own canonical path.
 */

/** A term/value pair in a detail-screen definition list. `null` is filled in at render time. */
type Phase2Fact = { term: string; value: string | null };

export type Phase2RouteMap = {
	home: string;
	work: string;
	capabilities: string;
	about: string;
	insights: string;
	contact: string;
};

function buildCopy(locale: Phase2Locale) {
	const routes: Phase2RouteMap = phase2Routes[locale];
	const categories = phase2CategorySlugs[locale];
	const capabilityDetail = phase2CapabilityDetailSlugs[locale];

	return {
		categoryHref: {
			ai: `${routes.capabilities}/${categories.ai}`,
			photo: `${routes.capabilities}/${categories.photo}`,
			interactive: `${routes.capabilities}/${categories.interactive}`,
		},
		capabilityDetailHref: `${routes.capabilities}/${capabilityDetail.category}/${capabilityDetail.service}`,
		projectHref: (slug: string) => `${routes.work}/${slug}`,
		routes,
	};
}

const trPaths = buildCopy("tr");
const enPaths = buildCopy("en");

const en = {
	locale: "en" as Phase2Locale,
	routes: enPaths.routes,

	nav: {
		skipLink: "Skip to content",
		homeAria: "MetasoftCo home",
		primaryAria: "Primary navigation",
		mobileAria: "Mobile navigation",
		openMenu: "Open navigation",
		closeMenu: "Close navigation",
		localeSwitchAria: "Switch to Turkish",
		localeSwitchLabel: "TR / EN",
		cta: "Plan Your Activation",
		aiCta: "Get AI Suggestions",
		aiCtaAria: "Open AI assistant for event suggestions",
		items: [
			{ href: enPaths.routes.work, label: "Work" },
			{ href: enPaths.routes.capabilities, label: "Capabilities" },
			{ href: enPaths.routes.about, label: "About" },
			{ href: enPaths.routes.insights, label: "Insights" },
			{ href: enPaths.routes.contact, label: "Contact" },
		],
	},

	footer: {
		tagline: "AI powered experience technologies we developed for brands and agencies at Istanbul University Technopark.",
		exploreLabel: "EXPLORE",
		contactLabel: "CONTACT",
		followLabel: "FOLLOW",
		city: "Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No: 37/1 İç Kapı No: 28, Avcılar / İstanbul",
		baseline: "Concept · Software · Physical production · Live operation",
		links: [
			{ href: enPaths.routes.work, label: "Work" },
			{ href: enPaths.routes.capabilities, label: "Capabilities" },
			{ href: enPaths.routes.about, label: "About" },
			{ href: enPaths.routes.insights, label: "Insights" },
			{ href: enPaths.routes.contact, label: "Contact" },
		],
	},

	home: {
		heroEyebrow: "AI-POWERED EXPERIENTIAL TECHNOLOGY",
		heroTitleOutline: "Experiences",
		heroTitleSolid: ["That", "Connect", "Brands"],
		heroTitleLabel: "Experiences that connect brands",
		heroFigureAlt: "Guests taking part in a Ray-Ban photo activation",
		heroFigureLabel: "LIVE PARTICIPATION",
		heroFigureCaption: "Ray-Ban · Strip Photo",
		heroBrief:
			"MetasoftCo creates branded photo, video, game and installation experiences for brands and agencies—combining creative direction, custom software and live production.",
		heroPrimaryCta: "Plan Your Activation",
		heroSecondaryCta: "View Selected Work",
		brandLoopAria: "Selected client collaborations",
		brandLoopEyebrow: "TRUSTED BY FORWARD-THINKING BRANDS",
		workEyebrow: "SELECTED WORK",
		workTitle: "Built\nfor\n{people}\nto take\npart.",
		workCopy:
			"Real people. Real moments. Experiences designed to invite participation and build lasting brand connection.",
		workLinkLabel: "View project",
		workFallbackCategory: "Live Experience",
		capabilitiesEyebrow: "CAPABILITIES",
		capabilitiesTitle: "Signature\nformats\nfor {live}\nparticipation.",
		capabilitiesCopy:
			"From AI-generated portraits to sensor-driven photography, each format is built to turn a guest's presence into shareable, on-brand content.",
		capabilitiesLinkLabel: "View service",
		capabilitiesFallbackCategory: "Photo Experience",
		processEyebrow: "HOW WE BUILD",
		processSrTitle: "How we build",
		process: [
			{
				number: "01",
				title: "Frame the brief",
				copy: "Audience, venue, campaign idea and desired guest journey.",
			},
			{
				number: "02",
				title: "Prototype the experience",
				copy: "Creative direction, interaction flow and technical proof of concept.",
			},
			{
				number: "03",
				title: "Build the system",
				copy: "Custom software, branded interface, content and physical integration.",
			},
			{
				number: "04",
				title: "Deliver it live",
				copy: "Installation, event-day operation and a handover shaped around the brief.",
			},
		],
		valueEyebrow: "WHY INTERACTIVE",
		valueTitle: "Give the\naudience\na {role} in\nthe brand\nstory.",
		valueTitleLabel: "Give the audience a role in the brand story.",
		valuePoints: [
			"People remember what they do, not what they see.",
			"Participation creates emotional connection and trust.",
			"Shareable moments extend reach far beyond the venue.",
			"Data and insights help improve every activation.",
		],
		finalEyebrow: "NEXT SIGNAL",
		finalTitle: "Make the next campaign\n{something people can enter.}",
		finalTitleLabel: "Make the next campaign something people can enter.",
		finalCopy:
			"Share the audience, venue and campaign goal. We’ll shape the interaction, system and live delivery around the brief.",
		finalCta: "Plan Your Activation",
	},

	about: {
		heroSolid: "We make",
		heroOutline: "technology physical.",
		heroLabel: "We make technology physical.",
		locationChip: "Istanbul  /  Since 2020",
		heroCopy:
			"We combine creative direction, custom software, physical production, and live operation to design and deliver experiences that connect brands and people in real time.",
		storyTitle: "Built in Istanbul.\nDelivered live.",
		storyParagraphs: [
			"We bring creative direction, software, physical production and live operation together under one roof.",
			"From concept to live delivery, we build experiences that are reliable, measurable and made to move people.",
		],
		stats: [
			{ value: "1,000+", label: "Live events" },
			{ value: "100+", label: "Brands" },
			{ value: "5+", label: "Years" },
			{ value: "One", label: "End-to-end team" },
		],
		principles: [
			{ title: "Make it participatory", copy: "We design for action, not attention." },
			{ title: "Build it for live conditions", copy: "We plan for the unexpected and deliver anyway." },
			{ title: "Leave people with something", copy: "We create moments worth sharing." },
		],
		finalSolid: "Bring us the brief.",
		finalOutline: "We’ll build the experience.",
		finalCta: "Plan Your Activation",
	},

	contact: {
		heroSolid: "Let’s build\nsomething",
		heroOutline: "people can enter.",
		heroLabel: "Let’s build something people can enter.",
		heroCopy: "Share the audience, venue and campaign goal. We’ll shape the experience.",
		asideTitle: "Start a conversation",
		location: "Istanbul, Türkiye",
		replyTime: "Reply within one business day",
		figureAlt: "MetasoftCo producers reviewing an event brief",
		form: {
			name: "Name *",
			namePlaceholder: "Your name",
			company: "Company *",
			companyPlaceholder: "Company name",
			email: "Email *",
			emailPlaceholder: "your@email.com",
			phone: "Phone *",
			phonePlaceholder: "+90 5XX XXX XX XX",
			event: "Event / campaign *",
			eventPlaceholder: "Event or campaign name",
			venue: "Venue + city *",
			venuePlaceholder: "Venue name and city",
			date: "Target date *",
			audience: "Expected audience *",
			audiencePlaceholder: "Estimated number of people",
			budget: "Budget range *",
			budgetPlaceholder: "Select budget range",
			budgetOptions: ["€5K–€10K", "€10K–€25K", "€25K+"],
			experienceLegend: "What type of experience are you planning? *",
			experienceTypes: ["AI Photo + Video", "Photo Activations", "Interactive Games", "Custom Installations"],
			brief: "Tell us about the brief *",
			briefPlaceholder: "Share your goals, audience, message, must-haves, and any references…",
			submit: "Send the brief",
			submitting: "Sending…",
			submitted: "Brief received",
			success: "Thanks — your brief is ready for our team. We’ll get back to you within one business day.",
			error: "The brief could not be sent. Please email info@metasoftco.com or try again.",
		},
		nextStepsTitle: "What happens next",
		nextSteps: [
			{ number: "01", title: "We review", copy: "We review your brief and ask smart questions." },
			{
				number: "02",
				title: "We shape the approach",
				copy: "We design the right experience and technical plan.",
			},
			{
				number: "03",
				title: "We plan delivery",
				copy: "We align the team, timeline and deliver with precision.",
			},
		],
		liteTitle: "Not ready for a full brief?",
		liteCopy: "That’s okay. Reach out or explore our work.",
		liteMailLabel: "Email us",
		liteWorkLabel: "Explore selected work",
		finalSolid: "The next",
		finalOutline: "live moment",
		finalTail: "starts here.",
	},

	work: {
		heroSolid: "Work that\npeople",
		heroOutline: "step into.",
		heroLabel: "Work that people step into.",
		heroCopy:
			"We design and deliver experiential activations that turn audiences into participants—and moments into brand connections.",
		catalogAria: "All work",
		cardLink: "View Project",
		ctaSolid: "Make the next\ncampaign",
		ctaOutline: "something people can enter.",
		ctaLabel: "Make the next campaign something people can enter.",
		ctaButton: "Plan Your Activation",
	},

	capabilities: {
		heroSolid: "We build\nthe system",
		heroOutline: "behind the moment.",
		heroLabel: "We build the system behind the moment.",
		heroCopy:
			"We combine creative direction, custom software, physical production and live operation to design and deliver experiences that connect brands and people in real time.",
		catalogAria: "Capabilities",
		cardLink: "Explore Capability",
		endToEndTitle: "One team,\nend to end",
		process: [
			{ number: "01", title: "Brief", copy: "We listen, learn and align around goals, audience and success." },
			{ number: "02", title: "Design", copy: "We craft the concept, experience flow and technical plan." },
			{ number: "03", title: "Build", copy: "We build, test and integrate every element with precision." },
			{ number: "04", title: "Deliver", copy: "We go live, run the show and optimize for impact." },
		],
		ctaSolid: "Turn the brief",
		ctaOutline: "into a live experience.",
		ctaButton: "Plan Your Activation",
	},

	insights: {
		heroSolid: "Blog",
		heroOutline: "",
		heroLabel: "Notes from the production floor.",
		heroCopy:
			"Field notes, technical breakdowns and ideas on AI, photo activations and the technology behind live brand experiences.",
		catalogAria: "All articles",
		featuredLabel: "Latest",
		cardLink: "Read Article",
		emptyTitle: "Nothing published yet",
		emptyCopy: "New field notes are on the way. Check back shortly.",
		ctaSolid: "Have a brief worth",
		ctaOutline: "writing about?",
		ctaLabel: "Have a brief worth writing about?",
		ctaButton: "Plan Your Activation",
	},

	insightDetail: {
		crumbHome: "Home",
		crumbInsights: "Insights",
		authorTerm: "Author",
		dateTerm: "Published",
		categoryTerm: "Topic",
		readTerm: "Read time",
		readValue: (minutes: number) => `${minutes} min read`,
		relatedTitle: "More reading",
		backLabel: "All articles",
		ctaSolid: "Turn the idea",
		ctaOutline: "into a live experience.",
		ctaLabel: "Turn the idea into a live experience.",
		ctaButton: "Plan Your Activation",
	},

	workDetail: {
		crumb: "Work  /  Case Study  /  01",
		heroSolid: "Ray-Ban ×",
		heroOutline: "Strip Photo",
		heroCopy: "An AI-powered photo activation that turns moments into iconic keepsakes people love to share.",
		facts: [
			{ term: "Client", value: "Ray-Ban" },
			{ term: "Format", value: "Photo activation" },
			{ term: "Year", value: null },
			{ term: "Output", value: "Branded photo strip" },
		] as Phase2Fact[],
		imageAlt: "Ray-Ban Strip Photo activation",
		fallbackGalleryAlts: ["Strip photo activation", "Guests using strip photo", "Printed strip photo"],
		briefTitle: "The brief",
		briefCopy:
			"Ray-Ban wanted a photo experience that blends their iconic style with a shareable moment—one that moves beyond the booth and becomes part of the night.",
		experienceTitle: "The experience",
		experienceCopy:
			"Guests step in, strike a pose, and our system captures a sequence of frames that reflect their energy. The result is a premium photo strip, instantly printed and ready to share.",
		systemTitle: "The system",
		system: [
			{
				title: "Capture",
				copy: "AI cameras capture a burst of frames, freezing authentic expressions in motion.",
			},
			{
				title: "Brand layer",
				copy: "Ray-Ban branding and frame designs are applied to every strip in real time.",
			},
			{ title: "Print", copy: "High-quality prints are delivered instantly—made to keep." },
			{ title: "Share", copy: "Guests scan a QR to get their digital strip and share the moment." },
		],
		impact: [
			{ value: "1.8K+", label: "Live participation" },
			{ value: "92%", label: "Instant output" },
			{ value: "67%", label: "Shareable moment" },
		],
		quote: "“It’s more than a photo. It’s a moment people want to keep and a story they want to share. That’s the power of experience.”",
		quoteCite: "Ray-Ban team",
		nextLabel: "Next project",
		nextTitle: "Pegasus ×\nDigital Gift Wheel",
		nextAlt: "Pegasus Digital Gift Wheel",
		nextHref: enPaths.projectHref(phase2ProjectSlugs.nextProject.en),
		ctaSolid: "Build an experience",
		ctaOutline: "people take with them.",
		ctaButton: "Plan Your Activation",
	},

	capabilityDetail: {
		crumb: "Capabilities  /  AI Photo + Video",
		heroSolid: "AI Photo +",
		heroOutline: "Video",
		heroLabel: "AI Photo and Video",
		heroCopyBefore: "Campaign-specific visual worlds, generated ",
		heroCopyEmphasis: "live.",
		facts: [
			{ term: "Input", value: "Guest portrait" },
			{ term: "Engine", value: "Custom AI" },
			{ term: "Output", value: "Share + print" },
		],
		imageAlt: "AI portrait capture connected to a live generated portrait wall",
		formatsTitle: "What we can build",
		formats: [
			{ title: "AI Portrait", copy: "AI-enhanced portraits with branded backdrops, styles and layouts." },
			{ title: "Face Swap", copy: "Real-time face swap experiences with themed templates." },
			{ title: "Virtual Try-On", copy: "Try-on experiences for products, outfits and accessories." },
			{ title: "AI Greenbox", copy: "Place guests in any scene with AI background generation." },
			{ title: "AI Draw", copy: "Turn simple sketches or prompts into polished visual artwork." },
			{ title: "Branded Video", copy: "Short AI-powered video clips with custom motion and effects." },
		],
		formatLink: "Explore format",
		flowTitle: "From capture to campaign asset",
		flow: [
			{ number: "01", title: "Capture", copy: "Guest captured on-site with optimized lighting." },
			{ number: "02", title: "Generate", copy: "AI transforms the portrait into the selected format." },
			{ number: "03", title: "Brand", copy: "Campaign elements and layouts are applied." },
			{ number: "04", title: "Review", copy: "Operators approve the result in real time." },
			{ number: "05", title: "Deliver", copy: "Share, print or save in high resolution." },
		],
		liveSolid: "Built for",
		liveOutline: "live",
		liveTail: "conditions.",
		liveLabel: "Built for live conditions",
		guarantees: [
			{ title: "Fast output", copy: "Optimized AI pipelines deliver high-quality results in seconds." },
			{ title: "Brand guardrails", copy: "Predefined rules protect brand identity across every output." },
			{ title: "On-site operation", copy: "Built for events with reliable hardware and on-site crew workflows." },
			{ title: "Data & consent", copy: "Secure storage, guest consent flows and data handling compliance." },
		],
		selectedTitle: "Selected AI Photo work",
		selected: [
			{
				slug: "defacto-x-afra-saracoglu-ai-fashion-experience",
				title: "DeFacto × Afra Saraçoğlu",
				alt: "DeFacto AI fashion experience",
				image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1776151672/metasoftco/projects/s2tx0odiouo33iv3evpz.png",
			},
			{
				slug: "adidas-evo-sl-x-ai-try-on-photo",
				title: "Adidas EVO SL × AI Try-On",
				alt: "Adidas AI try-on",
				image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1774878244/metasoftco/projects/zm4fhoverbifgnm2agsj.png",
			},
			{
				slug: "tavuk-dunyasi-x-ai-photo",
				title: "Tavuk Dünyası × AI Photo",
				alt: "Tavuk Dünyası AI Photo",
				image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1784029645/metasoftco/projects/w3ixfgdzqbywnyv12ddg.png",
			},
		],
		ctaSolid: "Turn one portrait",
		ctaOutline: "into a campaign moment.",
		ctaPrimary: "Plan Your Activation",
		ctaSecondary: "See Selected Work",
	},

	caseStudy: {
		breadcrumbAria: "Breadcrumb",
		crumbHome: "Home",
		crumbWork: "Work",
		title: "Tavuk Dünyası × AI Photo",
		eyebrow: "CASE STUDY · AI PHOTO",
		lede: "A live AI portrait experience that placed guests inside a visual world created for Tavuk Dünyası—and delivered a branded image they could take with them.",
		facts: [
			{ term: "CLIENT", value: "Tavuk Dünyası" },
			{ term: "FORMAT", value: "AI Photo activation" },
			{ term: "YEAR", value: null },
			{ term: "OUTPUT", value: "Branded digital portrait" },
		] as Phase2Fact[],
		imageAlt: "Tavuk Dünyası AI Photo campaign portrait",
		imageCaption: "CAMPAIGN OUTPUT · TAVUK DÜNYASI",
		opportunityEyebrow: "THE OPPORTUNITY",
		opportunityTitle: "Turn the audience into the campaign image.",
		opportunityLede:
			"The experience gave each participant a personal role in a Tavuk Dünyası visual world. The creative idea, capture flow and final branded composition were treated as one connected guest journey.",
		opportunityCopy:
			"Instead of asking people to watch the content, the activation made their own portrait the content—creating a direct, memorable interaction with the campaign.",
		conceptEyebrow: "THE CONCEPT",
		conceptTitle: "A branded scene, completed by the guest.",
		conceptCopy:
			"The visual direction was designed to hold together as campaign content while leaving enough space for every participant to become the focal point.",
		journey: [
			{ number: "01", title: "Guest portrait", copy: "A participant steps into the branded capture experience." },
			{
				number: "02",
				title: "Campaign scene",
				copy: "The portrait enters a visual scenario developed for Tavuk Dünyası.",
			},
			{
				number: "03",
				title: "AI rendering",
				copy: "The live image pipeline creates the personalised final composition.",
			},
			{
				number: "04",
				title: "Digital takeaway",
				copy: "The guest receives the branded result as a shareable image.",
			},
		],
		executionEyebrow: "PHYSICAL EXECUTION",
		executionTitle: "From screen interaction to personal takeaway.",
		executionCopy:
			"The project record shows the experience as a physical event installation: a branded kiosk, a simple guest-facing flow and an AI-generated image delivered at the end.",
		executionChecklist: [
			"Branded kiosk and interface",
			"Live portrait capture",
			"Real-time AI image pipeline",
			"Digital result for the guest",
		],
		videoTitle: "Tavuk Dünyası AI Photo activation in use",
		galleryEyebrow: "CAMPAIGN OUTPUTS",
		galleryTitle: "One visual system, multiple personal portraits.",
		galleryAlt: (index: number) => `Tavuk Dünyası AI portrait ${index}`,
		recordEyebrow: "WHAT THE PROJECT DEMONSTRATES",
		recordTitle: "Creative direction, custom software and live delivery working as one.",
		record: [
			"A brand-specific visual concept rather than a generic effect.",
			"A guest journey designed for a physical live environment.",
			"A personalised digital asset that extends the interaction beyond the kiosk.",
			"A connected build across interface, AI processing and event installation.",
		],
		capabilityLabel: "RELATED CAPABILITY",
		capabilityTitle: "AI Photo Booth for Events",
		capabilityHref: enPaths.capabilityDetailHref,
		finalEyebrow: "START A CONVERSATION",
		finalTitle: "Build a similar experience for your campaign.",
		finalCopy:
			"Bring us the audience, venue and visual idea. We’ll turn it into a practical guest journey and a live-ready system.",
		finalPrimary: "Build a Similar Experience",
		finalSecondary: "Explore More Work",
	},

	/**
	 * Screens below are rendered from database records rather than from the
	 * hardcoded copy above — only the chrome around the content lives here.
	 */

	capabilityCategory: {
		crumbHome: "Home",
		crumbCapabilities: "Capabilities",
		facts: [
			{ term: "Services", value: null },
			{ term: "Setup", value: "Turnkey" },
			{ term: "Operation", value: "On-site crew" },
			{ term: "Coverage", value: "Nationwide" },
		] as Phase2Fact[],
		catalogAria: "Services in this category",
		catalogTitle: "In this category",
		cardLink: "Explore Service",
		faqTitle: "Frequently asked questions",
		ctaSolid: "Bring this experience",
		ctaOutline: "to your next event.",
		ctaButton: "Plan Your Activation",
	},

	serviceDetail: {
		crumbHome: "Home",
		crumbCapabilities: "Capabilities",
		categoryTerm: "Category",
		fallbackFacts: [
			{ term: "Setup", value: "Turnkey" },
			{ term: "Operation", value: "On-site crew" },
			{ term: "Coverage", value: "Nationwide" },
		] as Phase2Fact[],
		videoTitle: "See it running",
		aboutTitle: "About this service",
		specsTitle: "Technical specifications",
		faqTitle: "Frequently asked questions",
		galleryTitle: "From the field",
		galleryAlt: (index: number) => `Service photo ${index}`,
		relatedTitle: "Related services",
		backLabel: "All capabilities",
		ctaSolid: "Tailor this capability",
		ctaOutline: "to your event.",
		ctaPrimary: "Plan Your Activation",
		ctaSecondary: "See Selected Work",
	},

	projectDetail: {
		crumbHome: "Home",
		crumbWork: "Work",
		clientTerm: "Client",
		formatTerm: "Format",
		yearTerm: "Year",
		siteValue: "Visit site",
		videoTitle: "See it running",
		aboutTitle: "About the project",
		stackTitle: "Technologies used",
		galleryTitle: "From the activation",
		galleryAlt: (index: number) => `Project photo ${index}`,
		nextLabel: "Next project",
		backLabel: "All work",
		ctaSolid: "Build something",
		ctaOutline: "people step into.",
		ctaButton: "Plan Your Activation",
	},

	/** Presentation overrides for the three homepage hero projects, keyed by English slug. */
	featuredProjects: {
		"tavuk-dunyasi-x-ai-photo": { title: "Tavuk Dünyası × AI Photo", category: "AI Photo Activation" },
		"pegasus-airlines-digital-gift-wheel-activation": {
			title: "Pegasus × Digital Gift Wheel",
			category: "Interactive Game",
		},
		"ray-ban-x-strip-photo": { title: "Ray-Ban × Strip Photo", category: "Photo Activation" },
	} as Record<string, { title: string; category: string }>,

	/** Presentation overrides for the three homepage services, keyed by English slug. */
	featuredServices: {
		"aura-photobooth-rental-real-time-aura-photography-with-biofeedback-sensors": {
			category: "Aura Experience",
			description:
				"Guests place their hands on our sensors to see their own energy visualized in real-time color—a mystical, tech-forward touch for your event.",
		},
		"ai-photobooth": { category: "AI Photo Activation" },
		"photobooth-rental": { category: "Photo Activation" },
	} as Record<string, { category: string; description?: string }>,
};

export type Phase2Copy = typeof en;

const tr: Phase2Copy = {
	locale: "tr",
	routes: trPaths.routes,

	nav: {
		skipLink: "İçeriğe geç",
		homeAria: "MetasoftCo ana sayfa",
		primaryAria: "Ana menü",
		mobileAria: "Mobil menü",
		openMenu: "Menüyü aç",
		closeMenu: "Menüyü kapat",
		localeSwitchAria: "İngilizceye geç",
		localeSwitchLabel: "TR / EN",
		cta: "Aktivasyonunuzu Planlayın",
		aiCta: "Yapay Zekadan Öneri Al",
		aiCtaAria: "Etkinlik önerileri için yapay zeka asistanını aç",
		items: [
			{ href: trPaths.routes.work, label: "Projeler" },
			{ href: trPaths.routes.capabilities, label: "Hizmetler" },
			{ href: trPaths.routes.about, label: "Hakkımızda" },
			{ href: trPaths.routes.insights, label: "Blog" },
			{ href: trPaths.routes.contact, label: "İletişim" },
		],
	},

	footer: {
		tagline: "İstanbul Üniversitesi Teknopark'ta markalar ve ajanslar için geliştirdiğimiz yapay zekâ destekli deneyim teknolojileri.",
		exploreLabel: "KEŞFET",
		contactLabel: "İLETİŞİM",
		followLabel: "TAKİP EDİN",
		city: "Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No: 37/1 İç Kapı No: 28, Avcılar / İstanbul",
		baseline: "Fikir · Yazılım · Fiziksel üretim · Saha operasyonu",
		links: [
			{ href: trPaths.routes.work, label: "Projeler" },
			{ href: trPaths.routes.capabilities, label: "Hizmetler" },
			{ href: trPaths.routes.about, label: "Hakkımızda" },
			{ href: trPaths.routes.insights, label: "Blog" },
			{ href: trPaths.routes.contact, label: "İletişim" },
		],
	},

	home: {
		heroEyebrow: "YAPAY ZEKÂ DESTEKLİ DENEYİM TEKNOLOJİSİ",
		// Mirrors the English structure: the outline word is the subject and the
		// solid stack is the predicate, keeping every solid line short enough to
		// clear the portal image and the brief column.
		heroTitleOutline: "Markaların",
		heroTitleSolid: ["Ruhunu", "İnsanların", "Anılarına", "İşliyoruz"],
		heroTitleLabel: "insanlarla buluşturur",
		heroFigureAlt: "Ray-Ban fotoğraf aktivasyonuna katılan katılımcılar",
		heroFigureLabel: "CANLI KATILIM",
		heroFigureCaption: "Ray-Ban · Strip Photo",
		heroBrief:
			"MetasoftCo; markalar ve ajanslar için fotoğraf, video, oyun ve özel kurulumlardan oluşan markalı deneyimler tasarlar ve üretir. Yaratıcı fikirden özel yazılıma, fiziksel üretimden saha operasyonuna kadar tüm süreci tek ekipte buluştururuz.",
		heroPrimaryCta: "Aktivasyonunuzu Planlayın",
		heroSecondaryCta: "Seçili Projeleri İnceleyin",
		brandLoopAria: "Seçili marka iş birlikleri",
		brandLoopEyebrow: "YENİLİĞE YÖN VEREN MARKALARIN TERCİHİ",
		workEyebrow: "SEÇİLİ PROJELER",
		workTitle: "İnsanları\n{deneyimin}\nparçası yapan\nprojeler.",
		workCopy:
			"Gerçek insanlar, gerçek anlar. Katılımcıyı izleyiciden deneyimin parçasına dönüştüren ve markayla kalıcı bağ kuran işler tasarlıyoruz.",
		workLinkLabel: "Projeyi incele",
		workFallbackCategory: "Etkinlik Deneyimi",
		capabilitiesEyebrow: "HİZMETLER",
		capabilitiesTitle: "Katılımcıyı\n{içeriğin}\nmerkezine alan\nformatlar.",
		capabilitiesCopy:
			"Yapay zekâ destekli portrelerden sensör tabanlı fotoğrafçılığa kadar; katılımcının anını paylaşılabilir, markaya özel içeriğe dönüştüren formatlar tasarlıyoruz.",
		capabilitiesLinkLabel: "Hizmeti incele",
		capabilitiesFallbackCategory: "Fotoğraf Deneyimi",
		processEyebrow: "NASIL ÜRETİYORUZ",
		processSrTitle: "Nasıl üretiyoruz",
		process: [
			{
				number: "01",
				title: "İhtiyacı netleştiririz",
				copy: "Hedef kitleyi, mekânı, kampanya fikrini ve hedeflenen katılımcı yolculuğunu birlikte tanımlarız.",
			},
			{
				number: "02",
				title: "Deneyimi tasarlarız",
				copy: "Yaratıcı yaklaşımı, etkileşim akışını ve teknik uygulanabilirliği netleştiririz.",
			},
			{
				number: "03",
				title: "Sistemi geliştiririz",
				copy: "Özel yazılımı, markalı arayüzü, içeriği ve fiziksel bileşenleri tek sistemde birleştiririz.",
			},
			{
				number: "04",
				title: "Sahada hayata geçiririz",
				copy: "Kurulumdan etkinlik günü operasyonuna kadar tüm süreci sahada yönetiriz.",
			},
		],
		valueEyebrow: "NEDEN İNTERAKTİF",
		valueTitle: "Marka hikâyesinde kitleye bir {rol} verin.",
		valueTitleLabel: "Marka hikâyesinde kitleye bir rol verin.",
		valuePoints: [
			"İnsanlar yalnızca gördüklerini değil, deneyimin parçası oldukları anları hatırlar.",
			"Aktif katılım, markayla daha güçlü ve kişisel bir bağ kurar.",
			"Paylaşılabilir içerikler, deneyimin etkisini etkinlik alanının ötesine taşır.",
			"Ölçülebilir veriler ve içgörüler, sonraki deneyimleri daha güçlü hâle getirir.",
		],
		finalEyebrow: "SIRADAKİ DENEYİM",
		finalTitle: "Sıradaki kampanyanızı\n{insanların katılmak isteyeceği bir deneyime dönüştürelim.}",
		finalTitleLabel: "Sıradaki kampanyanızı insanların katılmak isteyeceği bir deneyime dönüştürelim.",
		finalCopy:
			"Hedef kitlenizi, mekânı ve kampanya hedefinizi paylaşın. Etkileşimi, teknolojiyi ve saha uygulamasını projenize göre birlikte kurgulayalım.",
		finalCta: "Aktivasyonunuzu Planlayın",
	},

	about: {
		heroSolid: "Teknolojiyi",
		heroOutline: "sahneye çıkarıyoruz.",
		heroLabel: "Teknolojiyi sahneye çıkarıyoruz.",
		locationChip: "İstanbul  /  2020'den beri",
		heroCopy:
			"Yaratıcı fikir, özel yazılım, fiziksel üretim ve saha operasyonunu bir araya getirerek markaları insanlarla gerçek zamanlı buluşturan deneyimler tasarlıyor ve hayata geçiriyoruz.",
		storyTitle: "İstanbul’da geliştiriyoruz.\nSahada hayata geçiriyoruz.",
		storyParagraphs: [
			"Yaratıcı fikir, yazılım, fiziksel üretim ve saha operasyonunu tek çatı altında topluyoruz.",
			"İlk fikirden etkinlik gününe kadar güvenilir, ölçülebilir ve katılım yaratan deneyimler geliştiriyoruz.",
		],
		stats: [
			{ value: "1.000+", label: "Canlı etkinlik" },
			{ value: "100+", label: "Marka" },
			{ value: "5+", label: "Yıl" },
			{ value: "Tek", label: "Uçtan uca ekip" },
		],
		principles: [
			{
				title: "Katılımı merkeze alırız",
				copy: "Yalnızca izlenen değil, insanların gerçekten dahil olduğu deneyimler tasarlarız.",
			},
			{
				title: "Saha koşullarına hazırlarız",
				copy: "Her detayı etkinlik günü güvenilir ve sorunsuz çalışacak şekilde planlarız.",
			},
			{ title: "Akılda kalıcı bir iz bırakırız", copy: "Paylaşılmaya ve hatırlanmaya değer anlar yaratırız." },
		],
		finalSolid: "İhtiyacı siz anlatın.",
		finalOutline: "Deneyimi biz hayata geçirelim.",
		finalCta: "Aktivasyonunuzu Planlayın",
	},

	contact: {
		heroSolid: "İnsanları\nmarkanızla buluşturan",
		heroOutline: "bir deneyim tasarlayalım.",
		heroLabel: "İnsanları markanızla buluşturan bir deneyim tasarlayalım.",
		heroCopy: "Hedef kitlenizi, mekânı ve kampanya hedefinizi paylaşın. Deneyimi birlikte şekillendirelim.",
		asideTitle: "Projenizi konuşalım",
		location: "İstanbul, Türkiye",
		replyTime: "Bir iş günü içinde geri dönüş",
		figureAlt: "Etkinlik proje detaylarını inceleyen MetasoftCo ekibi",
		form: {
			name: "Ad Soyad *",
			namePlaceholder: "Adınız ve soyadınız",
			company: "Şirket *",
			companyPlaceholder: "Şirket adı",
			email: "E-posta *",
			emailPlaceholder: "ornek@sirket.com",
			phone: "Telefon *",
			phonePlaceholder: "+90 5XX XXX XX XX",
			event: "Etkinlik / kampanya *",
			eventPlaceholder: "Etkinlik veya kampanya adı",
			venue: "Mekân ve şehir *",
			venuePlaceholder: "Mekân adı ve şehir",
			date: "Hedef tarih *",
			audience: "Beklenen katılımcı *",
			audiencePlaceholder: "Tahmini kişi sayısı",
			budget: "Bütçe aralığı *",
			budgetPlaceholder: "Bütçe aralığı seçin",
			budgetOptions: ["5.000–10.000 €", "10.000–25.000 €", "25.000 €+"],
			experienceLegend: "Nasıl bir deneyim planlıyorsunuz? *",
			experienceTypes: [
				"Yapay Zekâ Fotoğraf ve Video",
				"Fotoğraf Aktivasyonları",
				"İnteraktif Oyunlar",
				"Özel Kurulumlar",
			],
			brief: "Projenizi anlatın *",
			briefPlaceholder:
				"Hedefinizi, katılımcı kitlenizi, vermek istediğiniz mesajı ve varsa örnek aldığınız işleri paylaşın…",
			submit: "Proje detaylarını gönder",
			submitting: "Gönderiliyor…",
			submitted: "Proje detayları alındı",
			success: "Teşekkürler — proje detaylarınız ekibimize ulaştı. Bir iş günü içinde size dönüş yapacağız.",
			error: "Proje detayları gönderilemedi. Lütfen info@metasoftco.com adresine yazın veya tekrar deneyin.",
		},
		nextStepsTitle: "Bundan sonra ne olacak",
		nextSteps: [
			{
				number: "01",
				title: "İhtiyacı anlarız",
				copy: "Proje detaylarınızı inceler, hedefi netleştirmek için doğru soruları sorarız.",
			},
			{
				number: "02",
				title: "Deneyimi kurgularız",
				copy: "Markanıza ve hedef kitlenize uygun deneyimi ve teknik çözümü tasarlarız.",
			},
			{
				number: "03",
				title: "Sahaya hazırlarız",
				copy: "Ekibi, üretimi ve takvimi planlar; deneyimi etkinlik gününe hazır hâle getiririz.",
			},
		],
		liteTitle: "Henüz tüm detaylar net değil mi?",
		liteCopy: "Bize kısaca ulaşın ya da önce projelerimizi inceleyin.",
		liteMailLabel: "E-posta gönderin",
		liteWorkLabel: "Yapay Zekadan Öneri Al",
		finalSolid: "Sıradaki",
		finalOutline: "canlı an",
		finalTail: "burada başlıyor.",
	},

	work: {
		heroSolid: "İnsanları\ndeneyimin parçası yapan",
		heroOutline: "projeler.",
		heroLabel: "İnsanları deneyimin parçası yapan projeler.",
		heroCopy:
			"İnsanları izleyici olmaktan çıkarıp deneyimin parçasına dönüştüren, markayla gerçek bağ kuran aktivasyonlar tasarlıyor ve sahada hayata geçiriyoruz.",
		catalogAria: "Tüm projeler",
		cardLink: "Projeyi İncele",
		ctaSolid: "Sıradaki kampanyanızı",
		ctaOutline: "katılım odaklı bir deneyime dönüştürelim.",
		ctaLabel: "Sıradaki kampanyanızı katılım odaklı bir deneyime dönüştürelim.",
		ctaButton: "Aktivasyonunuzu Planlayın",
	},

	capabilities: {
		heroSolid: "Deneyimin arkasındaki",
		heroOutline: "teknolojiyi kuruyoruz.",
		heroLabel: "Deneyimin arkasındaki teknolojiyi kuruyoruz.",
		heroCopy:
			"Yaratıcı fikir, özel yazılım, fiziksel üretim ve saha operasyonunu bir araya getirerek markaları insanlarla buluşturan deneyimleri uçtan uca geliştiriyoruz.",
		catalogAria: "Hizmetler",
		cardLink: "Hizmeti İncele",
		endToEndTitle: "Tek ekip,\nuçtan uca çözüm",
		process: [
			{
				number: "01",
				title: "Keşif",
				copy: "İhtiyacı dinler; hedefi, katılımcı kitlesini ve başarı ölçütlerini birlikte netleştiririz.",
			},
			{
				number: "02",
				title: "Tasarım",
				copy: "Fikri, katılımcı yolculuğunu ve teknik çözümü bir bütün olarak tasarlarız.",
			},
			{
				number: "03",
				title: "Geliştirme",
				copy: "Yazılımı, arayüzü ve fiziksel bileşenleri geliştirir, test eder ve bir araya getiririz.",
			},
			{
				number: "04",
				title: "Saha",
				copy: "Kurulumu yapar, etkinlik günü operasyonunu yürütür ve deneyimin sorunsuz çalışmasını sağlarız.",
			},
		],
		ctaSolid: "Fikrinizi",
		ctaOutline: "canlı bir deneyime dönüştürelim.",
		ctaButton: "Aktivasyonunuzu Planlayın",
	},

	insights: {
		heroSolid: "Blog",
		heroOutline: "",
		heroLabel: "Sahadan notlar ve fikirler.",
		heroCopy:
			"Yapay zekâ, fotoğraf aktivasyonları ve canlı marka deneyimlerinin arkasındaki teknoloji üzerine saha notları, teknik incelemeler ve fikirler.",
		catalogAria: "Tüm yazılar",
		featuredLabel: "Son yazı",
		cardLink: "Yazıyı Oku",
		emptyTitle: "Henüz yayında yazı yok",
		emptyCopy: "Yeni saha notları yolda. Kısa süre içinde burada olacak.",
		ctaSolid: "Anlatmaya değer",
		ctaOutline: "bir projeniz mi var?",
		ctaLabel: "Anlatmaya değer bir projeniz mi var?",
		ctaButton: "Aktivasyonunuzu Planlayın",
	},

	insightDetail: {
		crumbHome: "Ana Sayfa",
		crumbInsights: "Blog",
		authorTerm: "Yazar",
		dateTerm: "Yayın tarihi",
		categoryTerm: "Konu",
		readTerm: "Okuma süresi",
		readValue: (minutes: number) => `${minutes} dk okuma`,
		relatedTitle: "Diğer yazılar",
		backLabel: "Tüm yazılar",
		ctaSolid: "Fikri",
		ctaOutline: "canlı bir deneyime dönüştürelim.",
		ctaLabel: "Fikri canlı bir deneyime dönüştürelim.",
		ctaButton: "Aktivasyonunuzu Planlayın",
	},

	workDetail: {
		crumb: "Projeler  /  Proje Detayı  /  01",
		heroSolid: "Ray-Ban ×",
		heroOutline: "Strip Photo",
		heroCopy:
			"Katılımcıların anlarını, paylaşmak ve saklamak isteyecekleri markalı fotoğraf şeritlerine dönüştüren bir fotoğraf aktivasyonu.",
		facts: [
			{ term: "Marka", value: "Ray-Ban" },
			{ term: "Deneyim", value: "Fotoğraf aktivasyonu" },
			{ term: "Yıl", value: null },
			{ term: "Çıktı", value: "Markalı fotoğraf şeridi" },
		],
		imageAlt: "Ray-Ban Strip Photo aktivasyonu",
		fallbackGalleryAlts: [
			"Strip Photo aktivasyonu",
			"Strip Photo deneyimini kullanan katılımcılar",
			"Basılmış fotoğraf şeridi",
		],
		briefTitle: "İhtiyaç",
		briefCopy:
			"Ray-Ban, ikonik stilini paylaşılabilir bir deneyimle buluşturan ve etkinlik bittikten sonra da katılımcıların yanında kalacak bir fotoğraf uygulaması istedi.",
		experienceTitle: "Deneyim",
		experienceCopy:
			"Katılımcı alana girer ve poz verir. Sistemimiz art arda çektiği karelerle anın enerjisini yakalar; ortaya anında basılan ve dijital olarak paylaşılabilen markalı bir fotoğraf şeridi çıkar.",
		systemTitle: "Sistem",
		system: [
			{
				title: "Çekim",
				copy: "Kamera sistemi art arda kareler yakalayarak doğal ifadeleri ve hareketi kaydeder.",
			},
			{
				title: "Marka uygulaması",
				copy: "Ray-Ban’in marka öğeleri ve çerçeve tasarımları her fotoğraf şeridine anında uygulanır.",
			},
			{
				title: "Baskı",
				copy: "Yüksek kaliteli fotoğraf şeritleri anında basılır ve katılımcılara kalıcı bir hatıra olarak verilir.",
			},
			{
				title: "Paylaşım",
				copy: "Katılımcılar QR kodu okutarak dijital fotoğraf şeritlerine ulaşır ve diledikleri yerde paylaşır.",
			},
		],
		impact: [
			{ value: "1.8K+", label: "Katılımcı" },
			{ value: "%92", label: "Anında teslim" },
			{ value: "%67", label: "Dijital paylaşım" },
		],
		quote: "“Bu bir fotoğraftan fazlası. İnsanların saklamak istediği bir an ve anlatmak istediği bir hikâye. Deneyimin gücü tam olarak bu.”",
		quoteCite: "Ray-Ban ekibi",
		nextLabel: "Sıradaki proje",
		nextTitle: "Pegasus ×\nDijital Hediye Çarkı",
		nextAlt: "Pegasus Dijital Hediye Çarkı",
		nextHref: trPaths.projectHref(phase2ProjectSlugs.nextProject.tr),
		ctaSolid: "Katılımcıların yanında götüreceği",
		ctaOutline: "bir deneyim tasarlayın.",
		ctaButton: "Aktivasyonunuzu Planlayın",
	},

	capabilityDetail: {
		crumb: "Hizmetler  /  Yapay Zekâ Fotoğraf + Video",
		heroSolid: "Yapay Zekâ",
		heroOutline: "Fotoğraf + Video",
		heroLabel: "Yapay Zekâ Fotoğraf ve Video",
		heroCopyBefore: "Kampanyaya özel görsel dünyalar, ",
		heroCopyEmphasis: "anında üretilir.",
		facts: [
			{ term: "Girdi", value: "Katılımcı portresi" },
			{ term: "Motor", value: "Özel yapay zekâ" },
			{ term: "Çıktı", value: "Paylaşım + baskı" },
		],
		imageAlt: "Canlı üretilen portre duvarına bağlı yapay zekâ portre çekim istasyonu",
		formatsTitle: "Neler geliştirebiliriz",
		formats: [
			{
				title: "Yapay Zekâ Portre",
				copy: "Markanıza özel fonlar, görsel stiller ve tasarımlarla oluşturulan yapay zekâ destekli portreler.",
			},
			{ title: "Yüz Değiştirme", copy: "Temaya özel şablonlarla gerçek zamanlı yüz değiştirme deneyimleri." },
			{ title: "Sanal Deneme", copy: "Ürün, kıyafet ve aksesuarlar için sanal deneme deneyimleri." },
			{
				title: "Yapay Zekâ Arka Plan",
				copy: "Yapay zekâ ile üretilen arka planlarla katılımcıları istediğiniz görsel dünyaya taşıyın.",
			},
			{
				title: "Yapay Zekâ Çizim",
				copy: "Basit çizimleri veya kısa metinleri, markanıza özel tamamlanmış görsellere dönüştürün.",
			},
			{
				title: "Markalı Video",
				copy: "Markaya özel hareket, kurgu ve efektlerle hazırlanan yapay zekâ destekli kısa videolar.",
			},
		],
		formatLink: "Deneyimi inceleyin",
		flowTitle: "Çekimden markalı içeriğe",
		flow: [
			{ number: "01", title: "Çekim", copy: "Katılımcının portresi, sahada uygun ışık ve kadrajla çekilir." },
			{ number: "02", title: "Dönüşüm", copy: "Yapay zekâ, portreyi seçilen deneyim kurgusuna göre dönüştürür." },
			{
				number: "03",
				title: "Marka uygulaması",
				copy: "Kampanyaya özel logo, grafik ve tasarım öğeleri sonuca uygulanır.",
			},
			{ number: "04", title: "Kontrol", copy: "Saha ekibi sonucu anında kontrol eder ve onaylar." },
			{
				number: "05",
				title: "Teslim",
				copy: "Sonuç yüksek çözünürlükte dijital olarak paylaşılır, basılır veya kaydedilir.",
			},
		],
		liveSolid: "Etkinlik ortamı",
		liveOutline: "için",
		liveTail: "tasarlandı.",
		liveLabel: "Etkinlik ortamı için tasarlandı",
		guarantees: [
			{
				title: "Hızlı sonuç",
				copy: "Optimize edilmiş yapay zekâ işleme altyapısı, saniyeler içinde yüksek kaliteli içerik üretir.",
			},
			{
				title: "Marka bütünlüğü",
				copy: "Önceden belirlenen görsel kurallar, her çıktının marka kimliğiyle uyumlu kalmasını sağlar.",
			},
			{
				title: "Saha operasyonu",
				copy: "Donanım, yazılım ve ekip akışı; etkinlik ortamında kesintisiz çalışacak şekilde planlanır.",
			},
			{
				title: "Veri güvenliği ve açık rıza",
				copy: "Güvenli saklama, katılımcı onay akışları ve KVKK’ya uygun veri yönetimi.",
			},
		],
		selectedTitle: "Seçili yapay zekâ fotoğraf projeleri",
		selected: [
			{
				slug: "defacto-x-afra-saracoglu-ai-fashion-experience",
				title: "DeFacto × Afra Saraçoğlu",
				alt: "DeFacto yapay zekâ moda deneyimi",
				image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1776151672/metasoftco/projects/s2tx0odiouo33iv3evpz.png",
			},
			{
				slug: "adidas-evo-sl-x-ai-try-on-photo",
				title: "Adidas EVO SL × AI Try-On",
				alt: "Adidas yapay zekâ sanal deneme",
				image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1774878244/metasoftco/projects/zm4fhoverbifgnm2agsj.png",
			},
			{
				slug: "tavuk-dunyasi-x-ai-photo",
				title: "Tavuk Dünyası × AI Photo",
				alt: "Tavuk Dünyası AI Photo",
				image: "https://res.cloudinary.com/dqkehdebg/image/upload/v1784029645/metasoftco/projects/w3ixfgdzqbywnyv12ddg.png",
			},
		],
		ctaSolid: "Tek bir portreyi",
		ctaOutline: "markanıza özel bir deneyime dönüştürün.",
		ctaPrimary: "Aktivasyonunuzu Planlayın",
		ctaSecondary: "Seçili Projeleri İnceleyin",
	},

	caseStudy: {
		breadcrumbAria: "Gezinti yolu",
		crumbHome: "Ana sayfa",
		crumbWork: "Projeler",
		title: "Tavuk Dünyası × AI Photo",
		eyebrow: "PROJE HİKÂYESİ · YAPAY ZEKÂ FOTOĞRAF",
		lede: "Katılımcıları Tavuk Dünyası için tasarlanan görsel dünyanın merkezine yerleştiren ve saniyeler içinde kişiselleştirilmiş, markalı bir görsel sunan yapay zekâ portre deneyimi.",
		facts: [
			{ term: "MARKA", value: "Tavuk Dünyası" },
			{ term: "DENEYİM", value: "Yapay zekâ fotoğraf aktivasyonu" },
			{ term: "YIL", value: null },
			{ term: "ÇIKTI", value: "Markalı dijital portre" },
		],
		imageAlt: "Tavuk Dünyası AI Photo kampanya portresi",
		imageCaption: "KAMPANYA ÇIKTISI · TAVUK DÜNYASI",
		opportunityEyebrow: "AMAÇ",
		opportunityTitle: "Katılımcıyı kampanya görselinin merkezine taşımak.",
		opportunityLede:
			"Her katılımcıyı Tavuk Dünyası için tasarlanan görsel dünyanın merkezine yerleştirdik. Yaratıcı fikirden çekim akışına ve son görseldeki marka uygulamasına kadar tüm adımları tek bir katılımcı deneyimi olarak kurguladık.",
		opportunityCopy:
			"Katılımcılar içeriği yalnızca izlemek yerine kendi portreleriyle içeriğin bir parçası oldu. Böylece kampanyayla doğrudan, kişisel ve akılda kalıcı bir etkileşim kuruldu.",
		conceptEyebrow: "YARATICI FİKİR",
		conceptTitle: "Katılımcıyla tamamlanan markalı bir görsel dünya.",
		conceptCopy:
			"Görsel dünya, marka kimliğini korurken her katılımcının doğal biçimde odak noktasına yerleşebileceği şekilde tasarlandı.",
		journey: [
			{
				number: "01",
				title: "Katılımcı portresi",
				copy: "Katılımcının portresi markaya özel çekim alanında alınır.",
			},
			{
				number: "02",
				title: "Markalı sahne",
				copy: "Portre, Tavuk Dünyası için tasarlanan görsel dünyaya yerleştirilir.",
			},
			{
				number: "03",
				title: "Yapay zekâ dönüşümü",
				copy: "Görüntü işleme altyapısı kişiselleştirilmiş son görseli saniyeler içinde oluşturur.",
			},
			{
				number: "04",
				title: "Dijital hatıra",
				copy: "Katılımcı markalı sonucu dijital ve paylaşılabilir bir görsel olarak alır.",
			},
		],
		executionEyebrow: "FİZİKSEL UYGULAMA",
		executionTitle: "Ekrandaki etkileşimden kişisel bir hatıraya.",
		executionCopy:
			"Deneyim; markalı bir kiosk, kolay anlaşılır bir katılımcı akışı ve sonunda teslim edilen kişiselleştirilmiş yapay zekâ görselinden oluşan fiziksel bir etkinlik kurulumu olarak hayata geçirildi.",
		executionChecklist: [
			"Markalı kiosk ve arayüz",
			"Canlı portre çekimi",
			"Gerçek zamanlı yapay zekâ görüntü işleme altyapısı",
			"Katılımcıya özel dijital çıktı",
		],
		videoTitle: "Tavuk Dünyası yapay zekâ fotoğraf aktivasyonu sahada",
		galleryEyebrow: "KAMPANYA ÇIKTILARI",
		galleryTitle: "Tek bir görsel dünya, her katılımcıya özel sonuçlar.",
		galleryAlt: (index: number) => `Tavuk Dünyası yapay zekâ portresi ${index}`,
		recordEyebrow: "NELER ORTAYA KOYDUK",
		recordTitle: "Yaratıcı fikir, özel yazılım ve saha operasyonu tek bir deneyimde buluşuyor.",
		record: [
			"Hazır bir efekt yerine markaya özel tasarlanmış bir görsel dünya.",
			"Etkinlik ortamına göre tasarlanmış, kolay ve akıcı bir katılımcı yolculuğu.",
			"Etkileşimi kioskun ötesine taşıyan, katılımcıya özel paylaşılabilir dijital içerik.",
			"Arayüzü, yapay zekâ işleme altyapısını ve fiziksel kurulumu tek sistemde birleştiren uçtan uca çözüm.",
		],
		capabilityLabel: "İLGİLİ HİZMET",
		capabilityTitle: "Etkinlikler için Yapay Zekâ Fotoğraf Deneyimi",
		capabilityHref: trPaths.capabilityDetailHref,
		finalEyebrow: "PROJENİZİ KONUŞALIM",
		finalTitle: "Kampanyanız için benzer bir deneyim tasarlayalım.",
		finalCopy:
			"Katılımcı kitlenizi, mekânı ve görsel fikrinizi paylaşın. Biz de bunları sahada sorunsuz çalışan, markanıza özel bir deneyime dönüştürelim.",
		finalPrimary: "Benzer Bir Deneyim Planlayın",
		finalSecondary: "Diğer Projeleri İnceleyin",
	},

	capabilityCategory: {
		crumbHome: "Ana Sayfa",
		crumbCapabilities: "Hizmetler",
		facts: [
			{ term: "Hizmet", value: null },
			{ term: "Kurulum", value: "Anahtar teslim" },
			{ term: "Operasyon", value: "Saha ekibi" },
			{ term: "Kapsam", value: "Türkiye geneli" },
		],
		catalogAria: "Bu kategorideki hizmetler",
		catalogTitle: "Bu kategoride",
		cardLink: "Hizmeti İncele",
		faqTitle: "Sık sorulan sorular",
		ctaSolid: "Bu deneyimi",
		ctaOutline: "etkinliğinize taşıyalım.",
		ctaButton: "Aktivasyonunuzu Planlayın",
	},

	serviceDetail: {
		crumbHome: "Ana Sayfa",
		crumbCapabilities: "Hizmetler",
		categoryTerm: "Kategori",
		fallbackFacts: [
			{ term: "Kurulum", value: "Anahtar teslim" },
			{ term: "Operasyon", value: "Saha ekibi" },
			{ term: "Kapsam", value: "Türkiye geneli" },
		],
		videoTitle: "Sahada nasıl çalışıyor",
		aboutTitle: "Hizmet hakkında",
		specsTitle: "Teknik özellikler",
		faqTitle: "Sık sorulan sorular",
		galleryTitle: "Sahadan kareler",
		galleryAlt: (index: number) => `Hizmet görseli ${index}`,
		relatedTitle: "İlgili hizmetler",
		backLabel: "Tüm hizmetler",
		ctaSolid: "Bu hizmeti",
		ctaOutline: "etkinliğinize uyarlayalım.",
		ctaPrimary: "Aktivasyonunuzu Planlayın",
		ctaSecondary: "Seçili Projeleri İnceleyin",
	},

	projectDetail: {
		crumbHome: "Ana Sayfa",
		crumbWork: "Projeler",
		clientTerm: "Marka",
		formatTerm: "Format",
		yearTerm: "Yıl",
		siteValue: "Siteyi ziyaret et",
		videoTitle: "Sahada nasıl çalıştı",
		aboutTitle: "Proje hakkında",
		stackTitle: "Kullanılan teknolojiler",
		galleryTitle: "Aktivasyondan kareler",
		galleryAlt: (index: number) => `Proje görseli ${index}`,
		nextLabel: "Sıradaki proje",
		backLabel: "Tüm projeler",
		ctaSolid: "Benzer bir deneyimi",
		ctaOutline: "sizin için kuralım.",
		ctaButton: "Aktivasyonunuzu Planlayın",
	},

	featuredProjects: {
		"tavuk-dunyasi-x-ai-photo": { title: "Tavuk Dünyası × AI Photo", category: "Yapay Zekâ Fotoğraf Aktivasyonu" },
		"pegasus-airlines-digital-gift-wheel-activation": {
			title: "Pegasus × Dijital Hediye Çarkı",
			category: "İnteraktif Oyun",
		},
		"ray-ban-x-strip-photo": { title: "Ray-Ban × Strip Photo", category: "Fotoğraf Aktivasyonu" },
	},

	featuredServices: {
		"aura-photobooth-rental-real-time-aura-photography-with-biofeedback-sensors": { category: "Aura Deneyimi" },
		"ai-photobooth": { category: "Yapay Zekâ Fotoğraf Aktivasyonu" },
		"photobooth-rental": { category: "Fotoğraf Aktivasyonu" },
	},
};

const dictionaries = { tr, en } satisfies Record<Phase2Locale, Phase2Copy>;

export function phase2Copy(locale: Phase2Locale): Phase2Copy {
	return dictionaries[locale];
}

/**
 * The /hizmetler and /en/services index grids render service cards at a 1:1
 * aspect ratio. A few services carry a source image cropped for a wider frame
 * (e.g. the homepage teaser), so this swaps in a square crop for the index
 * card only, keyed by service id. All other surfaces (homepage, detail page)
 * keep using the service's own `image` field untouched.
 */
export const capabilityListingImageOverrides: Record<string, string> = {
	cmkjohn4800012orrjn8ixgjb: "https://res.cloudinary.com/dqkehdebg/image/upload/v1787135672/metasoftco/services/listing/ai-photobooth-square.webp",
};
