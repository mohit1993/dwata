import os
import json

import settings


def extract_config():
    path_to_config = os.path.join(settings.CONFIG_FILE_PATH, 'config.json')
    if not os.path.exists(path=path_to_config):
        print("The configuration file config.json must exist at the root of the project")
        return False

    with open(path_to_config) as config_file:
        config_contents = config_file.read()
        databases = dict()

        # Let us try to parse the file as JSON, and handle possible failure
        try:
            config_contents = json.loads(config_contents)
            databases = config_contents['databases']
        except ValueError:
            print("Could not parse config.json, please check your configuration syntax")

        # We assume `databases` is a dictionary, but handle possible failure
        try:
            databases.keys()
        except AttributeError:
            print("*databases* setting in config.json should be a JSON Object, "
                  "please check your configuration syntax")

        return databases
