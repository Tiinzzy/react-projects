from flask import Flask, request, jsonify
import json
import os
import uuid

from business.process_chat import reply
from business.process_image_detection import image_detection

app = Flask(__name__)

UPLOAD_FOLDER = '/home/tina/Documents/projects/react-projects/huggingface-ui/src/front-end/public/user-uploaded-images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


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
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        unique_filename = str(uuid.uuid4()) + "_" + file.filename
        filename = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filename)
        url = 'http://localhost:3000/user-uploaded-images/' + unique_filename
        result = image_detection(url)
        return jsonify({'result': result})
