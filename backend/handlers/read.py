import json
import datetime
from sqlalchemy import create_engine, MetaData, select

from common.config import extract_config


class ReadHandler(object):
    @staticmethod
    def on_get(request, response, source, table):
        databases = extract_config()

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
