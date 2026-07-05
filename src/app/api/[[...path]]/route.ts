import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, await params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, await params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, await params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, await params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, await params);
}

async function proxy(request: NextRequest, params: { path?: string[] }) {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { success: false, message: "API_URL is not configured" },
      { status: 500 },
    );
  }

  const path = params.path?.join("/") ?? "";
  const search = request.nextUrl.search;
  const target = `${apiUrl}/${path}${search}`.replace(/(?<!:)\/\//, "/");

  const headers = new Headers(request.headers);
  headers.delete("host");

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.text()
      : undefined;

  try {
    const response = await fetch(target, {
      method: request.method,
      headers,
      body,
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("transfer-encoding");

    const responseBody = await response.text();

    return new NextResponse(responseBody, {
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
