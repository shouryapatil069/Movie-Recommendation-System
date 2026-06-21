import pandas as pd

# Load existing csv
df = pd.read_csv('backend/movies.csv')

# Add recommendationTag column if not exists
if 'recommendationTag' not in df.columns:
    df['recommendationTag'] = ''

# New movie data
animal_overview = """Animal is a dark, intense, and emotionally charged action-crime drama that delivers a powerful cinematic experience from start to finish. The movie revolves around a complicated father-son relationship, where love, pain, anger, ego, and obsession slowly transform into a violent storm. Ranbir Kapoor gives one of his most fearless and aggressive performances, carrying the film with raw emotion, attitude, and a commanding screen presence. Every scene feels heavy, stylish, and dramatic, with strong background music, bold dialogues, luxury visuals, and brutal action sequences that make the movie feel larger than life.

What makes Animal stand out is its mix of emotional family drama and wild gangster-style storytelling. It is not just about action; it is about a broken character who is driven by loyalty, revenge, and the need for approval. The movie has a dark atmosphere, intense character moments, and a powerful mass appeal that keeps the audience hooked. From the action scenes to the emotional breakdowns, Animal creates a strong impact and gives viewers a loud, stylish, and unforgettable experience.

Personally recommended for viewers who enjoy dark action movies, anti-hero characters, emotional family drama, revenge stories, powerful performances, and intense background music. If you like movies that feel bold, aggressive, stylish, and full of attitude, Animal is a must-watch recommendation."""

new_id = df['id'].max() + 1 if len(df) > 0 else 1

new_movie = {
    'id': new_id,
    'title': 'Animal',
    'genre': 'Action, Crime, Drama, Thriller, Recommended',
    'rating': 8.0,
    'year': 2023,
    'overview': animal_overview,
    'cast': 'Ranbir Kapoor, Anil Kapoor, Bobby Deol, Rashmika Mandanna',
    'director': 'Sandeep Reddy Vanga',
    'poster': 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
    'trailerUrl': 'https://www.youtube.com/watch?v=Dydmpfo68DA',
    'trending': 1,
    'recommendationTag': 'Personally Recommended 🔥'
}

# Use pd.concat instead of append
new_movie_df = pd.DataFrame([new_movie])
df = pd.concat([df, new_movie_df], ignore_index=True)

df.to_csv('backend/movies.csv', index=False)

# Now update frontend movies.js
import json
with open('frontend/src/data/movies.js', 'w', encoding='utf-8') as f:
    f.write("export const movies = [\n")
    for _, row in df.iterrows():
        m = row.to_dict()
        # Clean up NaNs
        for k, v in m.items():
            if pd.isna(v):
                m[k] = ""
        f.write(f"  {json.dumps(m, ensure_ascii=False)},\n")
    f.write("];\n")

print("Added Animal movie to backend and frontend data successfully.")
