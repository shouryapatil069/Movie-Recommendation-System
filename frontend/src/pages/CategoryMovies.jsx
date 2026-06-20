import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getMoviesByCategory } from '../api/movieApi';
import MovieGrid from '../components/MovieGrid';
import { Loader } from '../components/UIComponents';

const CategoryMovies = () => {
  const { categoryName } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMoviesByCategory(categoryName);
        setMovies(data.movies || []);
      } catch (err) {
        setError(err.error || 'Failed to fetch movies for this category.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [categoryName]);

  return (
    <div className="pt-24 min-h-screen pb-20 max-w-7xl mx-auto px-4">
      <Link to="/categories" className="inline-flex items-center gap-2 text-textMuted hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Categories
      </Link>
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Recommended {categoryName} Movies</h1>
        <p className="text-textMuted">Top picks selected for you in {categoryName}</p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : movies.length === 0 ? (
        <div className="text-center text-textMuted py-20">
          <p className="text-xl">No movies found in this category.</p>
        </div>
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
};

export default CategoryMovies;
