# Perpustakaan Backend API

REST API untuk Sistem Manajemen Perpustakaan menggunakan Laravel.

## Setup
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan install:api
php artisan serve
```

## API Endpoints

### Authentication
- `POST /api/register` - Register user
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Borrowings
- `GET /api/borrowings` - Get all borrowings
- `POST /api/borrowings` - Create borrowing
- `PUT /api/borrowings/{id}` - Update borrowing
- `DELETE /api/borrowings/{id}` - Delete borrowing
