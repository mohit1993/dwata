import json
import datetime
import sqlalchemy
from sqlalchemy import create_engine, MetaData, select

from common.config import extract_config


class QueryHandler(object):
    @staticmethod
    def on_post(request, response, source):
        databases = extract_config()

        if source in databases:
            engine = create_engine(databases[source])
            conn = engine.connect()

            if request.content_type == 'application/json':
                data = request.stream.read().decode('utf-8')
                params = json.loads(data) if data else None

                if params.get('query', None):
                    exc = conn.execute(params['query'])

                    response.body = json.dumps(dict(
                            keys=exc.keys(),
                            results=exc.cursor.fetchall()
                        ), default=lambda obj: obj.isoformat()
                        if (isinstance(obj, datetime.datetime) or
                            isinstance(obj, datetime.date)) else None
                    )
                    response.set_header('Content-type', 'application/javascript')
            conn.close()
