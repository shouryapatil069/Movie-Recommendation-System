import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar, Play, User, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { movies } from '../data/movies';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const { title } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Find the exact movie from the fallback dataset
    const foundMovie = movies.find(m => m.title.toLowerCase() === title.toLowerCase());
    setMovie(foundMovie);
  }, [title]);
  
  if (!movie) {
    return (
      <div className="pt-24 min-h-screen pb-20 max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
        <p className="text-textMuted mb-6">We couldn't find the movie you are looking for.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen pb-20 max-w-7xl mx-auto px-4">
      <Link to="/" className="inline-flex items-center gap-2 text-textMuted hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-2xl border border-white/10 p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-[2/3] bg-surface rounded-xl flex items-center justify-center text-textMuted border border-white/5 shadow-2xl overflow-hidden">
              {movie.poster ? (
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/500x750/1a1a21/9ca3af?text=No+Poster";
                  }}
                />
              ) : (
                "No Poster"
              )}
            </div>
          </div>
          
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm font-medium text-textMuted">
              {movie.rating && (
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-white">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {movie.rating}
                </span>
              )}
              {movie.year && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {movie.year}
                </span>
              )}
              {movie.genre && (
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs">
                  {movie.genre}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm border-y border-white/10 py-6">
              {movie.director && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-textMuted" />
                  <div>
                    <p className="text-white font-medium mb-1">Director</p>
                    <p className="text-textMuted">{movie.director}</p>
                  </div>
                </div>
              )}
              {movie.cast && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-textMuted" />
                  <div>
                    <p className="text-white font-medium mb-1">Top Cast</p>
                    <p className="text-textMuted leading-relaxed">{movie.cast}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2 text-white">Overview</h3>
              <p className="text-textMuted leading-relaxed max-w-3xl">
                {movie.overview}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              {movie.trailerUrl && (
                <a 
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors flex-1 md:flex-none flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" /> Watch Trailer
                </a>
              )}
              <Link 
                to={`/recommendations?movie=${encodeURIComponent(movie.title)}`} 
                className="bg-surface hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-colors border border-white/10 flex-1 md:flex-none text-center"
              >
                Find Similar Movies
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MovieDetails;
