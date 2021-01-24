from .app import db

class Day(db.Model):
    __tablename__ = 'day'

    date = db.Column(db.String(), primary_key=True)
    views = db.Column(db.Integer)
    reads = db.Column(db.Integer)

    def __init__(self, date, views, reads):
        self.date = date
        self.views = views
        self.reads = reads

    def serialize(self):
        return {
            "date": self.date,
            "views": self.views,
            "reads": self.reads
        }