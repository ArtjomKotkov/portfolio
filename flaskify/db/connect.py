import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


class SQLAlchemyDB:

    def __init__(self, app):

        DATABASE = app.config['DATABASE']

        self.engine = sqlalchemy.engine.create_engine(
            f'{DATABASE["engine"]}{"+" + DATABASE["driver"] if DATABASE["driver"] is not None else ""}://{DATABASE["username"]}:{DATABASE["password"]}@{DATABASE["host"]}:{DATABASE["port"]}/{DATABASE["name"]}',
            echo=DATABASE['echo'])

        self.Base = declarative_base()
        self.session = sessionmaker(bind=self.engine)()

    def get_session(self):
        return self.session

    def get_base(self):
        return self.Base

    def get_engine(self):
        return self.engine