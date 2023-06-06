import axios from 'axios';

class BackEndConnectionImpl {
    async get_all_movies(callback) {
        return axios.post('/movies/all', {}, {})
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
    static #object = null;

    static INSTANCE() {
        if (BackEndConnection.#object === null) {
            BackEndConnection.#object = new BackEndConnectionImpl();
        }
        return BackEndConnection.#object;
    }
}