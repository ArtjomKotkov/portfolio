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
    ]

    KRAKEN_IO_CREDENTIALS = {
        'api_key': '4e79f6cad35ff6cc5373019e6d2eb1dc',
        'api_secret': '4e79f6cad35ff6cc5373019e6d2eb1dc'
    }
