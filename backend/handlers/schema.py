import tornado.web
import ujson as json
from sqlalchemy import create_engine, MetaData

from base.settings import settings


class SchemaHandler(tornado.web.RequestHandler):
    def get(self, source):
        databases = settings.databases

        if source in databases:
            engine = create_engine(databases[source])
            conn = engine.connect()
            meta = MetaData(bind=engine)
            meta.reflect()
            tables = sorted(list((name, list(dict(name=col, type=type(col_def.type).__name__)
                                             for col, col_def in schema.columns.items()))
                                 for name, schema in meta.tables.items()), key=lambda x: x[0])
            self.write(json.dumps(tables))
            self.add_header('Content-type', 'application/javascript')
            conn.close()
