# 📘 Panduan Lengkap Deployment BonekaKu v3 ke cPanel

Panduan ini berisi langkah-langkah resmi, teruji, dan standar operasional untuk melakukan deployment proyek **BonekaKu v3** (Frontend React Vite + Backend Laravel REST API) ke layanan web hosting cPanel.

---

## 🌐 Informasi Subdomain & Direktori Produksi

| Komponen | Subdomain Produksi | Document Root di cPanel |
| :--- | :--- | :--- |
| **Frontend (React)** | `https://bonekaku.kembangin.online` | `/public_html/bonekaku.kembangin.online` |
| **Backend (Laravel API)** | `https://api-bonekaku.kembangin.online` | `/public_html/api-bonekaku.kembangin.online/public` |

---

## 🔐 Kredensial Resmi Akun

### 1. Akun Admin Website (Aplikasi Web)
Digunakan untuk login ke dashboard admin website:
- **URL Login:** `https://bonekaku.kembangin.online/login`
- **Email:** `admin@bonekaku.id`
- **Password:** `[PASSWORD_ADMIN_ANDA]`

### 2. Akun Database MySQL (cPanel)
Digunakan oleh konfigurasi `.env` backend Laravel:
- **Database Name:** `stagingktk_bonekaku`
- **Database User:** `stagingktk_bonekaku`
- **Database Password:** `"[PASSWORD_DB_ANDA]"` *(Wajib diapit tanda petik dua di `.env`)*
- **Host:** `localhost`

---

## 🚀 Langkah-Langkah Deployment (Step-by-Step)

### TAHAP 1: Membuat Subdomain di cPanel
1. Masuk ke dashboard cPanel -> cari menu **Domains** (atau **Subdomains**).
2. Klik tombol **Create A New Domain**.
3. **Subdomain Frontend**:
   - Domain: `bonekaku.kembangin.online`
   - Hilangkan centang pada *"Share document root"*.
   - Document Root: `public_html/bonekaku.kembangin.online`
   - Klik **Submit**.
4. **Subdomain Backend API**:
   - Domain: `api-bonekaku.kembangin.online`
   - Hilangkan centang pada *"Share document root"*.
   - Document Root: `public_html/api-bonekaku.kembangin.online/public` *(Wajib diakhiri `/public`)*.
   - Klik **Submit**.

---

### TAHAP 2: Menyiapkan Database & Import Data
1. Buka menu **Database Wizard** di cPanel:
   - **Step 1 (Nama Database):** Masukkan `bonekaku` (hasil: `stagingktk_bonekaku`). Klik *Next Step*.
   - **Step 2 (User Database):** Masukkan username `bonekaku` dan buat password (misal: `[PASSWORD_DB_ANDA]`). Klik *Create User*.
   - **Step 3 (Hak Akses):** Centang **ALL PRIVILEGES**. Klik *Make Changes*.
2. Kembali ke beranda cPanel, buka **phpMyAdmin**:
   - Di panel kiri, klik database `stagingktk_bonekaku`.
   - Klik tab menu **Import** di deretan atas.
   - Pada bagian *Choose File / Pilih Berkas*, pilih file:  
     `bonekaku-v3/bonekaku.sql`
   - Gulir ke bawah dan klik tombol **Import** (atau **Kirim**).
   - Pastikan muncul notifikasi hijau tanda semua tabel sukses ter-import.

---

### TAHAP 3: Deployment Backend (Laravel API)
1. Siapkan file kompresi `backend.zip` yang berisi folder proyek backend (termasuk `vendor/`, `storage/`, `app/`, `config/`, dll., **tanpa** `.git` dan cache lokal).
2. Buka **File Manager** cPanel, masuk ke folder:  
   `/public_html/api-bonekaku.kembangin.online`
