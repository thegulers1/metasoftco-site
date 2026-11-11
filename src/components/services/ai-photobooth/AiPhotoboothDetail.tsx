import TrackedContactLink from "../template/TrackedContactLink";
import Image from "next/image";
import Link from "next/link";
import type { Service, ServiceCategory } from "@prisma/client";
import ProductGallery from "./ProductGallery";
import QuoteForm from "./QuoteForm";
import AlternateUrls from "./AlternateUrls";
import {
  AI_PHOTOBOOTH_CASES,
  parseAiPhotoboothSpecs,
  type AiPhotoboothCaseProject,
} from "@/lib/ai-photobooth";
import { faqPlainText } from "@/lib/faq-text";
import { dataCaptureCopy } from "@/lib/data-capture";
import { DATA_CAPTURE_HUB_PATH } from "@/lib/data-capture-hub";
import { isEnglishServicePublishable } from "@/lib/publication";
import {
  rentalOpsCopy,
  rentalProductName,
  toRentalOutput,
} from "@/lib/rental-ops";
import styles from "./ai-photobooth.module.css";

interface Props {
  service: Service;
  categoryData: ServiceCategory;
  relatedServices: Service[];
  gallery: { url: string; alt: string }[];
  projects: AiPhotoboothCaseProject[];
  faqs: { q: string; a: string }[];
  serviceSchema: Record<string, unknown>;
  saleHref?: string;
}

