from flask import Flask, request, jsonify
import json
import app_mysql

app = Flask(__name__)


def get_parameters(req):
    return json.loads(req.data.decode('utf8').replace("'", '"'))


@app.route("/movies/all", methods=["POST"])
def all_movies():
    parameters = get_parameters(request)
    result = app_mysql.get_all_movies(parameters)
    return jsonify(result)


@app.route("/movies/length", methods=["POST"])
def data_length():
    result = app_mysql.get_length_of_all_data()
    return jsonify(result)
