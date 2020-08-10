import os

class Core:

    DEBUG = True
    DATABASE = {
        'engine': 'postgresq',
        'user': os.environ.get('DATABASE_USER'),
        'password': os.environ.get('DATABASE_PASS'),
        'host': os.environ.get('DATABASE_HOST'),
        'name': os.environ.get('DATABASE_NAME'),
        'port': os.environ.get('DATABASE_PORT'),
    }