/** Target TR rental presentation; the existing route owns SEO and publication. */
export default function AiPhotoboothDetail({
  service,
  categoryData,
  relatedServices,
  gallery,
  projects,
  faqs,
  serviceSchema,
  saleHref,
}: Props) {
  const trUrl = `/hizmetler/${categoryData.slug}/${service.slug}`;
  const enUrl = isEnglishServicePublishable(service, categoryData)
    ? `/en/services/${categoryData.slug_en}/${service.slug_en}`
    : "/en/services";
  const quoteHref = `/iletisim?urun=${encodeURIComponent(rentalProductName(service.title, "tr"))}`;
  const capture = dataCaptureCopy(
    "tr",
    toRentalOutput(service.outputType) === "none",
  );
  const output = toRentalOutput(service.outputType);
  const digital = output === "digital" || output === "print";
  const operations = rentalOpsCopy("tr");
  const specs = parseAiPhotoboothSpecs(service.specs);
  const photos = [
    ...(service.image
      ? [
          {
            url: service.image,
            alt: "Etkinlikte AI Photobooth ve fotoğraf çıktısını gösteren katılımcı",
          },
        ]
      : []),
    ...gallery,
  ].filter((photo, i, all) => all.findIndex((p) => p.url === photo.url) === i);
  const caseStudies = AI_PHOTOBOOTH_CASES.flatMap((item) => {
    const project = projects.find((p) => p.slug === item.slug);
    return project?.image ? [{ ...project, summary: item.summary }] : [];
  });
  const whatsapp =
    "https://wa.me/905342334051?text=Merhaba%2C%20AI%20Photobooth%20kiralama%20hakk%C4%B1nda%20teklif%20almak%20istiyorum.";
  return (
    <article className={styles.page} id="ai-photo-top">
      <AlternateUrls tr={trUrl} en={enUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      <a href="#product" className={styles.skip}>
        İçeriğe geç
      </a>
      <div className={styles.main}>
        <div className={styles.breadcrumb}>
          <Link href="/">Ana sayfa</Link>
          <span>/</span>
          <Link href="/hizmetler">Hizmetler</Link>
          <span>/</span>
          <span>AI Photobooth</span>
        </div>
        <section
          className={styles.product}
          id="product"
          aria-labelledby="product-title"
        >
          <div className={styles.productCopy}>
            <span className={styles.eyebrow}>Yapay zekâ fotoğraf deneyimi</span>
            <h1 id="product-title">
              AI Photobooth
              <br />
              Kiralama
            </h1>
            <p className={styles.intro}>
              Etkinliğinizde çekilen fotoğrafları, markanıza özel karakterlere
              ve görsel dünyalara dönüştürün.
            </p>
            <p className={styles.description}>
              Kurumsal etkinlik, lansman ve fuarlar için yapay zekâ destekli
              fotoğraf deneyimi. Konsept tasarımı, kiosk, kurulum ve saha
              desteğini birlikte planlıyoruz.
            </p>
            <div className={styles.heroActions}>
              <a href="#teklif" className={styles.primary}>
                Etkinliğim için teklif al ↗
              </a>
              <TrackedContactLink
                href={whatsapp}
                className={styles.roundLink}
                aria-label="WhatsApp üzerinden bilgi al"
                target="_blank"
                rel="noopener noreferrer"
              >
                ↗
              </TrackedContactLink>
            </div>
            <div className={styles.badges}>
              <span>Markaya özel konsept</span>
              <span>
                {digital ? "QR ile dijital teslim" : "Etkinliğe özel teslim"}
              </span>
              <span>Türkiye geneli kurulum</span>
            </div>
            <dl className={styles.quickSpecs}>
              <div>
                <dt>Kapasite</dt>
                <dd>Ortalama 40–60 kişi / saat*</dd>
              </div>
              <div>
                <dt>Operasyon</dt>
                <dd>Kurulum ve saha ekibi</dd>
              </div>
              <div>
                <dt>Fotoğraf baskısı</dt>
                <dd>Talebe göre planlanır</dd>
              </div>
            </dl>
            <p className={styles.small}>
              *İstasyon başına; görsel kurgu, işlem süresi ve katılımcı akışına
              göre değişir.
            </p>
          </div>
          <div className={styles.productMedia}>
            <ProductGallery images={photos} video={service.video} />
          </div>
          <aside
            id="teklif"
            className={styles.quoteCard}
            aria-labelledby="quote-title"
          >
            <span className={styles.eyebrow}>Etkinliğinize özel</span>
            <h2 id="quote-title">Hızlı teklif alın</h2>
            <p>
              Tarih, şehir ve katılımcı sayısına göre ihtiyacınıza uygun bir
              teklif hazırlayalım.
            </p>
            <QuoteForm />
            <div className={styles.or}>
              <span>veya</span>
            </div>
            <TrackedContactLink
              className={styles.whatsapp}
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp’tan bilgi alın ↗
            </TrackedContactLink>
            <TrackedContactLink href="tel:+905342334051" className={styles.phone}>
              +90 534 233 40 51
            </TrackedContactLink>
          </aside>
        </section>

        <section
          id="nasil-calisir"
          className={styles.section}
          aria-labelledby="steps-title"
        >
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>Katılımcı deneyimi</span>
            <h2 id="steps-title">AI Photobooth nasıl çalışır?</h2>
            <p>
              Fotoğraf çekiminden kişiselleştirilmiş hatıraya, kolay bir
              deneyim.
            </p>
          </div>
          <ol className={styles.steps}>
            {[
              [
                "Fotoğraf çekilir",
                "Katılımcının fotoğrafı kiosk üzerinden çekilir.",
              ],
              [
                "AI konsepti uygulanır",
                "Fotoğraf, markanız için önceden hazırlanan görsel senaryoya göre işlenir.",
              ],
              [
                "Fotoğraf teslim edilir",
                digital
                  ? "Sonuç QR kod ile paylaşılır. İstenirse baskı da teklif kapsamında planlanır."
                  : "Fotoğrafın teslim biçimi ve baskı seçenekleri etkinlik kurgusuna göre planlanır.",
              ],
            ].map(([title, body], i) => (
              <li key={title}>
                <span>{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="ai-photo-teknolojisi"
          className={`${styles.section} ${styles.contentSection}`}
          aria-labelledby="technology-title"
        >
          <div className={styles.contentHeading}>
            <span className={styles.eyebrow}>Teknoloji ve deneyim</span>
            <h2 id="technology-title">AI Photo Teknolojisi</h2>
            <p>Katılımcının portresinden markanızın görsel dünyasına.</p>
          </div>
          <div className={styles.contentBody}>
            <div>
              <h3>Üretken yapay zekâ ile fotoğraf dönüşümü</h3>
              <p>
                AI Photobooth, etkinlik sırasında çekilen fotoğrafı önceden
                hazırlanan bir görsel senaryoya göre yeniden yorumlar. Üretken
                yapay zekâ (Generative AI), katılımcının portresini farklı bir
                karakter, dönem veya sahneyle buluşturabilir. Böylece fotoğraf,
                etkinliğinizin temasını taşıyan kişiselleştirilmiş bir hatıraya
                dönüşür.
              </p>
            </div>
            <div>
              <h3>Face Swap ve yüz özelliklerinin korunması</h3>
              <p>
                Yapay zekâ ile yüz değiştirme (AI Face Swap) kurgularında yüz
                eşleştirme ve fotoğraf dönüştürme süreçleri kullanılır.
                Katılımcının yüz özellikleri mümkün olduğunca korunurken markaya
                özel karakterler ve sahneler oluşturulur. Sonuç; kaynak
                fotoğrafa, seçilen stile ve görsel kurguya göre değişebilir.
              </p>
              <Link
                href="/blog/yapay-zeka-yuz-degistirme-face-swap-nasil-calisir"
                className={styles.textLink}
              >
                Face Swap nasıl çalışır? ↗
              </Link>
            </div>
            <div>
              <h3>Dijital teslim ve fotoğraf baskısı</h3>
              <p>
                {digital
                  ? "Oluşturulan fotoğrafa QR kod üzerinden ulaşılır ve fotoğraf katılımcının telefonuna indirilebilir."
                  : "Fotoğrafın teslim biçimi, etkinliğinizin kurgusuna göre önceden belirlenir."}{" "}
                Fiziksel hatıra isteyen organizasyonlarda fotoğraf baskısı
                ayrıca planlanabilir. Baskı adedi, çıktı tasarımı ve markalı
                çerçeve seçenekleri teklif kapsamında netleştirilir.
              </p>
            </div>
          </div>
        </section>

        <section
          id="markaya-ozel-konsept"
          className={`${styles.section} ${styles.contentSection}`}
          aria-labelledby="concept-title"
        >
          <div className={styles.contentHeading}>
            <span className={styles.eyebrow}>Yaratıcı hazırlık</span>
            <h2 id="concept-title">Markaya Özel Konsept</h2>
            <p>Tema, arayüz ve çıktılar aynı hikâyenin parçaları.</p>
          </div>
          <div className={styles.contentBody}>
            <div>
              <h3>Etkinlik temasına özel prompt ve görsel tasarım</h3>
              <p>
                Yapay zekâya yön veren komutları (prompt), arka planları ve
                görsel stilleri etkinliğinizin iletişim hedefiyle birlikte
                hazırlıyoruz. Cyberpunk, 1920’ler veya uzay teması gibi
                dünyalar; ürün lansmanınıza ya da kurum içi etkinliğinize
                uyarlanabilir. Konsept ve örnek görseller etkinlik öncesinde
                birlikte değerlendirilir.
              </p>
            </div>
            <div>
              <h3>Ekrandan fiziksel kioska marka uyarlaması</h3>
              <p>
                Ekran arayüzü ve fotoğraf çıktı tasarımı markanızın renkleri,
                logosu ve kampanya diliyle hazırlanır. İhtiyaca göre kiosk dış
                giydirmesi ve baskı çerçevesi de bu tasarıma eklenebilir.
                Özelleştirmenin kapsamı, teslim seçenekleriyle birlikte teklif
                aşamasında belirlenir.
              </p>
            </div>
          </div>
        </section>

        <section
          id="kapsam"
          className={`${styles.section} ${styles.scopeLayout}`}
          aria-labelledby="scope-title"
        >
          <div>
            <span className={styles.eyebrow}>Kiralama ve hazırlık</span>
            <h2 id="scope-title">Etkinliğe hazır bir çözüm.</h2>
            <p>
              Konseptten kuruluma, kapsamı etkinliğinizin ihtiyaçlarına göre
              belirliyoruz.
            </p>
            <a href="#teklif" className={styles.primary}>
              Etkinliğinizi planlayalım ↗
            </a>
          </div>
          <div className={styles.scopePanels}>
            <div>
              <h3>Birlikte planlanan hizmetler</h3>
              <ul>
                <li>Kiosk ve yapay zekâ fotoğraf yazılımı</li>
                <li>Markaya özel tema ve ekran arayüzü</li>
                <li>Nakliye, kurulum ve söküm</li>
                <li>Etkinlik boyunca teknik saha desteği</li>
                {digital && <li>QR kod ile dijital fotoğraf paylaşımı</li>}
              </ul>
            </div>
            <div>
              <h3>İhtiyaca göre eklenen seçenekler</h3>
              <ul>
                <li>Fotoğraf baskısı ve markalı çerçeve</li>
                <li>Ek kiosk ve istasyon planlaması</li>
                <li>Özel kiosk dış giydirmesi</li>
                {service.dataCapture && (
                  <li>İsteğe bağlı Data-Capture & CRM modülü</li>
                )}
              </ul>
              <p className={styles.small}>
                Baskı adedi ve özelleştirme kapsamı teklifte netleştirilir.
              </p>
            </div>
          </div>
        </section>

        <section
          id="kurulum-operasyon"
          className={`${styles.section} ${styles.contentSection}`}
          aria-labelledby="operations-title"
        >
          <div className={styles.contentHeading}>
            <span className={styles.eyebrow}>Etkinlik öncesi ve sahada</span>
            <h2 id="operations-title">Kurulum ve Operasyon</h2>
            <p>Donanım, hazırlık ve teknik ekip birlikte planlanır.</p>
          </div>
          <div className={styles.contentBody}>
            <div>
              <h3>Alan ve donanım hazırlığı</h3>
              <p>
                Dokunmatik kiosk, kamera, profesyonel aydınlatma ve yapay zekâ
                fotoğraf yazılımı etkinlik alanında birlikte çalışır. Yaklaşık 2
                × 2 metrelik bir alan başlangıç planlaması için kullanılabilir;
                cihaz, baskı ünitesi ve katılımcı kuyruğu için gereken nihai
                yerleşim mekâna göre netleştirilir.
              </p>
            </div>
            <dl className={styles.operationFacts}>
              {operations.logistics(output).map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h3>Kapasite ve katılımcı akışı</h3>
              <p>
                Tek bir istasyon saatte ortalama 40–60 katılımcıya hizmet
                verebilir. Bu aralık; seçilen görsel senaryoya, yapay zekâ işlem
                süresine ve katılımcı akışına bağlıdır. Fuar, festival veya
                yoğun lansmanlarda aktivasyon süresi ve beklenen katılımcı
                sayısına göre ek istasyon planlanabilir.
              </p>
            </div>
            <p>{operations.serviceArea}</p>
          </div>
        </section>

        <section
          id="projeler"
          className={`${styles.section} ${styles.projectsSection}`}
          aria-labelledby="projects-title"
        >
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>Markalara özel çözümler</span>
            <h2 id="projects-title" className={styles.projectHeading}>
              Seçili projeler
            </h2>
          </div>
          <div className={styles.projects}>
            {caseStudies.flatMap((project) =>
              project
                ? [
                    <article key={project.slug}>
                      {project.image && (
                        <Link
                          href={`/projeler/${project.slug}`}
                          className={styles.projectImage}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 640px) 90vw, 340px"
                          />
                        </Link>
                      )}
                      <div className={styles.projectBody}>
                        <span className={styles.eyebrow}>
                          {project.slug === "tavuk-dunyasi-x-ai-photo"
                            ? "Etkinlik aktivasyonu"
                            : "Özel üretim ve sistem satışı"}
                        </span>
                        <h3>
                          {project.slug === "tavuk-dunyasi-x-ai-photo"
                            ? "Tavuk Dünyası AI Photo"
                            : "Castrol EDGE AI Photo Kiosk"}
                        </h3>
                        <p>{project.summary}</p>
                        <Link
                          href={`/projeler/${project.slug}`}
                          className={styles.textLink}
                        >
                          Projeyi incele ↗
                        </Link>
                      </div>
                    </article>,
                  ]
                : [],
            )}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.dataSection}`}
          aria-labelledby="data-title"
        >
          <div>
            <span className={styles.eyebrow}>Veri yönetimi</span>
            <h2 id="data-title">Fotoğraflar Nasıl Saklanır?</h2>
            <p>
              Etkinlik fotoğrafları, müşteri marka tarafından etkinlik öncesinde
              talep edilmezse etkinlik sonrasında otomatik silinir. Önceden
              talep edilirse en fazla 90 gün saklanır ve belirlenen süreç
              kapsamında paylaşılır.
            </p>
          </div>
          {service.dataCapture && (
            <div id="data-capture">
              <h3>İsteğe bağlı Data-Capture & CRM</h3>
              <p>{capture.summary || capture.intro}</p>
              <Link href={DATA_CAPTURE_HUB_PATH} className={styles.textLink}>
                Modülü incele ↗
              </Link>
            </div>
          )}
        </section>
        <section
          className={`${styles.section} ${styles.faqLayout}`}
          aria-labelledby="faq-title"
        >
          <div>
            <span className={styles.eyebrow}>Merak edilenler</span>
            <h2 id="faq-title">Sıkça sorulan sorular</h2>
            <p>Kurulum, kapasite ve teslim seçenekleri hakkında.</p>
            <TrackedContactLink
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
            >
              Sorunuzu WhatsApp’tan iletin ↗
            </TrackedContactLink>
          </div>
          <div className={styles.faq}>
            {faqs.map((item, i) => (
              <details key={i} open={i === 0}>
                <summary>
                  {item.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faqPlainText(item.a)}</p>
              </details>
            ))}
          </div>
        </section>
        {specs.length > 0 && (
          <section className={styles.section} aria-labelledby="specs-title">
            <h2 id="specs-title">Teknik özellikler</h2>
            <dl className={styles.quickSpecs}>
              {specs.map((item, i) => (
                <div key={i}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <section className={styles.closing}>
          <div>
            <h2>AI Photobooth’u etkinliğinize taşıyalım.</h2>
            <p>
              Tarih, lokasyon ve katılımcı sayısını paylaşın; uygun kurguyu
              birlikte hazırlayalım.
            </p>
          </div>
          <div className={styles.closingActions}>
            <a href="#teklif" className={styles.primary}>
              Teklif alın ↗
            </a>
            <Link href={quoteHref} className={styles.textLink}>
              Detaylı teklif formu ↗
            </Link>
            {saleHref && (
              <Link href={saleHref} className={styles.textLink}>
                Kalıcı sistem satın alma ↗
              </Link>
            )}
          </div>
        </section>
        {relatedServices.length > 0 && (
          <section
            className={`${styles.section} ${styles.related}`}
            aria-labelledby="related-title"
          >
            <h2 id="related-title">İlgili hizmetler</h2>
            <div>
              {relatedServices.map((item) => (
                <Link
                  key={item.id}
                  href={`/hizmetler/${categoryData.slug}/${item.slug}`}
                >
                  {item.title} ↗
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
