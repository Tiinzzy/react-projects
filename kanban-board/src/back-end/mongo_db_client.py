from pymongo import MongoClient


class MongoDBClient:
    def __init__(self, host_name='localhost', port_name=27017):
        self.mongo_host = host_name
        self.mongo_port = port_name
        self.mongo_client = None

    def connect(self):
        server_info = None
        try:
            self.mongo_client = MongoClient(self.mongo_host, self.mongo_port)
            server_info = self.mongo_client.server_info()
        except Exception as e:
            print(e)
        return server_info is not None

    def disconnect(self):
        self.mongo_client.close()

    def insert_documents(self, database_name, collection_name, documents):
        my_database = self.mongo_client[database_name]
        collection = my_database.get_collection(collection_name)
        cursor = collection.find()
        old_len = len(list(cursor.clone()))
        collection.insert_many(documents)
        current_len = len(list(cursor.clone()))
        return {'inserted_count': current_len - old_len}

    def get_all_documents(self, database_name, collection_name):
        my_database = self.mongo_client[database_name]
        collection = my_database.get_collection(collection_name)
        cursor = collection.find()
        result = dict()
        list_curser = list(cursor)
        for item in list_curser:
            item['_id'] = str(item['_id'])
        result['documents'] = list_curser
        result['length'] = len(list(cursor.clone()))
        return result
