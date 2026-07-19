import type { Metadata } from "next";
import { Orbitron, Montserrat, Freeman } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/query-provider";
import { Toaster } from "@/components/ui/toaster";

const orbitron = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
});

const freeman = Freeman({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "ZENITH | SAMBA TI 2026",
  description:
    "Zealous Evolution of New IT Heroes - Website Resmi SAMBA TI 2026",
  icons: [{ rel: "icon", url: "/logo.png", type: "image/png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${orbitron.variable} ${montserrat.variable} ${freeman.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-space text-soft-white font-body relative">
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
