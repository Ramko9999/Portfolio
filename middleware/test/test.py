import requests
import json

encoder = json.JSONEncoder()


def test_send_mail():
    mail_request ={
        "SUBJECT": "Pythn Test",
        "BODY": "this is a python test",
        "FROM": "64000340@ep-student.org",
    }
    url = "http://127.0.0.1:5000/send-mail"
    print(requests.post(url, encoder.encode(mail_request)).json())


test_send_mail()