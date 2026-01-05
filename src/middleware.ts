import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  console.log("Cookies:", request.cookies);
  console.log("Session:", session);

  if (!session) {
    console.log("Brak sesji, redirect na /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/fridge", "/recipes", "/search", "/list", "/settings"],
};
