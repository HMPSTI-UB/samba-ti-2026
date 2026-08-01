import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <div className="max-w-5xl w-full mx-auto px-4 font-poppins">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-border-glow bg-transparent text-soft-white hover:bg-white/5 h-10 px-5 text-sm font-semibold gap-2 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 items-center gap-12">
        <div className="glass-panel border-purple-500/30 p-8 md:p-10 flex flex-col items-center text-center gap-2">
          <Image
            src="/logo.png"
            alt="ZENITH SAMBA TI 2026"
            width={120}
            height={120}
            priority
            className="object-contain"
          />
          <span className="text-soft-white font-bold font-heading tracking-[6px] uppercase mt-2">
            SAMBA TI 2026
          </span>
          <span className="text-star-gold font-display coming-shadow uppercase tracking-[10px] text-5xl md:text-6xl">
            ZENITH
          </span>
          <p className="text-[10px] md:text-sm text-soft-white/80 font-poppins tracking-[2px] md:tracking-[3px] uppercase text-center mt-1">
            Zealous Evolution of New IT Heroes
          </p>
          <div className="mt-5 flex flex-col items-center gap-2 w-full">
            <div className="w-44 h-2.5 rounded-full bg-purple-500/50 blur-md" />
            <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-soft-white tracking-wide mb-1">
              Selamat Datang
            </h1>
            <p className="text-sm text-muted-text">
              Masuk untuk melanjutkan ke SAMBA TI 2026.
            </p>
          </div>

          <LoginForm />

          <p className="mt-6 text-center text-xs text-muted-text">
            Hanya untuk pengguna resmi SAMBA TI 2026.{" "}
            <br />
            Hubungi admin jika lupa akses.
          </p>
        </div>
      </div>
    </div>
  );
}
