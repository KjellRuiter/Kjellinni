from selenium import webdriver
from url import url
from generateUser import createDummyUser
import os 
import time 

dir_path = os.path.dirname(os.path.realpath(__file__))

chrome_browser = webdriver.Chrome(f'{dir_path}/chromedriver')
chrome_browser.maximize_window()
chrome_browser.get(url)

register_btn = chrome_browser.find_element_by_css_selector('.message a')
register_btn.click()

name_field = chrome_browser.find_element_by_css_selector('input[name="name"]')
email_field = chrome_browser.find_element_by_css_selector('input[name="email"]')
password_field = chrome_browser.find_element_by_css_selector('input[name="password"]')
submit = chrome_browser.find_element_by_css_selector('button[type="submit"]')

test_user = createDummyUser()
time.sleep(0.5)


name_field.send_keys(test_user['name'])
email_field.send_keys(test_user['email'])
password_field.send_keys(test_user['password'])
submit.click()


# chrome_browser.close()