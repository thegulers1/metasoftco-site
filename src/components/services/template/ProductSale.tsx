"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Check } from "lucide-react";
import type { SaleProduct, Text } from "@/lib/sale-products";
import type { ServiceReference } from "@/lib/service-template/references";
import ProductQuoteForm from "./ProductQuoteForm";
import ServiceGallery from "./ServiceGallery";
import styles from "../ai-photobooth/ai-photobooth.module.css";
import sale from "./product-sale.module.css";

export type ShowcaseCard = ServiceReference & { slug: string };

const BOTH = "both";

export default function ProductSale({
  product,
  title,
  locale,
  showcase,
}: {
  product: SaleProduct;
  title: string;
  locale: "tr" | "en";
  showcase: ShowcaseCard[];
}) {
  const tx = (text: Text) => text[locale];
  const t = (tr: string, en: string) => (locale === "tr" ? tr : en);
  const [sizeId, setSizeId] = useState(product.sizes[0].id);
  const [moduleId, setModuleId] = useState(product.modules[0].id);
  const [addons, setAddons] = useState<string[]>(() =>
    product.addons.filter((item) => item.preselected).map((item) => item.id),
  );
  const [pack, setPack] = useState(0);
  const [quantity, setQuantity] = useState("1");

  const money = new Intl.NumberFormat(t("tr-TR", "en-US"), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const cents = new Intl.NumberFormat(t("tr-TR", "en-US"), {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  const usd = (value: number) => money.format(value);
  const size = product.sizes.find((item) => item.id === sizeId) ?? product.sizes[0];
  const bothModules = moduleId === BOTH;
  const chosenAddons = product.addons.filter((item) => addons.includes(item.id));
  const units = Number(quantity);
  const validQuantity = Number.isInteger(units) && units >= 1 && units <= 99;
  const unitPrice =
    size.price +
    (bothModules ? product.extraModulePrice : 0) +
    chosenAddons.reduce((sum, item) => sum + item.price, 0);
  const packPrice = product.credits ? pack * product.credits.unitPrice : 0;
  const total = validQuantity ? units * unitPrice + packPrice : null;
  const moduleName = bothModules
    ? product.modules.map((item) => tx(item.name)).join(" + ")
    : tx(product.modules.find((item) => item.id === moduleId)!.name);
  const starting = product.sizes.reduce((low, item) => (item.price < low.price ? item : low));
  const startingPrice = starting.price;
  const discount = (item: { price: number; listPrice?: number }) =>
    item.listPrice ? Math.round((1 - item.price / item.listPrice) * 100) : 0;
  const savings = validQuantity && size.listPrice ? units * (size.listPrice - size.price) : 0;
  const removed = product.addons.filter(
    (item) => item.preselected && item.removeNote && !addons.includes(item.id),
  );
  const kit = product.addons.filter((item) => product.fullKit?.includes(item.id));
  const fullKitPrice = size.price + kit.reduce((sum, item) => sum + item.price, 0);
  const cards = new Map(showcase.map((card) => [card.slug, card]));

  const lines = [
    `${units} × ${tx(product.name)} · ${tx(size.name)}`,
    `${t("Modül", "Module")}: ${moduleName}`,
    t(
      "Dahil: QR paylaşım, ilk 1.000 görsel, kurulum ve eğitim",
      "Included: QR sharing, first 1,000 images, installation and training",
    ),
    ...chosenAddons.map((item) => `+ ${tx(item.name)}`),
    ...(pack ? [`+ ${pack.toLocaleString(t("tr-TR", "en-US"))} ${t("görsel kredisi", "image credits")}`] : []),
    ...(savings && product.campaign
      ? [`${t("Lansman indirimi", "Launch discount")} (${tx(product.campaign.label)}): −${usd(savings)}`]
      : []),
  ];
  const quoteMessage = [
    title,
    ...lines,
    total !== null ? `${t("Liste toplamı", "List total")}: ${usd(total)} + ${t("KDV", "VAT")}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const toggleAddon = (id: string) =>
    setAddons((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  return (
    <>
      <section className={sale.layout} aria-labelledby="product-title">
        <header className={sale.heading}>
          <span className={styles.eyebrow}>{t("Sistem satışı", "System sale")}</span>
          <h1 id="product-title">{title}</h1>
          <p>{tx(product.tagline)}</p>
        </header>

        <figure className={sale.visual}>
          <ServiceGallery
            images={product.images.map((image) => ({ url: image.url, alt: tx(image.alt) }))}
            video={null}
            title={title}
            locale={locale}
          />
          <figcaption>{tx(product.imageNote)}</figcaption>
        </figure>

        <div className={sale.configuration}>
          <div className={sale.price}>
            {product.campaign && size.listPrice && (
              <span className={sale.badge}>
                {t(
                  `Lansman fiyatı · %${discount(size)} indirim · ${tx(product.campaign.label)}`,
                  `Launch price · ${discount(size)}% off · ${tx(product.campaign.label)}`,
                )}
              </span>
            )}
            <span>
              {size.price === startingPrice
                ? t("Başlangıç fiyatı", "Starting at")
                : t(`${tx(size.name)} fiyatı`, `${tx(size.name)} price`)}
            </span>
            <div className={sale.amount} aria-live="polite">
              <strong>{usd(size.price)}</strong>
              {size.listPrice && <s>{usd(size.listPrice)}</s>}
            </div>
            <small>{t("+ KDV · yazılım, kurulum ve eğitim dahil", "+ VAT · software, installation and training included")}</small>
            {kit.length > 0 && product.fullKitLabel && (
              <p className={sale.fullKit}>
                {tx(product.fullKitLabel)}:{" "}
                <strong>{usd(fullKitPrice)}</strong> + {t("KDV", "VAT")}
              </p>
            )}
          </div>

          <ul className={sale.included} aria-label={t("Pakete dahil", "Included")}>
            {product.included.map((item) => (
              <li key={item.en}>
                <Check aria-hidden="true" />
                {tx(item)}
              </li>
            ))}
          </ul>

          <fieldset className={sale.group}>
            <legend>{tx(product.sizeLabel)}</legend>
            <div className={sale.choices}>
              {product.sizes.map((item) => (
                <label key={item.id} className={sale.choice}>
                  <input
                    type="radio"
                    name="size"
                    value={item.id}
                    checked={sizeId === item.id}
                    onChange={() => setSizeId(item.id)}
                  />
                  <strong>{tx(item.name)}</strong>
                  {item.detail && <small>{tx(item.detail)}</small>}
                  <em>
                    {usd(item.price)}
                    {item.listPrice && <s>{usd(item.listPrice)}</s>}
                  </em>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className={sale.group}>
            <legend>{t("Yazılım modülü", "Software module")}</legend>
            <div className={sale.rows}>
              {product.modules.map((item) => (
                <label key={item.id} className={sale.row}>
                  <input
                    type="radio"
                    name="module"
                    value={item.id}
                    checked={moduleId === item.id}
                    onChange={() => setModuleId(item.id)}
                  />
                  <span>
                    <strong>{tx(item.name)}</strong>
                    <small>{tx(item.summary)}</small>
                  </span>
                  <em>{t("Dahil", "Included")}</em>
                </label>
              ))}
              <label className={sale.row}>
                <input
                  type="radio"
                  name="module"
                  value={BOTH}
                  checked={bothModules}
                  onChange={() => setModuleId(BOTH)}
                />
                <span>
                  <strong>{t("İkisi birden", "Both modules")}</strong>
                  <small>{t("Aynı kioskta iki deneyim", "Two experiences on one kiosk")}</small>
                </span>
                <em>+{usd(product.extraModulePrice)}</em>
              </label>
            </div>
          </fieldset>

          <fieldset className={sale.group}>
            <legend>{t("İsteğe bağlı eklemeler", "Optional add-ons")}</legend>
            <div className={sale.rows}>
              {product.addons.map((item) => (
                <label key={item.id} className={sale.row}>
                  <input
                    type="checkbox"
                    checked={addons.includes(item.id)}
                    onChange={() => toggleAddon(item.id)}
                  />
                  <span>
                    <strong>{tx(item.name)}</strong>
                    {item.detail && <small>{tx(item.detail)}</small>}
                  </span>
                  <em>+{usd(item.price)}</em>
                </label>
              ))}
            </div>
            {removed.map((item) => (
              <p key={item.id} className={sale.warn} role="status">
                {tx(item.removeNote!)}
              </p>
            ))}
          </fieldset>

          {product.credits && (
            <fieldset className={sale.group}>
              <legend>{t("Ek görsel kredisi", "Extra image credits")}</legend>
              <p className={sale.hint}>
                {t(
                  `İlk ${product.credits.free.toLocaleString("tr-TR")} görsel hediye. Sonrası görsel başına ${cents.format(product.credits.unitPrice)}; şimdi almak zorunda değilsiniz.`,
                  `The first ${product.credits.free.toLocaleString("en-US")} images are free. After that it is ${cents.format(product.credits.unitPrice)} per image; you don’t have to buy now.`,
                )}
              </p>
              <div className={sale.segmented}>
                {[0, ...product.credits.packs].map((amount) => (
                  <label key={amount}>
                    <input
                      type="radio"
                      name="credits"
                      checked={pack === amount}
                      onChange={() => setPack(amount)}
                    />
                    <span>
                      {amount === 0
                        ? t("Şimdilik yok", "Not now")
                        : `${amount.toLocaleString(t("tr-TR", "en-US"))} · ${usd(amount * product.credits!.unitPrice)}`}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <label className={sale.quantity}>
            {t("Kiosk adedi", "Kiosk quantity")}
            <input
              type="number"
              min="1"
              max="99"
              step="1"
              inputMode="numeric"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              aria-invalid={!validQuantity}
            />
          </label>
          {!validQuantity && (
            <p className={sale.hint} role="status">
              {t("1–99 arasında bir adet girin.", "Enter a quantity from 1 to 99.")}
            </p>
          )}

          <div className={sale.summary} aria-live="polite">
            <h2>{t("Sipariş özeti", "Order summary")}</h2>
            <ul>
              {lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className={sale.total}>
              <span>{t("Toplam", "Total")}</span>
              <strong>{total !== null ? usd(total) : "—"}</strong>
              <small>+ {t("KDV", "VAT")}</small>
            </div>
            {total !== null && (
              <p>
                {t(
                  `Siparişte %50 (${usd(total / 2)}), kalanı teslimden sonra. Fatura, fatura tarihindeki TCMB kuruyla TL kesilir.`,
                  `50% on order (${usd(total / 2)}), the rest after delivery. Invoiced in TRY at the Central Bank rate on the invoice date.`,
                )}
              </p>
            )}
            <a className={styles.primary} href="#teklif">
              {t("Bu kurulum için teklif al", "Request a quote for this setup")}{" "}
              <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <small className={sale.reassure}>
              {t(
                "Şimdi ödeme alınmaz. Kurulumunuzu inceleyip kesin teklifi size iletiriz.",
                "No payment now. We review your setup and send you a final quote.",
              )}
            </small>
          </div>

          <aside id="teklif" className={`${styles.quoteCard} ${sale.quote}`} aria-labelledby="quote-title">
            <h2 id="quote-title">{t("Teklif talebi", "Request a quote")}</h2>
            {validQuantity ? (
              <>
                <p>{lines.join(" · ")}</p>
                <ProductQuoteForm
                  product={tx(product.name)}
                  message={quoteMessage}
                  locale={locale}
                  eventRental={false}
                />
              </>
            ) : (
              <p>
                {t(
                  "Teklif için geçerli bir kiosk adedi girin.",
                  "Enter a valid kiosk quantity to request a quote.",
                )}
              </p>
            )}
          </aside>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="modules-title">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>{t("Yazılım", "Software")}</span>
          <h2 id="modules-title">{t("Bir kiosk, iki deneyim.", "One kiosk, two experiences.")}</h2>
          <p>
            {t(
              "Kiosk seçtiğiniz modül kurulu olarak gelir. İkinci modül istendiğinde aynı donanıma yazılım olarak eklenir; ek cihaz gerekmez.",
              "The kiosk arrives with your chosen module installed. The second module is added to the same hardware as software; no extra device needed.",
            )}
          </p>
        </div>
        <div className={sale.modules}>
          {product.modules.map((item) => (
            <article key={item.id}>
              <span className={styles.eyebrow}>{tx(item.summary)}</span>
              <h3>{tx(item.name)}</h3>
              <p>{tx(item.body)}</p>
              {item.projects.some((slug) => cards.has(slug)) && (
                <p className={sale.seen}>
                  {t("Sahada: ", "In the field: ")}
                  {item.projects
                    .map((slug) => cards.get(slug))
                    .filter((card): card is ShowcaseCard => !!card)
                    .map((card, index) => (
                      <span key={card.slug}>
                        {index > 0 && " · "}
                        <Link href={card.href}>{card.title}</Link>
                      </span>
                    ))}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="sale-specs-title">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>{t("Teknik bilgiler", "Technical details")}</span>
          <h2 id="sale-specs-title">{t("Kutudan çıkanlar.", "What’s in the box.")}</h2>
        </div>
        <dl className={sale.specs}>
          {product.specs.map((item) => (
            <div key={item.label.en}>
              <dt>{tx(item.label)}</dt>
              <dd>{tx(item.value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {showcase.length > 0 && (
        <section className={styles.section} aria-labelledby="showcase-title">
          <div className={styles.sectionHeading}>
            <span className={styles.eyebrow}>{t("Gerçek uygulamalar", "In practice")}</span>
            <h2 id="showcase-title">{t("Markalar sahada kullandı.", "Brands have used it in the field.")}</h2>
          </div>
          <div className={sale.showcase}>
            {showcase.map((card) => (
              <Link key={card.slug} href={card.href}>
                <span className={sale.showcaseImage}>
                  <Image src={card.image} alt={card.title} fill sizes="(max-width:700px) 90vw, 280px" />
                </span>
                <strong>{card.title}</strong>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section} aria-labelledby="process-title">
        <div className={styles.sectionHeading}>
          <span className={styles.eyebrow}>{t("Süreç ve koşullar", "Process and terms")}</span>
          <h2 id="process-title">{t("Her adım açık ve net.", "Every step, clearly.")}</h2>
        </div>
        <ol className={sale.process}>
          {product.process.map((step, index) => (
            <li key={step.title.en}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{tx(step.title)}</h3>
              <p>{tx(step.body)}</p>
            </li>
          ))}
        </ol>
        <div className={sale.terms}>
          {product.terms.map((term) => (
            <div key={term.title.en}>
              <h3>{tx(term.title)}</h3>
              <p>{tx(term.body)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${sale.rental}`} aria-labelledby="rental-title">
        <div>
          <span className={styles.eyebrow}>{t("Dürüst bir not", "An honest note")}</span>
          <h2 id="rental-title">
            {t("Sadece birkaç etkinlik mi planlıyorsunuz?", "Only planning a few events?")}
          </h2>
          <p>
            {t(
              "Satın alma, kiosku sabit bir noktada sürekli kullanacaklar için mantıklı. Yılda birkaç etkinlik için kiralamak daha pratik: kurulumu, operasyonu ve sökümü ekibimiz yapar, her seferinde farklı bir deneyim seçebilirsiniz.",
              "Buying makes sense if the kiosk will run continuously at a fixed location. For a few events a year, renting is more practical: our team installs, runs and dismantles it, and you can pick a different experience each time.",
            )}
          </p>
        </div>
        <Link href={product.rental[locale]} className={styles.textLink}>
          {t("Etkinlik için kiralama seçeneğini inceleyin", "Explore event rental")} ↗
        </Link>
      </section>
    </>
  );
}
