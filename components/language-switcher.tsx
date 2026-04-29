"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/types";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [activeLocale, setActiveLocale] = useState<Locale>(() => {
    if (typeof document === "undefined") return locale;
    const fromCookie = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];
    return fromCookie === "en" ? "en" : fromCookie === "nl" ? "nl" : locale;
  });

  const switchLanguage = async (nextLocale: Locale) => {
    const supabase = createClient();

    await fetch("/api/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale })
    });

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("profiles").update({ language: nextLocale }).eq("id", user.id);
    }

    setActiveLocale(nextLocale);
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={activeLocale === "nl" ? "default" : "ghost"}
        onClick={() => switchLanguage("nl")}
      >
        NL
      </Button>
      <Button
        size="sm"
        variant={activeLocale === "en" ? "default" : "ghost"}
        onClick={() => switchLanguage("en")}
      >
        EN
      </Button>
    </div>
  );
}
