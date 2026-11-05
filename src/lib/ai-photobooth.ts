import type { Service } from "@prisma/client";
import { dataCaptureCopy } from "@/lib/data-capture";
import { mergeRentalFaq, toRentalOutput } from "@/lib/rental-ops";

export const AI_PHOTOBOOTH_CATEGORY = "yapay-zeka-etkinlik-cozumleri";
export const AI_PHOTOBOOTH_SLUG = "ai-photobooth-kirala";

// Deliberately curated: AI Try-On / fashion projects are not AI Photo evidence.
export const AI_PHOTOBOOTH_CASES = [
  {
    slug: "tavuk-dunyasi-x-ai-photo",
    brand: "Tavuk Dünyası",
    title: "Etkinlik temasını kişisel bir hatıraya dönüştürmek.",
    format: "Etkinlik deneyimi · AI Photo",
    summary:
      "Tavuk Dünyası etkinliğinde, katılımcı fotoğraflarını etkinliğe özel görsel dünyayla buluşturan AI Photo deneyimi.",
  },
  {
    slug: "castrol-edge-x-ai-photo-kiosk-yapay-zek-fotograf-deneyimi",
    brand: "Castrol EDGE",
    title: "Markanın dünyasına özel bir AI Photo Kiosk.",
    format: "Özel üretim ve sistem satışı",
    summary:
      "Castrol EDGE için özel tasarlanan kiosk ve yazılım; katılımcı fotoğraflarını motorsporları temalı görsellere dönüştürüyor. Bu çalışma bir sistem satışı projesidir.",
  },
] as const;

export interface AiPhotoboothCaseProject {
  slug: string;
  image: string | null;
  title: string;
}

export function isAiPhotoboothPage(category: string, service: string) {
  return category === AI_PHOTOBOOTH_CATEGORY && service === AI_PHOTOBOOTH_SLUG;
}

export function parseAiPhotoboothSpecs(
  raw: string | null,
): { label: string; value: string }[] {
  try {
    const items: unknown = JSON.parse(raw || "[]");
    return Array.isArray(items)
      ? items.filter(
          (item): item is { label: string; value: string } =>
            typeof item?.label === "string" && typeof item?.value === "string",
        )
      : [];
  } catch {
    return [];
  }
}

/** One server-side list feeds both visible answers and FAQPage JSON-LD. */
export function aiPhotoboothFaq(
  service: Pick<Service, "faq" | "title" | "outputType" | "dataCapture">,
) {
  let parsed: unknown;
  try {
    parsed = JSON.parse(service.faq || "[]");
  } catch {
    parsed = [];
  }
  const own = Array.isArray(parsed)
    ? parsed.filter(
        (item): item is { q: string; a: string } =>
          typeof item?.q === "string" && typeof item?.a === "string",
      )
    : [];
  const output = toRentalOutput(service.outputType);
  // Reviewed TR presentation overrides: the legacy capacity answer promises
  // no queues and the process answer implies printing is always included.
  // Preserve the editor's questions and links, correcting only these answers
  // in both the visible FAQ and schema, without mutating the stored record.
  const reviewed = own.map((item) => {
    if (
      item.q.trim() ===
      "Fotoğraflar ne kadar sürede hazırlanır ve saatte kaç kişiye hizmet verebilir?"
    ) {
      return {
        ...item,
        a: "Tek bir istasyon saatte ortalama 40–60 katılımcıya hizmet verebilir. Süre; görsel kurgu, yapay zekâ işlem süresi ve katılımcı akışına göre değişir. Yoğun etkinliklerde katılımcı sayısı ve aktivasyon süresine göre ek istasyon planlanabilir.",
      };
    }
    if (item.q.trim() === "AI Photobooth nasıl çalışır?") {
      return {
        ...item,
        a: `Katılımcının fotoğrafı kiosk üzerinden çekilir ve etkinlik için önceden hazırlanan yapay zekâ senaryosuna göre işlenir. Kişiye özel bir AI görseli oluşturulur.${output === "digital" || output === "print" ? " Fotoğraf QR kod ile telefona indirilebilir." : " Teslim biçimi etkinlik kurgusuna göre belirlenir."} Fotoğraf baskısı talep edilirse adet ve kapsam teklif aşamasında ayrıca netleştirilir.`,
      };
    }
    return item;
  });
  return [
    ...mergeRentalFaq(reviewed, service.title, "tr", output),
    ...(service.dataCapture
      ? dataCaptureCopy("tr", output === "none").faq
      : []),
  ];
}
