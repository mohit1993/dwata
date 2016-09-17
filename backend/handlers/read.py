import json
import datetime
import sqlalchemy
from sqlalchemy import create_engine, MetaData, select, func

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
            rp = request.params
            if table in meta.tables:
                tt = meta.tables[table]
                first_column = tt.columns[tt.columns.keys()[0]]
                sel = dict(
                    columns=[tt],
                    limit=rp.get('limit', 100)
                )
                if 'order_by' in rp:
                    order_by = rp['order_by']
                    order_by = [order_by, ] if type(order_by) is str else order_by
                    valid_order_by = list()
                    for x in order_by:
                        ord_type = 'asc'
                        if ':' in x:
                            (x, ord_type) = x.split(':')[:2]
                            ord_type = ord_type if ord_type in ('asc', 'desc') else 'asc'
                        if x in tt.columns.keys():
                            valid_order_by.append((x, ord_type))
                    sel['order_by'] = (getattr(sqlalchemy, x[1])(getattr(tt.c, x[0])) for x in valid_order_by)

                exc = conn.execute(select(**sel))
                count_sel = sel.copy()
                count_sel['columns'] = [func.count(first_column)]
                del count_sel['limit']
                response.body = json.dumps(
                    dict(
                        keys=exc.keys(),
                        results=exc.cursor.fetchall(),
                        count=conn.execute(select(**count_sel)).scalar()
                    ),
                    default=lambda obj: obj.isoformat()
                    if (isinstance(obj, datetime.datetime) or
                        isinstance(obj, datetime.date)) else None)
                response.set_header('Content-type', 'application/javascript')
            conn.close()
