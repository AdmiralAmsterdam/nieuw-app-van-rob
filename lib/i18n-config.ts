import type { Locale } from "@/lib/types";

export const defaultLocale: Locale = "nl";

export const i18nConfig = {
  defaultLocale: "nl" as Locale,
  locales: ["nl", "en"] as Locale[],
  timeZone: "Europe/Amsterdam",
};
