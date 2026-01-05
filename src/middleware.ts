import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("Session in middleware:", session);
    console.log("Cookies in middleware:", request.cookies.getAll());
    console.log("NEXTAUTH_SECRET in middleware:", process.env.NEXTAUTH_SECRET);
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/fridge", "/recipes", "/search", "/list", "/settings"],
};
