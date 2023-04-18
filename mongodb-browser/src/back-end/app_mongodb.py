from mongodb_client import MongoDBClient


def connect(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')

    new_client = MongoDBClient(host_name, port_name)
    connection = new_client.connect()
    return {'result': connection}


def disconnect(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')

    new_client = MongoDBClient(host_name, port_name).connect()
    return new_client.disconnect()


def get_databases(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')

    new_client = MongoDBClient(host_name, port_name)
    connection = new_client.connect()
    if connection:
        database_cursor = new_client.list_databases()
        database_list = list(database_cursor)
        return {'available_databases': database_list}
    else:
        return {'result': False}


def get_collections(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')
    database_name = parameters.get('database_name')

    new_client = MongoDBClient(host_name, port_name)
    connection = new_client.connect()
    if connection:
        collections = new_client.list_collections(database_name)
        return {'collections': collections}
    else:
        return {'result': False}


def get_documents(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')
    database_name = parameters.get('database_name')
    collection_name = parameters.get('collection_name')
    search_condition = parameters.get('condition')
    return_fields = parameters.get('return_fields')

    new_client = MongoDBClient(host_name, port_name)
    connection = new_client.connect()
    if connection:
        documents = new_client.search_all_documents(database_name, collection_name)
        return {'result': documents}
    else:
        return {'result': False}


def insert_documents(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')
    database_name = parameters.get('database_name')
    collection_name = parameters.get('collection_name')
    data = parameters.get('data')

    new_client = MongoDBClient(host_name, port_name)
    connection = new_client.connect()
    if connection:
        insertion = new_client.insert_documents(database_name, collection_name, data)
        documents = new_client.search_all_documents(database_name, collection_name)
        return {'updated_documents': documents, 'insertion_difference': insertion}
    else:
        return {'result': False}


def drop_collection(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')
    database_name = parameters.get('database_name')
    collection_name = parameters.get('collection_name')

    new_client = MongoDBClient(host_name, port_name)
    connection = new_client.connect()
    if connection:
        collections = new_client.drop_collection(database_name, collection_name)
        return {'collections': collections}
    else:
        return {'result': False}
