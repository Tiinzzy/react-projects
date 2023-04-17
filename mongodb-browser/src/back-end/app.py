from flask import Flask, request, jsonify
import json

import app_mongodb

app = Flask(__name__)


def get_parameters(req):
    return json.loads(req.data.decode('utf8').replace("'", '"'))


@app.route('/mongodb/connect', methods=["POST"])
def connect_mongo_db():
    parameters = get_parameters(request)
    result = app_mongodb.connect(parameters)
    return jsonify(result)


@app.route('/mongodb/databases', methods=["POST"])
def databases_mongo_db():
    parameters = get_parameters(request)
    result = app_mongodb.get_databases(parameters)
    return jsonify(result)
