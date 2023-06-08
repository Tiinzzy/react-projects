from flask import Flask, request, jsonify
import json
import app_mysql
import cache

app = Flask(__name__)


def get_parameters(req):
    return json.loads(req.data.decode('utf8').replace("'", '"'))


@app.route("/movies/all", methods=["POST"])
def all_movies():
    parameters = get_parameters(request)
    cache_key = parameters['offset_number']
    result = cache.get(cache_key)
    if result is None:
        print('from backend')
        result = app_mysql.get_all_movies(parameters)
        cache.insert(cache_key, result)
        return result
    else:
        print('from cache')
        return result


@app.route("/movies/length", methods=["POST"])
def data_length():
    result = app_mysql.get_length_of_all_data()
    return jsonify(result)
