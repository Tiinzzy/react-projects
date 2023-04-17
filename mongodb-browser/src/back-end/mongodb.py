from pymongo import MongoClient


class MongoDB:
    def __init__(self):
        self.mongo_host = None
        self.mongo_port = None

    def connect(self, host_name='localhost', port_name=27017):
        create_connection = MongoDB()
        create_connection.mongo_host = host_name
        create_connection.mongo_port = port_name
        return MongoClient(self.mongo_host, self.mongo_port)

    @staticmethod
    def databases(connect):
        databases = connect.list_database_names()
        connect.close()
        return databases


if __name__ == '__main__':
    new_connection = MongoDB()
    connection = new_connection.connect()
    print(new_connection.databases(connection))
