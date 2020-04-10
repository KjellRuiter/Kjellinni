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

def getDetailsCharacter(endpoint):
    baseUrl = 'https://en.wikipedia.org/'
    res = requests.get(f'{baseUrl}{endpoint}')
    soup = BeautifulSoup(res.text, 'html.parser')

    info = soup.find('table', {"class": "infobox"}) if soup.find('table', {"class": "infobox"}) else soup.find('div', {"class": "thumbinner"})
    name =  soup.find(id='firstHeading').getText()
    img = info.find('img')['src'] if (info and info.find('img')) else None
    print(name)
    # print(info)
    if not img:
        return None
    return{
        "name": name.strip(),
        "img": img,
        "endpoint": endpoint
    }

def cleanup(character):
    print(character)
    # return{
    #     "name": character['name'].rstrip(),
    #     "img": character['img']
    # }


linksMale = getLinks('https://en.wikipedia.org/wiki/Category:Male_characters_in_animation')
linksFemale  = getLinks('https://en.wikipedia.org/wiki/Category:Female_characters_in_animation')

test = list(filter(lambda x: x, [getDetailsCharacter(link) for link in linksMale]))
# test2 = [cleanup(char) for char in test]
# for char in test:
#     print(char.name)
print(test)



# print(linksFemale)