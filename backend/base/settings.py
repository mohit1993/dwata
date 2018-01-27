import os
import configparser

from .singleton import Singleton


class Settings(metaclass=Singleton):
    _instance = None

    ROOT_PATH = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

    """
    On which IP address do you want to run Dwata backend
    Default is localhost or 127.0.0.1
    """
    SERVER_HOST = "127.0.0.1"

    """
    On which port do you want the Dwata backend to listen to
    Lower port numbers may need root permissions on Linux systems
    Default is 45454
    """
    SERVER_PORT = 45454

    """
    The INI file to conifgure databases can be store in any path that Dwata backend can read
    Usually the same INI stores the configuration for SERVER_, INI_FILE_PATH and databases
    But you may separate them
    Please use an absolute path
    """
    DB_SETTINGS_FILE_PATH = os.path.join(
        os.path.abspath(os.path.dirname(os.path.dirname(__file__))),
        "settings.ini"
    )

    def __init__(self, settings_str=None):
        p = configparser.ConfigParser()
        if settings_str is None:
            path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
            settings_str = open(os.path.join(path, "settings.ini")).read()
        p.read_string(settings_str)

        if "settings" in p:
            self.SERVER_HOST = p["settings"].get("server_host", self.SERVER_HOST)
            self.SERVER_PORT = p["settings"].get("server_host", self.SERVER_PORT)
            self.DB_SETTINGS_FILE_PATH = p["settings"].get("server_host", self.DB_SETTINGS_FILE_PATH)

    def read_db_settings(self, settings_str=None):
        """
        This method reads the DB connection settings from the settings.ini file
        The sample file which may be used for this is settings.ini.template
        :param settings_str: Pass a string of settings in INI format (mainly for tests)
        :return: DB settings dict
        """
        databases = {}
        p = configparser.ConfigParser()
        if settings_str is None:
            path = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
            settings_str = open(self.DB_SETTINGS_FILE_PATH).read()

        p.read_string(settings_str)
        if "databases" in p:
            databases = dict((key[3:], value) for key, value in p["databases"].items()
                             if key[0:3] == "db_")

        return databases

    @property
    def databases(self):
        return self.read_db_settings()


settings = Settings()
