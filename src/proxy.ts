import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.has("access_token");
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!hasToken && !isAuthPage) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/portal/:path*", "/auth/:path*"],
};
