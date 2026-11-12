"use client";

import { isMomentoBallPage } from "@/lib/momento-ball";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { ServiceReference } from "@/lib/service-template/references";
import { MsFaq, MsProse } from "@/components/site-ms/parts";
import TrackedContactLink from "@/components/services/template/TrackedContactLink";
import ProductQuoteForm from "@/components/services/template/ProductQuoteForm";
import ProductSale, { type ShowcaseCard } from "@/components/services/template/ProductSale";
import type { SaleProduct } from "@/lib/sale-products";
import ServiceGallery from "@/components/services/template/ServiceGallery";
import { dataCaptureCopy } from "@/lib/data-capture";
import { DATA_CAPTURE_HUB_PATH } from "@/lib/data-capture-hub";
import {
  mergeRentalFaq,
  rentalOpsCopy,
  rentalProductName,
  toRentalOutput,
} from "@/lib/rental-ops";
import { isSoftwareCategory } from "@/lib/software";
import { phase2Copy } from "@/lib/phase2-content";
import { useLanguage } from "@/providers/LanguageProvider";
import { addHeadingAnchors } from "@/lib/utils";
import { serviceContentSections } from "@/lib/service-template/content-sections";
import { isEnglishServicePublishable } from "@/lib/publication";
import type { Service, ServiceCategory } from "@prisma/client";
import styles from "@/components/services/ai-photobooth/ai-photobooth.module.css";
import extra from "@/components/services/template/service-detail.module.css";

