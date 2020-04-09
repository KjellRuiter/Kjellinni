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


input_name = chrome_browser.find_element_by_css_selector('form input[name="name"]').get_attribute('value')
input_email = chrome_browser.find_element_by_css_selector('form input[name="email"]').get_attribute('value')

if input_email == test_user['email'] and input_name == test_user['name']:
    print('Test Approved: Email and name matches')
elif input_email != test_user['email'] and input_name != test_user['name']:
    print('Test Denied: Both email and name doesnt match')
elif input_email != test_user['email']:
    print('Test Denied: Email doesnt match')
elif input_name != test_user['name']:
    print('Test Denied: Email doesnt match')
    
# print(check_email)
chrome_browser.close()