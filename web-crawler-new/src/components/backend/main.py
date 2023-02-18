from flask import Flask, request, jsonify
import crawler
import base64

import threading

app = Flask(__name__)

service_acess_lock = threading.Lock()

user_info = {'id': None}


def background_crawl_url(start_urls, depth, count):
    print('1% ', start_urls, depth, count)
    crawler.init_crawl()
    crawler.crawl_url('ROOT', start_urls, depth, count)
    crawler.mark_crawl_ended()
    service_acess_lock.release()
    user_info['id'] = None
    print('Crawling is ended')


@app.route("/trigger-crawling", methods=['GET'])
def trigger_crawling():
    if service_acess_lock.acquire(timeout=0):
        print('\n\n>>>>>>>>>>>>>>>>>>>>>>> RUNNING A CRAWL PROCEESS \n\n\n')
        args = request.args
        url = args.get('url')
        main_url = base64.b64decode(url).decode('utf-8')

        user_info['id'] = args.get('userId')
        thread = threading.Thread(target=background_crawl_url, args=(
            [main_url], args.get('depth'), args.get('searchNum')))
        thread.start()

        return jsonify({'message': 'process is going on, you will not see anything!!!', 'success': True})
    else:
        print('\n\n:( :( It is an embarassment !!!\n\n\n')
        return jsonify({'message': 'a crawling already is running!', 'success': False})


@app.route("/get-crawl-result", methods=['GET'])
def get_crawl_result():
    args = request.args
    result = crawler.get_crawl_result()
    result['user_id'] = args.get('userId')
    return jsonify(result)
