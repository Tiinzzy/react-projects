cache = {}
MAX_SIZE = 10000


def get(key):
    if key in cache.keys():
        return cache[key]
    else:
        return None


def insert(key, value):
    if len(cache) > MAX_SIZE:
        cache.clear()
    cache[key] = value
