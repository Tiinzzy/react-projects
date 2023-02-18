from flask import Flask, request, jsonify
from crawler_new import Crawler
import base64

import threading

app = Flask(__name__)

crawlers = {}


def get_crawler(user_id):
    if user_id not in crawlers.keys():
        crawlers[user_id] = Crawler(user_id)
    return crawlers[user_id]


def background_crawl_url(start_urls, depth, count, user_id):
    crawler = get_crawler(user_id)

    crawler.init_crawl()
    crawler.crawl_url('ROOT', start_urls, depth, count)
    crawler.mark_crawl_ended()
    print('Crawling is ended')


@app.route("/trigger-crawling", methods=['GET'])
def trigger_crawling():
    args = request.args
    url = args.get('url')
    main_url = base64.b64decode(url).decode('utf-8')

    thread = threading.Thread(target=background_crawl_url, args=(
        [main_url], args.get('depth'), args.get('searchNum'), args.get('userId')))
    thread.start()

    return jsonify({'message': 'process is going on, you will not see anything!!!', 'success': True})


@app.route("/get-crawl-result", methods=['GET'])
def get_crawl_result():
    args = request.args
    crawler = get_crawler(args.get('userId'))
    result = crawler.get_crawl_result()
    if result['finished']:
        del crawlers[args.get('userId')]
    return jsonify(result)
