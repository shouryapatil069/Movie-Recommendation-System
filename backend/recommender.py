import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os

def load_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, 'movies.csv')
    try:
        df = pd.read_csv(file_path)
        return df
    except Exception as e:
        print(f"Error loading data: {e}")
        return None

def prepare_model(df):
    # Combine relevant features
    df['combined_features'] = df['genre'].fillna('') + " " + df['overview'].fillna('') + " " + df['cast'].fillna('') + " " + df['director'].fillna('')
    
    cv = CountVectorizer(stop_words='english')
    count_matrix = cv.fit_transform(df['combined_features'])
    
    cosine_sim = cosine_similarity(count_matrix)
    return cosine_sim

def _format_movie(row):
    movie_dict = {
        "id": int(row['id']),
        "title": str(row['title']),
        "genre": str(row['genre']),
        "rating": float(row['rating']),
        "year": int(row['year']),
        "overview": str(row['overview']),
        "poster": str(row['poster']),
        "trailerUrl": str(row['trailerUrl']),
        "director": str(row['director']),
        "cast": str(row['cast'])
    }
    
    if 'recommendationTag' in row and not pd.isna(row['recommendationTag']) and str(row['recommendationTag']).strip() != '':
        movie_dict['recommendationTag'] = str(row['recommendationTag'])
        
    return movie_dict

def get_recommendations(movie_title, df, cosine_sim):
    try:
        # Find index of the movie
        idx = df[df['title'].str.lower() == movie_title.lower()].index[0]
        
        # Get similarity scores
        sim_scores = list(enumerate(cosine_sim[idx]))
        
        # Sort movies based on similarity scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        
        # Get the top 5 most similar movies (excluding the movie itself)
        sim_scores = sim_scores[1:6]
        
        movie_indices = [i[0] for i in sim_scores]
        
        recommendations = []
        for i in movie_indices:
            row = df.iloc[i]
            recommendations.append(_format_movie(row))
            
        return recommendations
    except IndexError:
        return {"error": "Movie not found in the dataset"}
    except Exception as e:
        return {"error": str(e)}

# Pre-calculate to save time if we want, or do it on demand. 
# For a small dataset, calculating on start is fine.
_df = load_data()
if _df is not None:
    _cosine_sim = prepare_model(_df)
else:
    _cosine_sim = None

def recommend(title):
    if _df is None or _cosine_sim is None:
        return {"error": "Model not initialized"}
    return get_recommendations(title, _df, _cosine_sim)

def get_all_categories():
    if _df is None:
        return []
    
    categories = set()
    for genres in _df['genre'].dropna():
        # Split by comma and strip whitespace
        for genre in genres.split(','):
            categories.add(genre.strip())
            
    return sorted(list(categories))

def get_movies_by_category(category):
    if _df is None:
        return []
        
    # Filter where genre contains the category (case-insensitive)
    filtered_df = _df[_df['genre'].str.contains(category, case=False, na=False)]
    
    movies = []
    for _, row in filtered_df.iterrows():
        movies.append(_format_movie(row))
        
    return movies
