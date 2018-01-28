import os
import tornado.ioloop
import tornado.web

from base.settings import settings
from handlers.static import HomepageHandler
from handlers.source import SourceHandler
from handlers.schema import SchemaHandler
from handlers.read import ReadHandler
from handlers.query import QueryHandler


ROOT_PATH = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))


def make_app():
    tornado_app_settings = {
        "static_path": os.path.join(ROOT_PATH, "..", "static"),
        "autoreload": True
    }

    handlers = [
        (r"/", HomepageHandler),
        (r"/api/source/", SourceHandler),
        (r"/api/schema/([^/]+)/", SchemaHandler),
        (r"/api/data/([^/]+)/([^/]+)/", ReadHandler),
        (r"/api/query/{source}/", QueryHandler)
    ]

    app = tornado.web.Application(handlers=handlers, **tornado_app_settings)
    print("Please open http://%s:%s/ on your browser" % (settings.SERVER_HOST, settings.SERVER_PORT))
    app.listen(port=settings.SERVER_PORT, address=settings.SERVER_HOST)
    tornado.ioloop.IOLoop.current().start()
