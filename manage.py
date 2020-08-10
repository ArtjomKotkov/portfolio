
import sys

def main():
    try:
        from flaskify.manager import command_handler
    except ImportError:
        raise ImportError('Flaskify module wasn\'t found')

    command_handler(sys.argv)


if __name__ == '__main__':
    main()