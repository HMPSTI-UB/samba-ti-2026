# Jobdesk: Create Credentials Login View

**Deadline:** 8 Juli 2026
**PIC:** Diego
**Status:** Done
**Referensi PRD:** Feature 2 - Autentikasi OAuth & Credentials, UI/UX Guidelines

## Konteks
Membuat halaman login khusus untuk **Panitia** (Admin, Kaderisasi, SPV) menggunakan kombinasi *email* dan *password*. Tampilan harus mengikuti pedoman UI/UX kosmik (Cosmic Purple, Electric Blue, Charcoal, Glassmorphism).

## Stack Terkait
- Frontend: Next.js 16 (App Router), React 19
- Styling: Tailwind CSS v4
- Validasi form: React Hook Form + Zod
- Komponen: Shadcn UI (`Input`, `Button`, `Card` dengan custom styling)

## Detail Implementasi
- URL Path: `/auth/login`
- Latar belakang menggunakan efek *nebula* yang dinamis (Three.js/Framer Motion opsional)
- Form dengan 2 field: `email` dan `password`.
- Validasi di sisi klien sebelum dikirim ke Server Action.
- Feedback visual jelas (loading state pada tombol saat *submitting*, pesan error warna neon pink jika gagal login).

## Acceptance Criteria
- [x] Form tampil rapi di layar desktop maupun mobile.
- [x] Input kosong memunculkan pesan validasi merah/neon pink.
- [x] Tombol login *disabled* saat *loading*.
- [x] Desain *glassmorphism* terpasang pada kontainer form.
