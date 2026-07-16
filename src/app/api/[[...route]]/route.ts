import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.API_URL || "http://localhost:8000";

async function handler(
  request: NextRequest,
  { params }: { params: Promise<{ route?: string[] }> },
) {
  const { route } = await params;
  const path = route ? `/${route.join("/")}` : "";
  const search = request.nextUrl.search;
  const target = `${BACKEND_URL}${path}${search}`.replace(/(?<!:)\/\//, "/");

  const headers = new Headers(request.headers);
  headers.delete("host");

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let body: BodyInit | undefined;
  if (path === "/auth/refresh" && request.method === "POST") {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    body = JSON.stringify({ refreshToken });
    headers.set("Content-Type", "application/json");
  } else if (request.method !== "GET" && request.method !== "HEAD") {
    body = await request.text();
  }

  try {
    const response = await fetch(target, {
      method: request.method,
      headers,
      body,
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("transfer-encoding");

    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to connect to backend server" },
      { status: 502 },
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
