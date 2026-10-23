import "dotenv/config";
import { prisma } from "../src/lib/db";

// 2026-10-23: the TR Aura page has a "Aura Fotoğrafçılığı Nedir, Nasıl Çalışır?"
// section; the EN content had none. This adds its translation in the same
// place (before the technology section). Idempotent; pass --apply to write.

const ID = "cmquunnaw000fo0rr2d19essn";
const MARKER = "<h2>What Is Aura Photography and How Does It Work?</h2>";
const ANCHOR = "<h2>The&nbsp;Technology&nbsp;Behind&nbsp;It";

const section = `${MARKER}
<p>Aura photography is a type of portrait that shows the person surrounded by a coloured halo. Classic aura cameras turn readings from sensors the person rests their hands on into colours and project those colours around the portrait. The image depends on the readings of that moment, so every photo comes out in different tones.</p>
<p>In the Aura Photobooth the process works like this: the guest steps into the booth and places their hands on the biofeedback sensor boxes. The system reads the live sensor data, our software turns it into a colour palette and draws the colours around the portrait in real time. The photo is printed within seconds or sent to the guest's phone via QR code.</p>
<p>The meanings of the colours (purple for intuition, orange for creativity and so on) are playful interpretations from the aura photography tradition, not a scientific or medical measurement. That is why we present the Aura Photobooth not as a health analysis but as an event experience that starts conversations and gives a different result every time. The colour interpretation cards can be designed for your brand and event theme.</p>
`;

async function main() {
    const service = await prisma.service.findUnique({ where: { id: ID }, select: { content_en: true, slug: true } });
    if (!service || !service.content_en) throw new Error("Aura service or EN content not found");
    if (service.content_en.includes(MARKER)) return console.log("Already added.");
    const i = service.content_en.indexOf(ANCHOR);
    if (i === -1) throw new Error("Anchor not found");
    console.log(`Will insert EN definition into ${service.slug} at ${i}.`);
    if (!process.argv.includes("--apply")) return console.log("Dry run. Pass --apply to write.");
    await prisma.service.update({ where: { id: ID }, data: { content_en: service.content_en.slice(0, i) + section + service.content_en.slice(i) } });
    console.log("Applied.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
