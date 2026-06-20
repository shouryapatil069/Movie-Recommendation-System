import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getRecommendations = async (movieName) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, {
      movie: movieName
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error.response?.data || { error: "Failed to connect to the recommendation engine." };
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error.response?.data || { error: "Failed to load categories." };
  }
};

export const getMoviesByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/movies/category/${encodeURIComponent(category)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category movies:", error);
    throw error.response?.data || { error: "Failed to load movies." };
  }
};
