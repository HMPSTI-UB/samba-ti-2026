import { z } from "zod";

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Email, NIM, atau username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
