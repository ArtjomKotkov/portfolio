from portfolio import engine
from sqlalchemy import Column, Integer, String, Boolean


class User(engine.app.db.Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(25), nullable=False)
    password = Column(String(25), nullable=False)
    superuser = Column(Boolean(), default=False)