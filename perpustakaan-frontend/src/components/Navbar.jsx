import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            📚 Perpustakaan
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/categories" className="hover:text-blue-200">
              Kategori
            </Link>
            <Link to="/books" className="hover:text-blue-200">
              Buku
            </Link>
            <Link to="/borrowings" className="hover:text-blue-200">
              Peminjaman
            </Link>
            
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Halo, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;