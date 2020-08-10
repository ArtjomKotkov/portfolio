import os

from portfolio import app


def command_handler(argv):
    if len(argv) <= 1 or argv[1] == 'runserver':
        from portfolio.main import create_app
        os.environ.setdefault('SETTINGS_FILE', 'portfolio.settings_prod.Core')
        create_app(app)
