from sqlalchemy import Column, Integer, String, Text
from portfolio import app

class Project(app.db.Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    description = Column(String)
    git_url = Column(String)
    text = Column(Text)