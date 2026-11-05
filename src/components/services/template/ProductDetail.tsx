import Image from "next/image";
import Link from "next/link";
import type { Service, ServiceCategory } from "@prisma/client";
import ProductGallery from "./ProductGallery";
import ProductQuoteForm from "./ProductQuoteForm";
import AlternateUrls from "../ai-photobooth/AlternateUrls";
import { faqPlainText } from "@/lib/faq-text";
import { dataCaptureCopy } from "@/lib/data-capture";
import { DATA_CAPTURE_HUB_PATH } from "@/lib/data-capture-hub";
import { rentalOpsCopy, rentalProductName, toRentalOutput } from "@/lib/rental-ops";
import type { ServiceTemplateProfile, TemplateProject } from "@/lib/service-template/types";
import styles from "../ai-photobooth/ai-photobooth.module.css";
import extra from "./product-detail.module.css";

interface Props {
  profile: ServiceTemplateProfile;
  service: Service;
  category: ServiceCategory;
  projects: TemplateProject[];
  related: { id: string; slug: string; title: string }[];
  /** Service JSON-LD of the live route; the preview omits it. */
  serviceSchema?: Record<string, unknown>;
  /** Language-switch targets (TR path, EN path) of the live route. */
  alternates?: { tr: string; en: string };
}

/**
 * The AI Photobooth product layout (gallery · copy · quote card, then content
 * sections) fed by a service profile. Gallery, quote form and copy are the
 * only per-service inputs; the stylesheet is the AI Photobooth module itself.
 */
