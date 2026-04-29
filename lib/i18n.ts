import { cookies } from "next/headers";
import en from "@/messages/en.json";
import nl from "@/messages/nl.json";
import type { Locale } from "@/lib/types";

export const defaultLocale: Locale = "nl";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  return locale === "en" ? "en" : defaultLocale;
}

export async function getMessages() {
  const locale = await getLocale();
  return locale === "en" ? en : nl;
}