interface ServiceDetailClientProps {
  service: Service;
  categoryData: ServiceCategory;
  relatedServices: Service[];
  gallery: { url: string; alt?: string }[];
  serviceSchema: Record<string, unknown>;
  category: string;
  variant?: "rental" | "sale";
  saleHref?: string;
  sale?: { product: SaleProduct; showcase: ShowcaseCard[] };
  references?: ServiceReference[];
}
function parseJsonList<T>(raw: string | null | undefined): T[] {
  try {
    const value: unknown = JSON.parse(raw || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

/** Data-driven counterpart of the curated AI Photo layout, shared by all four detail routes. */
export default function ServiceDetailClient({
  service,
  categoryData,
  relatedServices,
  gallery,
  serviceSchema,
  variant = "rental",
  saleHref,
  sale,
  references = [],
}: ServiceDetailClientProps) {
  const { language, setAlternateUrl } = useLanguage();
  const en = language === "en";
  const [expanded, setExpanded] = useState(false);
  const t = (tr: string, english: string) => (en ? english : tr);
  const dictionary = phase2Copy(language);
  const title = (en && service.title_en) || service.title;
  const categoryName = (en && categoryData.name_en) || categoryData.name;
  const description = (en && service.description_en) || service.description;
  const content = (en && service.content_en) || service.content;
  const eventRental =
    variant === "rental" && !isSoftwareCategory(categoryData.slug);
  const momento = variant === "rental" && isMomentoBallPage(categoryData.slug, service.slug);
  const showCapture = variant === "rental" && service.dataCapture;
  const output = toRentalOutput(service.outputType);
  const operations = rentalOpsCopy(language);
  const capture = dataCaptureCopy(language, output === "none");
  const product = rentalProductName(title, language);
  const quoteHref = `${dictionary.routes.contact}?urun=${encodeURIComponent(product)}`;
  const whatsapp = `https://wa.me/905342334051?text=${encodeURIComponent(t(`Merhaba, ${product} hakkında bilgi almak istiyorum.`, `Hello, I would like information about ${product}.`))}`;
  const specs = parseJsonList<{ label: string; value: string }>(
    (en && service.specs_en) || service.specs,
  ).filter(
    (s) => s && typeof s.label === "string" && typeof s.value === "string",
  );
  const ownFaqs = parseJsonList<{ q: string; a: string }>(
    en ? service.faq_en : service.faq,
  );
  const faqs = sale
    ? sale.product.faq.map((item) => ({ q: item.q[language], a: item.a[language] }))
    : [
    ...(eventRental && !momento
      ? mergeRentalFaq(ownFaqs, title, language, output)
      : ownFaqs),
    ...(showCapture ? capture.faq : []),
  ];
  const photos = [
    ...(service.image ? [{ url: service.image, alt: title }] : []),
    ...gallery.map((item) => ({ url: item.url, alt: item.alt || title })),
  ].filter(
    (item, i, all) => all.findIndex((other) => other.url === item.url) === i,
  );
  const hasMedia = photos.length > 0 || !!service.video;
  const categoryHref =
    en && categoryData.slug_en
      ? `/en/services/${categoryData.slug_en}`
      : `/hizmetler/${categoryData.slug}`;
  useEffect(() => {
    const tr =
      variant === "sale"
        ? `/urunler/${service.slug}`
        : `/hizmetler/${categoryData.slug}/${service.slug}`;
    const english = isEnglishServicePublishable(service, categoryData)
      ? variant === "sale"
        ? `/en/products/${service.slug_en}`
        : `/en/services/${categoryData.slug_en}/${service.slug_en}`
      : variant === "sale"
        ? "/en/products"
        : "/en/services";
    setAlternateUrl(tr, english);
  }, [variant, service, categoryData, setAlternateUrl]);
  const relatedHref = (item: Service) =>
    variant === "sale"
      ? en && item.slug_en
        ? `/en/products/${item.slug_en}`
        : `/urunler/${item.slug}`
      : en && categoryData.slug_en && item.slug_en
        ? `/en/services/${categoryData.slug_en}/${item.slug_en}`
        : `/hizmetler/${categoryData.slug}/${item.slug}`;

  return (
    <article className={`${styles.page} ${extra.detail}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className={styles.main}>
        <nav
          className={styles.breadcrumb}
          aria-label={t("Sayfa yolu", "Breadcrumb")}
        >
          <Link href={dictionary.routes.home}>{t("Ana sayfa", "Home")}</Link>
          <span>/</span>
          <Link
            href={
              variant === "sale"
                ? dictionary.routes.products
                : dictionary.routes.capabilities
            }
          >
            {variant === "sale"
              ? t("Sistemler", "Products")
              : t("Hizmetler", "Services")}
          </Link>
          <span>/</span>
          {variant === "rental" && (
            <>
              <Link href={categoryHref}>{categoryName}</Link>
              <span>/</span>
            </>
          )}
          <span>{product}</span>
        </nav>
        {sale ? (
          <ProductSale product={sale.product} title={title} locale={language} showcase={sale.showcase} />
        ) : (
        <section
          className={`${styles.product} ${!hasMedia ? extra.noMedia : ""}`}
          aria-labelledby="product-title"
        >
          <div className={styles.productCopy}>
            <span className={styles.eyebrow}>{momento ? t("Yılbaşı etkinlikleri · Fotoğraflı hatıralar", "Year-end events · Personal photo keepsakes") : categoryName}</span>
            <h1 id="product-title">{title}</h1>
            {description && (
              <p
                id="product-description"
                className={`${styles.intro} ${extra.description} ${expanded ? extra.expanded : ""}`}
              >
                {description}
              </p>
            )}
            {description && description.length > 180 && (
              <button
                type="button"
                className={extra.readMore}
                aria-expanded={expanded}
                aria-controls="product-description"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded
                  ? t("Daha az göster", "Show less")
                  : t("Devamını oku", "Read more")}
              </button>
            )}
            <div className={styles.heroActions}>
              <a href="#teklif" className={styles.primary}>
                {eventRental
                  ? t(momento ? "Yılbaşı etkinliğim için teklif al" : "Etkinliğim için teklif al", momento ? "Get a year-end event quote" : "Get a quote for my event")
                  : t(
                      "Projem için teklif al",
                      "Get a quote for my project",
                    )}{" "}
                ↗
              </a>
              <TrackedContactLink
                href={whatsapp}
                className={styles.roundLink}
                aria-label={t("WhatsApp üzerinden bilgi al", "Ask on WhatsApp")}
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗
              </TrackedContactLink>
            </div>
            {saleHref && (
              <Link href={saleHref} className={styles.textLink}>
                {t("Satın alma seçeneğini incele", "Explore purchase options")}{" "}
                ↗
              </Link>
            )}
            {specs.length > 0 && (
              <dl className={styles.quickSpecs}>
                {specs.slice(0, 3).map((s, i) => (
                  <div key={`${s.label}-${i}`}>
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className={styles.small}>
              {t("Son güncelleme", "Last updated")}:{" "}
              {service.updatedAt.toLocaleDateString(en ? "en-GB" : "tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          {hasMedia && (
            <div className={styles.productMedia}>
              <ServiceGallery
                images={photos}
                video={service.video}
                title={title}
                locale={language}
              />
              {momento && <p className={styles.small}>{t("Galeri fotoğrafları yapay zekâ ile hazırlanmış temsili uygulamalardır. Gerçek DeFacto projesini aşağıda inceleyebilirsiniz.", "Gallery photos are AI-generated illustrations of the experience. Explore the real DeFacto project below.")}</p>}
            </div>
          )}
          <aside
            id="teklif"
            className={styles.quoteCard}
            aria-labelledby="quote-title"
          >
            <span className={styles.eyebrow}>
              {t("Birlikte planlayalım", "Let’s plan together")}
            </span>
            <h2 id="quote-title">{t("Teklif alın", "Request a quote")}</h2>
            <p>
              {t(
                momento ? "Tarih, şehir ve istediğiniz küre adedini paylaşın; etkinliğinize özel planlayalım." : "İhtiyacınızı paylaşın, size özel çözümü birlikte belirleyelim.",
                momento ? "Share your date, city and required bauble quantity so we can plan your event." : "Tell us what you need so we can plan a solution for you.",
              )}
            </p>
            <ProductQuoteForm
              product={product}
              message={t(
                `${title} için teklif talebi.`,
                `Quote request for ${title}.`,
              )}
              locale={language}
              eventRental={eventRental}
            />
            <div className={styles.or}>
              <span>{t("veya", "or")}</span>
            </div>
            <TrackedContactLink
              href={whatsapp}
              className={styles.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("WhatsApp’tan bilgi alın", "Ask on WhatsApp")} ↗
            </TrackedContactLink>
            <TrackedContactLink href="tel:+905342334051" className={styles.phone}>
              +90 534 233 40 51
            </TrackedContactLink>
          </aside>
        </section>
        )}
        {!sale && content &&
          serviceContentSections(
            addHeadingAnchors(
              content
                .replace(/&nbsp;/g, " ")
                .replace(/<(\/?)(h1)(?=[\s>])/gi, "<$1h2"),
            ),
          ).map((block, index) => (
            <section
              key={index}
              className={`${styles.section} ${styles.contentSection} ${extra.editorSection}`}
              aria-label={
                block.heading
                  ? undefined
                  : t("Hizmet hakkında", "About this service")
              }
            >
              <div className={`${styles.contentHeading} ${extra.sectionTitle}`}>
                <span className={styles.eyebrow}>{categoryName}</span>
                {block.heading ? (
                  <MsProse html={block.heading} />
                ) : (
                  <h2>{t("Hizmet hakkında", "About this service")}</h2>
                )}
              </div>
              <div className={extra.prose}>
                <MsProse html={block.html} />
              </div>
            </section>
          ))}
        {!sale && specs.length > 0 && (
          <section
            className={`${styles.section} ${styles.contentSection}`}
            aria-labelledby="specs-title"
          >
            <div className={styles.contentHeading}>
              <span className={styles.eyebrow}>
                {t("Teknik bilgiler", "Technical details")}
              </span>
              <h2 id="specs-title">
                {t("Teknik özellikler", "Specifications")}
              </h2>
            </div>
            <dl className={styles.operationFacts}>
              {specs.map((s, i) => (
                <div key={`${s.label}-${i}`}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {eventRental && !momento && (
          <section
            id="kiralama"
            className={`${styles.section} ${styles.contentSection}`}
            aria-labelledby="operations-title"
          >
            <div className={styles.contentHeading}>
              <span className={styles.eyebrow}>{operations.eyebrow}</span>
              <h2 id="operations-title">{operations.title}</h2>
            </div>
            <div className={styles.contentBody}>
              <dl className={styles.operationFacts}>
                {operations.logistics(output).map((item) => (
                  <div key={item.term}>
                    <dt>{item.term}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <h3>{operations.scopeTitle}</h3>
              <ul>
                {operations
                  .scope(output)
                  .filter((item) => !item.includes("750"))
                  .map((item) => (
                    <li key={item}>{item}</li>
                  ))}
              </ul>
              <p>{operations.serviceArea}</p>
            </div>
          </section>
        )}
        {!sale && references.length > 0 && (
          <section
            id="projeler"
            className={`${styles.section} ${styles.projectsSection}`}
            aria-labelledby="projects-title"
          >
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>
                {t("Gerçek uygulamalar", "In practice")}
              </span>
              <h2 id="projects-title" className={styles.projectHeading}>
                {t("Seçili projeler", "Selected projects")}
              </h2>
            </div>
            <div className={styles.projects}>
              {references.map((project) => (
                <article key={project.href}>
                  <Link href={project.href} className={styles.projectImage}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width:700px) 90vw, 340px"
                    />
                  </Link>
                  <div className={styles.projectBody}>
                    <h3>{project.title}</h3>
                    {project.description && <p>{project.description}</p>}
                    <Link href={project.href} className={styles.textLink}>
                      {t("Projeyi incele", "Explore the project")} ↗
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        {showCapture && (
          <section
            id="data-capture"
            className={`${styles.section} ${styles.contentSection}`}
            aria-labelledby="capture-title"
          >
            <div className={styles.contentHeading}>
              <span className={styles.eyebrow}>{capture.eyebrow}</span>
              <h2 id="capture-title">{capture.title}</h2>
            </div>
            <div className={styles.contentBody}>
              <p>{capture.summary || capture.intro}</p>
              {!capture.summary && (
                <>
                  {capture.items.map((item) => (
                    <div key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                  <p>{capture.legal}</p>
                </>
              )}
              <Link href={DATA_CAPTURE_HUB_PATH} className={styles.textLink}>
                {t("Modülü incele", "Explore the module")} ↗
              </Link>
            </div>
          </section>
        )}
        {faqs.length > 0 && (
          <section
            className={`${styles.section} ${styles.faqLayout}`}
            aria-labelledby="faq-title"
          >
            <div>
              <span className={styles.eyebrow}>FAQ</span>
              <h2 id="faq-title">
                {t("Sıkça sorulan sorular", "Frequently asked questions")}
              </h2>
              <TrackedContactLink
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.textLink}
              >
                {t(
                  "Sorunuzu WhatsApp’tan iletin",
                  "Ask your question on WhatsApp",
                )}{" "}
                ↗
              </TrackedContactLink>
            </div>
            <div className={`${styles.faq} ${extra.faq}`}>
              <MsFaq items={faqs} />
            </div>
          </section>
        )}
        <section className={`${styles.section} ${styles.closing}`}>
          <div>
            <h2>
              {t("Birlikte hayata geçirelim.", "Let’s bring it to life.")}
            </h2>
            <p>{product}</p>
          </div>
          <div className={styles.closingActions}>
            <a href="#teklif" className={styles.primary}>
              {t("Teklif alın", "Request a quote")} ↗
            </a>
            <Link href={quoteHref} className={styles.textLink}>
              {t("Detaylı talep formu", "Detailed enquiry form")} ↗
            </Link>
          </div>
        </section>
        {relatedServices.length > 0 && (
          <section
            className={`${styles.section} ${styles.related}`}
            aria-labelledby="related-title"
          >
            <h2 id="related-title">
              {t("Bunlar da ilginizi çekebilir", "You may also like")}
            </h2>
            <div>
              {relatedServices.slice(0, 4).map((item) => (
                <Link href={relatedHref(item)} key={item.id}>
                  {(en && item.title_en) || item.title} ↗
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
