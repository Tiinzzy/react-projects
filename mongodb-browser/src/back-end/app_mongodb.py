from mongodb import MongoDB


def connect(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')

    new_connection = MongoDB()
    connection = new_connection.connect(host_name, port_name)
    new_connection.disconnect(connection)
    return {'result': str(connection)}


def get_databases(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')

    new_connection = MongoDB()
    connection = new_connection.connect(host_name, port_name)
    available_databases = new_connection.databases(connection)
    new_connection.disconnect(connection)
    return {'databases': available_databases}


def get_collections(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')
    database_name = parameters.get('database_name')

    new_connection = MongoDB()
    connection = new_connection.connect(host_name, port_name)
    collections = new_connection.collections(connection, database_name)
    new_connection.disconnect(connection)
    return {'collections': collections}


def get_documents(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')
    database_name = parameters.get('database_name')
    collection_name = parameters.get('collection_name')

    new_connection = MongoDB()
    connection = new_connection.connect(host_name, port_name)
    documents = new_connection.search_all_documents(connection, database_name, collection_name)
    new_connection.disconnect(connection)
    return documents


def insert_documents(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')
    database_name = parameters.get('database_name')
    collection_name = parameters.get('collection_name')
    data = parameters.get('data')

    new_connection = MongoDB()
    connection = new_connection.connect(host_name, port_name)
    insertion = new_connection.insert_documents(connection, database_name, collection_name, data)
    documents = new_connection.search_all_documents(connection, database_name, collection_name)
    new_connection.disconnect(connection)
    return {'updated_documents': documents, 'insertion_difference': insertion}


def drop_collection(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')
    database_name = parameters.get('database_name')
    collection_name = parameters.get('collection_name')

    new_connection = MongoDB()
    connection = new_connection.connect(host_name, port_name)
    new_connection.drop_collection(connection, database_name, collection_name)
    collections = new_connection.collections(connection, database_name)
    new_connection.disconnect(connection)
    return {'collections': collections}
