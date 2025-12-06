import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Sistem Manajemen Perpustakaan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/categories"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">Kategori</h2>
            <p className="text-gray-600">Kelola kategori buku perpustakaan</p>
          </Link>

          <Link
            to="/books"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">📖</div>
            <h2 className="text-2xl font-bold mb-2">Buku</h2>
            <p className="text-gray-600">Kelola koleksi buku perpustakaan</p>
          </Link>

          <Link
            to="/borrowings"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-2xl font-bold mb-2">Peminjaman</h2>
            <p className="text-gray-600">Kelola data peminjaman buku</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;