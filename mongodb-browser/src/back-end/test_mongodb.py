import unittest
from mongodb import MongoDB


class TestMongoDB(unittest.TestCase):
    def test_connection(self):
        new_connection = MongoDB()
        connection = new_connection.connect()
        new_connection.disconnect(connection)
        result = "MongoClient(host=['localhost:27017'], document_class=dict, tz_aware=False, connect=True)"
        self.assertEqual(str(connection), result)

    def test_getting_databases(self):
        new_connection = MongoDB()
        connection = new_connection.connect()
        available_databases = new_connection.databases(connection)
        new_connection.disconnect(connection)
        self.assertTrue(len(available_databases) >= 3)

