# 🧸 BonekaKu v3 (React SPA + Laravel REST API)

Website resmi **BonekaKu v3** — Pusat Souvenir, Boneka Custom, Bantal, Maskot, dan Badut Terlengkap. Dibangun menggunakan arsitektur *decoupled* modern yang memisahkan Frontend Client (React Vite) dan Backend API Service (Laravel 12).

---

## 🌐 Alamat Website & API (Live Production)

- **Frontend Website:** [https://bonekaku.kembangin.online](https://bonekaku.kembangin.online)
- **Backend API:** [https://api-bonekaku.kembangin.online](https://api-bonekaku.kembangin.online)
- **Health Check API:** [https://api-bonekaku.kembangin.online/](https://api-bonekaku.kembangin.online/)

---

## 🔐 Kredensial Akun Resmi

### 1. Akun Admin Website (Login Dashboard)
Digunakan untuk mengakses dan mengelola dashboard admin BonekaKu (Katalog, Artikel, dan Komentar):
- **URL Login:** [https://bonekaku.kembangin.online/login](https://bonekaku.kembangin.online/login)
- **Email:** `admin@bonekaku.id`
- **Password:** `[PASSWORD_ADMIN_ANDA]`

> ⚠️ **PERINGATAN:** Akun ini adalah satu-satunya akun administrator aktif. Jangan mengubah email, password, atau menghapus akun ini tanpa koordinasi dengan pemilik sistem.

### 2. Akun Database Server (cPanel Hosting)
Digunakan oleh konfigurasi `.env` backend Laravel di server produksi:
- **Database:** `stagingktk_bonekaku`
- **User:** `stagingktk_bonekaku`
- **Password:** `"[PASSWORD_DB_ANDA]"` *(Wajib diapit tanda petik dua di `.env`)*
- **Host:** `localhost`

---

## 🏗️ Arsitektur & Teknologi

### Frontend (`frontend/`)
- **Framework:** React 19 + Vite
- **Styling:** Vanilla CSS murni dengan palet warna terkurasi dan tata letak responsif
- **Animasi:** Swiper.js untuk *3D Coverflow Carousel* dan transisi micro-animation
- **Fitur Utama:**
  - Katalog produk interaktif dengan modal detail produk
  - Artikel blog dengan integrasi profil penulis khusus (`/author/:name`)
  - Penanganan placeholder otomatis jika artikel tidak memiliki gambar
  - Formulir komentar interaktif dengan sistem moderasi admin
  - Dashboard Admin dengan *sticky table headers* dan *internal scroll*
  - Desain sepenuhnya responsif untuk smartphone dan desktop

### Backend (`backend/`)
- **Framework:** Laravel 12 (PHP 8.2+)
- **Database:** MySQL
- **Autentikasi:** Token-based API Authentication
- **Media Storage:** Laravel Storage Disk (symlinked ke `public/storage`)
- **CORS:** Diaktifkan untuk mendukung panggilan lintas subdomain

---

## 💻 Panduan Menjalankan di Lokal (Development)

### 1. Prasyarat Sistem
- PHP >= 8.2 & Composer
- Node.js >= 18 & npm
- MySQL Server (XAMPP / Laragon)

### 2. Setup Database Lokal
1. Nyalakan service Apache dan MySQL di XAMPP / Laragon.
2. Buat database baru bernama `bonekaku`.
3. Import file `bonekaku.sql` yang berada di folder utama proyek:
   ```bash
   # Melalui terminal atau phpMyAdmin lokal
   mysql -u root bonekaku < bonekaku.sql
   ```

### 3. Menjalankan Backend (Laravel)
```bash
cd backend
cp .env.example .env   # jika belum ada .env lokal
php artisan serve --port=8000
```
API backend akan aktif di: `http://127.0.0.1:8000`

### 4. Menjalankan Frontend (React Vite)
Buka terminal baru:
```bash
cd frontend
npm install
npm run dev -- --port 5173
```
Aplikasi frontend akan aktif di: `http://localhost:5173`

---

## 📦 Panduan Deployment ke cPanel Hosting

Panduan langkah demi langkah yang lengkap, teruji, dan mencakup solusi masalah (*troubleshooting*) deployment cPanel telah didokumentasikan secara khusus di:

👉 **[PANDUAN_DEPLOYMENT_CPANEL.md](./PANDUAN_DEPLOYMENT_CPANEL.md)**

Rangkuman alur deployment:
1. **Subdomain:** Buat `bonekaku.kembangin.online` dan `api-bonekaku.kembangin.online` (document root `.../public`).
2. **Database:** Buat database via *Database Wizard* di cPanel dan import file `bonekaku.sql`.
3. **Backend:** Upload `backend.zip`, ekstrak, atur `.env`, dan panggil route symlink `/symlink-storage`.
4. **Frontend:** Build dengan `npm run build`, upload `frontend.zip` (atau `frontend_update.zip`), dan pastikan `.htaccess` memiliki `DirectoryIndex index.html`.

---

## 📁 Struktur Direktori Proyek

```text
bonekaku-v3/
├── backend/                      # Source code REST API Laravel
│   ├── app/Http/Controllers/     # API Controllers (Katalog, Artikel, Komentar, Auth)
│   ├── config/cors.php           # Konfigurasi CORS lintas domain
│   ├── routes/api.php            # Route endpoint API publik & admin
│   ├── routes/web.php            # Route helper (symlink-storage, health check)
│   └── .env.production           # Template konfigurasi production cPanel
├── frontend/                     # Source code SPA React Vite
│   ├── src/pages/                # Halaman publik & admin
│   │   ├── admin/                # Dashboard Admin (Katalog, Artikel, Komentar)
│   │   ├── AuthorPage.jsx        # Halaman khusus profil penulis artikel
│   │   └── ...                   # Halaman Katalog, Layanan, Tentang Kami, dll.
│   ├── public/.htaccess          # Konfigurasi routing Apache cPanel
│   └── dist/                     # Hasil kompilasi siap upload produksi
├── bonekaku.sql                  # Dump database MySQL lengkap & bersih
├── backend.zip                   # Arsip siap upload backend ke cPanel
├── frontend.zip                  # Arsip siap upload frontend ke cPanel
├── frontend_update.zip           # Paket update ringan (150 KB) untuk frontend
├── PANDUAN_DEPLOYMENT_CPANEL.md  # Panduan resmi deployment hosting cPanel
└── README.md                     # Dokumentasi utama proyek
```
