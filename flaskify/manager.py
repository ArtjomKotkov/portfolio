
def command_handler(application_folder, argv):

    main_module = __import__(application_folder, globals(), locals(), ['engine'])

    if len(argv) <= 1 or argv[1] == 'runserver':
        # Run develop server.
        main_module.engine.prepare()
        main_module.engine.run()

    elif argv[1] == 'startapp':
        # Create new app, add in INSTALLED_APPS, create folder adn main files.
        try:
            app_name = argv[2]
            from .file_managment.new_app import create_new_app
            create_new_app(app_name)
        except IndexError:
            print('You must declare app name.')
