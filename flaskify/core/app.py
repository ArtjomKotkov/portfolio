import os

from flask import Flask
from flaskify.db.connect import SQLAlchemyDB
from flaskify.apps.connect import register_apps


class FlaskEngine:
    """Create core Flask engine instance, which contain app, and provides some methods :)"""

    def __init__(self, name=__name__):
        self.app = Flask(name)
        self.app.config.from_object(os.environ.get('SETTINGS_FILE', 'portfolio.settings_dev.Core'))

    def prepare(self):
        self.database_connect()
        self.register_apps()

    def database_connect(self):
        self.app.db = SQLAlchemyDB(self.app)

    def register_apps(self):
        register_apps(self.app)

    def run(self):
        self.app.run()