import en from "@/messages/en.json";
import nl from "@/messages/nl.json";
import type { Locale } from "@/lib/types";

// Server-only functies - importeer dit bestand NIET in client components
// Voor client: gebruik @"i18n-config"

export async function getLocale(): Promise<Locale> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  return locale === "en" ? "en" : "nl";
}

export async function getMessages() {
  const locale = await getLocale();
  return locale === "en" ? en : nl;
}
