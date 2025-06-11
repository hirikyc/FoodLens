# FoodLens Backend

Backend untuk aplikasi FoodLens, dibangun dengan Node.js, Express, dan PostgreSQL.

## Fitur Utama
- Autentikasi: Register, Login, Lupa Password, Reset Password (dengan email)
- RESTful API untuk data user, kategori makanan, dan makanan
- JWT untuk otentikasi
- Nodemailer untuk pengiriman email reset password
- Mendukung environment variable (lihat `.env`)

## Struktur Endpoint
- `POST /api/register` — Registrasi user baru
- `POST /api/login` — Login user
- `POST /api/forgot-password` — Kirim email reset password
- `POST /api/reset-password` — Reset password dengan token
- `GET /api/home` — Endpoint contoh, butuh autentikasi
- `GET /api/kategori` — Ambil semua kategori makanan
- `GET /api/makanan` — Ambil makanan (bisa filter by kategori)

## Konfigurasi Environment
Buat file `.env` di folder ini dengan contoh isi:
```
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=https://your-frontend.netlify.app
```

## Menjalankan Secara Lokal
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan server:
   ```bash
   node index.js
   ```

## Deployment
- Untuk deployment di Vercel, pastikan semua environment variable sudah diatur di dashboard Vercel.
- Link reset password akan otomatis mengikuti `FRONTEND_URL` yang di-set di environment.

## Catatan
- Pastikan email dan password aplikasi Gmail sudah benar dan menggunakan App Password (bukan password biasa).
- Semua response API menggunakan format `{ message, data }`.

---

FoodLens Backend © 2025
