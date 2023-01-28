from flask import Flask, request, jsonify
from tiny_url import Tiny_Url

app = Flask(__name__)

@app.route("/getting_url_and_convert", methods=['GET'])
def getting_url_and_convert():
    args = request.args
    data = Tiny_Url.submit_and_get_url(
        args.get('mainUrl'))
    return jsonify(data)


@app.route("/get_url", methods=['GET'])
def get_url():
    args = request.args
    data = Tiny_Url.get_url(args.get('tinyUrl'))
    print(data)
    return jsonify(data)


