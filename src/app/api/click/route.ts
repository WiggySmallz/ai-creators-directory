import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const tool = request.nextUrl.searchParams.get("tool");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  console.log(`[affiliate-click] tool=${tool} url=${url} timestamp=${new Date().toISOString()}`);

  return NextResponse.redirect(url);
}
