from mongo_db_client import MongoDBClient


def insert_documents(parameters):
    host_name = 'localhost'
    port_name = 27017
    database_name = 'kanban'
    collection_name = 'kanban_board'
    documents = parameters.get('documents')

    client = MongoDBClient(host_name, port_name)
    connection = client.connect()
    if connection:
        result = client.insert_documents(database_name, collection_name, documents)
        client.disconnect()
        return result
    else:
        return {'result': False}


def get_documents():
    host_name = 'localhost'
    port_name = 27017
    database_name = 'kanban'
    collection_name = 'kanban_board'

    client = MongoDBClient(host_name, port_name)
    connection = client.connect()
    if connection:
        documents = client.get_all_documents(database_name, collection_name)
        client.disconnect()
        return documents
    else:
        return {'result': False}


def insert_comment(parameters):
    host_name = 'localhost'
    port_name = 27017
    database_name = 'kanban'
    collection_name = 'kanban_comment'
    documents = parameters.get('documents')

    client = MongoDBClient(host_name, port_name)
    connection = client.connect()
    if connection:
        result = client.insert_documents(database_name, collection_name, documents)
        client.disconnect()
        return result
    else:
        return {'result': False}


def get_comments():
    host_name = 'localhost'
    port_name = 27017
    database_name = 'kanban'
    collection_name = 'kanban_comment'

    client = MongoDBClient(host_name, port_name)
    connection = client.connect()
    if connection:
        documents = client.get_all_documents(database_name, collection_name)
        client.disconnect()
        return documents
    else:
        return {'result': False}
