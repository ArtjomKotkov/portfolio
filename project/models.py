
from sqlalchemy import Column, Integer, String, Text, ARRAY
from portfolio import engine

Base = engine.app.db.Base

class Project(Base):
    __tablename__ = 'projects'

    id = Column(Integer, primary_key=True)
    name = Column(String(256))
    description = Column(String)
    git_url = Column(String)
    text = Column(Text)
    stack = Column(ARRAY(String), default=[])
    services = Column(ARRAY(String), default=[])
    images = Column(ARRAY(String), default=[])

    def to_dict(self):
        return dict(
            id=self.id,
            name=self.name,
            description=self.description,
            git_url=self.git_url,
            text=self.text,
            stack=self.stack,
            images=self.images,
            services=self.services
        )