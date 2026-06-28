const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'frontend', 'src', 'data', 'movies.js');
let fileContent = fs.readFileSync(filePath, 'utf-8');

const arrayStrMatch = fileContent.match(/export const movies = (\[[\s\S]*?\]);/);
if (!arrayStrMatch) {
  console.error("Could not find movies array");
  process.exit(1);
}

let movies;
try {
  eval(`movies = ${arrayStrMatch[1]}`);
} catch (e) {
  console.error("Failed to parse movies array", e);
  process.exit(1);
}

movies.forEach(movie => {
  if (movie.overview !== undefined) {
    movie.description = movie.overview;
    delete movie.overview;
  }
  if (movie.trailerUrl !== undefined) {
    movie.trailer = movie.trailerUrl;
    delete movie.trailerUrl;
  }

  if (!movie.title) movie.title = "Unknown Movie";
  if (!movie.genre) movie.genre = "Unknown Genre";
  
  if (!movie.description || movie.description.length < 50) {
    const genreStr = movie.genre ? movie.genre.split(',')[0] : 'film';
    const filler = ` A highly acclaimed ${genreStr} movie that you don't want to miss. Enjoy the stunning visuals and brilliant storytelling.`;
    movie.description = (movie.description || '') + filler;
  }

  if (!movie.poster || movie.poster.includes('null') || movie.poster.includes('undefined')) {
    movie.poster = `https://via.placeholder.com/500x750/1a1a21/9ca3af?text=${encodeURIComponent(movie.title)}`;
  }
  
  if (!movie.trailer || movie.trailer.includes('null') || movie.trailer.includes('undefined')) {
    movie.trailer = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`;
  }
});

const newArrayStr = JSON.stringify(movies, null, 2);
const newContent = fileContent.replace(arrayStrMatch[0], `export const movies = ${newArrayStr};`);

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log('Successfully updated movies.js');
