import logging
import ssl
import random
from bs4 import BeautifulSoup
import urllib.request
import urllib.parse
import urllib.error
import collections

collections.Callable = collections.abc.Callable

class Crawler:

    def __init__(self, id):
        self.id = id
        self.ctx = ssl.create_default_context()
        self.ctx.check_hostname = False
        self.ctx.verify_mode = ssl.CERT_NONE
        self.storage = {'already_seen_urls': []}
        self.urls_id = {}
        self.crawl_result = {'urls': [], 'userId': self.id,
                             'finished': False, 'proccess_is_running': False}

    def init_crawl(self):
        print(self.id, '>> init_crawl')
        self.crawl_result.clear()
        self.crawl_result['urls'] = []
        self.crawl_result['finished'] = False
        self.crawl_result['proccess_is_running'] = True
        self.storage['already_seen_urls'] = []
        self.urls_id.clear()

    def open_and_read_url(self, url):
        logging.info(f"Opening and reading {url}")
        try:
            html = urllib.request.urlopen(url, context=self.ctx).read()
            soup = BeautifulSoup(html, 'lxml')
            return soup
        except:
            return None

    def look_for_a_tag(self, aTag):
        if aTag.name == 'a':
            return True
        else:
            return False

    def get_url_id(self, url, parent_path):
        if url in self.urls_id.keys():
            return self.urls_id[url]
        else:
            id = str(len(self.urls_id) + 1)
            parent_id = parent_path[parent_path.rfind(".")+1:]
            path = parent_path + '.' + id
            self.urls_id[url] = {
                'id': id, 'parent_id': parent_id, 'path': path}
            return id, parent_id, path

    def look_for_href(self, start_url, count):
        all_urls = []

        soup = self.open_and_read_url(start_url)
        if soup is None:
            return all_urls

        for aTag in soup.recursiveChildGenerator():
            if self.look_for_a_tag(aTag):
                raw_url = start_url[:-
                                    1] if start_url.endswith('/') else start_url
                if 'href' in aTag.attrs.keys():
                    href = aTag.attrs['href']
                    if href.startswith('https'):
                        href = href
                    elif href.startswith('//'):
                        href = 'https://' + href[2:]
                    else:
                        href = raw_url + href
                if href not in self.storage['already_seen_urls']:
                    self.storage['already_seen_urls'].append(href)
                    all_urls.append(href)
        if len(all_urls) < count:
            return all_urls
        else:
            return random.choices(all_urls, k=count)

    def crawl_url(self, path, start_url, depth, count, level=0):
        print(self.id, '==> crawl_url')
        depth = int(depth)
        count = int(count)
        if level > depth:
            return
        i = 0
        for url in start_url:
            url_id, parent_id, url_path = self.get_url_id(url, path)
            print(i, '-'*level, url_id+'=>'+url)
            self.crawl_result['urls'].append(
                {'index': i, 'level': level, 'url_id': url_id, 'parent_id': parent_id, 'url': url, 'url_path': url_path})
            random_urls = self.look_for_href(url, count)
            self.crawl_url(url_path, random_urls, depth, count, level+1)
            i += 1

    def mark_crawl_ended(self):
        print(self.id, '==>> mark_crawl_ended')
        self.crawl_result['finished'] = True
        self.crawl_result['proccess_is_running'] = False

    def get_crawl_result(self):
        print(self.id, '==>> get_crawl_result')
        return self.crawl_result
