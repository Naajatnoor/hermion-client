
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "../components/ui/sonner";

import Footer from "../components/homepage/Footer";
import Navbar from "../components/homepage/Navbar";
import { ThemeProvider } from "../components/themeToggle/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hermione - Make an Impact",
  description: "Connect with volunteering opportunities and make an impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#F7F5ED] text-[#26352E] dark:bg-black dark:text-white">
        <ThemeProvider>
          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Toaster position="top-right" richColors />

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
