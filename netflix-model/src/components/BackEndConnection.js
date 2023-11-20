import axios from 'axios';

class BackEndConnectionImpl {
    async get_all_genre(callback) {
        return axios.get('/genre/all', {}, {})
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

    async get_all_customers(callback) {
        return axios.get('/customer/all', {}, {})
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

    async get_all_movies(callback) {
        return axios.get('/movie/all', {}, {})
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