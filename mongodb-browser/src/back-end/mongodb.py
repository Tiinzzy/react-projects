from pymongo import MongoClient
from bson.json_util import dumps


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
    def disconnect(connect):
        return connect.close()

    @staticmethod
    def databases(connect):
        databases = connect.list_database_names()
        return databases

    @staticmethod
    def collections(connect, database_name):
        my_database = connect[database_name]
        collections = my_database.list_collection_names()
        return collections

    @staticmethod
    def search_all_documents(connect, database_name, collection_name, condition=None, return_fields=None):
        my_database = connect[database_name]
        collection = my_database.get_collection(collection_name)
        cursor = collection.find(condition, return_fields)
        result = dict()
        list_curser = list(cursor)
        json_data = dumps(list_curser)
        result['documents'] = json_data
        result['length'] = len(list(cursor.clone()))
        return result

    @staticmethod
    def insert_documents(connect, database_name, collection_name, data):
        my_database = connect[database_name]
        collection = my_database.get_collection(collection_name)
        cursor = collection.find()
        result = dict()
        result['old_length'] = len(list(cursor.clone()))
        for d in data:
            collection.insert_one(d)
        result['current_length'] = len(list(cursor.clone()))
        return result

    @staticmethod
    def drop_collection(connect, database_name, collection_name):
        my_database = connect[database_name]
        collection = my_database.get_collection(collection_name)
        collection.drop()
