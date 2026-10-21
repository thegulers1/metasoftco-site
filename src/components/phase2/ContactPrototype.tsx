"use client";

import Link from "next/link";
import { FormEvent, Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Phase2Locale } from "@/lib/phase2";
import { phase2Copy } from "@/lib/phase2-content";
import { MsWords } from "@/components/site-ms/parts";
import { MsClock } from "@/components/site-ms/interactive";
import { trackEvent } from "@/lib/analytics";
import { homeCopy } from "@/lib/home-content";
import { getAttribution } from "@/lib/attribution";

type Status = "idle" | "sending" | "sent" | "error";

/** Same storage key as the homepage quote list (src/components/home/HomeExperience.tsx). */
const QUOTE_LIST_KEY = "mh-cart";

const t = {
    tr: {
        kicker: "(İLETİŞİM) — TEKLİF TALEBİ",
        city: "İSTANBUL",
        talk: "PROJENİZİ KONUŞALIM",
        next: "BUNDAN SONRA NE OLACAK",
        sizes: ["0–200", "200–1.000", "1.000–5.000", "5.000+"],
        products: ["AI Photo", "AI Greenbox", "Photobooth", "Strip Photo", "İnteraktif Oyun", "Hediye Çarkı", "Video Booth", "VR & AR", "Yazılım Geliştirme", "Emin değilim"],
        productsLabel: "İLGİLENDİĞİNİZ ÜRÜN · BİRDEN FAZLA SEÇEBİLİRSİNİZ",
        intentLabel: "NE DÜŞÜNÜYORSUNUZ?",
        intents: { rent: "Etkinlik için kiralama", buy: "Kalıcı kurulum, satın alma" },
        intentNote: "Talep türü",
        audiences: { ik: "İK & kurum içi etkinlik", ajans: "Ajans & etkinlik organizatörü", satinalma: "Satın alma ekibi", magaza: "Mağaza, showroom & ofis" },
        audienceNote: "Kitle",
        sent: "✓",
        newRequest: "YENİ TALEP",
        email: "E-POSTA GÖNDERİN",
        work: "PROJELERİ İNCELEYİN",
        whatsapp: "WHATSAPP’TAN YAZIN ↗",
        whatsappText: "Merhaba, bilgi almak istiyorum.",
        cursor: { pick: "SEÇ", send: "GÖNDER", write: "YAZ", call: "ARA" },
    },
    en: {
        kicker: "(CONTACT) — QUOTE REQUEST",
        city: "ISTANBUL",
        talk: "LET'S TALK ABOUT YOUR PROJECT",
        next: "WHAT HAPPENS NEXT",
        sizes: ["0–200", "200–1,000", "1,000–5,000", "5,000+"],
        products: ["AI Photo", "AI Greenbox", "Photobooth", "Strip Photo", "Interactive Games", "Gift Wheel", "Video Booth", "VR & AR", "Software Development", "Not sure yet"],
        productsLabel: "PRODUCTS YOU ARE INTERESTED IN · PICK AS MANY AS YOU LIKE",
        intentLabel: "WHAT ARE YOU LOOKING FOR?",
        intents: { rent: "Rental for an event", buy: "Permanent setup, purchase" },
        intentNote: "Request type",
        audiences: { ik: "HR & internal events", ajans: "Agency & event organiser", satinalma: "Procurement team", magaza: "Store, showroom & office" },
        audienceNote: "Audience",
        sent: "✓",
        newRequest: "NEW REQUEST",
        email: "SEND AN EMAIL",
        work: "SEE OUR WORK",
        whatsapp: "WRITE ON WHATSAPP ↗",
        whatsappText: "Hello, I would like some information.",
        cursor: { pick: "PICK", send: "SEND", write: "WRITE", call: "CALL" },
    },
};

