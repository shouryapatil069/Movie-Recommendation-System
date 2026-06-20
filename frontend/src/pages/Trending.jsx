import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { Loader } from '../components/UIComponents';
import { movies } from '../data/movies';

const Trending = () => {
  const [loading, setLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    // Filter the movies array to get only trending ones
    const filtered = movies.filter(m => m.trending === 1);
    setTrendingMovies(filtered);
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 pb-20">
      <h1 className="text-3xl font-bold mb-2">Trending Now</h1>
      <p className="text-textMuted mb-8">The most popular movies this week globally.</p>

      {loading ? (
        <Loader />
      ) : (
        <MovieGrid movies={trendingMovies} />
      )}
    </div>
  );
};

export default Trending;
