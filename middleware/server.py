from flask import *
import smtplib
from config import *
import json
import requests 

app = Flask(__name__)
decoder = json.decoder.JSONDecoder()



@app.route("/", methods= ["GET"])
def home():
    return {"message": "home"}, 200


@app.route("/send-mail", methods= ["POST"])
def send_email():

    '''
    Decode the Json Object and send Email
    '''
    client = smtplib.SMTP("smtp.gmail.com", 587)
    client.login(EMAIL_ADDRESS, PASSWORD)
    json_object = decoder.decode(str(request.get_data(), encoding='UTF-8'))
    subject = f"Website: {json_object['SUBJECT']}"
    body = f"From: {json_object['FROM']} \n\n {json_object['BODY']}"
    url = f"Subject: {subject} \n\n {body}"
    try:
        client.sendmail(EMAIL_ADDRESS, DESTINATION_EMAIL_ADDRESS, url)
        client.quit()
        print("SENT EMAIL")
        return {"message": 'sent', "error": False}, 200
    except Exception as e:
        return {"message": str(e), "error": True}, 404


@app.route("/get-blogs", methods= ["GET"])
def get_blogs():
    '''

    BlogObject Example

    {
    previewImageUrl:
    title:
    body:
    }


    '''
    pass

if __name__ == "__main__":
    app.run()

