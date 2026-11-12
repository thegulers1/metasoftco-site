import { AI_PHOTO_KIOSK } from "./ai-photo-kiosk";
import type { SaleProduct } from "./types";

export type { SaleProduct, SaleOption, Text } from "./types";

const SALE_PRODUCTS: SaleProduct[] = [AI_PHOTO_KIOSK];

/**
 * The priced sale configuration for a Turkish slug, with any running campaign
 * applied. Once a campaign's end date passes, regular prices return on their own.
 */
export function saleProduct(slug: string, now = new Date()) {
  const product = SALE_PRODUCTS.find((item) => item.slug === slug);
  return product && resolveSaleProduct(product, now);
}

function resolveSaleProduct(product: SaleProduct, now: Date): SaleProduct {
  const active = !!product.campaign && now < new Date(product.campaign.endsAt);
  return {
    ...product,
    campaign: active ? product.campaign : undefined,
    sizes: product.sizes.map(({ campaignPrice, ...size }) =>
      active && campaignPrice
        ? { ...size, listPrice: size.price, price: campaignPrice }
        : size,
    ),
  };
}

export function saleProductSchema(
  product: SaleProduct,
  locale: "tr" | "en",
  url: string,
  image: string,
) {
  const prices = product.sizes.map((size) => size.price);
  const kit = product.addons
    .filter((addon) => product.fullKit?.includes(addon.id))
    .reduce((sum, addon) => sum + addon.price, 0);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.tagline[locale],
    image,
    url,
    brand: { "@type": "Brand", name: "MetasoftCo" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices) + kit,
      offerCount: prices.length,
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

export function saleFaqSchema(product: SaleProduct, locale: "tr" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faq.map((item) => ({
      "@type": "Question",
      name: item.q[locale],
      acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
    })),
  };
}
