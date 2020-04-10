import requests 
from random import randint
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

    info = soup.find('table', {"class": "infobox"}) if soup.find('table', {"class": "infobox"}) else soup.find('div', {"class": "thumbinner"})
    name =  soup.find(id='firstHeading').getText()
    img = info.find('img')['src'] if (info and info.find('img')) else None

    if not img or 'List' in name or 'and ' in name:
        return None
    return{
        "name": name.strip().replace('\'', ' '),
        "img": img,
        "endpoint": endpoint,
        "gender": gender,
        "age": str(randint(18,80))
    }



linksMale = getLinks('https://en.wikipedia.org/wiki/Category:Male_characters_in_animation')
linksFemale  = getLinks('https://en.wikipedia.org/wiki/Category:Female_characters_in_animation')

detailMales = list(filter(lambda x: x, [getDetailsCharacter(link, 'Man') for link in linksMale]))
detailFemales = list(filter(lambda x: x, [getDetailsCharacter(link, 'Female') for link in linksFemale]))

with open("males.json", "w") as json_file:
    stringed = str(detailMales).replace('\'', '"')
    json_file.write(stringed)
with open("females.json", "w") as json_file:
    stringed = str(detailFemales).replace('\'', '"')
    json_file.write(stringed)




# print(linksFemale)