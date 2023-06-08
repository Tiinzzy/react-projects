cache = {}


def get(key):
    if key in cache.keys():
        return cache[key]
    else:
        return None


def insert(key, value):
    cache[key] = value
