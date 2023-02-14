from flask import Flask, request, jsonify
import crawler
import base64

import threading

app = Flask(__name__)


def background_crawl_url(start_urls, depth, count):
    print('1% ', start_urls, depth, count)
    crawler.init_crawl()
    crawler.crawl_url(start_urls, depth, count)
    crawler.mark_crawl_ended()
    print('Crawling is ended')


@app.route("/trigger-crawling", methods=['GET'])
def trigger_crawling():
    if crawler.get_crawl_result()['proccess_is_running']:
        return jsonify({'message': 'a crawling already is running!'})

    args = request.args
    url = args.get('url')
    main_url = base64.b64decode(url).decode('utf-8')

    thread = threading.Thread(target=background_crawl_url, args=(
        [main_url], args.get('depth'), args.get('searchNum')))
    thread.start()

    return jsonify({'message':'process is going on, you will not see anything!!!'})

@app.route("/get-crawl-result", methods=['GET'])
def get_crawl_result():
    return jsonify(crawler.get_crawl_result())