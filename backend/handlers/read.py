import os
import json
import datetime
from sqlalchemy import create_engine, MetaData, select

import settings


class ReadHandler(object):
    def on_get(self, request, response, source, table):
        path_to_config = os.path.join(settings.ROOT_PATH, '..', 'config.json')
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

            if source in databases:
                engine = create_engine(databases[source])
                conn = engine.connect()
                meta = MetaData(bind=engine)
                meta.reflect()
                if table in meta.tables:
                    tt = meta.tables[table]
                    response.body = json.dumps(
                        list(dict(x) for x in conn.execute(select([tt])).fetchall()),
                        default=lambda obj: obj.isoformat()
                        if (isinstance(obj, datetime.datetime) or
                            isinstance(obj, datetime.date)) else None
                    )
                    response.set_header('Content-type', 'application/javascript')
                conn.close()
