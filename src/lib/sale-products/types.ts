/** A bilingual string. Every sale page ships Turkish and English together. */
export interface Text {
  tr: string;
  en: string;
}

export interface SaleOption {
  id: string;
  name: Text;
  detail?: Text;
  /** USD, VAT excluded. Regular price; see `campaignPrice`. */
  price: number;
  /** Price while `SaleProduct.campaign` runs. Resolved server-side by `resolveSaleProduct`. */
  campaignPrice?: number;
  /** Set by `resolveSaleProduct` during a campaign: the regular price, shown struck through. */
  listPrice?: number;
  /** Add-on starts selected. */
  preselected?: boolean;
  /** Shown when a preselected add-on is removed. */
  removeNote?: Text;
}

/**
 * Everything a product sale page shows. Plain data so it can cross the
 * server/client boundary; prices are USD and VAT-exclusive.
 */
export interface SaleProduct {
  slug: string;
  name: Text;
  tagline: Text;
  images: { url: string; alt: Text }[];
  imageNote: Text;
  /** Base hardware choice (e.g. screen size). The first entry is the starting price. */
  sizes: SaleOption[];
  sizeLabel: Text;
  /** Software modules; one is included, each extra costs `extraModulePrice`. */
  modules: { id: string; name: Text; summary: Text; body: Text; projects: string[] }[];
  extraModulePrice: number;
  /** A real, dated campaign. After `endsAt` the regular prices apply automatically. */
  campaign?: { endsAt: string; label: Text };
  /** Add-on ids that make up the "fully equipped" price shown next to the starting price. */
  fullKit?: string[];
  fullKitLabel?: Text;
  addons: SaleOption[];
  credits?: {
    free: number;
    /** Per-image price falls with pack size (USD, VAT excluded). */
    packs: { images: number; unitPrice: number }[];
  };
  included: Text[];
  specs: { label: Text; value: Text }[];
  process: { title: Text; body: Text }[];
  terms: { title: Text; body: Text }[];
  faq: { q: Text; a: Text }[];
  /** Project slugs shown as field proof, in order. */
  showcase: string[];
  rental: { tr: string; en: string };
}
