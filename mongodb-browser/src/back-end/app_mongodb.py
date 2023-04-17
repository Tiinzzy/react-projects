from mongodb import MongoDB


def connect(parameters):
    host_name = parameters.get('host_name')
    port_name = parameters.get('port_name')

    new_connection = MongoDB()
    connection = new_connection.connect(host_name, port_name)
    return {'result': str(connection)}
