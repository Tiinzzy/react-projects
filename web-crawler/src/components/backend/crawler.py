import ssl
from bs4 import BeautifulSoup
import urllib.request
import urllib.parse
import urllib.error
import collections

collections.Callable = collections.abc.Callable

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE


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


def loof_for_href(aTag, start_url):
    all_urls = []
    raw_url = start_url[:-1] if start_url.endswith('/') else start_url
    if 'href' in aTag.attrs.keys():
        href = aTag.attrs['href']
        if href.startswith('http'):
            href = href
            all_urls.append(href)
        elif href.startswith('//'):
            href = 'https://' + href[2:]
            all_urls.append(href)
        else:
            href = raw_url + href
            all_urls.append(href)
        return (all_urls)
    else:
        return None


if __name__ == "__main__":
    start_url = input('please enter a url: ')
    html, soup = open_and_read_url(start_url)

    for aTag in soup.recursiveChildGenerator():
        if look_for_a_tag(aTag):
            all_urls = loof_for_href(aTag, start_url)
