import { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publication_year: '',
    stock: '',
    category_id: '',
  });

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Gagal memuat data buku');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/books/${editingId}`, formData);
        alert('Buku berhasil diupdate');
      } else {
        await api.post('/books', formData);
        alert('Buku berhasil ditambahkan');
      }

      setFormData({
        title: '',
        author: '',
        isbn: '',
        publication_year: '',
        stock: '',
        category_id: '',
      });
      setShowForm(false);
      setEditingId(null);
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan buku');
    }
  };

  const handleEdit = (book) => {
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publication_year: book.publication_year,
      stock: book.stock,
      category_id: book.category_id,
    });
    setEditingId(book.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus buku ini?')) return;

    try {
      await api.delete(`/books/${id}`);
      alert('Buku berhasil dihapus');
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Gagal menghapus buku');
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      publication_year: '',
      stock: '',
      category_id: '',
    });
    setShowForm(false);
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-light">
        <Navbar />
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">
            <i className="bi bi-book-fill text-success me-2"></i>
            Daftar Buku
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`btn ${showForm ? 'btn-secondary' : 'btn-success'}`}
          >
            <i className={`bi ${showForm ? 'bi-x-circle' : 'bi-plus-circle'} me-2`}></i>
            {showForm ? 'Tutup Form' : 'Tambah Buku'}
          </button>
        </div>

        {showForm && (
          <div className="card shadow-sm mb-4 fade-in">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-pencil-square me-2"></i>
                {editingId ? 'Edit Buku' : 'Tambah Buku Baru'}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="title" className="form-label fw-semibold">
                      <i className="bi bi-book me-2"></i>Judul Buku
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Masukkan judul buku"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="author" className="form-label fw-semibold">
                      <i className="bi bi-person me-2"></i>Penulis
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Masukkan nama penulis"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="isbn" className="form-label fw-semibold">
                      <i className="bi bi-upc me-2"></i>ISBN
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="isbn"
                      value={formData.isbn}
                      onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                      placeholder="Masukkan nomor ISBN"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="publication_year" className="form-label fw-semibold">
                      <i className="bi bi-calendar me-2"></i>Tahun Terbit
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="publication_year"
                      value={formData.publication_year}
                      onChange={(e) => setFormData({ ...formData, publication_year: e.target.value })}
                      placeholder="Contoh: 2024"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="stock" className="form-label fw-semibold">
                      <i className="bi bi-box-seam me-2"></i>Stok
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="Jumlah stok buku"
                      required
                      min="0"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="category_id" className="form-label fw-semibold">
                      <i className="bi bi-folder me-2"></i>Kategori
                    </label>
                    <select
                      className="form-select"
                      id="category_id"
                      value={formData.category_id}
                      onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                      required
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-check-circle me-2"></i>
                    {editingId ? 'Update' : 'Simpan'}
                  </button>
                  <button type="button" onClick={handleCancel} className="btn btn-secondary">
                    <i className="bi bi-x-circle me-2"></i>
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>ID</th>
                    <th>Judul</th>
                    <th>Penulis</th>
                    <th>ISBN</th>
                    <th style={{ width: '100px' }}>Tahun</th>
                    <th>Kategori</th>
                    <th style={{ width: '80px' }} className="text-center">Stok</th>
                    <th style={{ width: '200px' }} className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5 text-muted">
                        <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                        <p className="mb-0">Belum ada data buku</p>
                      </td>
                    </tr>
                  ) : (
                    books.map((book) => (
                      <tr key={book.id}>
                        <td className="fw-semibold">{book.id}</td>
                        <td>
                          <span className="fw-bold text-success">{book.title}</span>
                        </td>
                        <td>{book.author}</td>
                        <td><code>{book.isbn}</code></td>
                        <td>{book.publication_year}</td>
                        <td>
                          <span className="badge bg-primary">{book.category?.name}</span>
                        </td>
                        <td className="text-center">
                          <span className={`badge ${book.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                            {book.stock}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button
                              onClick={() => handleEdit(book)}
                              className="btn btn-warning btn-sm"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(book.id)}
                              className="btn btn-danger btn-sm"
                              title="Hapus"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {books.length > 0 && (
          <div className="mt-3 text-muted text-end">
            <small>Total: {books.length} buku</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;