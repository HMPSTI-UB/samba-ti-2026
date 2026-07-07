# Jobdesk: Create Auth API Call

**Deadline:** 8 Juli 2026
**PIC:** Diego
**Status:** Done
**Referensi PRD:** Feature 2 - Autentikasi OAuth & Credentials, API Integration

## Konteks
Membuat fungsi pemanggil API (API Client / Server Action) yang menghubungkan Frontend dengan endpoint Hono Backend yang dibuat oleh Jonathan untuk proses Login.

## Stack Terkait
- Frontend: Next.js 16 (Server Actions)
- API Client: Axios (via `src/lib/api/client.ts` dan `src/lib/api/server.ts`)
- Cookie Management: `next/headers` (`cookies()`)

## Detail Implementasi
- Membuat definisi tipe TypeScript (`LoginPayload`, `AuthTokens`, `User`).
- Membuat `loginAction` yang membungkus *request* Axios ke `POST /auth/login`.
- Menerima JWT *Access Token* dan *Refresh Token* dari backend.
- Menulis token tersebut secara mandiri ke dalam `http-only` cookies untuk menjaga keamanan (XSS protection).
- Redirect otomatis ke `/portal` (via Proxy) apabila login sukses.

## Integrasi Backend
- Berkorelasi dengan endpoint `POST /auth/login` (Jonathan).
- Bergantung pada ketersediaan schema JWT.

## Acceptance Criteria
- [x] Fungsi API melempar *error* dengan pesan informatif bila *credentials* salah.
- [x] Fungsi menyimpan *access_token* dan *refresh_token* ke dalam *cookie* dengan atribut `httpOnly`, `secure`, dan `sameSite: "lax"`.
- [x] Data *user* dan *role* yang di-*decode* bisa dipakai di Layout (Sidebar).
