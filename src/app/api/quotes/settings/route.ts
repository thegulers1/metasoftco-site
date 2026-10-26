import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";
import { QUOTE_DEFAULTS_KEY } from "@/lib/quotes";

const OUTPUT_TYPES = new Set(["none", "digital", "print", "instant"]);

/** Replaces the inclusion list, the shipping table and the default notes in one go. */
export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const inclusions = (Array.isArray(body.inclusions) ? body.inclusions : [])
            .map((inc: Record<string, unknown>, order: number) => ({
                label: String(inc.label ?? "").trim(),
                outputTypes: (Array.isArray(inc.outputTypes) ? inc.outputTypes : []).filter((t: unknown) => OUTPUT_TYPES.has(String(t))),
                defaultOn: inc.defaultOn !== false,
                order,
            }))
            .filter((inc: { label: string }) => inc.label);

        const seen = new Set<string>();
        const shipping = (Array.isArray(body.shipping) ? body.shipping : [])
            .map((rate: Record<string, unknown>, order: number) => {
                const amount = rate.amount === null || rate.amount === "" || rate.amount === undefined ? null : Number(rate.amount);
                return { city: String(rate.city ?? "").trim(), amount: amount !== null && Number.isFinite(amount) ? amount : null, order };
            })
            .filter((rate: { city: string }) => rate.city && !seen.has(rate.city.toLocaleLowerCase("tr")) && seen.add(rate.city.toLocaleLowerCase("tr")));

        const validityDays = Math.max(1, Math.round(Number(body.defaults?.validityDays) || 15));
        const notes = String(body.defaults?.notes ?? "");

        await prisma.$transaction([
            prisma.quoteInclusion.deleteMany(),
            prisma.quoteInclusion.createMany({ data: inclusions }),
            prisma.quoteShippingRate.deleteMany(),
            prisma.quoteShippingRate.createMany({ data: shipping }),
            prisma.siteSetting.upsert({
                where: { key: QUOTE_DEFAULTS_KEY },
                create: { key: QUOTE_DEFAULTS_KEY, value: JSON.stringify({ validityDays, notes }) },
                update: { value: JSON.stringify({ validityDays, notes }) },
            }),
        ]);
        return NextResponse.json({ ok: true });
    } catch (error) {
        const { message, status } = prismaErrorMessage(error, "Ayarlar kaydedilemedi");
        return NextResponse.json({ error: message }, { status });
    }
}
