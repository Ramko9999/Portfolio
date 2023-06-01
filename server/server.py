import os
import requests
from flask import Flask
from flask_cors import CORS
from education import education
from work import work
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.environ["TOKEN"]

app = Flask(__name__)
CORS(app)


@app.route("/data", methods=["GET"])
def get_data():
    url = f"https://api.github.com/users/Ramko9999/repos"
    headers = {
        "Accept": "application/vnd.github+json",
        "Authorization": f"Bearer {TOKEN}",
    }
    params = {"sort": "pushed", "direction": "desc", "type": "owner"}
    repos = requests.get(url, headers=headers, params=params).json()
    projects = []
    for repo in repos:
        if repo["homepage"]:
            project = {
                "id": repo["id"],
                "name": repo["name"],
                "url": repo["html_url"],
                "description": repo["description"],
                "topics": repo["topics"],
                "image": repo["homepage"],
            }
            projects.append(project)

    return {"projects": projects, "work": work, "education": education}


if __name__ == "__main__":
    app.run()
