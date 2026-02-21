import requests
from bs4 import BeautifulSoup

def get_website_text(url):

    try:

        response = requests.get(url, timeout=5)

        soup = BeautifulSoup(response.text,"html.parser")

        headings = [
            h.get_text(strip=True)
            for h in soup.find_all(['h1','h2'])
        ]

        links = [
            a.get_text(strip=True)
            for a in soup.find_all('a')
            if len(a.get_text(strip=True)) < 30
        ]

        text = headings[:10] + links[:20]

        return " ".join(text)

    except:

        return "Website could not be read."