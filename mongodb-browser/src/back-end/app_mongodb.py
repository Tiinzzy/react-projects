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
    connection = new_connection.connect()
    collections = new_connection.collections(connection, 'tina_db')
    new_connection.disconnect(connection)
    return {'collections': collections}
