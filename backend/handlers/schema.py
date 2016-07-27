import json
from sqlalchemy import create_engine, MetaData

from common.config import extract_config


class SchemaHandler(object):
    @staticmethod
    def on_get(request, response, source):
        databases = extract_config()

        if source in databases:
            engine = create_engine(databases[source])
            conn = engine.connect()
            meta = MetaData(bind=engine)
            meta.reflect()
            tables = sorted(list((name, list(dict(name=col, type=type(col_def.type).__name__)
                                             for col, col_def in schema.columns.items()))
                                 for name, schema in meta.tables.items()), key=lambda x: x[0])
            response.body = json.dumps(tables)
            response.set_header('Content-type', 'application/javascript')
            conn.close()
