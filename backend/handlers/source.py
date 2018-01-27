import ujson as json
import tornado.web
from urllib.parse import urlparse, quote

from common.config import extract_config


class SourceHandler(tornado.web.RequestHandler):
    def get(self):
        config = list()
        databases = extract_config()
        if not databases:
            return False

        for _id, x in databases.items():
            url = urlparse(x)
            config.append((quote(_id, safe=''), dict(
                label=_id,
                user=url.netloc[:url.netloc.find(':')],
                host=url.netloc[url.netloc.find('@') + 1:],
                database=url.path[1:]
            )))
        config = sorted(config, key=lambda x: x[0])

        self.write(json.dumps(config))
        self.add_header('Content-type', 'application/javascript')
