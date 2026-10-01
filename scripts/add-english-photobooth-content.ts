import "dotenv/config";
import { prisma } from "../src/lib/db";

// English counterpart of enrich-photobooth-pages.ts and add-blog-faqs.ts:
// space, capacity and output details plus a product FAQ for the four rental
// pages (two of which still had Turkish meta on /en), and an FAQ for the one
// post that has an English version. Also corrects that post's headline, which
// said "500 guests in 45 minutes" while the article reports 400 guests in 2
// hours. Existing copy is kept; reruns are no-ops.

const MARKER = "<h3><strong>Space and Setup</strong></h3>";

const setup =
    "The venue only needs to provide a single standard 220V socket; we bring our own 5G connection. We set up the day before the event or 3–4 hours before doors open, and each device takes about 30–40 minutes.";
const printOutput = (wrap: string) =>
    `<h3><strong>Prints, Digital Output and Branding</strong></h3>
<p>Every photo is printed within seconds, and 750 prints are included in the package. The same photo also reaches the guest's phone through a QR code. Photos come out in a digital frame with your logo and brand colours; ${wrap} is wrapped for your brand and the screen interface is designed to match.</p>
<h3><strong>Included in the Rental</strong></h3>
<ul><li>Transport, setup and teardown</li><li>Technical crew on site throughout the event</li><li>Branded interface, digital frame and wrap</li><li>750 prints and digital sharing via QR</li></ul>`;

type Target = {
    categorySlug: string;
    slug: string;
    metaTitle_en: string;
    metaDescription_en: string;
    // Only where the page had none; without it the /en page is not published.
    description_en?: string;
    section: string;
    faq: { q: string; a: string }[];
};

