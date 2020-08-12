import os

def create_new_app(name):

    try:
        os.mkdir(name)
    except OSError:
        raise

    with open(f'{name}/views.py', 'w') as views:
        views.write(f'from flask import Blueprint\n\nbp = Blueprint("{name}", __name__, url_prefix="/{name}")')

    with open(f'{name}/models.py', 'w') as models:
        models.write(f'#from sqlalchemy import Column, ...\nfrom portfolio import engine\nBase = engine.app.db.Base\n# Use Base us declarative_base, for class inheritance.')

    with open(f'{name}/__init__.py', 'w'):
        pass

    # Add new app in INSTALLED_APPS.
    settings_file_path = os.getenv('SETTINGS_FILE').split('.')
    assert settings_file_path, 'Settings file doesn\'t provided.'

    # Delete .Core in the end.
    settings_file_path = "/".join(settings_file_path[:-1])+'.py'

    settings_dump = []

    with open(settings_file_path, 'r') as settings:

        installed_apps_index = None
        for line in settings:
            if 'INSTALLED_APPS' in line:
                installed_apps_index = len(settings_dump)
            settings_dump.append(line)

        settings_dump.insert(installed_apps_index+1, f'\t\t"{name}",\n')

    with open(settings_file_path, 'w') as settings:

        settings.writelines(settings_dump)
