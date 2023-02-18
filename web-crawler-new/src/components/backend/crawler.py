import logging
import ssl
import sys
import random
from bs4 import BeautifulSoup
import urllib.request
import urllib.parse
import urllib.error
import collections

collections.Callable = collections.abc.Callable

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

crawl_result = {'urls': [], 'finished': False,
                'proccess_is_running': False, 'success': True}

storage = {'already_seen_urls': []}

urls_id = {}

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s|%(levelname)s|%(message)s',
                    datefmt="%Y-%m-%d %H:%M:%S",
                    filename="/home/tina/Downloads/logs/web-crawling.log",
                    filemode="a")


def get_url_id(url, parent_path):
    if url in urls_id.keys():
        return urls_id[url]
    else:
        id = str(len(urls_id) + 1)
        parent_id = parent_path[parent_path.rfind(".")+1:]
        path = parent_path + '.' + id
        urls_id[url] = {'id': id, 'parent_id': parent_id, 'path': path}
        return id, parent_id, path


def open_and_read_url(url):
    logging.info(f"Opening and reading {url}")
    try:
        html = urllib.request.urlopen(url, context=ctx).read()
        soup = BeautifulSoup(html, 'lxml')
        return soup
    except:
        return None


def look_for_a_tag(aTag):
    if aTag.name == 'a':
        return True
    else:
        return False


def look_for_href(start_url, count):
    all_urls = []

    soup = open_and_read_url(start_url)
    if soup is None:
        return all_urls

    for aTag in soup.recursiveChildGenerator():
        if look_for_a_tag(aTag):
            raw_url = start_url[:-1] if start_url.endswith('/') else start_url
            if 'href' in aTag.attrs.keys():
                href = aTag.attrs['href']
                if href.startswith('https'):
                    href = href
                elif href.startswith('//'):
                    href = 'https://' + href[2:]
                else:
                    href = raw_url + href
            if href not in storage['already_seen_urls']:
                storage['already_seen_urls'].append(href)
                all_urls.append(href)
    if len(all_urls) < count:
        return all_urls
    else:
        return random.choices(all_urls, k=count)


def crawl_url(path, start_url, depth, count, level=0):
    logging.info("Starting to crawl the web, based on give urls")
    depth = int(depth)
    count = int(count)
    if level > depth:
        return
    i = 0
    for url in start_url:
        url_id, parent_id, url_path = get_url_id(url, path)
        # print(i, '-'*level, url_id+'=>'+url)
        crawl_result['urls'].append(
            {'index': i, 'level': level, 'url_id': url_id, 'parent_id': parent_id, 'url': url, 'url_path': url_path})
        random_urls = look_for_href(url, count)
        crawl_url(url_path, random_urls, depth, count, level+1)
        i += 1


def init_crawl():
    logging.info("Initializing crawling")
    crawl_result.clear()
    crawl_result['urls'] = []
    crawl_result['finished'] = False
    crawl_result['proccess_is_running'] = True
    storage['already_seen_urls'] = []
    urls_id.clear()


def mark_crawl_ended():
    logging.info("Crawling proccess finished")
    crawl_result['finished'] = True
    crawl_result['proccess_is_running'] = False


def get_crawl_result():
    logging.info("Sending crawling results to frontend")
    return crawl_result


if __name__ == "__main__":
    if len(sys.argv) > 1:
        start_url = sys.argv[1]
    else:
        start_url = input('please enter a url: ')

    # start_url = "https://www.cnn.com/"

    crawl_url('ROOT', [start_url], depth=3, count=5, level=0)
