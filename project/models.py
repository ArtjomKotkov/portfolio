from sqlalchemy import Column, Integer, String, Text
from portfolio import engine

Base = engine.app.db.Base


class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    description = Column(String)
    git_url = Column(String)
    text = Column(Text)