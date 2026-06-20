import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import Trending from './pages/Trending';
import MovieDetails from './pages/MovieDetails';
import About from './pages/About';
import Categories from './pages/Categories';
import CategoryMovies from './pages/CategoryMovies';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movie/:title" element={<MovieDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categoryName" element={<CategoryMovies />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
