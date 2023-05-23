import axios from 'axios';

class BackEndConnectionImpl {
    async get_documents_from_mongo_db(callback: any) {
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
}

export default class BackEndConnection {
    static #object: any | object = null;

    static INSTANCE() {
        if (BackEndConnection.#object === null) {
            BackEndConnection.#object = new BackEndConnectionImpl();
        }
        return BackEndConnection.#object;
    }

}