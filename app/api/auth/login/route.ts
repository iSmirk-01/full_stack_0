import { comparePasswords, signToken } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    //check if user has token before login
    const cookieStore = await cookies();
    const oldToken = cookieStore.get("token");
    if (oldToken) cookieStore.delete("token")

    const { email, password } = await req.json();

    try {
        const user = await prisma.user.findUnique({ where: { email }});
        if (!user || !(await comparePasswords(password, user.password))) {
            return NextResponse.json(
              { error: "Invalid credentials" },
              { status: 401 }
            );
        };

        const token = signToken(user.id, user.role)

        const response = NextResponse.json({ success: "Logged in!" })
            response.headers.set(
                "Set-Cookie",
                `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
            );
        return response;
    } catch (error) {
        console.error("Error logging in: ", error)
        return NextResponse.json(
            { error: "something went wrong" },
            { status: 500 }
        );
    };

}; 