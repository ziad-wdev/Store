import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

import { ReduxProvider } from "@/store/provider";
import Header from "@/components/web/header";
import Footer from "@/components/web/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Store",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en" className={cn("h-full antialiased", inter.variable, geistMono.variable)} suppressHydrationWarning>
        <body className="flex min-h-full flex-col">
          <Header />
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  );
}
