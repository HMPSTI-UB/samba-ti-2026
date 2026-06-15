import type { Metadata } from "next";
import { Orbitron, Montserrat } from "next/font/google";
import "./globals.css";
import StarBackground from "@/components/StarBackground";

const orbitron = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZENITH | SAMBA TI 2026",
  description: "Zealous Evolution of New IT Heroes - Website Resmi SAMBA TI 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${orbitron.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-space text-soft-white font-body scanlines relative">
        <StarBackground />
        {children}
      </body>
    </html>
  );
}
