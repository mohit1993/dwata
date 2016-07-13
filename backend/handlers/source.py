import os.path
import json
from urllib.parse import urlparse

import settings


class SourceHandler(object):
    def on_get(self, request, response):
        path_to_config = os.path.join(settings.ROOT_PATH, '..', 'config.json')
        if os.path.exists(path=path_to_config):
            with open(path_to_config) as config_file:
                config_contents = config_file.read()
                databases = dict()
                configs = list()

                # Let us try to parse the file as JSON, and handle possible failure
                try:
                    config_contents = json.loads(config_contents)
                    databases = config_contents['databases']
                except ValueError:
                    print("Please check your configuration syntax")

                # We assume `databases` is a JSON Object, but handle possible failure
                try:
                    for name, x in databases.items():
                        url = urlparse(x)
                        configs.append(dict(
                            name=name,
                            user=url.netloc[:url.netloc.find(':')],
                            host=url.netloc[url.netloc.find('@') + 1:],
                            database=url.path[1:]
                        ))
                except AttributeError:
                    print("Please check your configuration syntax")
                response.body = json.dumps(configs)
                response.set_header('Content-type', 'application/javascript')
