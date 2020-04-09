import requests 
from bs4 import BeautifulSoup



def getLinks(link):
    res = requests.get(link)
    soup = BeautifulSoup(res.text, 'html.parser')
    list = soup.select('.mw-category a')

    links = []
    for a in list:
        href = a.get('href', None)
        links.append(href)
    return links

def getDetailsCharacter(endpoint, gender):
    baseUrl = 'https://en.wikipedia.org/'
    res = requests.get(f'{baseUrl}{endpoint}')
    soup = BeautifulSoup(res.text, 'html.parser')

    info = soup.find('table', {"class": "infobox"})
    name = info.find('th').getText()
    img = info.find('img')['src']

    return{
        "name": name,
        "img": img,
        "gender": gender
    }

linksMale = getLinks('https://en.wikipedia.org/wiki/Category:Male_characters_in_animation')
linksFemale  = getLinks('https://en.wikipedia.org/wiki/Category:Female_characters_in_animation')


# print(linksFemale)