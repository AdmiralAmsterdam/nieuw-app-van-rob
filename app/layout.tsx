import "./globals.css";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import { getLocale, getMessages } from "@/lib/i18n";
import { Providers } from "@/app/providers";
import { PageTransition } from "@/components/page-transition";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VAN EGMOND Potgrond",
  description: "Bestelapp voor professionele kwekers en groothandel."
};

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={geist.className}>
        <Providers locale={locale} messages={messages}>
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  );
}
