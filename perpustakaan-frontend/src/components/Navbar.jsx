import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          <i className="bi bi-book-fill me-2"></i>
          Perpustakaan
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive('/')}`}>
                <i className="bi bi-house-door me-1"></i>
                Beranda
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className={`nav-link ${isActive('/categories')}`}>
                <i className="bi bi-folder me-1"></i>
                Kategori
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books" className={`nav-link ${isActive('/books')}`}>
                <i className="bi bi-book me-1"></i>
                Buku
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/borrowings" className={`nav-link ${isActive('/borrowings')}`}>
                <i className="bi bi-clipboard-check me-1"></i>
                Peminjaman
              </Link>
            </li>

            {user && (
              <>
                <li className="nav-item ms-lg-3">
                  <span className="navbar-text text-white">
                    <i className="bi bi-person-circle me-2"></i>
                    {user.name}
                  </span>
                </li>
                <li className="nav-item ms-lg-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;