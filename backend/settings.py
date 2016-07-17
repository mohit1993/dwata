import os


ROOT_PATH = os.path.dirname(os.path.abspath(__file__))

# If you want to listen for network connections, set to IP address of this machine, or 0.0.0.0
SERVER_HOST = 'localhost'

# The port needs to be an integer
SERVER_PORT = 8484

# The config file path, without trailing slash, feel free to use os.path.join so it works on any platform
CONFIG_FILE_PATH = os.path.abspath(os.path.join(ROOT_PATH, '..'))

# The config file name, this has to be a JSON file
CONFIG_FILE_NAME = 'config.json'
