# 📚 Sistem Manajemen Perpustakaan

Aplikasi web untuk mengelola perpustakaan dengan fitur CRUD categories, books, dan borrowings.

## 🚀 Teknologi

### Backend
- Laravel 12
- MySQL
- Laravel Sanctum (Authentication)
- REST API

### Frontend
- React JS 18
- React Router DOM
- Axios
- Tailwind CSS

## 📁 Struktur Project
```
sistem-manajemen-perpustakaan/
├── perpustakaan-backend/    # Laravel REST API
└── perpustakaan-frontend/   # React Application
```

## ✨ Fitur

- ✅ Authentication (Login & Register)
- ✅ CRUD Categories
- ✅ CRUD Books
- ✅ CRUD Borrowings
- ✅ Relasi antar tabel
- ✅ Automatic stock management
- ✅ Token-based authentication
- ✅ Responsive design

## 🛠️ Cara Menjalankan Project

### Backend (Laravel)

1. Masuk ke folder backend:
```bash
cd perpustakaan-backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy file .env:
```bash
cp .env.example .env
```

4. Generate key:
```bash
php artisan key:generate
```

5. Setup database di `.env`:
```env
DB_DATABASE=perpustakaan_db
DB_USERNAME=root
DB_PASSWORD=
```

6. Migrate database:
```bash
php artisan migrate
```

7. Install Sanctum:
```bash
php artisan install:api
```

8. Jalankan server:
```bash
php artisan serve
```

Server berjalan di: `http://127.0.0.1:8000`

### Frontend (React)

1. Masuk ke folder frontend:
```bash
cd perpustakaan-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

Server berjalan di: `http://localhost:5173`

## 📸 Tampilan : 

<img width="1920" height="1000" alt="image" src="https://github.com/user-attachments/assets/d435d690-4e30-4bdd-91ef-3d8e5f2e4cc5" />
<br>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7b0fc867-43fe-412e-92d1-5cb96ad1dff9" />
<br>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1b689038-d2fa-4d8d-87ca-eee35813e8d8" />
<br>
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3d78f8c9-7150-4f5e-ae68-244cde9d3e97" />


## 🎥 Video Demo

[Link YouTube Video Presentasi]

## 👨‍💻 Developer

- **Nama:** Moh Irsan Nur Khayan
- **NIM:** G.211.23.0026
- **Prodi:** Teknik Informatika
- **Mata Kuliah:** Rekayasa Web

## 📄 License

This project is for educational purposes.
