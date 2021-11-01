import json
import requests
import bs4
import xmltodict
from src.app import app
from src.config import *
from src.work import work
from src.education import education

decoder = json.decoder.JSONDecoder()


@app.route("/blogs", methods=["GET"])
def on_get_blogs():
    try:
        url = "https://medium.com/feed/@ramapitchala"
        response = requests.get(url)
        rss_json = xmltodict.parse(response.text)
        items = rss_json["rss"]["channel"]["item"]
        blogs = []
        for item in items:
            if "description" in item:
                parsed = bs4.BeautifulSoup(item["description"], "lxml")
                images = parsed.find_all("img")
                text = parsed.find_all(
                    "p", attrs={"class": ["medium-feed-snippet"]})[0].text.strip()
                blogs.append({
                    "title": item["title"],
                    "link": item["link"],
                    "image": images[0]["src"],
                    "description": text
                })
        return {"blogs": blogs, "error": False}, 200
    except Exception as e:
        return {"error": True, "message": str(e)}, 500


@app.route("/data", methods=["GET"])
def on_get_data():
    try:
        url = "https://api.github.com/users/Ramko9999/repos"
        headers = {"Accept": "application/vnd.github.mercy-preview+json"}
        repos = requests.get(url, headers=headers,
                             auth=(USERNAME, TOKEN)).json()
        projects = []
        for repo in repos:
            if repo["homepage"]:
                project = {
                    "id": repo["id"],
                    "name": repo["name"],
                    "url": repo["html_url"],
                    "description": repo["description"],
                    "topics": repo["topics"],
                    "image": repo["homepage"].split(";")[0]
                }
                projects.append(project)

        return {"projects": projects,
                "work": work,
                "education": education,
                "error": False}

    except Exception as e:
        return {"error": True, "message": str(e)}, 500


if __name__ == "__main__":
    app.run()
