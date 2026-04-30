"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/types";
import { i18nConfig } from "@/lib/i18n-config";

export function Providers({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: Locale;
  messages: Record<string, string | object>;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={i18nConfig.timeZone}
    >
      {children}
    </NextIntlClientProvider>
  );
}
