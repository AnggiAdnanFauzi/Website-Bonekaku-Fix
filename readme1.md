# 🧸 BonekaKu v3 (React SPA + Laravel REST API)

Website resmi **BonekaKu v3** — Platform Web Modern untuk Katalog Produk Souvenir, Boneka Custom, Bantal Promosi, Maskot, dan Badut. Dibangun menggunakan arsitektur *decoupled* yang memisahkan Frontend SPA (Single Page Application) dan Backend RESTful API Service.

---

## 🏗️ Arsitektur & Teknologi (Tech Stack)

### Frontend (`frontend/`)
- **Framework & Tooling:** React 19 + Vite
- **Routing:** React Router DOM
- **Styling:** Modern Vanilla CSS (Clean CSS Variables, Responsive Grid & Flexbox)
- **Komponen & Interaktivitas:**
  - Swiper.js untuk *3D Coverflow Carousel* dan slider showcase produk
  - Canvas confetti / particle background visual
  - Axios untuk integrasi REST API
- **Fitur Frontend:**
  - Katalog produk dinamis dengan filter kategori dan modal detail produk
  - Halaman artikel / blog dengan sistem pagination & profil penulis (`/author/:name`)
  - Penanganan placeholder otomatis untuk produk/artikel tanpa gambar
  - Form komentar artikel dengan validasi interaktif
  - Dashboard manajemen Admin (Katalog, Artikel, Komentar) dengan antarmuka responsif

### Backend Service (`backend/`)
- **Framework:** Laravel 12 (PHP >= 8.2)
- **Database Engine:** MySQL / MariaDB
- **Autentikasi API:** Token-based API Authentication (Laravel Sanctum)
- **Manajemen Berkas:** Laravel Storage Disk (disymlink ke `public/storage`)
- **Middleware & Keamanan:**
  - CORS Middleware terkonfigurasi untuk komunikasi lintas domain/subdomain
  - Validasi input ketat pada setiap endpoint API

---

## 🗄️ Skema Database & Migrasi (Migrations)

Proyek ini menggunakan sistem Laravel Database Migrations untuk mengelola struktur basis data secara otomatis dan konsisten tanpa perlu import manual data sensitif.

### Daftar Tabel Utama:
1. **`katalogs`**: Menyimpan data produk boneka, souvenir, bantal, spesifikasi, dan file gambar produk.
2. **`artikels`**: Menyimpan data posting artikel, slug ramah SEO, konten blog, cover gambar, penulis, dan tanggal rilis.
3. **`komentars`**: Menyimpan data interaksi komentar pembaca pada artikel beserta status moderasi.
4. **`users`**: Tabel pengguna untuk autentikasi administrator ke dashboard.
5. **`personal_access_tokens`**: Token bearer untuk otorisasi sesi API yang aman.

### Menjalankan Migrasi Database:
Untuk membangun seluruh struktur tabel dari awal:
```bash
cd backend
php artisan migrate
```

Jika ingin mereset dan menjalankan ulang seluruh migrasi:
```bash
php artisan migrate:fresh
```

---

## 💻 Panduan Menjalankan di Lingkungan Lokal (Development)

### 1. Prasyarat Sistem
- PHP >= 8.2 & Composer
- Node.js >= 18 & npm
- MySQL Server (XAMPP / Laragon / Docker)

### 2. Konfigurasi & Menjalankan Backend (Laravel)
```bash
cd backend

# 1. Pasang dependensi PHP
composer install

# 2. Salin template environment
cp .env.example .env

# 3. Generate Application Key
php artisan key:generate

# 4. Hubungkan media storage
php artisan storage:link

# 5. Jalankan migrasi database
php artisan migrate

# 6. Jalankan local development server
php artisan serve --port=8000
```
Backend API akan aktif di: `http://127.0.0.1:8000`

### 3. Konfigurasi & Menjalankan Frontend (React Vite)
Buka terminal baru:
```bash
cd frontend

# 1. Pasang dependensi Node.js
npm install

# 2. Salin template environment
cp .env.example .env

# 3. Jalankan server pengembangan Vite
npm run dev -- --port 5173
```
Aplikasi frontend akan aktif di: `http://localhost:5173`

---

## 📁 Struktur Direktori Proyek

```text
bonekaku-v3/
├── backend/                      # Service REST API Laravel
│   ├── app/Http/Controllers/     # Controller API (Katalog, Artikel, Komentar, Auth)
│   ├── config/cors.php           # Konfigurasi komunikasi API (CORS)
│   ├── database/migrations/      # Definisi skema tabel & migrasi database
│   ├── routes/api.php            # Endpoint route API
│   ├── routes/web.php            # Route helper
│   └── .env.example              # Template konfigurasi environment backend
├── frontend/                     # Client Web App React Vite
│   ├── src/pages/                # Halaman publik & panel admin
│   │   ├── admin/                # Dashboard Admin (Katalog, Artikel, Komentar)
│   │   ├── AuthorPage.jsx        # Profil khusus penulis artikel
│   │   └── ...                   # Halaman Katalog, Layanan, Tentang Kami, dll.
│   ├── src/components/           # Komponen UI modular & reaktif
│   ├── public/                   # Aset statis & styling pendukung
│   └── .env.example              # Template konfigurasi environment frontend
├── .gitignore                    # Konfigurasi pengabaian berkas sensitif & dependensi
└── README.md                     # Dokumentasi teknis proyek
```
