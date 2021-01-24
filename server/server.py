import json
import requests
import bs4
import xmltodict
from src.app import app, db
from src.models.day import Day
from src.models.view import IpView
from src.config import *
from flask import request
from sqlalchemy.sql.functions import count
import datetime

experience = [
    {
        "company": "Amazon",
        "logo": "https://images.bwwstatic.com/columnpic10/5EE6FB31-0953-2572-46DD9CE792FD7586.jpg",
        "position": "Software Development Engineering Intern",
        "from": "Jun. 2021",
        "to": "Aug. 2021",
        "background": "Wonder what the future holds...",
        "points": []
    },
    {
        "company": "MathWorks",
        "logo": "https://logo.clearbit.com/MathWorks.com",
        "position": "Software Engineering Intern",
        "from": "Jan. 2021",
        "to": "May 2021",
        "background": "I am part of the Engineering Development Group (EDG) at Mathworks. I work in the Web Widgets team, a team that develops and maintains an UI Widget Framework that others teams in Mathworks consume. I am currently working on my EDG project there. ",
        "points": []
    },
    {
        "company": "TigerGraph",
        "logo": "https://www.tigergraph.com/wp-content/uploads/2017/09/cropped-icon-512-1.png",
        "position": "Solutions Architect Intern",
        "from": "Jul. 2020",
        "to": "Sept. 2020",
        "background": "TigerGraph is a graph database as a service company. My role mainly involved creating graph queries, graph schema, loading jobs for data, and debugging customer issues.",
        "points": [
            "Enhanced TigerGraph's graph algorithm library to support schema-less queries and wrote nearly 12 unit tests for each algorithm.",
            "Wrote efficient graph queries that extracted insights in millions of vertices and edges in under 400 milliseconds.",
            "Designed robust graph database schema for rapid indexing on vertices and for fast query performance for Fortune 500 clients.",
            "Worked on building graph database use cases such as customer tracking, and entity resolution for client pocs."
        ]
    },
    {
        "company": "Futurist Academy",
        "logo": "data:image/png;base64,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",
        "position": "Software Engineering Intern",
        "from": "Aug. 2019",
        "to": "Jul. 2020",
        "background": "I worked on a platform called OrgX which essentially connects users, projects, events and organizations with a graph database. I worked in a team of three with a project manager and another engineer.",
        "points": [
            "Built a web application to allow seamless collaboration on an organizational level with React.js, Node.js, Firestore and TigerGraph in 6 months as a full stack intern.",
            "Architected a scalable messaging system using Firestore and its real time data snapshot listeners.",
            "Optimized database reads to 1 read on chat page enter by storing the 50 most recent messages on the chat document as metadata.",
            "Constructed a secure Express.js proxy to handle client communication to TigerGraph, and the chat, notification and feed service."
        ]
    }]

decoder = json.decoder.JSONDecoder()

month_parser = {
    "JANUARY": 1,
    "FEBRUARY": 2,
    "MARCH": 3,
    "APRIL": 4,
    "MAY": 5,
    "JUNE": 6,
    "JULY": 7,
    "AUGUST": 8,
    "SEPTEMBER": 9,
    "OCTOBER": 10,
    "NOVEMBER": 11,
    "DECEMBER": 12
}

def get_current_id():
    today = datetime.date.today()
    return today.strftime("%Y-%m-%d")

def get_day_id(day, month, year):
    return str(year) + "-" + str(month) + "-" + str(day)

@app.route("/read", methods=["GET"])
def on_read():
    try:
        day = Day.query.filter_by(id=get_current_id()).first()
        day.reads += 1
        db.session.commit()
        return {"error": False}, 200
    except Exception as e:
        return {"error": True, "message":str(e)}, 500


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
        repos = requests.get(url, headers=headers, auth=(USERNAME, TOKEN)).json()
        projects = []
        for repo in repos:
            if repo["homepage"]:
                project = {
                    "id": repo["id"],
                    "name": repo["name"],
                    "url": repo["html_url"],
                    "description": repo["description"],
                    "topics": repo["topics"],
                    "images": repo["homepage"].split(";")
                }
                projects.append(project)

        ip = request.remote_addr

        day_id = get_current_id()
        results = Day.query.filter_by(id=day_id)
        if results.count() == 0:
            day = Day(day_id, 1, 0)
            db.session.add(day)
        else:
            day = results.first()
            day.views += 1

        ip_views = IpView.query.filter_by(date_id=day_id, ip=ip)
        if ip_views.count() == 0:
            ip_view = IpView(ip, day_id)
            db.session.add(ip_view)

        db.session.commit()
        return {"projects": projects, 
                "experiences": experience,
                "error": False}

    except Exception as e:
        return {"error": True, "message": str(e)}, 500


@app.route("/analytics", methods=["POST"])
def get_analytics():
    try:
        body = decoder.decode(str(request.get_data(), encoding='UTF-8'))

        start_date = body["start_date"]
        start_id = get_day_id(start_date["day"], month_parser[start_date["month"].upper()], start_date["year"])

        end_date = body["end_date"]
        end_id = get_day_id(end_date["day"], month_parser[end_date["month"].upper()], end_date["year"])

        results = db.session.query(Day.id, Day.views, Day.reads, count(Day.id)).\
                  select_from(Day).join(IpView).filter(Day.id >= start_id, Day.id <= end_id).\
                  group_by(Day.id).order_by(Day.id).all()

        days = []
        for result in results:
            days.append({
                "day_id": str(result[0]),
                "views": result[1],
                "reads": result[2],
                "viewers": result[3]
            })

        return {"days": days}, 200
    except Exception as e:
        return {"error": True, "message": str(e)}, 500

if __name__ == "__main__":
    app.run()
