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

    def disconnect(self):
        self.mongo_client.close()

    def list_databases(self):
        return self.mongo_client.list_database_names()

    def list_collections(self, database_name):
        my_database = self.mongo_client[database_name]
        return my_database.list_collection_names()

    def search_all_documents(self, database_name, collection_name, condition=None, return_fields=None):
        my_database = self.mongo_client[database_name]
        collection = my_database.get_collection(collection_name)
        cursor = collection.find(condition, return_fields)
        result = dict()
        list_curser = list(cursor)
        result['documents'] = list_curser
        result['length'] = len(list(cursor.clone()))
        return result

    def insert_documents(self, database_name, collection_name, data):
        my_database = self.mongo_client[database_name]
        collection = my_database.get_collection(collection_name)
        cursor = collection.find()
        result = dict()
        result['old_length'] = len(list(cursor.clone()))
        for d in data:
            collection.insert_one(d)
        result['current_length'] = len(list(cursor.clone()))
        return result

    def drop_collection(self, database_name, collection_name):
        my_database = self.mongo_client[database_name]
        collection = my_database.get_collection(collection_name)
        collection.drop()
        return my_database.list_collection_names()
