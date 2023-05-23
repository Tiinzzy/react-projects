from mongo_db_client import MongoDBClient

HOST_NAME = 'localhost'
PORT_NUMBER = 27017
DATABASE_NAME = 'kanban'


def insert_documents(parameters):
    collection_name = 'kanban_board'
    documents = parameters.get('documents')

    client = MongoDBClient(HOST_NAME, PORT_NUMBER)
    connection = client.connect()
    if connection:
        result = client.insert_documents(DATABASE_NAME, collection_name, documents)
        client.disconnect()
        return result
    else:
        return {'result': False}


def get_documents():
    collection_name = 'kanban_board'

    client = MongoDBClient(HOST_NAME, PORT_NUMBER)
    connection = client.connect()
    if connection:
        documents = client.get_all_documents(DATABASE_NAME, collection_name)
        client.disconnect()
        return documents
    else:
        return {'result': False}


def insert_comment(parameters):
    collection_name = 'kanban_comment'
    documents = parameters.get('documents')

    client = MongoDBClient(HOST_NAME, PORT_NUMBER)
    connection = client.connect()
    if connection:
        result = client.insert_documents(DATABASE_NAME, collection_name, documents)
        client.disconnect()
        return result
    else:
        return {'result': False}


def get_comments():
    collection_name = 'kanban_comment'

    client = MongoDBClient(HOST_NAME, PORT_NUMBER)
    connection = client.connect()
    if connection:
        documents = client.get_all_documents(DATABASE_NAME, collection_name)
        client.disconnect()
        return documents
    else:
        return {'result': False}


def update_comment(parameters):
    collection_name = 'kanban_comment'
    document_id = parameters.get('document_id')
    documents = parameters.get('documents')

    client = MongoDBClient(HOST_NAME, PORT_NUMBER)
    connection = client.connect()
    if connection:
        result = client.update_comment(DATABASE_NAME, collection_name, document_id, documents)
        client.disconnect()
        return result
    else:
        return {'result': False}


def update_document(parameters):
    collection_name = 'kanban_board'
    documents = parameters.get('documents')

    client = MongoDBClient(HOST_NAME, PORT_NUMBER)
    connection = client.connect()
    if connection:
        result = client.update_document(DATABASE_NAME, collection_name, documents)
        client.disconnect()
        return result
    else:
        return {'result': False}
