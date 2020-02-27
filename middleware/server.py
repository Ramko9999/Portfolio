from flask import *
from config import *
import json
from flask_mail import Mail, Message
import requests
from flask_cors import CORS
import bs4
import xmltodict


app = Flask(__name__)
decoder = json.decoder.JSONDecoder()
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = EMAIL_ADDRESS
app.config["MAIL_PASSWORD"] = PASSWORD
mail = Mail(app)
CORS(app)


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

    Medium Api

    The whole article is organized in sections, where the sections will house
    the widgets.

    Furthermore, in the sections, there are div with classes

    Div with class "n p" will contain the headers, paragraphs and figures(low level contain the image url)
    Div with class "gp" will typically contain either gifs or a collage of images

    Img with class "of pz dh t u gv ak he" will contain the img src link in the Figure will contain the
    src link
    '''

    try:
        url = "https://medium.com/feed/@ramapitchala"
        resp = requests.get(url)
        resp_json = xmltodict.parse(resp.text)
        items = resp_json["rss"]["channel"]["item"]
        serial_blogs = []
        for item in items:
            if "description" in item:
                parsed = bs4.BeautifulSoup(item["description"], "lxml")
                images = parsed.find_all("img")
                text = parsed.find_all("p", attrs={"class": ["medium-feed-snippet"]})[0].text.strip()
                serial_blogs.append({
                    "title": item["title"],
                    "link": item["link"],
                    "imageUrl": images[0]["src"],
                    "description": text
                })

        return {"blogs": serial_blogs, "error": False}, 200
    except Exception as e:
        return {"error": True, "message": str(e)}, 400
    pass


@app.route("/repos")
def get_repos():
    try:
        url = "https://api.github.com/users/Ramko9999/repos"
        response = requests.get(url).json()
        return {"repos": response, "error": False}
    except Exception as e:
        return {"error": True, "message": str(e)}, 400

if __name__ == "__main__":
    app.run()

