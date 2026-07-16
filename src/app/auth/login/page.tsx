import LoginForm from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="font-heading text-2xl font-bold text-soft-white tracking-wide mb-1">
          PORTAL PANITIA
        </h1>
        <p className="text-sm text-muted-text">ZENITH · SAMBA TI 2026</p>
      </div>

      <LoginForm />

      <p className="mt-6 text-center text-xs text-muted-text">
        Hanya untuk panitia resmi SAMBA TI 2026.{" "}
        <br />
        Hubungi admin jika lupa akses.
      </p>
    </>
  );
}
