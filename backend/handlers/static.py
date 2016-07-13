import os
import falcon
import mimetypes

import settings


class HomepageHandler(object):
    def on_get(self, req, resp):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open(os.path.join(settings.ROOT_PATH, '..', 'static', 'index.html'), 'r') as f:
            resp.body = f.read()


def assets_handler(req, resp):
    # The path inside the project directory structure is slightly different from the one in asset URL requests
    path = os.path.abspath(os.path.join(
        settings.ROOT_PATH, '..', *req.path.replace('asset', 'static').split('/')))

    # We check if the path exists
    if os.path.exists(path):
        mime = mimetypes.guess_type(path)
        # We check if the mime type was guessed
        if mime[0]:
            resp.status = falcon.HTTP_200
            resp.content_type = mime[0]
            with open(path, 'r') as f:
                resp.body = f.read()
            return True
    resp.status = falcon.HTTP_404
