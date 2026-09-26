/* eslint-disable @next/next/no-img-element -- plain <img> keeps slides identical in the page and in the headless-Chrome PDF */
import { siteConfig } from "@/lib/site";
import type { Deck, DeckCategory, DeckService } from "@/lib/presentation-deck";
import "./presentation.css";

/**
 * The 16:9 pages of the MetasoftCo presentation. Every size is in container
 * query units (cqw), so a page scales like a PDF page: the /sunum listing shows
 * it at any width and the PDF route prints it at 1600×900 with the same layout.
 * No hooks: the same components render in the client listing and the server
 * print page.
 */

const CITIES = ["İstanbul", "Ankara", "İzmir", "Antalya", "Bodrum", "Adana", "Diyarbakır", "Kocaeli", "Sapanca"];
const SITE_HOST = siteConfig.url.replace(/^https?:\/\/(www\.)?/, "");

export type SlidePage = {
    key: string;
    kind: "cover" | "about" | "refs" | "index" | "chapter" | "service" | "contact";
    label: string;
    categoryId?: string;
    serviceId?: string;
    node: React.ReactNode;
};

function Foot({ deck, pageNo }: { deck: Deck; pageNo: number }) {
    return (
        <div className="pz-foot">
            <img className="pz-foot__logo" src="/sunum/logo-light.png" alt="MetasoftCo" />
            <span>Sunum 2026 · Sürüm {deck.version}</span>
            <span>
                {SITE_HOST} · {String(pageNo).padStart(2, "0")}
            </span>
        </div>
    );
}

function Slide({ className, children }: { className: string; children: React.ReactNode }) {
    return (
        <div className={`pz-slide ${className}`} lang="tr">
            {children}
        </div>
    );
}

function CoverSlide({ deck, full, pageNo }: { deck: Deck; full: Deck; pageNo: number }) {
    return (
        <Slide className="pz-cover">
            <img className="pz-cover__logo" src="/sunum/logo-light.png" alt="MetasoftCo" />
            <div className="pz-cover__ver">
                Sürüm {deck.version}
                <br />
                <b>
                    {full.categories.length} kategori · {full.serviceCount} aktivite
                </b>
            </div>
            <div className="pz-cover__copy">
                <div className="pz-eyebrow">İnteraktif deneyimler · Yapay zekâ · Yazılım</div>
                <div className="pz-cover__year pz-gtext">2026</div>
                <h2>
                    Hizmet
                    <br />
                    Sunumu
                </h2>
                <p>Markalar ve ajanslar için yapay zekâ, fotoğraf, oyun ve interaktif deneyimler.</p>
            </div>
            {deck.coverImage && (
                <>
                    <div className="pz-cover__hex">
                        <img src={deck.coverImage} alt="" />
                    </div>
                    <div className="pz-cover__tag">Canlı katılım · AI Photobooth</div>
                </>
            )}
            <Foot deck={deck} pageNo={pageNo} />
        </Slide>
    );
}

function AboutSlide({ deck, pageNo }: { deck: Deck; pageNo: number }) {
    return (
        <Slide className="pz-about">
            <div className="pz-topmeta">
                <span>Hakkımızda</span>
                <span>{SITE_HOST}</span>
            </div>
            <h2>
                Merhaba<span className="pz-gtext">,</span>
            </h2>
            <div className="pz-about__txt">
                <p>Biz, yenilikçi ve etkileşimli deneyimler yaratma tutkusuyla hareket eden bir interaktif deneyim ajansıyız.</p>
                <p>Teknolojinin sınırlarını zorlayarak size unutulmaz anlar yaşatmayı amaçlıyoruz.</p>
                <p>
                    Etkinliklerinizde yapay zekâ projeleri, fotoğraf aktiviteleri ve interaktif makinelerle deneyim alanları
                    kuruyoruz. Ziyaretçilere eşsiz bir deneyim sunarken markaların hedef kitleleriyle etkileşimini
                    güçlendiriyoruz.
                </p>
            </div>
            <div className="pz-about__pics">
                <figure>
                    <img src="/sunum/hakkimizda-1.jpg" alt="Recycle & Win geri dönüşüm oyunu" />
                    <figcaption>Recycle &amp; Win</figcaption>
                </figure>
                <figure>
                    <img src="/sunum/hakkimizda-2.jpg" alt="Ray-Ban etkinliğinde Strip Photo" />
                    <figcaption>Ray-Ban · Strip Photo</figcaption>
                </figure>
            </div>
            <div className="pz-stats pz-about__stats">
                <div>
                    <b className="pz-gtext">2020</b>
                    <span>&apos;den beri sahada</span>
                </div>
                <div>
                    <b className="pz-gtext">100+</b>
                    <span>Kurumsal proje</span>
                </div>
                <div>
                    <b className="pz-gtext">{CITIES.length}</b>
                    <span>Şehirde kurulum</span>
                </div>
            </div>
            <Foot deck={deck} pageNo={pageNo} />
        </Slide>
    );
}