3. Klik tombol **Upload**, unggah file `backend.zip`.
4. Setelah selesai, klik kanan `backend.zip` -> pilih **Extract** (ekstrak di dalam folder tersebut).
5. Konfigurasi file **`.env`**:
   - Aktifkan fitur *Show Hidden Files (dotfiles)* di Settings pojok kanan atas File Manager.
   - Ubah nama `.env.production` menjadi **`.env`**.
   - Klik kanan `.env` -> **Edit**, dan pastikan konfigurasinya:
     ```env
     APP_NAME=BonekaKu
     APP_ENV=production
     APP_KEY=base64:your_app_key_here
     APP_DEBUG=false
     APP_URL=https://api-bonekaku.kembangin.online

     DB_CONNECTION=mysql
     DB_HOST=localhost
     DB_PORT=3306
     DB_DATABASE=stagingktk_bonekaku
     DB_USERNAME=stagingktk_bonekaku
     DB_PASSWORD="[PASSWORD_DB_ANDA]"

     SESSION_DRIVER=database
     FILESYSTEM_DISK=public
     FRONTEND_URL=https://bonekaku.kembangin.online
     ```
   - Klik **Save Changes**.

#### 🛡️ Memasang Gembok Pengaman `.htaccess` di Folder Induk:
Jika folder backend berada di dalam `public_html`, buat file `.htaccess` langsung di `/public_html/api-bonekaku.kembangin.online/.htaccess` dengan isi:
```apache
# Kunci dan blokir semua akses luar ke file .env dan file sensitif
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>

# Blokir akses langsung ke folder internal
RedirectMatch 403 ^/(vendor|storage|config|app)/
```
*(Langkah ini mengunci file `.env` dari intipan domain induk, menghasilkan status **403 Forbidden**).*

#### 🔗 Mengaktifkan Symlink Storage (Penting untuk Gambar):
1. Masuk ke folder `/public_html/api-bonekaku.kembangin.online/public`.
2. Jika ada folder bernama `storage` hasil ekstrak statis, klik kanan lalu **Delete** folder `storage` tersebut.
3. Buka URL ini sekali di web browser:  
   👉 `https://api-bonekaku.kembangin.online/symlink-storage`
4. Akan muncul respons JSON: `{"status":"success","message":"Storage link created successfully!"}`.  
   *(Kini seluruh gambar di `storage/app/public` langsung terhubung secara live).*

---

### TAHAP 4: Deployment Frontend (React SPA)
1. Di komputer lokal, jalankan build produksi:
   ```bash
   cd frontend
   npm run build
   ```
2. Kompresi seluruh isi folder `frontend/dist/` menjadi file `frontend.zip`.
3. Buka **File Manager** cPanel, masuk ke folder:  
   `/public_html/bonekaku.kembangin.online`
4. Klik **Upload**, lalu unggah `frontend.zip`.
5. Klik kanan `frontend.zip` -> pilih **Extract** ke folder tersebut.
6. Pastikan file **`.htaccess`** di folder frontend berisi aturan penanganan SPA & DirectoryIndex yang ramah cPanel:
   ```apache
   DirectoryIndex index.html

   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule ^ index.html [L]
   </IfModule>
   ```
   > ⚠️ **Catatan:** Jangan menambahkan baris `Options -MultiViews` karena aturan keamanan hosting cPanel melarang direktif ini dan dapat menyebabkan HTTP 500.

---

## 🛠️ Panduan Pemecahan Masalah (Troubleshooting)

| Gejala Masalah | Penyebab Utama | Solusi |
| :--- | :--- | :--- |
| **500 Server Error** saat buka `api-bonekaku...` | Password di `.env` terpotong simbol `#` atau `DB_HOST` masih `127.0.0.1` | Ubah `DB_HOST=localhost` dan apit password dengan tanda petik dua: `DB_PASSWORD="...#"` |
| **500 Internal Server Error** saat buka `bonekaku...` (Frontend) | File `.htaccess` memuat baris `Options -MultiViews` atau belum ada `DirectoryIndex index.html` | Hapus baris `Options` dan tambahkan `DirectoryIndex index.html` di baris paling atas `.htaccess` |
| **Gambar artikel baru tidak muncul / pecah** | Folder `public/storage` masih statis dan belum disymlink | Hapus folder `public/storage`, lalu panggil `https://api-bonekaku.kembangin.online/symlink-storage` |
| **Form tambah artikel gagal simpan** | Input Judul Artikel belum diisi / kolom tidak terisi | Pastikan form mengirim field `title` karena wajib di database |
