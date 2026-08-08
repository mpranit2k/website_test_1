import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/components/ui/Toaster";
import { StickyCallBar } from "@/components/StickyCallBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Gator Plumbing",
  description: "Buche Plumbing LLC DBA Gator Plumbing",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <ToasterProvider>
          <main id="main-content">{children}</main>
        </ToasterProvider>
        <StickyCallBar />
      </body>
    </html>
  );
}
