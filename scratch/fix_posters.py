import pandas as pd
import json

df = pd.read_csv('backend/movies.csv')

# The reliable wikipedia poster for Animal (2023)
animal_poster = 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg'

# Update Animal poster
df.loc[df['title'] == 'Animal', 'poster'] = animal_poster

# Check for any movies with missing posters and give them a placeholder
placeholder = 'https://via.placeholder.com/500x750/1a1a21/9ca3af?text=Movie+Poster'
df['poster'] = df['poster'].fillna(placeholder)

# Save to CSV
df.to_csv('backend/movies.csv', index=False)

# Update frontend movies.js
with open('frontend/src/data/movies.js', 'w', encoding='utf-8') as f:
    f.write("export const movies = [\n")
    for _, row in df.iterrows():
        m = row.to_dict()
        for k, v in m.items():
            if pd.isna(v):
                m[k] = ""
        f.write(f"  {json.dumps(m, ensure_ascii=False)},\n")
    f.write("];\n")

print("Fixed Animal poster and ensured fallback posters in data!")
