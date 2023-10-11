from flask import Flask, request, jsonify
import json

from business.process_chat import reply

app = Flask(__name__)


def get_parameters(req):
    return json.loads(req.data.decode('utf8').replace("'", '"'))


@app.route('/chatbot/recieve_message', methods=["POST"])
def get_users_question():
    parameters = get_parameters(request)
    user_message = parameters['user_message']
    result = reply(user_message)

    return jsonify({'result': result})
