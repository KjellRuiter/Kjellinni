from selenium import webdriver
from url import url
from generateUser import createDummyUser
import os 

dir_path = os.path.dirname(os.path.realpath(__file__))

chrome_browser = webdriver.Chrome(f'{dir_path}/chromedriver')
chrome_browser.maximize_window()
chrome_browser.get(url)

register_btn = chrome_browser.find_element_by_css_selector('.message a')
register_btn.click()

# chrome_browser.close()
# chrome_browser.close()