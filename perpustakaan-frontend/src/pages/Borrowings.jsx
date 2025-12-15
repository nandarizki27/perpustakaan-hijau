import { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

// Fungsi helper untuk format tanggal tampilan
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Borrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    book_id: '',
    borrower_name: '',
    borrower_email: '',
    borrow_date: '',
    return_date: '',
    status: 'borrowed',
  });

  useEffect(() => {
    fetchBorrowings();
    fetchBooks();
  }, []);

  const fetchBorrowings = async () => {
    try {
      const response = await api.get('/borrowings');
      setBorrowings(response.data);
    } catch (error) {
      console.error('Error fetching borrowings:', error);
      alert('Gagal memuat data peminjaman');
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/borrowings/${editingId}`, formData);
        alert('Data peminjaman berhasil diupdate');
      } else {
        await api.post('/borrowings', formData);
        alert('Peminjaman berhasil ditambahkan');
      }
      setFormData({
        book_id: '',
        borrower_name: '',
        borrower_email: '',
        borrow_date: '',
        return_date: '',
        status: 'borrowed',
      });
      setShowForm(false);
      setEditingId(null);
      fetchBorrowings();
      fetchBooks(); // Refresh untuk update stok
    } catch (error) {
      console.error('Error saving borrowing:', error);
      alert(error.response?.data?.message || 'Gagal menyimpan peminjaman');
    }
  };

  const handleEdit = (borrowing) => {
    // Fungsi untuk normalize tanggal ke format YYYY-MM-DD
    const normalizeDate = (dateString) => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      } catch (e) {
        return '';
      }
    };

    setFormData({
      book_id: borrowing.book_id,
      borrower_name: borrowing.borrower_name,
      borrower_email: borrowing.borrower_email,
      borrow_date: normalizeDate(borrowing.borrow_date),
      return_date: normalizeDate(borrowing.return_date),
      status: borrowing.status,
    });
    setEditingId(borrowing.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus data peminjaman ini?')) return;

    try {
      await api.delete(`/borrowings/${id}`);
      alert('Data peminjaman berhasil dihapus');
      fetchBorrowings();
      fetchBooks(); // Refresh untuk update stok
    } catch (error) {
      console.error('Error deleting borrowing:', error);
      alert('Gagal menghapus data peminjaman');
    }
  };

  const handleCancel = () => {
    setFormData({
      book_id: '',
      borrower_name: '',
      borrower_email: '',
      borrow_date: '',
      return_date: '',
      status: 'borrowed',
    });
    setShowForm(false);
    setEditingId(null);
  };

  const getStatusBadge = (status) => {
    if (status === 'borrowed') {
      return (
        <span className="badge bg-warning text-dark">
          <i className="bi bi-hourglass-split me-1"></i>
          Dipinjam
        </span>
      );
    }
    return (
      <span className="badge bg-success">
        <i className="bi bi-check-circle me-1"></i>
        Dikembalikan
      </span>
    );
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
            <i className="bi bi-clipboard-check-fill text-warning me-2"></i>
            Data Peminjaman
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`btn ${showForm ? 'btn-secondary' : 'btn-warning'}`}
          >
            <i className={`bi ${showForm ? 'bi-x-circle' : 'bi-plus-circle'} me-2`}></i>
            {showForm ? 'Tutup Form' : 'Tambah Peminjaman'}
          </button>
        </div>

        {showForm && (
          <div className="card shadow-sm mb-4 fade-in">
            <div className="card-header bg-warning">
              <h5 className="mb-0">
                <i className="bi bi-pencil-square me-2"></i>
                {editingId ? 'Edit Peminjaman' : 'Tambah Peminjaman Baru'}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="book_id" className="form-label fw-semibold">
                      <i className="bi bi-book me-2"></i>Buku
                    </label>
                    <select
                      className="form-select"
                      id="book_id"
                      value={formData.book_id}
                      onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                      required
                      disabled={editingId}
                    >
                      <option value="">Pilih Buku</option>
                      {books.map((book) => (
                        <option key={book.id} value={book.id}>
                          {book.title} (Stok: {book.stock})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="borrower_name" className="form-label fw-semibold">
                      <i className="bi bi-person me-2"></i>Nama Peminjam
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="borrower_name"
                      value={formData.borrower_name}
                      onChange={(e) => setFormData({ ...formData, borrower_name: e.target.value })}
                      placeholder="Masukkan nama peminjam"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="borrower_email" className="form-label fw-semibold">
                      <i className="bi bi-envelope me-2"></i>Email Peminjam
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="borrower_email"
                      value={formData.borrower_email}
                      onChange={(e) => setFormData({ ...formData, borrower_email: e.target.value })}
                      placeholder="Masukkan email peminjam"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="borrow_date" className="form-label fw-semibold">
                      <i className="bi bi-calendar-event me-2"></i>Tanggal Pinjam
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="borrow_date"
                      value={formData.borrow_date}
                      onChange={(e) => setFormData({ ...formData, borrow_date: e.target.value })}
                      required
                    />
                  </div>

                  {editingId && (
                    <>
                      <div className="col-md-6">
                        <label htmlFor="return_date" className="form-label fw-semibold">
                          <i className="bi bi-calendar-check me-2"></i>Tanggal Kembali
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="return_date"
                          value={formData.return_date}
                          onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="status" className="form-label fw-semibold">
                          <i className="bi bi-info-circle me-2"></i>Status
                        </label>
                        <select
                          className="form-select"
                          id="status"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          required
                        >
                          <option value="borrowed">Dipinjam</option>
                          <option value="returned">Dikembalikan</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div className="d-flex gap-2 mt-4">
                  <button type="submit" className="btn btn-warning">
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
                    <th>Buku</th>
                    <th>Peminjam</th>
                    <th>Email</th>
                    <th style={{ width: '130px' }}>Tgl Pinjam</th>
                    <th style={{ width: '130px' }}>Tgl Kembali</th>
                    <th style={{ width: '140px' }} className="text-center">Status</th>
                    <th style={{ width: '200px' }} className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowings.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5 text-muted">
                        <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                        <p className="mb-0">Belum ada data peminjaman</p>
                      </td>
                    </tr>
                  ) : (
                    borrowings.map((borrowing) => (
                      <tr key={borrowing.id}>
                        <td className="fw-semibold">{borrowing.id}</td>
                        <td>
                          <span className="fw-bold text-primary">{borrowing.book?.title}</span>
                        </td>
                        <td>{borrowing.borrower_name}</td>
                        <td><small className="text-muted">{borrowing.borrower_email}</small></td>
                        <td>{formatDate(borrowing.borrow_date)}</td>
                        <td>{formatDate(borrowing.return_date)}</td>
                        <td className="text-center">{getStatusBadge(borrowing.status)}</td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button
                              onClick={() => handleEdit(borrowing)}
                              className="btn btn-warning btn-sm"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(borrowing.id)}
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

        {borrowings.length > 0 && (
          <div className="mt-3 text-muted text-end">
            <small>Total: {borrowings.length} peminjaman</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Borrowings;