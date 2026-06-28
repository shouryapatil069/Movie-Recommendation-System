import { motion } from 'framer-motion';
import { Star, Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg bg-surface/50 border border-white/5 flex flex-col h-full"
    >
      <div className="aspect-[2/3] w-full bg-surface relative overflow-hidden">
        {movie.poster ? (
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/500x750/1a1a21/9ca3af?text=No+Poster";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-textMuted bg-surface/50">No Image</div>
        )}
        
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Rating & Year Badge */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {movie.rating && (
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold text-white">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span>{movie.rating}</span>
            </div>
          )}
          {movie.year && (
            <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold text-white">
              {movie.year}
            </div>
          )}
        </div>

        {movie.recommendationTag && (
          <div className="absolute top-12 left-3 bg-gradient-to-r from-orange-600 to-red-600 px-2 py-1 rounded-md text-[10px] font-bold text-white shadow-lg animate-pulse uppercase tracking-wider">
            {movie.recommendationTag}
          </div>
        )}

        {/* Content details appearing on hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end h-full">
          <div className="mt-auto">
            <h3 className="text-lg font-bold text-white mb-1 leading-tight line-clamp-2">{movie.title}</h3>
            <p className="text-xs text-primary font-medium mb-2 line-clamp-1">{movie.genre}</p>
            
            {/* Overview - fades in on hover */}
            <p className="text-xs text-textMuted mb-4 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              {movie.description}
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              {movie.trailer && (
                <a 
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary hover:bg-primary-hover text-white py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Play className="w-3 h-3 fill-white" /> Trailer
                </a>
              )}
              <Link 
                to={`/movie/${encodeURIComponent(movie.title)}`} 
                className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1 text-center"
              >
                <Info className="w-3 h-3" /> Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
