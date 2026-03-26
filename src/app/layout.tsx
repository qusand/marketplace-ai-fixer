import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/dashboard/theme-provider";
import { DesignProvider } from "@/components/dashboard/design-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marketplace AI-Fixer",
  description: "Czyszczenie i normalizacja danych produktowych z eksportów partnerskich",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <DesignProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </DesignProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
