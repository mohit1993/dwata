import os


ROOT_PATH = os.path.dirname(os.path.abspath(__file__))

# If you want to listen for network connections, set to IP address of this machine, or 0.0.0.0
SERVER_HOST = 'localhost'


# The port needs to be an integer
SERVER_PORT = 8484


# The DATABASES is a mapping of a name and a URL.
# The name is used in the lessql UI to show list of databases.
# The Connection URL syntax is exactly as used for Python SQLAlchemy:
# http://docs.sqlalchemy.org/en/latest/core/engines.html#sqlalchemy.create_engine

# The URL is dialect[+driver]://user:password@host/dbname[?key=value..],
#  where dialect is a database name such as mysql, oracle, postgresql, etc.,
#  and driver the name of a DBAPI, such as psycopg2, pyodbc, cx_oracle, etc.

# Alternatively, the URL can be an instance of URL.
# http://docs.sqlalchemy.org/en/latest/core/engines.html#sqlalchemy.engine.url.URL
DATABASES = {
    'mljleads': 'postgresql+psycopg2://%s:%s@%s/%s' % ('mlj_leads', 'mljleads', 'localhost', 'mlj_leads')
}
