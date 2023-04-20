import axios from 'axios';

class BackEndConnectionImpl {
    async connect_mongo_db(host_name, port_name, callback) {
        let query = { 'host_name': host_name, 'port_name': port_name };

        return axios.post('/mongodb/connect', query, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_databases_mongo_db(info, callback) {
        let query = { 'host_name': info.host, 'port_name': info.port };

        return axios.post('/mongodb/databases', query, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_collections_mongo_db(query, callback) {
        return axios.post('/mongodb/collections', query, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }

    async get_documents_mongo_db(query, callback) {
        return axios.post('/mongodb/documents', query, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return false;
            })
    }
}

export default class BackEndConnection {
    static #object = null;

    static INSTANCE() {
        if (BackEndConnection.#object === null) {
            BackEndConnection.#object = new BackEndConnectionImpl();
        }
        return BackEndConnection.#object;
    }

}