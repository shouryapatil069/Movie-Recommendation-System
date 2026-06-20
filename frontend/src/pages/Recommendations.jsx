import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRecommendations } from '../api/movieApi';
import MovieGrid from '../components/MovieGrid';
import { Loader, ErrorMessage } from '../components/UIComponents';
import { ArrowLeft } from 'lucide-react';

const Recommendations = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get('movie');

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!movieName) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const data = await getRecommendations(movieName);
        if (data.recommendations && data.recommendations.length > 0) {
          setMovies(data.recommendations);
        } else {
          setError("No recommendations found for this movie.");
        }
      } catch (err) {
        setError(err.error || "An error occurred while fetching recommendations.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [movieName]);

  if (!movieName) {
    return (
      <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4">
        <ErrorMessage message="No movie selected. Please go back and search for a movie." />
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 pb-20">
      <div className="mb-8 flex items-center gap-4">
        <Link to="/" className="p-2 rounded-full bg-surface hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Recommendations</h1>
          <p className="text-textMuted mt-1">Based on your interest in: <span className="text-white font-medium">{movieName}</span></p>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : movies.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MovieGrid movies={movies} />
        </motion.div>
      ) : null}
    </div>
  );
};

export default Recommendations;
