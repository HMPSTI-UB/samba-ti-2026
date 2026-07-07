import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = "http://localhost:8000"; // Ganti dengan URL backend production nanti

export async function middleware(req: NextRequest) {
  // Ambil path yang dituju (misal: /api/auth/login -> /auth/login)
  const path = req.nextUrl.pathname.replace(/^\/api/, "");
  
  // Siapkan header baru untuk di-forward ke backend
  const headers = new Headers(req.headers);
  const cookieStore = await cookies();
  
  // Otomatis suntikkan header Authorization Bearer dari cookie access_token (Sesuai maunya Jonathan)
  const accessToken = cookieStore.get("access_token")?.value;
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const url = new URL(path, BACKEND_URL);
  
  // Opsi khusus untuk rute refresh token
  let body: any = undefined;
  if (path === "/auth/refresh" && req.method === "POST") {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    body = JSON.stringify({ refreshToken });
    headers.set("Content-Type", "application/json");
  } else if (req.method !== "GET" && req.method !== "HEAD") {
    // Forward body untuk request selain GET/HEAD
    body = await req.text();
  }

  try {
    const response = await fetch(url.toString(), {
      method: req.method,
      headers,
      body,
    });

    const data = await response.text();
    
    // Kembalikan response dari backend ke frontend
    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Backend proxy failed" }, { status: 502 });
  }
}

export const GET = middleware;
export const POST = middleware;
export const PUT = middleware;
export const PATCH = middleware;
export const DELETE = middleware;
