import sys
import os


def main():
    try:
        from flaskify.manager import command_handler
    except ImportError:
        raise ImportError('Flaskify module wasn\'t found')

    os.environ.setdefault('SETTINGS_FILE', 'portfolio.settings_dev.Core')

    command_handler('portfolio', sys.argv)


if __name__ == '__main__':
    main()