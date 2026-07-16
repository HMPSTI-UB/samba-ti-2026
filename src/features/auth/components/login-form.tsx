"use client";

import { Eye, EyeOff, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "@/features/auth/hooks/use-login-form";

export default function LoginForm() {
  const { formId, register, handleSubmit, errors, onSubmit, isPending, showPassword, togglePassword } =
    useLoginForm();

  return (
    <form id={`${formId}-login-form`} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="email@student.ub.ac.id"
          error={errors.email?.message}
          autoComplete="email"
          required
          disabled={isPending}
          {...register("email")}
        />

        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Masukkan password kamu"
          error={errors.password?.message}
          autoComplete="current-password"
          required
          disabled={isPending}
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              onClick={togglePassword}
              className="hover:text-soft-white transition-colors"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
          {...register("password")}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isPending}
            disabled={isPending}
            className="w-full"
          >
            {!isPending && <LogIn className="w-4 h-4" />}
            {isPending ? "Memproses..." : "Masuk"}
          </Button>
        </div>
      </div>
    </form>
  );
}
