import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">
            <i className="bi bi-building text-primary me-3"></i>
            Sistem Manajemen Perpustakaan
          </h1>
          <p className="lead text-muted">Kelola perpustakaan Anda dengan mudah dan efisien</p>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <Link to="/categories" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <i className="bi bi-folder-fill text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3 className="card-title fw-bold mb-3">Kategori</h3>
                  <p className="card-text text-muted">
                    Kelola dan organisir kategori buku perpustakaan Anda
                  </p>
                  <div className="mt-3">
                    <span className="btn btn-outline-primary">
                      Lihat Kategori <i className="bi bi-arrow-right ms-2"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/books" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <i className="bi bi-book-fill text-success" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3 className="card-title fw-bold mb-3">Buku</h3>
                  <p className="card-text text-muted">
                    Tambah, edit, dan kelola koleksi buku perpustakaan
                  </p>
                  <div className="mt-3">
                    <span className="btn btn-outline-success">
                      Lihat Buku <i className="bi bi-arrow-right ms-2"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/borrowings" className="text-decoration-none">
              <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                <div className="card-body text-center p-4">
                  <div className="mb-4">
                    <i className="bi bi-clipboard-check-fill text-warning" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <h3 className="card-title fw-bold mb-3">Peminjaman</h3>
                  <p className="card-text text-muted">
                    Monitor dan kelola data peminjaman buku
                  </p>
                  <div className="mt-3">
                    <span className="btn btn-outline-warning">
                      Lihat Peminjaman <i className="bi bi-arrow-right ms-2"></i>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm bg-primary text-white">
              <div className="card-body p-5 text-center">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-lightbulb me-2"></i>
                  Fitur Unggulan
                </h4>
                <div className="row mt-4">
                  <div className="col-md-3">
                    <i className="bi bi-shield-check fs-1 mb-2"></i>
                    <p className="mb-0">Aman & Terpercaya</p>
                  </div>
                  <div className="col-md-3">
                    <i className="bi bi-speedometer2 fs-1 mb-2"></i>
                    <p className="mb-0">Cepat & Efisien</p>
                  </div>
                  <div className="col-md-3">
                    <i className="bi bi-phone fs-1 mb-2"></i>
                    <p className="mb-0">Responsive Design</p>
                  </div>
                  <div className="col-md-3">
                    <i className="bi bi-graph-up fs-1 mb-2"></i>
                    <p className="mb-0">Manajemen Mudah</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;