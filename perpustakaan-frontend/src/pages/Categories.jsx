import { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Gagal memuat data kategori');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, formData);
        alert('Kategori berhasil diupdate');
      } else {
        await api.post('/categories', formData);
        alert('Kategori berhasil ditambahkan');
      }
      setFormData({ name: '', description: '' });
      setShowForm(false);
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Gagal menyimpan kategori');
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus kategori ini?')) return;

    try {
      await api.delete(`/categories/${id}`);
      alert('Kategori berhasil dihapus');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Gagal menghapus kategori');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '' });
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
            <i className="bi bi-folder-fill text-primary me-2"></i>
            Kategori Buku
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`btn ${showForm ? 'btn-secondary' : 'btn-primary'}`}
          >
            <i className={`bi ${showForm ? 'bi-x-circle' : 'bi-plus-circle'} me-2`}></i>
            {showForm ? 'Tutup Form' : 'Tambah Kategori'}
          </button>
        </div>

        {showForm && (
          <div className="card shadow-sm mb-4 fade-in">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-pencil-square me-2"></i>
                {editingId ? 'Edit Kategori' : 'Tambah Kategori Baru'}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold">
                    <i className="bi bi-tag me-2"></i>Nama Kategori
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Masukkan nama kategori"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label fw-semibold">
                    <i className="bi bi-card-text me-2"></i>Deskripsi
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Masukkan deskripsi kategori (opsional)"
                    rows="3"
                  />
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
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
                    <th style={{ width: '80px' }}>ID</th>
                    <th>Nama Kategori</th>
                    <th>Deskripsi</th>
                    <th style={{ width: '120px' }} className="text-center">Jumlah Buku</th>
                    <th style={{ width: '200px' }} className="text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5 text-muted">
                        <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                        <p className="mb-0">Belum ada data kategori</p>
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category.id}>
                        <td className="fw-semibold">{category.id}</td>
                        <td>
                          <span className="fw-bold text-primary">{category.name}</span>
                        </td>
                        <td className="text-muted">{category.description || '-'}</td>
                        <td className="text-center">
                          <span className="badge bg-info">{category.books?.length || 0}</span>
                        </td>
                        <td className="text-center">
                          <div className="btn-group" role="group">
                            <button
                              onClick={() => handleEdit(category)}
                              className="btn btn-warning btn-sm"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button
                              onClick={() => handleDelete(category.id)}
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

        {categories.length > 0 && (
          <div className="mt-3 text-muted text-end">
            <small>Total: {categories.length} kategori</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;