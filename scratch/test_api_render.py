import urllib.request
print(urllib.request.urlopen('http://127.0.0.1:5000/').read().decode('utf-8'))
print(urllib.request.urlopen('http://127.0.0.1:5000/categories').read().decode('utf-8')[:50])
