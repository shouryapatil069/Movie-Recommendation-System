import { Link, useNavigate } from 'react-router-dom';
import { Film, Search, User } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recommendations?movie=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Film className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold tracking-wider">Cinematica</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
              <Link to="/trending" className="text-sm font-medium hover:text-primary transition-colors text-textMuted">Trending</Link>
              <Link to="/categories" className="text-sm font-medium hover:text-primary transition-colors text-textMuted">Categories</Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors text-textMuted">About</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 w-64 transition-all"
              />
              <Search className="w-4 h-4 absolute left-3 top-2 text-textMuted" />
            </form>
            <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
              <User className="w-5 h-5 text-textMuted hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
