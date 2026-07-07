"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Eye, EyeOff, LogIn, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useLogin } from "@/features/auth/hooks/use-login";

// Stagger container: triggers staggerChildren on children
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

// Each child fades up — ease as const literal satisfies Framer Motion Easing type
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function LoginForm() {
  const formId = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isPending, getFieldError } = useLogin();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ email, password });
  }

  return (
    <div className="relative z-10 w-full max-w-md mx-4">
      {/* Glass card with stagger animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="glass-panel p-8 md:p-10"
      >
        {/* Logo icon */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cosmic-purple to-electric-blue shadow-lg shadow-cosmic-purple/30">
            <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
            <span className="absolute inset-0 rounded-2xl ring-2 ring-electric-blue/40 animate-pulse-glow" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-soft-white tracking-wide mb-1">
            PORTAL PANITIA
          </h1>
          <p className="text-sm text-muted-text">ZENITH · SAMBA TI 2026</p>
        </motion.div>

        {/* Form */}
        <form id={`${formId}-login-form`} onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            {/* Username */}
            <motion.div variants={itemVariants}>
              <Input
                id={`${formId}-email`}
                label="Email"
                type="email"
                placeholder="email@student.ub.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={getFieldError("email")}
                autoComplete="email"
                required
                disabled={isPending}
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor={`${formId}-password`}
                  className="text-sm font-medium text-muted-text"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id={`${formId}-password`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password kamu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    disabled={isPending}
                    aria-invalid={!!getFieldError("password")}
                    aria-describedby={
                      getFieldError("password")
                        ? `${formId}-password-error`
                        : undefined
                    }
                    className={cn(
                      "flex h-10 w-full rounded-lg border bg-transparent px-3 py-2 pr-10 text-sm text-soft-white placeholder:text-muted-text transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-1 focus-visible:ring-offset-deep-space disabled:cursor-not-allowed disabled:opacity-40",
                      getFieldError("password")
                        ? "border-destructive focus-visible:ring-destructive"
                        : "border-border-glow hover:border-electric-blue/50",
                    )}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-soft-white transition-colors"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {getFieldError("password") && (
                  <p
                    id={`${formId}-password-error`}
                    className="text-xs text-destructive"
                  >
                    {getFieldError("password")}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={itemVariants} className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isPending}
                disabled={isPending || !email || !password}
                className="w-full"
                id={`${formId}-submit`}
              >
                {!isPending && <LogIn className="w-4 h-4" />}
                {isPending ? "Memproses..." : "Masuk"}
              </Button>
            </motion.div>
          </div>
        </form>

        {/* Footer note */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-center text-xs text-muted-text"
        >
          Hanya untuk panitia resmi SAMBA TI 2026.{" "}
          <br />
          Hubungi admin jika lupa akses.
        </motion.p>
      </motion.div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" as const }}
        className="mx-auto mt-4 h-px w-3/4 bg-gradient-to-r from-transparent via-electric-blue to-transparent"
      />
    </div>
  );
}
