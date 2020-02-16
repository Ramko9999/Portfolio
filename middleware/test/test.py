import requests
import json

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
    response = requests.get(url)
    print(response.json())

test_home()