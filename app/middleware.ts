import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  try {
    const decodedToken = verifyToken(token); // Decode token
    const userRole = decodedToken?.role; // Extract role

    const pathname = req.nextUrl.pathname;

    // Define role-based access
    const rolePermissions: Record<string, string[]> = {
      "/dashboard/admin": ["ADMIN"], // Only admins can access
      "/dashboard/user": ["USER", "ADMIN"], // Both user and admin can access
    };

    // Check if the route requires a specific role
    for (const [route, allowedRoles] of Object.entries(rolePermissions)) {
      if (pathname.startsWith(route) && !allowedRoles.includes(userRole ?? "")) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
    
    return NextResponse.next();

  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Protect all dashboard routes
};