function ReferencesSlide({ deck, pageNo }: { deck: Deck; pageNo: number }) {
    return (
        <Slide className="pz-refs">
            <div className="pz-refs__head">
                <div className="pz-eyebrow">Birlikte çalıştığımız markalar</div>
                <h2>Referans&shy;larımız</h2>
                <p>
                    Lansmanlardan fuarlara, kurum içi etkinliklerden mağaza aktivasyonlarına kadar sahada birlikte olduğumuz
                    markalar.
                </p>
            </div>
            <div className="pz-refs__wall">
                <img src="/sunum/referanslar.png" alt="Referans marka logoları" />
            </div>
            <Foot deck={deck} pageNo={pageNo} />
        </Slide>
    );
}

function IndexSlide({ deck, full, pageNo }: { deck: Deck; full: Deck; pageNo: number }) {
    const count = full.categories.length;
    const cols = count <= 3 ? count : count === 4 ? 2 : count <= 6 ? 3 : 4;
    return (
        <Slide className="pz-index">
            <div className="pz-index__head">
                <div>
                    <div className="pz-eyebrow">Hizmetlerimiz</div>
                    <h2>
                        Neler <span className="pz-gtext">yapıyoruz?</span>
                    </h2>
                </div>
                <p>Her kategori, sunumun ilerleyen sayfalarında kendi ayracı ve hizmet sayfalarıyla yer alıyor.</p>
            </div>
            <div className="pz-index__grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {full.categories.map((category) => (
                    <div key={category.id} className={`pz-index__tile${category.cover ? "" : " is-text"}`}>
                        {category.cover ? (
                            <img src={category.cover} alt="" />
                        ) : (
                            <span className="pz-index__code" aria-hidden="true">
                                {"<App>\n  mobil · web\n  panel · AI\n</App>"}
                            </span>
                        )}
                        <div className="pz-index__label">
                            <b>{category.name}</b>
                            <small>{category.services.length} hizmet</small>
                        </div>
                    </div>
                ))}
            </div>
            <Foot deck={deck} pageNo={pageNo} />
        </Slide>
    );
}

function ChapterSlide({
    deck,
    category,
    fullCategory,
    pageNo,
}: {
    deck: Deck;
    category: DeckCategory;
    fullCategory: DeckCategory;
    pageNo: number;
}) {
    // A partial PDF still lists the whole category, with the chosen services
    // highlighted, so the client sees what else is on offer.
    const partial = category.services.length < fullCategory.services.length;
    const chosen = new Set(category.services.map((service) => service.id));
    return (
        <Slide className="pz-chapter">
            <div className="pz-chapter__no" aria-hidden="true">
                {category.no}
            </div>
            <div className="pz-chapter__copy">
                <div className="pz-eyebrow">
                    Bölüm {category.no} · {fullCategory.services.length} aktivite
                    {partial ? ` · ${category.services.length} seçildi` : ""}
                </div>
                <h2>{category.name}</h2>
                {category.lead && <p>{category.lead}</p>}
            </div>
            <ul className="pz-chapter__list">
                {fullCategory.services.map((service) => (
                    <li key={service.id} className={partial && chosen.has(service.id) ? "is-chosen" : undefined}>
                        {service.title}
                    </li>
                ))}
            </ul>
            <Foot deck={deck} pageNo={pageNo} />
        </Slide>
    );
}

