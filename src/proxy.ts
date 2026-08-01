import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function decodeRole(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const json = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof json.role === "string" ? json.role : null;
  } catch {
    return null;
  }
}

const PANITIA_ROLES = ["ADMIN", "KADERISASI", "SPV"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const role = token ? decodeRole(token) : null;

  const isAuthPage = pathname.startsWith("/auth");
  const isMabaPage = pathname.startsWith("/app");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isMaba = role === "MABA";
  const isPanitia = role !== null && PANITIA_ROLES.includes(role);

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(
        new URL(isMaba ? "/app/dashboard" : "/dashboard", request.url),
      );
    }
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isMabaPage && !isMaba) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboardPage && !isPanitia) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/app/:path*", "/auth/:path*"],
};
