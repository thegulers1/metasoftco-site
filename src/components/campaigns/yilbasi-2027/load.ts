import { prisma } from "@/lib/db";
import { getOccasion } from "@/lib/occasions";

export interface CampaignImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}
export interface CampaignService {
  slug: string;
  title: string;
  href: string;
  image: CampaignImage | null;
}
export interface CampaignProject {
  title: string;
  href: string;
  image: CampaignImage;
  description: string;
}

export async function loadCampaign() {
  const occasion = getOccasion("yilbasi-partisi-aktiviteleri");
  if (!occasion) return null;
  const [rows, projects] = await Promise.all([
    prisma.service.findMany({
      where: {
        published: true,
        type: "RENTAL",
        slug: {
          in: [
            "ai-photobooth-kirala",
            "strip-photo",
            "360-video-booth",
            "dijital-hediye-carki-aktivasyonu",
            "quiz-bilgi-yarismasi",
            "karaoke",
          ],
        },
      },
      include: { category: true },
    }),
    prisma.project.findMany({
      where: {
        published: true,
        slug: {
          in: ["tavuk-dunyasi-x-ai-photo", "rollic-summer-party-x-seri-t-foto"],
        },
      },
      select: {
        slug: true,
        title: true,
        image: true,
        description: true,
      },
    }),
  ]);
  const ai = rows.find((row) => row.slug === "ai-photobooth-kirala");
  if (!ai) return null;
  const services: CampaignService[] = rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    href: `/hizmetler/${row.category.slug}/${row.slug}`,
    image: row.image ? { url: row.image, alt: row.title } : null,
  }));
  const references: CampaignProject[] = projects.flatMap((project) =>
    project.image
      ? [
          {
            title:
              project.slug === "tavuk-dunyasi-x-ai-photo"
                ? "Tavuk Dünyası / AI Photo"
                : "Rollic Summer Party / Strip Photo",
            href: `/projeler/${project.slug}`,
            image: { url: project.image, alt: project.title },
            description:
              project.slug === "tavuk-dunyasi-x-ai-photo"
                ? "Katılımcı fotoğraflarını markaya özel sahnelere dönüştüren yayımlanmış AI Photo projesi."
                : "Bir şirket partisinden gerçek Strip Photo uygulaması. Yaz etkinliği referansıdır; yılbaşı projesi olarak sunulmaz.",
          },
        ]
      : [],
  );
  return {
    occasion: {
      ...occasion,
      faqs: [
        ...occasion.faqs,
        {
          q: "Baskı standart olarak dahil mi?",
          a: "Baskı her deneyimde standart dahil hizmet olarak sunulmaz. İstenen format, adet ve operasyon kapsamı teklifte ayrıca belirtilir.",
        },
      ],
    },
    services,
    references,
  };
}
