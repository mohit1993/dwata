import json
from urllib.parse import urlparse

from common.config import extract_config


class SourceHandler(object):
    @staticmethod
    def on_get(request, response):
        config = dict()
        databases = extract_config()
        if not databases:
            return False

        for _id, x in databases.items():
            url = urlparse(x)
            config[_id] = dict(
                user=url.netloc[:url.netloc.find(':')],
                host=url.netloc[url.netloc.find('@') + 1:],
                database=url.path[1:]
            )

        response.body = json.dumps(config)
        response.set_header('Content-type', 'application/javascript')
