import os
import tornado.web

import settings


class HomepageHandler(tornado.web.RequestHandler):
    def get(self):
        self.add_header('Content-type', 'text/html')
        with open(os.path.join(settings.ROOT_PATH, '..', 'static', 'index.html'), 'r') as f:
            self.write(f.read())
