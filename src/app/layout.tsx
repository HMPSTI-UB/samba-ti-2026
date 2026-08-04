import type { Metadata } from "next";
import { Orbitron, Montserrat, Freeman, Sonsie_One, Poppins } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/query-provider";
import SweetAlertProvider from "@/components/common/sweet-alert-provider";
import Navbar from "@/components/layout/navbar-controller";
import SmoothScroll from "@/components/common/smooth-scroll";


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

const sonsieOne = Sonsie_One({
  variable: "--font-sonsie",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SAMBA TI 2026",
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
      className={`${orbitron.variable} ${montserrat.variable} ${freeman.variable} ${sonsieOne.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-space text-soft-white font-poppins relative">
        <Navbar />
        <QueryProvider>
          <SweetAlertProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </SweetAlertProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
