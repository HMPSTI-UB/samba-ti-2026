import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Ponytail: simplest auth guard
  const hasToken = request.cookies.has("access_token");
  const isPortal = request.nextUrl.pathname.startsWith("/portal");

  if (isPortal && !hasToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*"],
};
