from selenium import webdriver
from url import url
import os 

dir_path = os.path.dirname(os.path.realpath(__file__))

chrome_browser = webdriver.Chrome(f'{dir_path}/chromedriver')
chrome_browser.maximize_window()
chrome_browser.get(url)



chrome_browser.close()
chrome_browser.close()