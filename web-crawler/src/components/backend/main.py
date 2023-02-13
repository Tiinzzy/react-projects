from flask import Flask, request
from crawler import crawl_the_web

app = Flask(__name__)


@app.route("/get-url-crawl-result", methods=['GET'])
def get_crawling_result():
    args = request.args
    result = crawl_the_web(args.get('url'), args.get(
        'depth'), args.get('searchNum'), level=0)