const targets: Target[] = [
    {
        categorySlug: "photobooth-ve-fotograf-aktivasyonlari",
        slug: "mirror-booth",
        metaTitle_en: "Mirror Booth Rental in Türkiye | Mirror Photo Booth — MetasoftCo",
        metaDescription_en:
            "Mirror Booth rental: a photo booth with a touchscreen mirror, instant prints and QR sharing. Needs 4 m² of space; transport, setup and technical crew included.",
        section: `${MARKER}
<p>Mirror Booth needs <strong>4 m² of space</strong> and serves about 60–80 guests per hour. ${setup}</p>
${printOutput("the kiosk")}`,
        faq: [
            {
                q: "What is a Mirror Booth?",
                a: "A Mirror Booth is a photo booth whose screen is a large touchscreen mirror. Guests pose in front of the mirror and follow the on-screen prompts; the photo is printed within seconds and also reaches their phone through a QR code.",
            },
            {
                q: "How much space does a Mirror Booth need?",
                a: "4 m² is enough. The venue only needs to provide a single standard 220V socket; we bring our own 5G connection.",
            },
            { q: "How many guests can a Mirror Booth serve per hour?", a: "About 60–80 guests per hour." },
            {
                q: "Does the Mirror Booth print photos or is it digital only?",
                a: "Both. The photo is printed within seconds and shared digitally through a QR code at the same time. 750 prints are included in the rental package.",
            },
            {
                q: "What is the difference between a Mirror Booth and a classic photo booth?",
                a: "A classic photo booth is a compact kiosk that fits in 2 m². On a Mirror Booth the screen itself is a large touchscreen mirror: guests pose looking into it and can sign their photo on the mirror. It needs 4 m² and suits galas and receptions where style matters.",
            },
        ],
    },
    {
        categorySlug: "photobooth-ve-fotograf-aktivasyonlari",
        slug: "photobooth-kirala",
        metaTitle_en: "Photo Booth Rental in Türkiye | Event Photobooth — MetasoftCo",
        metaDescription_en:
            "Photo booth rental: a compact kiosk for photos, GIFs and Boomerangs with instant prints and QR sharing. Needs 2 m² of space; setup and technical crew included.",
        section: `${MARKER}
<p>Photobooth needs <strong>2 m² of space</strong>. It serves about 70–80 guests per hour, and up to 150 when guests take photos in groups. ${setup}</p>
${printOutput("the kiosk")}`,
        faq: [
            {
                q: "What is a photo booth?",
                a: "A photo booth is a touchscreen kiosk where guests take their own photo. It shoots photos, GIFs and Boomerangs, prints within seconds and sends the result to the guest's phone through a QR code.",
            },
            {
                q: "How much space does a photo booth need?",
                a: "2 m² is enough. The venue only needs to provide a single standard 220V socket; we bring our own 5G connection.",
            },
            {
                q: "How many guests can a photo booth serve per hour?",
                a: "About 70–80 guests per hour. When guests take photos in groups, this rises to as many as 150 per hour.",
            },
            {
                q: "How many prints are included in a photo booth rental?",
                a: "750 prints are included in the rental package. Photos are also shared digitally through a QR code.",
            },
            {
                q: "Will our brand appear on the photos?",
                a: "Yes. Photos come out in a digital frame with your logo and brand colours. The kiosk is wrapped for your brand and the screen interface is designed to match.",
            },
        ],
    },
    {
        categorySlug: "photobooth-ve-fotograf-aktivasyonlari",
        slug: "cabin-photo",
        metaTitle_en: "Photo Cabin Rental in Türkiye | Cabin Photo — MetasoftCo",
        metaDescription_en:
            "Photo cabin rental: an enclosed booth with instant prints and QR sharing. Needs 5 m² of space; transport, setup and technical crew included.",
        description_en:
            "An enclosed photo cabin for your event: guests step inside, strike their most playful poses and take the moment home both digitally and as an instant print.",
        section: `${MARKER}
<p>Cabin Photo needs <strong>5 m² of space</strong> and serves about 50 guests per hour; because guests step in and out of the cabin, each session takes a little longer than at an open photo booth. ${setup}</p>
${printOutput("the cabin")}`,
        faq: [
            {
                q: "What is a photo cabin (Cabin Photo)?",
                a: "Cabin Photo is a fully enclosed photo cabin that guests step into to take their photos. The photo is printed within seconds and also reaches their phone through a QR code.",
            },
            {
                q: "How much space does a photo cabin need?",
                a: "5 m² is enough. The venue only needs to provide a single standard 220V socket; we bring our own 5G connection.",
            },
            {
                q: "How many guests can a photo cabin serve per hour?",
                a: "About 50 guests per hour. Because guests step in and out of the cabin, each session takes a little longer than at an open photo booth.",
            },
            {
                q: "What is the difference between a photo cabin and an open photo booth?",
                a: "An open photo booth is a kiosk that fits in 2 m², and guests pose in view of everyone. A photo cabin is enclosed, so guests pose without an audience; in return it needs 5 m².",
            },
            {
                q: "Can the outside of the cabin be branded?",
                a: "Yes. The cabin is wrapped for your brand, the screen interface is designed to match and photos come out in a digital frame with your logo.",
            },
        ],
    },
    {
        categorySlug: "video",
        slug: "360-video-booth",
        metaTitle_en: "360 Video Booth Rental in Türkiye | 360 Degree Video Platform — MetasoftCo",
        metaDescription_en:
            "360 Video Booth rental: slow-motion 360-degree video shot by a rotating camera, shared instantly via QR. Needs 3 m² of space; setup and technical crew included.",
        section: `${MARKER}
<p>360 Video Booth needs <strong>3 m² of space</strong> and serves about 40–50 guests per hour. ${setup}</p>
<h3><strong>Digital Output and Branding</strong></h3>
<p>Because the output is video, 360 Video Booth does not print; the video reaches the guest's phone through a QR code. The intro and outro screens and motion graphics carry your logo and brand colours, and the screen interface is designed to match.</p>
<h3><strong>Included in the Rental</strong></h3>
<ul><li>Transport, setup and teardown</li><li>Technical crew on site throughout the event</li><li>Branded interface and video graphics</li><li>Instant digital sharing via QR</li></ul>`,
        faq: [
            {
                q: "What is a 360 Video Booth?",
                a: "A 360 Video Booth is a video activation where guests stand on a platform while a camera rotates around them, shooting a 360-degree video. The video is edited with slow motion and branded graphics and reaches the guest's phone through a QR code.",
            },
            {
                q: "How much space does a 360 Video Booth need?",
                a: "3 m² is enough. The venue only needs to provide a single standard 220V socket; we bring our own 5G connection.",
            },
            { q: "How many guests can a 360 Video Booth serve per hour?", a: "About 40–50 guests per hour." },
            {
                q: "Does the 360 Video Booth print?",
                a: "No. The output is a video, so it is digital; guests download it through a QR code. If you want a printed keepsake as well, it can be set up alongside a Photobooth, Mirror Booth or Cabin Photo.",
            },
            {
                q: "Will our brand appear in the videos?",
                a: "Yes. The intro and outro screens and motion graphics carry your logo and brand colours, and the screen interface is designed to match.",
            },
        ],
    },
];

