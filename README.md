# Movie Recommendation System

A machine learning-based personalized movie suggestion platform that helps users discover relevant movies quickly. This project features a premium, cinematic user interface and a Flask backend powered by scikit-learn for content-based filtering.

## Features
- **Cinematic UI**: A dark-themed, responsive interface designed with Tailwind CSS and Framer Motion.
- **Search & Discover**: Find movies by title and explore trending films.
- **AI Recommendations**: Uses cosine similarity and content-based filtering to recommend 5 similar movies.
- **Detailed Views**: Movie details including genres, overview, ratings, and posters.

## Tech Stack
**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router
- Framer Motion
- Lucide React
- Axios

**Backend:**
- Python Flask
- Pandas
- Scikit-learn (CountVectorizer, Cosine Similarity)
- Flask-CORS

## Folder Structure
```
Movie-Recommendation-System/
├── frontend/             # React application (Vite)
│   ├── src/              # React components, pages, and API calls
│   ├── tailwind.config.js# Tailwind CSS configuration
│   └── package.json      # Node dependencies
├── backend/              # Python Flask API and ML model
│   ├── app.py            # Main Flask server
│   ├── recommender.py    # ML logic for recommendations
│   ├── movies.csv        # Dataset used for the MVP
│   └── requirements.txt  # Python dependencies
└── README.md
```

## Screenshots
> *(Add screenshots of your Home Page, Recommendations Page, and Trending Page here)*
- `home-page.png`
- `recommendations-page.png`

## How to Run Locally

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd Movie-Recommendation-System/backend
   ```
2. (Optional but recommended) Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```
   *The backend will run on `http://127.0.0.1:5000`*

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder:
   ```bash
   cd Movie-Recommendation-System/frontend
   ```
2. Install Node modules:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173` (or similar).*

## API Endpoint Reference
**POST `/recommend`**
- **Description:** Returns top 5 movie recommendations based on content similarity.
- **Request Body:**
  ```json
  {
    "movie": "The Dark Knight"
  }
  ```
- **Response:**
  ```json
  {
    "recommendations": [
      {
        "title": "Joker",
        "genre": "Crime, Thriller, Drama",
        "overview": "...",
        "poster": "https://..."
      },
      ...
    ]
  }
  ```

## Future Enhancements
- User login and personalized watch history.
- Rating-based collaborative filtering to enhance the recommendation engine.
- Fetch real-time data from TMDB API to display updated ratings, trailers, and cast.

---
*Developed for GitHub Portfolio / Academic Project*
