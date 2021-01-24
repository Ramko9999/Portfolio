from src.app import db

class Day(db.Model):

    __tablename__ = 'day'

    id = db.Column('id', db.Date(), primary_key=True)
    views = db.Column('views', db.Integer)
    reads = db.Column('reads', db.Integer)

    def __init__(self, id, views, reads):
        self.id = id
        self.views = views
        self.reads = reads

    def serialize(self):
        return {
            "id": self.id,
            "views": self.views,
            "reads": self.reads
        }