const forbesSlug = "stable-diffusion-etkinlik-yuz-donusumu-teknik-analiz";
const forbesTitle = "400 Misafiri 2 Saatte Forbes Kapağına Dönüştürdük: Stable Diffusion AI Altyapımızın Perde Arkası";
const forbesTitleEn = "We Turned 400 Guests into Forbes Covers in 2 Hours: Behind Our Stable Diffusion AI Stack";
const forbesFaqEn = [
    {
        q: "Which AI model does the AI photo booth run on?",
        a: "Our stack is built on Stable Diffusion, used together with concept-specific LoRA training and a ControlNet layer that preserves the guest's facial structure.",
    },
    {
        q: "How long does a single photo take at a busy event?",
        a: "At the awards night described in this article the average processing time was 9.4 seconds. What shortens it: model optimisation, warming the system up before doors open and caching the fixed prompts.",
    },
    {
        q: "How is facial likeness preserved in an AI photo?",
        a: "With ControlNet, which takes the face and pose as reference, and IP-Adapter FaceID, which carries the facial identity. Likeness rises markedly with these layers compared with the base model and LoRA alone.",
    },
    {
        q: "Where were the photos processed at this event?",
        a: "At the event described in this article all processing ran on local servers; images were not sent to the cloud and were deleted within the agreed period after the event.",
    },
];

async function main() {
    for (const target of targets) {
        const service = await prisma.service.findFirst({
            where: { slug: target.slug, category: { slug: target.categorySlug } },
        });
        if (!service) throw new Error(`Service not found: ${target.categorySlug}/${target.slug}`);

        const content = service.content_en ?? "";
        const hasFaq = Boolean(service.faq_en && JSON.parse(service.faq_en).length > 0);
        await prisma.service.update({
            where: { id: service.id },
            data: {
                metaTitle_en: target.metaTitle_en,
                metaDescription_en: target.metaDescription_en,
                description_en: service.description_en?.trim() ? service.description_en : (target.description_en ?? service.description_en),
                content_en: content.includes(MARKER) ? content : `${content}\n${target.section}`,
                // An FAQ written in the editpanel wins over this one.
                faq_en: hasFaq ? service.faq_en : JSON.stringify(target.faq),
            },
        });
        console.log(`Updated EN ${target.categorySlug}/${target.slug}${hasFaq ? " (existing FAQ kept)" : ""}`);
    }

    const post = await prisma.blogPost.findUnique({ where: { slug: forbesSlug } });
    if (!post) throw new Error(`Post not found: ${forbesSlug}`);
    const hasFaq = Boolean(post.faq_en && JSON.parse(post.faq_en).length > 0);
    await prisma.blogPost.update({
        where: { id: post.id },
        data: {
            title: forbesTitle,
            title_en: forbesTitleEn,
            metaTitle_en: forbesTitleEn,
            faq_en: hasFaq ? post.faq_en : JSON.stringify(forbesFaqEn),
        },
    });
    console.log(`Updated post titles and EN FAQ: ${forbesSlug}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
