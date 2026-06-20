import urllib.request
import json
data=json.loads(urllib.request.urlopen('http://127.0.0.1:5000/movies/category/Action').read().decode('utf-8'))
print(f"Found {len(data['movies'])} Action movies. First movie: {data['movies'][0]['title']}")
