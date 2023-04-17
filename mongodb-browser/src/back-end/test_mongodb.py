import unittest
from mongodb import MongoDB


class TestMongoDB(unittest.TestCase):
    def test_connection(self):
        new_connection = MongoDB()
        connection = new_connection.connect('localhost', 27017)
        new_connection.disconnect(connection)
        result = "MongoClient(host=['localhost:27017'], document_class=dict, tz_aware=False, connect=True)"
        self.assertEqual(str(connection), result)

    def test_getting_databases(self):
        new_connection = MongoDB()
        connection = new_connection.connect()
        available_databases = new_connection.databases(connection)
        new_connection.disconnect(connection)
        self.assertTrue(len(available_databases) >= 3)

    def test_getting_collections(self):
        new_connection = MongoDB()
        connection = new_connection.connect()
        collections = new_connection.collections(connection, 'tina_db')
        new_connection.disconnect(connection)
        self.assertTrue(len(collections) > 0)

    def test_getting_documents(self):
        new_connection = MongoDB()
        connection = new_connection.connect()
        documents = new_connection.search_all_documents(connection, 'tina_db', 'movies')
        new_connection.disconnect(connection)
        self.assertTrue(len(documents['documents']) == documents['length'])
