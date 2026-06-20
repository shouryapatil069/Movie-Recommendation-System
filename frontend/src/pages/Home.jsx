import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api/movieApi';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        // Take top 8 categories for the home page
        setCategories(data.categories.slice(0, 8));
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/recommendations?movie=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <img 
            src="https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Find Your Next <span className="text-primary">Favorite</span> Movie
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-textMuted mb-10 max-w-2xl mx-auto"
          >
            Personalized recommendations powered by AI. Dive into a curated cinematic universe built just for you.
          </motion.p>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-6 text-textMuted w-6 h-6" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for movies, actors, or genres..."
                className="w-full bg-surface/80 backdrop-blur-md border border-white/10 text-white rounded-full py-4 pl-16 pr-32 text-lg focus:outline-none focus:border-primary/50 transition-all shadow-2xl"
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-hover text-white px-8 rounded-full font-medium transition-colors"
              >
                Explore
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Recommended for you snippet */}
      <section className="flex-grow max-w-7xl mx-auto px-4 w-full py-16">
        <div className="bg-surface/30 border border-white/5 rounded-2xl p-8 md:p-12 text-center glass-effect">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Recommended For You</h2>
          <p className="text-textMuted max-w-md mx-auto mb-8">
            Our AI needs a little more information to find your perfect match. Search for a few movies you love to get started.
          </p>
        </div>
      </section>

      {/* Explore By Category */}
      <section className="max-w-7xl mx-auto px-4 w-full py-16 border-t border-white/5">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore By Category</h2>
            <p className="text-textMuted">Dive into our curated collections.</p>
          </div>
          <Link to="/categories" className="text-primary hover:text-white transition-colors text-sm font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link 
              to={`/categories/${encodeURIComponent(cat)}`} 
              key={cat}
              className="relative group block rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="relative m-[1px] bg-surface rounded-[11px] py-4 px-6 flex items-center justify-center text-center transition-transform duration-300 group-hover:scale-[0.98]">
                <span className="font-semibold text-white tracking-wide">{cat}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
