import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.update({
            where: { email: "admin@metasoftco.com" },
            data: { password: hashedPassword },
        });

        return NextResponse.json({
            success: true,
            message: "Password updated",
            email: user.email,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
