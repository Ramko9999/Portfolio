from flask import *
from config import *
import json
from flask_mail import Mail, Message
import requests

app = Flask(__name__)
decoder = json.decoder.JSONDecoder()
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = EMAIL_ADDRESS
app.config["MAIL_PASSWORD"] = PASSWORD
mail = Mail(app)


@app.route("/", methods= ["GET"])
def home():
    return {"message": "home"}, 200

@app.route("/post-test", methods=["POST"])
def home_post():
    json_object = decoder.decode(str(request.get_data(), encoding='UTF-8'))
    return json_object, 200


@app.route("/send-mail", methods= ["POST"])
def send_email():

    '''
    Decode the Json Object and send Email
    '''
    json_object = decoder.decode(str(request.get_data(), encoding='UTF-8'))
    subject = f"Website: {json_object['SUBJECT']}"
    body = f"From: {json_object['FROM']} \n\n {json_object['BODY']}"
    message = Message(subject=subject, recipients=[DESTINATION_EMAIL_ADDRESS], body=body, sender=EMAIL_ADDRESS)
    try:
        mail.send(message)
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

