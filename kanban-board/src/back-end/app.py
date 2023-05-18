from flask import Flask, request, jsonify
import json
import app_mongodb

app = Flask(__name__)


def get_parameters(req):
    return json.loads(req.data.decode('utf8').replace("'", '"'))


@app.route('/mongodb/insert_documents', methods=["POST"])
def insert_documents_mongo_db():
    parameters = get_parameters(request)
    result = app_mongodb.insert_documents(parameters)
    return jsonify(result)


@app.route('/mongodb/get_documents', methods=["POST"])
def get_documents_mongo_db():
    result = app_mongodb.get_documents()
    return jsonify(result)


@app.route('/mongodb/insert_comment', methods=["POST"])
def insert_comments_mongo_db():
    parameters = get_parameters(request)
    result = app_mongodb.insert_comment(parameters)
    return jsonify(result)
