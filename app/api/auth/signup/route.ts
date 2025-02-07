import { z } from "zod";
import { signToken, hashPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const signupSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
})
// Infer TypeScript type from Zod schema
type SignupData = z.infer<typeof signupSchema>;

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const body = (await req.json()) as SignupData;

        const validation = signupSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed" },
                { status: 400 },
            );
        }

        const { email, password, confirmPassword } = validation.data

        if (password !== confirmPassword) {
            return NextResponse.json(
                { error: "Passwords do not match!" },
                { status: 400 },
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            return NextResponse.json(
                { error: "Email already exsist" },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword }
        });
        const token = signToken(newUser.id, newUser.role);

        (await cookies()).set("token", token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60
        });

        return NextResponse.json(
            { success: "Acount created successfully!"},
            { status: 201 });
    } catch (error) {
        console.error("signup error: ", error);
        return NextResponse.json({
            error: "Something went wrong",
            status: 500
        });
    }
}