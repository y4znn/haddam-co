import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/GrainOverlay";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Haddam.co | Premium Lebanese Electronics",
  description: "The Anti-Basic E-Commerce Experience.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevent accidental zooming on mobile which breaks app-like feel
};

import { LayoutIntelligence } from "@/components/ui/LayoutIntelligence";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { UserIntentProvider } from "@/lib/context/UserIntentContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preload" as="image" href="/hero-image.webp" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground font-sans flex flex-col min-h-screen overflow-x-hidden`}
      >
        <LayoutIntelligence>
          <UserIntentProvider>
            <main className="flex-1 relative z-10 w-full">
              {children}
            </main>
            <Header />
            <Footer />
            <GrainOverlay />
            <CommandPalette>
              <span />
            </CommandPalette>
          </UserIntentProvider>
        </LayoutIntelligence>
        <Toaster />
      </body>
    </html>
  );
}
