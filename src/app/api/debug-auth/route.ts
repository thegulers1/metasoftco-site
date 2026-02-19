import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({
                found: false,
                message: "User not found in DB",
            });
        }

        const isValid = await bcrypt.compare(password, user.password);

        return NextResponse.json({
            found: true,
            email: user.email,
            role: user.role,
            passwordHashPrefix: user.password.substring(0, 10) + "...",
            passwordValid: isValid,
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
