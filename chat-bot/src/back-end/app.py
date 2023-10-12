from flask import Flask, request, jsonify
import json

from business.process_chat import reply
from business.process_image_detection import image_detection

app = Flask(__name__)


def get_parameters(req):
    return json.loads(req.data.decode('utf8').replace("'", '"'))


@app.route('/chatbot/recieve-message', methods=["POST"])
def get_users_question():
    parameters = get_parameters(request)
    user_message = parameters['user_message']
    result = reply(user_message)

    return jsonify({'result': result})


@app.route('/image/process-detection', methods=["POST"])
def get_image_url():
    parameters = get_parameters(request)
    image_url = parameters['image_url']
    result = image_detection(image_url)
    print(result)
    return jsonify({'result': True})
