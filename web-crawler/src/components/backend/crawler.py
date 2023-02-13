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


def look_for_a_tag(soup):

    for aTag in soup.recursiveChildGenerator():
        if aTag.name == 'a':
            print(aTag)


if __name__ == "__main__":
    start_url = input('please enter a url: ')
    html, soup = open_and_read_url(start_url)
    look_for_a_tag(soup)
