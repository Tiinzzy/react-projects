from flask import Flask, request, jsonify
import json

app = Flask(__name__)


def get_parameters(req):
    return json.loads(req.data.decode('utf8').replace("'", '"'))


@app.route('/chatbot/recieve_message', methods=["POST"])
def get_search_prompt():
    parameters = get_parameters(request)
    print(parameters)

    return jsonify({'result': True})
