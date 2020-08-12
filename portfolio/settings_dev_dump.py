class Core:
    DEBUG = True

    DATABASE = {
        'engine': 'postgresql',
        'driver': 'psycopg2',
        'username': 'saint',
        'password': '123456',
        'host': 'localhost',
        'name': 'portfolio',
        'port': '5432',
        'echo': True
    }

    INSTALLED_APPS = [
        'project',
        'users'
    ]