import React, { useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const MovieGrid = ({ movies, title }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="py-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <MovieCard 
            key={movie.id || index} 
            movie={movie} 
            index={index} 
            onClick={() => setSelectedMovie(movie)} 
          />
        ))}
      </div>
      <MovieModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
};

export default MovieGrid;
