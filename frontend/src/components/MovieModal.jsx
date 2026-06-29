import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Play } from 'lucide-react';

const MovieModal = ({ movie, onClose }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!movie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Poster Section */}
          <div className="w-full md:w-2/5 aspect-[2/3] md:aspect-auto relative">
            {movie.poster ? (
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/500x750/1a1a21/9ca3af?text=No+Poster";
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface/50 text-textMuted">
                No Poster
              </div>
            )}
            {/* Gradient Overlay for Mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent md:hidden" />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-center relative bg-surface">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">{movie.title}</h2>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-textMuted mb-6">
              {movie.rating && (
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-white border border-white/10">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {movie.rating}
                </div>
              )}
              {movie.genre && (
                <div className="bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20">
                  {movie.genre}
                </div>
              )}
              {movie.year && (
                <div className="text-white/70">
                  {movie.year}
                </div>
              )}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Overview</h3>
              <p className="text-textMuted leading-relaxed max-h-[150px] md:max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {movie.description}
              </p>
            </div>

            <div className="mt-auto">
              {movie.trailer ? (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/30"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Watch Trailer
                </a>
              ) : (
                <button disabled className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-surface border border-white/10 text-textMuted px-8 py-3.5 rounded-xl font-semibold cursor-not-allowed">
                  Trailer Unavailable
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MovieModal;