function ServiceSlide({
    deck,
    category,
    service,
    pageNo,
    lazy,
}: {
    deck: Deck;
    category: DeckCategory;
    service: DeckService;
    pageNo: number;
    lazy: boolean;
}) {
    const loading = lazy ? "lazy" : undefined;
    return (
        <Slide className="pz-service">
            {service.image ? (
                <div className={`pz-service__media${service.thumbs.length ? "" : " is-single"}`}>
                    <div className="pz-service__main">
                        <img src={service.image} alt={service.title} loading={loading} />
                    </div>
                    {service.thumbs.length > 0 && (
                        <div className="pz-service__thumbs" style={{ gridTemplateColumns: `repeat(${service.thumbs.length}, 1fr)` }}>
                            {service.thumbs.map((url) => (
                                <img key={url} src={url} alt="" loading={loading} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="pz-service__media is-text">
                    <div className="pz-service__panel">
                        <small>{category.name}</small>
                        <div className="pz-service__panel-title">{service.title}</div>
                        <div className="pz-service__panel-specs">
                            {service.specs.map((spec) => (
                                <span key={spec.label}>
                                    <b>{spec.label}</b> · {spec.value}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="pz-service__copy">
                <div className="pz-service__row">
                    <span className="pz-eyebrow">
                        {category.name}
                        {service.isRental ? " · Kiralama" : ""}
                    </span>
                    {service.newSince && <span className="pz-new">Yeni · {service.newSince}</span>}
                </div>
                <h2>{service.title}</h2>
                {service.lead && <p className="pz-service__lead">{service.lead}</p>}
                {service.points.length > 0 && (
                    <ul className="pz-service__points">
                        {service.points.map((point) => (
                            <li key={point}>{point}</li>
                        ))}
                    </ul>
                )}
                <div className="pz-service__specs" style={{ gridTemplateColumns: `repeat(${service.specs.length}, 1fr)` }}>
                    {service.specs.map((spec) => (
                        <div key={spec.label}>
                            <small>{spec.label}</small>
                            <b>{spec.value}</b>
                        </div>
                    ))}
                </div>
                <a className="pz-service__link" href={`${siteConfig.url}${service.href}`}>
                    {SITE_HOST}
                    {service.href} →
                </a>
            </div>
            <Foot deck={deck} pageNo={pageNo} />
        </Slide>
    );
}

function ContactSlide({ deck, pageNo }: { deck: Deck; pageNo: number }) {
    return (
        <Slide className="pz-contact">
            <div className="pz-contact__copy">
                <div className="pz-eyebrow">Bir sonraki etkinliğiniz</div>
                <h2>
                    Birlikte <span className="pz-gtext">çalışalım</span>
                </h2>
                <a className="pz-contact__cta" href={`mailto:${siteConfig.contact.email}`}>
                    Teklif için: {siteConfig.contact.email} →
                </a>
            </div>
            <dl className="pz-contact__list">
                <div>
                    <dt>Telefon</dt>
                    <dd>{siteConfig.contact.phone}</dd>
                </div>
                <div>
                    <dt>Adres</dt>
                    <dd>Üniversite Mah. Sarıgül Sk. İstanbul Teknokent No: 37/1, Avcılar / İstanbul</dd>
                </div>
                <div>
                    <dt>Şehirler</dt>
                    <dd>{CITIES.join(" · ")}</dd>
                </div>
            </dl>
            <div className="pz-stats pz-contact__stats">
                <div>
                    <b className="pz-gtext">220V</b>
                    <span>Mekândan tek isteğimiz</span>
                </div>
                <div>
                    <b className="pz-gtext">5G</b>
                    <span>İnternet bizden</span>
                </div>
                <div>
                    <b className="pz-gtext">2</b>
                    <span>Sahada teknik personel</span>
                </div>
            </div>
            <Foot deck={deck} pageNo={pageNo} />
        </Slide>
    );
}

/**
 * Lays the deck out as ordered pages. `deck` is what gets printed (all or the
 * visitor's selection); `full` is the whole catalogue, used for the cover
 * totals and the category overview so a partial PDF still shows the range.
 * `lazy` defers service images in the scrolling page; print must load them all.
 */
export function buildSlidePages(deck: Deck, full: Deck, { lazy = false } = {}): SlidePage[] {
    type PendingPage = Omit<SlidePage, "node"> & { render: (pageNo: number) => React.ReactNode };
    const pages: PendingPage[] = [];
    const push = (page: Omit<SlidePage, "node">, render: PendingPage["render"]) => pages.push({ ...page, render });

    push({ key: "cover", kind: "cover", label: "Kapak" }, (n) => <CoverSlide deck={deck} full={full} pageNo={n} />);
    push({ key: "about", kind: "about", label: "Merhaba · Hakkımızda" }, (n) => <AboutSlide deck={deck} pageNo={n} />);
    push({ key: "refs", kind: "refs", label: "Referanslarımız" }, (n) => <ReferencesSlide deck={deck} pageNo={n} />);
    push({ key: "index", kind: "index", label: "Neler yapıyoruz" }, (n) => <IndexSlide deck={deck} full={full} pageNo={n} />);
    for (const category of deck.categories) {
        push(
            { key: `c-${category.id}`, kind: "chapter", label: `Bölüm ${category.no} · ${category.name}`, categoryId: category.id },
            (n) => (
                <ChapterSlide
                    deck={deck}
                    category={category}
                    fullCategory={full.categories.find((c) => c.id === category.id) ?? category}
                    pageNo={n}
                />
            ),
        );
        for (const service of category.services) {
            push(
                { key: `s-${service.id}`, kind: "service", label: service.title, categoryId: category.id, serviceId: service.id },
                (n) => <ServiceSlide deck={deck} category={category} service={service} pageNo={n} lazy={lazy} />,
            );
        }
    }
    push({ key: "contact", kind: "contact", label: "İletişim" }, (n) => <ContactSlide deck={deck} pageNo={n} />);

    return pages.map(({ render, ...page }, index) => ({ ...page, node: render(index + 1) }));
}
