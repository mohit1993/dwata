import os
import tornado.ioloop
import tornado.web

import settings
from handlers.static import HomepageHandler
from handlers.source import SourceHandler
from handlers.schema import SchemaHandler
from handlers.read import ReadHandler
from handlers.query import QueryHandler


tornado_app_settings = {
    "static_path": os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "static")),
    "autoreload": True
}

handlers = [
    (r"/", HomepageHandler),
    (r"/api/source/", SourceHandler),
    (r"/api/schema/([^/]+)/", SchemaHandler),
    (r"/api/data/([^/]+)/([^/]+)/", ReadHandler),
    (r"/api/query/{source}/", QueryHandler)
]


def make_app():
    return tornado.web.Application(handlers=handlers, **tornado_app_settings)

# app.add_sink(assets_handler, prefix=r"/asset/")


if __name__ == "__main__":
    app = make_app()
    print("Server started")
    print("Please open http://%s:%s/ on your browser" % (settings.SERVER_HOST, settings.SERVER_PORT))
    app.listen(port=settings.SERVER_PORT, address=settings.SERVER_HOST)
    tornado.ioloop.IOLoop.current().start()
