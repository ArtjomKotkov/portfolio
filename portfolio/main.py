import os
import importlib

from .services import register_apps
from .database import SQLAlchemyDB


def create_app(app):

    setting_module = os.environ.get('SETTINGS_FILE', 'portfolio.settings.Core')

    app.config.from_object(setting_module)

    app.db = SQLAlchemyDB(app)

    # load all blueprints, import models for further creating.
    register_apps(app)

    app.db.create_all()

    app.run(debug=True)

