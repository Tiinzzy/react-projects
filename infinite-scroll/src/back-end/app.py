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
