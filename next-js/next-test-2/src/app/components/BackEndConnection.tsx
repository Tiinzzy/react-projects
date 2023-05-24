import axios from 'axios';

class BackEndConnectionImpl {
    async get_documents_from_mongo_db(callback: Function): Promise<object> {
        return axios.post('/mongodb/get_documents', {}, {})
            .then(function (response) {
                if (callback) {
                    callback(response.data);
                }
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                if (callback) {
                    callback({ result: false })
                }
                return { result: false };
            })
    }
    async update_document_mongo_db(query: object): Promise<object> {
        return axios.post('/mongodb/update_document', query, {})
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return { result: false };
            })
    }
}

export default class BackEndConnection {
    static #object: any = null;

    static INSTANCE() {
        if (BackEndConnection.#object === null) {
            BackEndConnection.#object = new BackEndConnectionImpl();
        }
        return BackEndConnection.#object;
    }

}