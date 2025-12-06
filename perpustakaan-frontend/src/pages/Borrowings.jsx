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
      return <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">Dipinjam</span>;
    }
    return <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Dikembalikan</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Data Peminjaman</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showForm ? 'Tutup Form' : '+ Tambah Peminjaman'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Peminjaman' : 'Tambah Peminjaman Baru'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Buku</label>
                  <select
                    value={formData.book_id}
                    onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <div>
                  <label className="block text-gray-700 mb-2">Nama Peminjam</label>
                  <input
                    type="text"
                    value={formData.borrower_name}
                    onChange={(e) => setFormData({ ...formData, borrower_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email Peminjam</label>
                  <input
                    type="email"
                    value={formData.borrower_email}
                    onChange={(e) => setFormData({ ...formData, borrower_email: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Tanggal Pinjam</label>
                  <input
                    type="date"
                    value={formData.borrow_date}
                    onChange={(e) => setFormData({ ...formData, borrow_date: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {editingId && (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">Tanggal Kembali</label>
                      <input
                        type="date"
                        value={formData.return_date}
                        onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="borrowed">Dipinjam</option>
                        <option value="returned">Dikembalikan</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {editingId ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Buku</th>
                <th className="px-4 py-3 text-left">Peminjam</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Tgl Pinjam</th>
                <th className="px-4 py-3 text-left">Tgl Kembali</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                    Belum ada data peminjaman
                  </td>
                </tr>
              ) : (
                borrowings.map((borrowing) => (
                  <tr key={borrowing.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{borrowing.id}</td>
                    <td className="px-4 py-3 font-semibold">{borrowing.book?.title}</td>
                    <td className="px-4 py-3">{borrowing.borrower_name}</td>
                    <td className="px-4 py-3">{borrowing.borrower_email}</td>
                    <td className="px-4 py-3">{formatDate(borrowing.borrow_date)}</td>
                    <td className="px-4 py-3">{formatDate(borrowing.return_date)}</td>
                    <td className="px-4 py-3 text-center">
                      {getStatusBadge(borrowing.status)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleEdit(borrowing)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(borrowing.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Borrowings;