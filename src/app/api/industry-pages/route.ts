import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { prismaErrorMessage } from "@/lib/apiError";
import { industryPageData, revalidateIndustryPage } from "./shared";

export async function GET() {
    try {
        const pages = await prisma.industryPage.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
        return NextResponse.json(pages);
    } catch {
        return NextResponse.json({ error: "Sayfalar getirilemedi" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const page = await prisma.industryPage.create({ data: industryPageData(await req.json()) });
        revalidateIndustryPage(page);
        return NextResponse.json(page, { status: 201 });
    } catch (error) {
        const { message, status } = prismaErrorMessage(error, "Sayfa oluşturulamadı");
        return NextResponse.json({ error: message }, { status });
    }
}
