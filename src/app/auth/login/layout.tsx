import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login Panitia | ZENITH SAMBA TI 2026",
  description: "Login ke portal panitia SAMBA TI 2026",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-space">
      {/* Ambient nebula orbs */}
      <div
        className="nebula w-[600px] h-[600px] -top-48 -left-48"
        style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
      />
      <div
        className="nebula w-[500px] h-[500px] -bottom-32 -right-32"
        style={{ background: "radial-gradient(circle, #38BDF8 0%, transparent 70%)" }}
      />
      <div
        className="nebula w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, #0B1026 0%, transparent 60%)", opacity: 0.4 }}
      />
      {children}
    </div>
  );
}
