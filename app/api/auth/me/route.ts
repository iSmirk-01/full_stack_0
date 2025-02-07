import { verifyToken } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return NextResponse.json(
                { error: "Invalid token!" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.id },
            select: { id: true, email: true, role: true }
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found!" },
                { status: 404 }
            )
        }

        return NextResponse.json(user);

    } catch (error) {
        console.error("error getting user: ", error)
        NextResponse.json(
            { error: "something went wrong" },
            { status: 500 }
        )
    }
}