import { NextResponse } from "next/server";
import type { Locale } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as { locale?: Locale };
  const locale: Locale = body.locale === "en" ? "en" : "nl";

  const response = NextResponse.json({ ok: true });
  response.cookies.set("NEXT_LOCALE", locale, { path: "/" });

  return response;
}
