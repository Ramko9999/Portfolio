import requests
import json
import xmltodict
import bs4


encoder = json.JSONEncoder()


def test_send_mail():
    mail_request ={
        "SUBJECT": "Pythn Test",
        "BODY": "this is a python test",
        "FROM": "64000340@ep-student.org",
    }
    url = "https://ramapitchala.pythonanywhere.com/send-mail"
    print(requests.post(url, encoder.encode(mail_request)).json())

def test_home():
    url = "https://ramapitchala.pythonanywhere.com"


def test_medium_api():
    url = "http://127.0.0.1:5000/get-blogs"
    resp = requests.get(url)
    print(resp.json())

def test_github():
    url = "https://api.github.com/users/Ramko9999/repos"
    response = requests.get(url).json()
    print(response)


test_github()