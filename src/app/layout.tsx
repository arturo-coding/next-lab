import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Learning Lab",
  description: "Learn Next.js using official documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <div className="flex h-full">
          <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 flex-shrink-0 hidden md:flex flex-col">
            <Sidebar />
          </aside>
          
          <main className="flex-1 overflow-y-auto relative">
            <div className="max-w-4xl mx-auto px-6 py-12">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
