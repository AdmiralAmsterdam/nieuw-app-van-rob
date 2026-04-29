"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/types";

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
