import ssl
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

already_seen_urls = []


def open_and_read_url(url):
    try:
        html = urllib.request.urlopen(url, context=ctx).read()
        soup = BeautifulSoup(html, 'lxml')
        return html, soup
    except:
        return None, None


def look_for_a_tag(aTag):
    if aTag.name == 'a':
        return True
    else:
        return False


def look_for_href(start_url, count):
    html, soup = open_and_read_url(start_url)
    all_urls = []

    for aTag in soup.recursiveChildGenerator():
        if look_for_a_tag(aTag):
            raw_url = start_url[:-1] if start_url.endswith('/') else start_url
            if 'href' in aTag.attrs.keys():
                href = aTag.attrs['href']
                if href.startswith('http'):
                    href = href
                elif href.startswith('//'):
                    href = 'https://' + href[2:]
                else:
                    href = raw_url + href
                if href not in already_seen_urls:
                    already_seen_urls.append(href)
                    all_urls.append(href)
    return random.choices(all_urls, k=count)


if __name__ == "__main__":
    start_url = input('please enter a url: ')

    random_urls = look_for_href(start_url, count=5)
    i = 0
    for url in random_urls:
        urls = look_for_href(url, count=5)
        print(i , url)
        print(urls)
        print()
        i += 1