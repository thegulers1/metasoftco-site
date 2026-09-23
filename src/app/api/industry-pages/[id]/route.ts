import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";
import { industryPageData, revalidateIndustryPage } from "../shared";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
    const { id } = await params;
    const page = await prisma.industryPage.findUnique({ where: { id } });
    if (!page) return NextResponse.json({ error: "Sayfa bulunamadı" }, { status: 404 });
    return NextResponse.json(page);
}

export async function PUT(req: Request, { params }: Params) {
    try {
        const { id } = await params;
        const previous = await prisma.industryPage.findUnique({ where: { id }, select: { slug: true, slug_en: true } });
        const page = await prisma.industryPage.update({ where: { id }, data: industryPageData(await req.json()) });
        revalidateIndustryPage(page, previous ?? undefined);
        return NextResponse.json(page);
    } catch (error) {
        const { message, status } = prismaErrorMessage(error, "Sayfa güncellenemedi");
        return NextResponse.json({ error: message }, { status });
    }
}

export async function DELETE(_: Request, { params }: Params) {
    try {
        const { id } = await params;
        const page = await prisma.industryPage.delete({ where: { id } });
        revalidateIndustryPage(page);
        return NextResponse.json({ success: true });
    } catch (error) {
        const { message, status } = prismaErrorMessage(error, "Sayfa silinemedi");
        return NextResponse.json({ error: message }, { status });
    }
}
