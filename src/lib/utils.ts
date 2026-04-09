import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// HTML içindeki h2/h3 başlıklarına slug tabanlı id ekler (jump-link / SEO anchor desteği)
export function addHeadingAnchors(html: string): string {
  if (!html) return html;
  const used = new Map<string, number>();
  return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/\1>/gi, (_, tag, attrs, inner) => {
    // Zaten id varsa dokunma
    if (/\bid\s*=/i.test(attrs)) return `<${tag}${attrs}>${inner}</${tag}>`;
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let slug = text
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    const count = used.get(slug) ?? 0;
    used.set(slug, count + 1);
    if (count > 0) slug = `${slug}-${count}`;
    return `<${tag}${attrs} id="${slug}">${inner}</${tag}>`;
  });
}
