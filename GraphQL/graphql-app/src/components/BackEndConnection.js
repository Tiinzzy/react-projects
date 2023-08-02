import axios from 'axios';

class BackEndConnectionImpl {
    async graphql_update_tasks(query, content, callback) {
        return axios.post('/graphql', { query: query, variables: { content: content } }, { headers: { 'Content-Type': 'application/json' } }, {})
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

    async graphql_get_tasks(query, callback) {
        return axios.post('/graphql', { query: query }, { headers: { 'Content-Type': 'application/json' } }, {})
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