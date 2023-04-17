from pymongo import MongoClient


class MongoDB:
    def __init__(self):
        self.mongo_host = None
        self.mongo_port = None

    def connect(self, host_name='localhost', port_name=27017):
        connection = MongoDB()
        connection.mongo_host = host_name
        connection.mongo_port = port_name
        print(connection)
        return MongoClient(self.mongo_host, self.mongo_port)


if __name__ == '__main__':
    new_connection = MongoDB()
    print(new_connection.connect())
