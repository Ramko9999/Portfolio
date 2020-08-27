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

experience = {}
with open("experience.json", 'r') as f:
    experience = json.load(f)

@app.route("/exp", methods=["GET"])
def getExp():
    try:
        return {"error": False, "experience": experience}, 200
    except Exception as e:
        return {"error":True, "message": str(e)}, 500


@app.route("/blogs", methods= ["GET"])
def getBlogs():
    try:
        url = "https://medium.com/feed/@ramapitchala"
        response = requests.get(url)
        rssJson = xmltodict.parse(response.text)
        items = rssJson["rss"]["channel"]["item"]
        blogs = []
        for item in items:
            if "description" in item:
                parsed = bs4.BeautifulSoup(item["description"], "lxml")
                images = parsed.find_all("img")
                text = parsed.find_all("p", attrs={"class": ["medium-feed-snippet"]})[0].text.strip()
                blogs.append({
                    "title": item["title"],
                    "link": item["link"],
                    "image": images[0]["src"],
                    "description": text
                })

        return {"blogs": blogs, "error": False}, 200
    except Exception as e:
        return {"error": True, "message": str(e)}, 500


@app.route("/projects", methods=["GET"])
def getRepos():
    try:
        url = "https://api.github.com/users/Ramko9999/repos"
        headers = {"Accept":"application/vnd.github.mercy-preview+json"}
        response = requests.get(url, headers=headers, auth=(USERNAME,PASSWORD)).json()
        projects = []
        for repo in response:
            imageString = ""
            if repo["homepage"]:
                imageString = repo["homepage"]
            if imageString != "":
                project = {
                    "id": repo["id"],
                    "name": repo["name"],
                    "url": repo["html_url"],
                    "description": repo["description"],
                    "topics":repo["topics"],
                    "images": imageString.split(";")
                }
                projects.append(project)
        return {"projects": projects, "error": False}
    except Exception as e:
        return {"error": True, "message": str(e)}, 500

if __name__ == "__main__":
    app.run()

