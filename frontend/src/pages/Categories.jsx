import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Loader } from '../components/UIComponents';
import { getCategories } from '../api/movieApi';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (err) {
        setError(err.error || 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(c => 
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by first letter
  const groupedCategories = filteredCategories.reduce((acc, category) => {
    const letter = category.charAt(0).toUpperCase();
    if (!acc[letter]) {
      acc[letter] = [];
    }
    acc[letter].push(category);
    return acc;
  }, {});

  return (
    <div className="pt-24 min-h-screen pb-20 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Categories</h1>
          <p className="text-textMuted">Explore movies by genre</p>
        </div>
        
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all text-white"
          />
          <Search className="w-5 h-5 absolute left-4 top-3 text-textMuted" />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : Object.keys(groupedCategories).length === 0 ? (
        <div className="text-center text-textMuted py-20 flex flex-col items-center">
          <Search className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-xl">No categories found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.keys(groupedCategories).sort().map(letter => (
            <div key={letter}>
              <h2 className="text-3xl font-bold text-white/50 mb-6 pl-2 border-l-4 border-primary">{letter}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {groupedCategories[letter].map(category => (
                  <Link 
                    to={`/categories/${encodeURIComponent(category)}`} 
                    key={category}
                    className="relative group block rounded-xl overflow-hidden"
                  >
                    {/* Glowing animated border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                    <div className="relative m-[2px] bg-surface rounded-[10px] h-full p-6 flex items-center justify-center text-center transition-transform duration-300 group-hover:scale-[0.98]">
                      <span className="font-semibold text-white tracking-wide">{category}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
