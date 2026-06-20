from flask import Flask, request, jsonify
from flask_cors import CORS
from recommender import recommend, get_all_categories, get_movies_by_category

app = Flask(__name__)
CORS(app) # Enable CORS so React can connect

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Movie Recommendation Backend is running"})

@app.route('/recommend', methods=['POST'])
def get_recommendation():
    data = request.get_json()
    
    if not data or 'movie' not in data:
        return jsonify({"error": "Please provide a movie name"}), 400
        
    movie_name = data['movie']
    
    result = recommend(movie_name)
    
    if isinstance(result, dict) and "error" in result:
        return jsonify(result), 404
        
    return jsonify({
        "recommendations": result
    })

@app.route('/categories', methods=['GET'])
def get_categories():
    categories = get_all_categories()
    return jsonify({
        "categories": categories
    })

@app.route('/movies/category/<category>', methods=['GET'])
def get_category_movies(category):
    movies = get_movies_by_category(category)
    return jsonify({
        "category": category,
        "movies": movies
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
