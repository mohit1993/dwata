import os
import json
from sqlalchemy import create_engine, MetaData

import settings


class SchemaHandler(object):
    def on_get(self, request, response, source):
        path_to_config = os.path.join(settings.ROOT_PATH, '..', 'config.json')
        if not os.path.exists(path=path_to_config):
            print("The configuration file config.json must exist at the root of the project")
            return False

        with open(path_to_config) as config_file:
            config_contents = config_file.read()
            databases = dict()
            configs = list()

            # Let us try to parse the file as JSON, and handle possible failure
            try:
                config_contents = json.loads(config_contents)
                databases = config_contents['databases']
            except ValueError:
                print("Could not parse config.json, please check your configuration syntax")

            if source in databases:
                engine = create_engine(databases[source])
                engine.connect()
                meta = MetaData(bind=engine)
                meta.reflect()
                tables = [x[0] for x in meta.tables.items()]
                response.body = json.dumps(tables)
                response.set_header('Content-type', 'application/javascript')
