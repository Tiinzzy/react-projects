from pymongo import MongoClient

TIME_OUT_MS = 10 * 1000


class MongoDBClient:
    def __init__(self, host_name='localhost', port_name=27017):
        self.mongo_host = host_name
        self.mongo_port = port_name
        self.mongo_client = None

    def connect(self):
        server_info = None
        try:
            self.mongo_client = MongoClient(self.mongo_host, self.mongo_port, timeoutMS=TIME_OUT_MS)
            server_info = self.mongo_client.server_info()
        except Exception as e:
            print(e)
        return server_info is not None

    def close(self):
        self.mongo_client.close()

    def list_databases(self):
        return self.mongo_client.list_databases()
