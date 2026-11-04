import "dotenv/config";
import { prisma } from "../src/lib/db";

// 2026-11-04: AI Photobooth rental page.
// - faq_en was empty, so the EN page fell back to the Turkish FAQ. Adds the English FAQ.
// - The body text said "100+ per hour" while the FAQ said 40–60. The verified figure is
//   40–60 per station per hour (capacity grows by adding stations); fixes TR and EN body text.
// Idempotent.

const SLUG = "ai-photobooth-kirala";

const faqEn = [
    {
        q: "What is an AI Photobooth?",
        a: "An AI Photobooth is an interactive photo experience that uses artificial intelligence to turn event guests' photos, in real time, into different characters, concepts and visual worlds. Unlike classic photo booths, it does more than swap the background: it reinterprets the photo around the event's theme or the brand's creative concept.",
    },
    {
        q: "How does an AI Photobooth work?",
        a: "The guest has their photo taken at the booth. The photo is processed according to an AI scenario and visual style prepared in advance for the event. Within seconds a personalised AI image is ready, and the guest can download it to their phone via a QR code or take a printed copy.",
    },
    {
        q: "What is the difference between an AI Photobooth and a classic photo booth?",
        a: "A classic photo booth usually adds a frame, a filter or a ready-made background to the photo. An AI Photobooth can place the guest in a completely different visual world. A guest can become a superhero, a historical figure, an astronaut, an athlete or an original character designed for your brand.",
    },
    {
        q: "Can the AI Photobooth be customised with our brand's themes?",
        a: "Yes. Custom prompts and concept designs are possible for any theme, from Cyberpunk and the 1920s to the space age and your corporate colours.",
    },
    {
        q: "How long does it take to prepare the photos, and how many people can it serve per hour?",
        a: "Our AI engine processes photos in seconds. A single station serves an average of 40–60 guests per hour. At busy events we add more stations to scale up the capacity, so queues do not build up.",
    },
    {
        q: "Is the AI Photobooth suitable for corporate events?",
        a: "Yes. The AI Photobooth delivers high guest engagement at brand activations, product launches, company events, trade shows, congresses, festivals, dealer meetings and private invitations. Because the visuals can be prepared for your brand, the experience fits the event's communication style.",
    },
    {
        q: "Are the photos delivered only digitally, or can they be printed on the spot?",
        a: "We offer both. Guests scan the dynamic QR code on the screen and download their photo to their smartphone within seconds. On request, we integrate high-speed dye-sublimation (thermal) photo printers at the event and deliver physical prints in frames designed for your brand.",
    },
    {
        q: "Do you offer AI Photobooth rental outside Istanbul?",
        a: "Yes. Although we are based in Istanbul, we provide turnkey logistics, setup and an expert operator for corporate events, congresses and trade shows in every region of Turkey, especially Ankara, Izmir, Antalya and Bursa.",
    },
    {
        q: "How does face swap work?",
        a: "The system detects the face and its reference points, then a diffusion model regenerates the scene with the guest's face in it. For a step-by-step explanation: [how face swap works](/en/blog/how-ai-face-swap-technology-works)",
    },
];

const nb = (s: string) => s.replace(/ /g, "&nbsp;");

const swaps: { field: "content" | "content_en"; from: string; to: string }[] = [
    {
        field: "content",
        from: nb("istasyon başına saatte 100+ katılımcıya kadar kesintisiz hizmet verilir. Yoğun katılımlı fuar ve festivallerde dahi sıra beklemeden akıcı bir deneyim sağlanır."),
        to: nb("istasyon başına saatte ortalama 40–60 katılımcıya hizmet verilir. Yoğun katılımlı fuar ve festivallerde istasyon sayısı artırılarak kapasite yükseltilir; böylece sıra beklemeden akıcı bir deneyim sağlanır."),
    },
    {
        field: "content_en",
        from: nb("we provide uninterrupted service for over 100 participants per hour at each station. Even at busy trade shows and festivals, a smooth experience is ensured without waiting in line."),
        to: nb("each station serves an average of 40–60 participants per hour. At busy trade shows and festivals we add stations to scale up the capacity, so the experience stays smooth without waiting in line."),
    },
];

(async () => {
    const svc: any = await prisma.service.findFirst({ where: { slug: SLUG } });
    if (!svc) throw new Error("service not found");
    const data: Record<string, string> = {};
    for (const s of swaps) {
        const cur: string = (data[s.field] ?? svc[s.field]) as string;
        if (cur.includes(s.from)) data[s.field] = cur.replace(s.from, s.to);
        else if (!cur.includes(s.to)) throw new Error(`${s.field}: capacity sentence not found`);
    }
    data.faq_en = JSON.stringify(faqEn);
    if (!process.argv.includes("--apply")) {
        console.log("dry run:", Object.keys(data).join(", "), "(pass --apply)");
    } else {
        await prisma.service.update({ where: { id: svc.id }, data });
        console.log("updated:", Object.keys(data).join(", "));
    }
    process.exit(0);
})();
