from src.app import db
from .day import Day

class IpView(db.Model):

    __tablename__ = "ip_view"
    ip = db.Column("ip", db.String(20), primary_key=True)
    date_id = db.Column("date_id", db.Date(), db.ForeignKey(Day.id), primary_key=True)

    def __init__(self, ip, date_id):
        self.ip = ip
        self.date_id = date_id

    def serialize(self):
        return {
            "ip": self.ip,
            "date_id": self.date_id
        }