/** /iletisim and /en/contact — the "İletişim" design of October 2026. */
export default function ContactPrototype({ locale }: { locale: Phase2Locale }) {
    const dictionary = phase2Copy(locale);
    const copy = dictionary.contact;
    const form = copy.form;
    const l = t[locale];

    const [status, setStatus] = useState<Status>("idle");
    const [size, setSize] = useState("");
    const [products, setProducts] = useState<string[]>([]);
    const [linkedProduct, setLinkedProduct] = useState("");
    const [intent, setIntent] = useState<"rent" | "buy">("rent");
    const [audience, setAudience] = useState<keyof typeof l.audiences | "">("");
    // Items the visitor put on the homepage quote list arrive pre-selected here.
    const [listItems, setListItems] = useState<string[]>([]);
    useEffect(() => {
        try {
            const keys = JSON.parse(localStorage.getItem(QUOTE_LIST_KEY) || "[]");
            if (!Array.isArray(keys)) return;
            const names = homeCopy(locale).services
                .filter((service) => keys.includes(service.key))
                .map((service) => service.name);
            // Reading browser storage has to happen after hydration.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (names.length) setListItems(names);
        } catch { /* storage blocked or corrupt */ }
    }, [locale]);
    const presetAudience = useCallback((key: string) => {
        if (key === "ik" || key === "ajans" || key === "satinalma" || key === "magaza") setAudience(key);
    }, []);

    const toggleProduct = (label: string) =>
        setProducts((current) => (current.includes(label) ? current.filter((p) => p !== label) : [...current, label]));

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("sending");
        const currentForm = event.currentTarget;
        const data = new FormData(currentForm);
        const value = (key: string) => String(data.get(key) ?? "").trim();
        const product = [...new Set([linkedProduct, ...listItems, ...products].filter(Boolean))].join(", ");
        // Request type and audience travel at the top of the message, so every inbox and the panel see them.
        const tags = [`${l.intentNote}: ${l.intents[intent]}`, audience && `${l.audienceNote}: ${l.audiences[audience]}`].filter(Boolean).join(" · ");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: value("name"),
                    email: value("email"),
                    phone: value("phone"),
                    company: value("company"),
                    product,
                    eventDate: value("eventDate"),
                    city: value("city"),
                    guests: size,
                    message: `[${tags}]\n\n${value("brief")}`,
                    attribution: getAttribution(),
                }),
            });
            if (response.ok) {
                setStatus("sent");
                trackEvent("generate_lead", { form_name: "iletisim_brief", product: product || undefined, intent, audience: audience || undefined });
                currentForm.reset();
                setSize("");
                setProducts([]);
                setListItems([]);
                try { localStorage.removeItem(QUOTE_LIST_KEY); } catch { /* storage blocked */ }
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    }

    const optional = (label: string) => label.replace(" *", "").toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");
    const required = (label: string) => label.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR");

    return (
        <article className="ms-page">
            <section className="ms-hero">
                <div className="ms-hero__bar ms-mono">
                    <span>{l.kicker}</span>
                    <MsClock label={l.city} />
                </div>
                <h1 className="ms-h1 ms-h1--long" aria-label={copy.heroLabel}>
                    <MsWords text={`${copy.heroSolid}\n${copy.heroOutline}`} accent="last" />
                </h1>
                <div className="ms-hero__foot">
                    <p className="ms-lede" data-reveal style={{ maxWidth: 620 }}>{copy.heroCopy}</p>
                </div>
            </section>

            <section className="ms-contact">
                <div className="ms-contact__aside" data-reveal>
                    <div className="ms-contact__direct">
                        <span className="ms-mono ms-acc">{l.talk}</span>
                        <a href="tel:+905342334051" className="ms-contact__big" data-cursor={l.cursor.call} onClick={() => trackEvent("phone_click", { location: "contact_page" })}>+90 534 233 40 51</a>
                        <a href="mailto:info@metasoftco.com" className="ms-contact__big ms-contact__big--sm" data-cursor={l.cursor.write}>info@metasoftco.com</a>
                        <span className="ms-mut" style={{ fontSize: 15, lineHeight: 1.5, maxWidth: 420 }}>{copy.location}</span>
                    </div>
                    <div>
                        <h2 className="ms-mono ms-mut" style={{ display: "block", margin: 0, paddingBottom: 12, fontWeight: 400 }}>{l.next}</h2>
                        <ol className="ms-nextsteps">
                            {copy.nextSteps.map((step) => (
                                <li key={step.number}>
                                    <span className="ms-mono ms-acc">{step.number}</span>
                                    <div>
                                        <h3>{step.title}</h3>
                                        <p>{step.copy}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <div data-reveal>
                    {status === "sent" ? (
                        <div className="ms-contact__done" role="status">
                            <span className="ms-contact__tick">{l.sent}</span>
                            <h2 className="ms-h2">{form.submitted}</h2>
                            <p className="ms-lede">{form.success}</p>
                            <button type="button" className="ms-pill ms-pill--line" onClick={() => setStatus("idle")}>{l.newRequest}</button>
                        </div>
                    ) : (
                        <form className="ms-form" onSubmit={submit}>
                            <Suspense fallback={null}>
                                <LinkedIntent onIntent={setIntent} onAudience={presetAudience} />
                            </Suspense>
                            <div className="ms-field">
                                <span>{l.intentLabel}</span>
                                <div className="ms-chips" role="radiogroup" aria-label={l.intentLabel} style={{ marginTop: 8 }}>
                                    {(["rent", "buy"] as const).map((key) => (
                                        <button key={key} type="button" role="radio" aria-checked={intent === key} className="ms-chip" data-cursor={l.cursor.pick} onClick={() => setIntent(key)}>{l.intents[key].toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR")}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="ms-form__grid">
                                <label className="ms-field"><span>{required(form.name)}</span><input className="ms-input" required name="name" autoComplete="name" placeholder={form.namePlaceholder} /></label>
                                <label className="ms-field"><span>{optional(form.company)}</span><input className="ms-input" name="company" autoComplete="organization" placeholder={form.companyPlaceholder} /></label>
                                <label className="ms-field"><span>{required(form.email)}</span><input className="ms-input" required type="email" name="email" autoComplete="email" placeholder={form.emailPlaceholder} /></label>
                                <label className="ms-field"><span>{required(form.phone)}</span><input className="ms-input" required type="tel" name="phone" autoComplete="tel" placeholder={form.phonePlaceholder} /></label>
                            </div>
                            <p className="ms-form__hint">{form.detailsHint}</p>
                            <div className="ms-form__grid">
                                <label className="ms-field"><span>{optional(form.date)}</span><input className="ms-input" type="date" name="eventDate" /></label>
                                <label className="ms-field"><span>{optional(form.venue)}</span><input className="ms-input" name="city" placeholder={form.venuePlaceholder} /></label>
                            </div>
                            <div className="ms-field">
                                <span>{optional(form.audience)}</span>
                                <div className="ms-chips" role="radiogroup" aria-label={optional(form.audience)} style={{ marginTop: 8 }}>
                                    {l.sizes.map((label) => (
                                        <button key={label} type="button" role="radio" aria-checked={size === label} className="ms-chip" data-cursor={l.cursor.pick} onClick={() => setSize(size === label ? "" : label)}>{label}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="ms-field">
                                <span>{l.productsLabel}</span>
                                <Suspense fallback={null}>
                                    <LinkedProduct onProduct={setLinkedProduct} />
                                </Suspense>
                                <div className="ms-chips" style={{ marginTop: 8 }}>
                                    {listItems.map((name) => (
                                        <button key={`list-${name}`} type="button" className="ms-chip" aria-pressed="true" onClick={() => setListItems((current) => current.filter((item) => item !== name))}>{name} ×</button>
                                    ))}
                                    {linkedProduct && !l.products.includes(linkedProduct) && (
                                        <button type="button" className="ms-chip" aria-pressed="true" onClick={() => setLinkedProduct("")}>{linkedProduct} ×</button>
                                    )}
                                    {l.products.map((label) => (
                                        <button key={label} type="button" aria-pressed={products.includes(label)} className="ms-chip" data-cursor={l.cursor.pick} onClick={() => toggleProduct(label)}>{label.toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR")}</button>
                                    ))}
                                </div>
                            </div>
                            <label className="ms-field"><span>{optional(form.brief)}</span><textarea className="ms-input" name="brief" rows={4} maxLength={2000} placeholder={form.briefPlaceholder} /></label>
                            <div className="ms-form__foot">
                                <p className="ms-form__note">
                                    {locale === "en"
                                        ? <>The details you send are used only to respond to your request. See our <Link href="/gizlilik">Privacy Policy</Link> (Turkish).</>
                                        : <>Gönderdiğiniz bilgiler yalnızca talebinize dönüş yapmak için KVKK kapsamında işlenir. Ayrıntılar için <Link href="/gizlilik">Gizlilik Politikası</Link>.</>}
                                </p>
                                <button className="ms-pill ms-pill--acc" type="submit" disabled={status === "sending"} data-cursor={l.cursor.send}>
                                    {(status === "sending" ? form.submitting : form.submit).toLocaleUpperCase(locale === "en" ? "en-US" : "tr-TR")} ↗
                                </button>
                            </div>
                            {status === "error" && <p className="ms-error" role="alert">{form.error}</p>}
                        </form>
                    )}
                </div>
            </section>

            <section className="ms-lite" data-reveal>
                <div>
                    <h2 className="ms-h2 ms-h2--sm">{copy.liteTitle}</h2>
                    <p className="ms-mut" style={{ margin: "10px 0 0", fontSize: 16 }}>{copy.liteCopy}</p>
                </div>
                <div className="ms-actions">
                    <a href="mailto:info@metasoftco.com" className="ms-pill ms-pill--line" data-cursor={l.cursor.write}>{l.email}</a>
                    <Link href={dictionary.routes.work} className="ms-pill ms-pill--line">{l.work}</Link>
                    <a href={`https://wa.me/905342334051?text=${encodeURIComponent(l.whatsappText)}`} target="_blank" rel="noopener noreferrer" className="ms-pill ms-pill--acc" data-cursor={l.cursor.write} onClick={() => trackEvent("whatsapp_click", { location: "contact_page" })}>{l.whatsapp}</a>
                </div>
            </section>
        </article>
    );
}

/** Service pages link here with ?urun=<product>, so the request arrives tagged with it. */
function LinkedProduct({ onProduct }: { onProduct: (product: string) => void }) {
    const initial = useSearchParams().get("urun")?.slice(0, 120) ?? "";
    useEffect(() => {
        if (initial) onProduct(initial);
    }, [initial, onProduct]);
    return null;
}

/** Homepage audience links arrive with ?kitle=<audience>, purchase links with ?tur=satin-alma. */
function LinkedIntent({ onIntent, onAudience }: { onIntent: (intent: "rent" | "buy") => void; onAudience: (key: string) => void }) {
    const params = useSearchParams();
    const tur = params.get("tur") ?? "";
    const kitle = params.get("kitle") ?? "";
    // Both callbacks are stable, so the preset runs once per link, not on every render.
    useEffect(() => {
        if (tur === "satin-alma" || kitle === "magaza") onIntent("buy");
        if (kitle) onAudience(kitle);
    }, [tur, kitle, onIntent, onAudience]);
    return null;
}
