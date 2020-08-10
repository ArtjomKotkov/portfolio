import importlib


def register_apps(app):
    for sub_app in app.config['INSTALLED_APPS']:
        register_blueprint_extended(app, sub_app)


def register_blueprint_extended(app, sub_app):
    views = importlib.import_module(sub_app+'.views')
    importlib.import_module(sub_app+'.models')
    app.register_blueprint(views.bp)