export default function ProductDetail({ profile, service, category, projects, related, serviceSchema, alternates }: Props) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const output = toRentalOutput(service.outputType);
  const operations = rentalOpsCopy("tr");
  const capture = dataCaptureCopy("tr", output === "none");
  const quoteHref = `/iletisim?urun=${encodeURIComponent(rentalProductName(service.title, "tr"))}`;
  const whatsapp = `https://wa.me/905342334051?text=${encodeURIComponent(`Merhaba, ${profile.productName} hakkında teklif almak istiyorum.`)}`;

  const photos = profile.product.galleryFrames.flatMap((frame) => {
    const image = bySlug.get(frame.projectSlug)?.gallery[frame.galleryIndex];
    return image ? [{ url: image.url, alt: `${profile.productName} ile üretilmiş gerçek proje görseli` }] : [];
  });
  const video = (profile.product.videoProjectSlug && bySlug.get(profile.product.videoProjectSlug)?.video) || null;
  const cases = profile.cases.items.flatMap((item) => {
    const project = bySlug.get(item.projectSlug);
    const image = project?.gallery[item.cardGalleryIndex] ?? project?.cover;
    return project && image ? [{ item, project, image }] : [];
  });
  const [line1, line2] = profile.product.titleLines;

  return (
    <article className={styles.page} id="top">
      {alternates && <AlternateUrls tr={alternates.tr} en={alternates.en} />}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }}
        />
      )}
      <div className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href="/">Ana sayfa</Link>
          <span>/</span>
          <Link href="/hizmetler">Hizmetler</Link>
          <span>/</span>
          <span>{profile.productName}</span>
        </div>

        <section className={styles.product} id="product" aria-labelledby="product-title">
          <div className={styles.productCopy}>
            <span className={styles.eyebrow}>{profile.product.eyebrow}</span>
            <h1 id="product-title">{line1}<br />{line2}</h1>
            <p className={styles.intro}>{profile.product.intro}</p>
            <p className={styles.description}>{profile.product.description}</p>
            <div className={styles.heroActions}>
              <a href="#teklif" className={styles.primary}>Etkinliğim için teklif al ↗</a>
              <a href={whatsapp} className={styles.roundLink} aria-label="WhatsApp üzerinden bilgi al" target="_blank" rel="noopener noreferrer">↗</a>
            </div>
            <div className={styles.badges}>
              {profile.product.badges.map((badge) => <span key={badge}>{badge}</span>)}
            </div>
            <dl className={styles.quickSpecs}>
              {profile.product.specs.map((spec) => (
                <div key={spec.term}><dt>{spec.term}</dt><dd>{spec.value}</dd></div>
              ))}
            </dl>
          </div>
          <div className={styles.productMedia}>
            <ProductGallery images={photos} video={video} name={profile.productName} />
          </div>
          <aside id="teklif" className={styles.quoteCard} aria-labelledby="quote-title">
            <span className={styles.eyebrow}>{profile.quoteCard.eyebrow}</span>
            <h2 id="quote-title">{profile.quoteCard.title}</h2>
            <p>{profile.quoteCard.lede}</p>
            <ProductQuoteForm product={profile.productName} message={profile.quoteCard.message} />
            <div className={styles.or}><span>veya</span></div>
            <a className={styles.whatsapp} href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp’tan bilgi alın ↗</a>
            <a href="tel:+905342334051" className={styles.phone}>+90 534 233 40 51</a>
          </aside>
        </section>

        <section id="nasil-calisir" className={styles.section} aria-labelledby="steps-title">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>{profile.steps.eyebrow}</span>
            <h2 id="steps-title">{profile.steps.title}</h2>
            <p>{profile.steps.lede}</p>
          </div>
          <ol className={`${styles.steps} ${extra.steps4}`}>
            {profile.steps.items.map((step, i) => (
              <li key={step.title}><span>{i + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>
            ))}
          </ol>
        </section>

        {profile.blocks.map((block) => (
          <section key={block.id} id={block.id} className={`${styles.section} ${styles.contentSection}`} aria-labelledby={`${block.id}-title`}>
            <div className={styles.contentHeading}>
              <span className={styles.eyebrow}>{block.eyebrow}</span>
              <h2 id={`${block.id}-title`}>{block.title}</h2>
              <p>{block.lede}</p>
            </div>
            <div className={styles.contentBody}>
              {block.items.map((item) => (
                <div key={item.title}><h3>{item.title}</h3><p>{item.body}</p></div>
              ))}
            </div>
          </section>
        ))}

        <section id="kapsam" className={`${styles.section} ${styles.scopeLayout}`} aria-labelledby="scope-title">
          <div>
            <span className={styles.eyebrow}>{profile.scope.eyebrow}</span>
            <h2 id="scope-title">{profile.scope.title}</h2>
            <p>{profile.scope.lede}</p>
            <a href="#teklif" className={styles.primary}>{profile.scope.cta}</a>
          </div>
          <div className={styles.scopePanels}>
            <div>
              <h3>{profile.scope.includedTitle}</h3>
              <ul>{profile.scope.included.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>{profile.scope.optionalTitle}</h3>
              <ul>{profile.scope.optional.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className={styles.small}>{profile.scope.note}</p>
            </div>
          </div>
        </section>

        <section id={profile.operations.id} className={`${styles.section} ${styles.contentSection}`} aria-labelledby="operations-title">
          <div className={styles.contentHeading}>
            <span className={styles.eyebrow}>{profile.operations.eyebrow}</span>
            <h2 id="operations-title">{profile.operations.title}</h2>
            <p>{profile.operations.lede}</p>
          </div>
          <div className={styles.contentBody}>
            <dl className={styles.operationFacts}>
              {operations.logistics(output).map((item) => (
                <div key={item.term}><dt>{item.term}</dt><dd>{item.value}</dd></div>
              ))}
            </dl>
            <p>{operations.serviceArea}</p>
          </div>
        </section>

        {cases.length > 0 && (
          <section id="projeler" className={`${styles.section} ${styles.projectsSection}`} aria-labelledby="projects-title">
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>{profile.cases.eyebrow}</span>
              <h2 id="projects-title" className={styles.projectHeading}>{profile.cases.title}</h2>
            </div>
            <div className={styles.projects}>
              {cases.map(({ item, project, image }) => (
                <article key={project.slug}>
                  <Link href={`/projeler/${project.slug}`} className={styles.projectImage}>
                    <Image src={image.url} alt={image.alt} fill sizes="(max-width: 640px) 90vw, 340px" />
                  </Link>
                  <div className={styles.projectBody}>
                    <span className={styles.eyebrow}>{item.kicker}</span>
                    <h3>{item.heading}</h3>
                    <p>{item.summary}</p>
                    <Link href={`/projeler/${project.slug}`} className={styles.textLink}>Projeyi incele ↗</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {service.dataCapture && (
          <section className={`${styles.section} ${styles.dataSection}`} aria-labelledby="data-title">
            <div>
              <span className={styles.eyebrow}>Veri yönetimi</span>
              <h2 id="data-title">İsteğe bağlı Data-Capture & CRM</h2>
              <p>{capture.summary || capture.intro}</p>
            </div>
            <div id="data-capture">
              <Link href={DATA_CAPTURE_HUB_PATH} className={styles.textLink}>Modülü incele ↗</Link>
            </div>
          </section>
        )}

        {profile.faq.items.length > 0 && (
          <section className={`${styles.section} ${styles.faqLayout}`} aria-labelledby="faq-title">
            <div>
              <span className={styles.eyebrow}>{profile.faq.eyebrow}</span>
              <h2 id="faq-title">{profile.faq.title}</h2>
              <p>{profile.faq.lede}</p>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={styles.textLink}>Sorunuzu WhatsApp’tan iletin ↗</a>
            </div>
            <div className={styles.faq}>
              {profile.faq.items.map((item, i) => (
                <details key={item.q} open={i === 0}>
                  <summary>{item.q}<span aria-hidden="true">+</span></summary>
                  <p>{faqPlainText(item.a)}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className={styles.closing}>
          <div>
            <h2>{profile.closing.title}</h2>
            <p>{profile.closing.lede}</p>
          </div>
          <div className={styles.closingActions}>
            <a href="#teklif" className={styles.primary}>Teklif alın ↗</a>
            <Link href={quoteHref} className={styles.textLink}>Detaylı teklif formu ↗</Link>
          </div>
        </section>

        {related.length > 0 && (
          <section className={`${styles.section} ${styles.related}`} aria-labelledby="related-title">
            <h2 id="related-title">İlgili hizmetler</h2>
            <div>
              {related.map((item) => (
                <Link key={item.id} href={`/hizmetler/${category.slug}/${item.slug}`}>{item.title} ↗</Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
